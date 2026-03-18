
-- =============================================
-- FASE 1: FUNDAÇÃO MULTI-TENANT SaaS
-- =============================================

-- 1. Enum de perfis de acesso
CREATE TYPE public.app_role AS ENUM ('admin', 'servidor', 'auditor', 'publico');

-- 2. Enum de status genérico
CREATE TYPE public.status_processo AS ENUM ('rascunho', 'em_andamento', 'aprovado', 'rejeitado', 'concluido', 'cancelado');

-- 3. Tabela de Tenants (prefeituras)
CREATE TABLE public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  cnpj TEXT UNIQUE NOT NULL,
  uf CHAR(2) NOT NULL DEFAULT 'CE',
  municipio TEXT NOT NULL,
  logo_url TEXT,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- 4. Tabela de Perfis de Usuário
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  nome_completo TEXT NOT NULL,
  cargo TEXT,
  setor TEXT,
  telefone TEXT,
  avatar_url TEXT,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 5. Tabela de Roles (separada conforme boas práticas)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'servidor',
  UNIQUE(user_id, tenant_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 6. Função de segurança para verificar role (SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- 7. Função para obter tenant_id do usuário atual
CREATE OR REPLACE FUNCTION public.get_user_tenant_id()
RETURNS UUID
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT tenant_id FROM public.profiles WHERE user_id = auth.uid() LIMIT 1;
$$;

-- 8. Função para verificar se o usuário pertence ao tenant
CREATE OR REPLACE FUNCTION public.user_belongs_to_tenant(_tenant_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid() AND tenant_id = _tenant_id
  );
$$;

-- 9. Trigger de updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers de updated_at
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON public.tenants FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 10. Auto-criar profile ao registrar (trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, tenant_id, nome_completo)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'tenant_id')::UUID, NULL),
    COALESCE(NEW.raw_user_meta_data->>'nome_completo', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- RLS POLICIES - Tenants
-- =============================================
CREATE POLICY "Tenants visíveis para seus membros" ON public.tenants
  FOR SELECT TO authenticated
  USING (public.user_belongs_to_tenant(id));

CREATE POLICY "Admins podem atualizar seu tenant" ON public.tenants
  FOR UPDATE TO authenticated
  USING (public.user_belongs_to_tenant(id) AND public.has_role(auth.uid(), 'admin'));

-- RLS Policies - Profiles
CREATE POLICY "Profiles visíveis no mesmo tenant" ON public.profiles
  FOR SELECT TO authenticated
  USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "Usuário pode atualizar seu próprio perfil" ON public.profiles
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies - User Roles
CREATE POLICY "Roles visíveis no mesmo tenant" ON public.user_roles
  FOR SELECT TO authenticated
  USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "Admin pode gerenciar roles do tenant" ON public.user_roles
  FOR ALL TO authenticated
  USING (tenant_id = public.get_user_tenant_id() AND public.has_role(auth.uid(), 'admin'));

-- =============================================
-- LOGS DE AUDITORIA
-- =============================================
CREATE TABLE public.logs_auditoria (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  usuario_id UUID REFERENCES auth.users(id),
  acao TEXT NOT NULL CHECK (acao IN ('criacao', 'edicao', 'exclusao', 'visualizacao', 'login', 'logout')),
  entidade_afetada TEXT NOT NULL,
  entidade_id TEXT,
  dados_anteriores JSONB,
  dados_novos JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.logs_auditoria ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_logs_auditoria_tenant ON public.logs_auditoria(tenant_id);
CREATE INDEX idx_logs_auditoria_usuario ON public.logs_auditoria(usuario_id);
CREATE INDEX idx_logs_auditoria_entidade ON public.logs_auditoria(entidade_afetada);
CREATE INDEX idx_logs_auditoria_created ON public.logs_auditoria(created_at DESC);

CREATE POLICY "Auditores e admins podem ver logs" ON public.logs_auditoria
  FOR SELECT TO authenticated
  USING (
    tenant_id = public.get_user_tenant_id()
    AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'auditor'))
  );

CREATE POLICY "Sistema pode inserir logs" ON public.logs_auditoria
  FOR INSERT TO authenticated
  WITH CHECK (tenant_id = public.get_user_tenant_id());

