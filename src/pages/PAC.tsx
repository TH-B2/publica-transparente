import AppLayout from "@/components/AppLayout";
import { motion } from "framer-motion";
import { Plus, Search, Filter, FileText, Calendar, DollarSign } from "lucide-react";
import StatusTimeline from "@/components/StatusTimeline";

const pacItems = [
  {
    id: "PAC-2026/001",
    objeto: "Aquisição de equipamentos de informática",
    setor: "Tecnologia da Informação",
    valorEstimado: "R$ 450.000,00",
    categoria: "Bens",
    status: "Aprovado",
    previsao: "1º Trimestre",
  },
  {
    id: "PAC-2026/002",
    objeto: "Contratação de serviços de limpeza",
    setor: "Administração Geral",
    valorEstimado: "R$ 720.000,00",
    categoria: "Serviços",
    status: "Em execução",
    previsao: "1º Trimestre",
  },
  {
    id: "PAC-2026/003",
    objeto: "Reforma da sede administrativa",
    setor: "Infraestrutura",
    valorEstimado: "R$ 1.200.000,00",
    categoria: "Obras",
    status: "Rascunho",
    previsao: "2º Trimestre",
  },
  {
    id: "PAC-2026/004",
    objeto: "Material de expediente e escritório",
    setor: "Administração Geral",
    valorEstimado: "R$ 95.000,00",
    categoria: "Bens",
    status: "Publicado",
    previsao: "1º Semestre",
  },
  {
    id: "PAC-2026/005",
    objeto: "Serviços de assessoria jurídica",
    setor: "Jurídico",
    valorEstimado: "R$ 280.000,00",
    categoria: "Serviços",
    status: "Aprovado",
    previsao: "Contínuo",
  },
];

const statusColors: Record<string, string> = {
  Rascunho: "bg-muted text-muted-foreground",
  Aprovado: "bg-info/10 text-info",
  "Em execução": "bg-accent/10 text-accent-foreground",
  Publicado: "bg-success/10 text-success",
};

export default function PAC() {
  return (
    <AppLayout
      title="Plano Anual de Contratações"
      subtitle="PAC 2026 — Exercício vigente"
    >
      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por objeto, código ou setor..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-card rounded-lg border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg text-muted-foreground hover:bg-muted transition-colors">
          <Filter className="w-4 h-4" /> Filtros
        </button>
        <button className="ml-auto flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Novo Item
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total de Itens", value: "194", icon: FileText },
          { label: "Valor Estimado Total", value: "R$ 12.450.000", icon: DollarSign },
          { label: "Itens Executados", value: "132", icon: Calendar },
          { label: "Taxa de Execução", value: "68%", icon: Calendar },
        ].map((item) => (
          <div key={item.label} className="stat-card flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
              <item.icon className="w-4 h-4 text-foreground" />
            </div>
            <div>
              <p className="text-lg font-bold font-heading text-foreground">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="stat-card overflow-x-auto"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-muted-foreground border-b border-border">
              <th className="text-left py-3 font-medium">Código</th>
              <th className="text-left py-3 font-medium">Objeto</th>
              <th className="text-left py-3 font-medium">Setor</th>
              <th className="text-left py-3 font-medium">Categoria</th>
              <th className="text-right py-3 font-medium">Valor Estimado</th>
              <th className="text-center py-3 font-medium">Previsão</th>
              <th className="text-center py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {pacItems.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <td className="py-3 font-medium text-foreground">{item.id}</td>
                <td className="py-3 text-foreground max-w-[250px]">{item.objeto}</td>
                <td className="py-3 text-muted-foreground">{item.setor}</td>
                <td className="py-3">
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded-md text-secondary-foreground">
                    {item.categoria}
                  </span>
                </td>
                <td className="py-3 text-right font-medium text-foreground">{item.valorEstimado}</td>
                <td className="py-3 text-center text-muted-foreground text-xs">{item.previsao}</td>
                <td className="py-3 text-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[item.status]}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </AppLayout>
  );
}
