import AppLayout from "@/components/AppLayout";
import { motion } from "framer-motion";
import { Save, Upload } from "lucide-react";

export default function NovaContratacao() {
  return (
    <AppLayout title="Nova Contratação" subtitle="Cadastro de novo processo de contratação — Lei 14.133/2021">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card mb-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">Dados da Contratação</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Número do Processo</label>
            <input type="text" placeholder="Ex: PE-2026/001" className="w-full px-3 py-2 text-sm bg-secondary rounded-lg border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Modalidade</label>
            <select className="w-full px-3 py-2 text-sm bg-secondary rounded-lg border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground">
              <option>Pregão Eletrônico</option>
              <option>Concorrência</option>
              <option>Dispensa de Licitação</option>
              <option>Inexigibilidade</option>
              <option>Diálogo Competitivo</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">Objeto</label>
            <textarea rows={3} placeholder="Descrição do objeto da contratação" className="w-full px-3 py-2 text-sm bg-secondary rounded-lg border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Valor Estimado</label>
            <input type="text" placeholder="R$ 0,00" className="w-full px-3 py-2 text-sm bg-secondary rounded-lg border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Setor Demandante</label>
            <input type="text" placeholder="Ex: Administração" className="w-full px-3 py-2 text-sm bg-secondary rounded-lg border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground" />
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card mb-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">Documentos da Fase Preparatória</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {["Documento de Formalização da Demanda (DFD)", "Estudo Técnico Preliminar (ETP)", "Análise de Riscos", "Termo de Referência (TR)", "Pesquisa de Preços", "Mapa Comparativo de Preços", "Parecer Técnico", "Parecer Jurídico"].map((doc) => (
            <div key={doc} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
              <span className="text-sm text-foreground">{doc}</span>
              <button className="flex items-center gap-1 px-2 py-1 text-xs bg-secondary text-muted-foreground rounded hover:bg-secondary/80 transition-colors">
                <Upload className="w-3 h-3" /> Anexar
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 text-sm bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">Cancelar</button>
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          <Save className="w-4 h-4" /> Salvar Contratação
        </button>
      </div>
    </AppLayout>
  );
}