-- Função helper para registrar auditoria
CREATE OR REPLACE FUNCTION public.registrar_auditoria(
  _tenant_id UUID,
  _acao TEXT,
  _entidade TEXT,
  _entidade_id TEXT DEFAULT NULL,
  _dados_anteriores JSONB DEFAULT NULL,
  _dados_novos JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _log_id UUID;
BEGIN
  INSERT INTO public.logs_auditoria (tenant_id, usuario_id, acao, entidade_afetada, entidade_id, dados_anteriores, dados_novos)
  VALUES (_tenant_id, auth.uid(), _acao, _entidade, _entidade_id, _dados_anteriores, _dados_novos)
  RETURNING id INTO _log_id;
  RETURN _log_id;
END;
$$;

-- =============================================
-- MÓDULO CONTÁBIL - PCASP COMPLETO
-- =============================================

-- Plano de Contas Aplicado ao Setor Público
CREATE TABLE public.plano_contas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  codigo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  classe INTEGER NOT NULL CHECK (classe BETWEEN 1 AND 8),
  grupo TEXT,
  subgrupo TEXT,
  titulo TEXT,
  subtitulo TEXT,
  natureza TEXT CHECK (natureza IN ('devedora', 'credora')),
  tipo TEXT CHECK (tipo IN ('sintetica', 'analitica')) NOT NULL DEFAULT 'analitica',
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, codigo)
);
ALTER TABLE public.plano_contas ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_plano_contas_updated_at BEFORE UPDATE ON public.plano_contas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Plano de contas visível no tenant" ON public.plano_contas
  FOR SELECT TO authenticated
  USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "Admin pode gerenciar plano de contas" ON public.plano_contas
  FOR ALL TO authenticated
  USING (tenant_id = public.get_user_tenant_id() AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (tenant_id = public.get_user_tenant_id() AND public.has_role(auth.uid(), 'admin'));

-- Classificação Orçamentária
CREATE TABLE public.classificacao_orcamentaria (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  exercicio INTEGER NOT NULL,
  orgao TEXT NOT NULL,
  unidade TEXT NOT NULL,
  funcao TEXT NOT NULL,
  subfuncao TEXT NOT NULL,
  programa TEXT NOT NULL,
  acao TEXT NOT NULL,
  natureza_despesa TEXT NOT NULL,
  fonte_recurso TEXT NOT NULL,
  dotacao_inicial NUMERIC(15,2) NOT NULL DEFAULT 0,
  creditos_suplementares NUMERIC(15,2) NOT NULL DEFAULT 0,
  creditos_especiais NUMERIC(15,2) NOT NULL DEFAULT 0,
  anulacoes NUMERIC(15,2) NOT NULL DEFAULT 0,
  dotacao_atualizada NUMERIC(15,2) GENERATED ALWAYS AS (dotacao_inicial + creditos_suplementares + creditos_especiais - anulacoes) STORED,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.classificacao_orcamentaria ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_classif_orc_updated_at BEFORE UPDATE ON public.classificacao_orcamentaria FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Classificação visível no tenant" ON public.classificacao_orcamentaria
  FOR SELECT TO authenticated
  USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "Admin/servidor pode gerenciar" ON public.classificacao_orcamentaria
  FOR ALL TO authenticated
  USING (tenant_id = public.get_user_tenant_id() AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'servidor')))
  WITH CHECK (tenant_id = public.get_user_tenant_id());

-- Receitas
CREATE TABLE public.receitas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  exercicio INTEGER NOT NULL,
  categoria_economica TEXT NOT NULL,
  origem TEXT NOT NULL,
  especie TEXT,
  desdobramento TEXT,
  fonte_recurso TEXT NOT NULL,
  descricao TEXT NOT NULL,
  previsao_inicial NUMERIC(15,2) NOT NULL DEFAULT 0,
  previsao_atualizada NUMERIC(15,2) NOT NULL DEFAULT 0,
  valor_arrecadado NUMERIC(15,2) NOT NULL DEFAULT 0,
  mes_referencia INTEGER CHECK (mes_referencia BETWEEN 1 AND 12),
  status status_processo NOT NULL DEFAULT 'em_andamento',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.receitas ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_receitas_updated_at BEFORE UPDATE ON public.receitas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Receitas visíveis no tenant" ON public.receitas
  FOR SELECT TO authenticated
  USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "Servidor pode gerenciar receitas" ON public.receitas
  FOR ALL TO authenticated
  USING (tenant_id = public.get_user_tenant_id() AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'servidor')))
  WITH CHECK (tenant_id = public.get_user_tenant_id());

