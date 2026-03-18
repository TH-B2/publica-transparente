import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import StatCard from "@/components/StatCard";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, BarChart3, FileText, Plus, Search, Filter, ArrowUpDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

const tabs = ["Visão Geral", "Receitas", "Despesas", "Empenhos", "Liquidações", "Pagamentos", "Plano de Contas"];

const evolucaoMensal = [
  { mes: "Jan", receitas: 2800, despesas: 2200 },
  { mes: "Fev", receitas: 3100, despesas: 2500 },
  { mes: "Mar", receitas: 2600, despesas: 2100 },
  { mes: "Abr", receitas: 3500, despesas: 2900 },
  { mes: "Mai", receitas: 3200, despesas: 2700 },
  { mes: "Jun", receitas: 3800, despesas: 3100 },
];

const despesasPorCategoria = [
  { name: "Pessoal e Encargos", value: 45, color: "hsl(215, 65%, 22%)" },
  { name: "Outras Desp. Correntes", value: 25, color: "hsl(42, 90%, 50%)" },
  { name: "Investimentos", value: 18, color: "hsl(152, 60%, 40%)" },
  { name: "Amortiz. da Dívida", value: 8, color: "hsl(205, 80%, 50%)" },
  { name: "Reserva", value: 4, color: "hsl(215, 15%, 70%)" },
];

const classesContabeis = [
  { classe: 1, nome: "Ativo", natureza: "Devedora", contas: 48 },
  { classe: 2, nome: "Passivo e PL", natureza: "Credora", contas: 35 },
  { classe: 3, nome: "VPD", natureza: "Devedora", contas: 42 },
  { classe: 4, nome: "VPA", natureza: "Credora", contas: 38 },
  { classe: 5, nome: "Orçamentário (Aprovação)", natureza: "Devedora", contas: 22 },
  { classe: 6, nome: "Orçamentário (Execução)", natureza: "Credora", contas: 28 },
  { classe: 7, nome: "Controle (Devedora)", natureza: "Devedora", contas: 15 },
  { classe: 8, nome: "Controle (Credora)", natureza: "Credora", contas: 12 },
];

const empenhosMock = [
  { numero: "2026NE00145", data: "15/03/2026", credor: "Tech Solutions Ltda", tipo: "Ordinário", valor: 85000, objeto: "Equipamentos de informática", status: "Em andamento" },
  { numero: "2026NE00144", data: "14/03/2026", credor: "Construtora ABC", tipo: "Global", valor: 450000, objeto: "Reforma do prédio sede", status: "Em andamento" },
  { numero: "2026NE00143", data: "12/03/2026", credor: "Papelaria Central", tipo: "Estimativo", valor: 32000, objeto: "Material de consumo", status: "Liquidado" },
  { numero: "2026NE00142", data: "10/03/2026", credor: "Clean Services", tipo: "Global", valor: 180000, objeto: "Serviço de limpeza", status: "Pago" },
];

