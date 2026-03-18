export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      alertas_ia: {
        Row: {
          created_at: string
          dados_origem: Json | null
          descricao: string
          entidade_id: string | null
          entidade_origem: string | null
          id: string
          lido: boolean
          nivel_risco: string
          resolvido: boolean
          resolvido_em: string | null
          resolvido_por: string | null
          tenant_id: string
          tipo_alerta: string
        }
        Insert: {
          created_at?: string
          dados_origem?: Json | null
          descricao: string
          entidade_id?: string | null
          entidade_origem?: string | null
          id?: string
          lido?: boolean
          nivel_risco: string
          resolvido?: boolean
          resolvido_em?: string | null
          resolvido_por?: string | null
          tenant_id: string
          tipo_alerta: string
        }
        Update: {
          created_at?: string
          dados_origem?: Json | null
          descricao?: string
          entidade_id?: string | null
          entidade_origem?: string | null
          id?: string
          lido?: boolean
          nivel_risco?: string
          resolvido?: boolean
          resolvido_em?: string | null
          resolvido_por?: string | null
          tenant_id?: string
          tipo_alerta?: string
        }
        Relationships: [
          {
            foreignKeyName: "alertas_ia_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      atos_diario_oficial: {
        Row: {
          arquivo_url: string | null
          assunto: string
          conteudo: string
          created_at: string
          data_publicacao: string | null
          edicao: string | null
          id: string
          numero: string
          publicado_por: string | null
          status: string
          tenant_id: string
          tipo: string
          updated_at: string
        }
        Insert: {
          arquivo_url?: string | null
          assunto: string
          conteudo: string
          created_at?: string
          data_publicacao?: string | null
          edicao?: string | null
          id?: string
          numero: string
          publicado_por?: string | null
          status?: string
          tenant_id: string
          tipo: string
          updated_at?: string
        }
        Update: {
          arquivo_url?: string | null
          assunto?: string
          conteudo?: string
          created_at?: string
          data_publicacao?: string | null
          edicao?: string | null
          id?: string
          numero?: string
          publicado_por?: string | null
          status?: string
          tenant_id?: string
          tipo?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "atos_diario_oficial_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      classificacao_orcamentaria: {
        Row: {
          acao: string
          anulacoes: number
          created_at: string
          creditos_especiais: number
          creditos_suplementares: number
          dotacao_atualizada: number | null
          dotacao_inicial: number
          exercicio: number
          fonte_recurso: string
          funcao: string
          id: string
          natureza_despesa: string
          orgao: string
          programa: string
          subfuncao: string
          tenant_id: string
          unidade: string
          updated_at: string
        }
        Insert: {
          acao: string
          anulacoes?: number
          created_at?: string
          creditos_especiais?: number
          creditos_suplementares?: number
          dotacao_atualizada?: number | null
          dotacao_inicial?: number
          exercicio: number
          fonte_recurso: string
          funcao: string
          id?: string
          natureza_despesa: string
          orgao: string
          programa: string
          subfuncao: string
          tenant_id: string
          unidade: string
          updated_at?: string
        }
        Update: {
          acao?: string
          anulacoes?: number
          created_at?: string
          creditos_especiais?: number
          creditos_suplementares?: number
          dotacao_atualizada?: number | null
          dotacao_inicial?: number
          exercicio?: number
          fonte_recurso?: string
          funcao?: string
          id?: string
          natureza_despesa?: string
          orgao?: string
          programa?: string
          subfuncao?: string
          tenant_id?: string
          unidade?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "classificacao_orcamentaria_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      contratos: {
        Row: {
          created_at: string
          data_assinatura: string
          data_fim: string
          data_inicio: string
          exercicio: number
          fornecedor_id: string | null
          id: string
          modalidade: string
          numero: string
          objeto: string
          status: Database["public"]["Enums"]["status_processo"]
          tenant_id: string
          updated_at: string
          valor_global: number
        }
        Insert: {
          created_at?: string
          data_assinatura: string
          data_fim: string
          data_inicio: string
          exercicio: number
          fornecedor_id?: string | null
          id?: string
          modalidade: string
          numero: string
          objeto: string
          status?: Database["public"]["Enums"]["status_processo"]
          tenant_id: string
          updated_at?: string
          valor_global: number
        }
        Update: {
          created_at?: string
          data_assinatura?: string
          data_fim?: string
          data_inicio?: string
          exercicio?: number
          fornecedor_id?: string | null
          id?: string
          modalidade?: string
          numero?: string
          objeto?: string
          status?: Database["public"]["Enums"]["status_processo"]
          tenant_id?: string
          updated_at?: string
          valor_global?: number
        }
        Relationships: [
          {
            foreignKeyName: "contratos_fornecedor_id_fkey"
            columns: ["fornecedor_id"]
            isOneToOne: false
            referencedRelation: "fornecedores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      despesas: {
        Row: {
          classificacao_id: string | null
          created_at: string
          descricao: string
          empenho_id: string | null
          exercicio: number
          id: string
          mes_referencia: number | null
          status: Database["public"]["Enums"]["status_processo"]
          tenant_id: string
          updated_at: string
          valor_empenhado: number
          valor_liquidado: number
          valor_pago: number
        }
        Insert: {
          classificacao_id?: string | null
          created_at?: string
          descricao: string
          empenho_id?: string | null
          exercicio: number
          id?: string
          mes_referencia?: number | null
          status?: Database["public"]["Enums"]["status_processo"]
          tenant_id: string
          updated_at?: string
          valor_empenhado?: number
          valor_liquidado?: number
          valor_pago?: number
        }
        Update: {
          classificacao_id?: string | null
          created_at?: string
          descricao?: string
          empenho_id?: string | null
          exercicio?: number
          id?: string
          mes_referencia?: number | null
          status?: Database["public"]["Enums"]["status_processo"]
          tenant_id?: string
          updated_at?: string
          valor_empenhado?: number
          valor_liquidado?: number
          valor_pago?: number
        }
        Relationships: [
          {
            foreignKeyName: "despesas_classificacao_id_fkey"
            columns: ["classificacao_id"]
            isOneToOne: false
            referencedRelation: "classificacao_orcamentaria"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "despesas_empenho_id_fkey"
            columns: ["empenho_id"]
            isOneToOne: false
            referencedRelation: "empenhos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "despesas_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      empenhos: {
        Row: {
          classificacao_id: string | null
          created_at: string
          credor_cpf_cnpj: string
          credor_nome: string
          data_empenho: string
          exercicio: number
          id: string
          numero: string
          objeto: string
          saldo: number | null
          status: Database["public"]["Enums"]["status_processo"]
          tenant_id: string
          tipo_empenho: string
          updated_at: string
          valor: number
          valor_anulado: number
        }
        Insert: {
          classificacao_id?: string | null
          created_at?: string
          credor_cpf_cnpj: string
          credor_nome: string
          data_empenho?: string
          exercicio: number
          id?: string
          numero: string
          objeto: string
          saldo?: number | null
          status?: Database["public"]["Enums"]["status_processo"]
          tenant_id: string
          tipo_empenho: string
          updated_at?: string
          valor: number
          valor_anulado?: number
        }
        Update: {
          classificacao_id?: string | null
          created_at?: string
          credor_cpf_cnpj?: string
          credor_nome?: string
          data_empenho?: string
          exercicio?: number
          id?: string
          numero?: string
          objeto?: string
          saldo?: number | null
          status?: Database["public"]["Enums"]["status_processo"]
          tenant_id?: string
          tipo_empenho?: string
          updated_at?: string
          valor?: number
          valor_anulado?: number
        }
        Relationships: [
          {
            foreignKeyName: "empenhos_classificacao_id_fkey"
            columns: ["classificacao_id"]
            isOneToOne: false
            referencedRelation: "classificacao_orcamentaria"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "empenhos_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      fornecedores: {
        Row: {
          cep: string | null
          certidoes_regulares: boolean
          cpf_cnpj: string
          created_at: string
          email: string | null
          endereco: string | null
          id: string
          municipio: string | null
          nome_fantasia: string | null
          razao_social: string
          situacao: string
          telefone: string | null
          tenant_id: string
          tipo_pessoa: string
          uf: string | null
          updated_at: string
        }
        Insert: {
          cep?: string | null
          certidoes_regulares?: boolean
          cpf_cnpj: string
          created_at?: string
          email?: string | null
          endereco?: string | null
          id?: string
          municipio?: string | null
          nome_fantasia?: string | null
          razao_social: string
          situacao?: string
          telefone?: string | null
          tenant_id: string
          tipo_pessoa: string
          uf?: string | null
          updated_at?: string
        }
        Update: {
          cep?: string | null
          certidoes_regulares?: boolean
          cpf_cnpj?: string
          created_at?: string
          email?: string | null
          endereco?: string | null
          id?: string
          municipio?: string | null
          nome_fantasia?: string | null
          razao_social?: string
          situacao?: string
          telefone?: string | null
          tenant_id?: string
          tipo_pessoa?: string
          uf?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fornecedores_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      liquidacoes: {
        Row: {
          atesto: string | null
          created_at: string
          data_liquidacao: string
          documento_fiscal: string | null
          empenho_id: string
          id: string
          numero: string
          status: Database["public"]["Enums"]["status_processo"]
          tenant_id: string
          updated_at: string
          valor: number
        }
        Insert: {
          atesto?: string | null
          created_at?: string
          data_liquidacao?: string
          documento_fiscal?: string | null
          empenho_id: string
          id?: string
          numero: string
          status?: Database["public"]["Enums"]["status_processo"]
          tenant_id: string
          updated_at?: string
          valor: number
        }
        Update: {
          atesto?: string | null
          created_at?: string
          data_liquidacao?: string
          documento_fiscal?: string | null
          empenho_id?: string
          id?: string
          numero?: string
          status?: Database["public"]["Enums"]["status_processo"]
          tenant_id?: string
          updated_at?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "liquidacoes_empenho_id_fkey"
            columns: ["empenho_id"]
            isOneToOne: false
            referencedRelation: "empenhos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "liquidacoes_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      logs_auditoria: {
        Row: {
          acao: string
          created_at: string
          dados_anteriores: Json | null
          dados_novos: Json | null
          entidade_afetada: string
          entidade_id: string | null
          id: string
          ip_address: string | null
          tenant_id: string
          user_agent: string | null
          usuario_id: string | null
        }
        Insert: {
          acao: string
          created_at?: string
          dados_anteriores?: Json | null
          dados_novos?: Json | null
          entidade_afetada: string
          entidade_id?: string | null
          id?: string
          ip_address?: string | null
          tenant_id: string
          user_agent?: string | null
          usuario_id?: string | null
        }
        Update: {
          acao?: string
          created_at?: string
          dados_anteriores?: Json | null
          dados_novos?: Json | null
          entidade_afetada?: string
          entidade_id?: string | null
          id?: string
          ip_address?: string | null
          tenant_id?: string
          user_agent?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logs_auditoria_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      manifestacoes_ouvidoria: {
        Row: {
          anonimo: boolean
          assunto: string
          created_at: string
          descricao: string
          email_manifestante: string | null
          id: string
          nome_manifestante: string | null
          processo_vinculado: string | null
          protocolo: string
          resposta: string | null
          setor_responsavel: string | null
          status: string
          telefone_manifestante: string | null
          tenant_id: string
          tipo: string
          updated_at: string
          urgencia: string
        }
        Insert: {
          anonimo?: boolean
          assunto: string
          created_at?: string
          descricao: string
          email_manifestante?: string | null
          id?: string
          nome_manifestante?: string | null
          processo_vinculado?: string | null
          protocolo: string
          resposta?: string | null
          setor_responsavel?: string | null
          status?: string
          telefone_manifestante?: string | null
          tenant_id: string
          tipo: string
          updated_at?: string
          urgencia?: string
        }
        Update: {
          anonimo?: boolean
          assunto?: string
          created_at?: string
          descricao?: string
          email_manifestante?: string | null
          id?: string
          nome_manifestante?: string | null
          processo_vinculado?: string | null
          protocolo?: string
          resposta?: string | null
          setor_responsavel?: string | null
          status?: string
          telefone_manifestante?: string | null
          tenant_id?: string
          tipo?: string
          updated_at?: string
          urgencia?: string
        }
        Relationships: [
          {
            foreignKeyName: "manifestacoes_ouvidoria_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      pagamentos: {
        Row: {
          agencia: string | null
          banco: string | null
          conta: string | null
          created_at: string
          data_pagamento: string
          forma_pagamento: string | null
          id: string
          liquidacao_id: string
          numero: string
          status: Database["public"]["Enums"]["status_processo"]
          tenant_id: string
          updated_at: string
          valor: number
        }
        Insert: {
          agencia?: string | null
          banco?: string | null
          conta?: string | null
          created_at?: string
          data_pagamento?: string
          forma_pagamento?: string | null
          id?: string
          liquidacao_id: string
          numero: string
          status?: Database["public"]["Enums"]["status_processo"]
          tenant_id: string
          updated_at?: string
          valor: number
        }
        Update: {
          agencia?: string | null
          banco?: string | null
          conta?: string | null
          created_at?: string
          data_pagamento?: string
          forma_pagamento?: string | null
          id?: string
          liquidacao_id?: string
          numero?: string
          status?: Database["public"]["Enums"]["status_processo"]
          tenant_id?: string
          updated_at?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "pagamentos_liquidacao_id_fkey"
            columns: ["liquidacao_id"]
            isOneToOne: false
            referencedRelation: "liquidacoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pagamentos_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      plano_contas: {
        Row: {
          ativo: boolean
          classe: number
          codigo: string
          created_at: string
          descricao: string
          grupo: string | null
          id: string
          natureza: string | null
          subgrupo: string | null
          subtitulo: string | null
          tenant_id: string
          tipo: string
          titulo: string | null
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          classe: number
          codigo: string
          created_at?: string
          descricao: string
          grupo?: string | null
          id?: string
          natureza?: string | null
          subgrupo?: string | null
          subtitulo?: string | null
          tenant_id: string
          tipo?: string
          titulo?: string | null
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          classe?: number
          codigo?: string
          created_at?: string
          descricao?: string
          grupo?: string | null
          id?: string
          natureza?: string | null
          subgrupo?: string | null
          subtitulo?: string | null
          tenant_id?: string
          tipo?: string
          titulo?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "plano_contas_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      processos_auditoria: {
        Row: {
          achados: Json | null
          created_at: string
          data_fim: string | null
          data_inicio: string | null
          descricao: string | null
          id: string
          nivel_risco: string | null
          numero: string
          recomendacoes: Json | null
          responsavel_id: string | null
          setor_auditado: string | null
          status: Database["public"]["Enums"]["status_processo"]
          tenant_id: string
          tipo: string
          titulo: string
          updated_at: string
        }
        Insert: {
          achados?: Json | null
          created_at?: string
          data_fim?: string | null
          data_inicio?: string | null
          descricao?: string | null
          id?: string
          nivel_risco?: string | null
          numero: string
          recomendacoes?: Json | null
          responsavel_id?: string | null
          setor_auditado?: string | null
          status?: Database["public"]["Enums"]["status_processo"]
          tenant_id: string
          tipo: string
          titulo: string
          updated_at?: string
        }
        Update: {
          achados?: Json | null
          created_at?: string
          data_fim?: string | null
          data_inicio?: string | null
          descricao?: string | null
          id?: string
          nivel_risco?: string | null
          numero?: string
          recomendacoes?: Json | null
          responsavel_id?: string | null
          setor_auditado?: string | null
          status?: Database["public"]["Enums"]["status_processo"]
          tenant_id?: string
          tipo?: string
          titulo?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "processos_auditoria_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          ativo: boolean
          avatar_url: string | null
          cargo: string | null
          created_at: string
          id: string
          nome_completo: string
          setor: string | null
          telefone: string | null
          tenant_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ativo?: boolean
          avatar_url?: string | null
          cargo?: string | null
          created_at?: string
          id?: string
          nome_completo: string
          setor?: string | null
          telefone?: string | null
          tenant_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ativo?: boolean
          avatar_url?: string | null
          cargo?: string | null
          created_at?: string
          id?: string
          nome_completo?: string
          setor?: string | null
          telefone?: string | null
          tenant_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      receitas: {
        Row: {
          categoria_economica: string
          created_at: string
          descricao: string
          desdobramento: string | null
          especie: string | null
          exercicio: number
          fonte_recurso: string
          id: string
          mes_referencia: number | null
          origem: string
          previsao_atualizada: number
          previsao_inicial: number
          status: Database["public"]["Enums"]["status_processo"]
          tenant_id: string
          updated_at: string
          valor_arrecadado: number
        }
        Insert: {
          categoria_economica: string
          created_at?: string
          descricao: string
          desdobramento?: string | null
          especie?: string | null
          exercicio: number
          fonte_recurso: string
          id?: string
          mes_referencia?: number | null
          origem: string
          previsao_atualizada?: number
          previsao_inicial?: number
          status?: Database["public"]["Enums"]["status_processo"]
          tenant_id: string
          updated_at?: string
          valor_arrecadado?: number
        }
        Update: {
          categoria_economica?: string
          created_at?: string
          descricao?: string
          desdobramento?: string | null
          especie?: string | null
          exercicio?: number
          fonte_recurso?: string
          id?: string
          mes_referencia?: number | null
          origem?: string
          previsao_atualizada?: number
          previsao_inicial?: number
          status?: Database["public"]["Enums"]["status_processo"]
          tenant_id?: string
          updated_at?: string
          valor_arrecadado?: number
        }
        Relationships: [
          {
            foreignKeyName: "receitas_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          ativo: boolean
          cnpj: string
          created_at: string
          id: string
          logo_url: string | null
          municipio: string
          nome: string
          uf: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          cnpj: string
          created_at?: string
          id?: string
          logo_url?: string | null
          municipio: string
          nome: string
          uf?: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          cnpj?: string
          created_at?: string
          id?: string
          logo_url?: string | null
          municipio?: string
          nome?: string
          uf?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          tenant_id: string
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          tenant_id: string
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          tenant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_tenant_id: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      registrar_auditoria: {
        Args: {
          _acao: string
          _dados_anteriores?: Json
          _dados_novos?: Json
          _entidade: string
          _entidade_id?: string
          _tenant_id: string
        }
        Returns: string
      }
      user_belongs_to_tenant: { Args: { _tenant_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "servidor" | "auditor" | "publico"
      status_processo:
        | "rascunho"
        | "em_andamento"
        | "aprovado"
        | "rejeitado"
        | "concluido"
        | "cancelado"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "servidor", "auditor", "publico"],
      status_processo: [
        "rascunho",
        "em_andamento",
        "aprovado",
        "rejeitado",
        "concluido",
        "cancelado",
      ],
    },
  },
} as const