-- Empenhos
CREATE TABLE public.empenhos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  numero TEXT NOT NULL,
  exercicio INTEGER NOT NULL,
  classificacao_id UUID REFERENCES public.classificacao_orcamentaria(id),
  credor_nome TEXT NOT NULL,
  credor_cpf_cnpj TEXT NOT NULL,
  tipo_empenho TEXT NOT NULL CHECK (tipo_empenho IN ('ordinario', 'estimativo', 'global')),
  valor NUMERIC(15,2) NOT NULL CHECK (valor > 0),
  valor_anulado NUMERIC(15,2) NOT NULL DEFAULT 0,
  saldo NUMERIC(15,2) GENERATED ALWAYS AS (valor - valor_anulado) STORED,
  objeto TEXT NOT NULL,
  data_empenho DATE NOT NULL DEFAULT CURRENT_DATE,
  status status_processo NOT NULL DEFAULT 'em_andamento',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, numero, exercicio)
);
ALTER TABLE public.empenhos ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_empenhos_updated_at BEFORE UPDATE ON public.empenhos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Empenhos visíveis no tenant" ON public.empenhos
  FOR SELECT TO authenticated
  USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "Servidor pode gerenciar empenhos" ON public.empenhos
  FOR ALL TO authenticated
  USING (tenant_id = public.get_user_tenant_id() AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'servidor')))
  WITH CHECK (tenant_id = public.get_user_tenant_id());

-- Liquidações
CREATE TABLE public.liquidacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  empenho_id UUID REFERENCES public.empenhos(id) ON DELETE RESTRICT NOT NULL,
  numero TEXT NOT NULL,
  valor NUMERIC(15,2) NOT NULL CHECK (valor > 0),
  data_liquidacao DATE NOT NULL DEFAULT CURRENT_DATE,
  documento_fiscal TEXT,
  atesto TEXT,
  status status_processo NOT NULL DEFAULT 'em_andamento',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, numero)
);
ALTER TABLE public.liquidacoes ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_liquidacoes_updated_at BEFORE UPDATE ON public.liquidacoes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Liquidações visíveis no tenant" ON public.liquidacoes
  FOR SELECT TO authenticated
  USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "Servidor pode gerenciar liquidações" ON public.liquidacoes
  FOR ALL TO authenticated
  USING (tenant_id = public.get_user_tenant_id() AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'servidor')))
  WITH CHECK (tenant_id = public.get_user_tenant_id());

-- Pagamentos
CREATE TABLE public.pagamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  liquidacao_id UUID REFERENCES public.liquidacoes(id) ON DELETE RESTRICT NOT NULL,
  numero TEXT NOT NULL,
  valor NUMERIC(15,2) NOT NULL CHECK (valor > 0),
  data_pagamento DATE NOT NULL DEFAULT CURRENT_DATE,
  banco TEXT,
  agencia TEXT,
  conta TEXT,
  forma_pagamento TEXT CHECK (forma_pagamento IN ('transferencia', 'boleto', 'cheque', 'ordem_bancaria', 'outro')),
  status status_processo NOT NULL DEFAULT 'em_andamento',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, numero)
);
ALTER TABLE public.pagamentos ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_pagamentos_updated_at BEFORE UPDATE ON public.pagamentos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Pagamentos visíveis no tenant" ON public.pagamentos
  FOR SELECT TO authenticated
  USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "Servidor pode gerenciar pagamentos" ON public.pagamentos
  FOR ALL TO authenticated
  USING (tenant_id = public.get_user_tenant_id() AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'servidor')))
  WITH CHECK (tenant_id = public.get_user_tenant_id());

-- Despesas (consolidação)
CREATE TABLE public.despesas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  exercicio INTEGER NOT NULL,
  classificacao_id UUID REFERENCES public.classificacao_orcamentaria(id),
  empenho_id UUID REFERENCES public.empenhos(id),
  descricao TEXT NOT NULL,
  valor_empenhado NUMERIC(15,2) NOT NULL DEFAULT 0,
  valor_liquidado NUMERIC(15,2) NOT NULL DEFAULT 0,
  valor_pago NUMERIC(15,2) NOT NULL DEFAULT 0,
  mes_referencia INTEGER CHECK (mes_referencia BETWEEN 1 AND 12),
  status status_processo NOT NULL DEFAULT 'em_andamento',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.despesas ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_despesas_updated_at BEFORE UPDATE ON public.despesas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Despesas visíveis no tenant" ON public.despesas
  FOR SELECT TO authenticated
  USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "Servidor pode gerenciar despesas" ON public.despesas
  FOR ALL TO authenticated
  USING (tenant_id = public.get_user_tenant_id() AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'servidor')))
  WITH CHECK (tenant_id = public.get_user_tenant_id());

