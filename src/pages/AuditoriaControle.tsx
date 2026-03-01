import { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield, FileText, AlertTriangle, CheckCircle2, Clock, Search,
  Plus, Filter, Download, Eye, Send, BarChart3, Target,
  ClipboardList, FileWarning, Scale, Lock, TrendingUp
} from "lucide-react";

// === DADOS MOCK ===
const auditorias = [
  { id: "AUD-2026-001", titulo: "Auditoria de Conformidade – Licitações 2025", tipo: "Conformidade", status: "Em Execução", risco: "Alto", responsavel: "Ana Oliveira", inicio: "10/01/2026", prazo: "15/03/2026", progresso: 65 },
  { id: "AUD-2026-002", titulo: "Auditoria Operacional – Folha de Pagamento", tipo: "Operacional", status: "Planejamento", risco: "Médio", responsavel: "Carlos Santos", inicio: "01/02/2026", prazo: "30/04/2026", progresso: 15 },
  { id: "AUD-2026-003", titulo: "Auditoria de Gestão – Contratos Vigentes", tipo: "Gestão", status: "Concluída", risco: "Baixo", responsavel: "Maria Lima", inicio: "01/11/2025", prazo: "20/01/2026", progresso: 100 },
  { id: "AUD-2026-004", titulo: "Auditoria Especial – Denúncia Ouvidoria OUV-2026-00012", tipo: "Especial", status: "Em Execução", risco: "Crítico", responsavel: "Ana Oliveira", inicio: "15/02/2026", prazo: "15/04/2026", progresso: 30 },
  { id: "AUD-2026-005", titulo: "Verificação de Controles Internos – Almoxarifado", tipo: "Controles Internos", status: "Planejamento", risco: "Médio", responsavel: "Pedro Rocha", inicio: "01/03/2026", prazo: "30/05/2026", progresso: 5 },
];

const recomendacoes = [
  { id: "REC-001", auditoria: "AUD-2026-001", descricao: "Implementar checklist obrigatório para fase preparatória de licitações", setor: "Compras", prazo: "30/03/2026", status: "Pendente", prioridade: "Alta" },
  { id: "REC-002", auditoria: "AUD-2026-003", descricao: "Atualizar certidões de regularidade fiscal dos fornecedores trimestralmente", setor: "Contratos", prazo: "28/02/2026", status: "Implementada", prioridade: "Média" },
  { id: "REC-003", auditoria: "AUD-2026-001", descricao: "Capacitar servidores sobre a Nova Lei de Licitações (14.133/2021)", setor: "Recursos Humanos", prazo: "30/04/2026", status: "Em Andamento", prioridade: "Alta" },
  { id: "REC-004", auditoria: "AUD-2026-003", descricao: "Revisar cláusulas de penalidades nos contratos padrão", setor: "Jurídico", prazo: "15/03/2026", status: "Pendente", prioridade: "Média" },
  { id: "REC-005", auditoria: "AUD-2026-002", descricao: "Automatizar conferência de cálculos da folha de pagamento", setor: "TI", prazo: "30/06/2026", status: "Pendente", prioridade: "Baixa" },
];

const matrizRiscos = [
  { processo: "Licitações e Contratos", probabilidade: "Alta", impacto: "Alto", nivelRisco: "Crítico", controle: "Parcial", acao: "Auditoria de conformidade em andamento" },
  { processo: "Folha de Pagamento", probabilidade: "Média", impacto: "Alto", nivelRisco: "Alto", controle: "Adequado", acao: "Auditoria operacional planejada" },
  { processo: "Gestão de Patrimônio", probabilidade: "Alta", impacto: "Médio", nivelRisco: "Alto", controle: "Insuficiente", acao: "Inventário programado para Q2" },
  { processo: "Arrecadação de Receitas", probabilidade: "Baixa", impacto: "Alto", nivelRisco: "Médio", controle: "Adequado", acao: "Monitoramento contínuo" },
  { processo: "Almoxarifado", probabilidade: "Média", impacto: "Médio", nivelRisco: "Médio", controle: "Parcial", acao: "Verificação de controles internos" },
  { processo: "Gestão de Pessoal", probabilidade: "Baixa", impacto: "Médio", nivelRisco: "Baixo", controle: "Adequado", acao: "Acompanhamento regular" },
];

