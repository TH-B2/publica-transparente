import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Building2,
  MessageSquarePlus,
  Search,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  FileText,
  Shield,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type OuvidoriaTab = "nova" | "consulta";

const categorias = [
  { value: "sugestao", label: "Sugestão", icon: MessageSquarePlus },
  { value: "denuncia", label: "Denúncia", icon: AlertTriangle },
  { value: "solicitacao", label: "Solicitação", icon: FileText },
  { value: "reclamacao", label: "Reclamação", icon: Shield },
  { value: "elogio", label: "Elogio", icon: CheckCircle2 },
];

const statusColors: Record<string, string> = {
  "Em análise": "bg-info/10 text-info",
  "Encaminhado": "bg-warning/10 text-warning",
  "Respondido": "bg-success/10 text-success",
  "Arquivado": "bg-muted text-muted-foreground",
};

export default function Ouvidoria() {
  const [tab, setTab] = useState<OuvidoriaTab>("nova");
  const [protocolo, setProtocolo] = useState("");
  const [consultaResult, setConsultaResult] = useState<null | {
    protocolo: string;
    tipo: string;
    assunto: string;
    data: string;
    status: string;
    historico: { data: string; descricao: string }[];
  }>(null);
  const [formData, setFormData] = useState({
    tipo: "",
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    descricao: "",
    anonimo: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [generatedProtocolo, setGeneratedProtocolo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const proto = `OUV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, "0")}`;
    setGeneratedProtocolo(proto);
    setSubmitted(true);
  };

  const handleConsulta = () => {
    if (protocolo.trim()) {
      setConsultaResult({
        protocolo: protocolo,
        tipo: "Solicitação",
        assunto: "Manutenção de via pública na Rua das Flores",
        data: "15/02/2026",
        status: "Encaminhado",
        historico: [
          { data: "15/02/2026 09:30", descricao: "Manifestação registrada no sistema da Ouvidoria" },
          { data: "16/02/2026 14:15", descricao: "Encaminhada ao setor de Infraestrutura para providências" },
          { data: "18/02/2026 10:00", descricao: "Setor de Infraestrutura informa que equipe realizará vistoria" },
        ],
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Building2 className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Ouvidoria Pública</h1>
                <p className="text-xs text-primary-foreground/70">
                  Município de Exemplo - Canal de comunicação com o cidadão
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

      {/* Tabs */}
      <div className="bg-primary/95 pb-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-2">
            <button
              onClick={() => { setTab("nova"); setSubmitted(false); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === "nova"
                  ? "bg-accent text-accent-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              <MessageSquarePlus className="w-4 h-4 inline mr-1.5" />
              Nova Manifestação
            </button>
            <button
              onClick={() => setTab("consulta")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === "consulta"
                  ? "bg-accent text-accent-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              <Search className="w-4 h-4 inline mr-1.5" />
              Consultar Protocolo
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {tab === "nova" && !submitted && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="stat-card">
                  <h2 className="text-lg font-semibold text-foreground mb-1">Registrar Manifestação</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Preencha o formulário abaixo. Sua manifestação será analisada e encaminhada ao setor responsável.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Tipo */}
                    <div>
                      <Label className="text-sm font-medium text-foreground mb-2 block">
                        Tipo de Manifestação *
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {categorias.map((cat) => (
                          <button
                            key={cat.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, tipo: cat.value })}
                            className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border text-xs font-medium transition-all ${
                              formData.tipo === cat.value
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border text-muted-foreground hover:border-primary/30"
                            }`}
                          >
                            <cat.icon className="w-5 h-5" />
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Anonimo toggle */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="anonimo"
                        checked={formData.anonimo}
                        onChange={(e) => setFormData({ ...formData, anonimo: e.target.checked })}
                        className="rounded border-border"
                      />
                      <Label htmlFor="anonimo" className="text-sm text-muted-foreground cursor-pointer">
                        Desejo fazer esta manifestação de forma anônima
                      </Label>
                    </div>

                    {!formData.anonimo && (
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium mb-1 block">Nome completo</Label>
                          <Input
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            placeholder="Seu nome"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-1 block">E-mail</Label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="seu@email.com"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label className="text-sm font-medium mb-1 block">Telefone</Label>
                          <Input
                            value={formData.telefone}
                            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                            placeholder="(00) 00000-0000"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <Label className="text-sm font-medium mb-1 block">Assunto *</Label>
                      <Input
                        required
                        value={formData.assunto}
                        onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                        placeholder="Resumo breve da manifestação"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-1 block">Descrição detalhada *</Label>
                      <Textarea
                        required
                        rows={5}
                        value={formData.descricao}
                        onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                        placeholder="Descreva com detalhes sua manifestação..."
                      />
                    </div>

                    <Button type="submit" className="w-full sm:w-auto gap-2">
                      <Send className="w-4 h-4" /> Enviar Manifestação
                    </Button>
                  </form>
                </div>
              </div>

              {/* Info lateral */}
              <div className="space-y-4">
                <div className="stat-card">
                  <h3 className="font-semibold text-foreground text-sm mb-2">Como funciona?</h3>
                  <ol className="space-y-3 text-xs text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-[10px] font-bold">1</span>
                      Preencha o formulário com sua manifestação
                    </li>
                    <li className="flex gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-[10px] font-bold">2</span>
                      Receba um número de protocolo para acompanhamento
                    </li>
                    <li className="flex gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-[10px] font-bold">3</span>
                      A ouvidoria analisa e encaminha ao setor responsável
                    </li>
                    <li className="flex gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-[10px] font-bold">4</span>
                      Acompanhe a resposta pelo portal da transparência
                    </li>
                  </ol>
                </div>

                <div className="stat-card">
                  <h3 className="font-semibold text-foreground text-sm mb-2">Prazos de resposta</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Denúncias</span>
                      <span className="font-medium text-foreground">até 20 dias</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Solicitações</span>
                      <span className="font-medium text-foreground">até 15 dias</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Sugestões</span>
                      <span className="font-medium text-foreground">até 30 dias</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Reclamações</span>
                      <span className="font-medium text-foreground">até 15 dias</span>
                    </div>
                  </div>
                </div>

                <div className="stat-card bg-primary/5 border-primary/20">
                  <Shield className="w-5 h-5 text-primary mb-2" />
                  <h3 className="font-semibold text-foreground text-sm mb-1">Sigilo garantido</h3>
                  <p className="text-xs text-muted-foreground">
                    Suas informações pessoais são protegidas. Manifestações anônimas são aceitas conforme a legislação vigente.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {tab === "nova" && submitted && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto">
            <div className="stat-card text-center py-10">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Manifestação Registrada!</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Sua manifestação foi recebida e será analisada pela equipe da Ouvidoria.
              </p>
              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-xs text-muted-foreground mb-1">Seu número de protocolo</p>
                <p className="text-2xl font-bold text-primary tracking-wider">{generatedProtocolo}</p>
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                Guarde este número para acompanhar o andamento da sua manifestação.
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => { setSubmitted(false); setFormData({ tipo: "", nome: "", email: "", telefone: "", assunto: "", descricao: "", anonimo: false }); }}>
                  Nova Manifestação
                </Button>
                <Button onClick={() => { setTab("consulta"); setProtocolo(generatedProtocolo); }}>
                  Consultar Protocolo
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {tab === "consulta" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
            <div className="stat-card mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-1">Consultar Protocolo</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Digite o número do protocolo para acompanhar o andamento da sua manifestação.
              </p>
              <div className="flex gap-2">
                <Input
                  value={protocolo}
                  onChange={(e) => setProtocolo(e.target.value)}
                  placeholder="Ex: OUV-2026-00123"
                  className="flex-1"
                />
                <Button onClick={handleConsulta} className="gap-2">
                  <Search className="w-4 h-4" /> Consultar
                </Button>
              </div>
            </div>

            {consultaResult && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stat-card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Protocolo</p>
                    <p className="text-lg font-bold text-primary">{consultaResult.protocolo}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[consultaResult.status]}`}>
                    {consultaResult.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Tipo</p>
                    <p className="font-medium text-foreground">{consultaResult.tipo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Data</p>
                    <p className="font-medium text-foreground">{consultaResult.data}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Assunto</p>
                    <p className="font-medium text-foreground">{consultaResult.assunto}</p>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-foreground mb-3">Histórico de Tramitação</h3>
                <div className="space-y-3">
                  {consultaResult.historico.map((h, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${i === consultaResult.historico.length - 1 ? "bg-primary" : "bg-border"}`} />
                        {i < consultaResult.historico.length - 1 && <div className="w-px h-full bg-border" />}
                      </div>
                      <div className="pb-3">
                        <p className="text-xs text-muted-foreground">{h.data}</p>
                        <p className="text-sm text-foreground">{h.descricao}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-4 mt-8">
        <p className="text-xs text-muted-foreground text-center">
          Ouvidoria Municipal • Lei nº 13.460/2017 • Atendimento em conformidade com a Lei de Acesso à Informação
        </p>
      </footer>
    </div>
  );
}