-- =============================================
-- ALERTAS IA (n8n Integration)
-- =============================================
CREATE TABLE public.alertas_ia (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  tipo_alerta TEXT NOT NULL,
  descricao TEXT NOT NULL,
  nivel_risco TEXT NOT NULL CHECK (nivel_risco IN ('baixo', 'medio', 'alto', 'critico')),
  dados_origem JSONB,
  entidade_origem TEXT,
  entidade_id TEXT,
  lido BOOLEAN NOT NULL DEFAULT false,
  resolvido BOOLEAN NOT NULL DEFAULT false,
  resolvido_por UUID REFERENCES auth.users(id),
  resolvido_em TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.alertas_ia ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_alertas_ia_tenant ON public.alertas_ia(tenant_id);
CREATE INDEX idx_alertas_ia_risco ON public.alertas_ia(nivel_risco);
CREATE INDEX idx_alertas_ia_created ON public.alertas_ia(created_at DESC);

CREATE POLICY "Alertas visíveis para admins e auditores" ON public.alertas_ia
  FOR SELECT TO authenticated
  USING (
    tenant_id = public.get_user_tenant_id()
    AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'auditor'))
  );

CREATE POLICY "Sistema pode inserir alertas" ON public.alertas_ia
  FOR INSERT TO authenticated
  WITH CHECK (tenant_id = public.get_user_tenant_id());

CREATE POLICY "Admin pode atualizar alertas" ON public.alertas_ia
  FOR UPDATE TO authenticated
  USING (tenant_id = public.get_user_tenant_id() AND public.has_role(auth.uid(), 'admin'));

-- =============================================
-- OUVIDORIA (migrar estrutura existente)
-- =============================================
CREATE TABLE public.manifestacoes_ouvidoria (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  protocolo TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('denuncia', 'reclamacao', 'sugestao', 'elogio', 'solicitacao')),
  assunto TEXT NOT NULL,
  descricao TEXT NOT NULL,
  anonimo BOOLEAN NOT NULL DEFAULT false,
  nome_manifestante TEXT,
  email_manifestante TEXT,
  telefone_manifestante TEXT,
  urgencia TEXT NOT NULL DEFAULT 'normal' CHECK (urgencia IN ('baixa', 'normal', 'alta', 'urgente')),
  status TEXT NOT NULL DEFAULT 'recebida' CHECK (status IN ('recebida', 'em_analise', 'encaminhada', 'respondida', 'concluida', 'arquivada')),
  setor_responsavel TEXT,
  resposta TEXT,
  processo_vinculado TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, protocolo)
);
ALTER TABLE public.manifestacoes_ouvidoria ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_manifestacoes_updated_at BEFORE UPDATE ON public.manifestacoes_ouvidoria FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Público pode consultar por protocolo (sem auth)
CREATE POLICY "Consulta pública por protocolo" ON public.manifestacoes_ouvidoria
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "Servidor pode ver manifestações do tenant" ON public.manifestacoes_ouvidoria
  FOR SELECT TO authenticated
  USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "Servidor pode gerenciar manifestações" ON public.manifestacoes_ouvidoria
  FOR ALL TO authenticated
  USING (tenant_id = public.get_user_tenant_id() AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'servidor')))
  WITH CHECK (tenant_id = public.get_user_tenant_id());

-- Inserção pública (sem auth)
CREATE POLICY "Cidadão pode criar manifestação" ON public.manifestacoes_ouvidoria
  FOR INSERT TO anon
  WITH CHECK (true);

-- =============================================
-- DIÁRIO OFICIAL
-- =============================================
CREATE TABLE public.atos_diario_oficial (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  numero TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('decreto', 'portaria', 'lei', 'resolucao', 'edital', 'aviso', 'outro')),
  assunto TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  data_publicacao DATE,
  edicao TEXT,
  arquivo_url TEXT,
  status TEXT NOT NULL DEFAULT 'rascunho' CHECK (status IN ('rascunho', 'aprovado', 'publicado', 'revogado')),
  publicado_por UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.atos_diario_oficial ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_atos_diario_updated_at BEFORE UPDATE ON public.atos_diario_oficial FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Público pode ver atos publicados