const prestacaoContas = [
  { exercicio: "2025", status: "Enviada", dataEnvio: "28/01/2026", protocolo: "TCE-2026-04521", parecer: "Aguardando análise" },
  { exercicio: "2024", status: "Aprovada", dataEnvio: "30/01/2025", protocolo: "TCE-2025-03890", parecer: "Regular com ressalvas" },
  { exercicio: "2023", status: "Aprovada", dataEnvio: "29/01/2024", protocolo: "TCE-2024-03102", parecer: "Regular" },
];

const statusColors: Record<string, string> = {
  "Em Execução": "bg-primary/10 text-primary",
  "Planejamento": "bg-muted text-muted-foreground",
  "Concluída": "bg-success/10 text-success",
  "Pendente": "bg-destructive/10 text-destructive",
  "Implementada": "bg-success/10 text-success",
  "Em Andamento": "bg-primary/10 text-primary",
  "Enviada": "bg-primary/10 text-primary",
  "Aprovada": "bg-success/10 text-success",
};

const riscoColors: Record<string, string> = {
  "Crítico": "bg-destructive/10 text-destructive",
  "Alto": "bg-destructive/10 text-destructive",
  "Médio": "bg-accent/10 text-accent-foreground",
  "Baixo": "bg-success/10 text-success",
};

const prioridadeColors: Record<string, string> = {
  "Alta": "bg-destructive/10 text-destructive",
  "Média": "bg-accent/10 text-accent-foreground",
  "Baixa": "bg-success/10 text-success",
};

