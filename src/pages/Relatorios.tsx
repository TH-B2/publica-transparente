import AppLayout from "@/components/AppLayout";
import { motion } from "framer-motion";
import { BarChart3, Download, FileText, TrendingUp, PieChart } from "lucide-react";

const relatorios = [
  { nome: "Execução Orçamentária Mensal", descricao: "Comparativo de empenhos, liquidações e pagamentos por mês", tipo: "Orçamentário", icon: TrendingUp },
  { nome: "PAC x Executado", descricao: "Comparativo entre planejado no PAC e efetivamente contratado", tipo: "Planejamento", icon: BarChart3 },
  { nome: "Despesas por Setor", descricao: "Detalhamento de despesas por unidade administrativa", tipo: "Gerencial", icon: PieChart },
  { nome: "Despesas por Fornecedor", descricao: "Ranking de fornecedores por volume de pagamentos", tipo: "Gerencial", icon: BarChart3 },
  { nome: "Despesas por Natureza", descricao: "Classificação das despesas por natureza da despesa", tipo: "Orçamentário", icon: FileText },
  { nome: "Relatório de Conformidade Legal", descricao: "Indicadores de conformidade com a Lei 14.133/2021", tipo: "Compliance", icon: FileText },
  { nome: "Folha de Pagamento Consolidada", descricao: "Resumo mensal da folha de pagamento por setor", tipo: "Pessoal", icon: BarChart3 },
  { nome: "Contratos Vigentes", descricao: "Lista de todos os contratos ativos com prazos e valores", tipo: "Contratações", icon: FileText },
];

const tipoCores: Record<string, string> = {
  Orçamentário: "bg-primary/10 text-primary",
  Planejamento: "bg-accent/10 text-accent-foreground",
  Gerencial: "bg-info/10 text-info",
  Compliance: "bg-warning/10 text-warning",
  Pessoal: "bg-success/10 text-success",
  Contratações: "bg-secondary text-secondary-foreground",
};

export default function Relatorios() {
  return (
    <AppLayout title="Relatórios" subtitle="Relatórios gerenciais e legais do sistema">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relatorios.map((r) => {
          const Icon = r.icon;
          return (
            <motion.div key={r.nome} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm">{r.nome}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{r.descricao}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${tipoCores[r.tipo]}`}>{r.tipo}</span>
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button className="p-2 rounded-lg hover:bg-secondary transition-colors" title="Exportar PDF">
                  <Download className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </AppLayout>
  );
}
