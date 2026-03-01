import { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import {
  MessageSquare,
  Search,
  Filter,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Link2,
  Tag,
  Send,
  MoreHorizontal,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TabInterna = "todas" | "pendentes" | "encaminhadas" | "respondidas" | "arquivadas";

const manifestacoes = [
  {
    id: 1,
    protocolo: "OUV-2026-00142",
    tipo: "Denúncia",
    assunto: "Irregularidade em contrato de limpeza",
    data: "28/02/2026",
    status: "Em análise",
    urgencia: "Alta",
    setor: "Ouvidoria",
    anonimo: true,
  },
  {
    id: 2,
    protocolo: "OUV-2026-00141",
    tipo: "Solicitação",
    assunto: "Manutenção de via pública na Rua das Flores",
    data: "27/02/2026",
    status: "Encaminhado",
    urgencia: "Média",
    setor: "Infraestrutura",
    anonimo: false,
    nome: "Maria da Silva",
  },
  {
    id: 3,
    protocolo: "OUV-2026-00140",
    tipo: "Reclamação",
    assunto: "Demora no atendimento do CRAS",
    data: "26/02/2026",
    status: "Encaminhado",
    urgencia: "Média",
    setor: "Assistência Social",
    anonimo: false,
    nome: "João Santos",
  },
  {
    id: 4,
    protocolo: "OUV-2026-00139",
    tipo: "Sugestão",
    assunto: "Implementar horário estendido na biblioteca",
    data: "25/02/2026",
    status: "Respondido",
    urgencia: "Baixa",
    setor: "Cultura",
    anonimo: false,
    nome: "Ana Oliveira",
  },
  {
    id: 5,
    protocolo: "OUV-2026-00138",
    tipo: "Elogio",
    assunto: "Excelente atendimento na UBS Central",
    data: "24/02/2026",
    status: "Arquivado",
    urgencia: "Baixa",
    setor: "Saúde",
    anonimo: false,
    nome: "Carlos Mendes",
  },
  {
    id: 6,
    protocolo: "OUV-2026-00137",
    tipo: "Denúncia",
    assunto: "Servidor ausente sem justificativa",
    data: "23/02/2026",
    status: "Em análise",
    urgencia: "Alta",
    setor: "Ouvidoria",
    anonimo: true,
  },
];

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  "Em análise": { color: "bg-info/10 text-info", icon: Clock },
  Encaminhado: { color: "bg-warning/10 text-warning", icon: ArrowUpRight },
  Respondido: { color: "bg-success/10 text-success", icon: CheckCircle2 },
  Arquivado: { color: "bg-muted text-muted-foreground", icon: XCircle },
};

const urgenciaColors: Record<string, string> = {
  Alta: "bg-destructive/10 text-destructive",
  Média: "bg-warning/10 text-warning",
  Baixa: "bg-muted text-muted-foreground",
};

const tipoColors: Record<string, string> = {
  Denúncia: "bg-destructive/10 text-destructive",
  Solicitação: "bg-info/10 text-info",
  Reclamação: "bg-warning/10 text-warning",
  Sugestão: "bg-primary/10 text-primary",
  Elogio: "bg-success/10 text-success",
};

export default function OuvidoriaInterna() {
  const [tab, setTab] = useState<TabInterna>("todas");
  const [busca, setBusca] = useState("");

  const stats = [
    { label: "Total Recebidas", value: "142", icon: MessageSquare, change: "+12 este mês" },
    { label: "Pendentes", value: "18", icon: Clock, change: "Análise necessária" },
    { label: "Encaminhadas", value: "24", icon: ArrowUpRight, change: "Em tramitação" },
    { label: "Taxa de Resposta", value: "87%", icon: TrendingUp, change: "Meta: 90%" },
  ];

  const tabs: { key: TabInterna; label: string; count: number }[] = [
    { key: "todas", label: "Todas", count: 142 },
    { key: "pendentes", label: "Pendentes", count: 18 },
    { key: "encaminhadas", label: "Encaminhadas", count: 24 },
    { key: "respondidas", label: "Respondidas", count: 89 },
    { key: "arquivadas", label: "Arquivadas", count: 11 },
  ];

  const filtered = manifestacoes.filter((m) => {
    if (tab === "pendentes") return m.status === "Em análise";
    if (tab === "encaminhadas") return m.status === "Encaminhado";
    if (tab === "respondidas") return m.status === "Respondido";
    if (tab === "arquivadas") return m.status === "Arquivado";
    return true;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ouvidoria — Gestão Interna</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie as manifestações recebidas, encaminhe aos setores e acompanhe as respostas.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-[11px] text-primary mt-0.5">{s.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="stat-card">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-4">
            <div className="flex gap-1 overflow-x-auto">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    tab === t.key
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {t.label} ({t.count})
                </button>
              ))}
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar protocolo, assunto..."
                  className="pl-9 h-9"
                />
              </div>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Filter className="w-3.5 h-3.5" /> Filtros
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-left py-2.5 font-medium">Protocolo</th>
                  <th className="text-left py-2.5 font-medium">Tipo</th>
                  <th className="text-left py-2.5 font-medium">Assunto</th>
                  <th className="text-left py-2.5 font-medium">Data</th>
                  <th className="text-left py-2.5 font-medium">Urgência</th>
                  <th className="text-left py-2.5 font-medium">Setor</th>
                  <th className="text-left py-2.5 font-medium">Status</th>
                  <th className="text-right py-2.5 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => {
                  const StatusIcon = statusConfig[m.status]?.icon || Clock;
                  return (
                    <tr key={m.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2.5">
                        <span className="font-mono text-xs font-medium text-primary">{m.protocolo}</span>
                        {m.anonimo && (
                          <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">Anônimo</span>
                        )}
                      </td>
                      <td className="py-2.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tipoColors[m.tipo]}`}>
                          {m.tipo}
                        </span>
                      </td>
                      <td className="py-2.5 text-foreground max-w-[200px] truncate">{m.assunto}</td>
                      <td className="py-2.5 text-muted-foreground text-xs">{m.data}</td>
                      <td className="py-2.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${urgenciaColors[m.urgencia]}`}>
                          {m.urgencia}
                        </span>
                      </td>
                      <td className="py-2.5 text-xs text-muted-foreground">{m.setor}</td>
                      <td className="py-2.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium inline-flex items-center gap-1 ${statusConfig[m.status]?.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {m.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" title="Visualizar">
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" title="Encaminhar">
                            <Send className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" title="Vincular processo">
                            <Link2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" title="Classificar">
                            <Tag className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" title="Mais opções">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
