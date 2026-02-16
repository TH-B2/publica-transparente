import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import StatCard from "@/components/StatCard";
import { motion } from "framer-motion";
import {
  Users,
  Clock,
  DollarSign,
  Calendar,
  FileText,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  UserCheck,
  UserX,
  Briefcase,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- Dados mock ---
const servidores = [
  { id: 1, nome: "Ana Paula Silva", matricula: "SRV-001", cargo: "Analista Administrativo", setor: "Administração", status: "Ativo", admissao: "15/03/2018" },
  { id: 2, nome: "Carlos Eduardo Lima", matricula: "SRV-002", cargo: "Engenheiro Civil", setor: "Infraestrutura", status: "Ativo", admissao: "02/08/2019" },
  { id: 3, nome: "Maria José Santos", matricula: "SRV-003", cargo: "Enfermeira", setor: "Saúde", status: "Ativo", admissao: "10/01/2020" },
  { id: 4, nome: "Roberto Almeida", matricula: "SRV-004", cargo: "Professor", setor: "Educação", status: "Férias", admissao: "05/02/2017" },
  { id: 5, nome: "Juliana Costa", matricula: "SRV-005", cargo: "Assistente Social", setor: "Assistência Social", status: "Licença", admissao: "20/06/2021" },
  { id: 6, nome: "Fernando Oliveira", matricula: "SRV-006", cargo: "Técnico em Informática", setor: "TI", status: "Ativo", admissao: "12/11/2022" },
];

const folhaPonto = [
  { servidor: "Ana Paula Silva", data: "01/02/2026", entrada: "08:00", saida: "17:00", horas: "8h00", obs: "" },
  { servidor: "Ana Paula Silva", data: "02/02/2026", entrada: "08:15", saida: "17:30", horas: "8h15", obs: "Atraso justificado" },
  { servidor: "Carlos Eduardo Lima", data: "01/02/2026", entrada: "07:30", saida: "16:30", horas: "8h00", obs: "" },
  { servidor: "Carlos Eduardo Lima", data: "02/02/2026", entrada: "07:30", saida: "16:30", horas: "8h00", obs: "" },
  { servidor: "Maria José Santos", data: "01/02/2026", entrada: "07:00", saida: "13:00", horas: "6h00", obs: "Plantão" },
  { servidor: "Maria José Santos", data: "02/02/2026", entrada: "13:00", saida: "19:00", horas: "6h00", obs: "Plantão" },
];

const folhaPagamento = [
  { servidor: "Ana Paula Silva", matricula: "SRV-001", bruto: 6850.0, descontos: 1520.0, liquido: 5330.0, competencia: "01/2026" },
  { servidor: "Carlos Eduardo Lima", matricula: "SRV-002", bruto: 9200.0, descontos: 2340.0, liquido: 6860.0, competencia: "01/2026" },
  { servidor: "Maria José Santos", matricula: "SRV-003", bruto: 7500.0, descontos: 1850.0, liquido: 5650.0, competencia: "01/2026" },
  { servidor: "Roberto Almeida", matricula: "SRV-004", bruto: 5800.0, descontos: 1280.0, liquido: 4520.0, competencia: "01/2026" },
  { servidor: "Juliana Costa", matricula: "SRV-005", bruto: 5200.0, descontos: 1100.0, liquido: 4100.0, competencia: "01/2026" },
  { servidor: "Fernando Oliveira", matricula: "SRV-006", bruto: 4500.0, descontos: 920.0, liquido: 3580.0, competencia: "01/2026" },
];

const ferias = [
  { servidor: "Roberto Almeida", periodo: "01/02/2026 - 02/03/2026", dias: 30, status: "Em gozo", aquisitivo: "2024/2025" },
  { servidor: "Ana Paula Silva", periodo: "15/04/2026 - 14/05/2026", dias: 30, status: "Programada", aquisitivo: "2024/2025" },
  { servidor: "Carlos Eduardo Lima", periodo: "01/07/2026 - 15/07/2026", dias: 15, status: "Programada", aquisitivo: "2024/2025" },
];

const licencas = [
  { servidor: "Juliana Costa", tipo: "Licença Médica", inicio: "10/02/2026", fim: "10/03/2026", dias: 28, status: "Vigente" },
  { servidor: "Ana Paula Silva", tipo: "Licença Capacitação", inicio: "01/06/2026", fim: "30/06/2026", dias: 30, status: "Agendada" },
  { servidor: "Maria José Santos", tipo: "Licença Maternidade", inicio: "01/09/2025", fim: "28/12/2025", dias: 120, status: "Concluída" },
];

const formatBRL = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

const statusColors: Record<string, string> = {
  Ativo: "bg-success/10 text-success",
  Férias: "bg-info/10 text-info",
  Licença: "bg-warning/10 text-warning",
  Inativo: "bg-destructive/10 text-destructive",
  "Em gozo": "bg-info/10 text-info",
  Programada: "bg-accent/10 text-accent-foreground",
  Vigente: "bg-warning/10 text-warning",
  Agendada: "bg-accent/10 text-accent-foreground",
  Concluída: "bg-success/10 text-success",
};

export default function GestaoPessoal() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <AppLayout title="Gestão de Pessoal" subtitle="Gerenciamento de servidores, folha de ponto, pagamento, férias e licenças">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total de Servidores" value="248" icon={Users} variant="primary" trend={{ value: "6 novos", positive: true }} />
        <StatCard title="Em Atividade" value="221" icon={UserCheck} variant="success" subtitle="89% do quadro" />
        <StatCard title="Folha Mensal" value="R$ 1,2M" icon={DollarSign} variant="accent" />
        <StatCard title="Afastados" value="27" icon={UserX} variant="warning" subtitle="11 férias · 16 licenças" />
      </div>

      <Tabs defaultValue="servidores" className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="servidores" className="gap-1.5"><Users className="w-3.5 h-3.5" /> Servidores</TabsTrigger>
          <TabsTrigger value="ponto" className="gap-1.5"><Clock className="w-3.5 h-3.5" /> Folha de Ponto</TabsTrigger>
          <TabsTrigger value="pagamento" className="gap-1.5"><DollarSign className="w-3.5 h-3.5" /> Folha de Pagamento</TabsTrigger>
          <TabsTrigger value="ferias" className="gap-1.5"><Calendar className="w-3.5 h-3.5" /> Férias</TabsTrigger>
          <TabsTrigger value="licencas" className="gap-1.5"><FileText className="w-3.5 h-3.5" /> Licenças</TabsTrigger>
        </TabsList>

        {/* Servidores */}
        <TabsContent value="servidores">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-foreground">Informações Pessoais</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar servidor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 text-sm bg-secondary rounded-lg border-none outline-none focus:ring-2 focus:ring-primary/20 w-52 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  <Plus className="w-4 h-4" /> Novo Servidor
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground border-b border-border">
                    <th className="text-left py-2 font-medium">Matrícula</th>
                    <th className="text-left py-2 font-medium">Nome</th>
                    <th className="text-left py-2 font-medium">Cargo</th>
                    <th className="text-left py-2 font-medium">Setor</th>
                    <th className="text-left py-2 font-medium">Admissão</th>
                    <th className="text-center py-2 font-medium">Status</th>
                    <th className="text-center py-2 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {servidores
                    .filter((s) => s.nome.toLowerCase().includes(searchTerm.toLowerCase()) || s.matricula.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((s) => (
                      <tr key={s.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-2.5 font-medium text-foreground">{s.matricula}</td>
                        <td className="py-2.5 text-foreground">{s.nome}</td>
                        <td className="py-2.5 text-muted-foreground">{s.cargo}</td>
                        <td className="py-2.5 text-muted-foreground">{s.setor}</td>
                        <td className="py-2.5 text-muted-foreground">{s.admissao}</td>
                        <td className="py-2.5 text-center">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[s.status] || ""}`}>{s.status}</span>
                        </td>
                        <td className="py-2.5 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button className="p-1.5 rounded hover:bg-secondary transition-colors" title="Visualizar"><Eye className="w-3.5 h-3.5 text-muted-foreground" /></button>
                            <button className="p-1.5 rounded hover:bg-secondary transition-colors" title="Editar"><Edit className="w-3.5 h-3.5 text-muted-foreground" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </TabsContent>

        {/* Folha de Ponto */}
        <TabsContent value="ponto">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-foreground">Folha de Ponto</h3>
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Plus className="w-4 h-4" /> Registrar Ponto
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground border-b border-border">
                    <th className="text-left py-2 font-medium">Servidor</th>
                    <th className="text-left py-2 font-medium">Data</th>
                    <th className="text-center py-2 font-medium">Entrada</th>
                    <th className="text-center py-2 font-medium">Saída</th>
                    <th className="text-center py-2 font-medium">Horas</th>
                    <th className="text-left py-2 font-medium">Observação</th>
                  </tr>
                </thead>
                <tbody>
                  {folhaPonto.map((p, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2.5 font-medium text-foreground">{p.servidor}</td>
                      <td className="py-2.5 text-muted-foreground">{p.data}</td>
                      <td className="py-2.5 text-center text-foreground">{p.entrada}</td>
                      <td className="py-2.5 text-center text-foreground">{p.saida}</td>
                      <td className="py-2.5 text-center font-medium text-foreground">{p.horas}</td>
                      <td className="py-2.5 text-muted-foreground text-xs">{p.obs || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </TabsContent>

        {/* Folha de Pagamento */}
        <TabsContent value="pagamento">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-foreground">Folha de Pagamento — Competência 01/2026</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground border-b border-border">
                    <th className="text-left py-2 font-medium">Matrícula</th>
                    <th className="text-left py-2 font-medium">Servidor</th>
                    <th className="text-right py-2 font-medium">Bruto</th>
                    <th className="text-right py-2 font-medium">Descontos</th>
                    <th className="text-right py-2 font-medium">Líquido</th>
                  </tr>
                </thead>
                <tbody>
                  {folhaPagamento.map((p, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2.5 font-medium text-foreground">{p.matricula}</td>
                      <td className="py-2.5 text-foreground">{p.servidor}</td>
                      <td className="py-2.5 text-right text-foreground">{formatBRL(p.bruto)}</td>
                      <td className="py-2.5 text-right text-destructive">{formatBRL(p.descontos)}</td>
                      <td className="py-2.5 text-right font-semibold text-success">{formatBRL(p.liquido)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-border font-semibold">
                    <td className="py-3" colSpan={2}>Total</td>
                    <td className="py-3 text-right text-foreground">{formatBRL(folhaPagamento.reduce((a, b) => a + b.bruto, 0))}</td>
                    <td className="py-3 text-right text-destructive">{formatBRL(folhaPagamento.reduce((a, b) => a + b.descontos, 0))}</td>
                    <td className="py-3 text-right text-success">{formatBRL(folhaPagamento.reduce((a, b) => a + b.liquido, 0))}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </motion.div>
        </TabsContent>

        {/* Férias */}
        <TabsContent value="ferias">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-foreground">Programação de Férias</h3>
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Plus className="w-4 h-4" /> Programar Férias
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground border-b border-border">
                    <th className="text-left py-2 font-medium">Servidor</th>
                    <th className="text-left py-2 font-medium">Período Aquisitivo</th>
                    <th className="text-left py-2 font-medium">Período de Gozo</th>
                    <th className="text-center py-2 font-medium">Dias</th>
                    <th className="text-center py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ferias.map((f, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2.5 font-medium text-foreground">{f.servidor}</td>
                      <td className="py-2.5 text-muted-foreground">{f.aquisitivo}</td>
                      <td className="py-2.5 text-foreground">{f.periodo}</td>
                      <td className="py-2.5 text-center text-foreground">{f.dias}</td>
                      <td className="py-2.5 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[f.status] || ""}`}>{f.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </TabsContent>

        {/* Licenças e Afastamentos */}
        <TabsContent value="licencas">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-foreground">Licenças e Afastamentos</h3>
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Plus className="w-4 h-4" /> Registrar Licença
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground border-b border-border">
                    <th className="text-left py-2 font-medium">Servidor</th>
                    <th className="text-left py-2 font-medium">Tipo</th>
                    <th className="text-left py-2 font-medium">Início</th>
                    <th className="text-left py-2 font-medium">Fim</th>
                    <th className="text-center py-2 font-medium">Dias</th>
                    <th className="text-center py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {licencas.map((l, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2.5 font-medium text-foreground">{l.servidor}</td>
                      <td className="py-2.5 text-foreground">{l.tipo}</td>
                      <td className="py-2.5 text-muted-foreground">{l.inicio}</td>
                      <td className="py-2.5 text-muted-foreground">{l.fim}</td>
                      <td className="py-2.5 text-center text-foreground">{l.dias}</td>
                      <td className="py-2.5 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[l.status] || ""}`}>{l.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
