import AppLayout from "@/components/AppLayout";
import StatCard from "@/components/StatCard";
import StatusTimeline from "@/components/StatusTimeline";
import { motion } from "framer-motion";
import {
  FileText,
  ShoppingCart,
  Wallet,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

const monthlyData = [
  { mes: "Jan", empenhado: 1200000, liquidado: 980000, pago: 850000 },
  { mes: "Fev", empenhado: 1400000, liquidado: 1100000, pago: 950000 },
  { mes: "Mar", empenhado: 1100000, liquidado: 900000, pago: 780000 },
  { mes: "Abr", empenhado: 1600000, liquidado: 1300000, pago: 1100000 },
  { mes: "Mai", empenhado: 1350000, liquidado: 1200000, pago: 1050000 },
  { mes: "Jun", empenhado: 1500000, liquidado: 1250000, pago: 1180000 },
];

const modalidadeData = [
  { name: "Pregão Eletrônico", value: 42, color: "hsl(215, 65%, 22%)" },
  { name: "Dispensa", value: 28, color: "hsl(42, 90%, 50%)" },
  { name: "Inexigibilidade", value: 12, color: "hsl(152, 60%, 40%)" },
  { name: "Concorrência", value: 10, color: "hsl(205, 80%, 50%)" },
  { name: "Outros", value: 8, color: "hsl(215, 15%, 70%)" },
];

const recentContracts = [
  {
    id: "CT-2026/001",
    objeto: "Serviços de limpeza predial",
    fornecedor: "Clean Services Ltda",
    valor: "R$ 480.000,00",
    status: "Em execução",
  },
  {
    id: "CT-2026/002",
    objeto: "Aquisição de material de escritório",
    fornecedor: "Papelaria Central",
    valor: "R$ 85.000,00",
    status: "Liquidado",
  },
  {
    id: "CT-2026/003",
    objeto: "Manutenção de frota veicular",
    fornecedor: "Auto Mecânica SP",
    valor: "R$ 320.000,00",
    status: "Empenhado",
  },
  {
    id: "CT-2026/004",
    objeto: "Serviços de TI - suporte técnico",
    fornecedor: "TechSupport S.A.",
    valor: "R$ 156.000,00",
    status: "Em análise",
  },
];

const timelineSteps = [
  { label: "DFD", status: "completed" as const, date: "10/01" },
  { label: "ETP", status: "completed" as const, date: "15/01" },
  { label: "TR", status: "completed" as const, date: "22/01" },
  { label: "Pesquisa", status: "current" as const, date: "Em andamento" },
  { label: "Parecer", status: "pending" as const },
  { label: "Edital", status: "pending" as const },
  { label: "Contrato", status: "pending" as const },
];

const statusColors: Record<string, string> = {
  "Em execução": "bg-info/10 text-info",
  "Liquidado": "bg-success/10 text-success",
  "Empenhado": "bg-accent/10 text-accent-foreground",
  "Em análise": "bg-warning/10 text-warning",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", notation: "compact" }).format(value);

export default function Dashboard() {
  return (
    <AppLayout title="Painel Geral" subtitle="Visão consolidada da execução orçamentária e contratações">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Orçamento Empenhado"
          value="R$ 8,15M"
          icon={Wallet}
          variant="primary"
          trend={{ value: "12%", positive: true }}
          subtitle="67% do orçamento anual"
        />
        <StatCard
          title="Contratações Ativas"
          value="47"
          icon={ShoppingCart}
          variant="accent"
          trend={{ value: "8 novas", positive: true }}
        />
        <StatCard
          title="PAC - Itens Executados"
          value="68%"
          icon={FileText}
          variant="success"
          subtitle="132 de 194 itens"
        />
        <StatCard
          title="Alertas Pendentes"
          value="5"
          icon={AlertTriangle}
          variant="warning"
          subtitle="3 prazos próximos"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 stat-card"
        >
          <h3 className="font-heading font-semibold text-foreground mb-4">
            Execução Orçamentária Mensal
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="empenhado" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(215, 65%, 22%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(215, 65%, 22%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="pago" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(152, 60%, 40%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(152, 60%, 40%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
              <XAxis dataKey="mes" tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 50%)" />
              <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" />
              <Tooltip
                formatter={(value: number) =>
                  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
                }
              />
              <Area type="monotone" dataKey="empenhado" stroke="hsl(215, 65%, 22%)" fill="url(#empenhado)" strokeWidth={2} />
              <Area type="monotone" dataKey="liquidado" stroke="hsl(42, 90%, 50%)" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
              <Area type="monotone" dataKey="pago" stroke="hsl(152, 60%, 40%)" fill="url(#pago)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-6 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-primary rounded" /> Empenhado</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-accent rounded" /> Liquidado</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-success rounded" /> Pago</span>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card"
        >
          <h3 className="font-heading font-semibold text-foreground mb-4">
            Modalidades de Contratação
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={modalidadeData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                stroke="none"
              >
                {modalidadeData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {modalidadeData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </span>
                <span className="font-medium text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Timeline + Recent Contracts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Process Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="stat-card"
        >
          <h3 className="font-heading font-semibold text-foreground mb-1">
            Processo em Destaque
          </h3>
          <p className="text-xs text-muted-foreground mb-4">PE-2026/015 - Serviços de Vigilância</p>
          <StatusTimeline steps={timelineSteps} />
          <div className="mt-5 flex gap-2">
            <span className="text-xs bg-info/10 text-info px-2 py-1 rounded-md font-medium">
              Fase: Pesquisa de Preços
            </span>
          </div>
        </motion.div>

        {/* Recent Contracts Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-2 stat-card"
        >
          <h3 className="font-heading font-semibold text-foreground mb-4">
            Contratações Recentes
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-left py-2 font-medium">Nº</th>
                  <th className="text-left py-2 font-medium">Objeto</th>
                  <th className="text-left py-2 font-medium">Fornecedor</th>
                  <th className="text-right py-2 font-medium">Valor</th>
                  <th className="text-center py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentContracts.map((c) => (
                  <tr key={c.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 font-medium text-foreground">{c.id}</td>
                    <td className="py-2.5 text-muted-foreground max-w-[200px] truncate">{c.objeto}</td>
                    <td className="py-2.5 text-muted-foreground">{c.fornecedor}</td>
                    <td className="py-2.5 text-right font-medium text-foreground">{c.valor}</td>
                    <td className="py-2.5 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[c.status]}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
