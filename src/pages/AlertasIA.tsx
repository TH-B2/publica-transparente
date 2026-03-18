import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import StatCard from "@/components/StatCard";
import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert, ShieldCheck, Bell, Eye, CheckCircle2, Filter, Search, ExternalLink } from "lucide-react";

const alertasMock = [
  {
    id: "1",
    tipo_alerta: "Sobrepreço detectado",
    descricao: "O valor unitário do item 'Monitor LED 24\"' no empenho 2026NE00145 está 32% acima da mediana de mercado segundo o painel de preços do governo federal.",
    nivel_risco: "alto",
    entidade_origem: "empenhos",
    entidade_id: "2026NE00145",
    lido: false,
    resolvido: false,
    created_at: "2026-03-18T10:30:00",
  },
  {
    id: "2",
    tipo_alerta: "Fracionamento de despesa",
    descricao: "Foram identificados 4 empenhos para o mesmo fornecedor (CNPJ: 12.345.678/0001-90) na mesma natureza de despesa, totalizando R$ 89.500,00, valor próximo ao limite de dispensa de licitação.",
    nivel_risco: "critico",
    entidade_origem: "despesas",
    entidade_id: null,
    lido: false,
    resolvido: false,
    created_at: "2026-03-17T14:20:00",
  },
  {
    id: "3",
    tipo_alerta: "Limite prudencial atingido",
    descricao: "A despesa com pessoal atingiu 51,8% da Receita Corrente Líquida, ultrapassando o limite prudencial de 51,3% (95% do limite máximo de 54%). Medidas restritivas da LRF devem ser adotadas.",
    nivel_risco: "alto",
    entidade_origem: "contabilidade",
    entidade_id: null,
    lido: true,
    resolvido: false,
    created_at: "2026-03-16T09:15:00",
  },
  {
    id: "4",
    tipo_alerta: "Contrato próximo ao vencimento",
    descricao: "O contrato CT-2025/087 (Serviços de Vigilância) vence em 15 dias. É necessário providenciar prorrogação ou nova contratação para evitar descontinuidade.",
    nivel_risco: "medio",
    entidade_origem: "contratos",
    entidade_id: "CT-2025/087",
    lido: true,
    resolvido: false,
    created_at: "2026-03-15T16:45:00",
  },
  {
    id: "5",
    tipo_alerta: "Padrão incomum de pagamentos",
    descricao: "Volume atípico de pagamentos no último dia útil do mês de fevereiro/2026: 23 pagamentos totalizando R$ 1.2M, representando 45% do total mensal.",
    nivel_risco: "medio",
    entidade_origem: "pagamentos",
    entidade_id: null,
    lido: false,
    resolvido: false,
    created_at: "2026-03-14T11:00:00",
  },
  {
    id: "6",
    tipo_alerta: "Fornecedor com pendências",
    descricao: "O fornecedor 'ABC Construções Ltda' possui CND Federal vencida desde 01/03/2026. Há 2 empenhos em andamento vinculados a este fornecedor.",
    nivel_risco: "baixo",
    entidade_origem: "fornecedores",
    entidade_id: null,
    lido: true,
    resolvido: true,
    created_at: "2026-03-13T08:30:00",
  },
];

const riskColors: Record<string, string> = {
  critico: "bg-destructive/10 text-destructive border-destructive/20",
  alto: "bg-warning/10 text-warning border-warning/20",
  medio: "bg-accent/10 text-accent-foreground border-accent/20",
  baixo: "bg-info/10 text-info border-info/20",
};

const riskLabels: Record<string, string> = {
  critico: "Crítico",
  alto: "Alto",
  medio: "Médio",
  baixo: "Baixo",
};

export default function AlertasIA() {
  const [filtroRisco, setFiltroRisco] = useState<string | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<string | null>(null);

  const alertasFiltrados = alertasMock.filter((a) => {
    if (filtroRisco && a.nivel_risco !== filtroRisco) return false;
    if (filtroStatus === "pendente" && a.resolvido) return false;
    if (filtroStatus === "resolvido" && !a.resolvido) return false;
    return true;
  });

  const criticos = alertasMock.filter((a) => a.nivel_risco === "critico" && !a.resolvido).length;
  const altos = alertasMock.filter((a) => a.nivel_risco === "alto" && !a.resolvido).length;
  const pendentes = alertasMock.filter((a) => !a.resolvido).length;
  const resolvidos = alertasMock.filter((a) => a.resolvido).length;

  return (
    <AppLayout title="Alertas Inteligentes" subtitle="Análises automatizadas por IA para detecção de irregularidades e riscos">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Alertas Críticos" value={String(criticos)} icon={ShieldAlert} variant="warning" />
        <StatCard title="Risco Alto" value={String(altos)} icon={AlertTriangle} variant="primary" />
        <StatCard title="Pendentes" value={String(pendentes)} icon={Bell} />
        <StatCard title="Resolvidos" value={String(resolvidos)} icon={ShieldCheck} variant="success" />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFiltroRisco(null)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${!filtroRisco ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
        >
          Todos
        </button>
        {["critico", "alto", "medio", "baixo"].map((r) => (
          <button
            key={r}
            onClick={() => setFiltroRisco(r)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filtroRisco === r ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
          >
            {riskLabels[r]}
          </button>
        ))}
        <div className="border-l border-border mx-2" />
        <button
          onClick={() => setFiltroStatus(filtroStatus === "pendente" ? null : "pendente")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filtroStatus === "pendente" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
        >
          Pendentes
        </button>
        <button
          onClick={() => setFiltroStatus(filtroStatus === "resolvido" ? null : "resolvido")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filtroStatus === "resolvido" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
        >
          Resolvidos
        </button>
      </div>

      {/* Lista de alertas */}
      <div className="space-y-3">
        {alertasFiltrados.map((alerta, i) => (
          <motion.div
            key={alerta.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`stat-card border-l-4 ${riskColors[alerta.nivel_risco]} ${alerta.resolvido ? "opacity-60" : ""}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${riskColors[alerta.nivel_risco]}`}>
                    {riskLabels[alerta.nivel_risco]}
                  </span>
                  <h4 className="font-medium text-foreground">{alerta.tipo_alerta}</h4>
                  {!alerta.lido && <span className="w-2 h-2 bg-destructive rounded-full" />}
                  {alerta.resolvido && (
                    <span className="flex items-center gap-1 text-xs text-success">
                      <CheckCircle2 className="w-3 h-3" /> Resolvido
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{alerta.descricao}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Origem: {alerta.entidade_origem}</span>
                  {alerta.entidade_id && <span>Ref: {alerta.entidade_id}</span>}
                  <span>{new Date(alerta.created_at).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {alerta.entidade_id && (
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors" title="Ver origem">
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
                {!alerta.resolvido && (
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors" title="Marcar como resolvido">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info sobre integração n8n */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 stat-card bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground text-sm">Integração com n8n + IA</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Os alertas são gerados automaticamente via webhook do n8n, que analisa novas despesas, contratos e atualizações
              orçamentárias usando IA (ChatGPT). O prompt de auditoria identifica irregularidades, sobrepreço, padrões incomuns
              e riscos fiscais, classificando cada alerta por nível de risco.
            </p>
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
}