CREATE POLICY "Atos publicados são públicos" ON public.atos_diario_oficial
  FOR SELECT TO anon
  USING (status = 'publicado');

CREATE POLICY "Servidor pode ver atos do tenant" ON public.atos_diario_oficial
  FOR SELECT TO authenticated
  USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "Servidor pode gerenciar atos" ON public.atos_diario_oficial
  FOR ALL TO authenticated
  USING (tenant_id = public.get_user_tenant_id() AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'servidor')))
  WITH CHECK (tenant_id = public.get_user_tenant_id());

-- =============================================
-- CONTRATOS E FORNECEDORES
-- =============================================
CREATE TABLE public.fornecedores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  razao_social TEXT NOT NULL,
  nome_fantasia TEXT,
  cpf_cnpj TEXT NOT NULL,
  tipo_pessoa TEXT NOT NULL CHECK (tipo_pessoa IN ('fisica', 'juridica')),
  endereco TEXT,
  municipio TEXT,
  uf CHAR(2),
  cep TEXT,
  telefone TEXT,
  email TEXT,
  situacao TEXT NOT NULL DEFAULT 'ativo' CHECK (situacao IN ('ativo', 'inativo', 'bloqueado', 'suspenso')),
  certidoes_regulares BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, cpf_cnpj)
);
ALTER TABLE public.fornecedores ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_fornecedores_updated_at BEFORE UPDATE ON public.fornecedores FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Fornecedores visíveis no tenant" ON public.fornecedores
  FOR SELECT TO authenticated
  USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "Servidor pode gerenciar fornecedores" ON public.fornecedores
  FOR ALL TO authenticated
  USING (tenant_id = public.get_user_tenant_id() AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'servidor')))
  WITH CHECK (tenant_id = public.get_user_tenant_id());

CREATE TABLE public.contratos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  numero TEXT NOT NULL,
  exercicio INTEGER NOT NULL,
  fornecedor_id UUID REFERENCES public.fornecedores(id),
  objeto TEXT NOT NULL,
  modalidade TEXT NOT NULL CHECK (modalidade IN ('pregao_eletronico', 'concorrencia', 'tomada_precos', 'convite', 'dispensa', 'inexigibilidade', 'dialogo_competitivo', 'leilao')),
  valor_global NUMERIC(15,2) NOT NULL,
  data_assinatura DATE NOT NULL,
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  status status_processo NOT NULL DEFAULT 'em_andamento',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, numero, exercicio)
);
ALTER TABLE public.contratos ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_contratos_updated_at BEFORE UPDATE ON public.contratos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Contratos visíveis no tenant" ON public.contratos
  FOR SELECT TO authenticated
  USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "Servidor pode gerenciar contratos" ON public.contratos
  FOR ALL TO authenticated
  USING (tenant_id = public.get_user_tenant_id() AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'servidor')))
  WITH CHECK (tenant_id = public.get_user_tenant_id());

-- =============================================
-- PROCESSOS DE AUDITORIA (acesso restrito)
-- =============================================
CREATE TABLE public.processos_auditoria (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  numero TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('conformidade', 'operacional', 'especial', 'acompanhamento', 'prestacao_contas')),
  titulo TEXT NOT NULL,
  descricao TEXT,
  nivel_risco TEXT CHECK (nivel_risco IN ('baixo', 'medio', 'alto', 'critico')),
  setor_auditado TEXT,
  responsavel_id UUID REFERENCES auth.users(id),
  data_inicio DATE,
  data_fim DATE,
  status status_processo NOT NULL DEFAULT 'rascunho',
  achados JSONB,
  recomendacoes JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, numero)
);
ALTER TABLE public.processos_auditoria ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_proc_auditoria_updated_at BEFORE UPDATE ON public.processos_auditoria FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- APENAS auditores podem acessar
CREATE POLICY "Somente auditores veem processos de auditoria" ON public.processos_auditoria
  FOR SELECT TO authenticated
  USING (
    tenant_id = public.get_user_tenant_id()
    AND (public.has_role(auth.uid(), 'auditor') OR public.has_role(auth.uid(), 'admin'))
  );

CREATE POLICY "Auditores podem gerenciar processos" ON public.processos_auditoria
  FOR ALL TO authenticated
  USING (
    tenant_id = public.get_user_tenant_id()
    AND public.has_role(auth.uid(), 'auditor')
  )
  WITH CHECK (
    tenant_id = public.get_user_tenant_id()
    AND public.has_role(auth.uid(), 'auditor')
  );