const formatBRL = (v: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
const formatK = (v: number) => `R$ ${v}k`;

export default function Contabilidade() {
  const [activeTab, setActiveTab] = useState("Visão Geral");

  return (
    <AppLayout title="Contabilidade" subtitle="Módulo contábil integrado — PCASP e classificação orçamentária">
      {/* Tabs */}
      <div className="flex gap-1 bg-secondary/50 rounded-lg p-1 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Visão Geral" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title="Receita Arrecadada" value="R$ 19,0M" icon={TrendingUp} variant="success" trend={{ value: "8%", positive: true }} />
            <StatCard title="Despesa Executada" value="R$ 15,5M" icon={TrendingDown} variant="primary" />
            <StatCard title="Superávit" value="R$ 3,5M" icon={DollarSign} variant="accent" subtitle="18,4% da receita" />
            <StatCard title="% Execução" value="81,6%" icon={BarChart3} subtitle="Meta: 85%" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
              <h3 className="font-heading font-semibold text-foreground mb-4">Evolução Receita vs Despesa (R$ mil)</h3>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={evolucaoMensal}>
                  <defs>
                    <linearGradient id="receitas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(152, 60%, 40%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(152, 60%, 40%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="despesas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                  <XAxis dataKey="mes" tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 50%)" />
                  <YAxis tickFormatter={formatK} tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" />
                  <Tooltip formatter={(v: number) => `R$ ${v}k`} />
                  <Area type="monotone" dataKey="receitas" stroke="hsl(152, 60%, 40%)" fill="url(#receitas)" strokeWidth={2} />
                  <Area type="monotone" dataKey="despesas" stroke="hsl(0, 72%, 51%)" fill="url(#despesas)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card">
              <h3 className="font-heading font-semibold text-foreground mb-4">Despesas por Categoria Econômica</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={despesasPorCategoria} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                    {despesasPorCategoria.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-2">
                {despesasPorCategoria.map((item) => (
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

          {/* Indicadores LRF */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="stat-card">
            <h3 className="font-heading font-semibold text-foreground mb-4">Indicadores LRF</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Despesa com Pessoal", valor: 48.2, limite: 54, alerta: 51.3 },
                { label: "Dívida Consolidada", valor: 65, limite: 120, alerta: 108 },
                { label: "Operações de Crédito", valor: 8.5, limite: 16, alerta: 14.4 },
              ].map((ind) => {
                const pct = (ind.valor / ind.limite) * 100;
                const danger = ind.valor >= ind.alerta;
                return (
                  <div key={ind.label} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{ind.label}</span>
                      <span className={`font-semibold ${danger ? "text-destructive" : "text-foreground"}`}>{ind.valor}%</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${danger ? "bg-destructive" : "bg-primary"}`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                      <span>Limite prudencial: {ind.alerta}%</span>
                      <span>Limite máximo: {ind.limite}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}

      {activeTab === "Empenhos" && (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Buscar empenho..." className="pl-9 pr-4 py-2 text-sm bg-card rounded-lg border border-border outline-none focus:ring-2 focus:ring-primary/20 w-64" />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-card rounded-lg border border-border text-muted-foreground hover:text-foreground">
                <Filter className="w-4 h-4" /> Filtros
              </button>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90">
              <Plus className="w-4 h-4" /> Novo Empenho
            </button>
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground border-b border-border">
                    <th className="text-left py-2.5 font-medium">Número</th>
                    <th className="text-left py-2.5 font-medium">Data</th>
                    <th className="text-left py-2.5 font-medium">Credor</th>
                    <th className="text-left py-2.5 font-medium">Tipo</th>
                    <th className="text-left py-2.5 font-medium">Objeto</th>
                    <th className="text-right py-2.5 font-medium">Valor</th>
                    <th className="text-center py-2.5 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {empenhosMock.map((e) => (
                    <tr key={e.numero} className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer">
                      <td className="py-3 font-medium text-foreground">{e.numero}</td>
                      <td className="py-3 text-muted-foreground">{e.data}</td>
                      <td className="py-3 text-muted-foreground">{e.credor}</td>
                      <td className="py-3"><span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{e.tipo}</span></td>
                      <td className="py-3 text-muted-foreground max-w-[200px] truncate">{e.objeto}</td>
                      <td className="py-3 text-right font-medium text-foreground">{formatBRL(e.valor)}</td>
                      <td className="py-3 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          e.status === "Pago" ? "bg-success/10 text-success" :
                          e.status === "Liquidado" ? "bg-accent/10 text-accent-foreground" :
                          "bg-info/10 text-info"
                        }`}>{e.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}

      {activeTab === "Plano de Contas" && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">PCASP — Plano de Contas Aplicado ao Setor Público</h3>
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90">
              <Plus className="w-4 h-4" /> Importar Plano
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-center py-2.5 font-medium w-16">Classe</th>
                  <th className="text-left py-2.5 font-medium">Denominação</th>
                  <th className="text-center py-2.5 font-medium">Natureza</th>
                  <th className="text-center py-2.5 font-medium">Contas Cadastradas</th>
                </tr>
              </thead>
              <tbody>
                {classesContabeis.map((c) => (
                  <tr key={c.classe} className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer">
                    <td className="py-3 text-center">
                      <span className="w-8 h-8 inline-flex items-center justify-center bg-primary/10 text-primary rounded-lg font-bold text-sm">{c.classe}</span>
                    </td>
                    <td className="py-3 font-medium text-foreground">{c.nome}</td>
                    <td className="py-3 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.natureza === "Devedora" ? "bg-info/10 text-info" : "bg-accent/10 text-accent-foreground"}`}>
                        {c.natureza}
                      </span>
                    </td>
                    <td className="py-3 text-center text-muted-foreground">{c.contas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {(activeTab === "Receitas" || activeTab === "Despesas" || activeTab === "Liquidações" || activeTab === "Pagamentos") && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-semibold text-foreground">{activeTab}</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder={`Buscar ${activeTab.toLowerCase()}...`} className="pl-9 pr-4 py-2 text-sm bg-background rounded-lg border border-border outline-none focus:ring-2 focus:ring-primary/20 w-64" />
              </div>
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90">
                <Plus className="w-4 h-4" /> Novo Registro
              </button>
            </div>
          </div>
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Conecte ao banco de dados para visualizar {activeTab.toLowerCase()}</p>
            <p className="text-sm mt-1">Os dados serão carregados automaticamente após o login</p>
          </div>
        </motion.div>
      )}
    </AppLayout>
  );
}
