import AppLayout from "@/components/AppLayout";
import { motion } from "framer-motion";
import StatusTimeline from "@/components/StatusTimeline";
import { Search, Filter, Plus, ExternalLink } from "lucide-react";

const contratacoes = [
  {
    id: "PE-2026/001",
    objeto: "Serviços de vigilância patrimonial",
    modalidade: "Pregão Eletrônico",
    fornecedor: "Vigil Security Ltda",
    valor: "R$ 960.000,00",
    fase: "Contrato assinado",
    steps: [
      { label: "DFD", status: "completed" as const },
      { label: "ETP", status: "completed" as const },
      { label: "TR", status: "completed" as const },
      { label: "Edital", status: "completed" as const },
      { label: "Contrato", status: "completed" as const },
    ],
  },
  {
    id: "PE-2026/005",
    objeto: "Aquisição de mobiliário",
    modalidade: "Pregão Eletrônico",
    fornecedor: "—",
    valor: "R$ 340.000,00",
    fase: "Pesquisa de Preços",
    steps: [
      { label: "DFD", status: "completed" as const },
      { label: "ETP", status: "completed" as const },
      { label: "TR", status: "completed" as const },
      { label: "Pesquisa", status: "current" as const },
      { label: "Edital", status: "pending" as const },
    ],
  },
  {
    id: "DL-2026/012",
    objeto: "Manutenção de ar-condicionado",
    modalidade: "Dispensa",
    fornecedor: "Clima Frio ME",
    valor: "R$ 48.000,00",
    fase: "Liquidação",
    steps: [
      { label: "DFD", status: "completed" as const },
      { label: "Pesquisa", status: "completed" as const },
      { label: "Contrato", status: "completed" as const },
      { label: "Empenho", status: "completed" as const },
      { label: "Liquidação", status: "current" as const },
    ],
  },
  {
    id: "CC-2026/002",
    objeto: "Construção de quadra poliesportiva",
    modalidade: "Concorrência",
    fornecedor: "—",
    valor: "R$ 2.800.000,00",
    fase: "Elaboração do TR",
    steps: [
      { label: "DFD", status: "completed" as const },
      { label: "ETP", status: "completed" as const },
      { label: "TR", status: "current" as const },
      { label: "Edital", status: "pending" as const },
      { label: "Contrato", status: "pending" as const },
    ],
  },
];

const modalidadeColors: Record<string, string> = {
  "Pregão Eletrônico": "bg-primary/10 text-primary",
  Dispensa: "bg-accent/10 text-accent-foreground",
  Concorrência: "bg-info/10 text-info",
  Inexigibilidade: "bg-warning/10 text-warning",
};

export default function Contratacoes() {
  return (
    <AppLayout
      title="Contratações"
      subtitle="Processos de contratação em andamento e concluídos"
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar processos..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-card rounded-lg border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg text-muted-foreground hover:bg-muted transition-colors">
          <Filter className="w-4 h-4" /> Filtros
        </button>
        <button className="ml-auto flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Nova Contratação
        </button>
      </div>

      <div className="space-y-4">
        {contratacoes.map((c, idx) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="stat-card"
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-heading font-semibold text-foreground">{c.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${modalidadeColors[c.modalidade] || "bg-muted text-muted-foreground"}`}>
                    {c.modalidade}
                  </span>
                </div>
                <p className="text-foreground mb-1">{c.objeto}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                  <span>Fornecedor: <strong className="text-foreground">{c.fornecedor}</strong></span>
                  <span>Valor: <strong className="text-foreground">{c.valor}</strong></span>
                  <span>Fase: <strong className="text-foreground">{c.fase}</strong></span>
                </div>
              </div>
              <div className="lg:w-72 flex-shrink-0">
                <StatusTimeline steps={c.steps} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AppLayout>
  );
}
