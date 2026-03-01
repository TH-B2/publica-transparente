import { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import {
  BookOpen,
  Plus,
  Search,
  Calendar,
  FileText,
  Send,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const publicacoes = [
  { id: 1, tipo: "Decreto", numero: "Dec. 1.890/2026", assunto: "Regulamenta o PAC 2026", edicao: "1.247", data: "28/02/2026", status: "Publicado", autor: "Procuradoria" },
  { id: 2, tipo: "Portaria", numero: "Port. 245/2026", assunto: "Designa comissão de licitação", edicao: "1.247", data: "28/02/2026", status: "Publicado", autor: "Gabinete" },
  { id: 3, tipo: "Extrato", numero: "Ext. 089/2026", assunto: "Contratação serviços de limpeza", edicao: "1.246", data: "27/02/2026", status: "Publicado", autor: "Compras" },
  { id: 4, tipo: "Decreto", numero: "Dec. 1.891/2026", assunto: "Regulamenta programa social", edicao: "-", data: "01/03/2026", status: "Rascunho", autor: "Assistência Social" },
  { id: 5, tipo: "Portaria", numero: "Port. 246/2026", assunto: "Concessão de licença-prêmio", edicao: "-", data: "01/03/2026", status: "Aguardando aprovação", autor: "RH" },
];

const statusConfig: Record<string, string> = {
  Publicado: "bg-success/10 text-success",
  Rascunho: "bg-muted text-muted-foreground",
  "Aguardando aprovação": "bg-warning/10 text-warning",
};

export default function DiarioOficialInterno() {
  const [showForm, setShowForm] = useState(false);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Diário Oficial — Gestão</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie as publicações dos atos administrativos do município.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1.5">
              <BookOpen className="w-4 h-4" /> Nova Edição
            </Button>
            <Button className="gap-1.5" onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4" /> Novo Ato
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Edições 2026", value: "47", icon: BookOpen },
            { label: "Atos Publicados", value: "312", icon: FileText },
            { label: "Rascunhos", value: "3", icon: Edit },
            { label: "Aguardando Aprovação", value: "2", icon: Clock },
          ].map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <s.icon className="w-4 h-4 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* New act form */}
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="stat-card">
            <h2 className="text-lg font-semibold text-foreground mb-4">Cadastrar Novo Ato</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <Label className="text-sm font-medium mb-1 block">Tipo de Ato *</Label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option value="">Selecione...</option>
                  <option>Decreto</option>
                  <option>Portaria</option>
                  <option>Lei</option>
                  <option>Extrato de Contrato</option>
                  <option>Extrato de ARP</option>
                  <option>Aviso de Licitação</option>
                  <option>Resultado de Licitação</option>
                  <option>Resolução</option>
                  <option>Instrução Normativa</option>
                </select>
              </div>
              <div>
                <Label className="text-sm font-medium mb-1 block">Número *</Label>
                <Input placeholder="Ex: Dec. 1.891/2026" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-1 block">Setor de Origem *</Label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option value="">Selecione...</option>
                  <option>Gabinete</option>
                  <option>Procuradoria</option>
                  <option>Compras e Licitações</option>
                  <option>Recursos Humanos</option>
                  <option>Finanças</option>
                  <option>Assistência Social</option>
                  <option>Saúde</option>
                  <option>Educação</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <Label className="text-sm font-medium mb-1 block">Assunto / Ementa *</Label>
              <Input placeholder="Descrição resumida do ato administrativo" />
            </div>
            <div className="mb-4">
              <Label className="text-sm font-medium mb-1 block">Texto Integral</Label>
              <Textarea rows={6} placeholder="Texto completo do ato administrativo..." />
            </div>
            <div className="mb-4">
              <Label className="text-sm font-medium mb-1 block">Anexo (PDF)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Arraste o arquivo ou clique para selecionar</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
              <Button variant="outline" className="gap-1.5">
                <Edit className="w-4 h-4" /> Salvar como Rascunho
              </Button>
              <Button className="gap-1.5">
                <Send className="w-4 h-4" /> Enviar para Aprovação
              </Button>
            </div>
          </motion.div>
        )}

        {/* List */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Publicações Recentes</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar publicação..." className="pl-9 h-9" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-left py-2.5 font-medium">Tipo</th>
                  <th className="text-left py-2.5 font-medium">Número</th>
                  <th className="text-left py-2.5 font-medium">Assunto</th>
                  <th className="text-left py-2.5 font-medium">Edição</th>
                  <th className="text-left py-2.5 font-medium">Data</th>
                  <th className="text-left py-2.5 font-medium">Origem</th>
                  <th className="text-left py-2.5 font-medium">Status</th>
                  <th className="text-right py-2.5 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {publicacoes.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-2.5">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-primary/10 text-primary">
                        {p.tipo}
                      </span>
                    </td>
                    <td className="py-2.5 font-mono text-xs font-medium text-foreground">{p.numero}</td>
                    <td className="py-2.5 text-foreground max-w-[200px] truncate">{p.assunto}</td>
                    <td className="py-2.5 text-xs text-muted-foreground">{p.edicao}</td>
                    <td className="py-2.5 text-xs text-muted-foreground">{p.data}</td>
                    <td className="py-2.5 text-xs text-muted-foreground">{p.autor}</td>
                    <td className="py-2.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusConfig[p.status]}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="w-3.5 h-3.5" /></Button>
                        {p.status !== "Publicado" && (
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
