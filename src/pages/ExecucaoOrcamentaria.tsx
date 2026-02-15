import AppLayout from "@/components/AppLayout";
import StatCard from "@/components/StatCard";
import { motion } from "framer-motion";
import { DollarSign, FileCheck, CreditCard, TrendingUp, Search, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const dotacaoData = [
  { dotacao: "03.01.04.122", descricao: "Administração Geral", empenhado: 2100000, liquidado: 1800000, pago: 1600000, saldo: 900000 },
  { dotacao: "05.02.12.361", descricao: "Ensino Fundamental", empenhado: 3400000, liquidado: 2900000, pago: 2500000, saldo: 1600000 },
  { dotacao: "07.01.10.301", descricao: "Atenção Básica", empenhado: 2800000, liquidado: 2400000, pago: 2100000, saldo: 1200000 },
  { dotacao: "04.01.15.451", descricao: "Infraestrutura", empenhado: 1500000, liquidado: 1100000, pago: 900000, saldo: 2500000 },
];

const chartData = dotacaoData.map((d) => ({
  name: d.dotacao.split(".").pop(),
  Empenhado: d.empenhado / 1000,
  Liquidado: d.liquidado / 1000,
  Pago: d.pago / 1000,
}));

const formatBRL = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

export default function ExecucaoOrcamentaria() {
  return (
    <AppLayout title="Execução Orçamentária" subtitle="Acompanhamento de empenhos, liquidações e pagamentos">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Empenhado" value="R$ 9,8M" icon={DollarSign} variant="primary" trend={{ value: "15%", positive: true }} />
        <StatCard title="Total Liquidado" value="R$ 8,2M" icon={FileCheck} variant="accent" />
        <StatCard title="Total Pago" value="R$ 7,1M" icon={CreditCard} variant="success" />
        <StatCard title="Saldo Disponível" value="R$ 6,2M" icon={TrendingUp} subtitle="34% do orçamento" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
          <h3 className="font-heading font-semibold text-foreground mb-4">Execução por Dotação (R$ mil)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" />
              <Tooltip />
              <Bar dataKey="Empenhado" fill="hsl(215, 65%, 22%)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Liquidado" fill="hsl(42, 90%, 50%)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Pago" fill="hsl(152, 60%, 40%)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card">
          <h3 className="font-heading font-semibold text-foreground mb-4">Dotações Orçamentárias</h3>
          <div className="space-y-3">
            {dotacaoData.map((d) => {
              const pct = Math.round((d.pago / (d.empenhado + d.saldo)) * 100);
              return (
                <div key={d.dotacao} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{d.dotacao}</span>
                    <span className="text-xs text-muted-foreground">{d.descricao}</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Pago: {formatBRL(d.pago)}</span>
                    <span>Saldo: {formatBRL(d.saldo)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
