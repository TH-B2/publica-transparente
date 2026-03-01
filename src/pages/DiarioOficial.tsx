import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Building2,
  Search,
  Calendar,
  FileText,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const edicoes = [
  {
    numero: "Edição nº 1.247",
    data: "28/02/2026",
    tipo: "Ordinária",
    atos: [
      { tipo: "Decreto", numero: "Dec. 1.890/2026", assunto: "Regulamenta o Plano Anual de Contratações 2026" },
      { tipo: "Portaria", numero: "Port. 245/2026", assunto: "Designa comissão de licitação para obras de infraestrutura" },
      { tipo: "Lei", numero: "Lei 4.112/2026", assunto: "Dispõe sobre a criação do Conselho Municipal de Cultura" },
    ],
  },
  {
    numero: "Edição nº 1.246",
    data: "27/02/2026",
    tipo: "Ordinária",
    atos: [
      { tipo: "Extrato", numero: "Ext. Contrato 089/2026", assunto: "Contratação de serviços de limpeza - Pregão Eletrônico nº 012/2026" },
      { tipo: "Aviso", numero: "Aviso de Licitação", assunto: "Pregão Eletrônico nº 015/2026 - Material de expediente" },
    ],
  },
  {
    numero: "Edição nº 1.245 - Suplementar",
    data: "26/02/2026",
    tipo: "Suplementar",
    atos: [
      { tipo: "Decreto", numero: "Dec. 1.889/2026", assunto: "Abre crédito suplementar no valor de R$ 500.000,00" },
    ],
  },
  {
    numero: "Edição nº 1.244",
    data: "25/02/2026",
    tipo: "Ordinária",
    atos: [
      { tipo: "Portaria", numero: "Port. 244/2026", assunto: "Nomeia fiscal de contrato de vigilância patrimonial" },
      { tipo: "Portaria", numero: "Port. 243/2026", assunto: "Concede férias a servidores do setor administrativo" },
      { tipo: "Extrato", numero: "Ext. ARP 007/2026", assunto: "Ata de Registro de Preços - Combustíveis" },
      { tipo: "Aviso", numero: "Resultado de Licitação", assunto: "Concorrência nº 003/2026 - Reforma da Escola Municipal" },
    ],
  },
  {
    numero: "Edição nº 1.243",
    data: "24/02/2026",
    tipo: "Ordinária",
    atos: [
      { tipo: "Lei", numero: "Lei 4.111/2026", assunto: "Autoriza o Executivo a firmar convênio com o Estado para pavimentação" },
      { tipo: "Decreto", numero: "Dec. 1.888/2026", assunto: "Declara situação de emergência no setor de saúde" },
    ],
  },
];

const tipoAtoColors: Record<string, string> = {
  Decreto: "bg-primary/10 text-primary",
  Portaria: "bg-info/10 text-info",
  Lei: "bg-success/10 text-success",
  Extrato: "bg-warning/10 text-warning",
  Aviso: "bg-accent/10 text-accent-foreground",
};

export default function DiarioOficial() {
  const [busca, setBusca] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("todos");

  const tiposAto = ["todos", "Decreto", "Portaria", "Lei", "Extrato", "Aviso"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Diário Oficial</h1>
                <p className="text-xs text-primary-foreground/70">
                  Município de Exemplo - Publicações oficiais
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/transparencia"
                className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> Transparência
              </Link>
              <Link
                to="/"
                className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Área restrita →
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="bg-primary/95 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-primary-foreground/80 text-sm mb-3">
            Consulte decretos, portarias, leis e demais atos administrativos publicados
          </p>
          <div className="flex gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por número, assunto, tipo de ato..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-6 -mt-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: BookOpen, label: "Total de Edições", value: "1.247", desc: "desde 2020" },
            { icon: FileText, label: "Atos Publicados", value: "8.432", desc: "em todas as edições" },
            { icon: Calendar, label: "Última Edição", value: "28/02/2026", desc: "Edição nº 1.247" },
            { icon: Download, label: "Downloads", value: "12.890", desc: "total de acessos" },
          ].map((item) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <p className="text-lg font-bold text-foreground">{item.value}</p>
              <p className="text-xs font-medium text-foreground">{item.label}</p>
              <p className="text-[11px] text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex gap-2 flex-wrap mb-6">
          {tiposAto.map((t) => (
            <button
              key={t}
              onClick={() => setTipoFiltro(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                tipoFiltro === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t === "todos" ? "Todos os tipos" : t + "s"}
            </button>
          ))}
        </div>

        {/* Editions list */}
        <div className="space-y-4">
          {edicoes.map((edicao, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="stat-card"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{edicao.numero}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" /> {edicao.data}
                      <span className={`ml-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${
                        edicao.tipo === "Suplementar" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"
                      }`}>
                        {edicao.tipo}
                      </span>
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Download className="w-3.5 h-3.5" /> PDF
                </Button>
              </div>

              <div className="space-y-2">
                {edicao.atos
                  .filter((a) => tipoFiltro === "todos" || a.tipo === tipoFiltro)
                  .map((ato, atoIdx) => (
                    <div
                      key={atoIdx}
                      className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap mt-0.5 ${tipoAtoColors[ato.tipo] || "bg-muted text-muted-foreground"}`}>
                        {ato.tipo}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground">{ato.numero}</p>
                        <p className="text-xs text-muted-foreground">{ato.assunto}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0">
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button variant="outline" size="sm" className="gap-1">
            <ChevronLeft className="w-4 h-4" /> Anterior
          </Button>
          {[1, 2, 3, 4, 5].map((p) => (
            <Button
              key={p}
              variant={p === 1 ? "default" : "outline"}
              size="sm"
              className="w-9 h-9"
            >
              {p}
            </Button>
          ))}
          <Button variant="outline" size="sm" className="gap-1">
            Próxima <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-4 mt-4">
        <p className="text-xs text-muted-foreground text-center">
          Diário Oficial do Município de Exemplo • Publicações em conformidade com a legislação vigente
        </p>
      </footer>
    </div>
  );
}