export default function AuditoriaControle() {
  const [activeTab, setActiveTab] = useState("painel");
  const [busca, setBusca] = useState("");

  const stats = [
    { label: "Auditorias Ativas", value: "5", icon: Shield, detail: "2 em execução" },
    { label: "Recomendações Pendentes", value: "3", icon: AlertTriangle, detail: "de 5 emitidas" },
    { label: "Riscos Críticos/Altos", value: "3", icon: Target, detail: "de 6 processos" },
    { label: "Conformidade Geral", value: "78%", icon: CheckCircle2, detail: "+5% vs trimestre anterior" },
  ];

  return (
    <AppLayout title="Auditoria e Controle Interno" subtitle="NBC TI 01 • Gestão de Riscos TCE-CE • Acesso Restrito">
      <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
        <Lock className="w-4 h-4 text-destructive flex-shrink-0" />
        <p className="text-xs text-destructive font-medium">
          Módulo de acesso restrito ao Controle Interno. Informações sigilosas protegidas conforme NBC TI 01, item 12.3.3.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <s.icon className="w-4 h-4 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-heading font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xs text-primary mt-0.5">{s.detail}</p>
          </motion.div>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="painel"><BarChart3 className="w-3.5 h-3.5 mr-1.5" />Painel</TabsTrigger>
          <TabsTrigger value="auditorias"><ClipboardList className="w-3.5 h-3.5 mr-1.5" />Auditorias</TabsTrigger>
          <TabsTrigger value="recomendacoes"><FileWarning className="w-3.5 h-3.5 mr-1.5" />Recomendações</TabsTrigger>
          <TabsTrigger value="riscos"><Target className="w-3.5 h-3.5 mr-1.5" />Matriz de Riscos</TabsTrigger>
          <TabsTrigger value="prestacao"><Send className="w-3.5 h-3.5 mr-1.5" />Prestação de Contas</TabsTrigger>
        </TabsList>

        {/* === PAINEL === */}
        <TabsContent value="painel">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stat-card">
              <h3 className="font-heading font-semibold text-foreground text-sm mb-3">Auditorias em Andamento</h3>
              <div className="space-y-3">
                {auditorias.filter(a => a.status !== "Concluída").map(a => (
                  <div key={a.id} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{a.titulo}</p>
                      <p className="text-xs text-muted-foreground">{a.responsavel} • Prazo: {a.prazo}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="w-20 h-1.5 rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${a.progresso}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground w-8">{a.progresso}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} className="stat-card">
              <h3 className="font-heading font-semibold text-foreground text-sm mb-3">Riscos por Nível</h3>
              <div className="space-y-2">
                {["Crítico", "Alto", "Médio", "Baixo"].map(nivel => {
                  const count = matrizRiscos.filter(r => r.nivelRisco === nivel).length;
                  const total = matrizRiscos.length;
                  return (
                    <div key={nivel} className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium w-16 text-center ${riscoColors[nivel]}`}>{nivel}</span>
                      <div className="flex-1 h-2 rounded-full bg-muted">
                        <div className={`h-full rounded-full ${nivel === "Crítico" || nivel === "Alto" ? "bg-destructive" : nivel === "Médio" ? "bg-accent" : "bg-success"}`} style={{ width: `${(count / total) * 100}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground w-6 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-border">
                <h4 className="text-xs font-medium text-muted-foreground mb-2">Referências Normativas</h4>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">• NBC TI 01 – Auditoria Interna (CFC 986/03)</p>
                  <p className="text-xs text-muted-foreground">• Manual de Gestão de Riscos – TCE-CE 2022</p>
                  <p className="text-xs text-muted-foreground">• Lei 14.133/2021 – Controle Interno</p>
                </div>
              </div>
            </motion.div>
          </div>
        </TabsContent>

        {/* === AUDITORIAS === */}
        <TabsContent value="auditorias">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text" placeholder="Buscar auditoria..." value={busca} onChange={e => setBusca(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-secondary rounded-lg outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Filter className="w-3.5 h-3.5 mr-1.5" />Filtrar</Button>
              <Button size="sm"><Plus className="w-3.5 h-3.5 mr-1.5" />Nova Auditoria</Button>
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stat-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-left py-2.5 font-medium">Código</th>
                  <th className="text-left py-2.5 font-medium">Título</th>
                  <th className="text-left py-2.5 font-medium">Tipo</th>
                  <th className="text-left py-2.5 font-medium">Risco</th>
                  <th className="text-left py-2.5 font-medium">Status</th>
                  <th className="text-left py-2.5 font-medium">Progresso</th>
                  <th className="text-right py-2.5 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {auditorias.filter(a => !busca || a.titulo.toLowerCase().includes(busca.toLowerCase()) || a.id.toLowerCase().includes(busca.toLowerCase())).map(a => (
                  <tr key={a.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 font-mono text-xs text-primary">{a.id}</td>
                    <td className="py-2.5 text-foreground max-w-xs">
                      <p className="truncate">{a.titulo}</p>
                      <p className="text-xs text-muted-foreground">{a.responsavel} • {a.inicio} a {a.prazo}</p>
                    </td>
                    <td className="py-2.5 text-muted-foreground">{a.tipo}</td>
                    <td className="py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riscoColors[a.risco]}`}>{a.risco}</span></td>
                    <td className="py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[a.status]}`}>{a.status}</span></td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${a.progresso}%` }} /></div>
                        <span className="text-xs text-muted-foreground">{a.progresso}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-right">
                      <Button variant="ghost" size="sm"><Eye className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="sm"><FileText className="w-3.5 h-3.5" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground">
              <strong>NBC TI 01, 12.2.1:</strong> O planejamento deve considerar o conhecimento detalhado da política e dos instrumentos de gestão de riscos, a natureza e extensão dos procedimentos, e os riscos de auditoria pelo volume ou complexidade das transações.
            </p>
          </div>
        </TabsContent>

        {/* === RECOMENDAÇÕES === */}
        <TabsContent value="recomendacoes">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="font-heading font-semibold text-foreground text-sm">Recomendações e Determinações</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Download className="w-3.5 h-3.5 mr-1.5" />Exportar</Button>
              <Button size="sm"><Plus className="w-3.5 h-3.5 mr-1.5" />Nova Recomendação</Button>
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stat-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-left py-2.5 font-medium">Código</th>
                  <th className="text-left py-2.5 font-medium">Descrição</th>
                  <th className="text-left py-2.5 font-medium">Setor</th>
                  <th className="text-left py-2.5 font-medium">Prioridade</th>
                  <th className="text-left py-2.5 font-medium">Prazo</th>
                  <th className="text-left py-2.5 font-medium">Status</th>
                  <th className="text-right py-2.5 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {recomendacoes.map(r => (
                  <tr key={r.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 font-mono text-xs text-primary">{r.id}</td>
                    <td className="py-2.5 text-foreground max-w-xs"><p className="truncate">{r.descricao}</p><p className="text-xs text-muted-foreground">Ref: {r.auditoria}</p></td>
                    <td className="py-2.5 text-muted-foreground">{r.setor}</td>
                    <td className="py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${prioridadeColors[r.prioridade]}`}>{r.prioridade}</span></td>
                    <td className="py-2.5 text-muted-foreground">{r.prazo}</td>
                    <td className="py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[r.status]}`}>{r.status}</span></td>
                    <td className="py-2.5 text-right"><Button variant="ghost" size="sm"><Eye className="w-3.5 h-3.5" /></Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground">
              <strong>NBC TI 01, 12.3.2:</strong> O relatório deve abordar os riscos associados aos fatos constatados e as conclusões e recomendações resultantes. As recomendações devem ser acompanhadas até sua efetiva implementação.
            </p>
          </div>
        </TabsContent>

        {/* === MATRIZ DE RISCOS === */}
        <TabsContent value="riscos">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="font-heading font-semibold text-foreground text-sm">Matriz de Riscos – Gestão de Riscos TCE-CE</h3>
            <Button variant="outline" size="sm"><Download className="w-3.5 h-3.5 mr-1.5" />Exportar Matriz</Button>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stat-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-left py-2.5 font-medium">Processo</th>
                  <th className="text-left py-2.5 font-medium">Probabilidade</th>
                  <th className="text-left py-2.5 font-medium">Impacto</th>
                  <th className="text-left py-2.5 font-medium">Nível de Risco</th>
                  <th className="text-left py-2.5 font-medium">Controle Existente</th>
                  <th className="text-left py-2.5 font-medium">Ação/Resposta</th>
                </tr>
              </thead>
              <tbody>
                {matrizRiscos.map((r, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 font-medium text-foreground">{r.processo}</td>
                    <td className="py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riscoColors[r.probabilidade]}`}>{r.probabilidade}</span></td>
                    <td className="py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riscoColors[r.impacto]}`}>{r.impacto}</span></td>
                    <td className="py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riscoColors[r.nivelRisco]}`}>{r.nivelRisco}</span></td>
                    <td className="py-2.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        r.controle === "Adequado" ? "bg-success/10 text-success" :
                        r.controle === "Parcial" ? "bg-accent/10 text-accent-foreground" :
                        "bg-destructive/10 text-destructive"
                      }`}>{r.controle}</span>
                    </td>
                    <td className="py-2.5 text-muted-foreground text-xs">{r.acao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <h4 className="text-xs font-semibold text-foreground mb-1.5">Metodologia</h4>
              <p className="text-xs text-muted-foreground">
                Matriz elaborada conforme o Manual de Gestão de Riscos do TCE-CE (2022), utilizando escala de probabilidade × impacto para classificação dos riscos inerentes e residuais dos processos críticos.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <h4 className="text-xs font-semibold text-foreground mb-1.5">Escala de Avaliação</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { nivel: "Crítico", desc: "Probabilidade Alta × Impacto Alto" },
                  { nivel: "Alto", desc: "Combinações Alta/Médio" },
                  { nivel: "Médio", desc: "Combinações Média/Médio" },
                  { nivel: "Baixo", desc: "Probabilidade/Impacto Baixo" },
                ].map(n => (
                  <div key={n.nivel} className="flex items-center gap-1.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${riscoColors[n.nivel]}`}>{n.nivel}</span>
                    <span className="text-[10px] text-muted-foreground">{n.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* === PRESTAÇÃO DE CONTAS === */}
        <TabsContent value="prestacao">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="font-heading font-semibold text-foreground text-sm">Prestação de Contas ao TCE-CE</h3>
            <Button size="sm"><Send className="w-3.5 h-3.5 mr-1.5" />Nova Prestação</Button>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stat-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-left py-2.5 font-medium">Exercício</th>
                  <th className="text-left py-2.5 font-medium">Status</th>
                  <th className="text-left py-2.5 font-medium">Data de Envio</th>
                  <th className="text-left py-2.5 font-medium">Protocolo TCE</th>
                  <th className="text-left py-2.5 font-medium">Parecer</th>
                  <th className="text-right py-2.5 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {prestacaoContas.map(p => (
                  <tr key={p.exercicio} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 font-medium text-foreground">{p.exercicio}</td>
                    <td className="py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[p.status]}`}>{p.status}</span></td>
                    <td className="py-2.5 text-muted-foreground">{p.dataEnvio}</td>
                    <td className="py-2.5 font-mono text-xs text-primary">{p.protocolo}</td>
                    <td className="py-2.5 text-muted-foreground">{p.parecer}</td>
                    <td className="py-2.5 text-right">
                      <Button variant="ghost" size="sm"><Eye className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="sm"><Download className="w-3.5 h-3.5" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            <div className="stat-card">
              <Scale className="w-5 h-5 text-primary mb-2" />
              <p className="text-sm font-heading font-semibold text-foreground">Documentos Obrigatórios</p>
              <ul className="mt-2 space-y-1">
                {["Balanço Orçamentário", "Balanço Financeiro", "Balanço Patrimonial", "Demonstração das Variações Patrimoniais", "Relatório de Gestão Fiscal"].map(d => (
                  <li key={d} className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-success flex-shrink-0" />{d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="stat-card">
              <Clock className="w-5 h-5 text-primary mb-2" />
              <p className="text-sm font-heading font-semibold text-foreground">Prazos TCE-CE</p>
              <ul className="mt-2 space-y-1">
                <li className="text-xs text-muted-foreground">• RGF: até 30 dias após o encerramento do período</li>
                <li className="text-xs text-muted-foreground">• RREO: até 30 dias após o encerramento do bimestre</li>
                <li className="text-xs text-muted-foreground">• Prestação Anual: até 1º de abril do exercício seguinte</li>
              </ul>
            </div>
            <div className="stat-card">
              <TrendingUp className="w-5 h-5 text-primary mb-2" />
              <p className="text-sm font-heading font-semibold text-foreground">Indicadores LRF</p>
              <ul className="mt-2 space-y-1">
                <li className="text-xs text-foreground flex justify-between"><span>Despesa com Pessoal</span><span className="text-success font-medium">48,2%</span></li>
                <li className="text-xs text-muted-foreground">Limite prudencial: 51,3% | Máximo: 54%</li>
                <li className="text-xs text-foreground flex justify-between mt-1"><span>Dívida Consolidada</span><span className="text-success font-medium">85%</span></li>
                <li className="text-xs text-muted-foreground">Limite: 120% da RCL</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
