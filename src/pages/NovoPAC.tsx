import AppLayout from "@/components/AppLayout";
import { motion } from "framer-motion";
import { Save, Upload, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface ItemPAC {
  id: number;
  objeto: string;
  codigo: string;
  categoria: string;
  valorEstimado: string;
  setorDemandante: string;
}

export default function NovoPAC() {
  const [itens, setItens] = useState<ItemPAC[]>([
    { id: 1, objeto: "", codigo: "", categoria: "Bens", valorEstimado: "", setorDemandante: "" },
  ]);

  const addItem = () => {
    setItens([...itens, { id: Date.now(), objeto: "", codigo: "", categoria: "Bens", valorEstimado: "", setorDemandante: "" }]);
  };

  const removeItem = (id: number) => {
    if (itens.length > 1) setItens(itens.filter((i) => i.id !== id));
  };

  return (
    <AppLayout title="Novo PAC" subtitle="Cadastro de Plano Anual de Contratações">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card mb-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">Dados Gerais</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Exercício</label>
            <select className="w-full px-3 py-2 text-sm bg-secondary rounded-lg border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground">
              <option>2026</option>
              <option>2027</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Status</label>
            <select className="w-full px-3 py-2 text-sm bg-secondary rounded-lg border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground">
              <option>Rascunho</option>
              <option>Em análise</option>
              <option>Aprovado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Upload PDF (OCR)</label>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                <Upload className="w-4 h-4" /> Selecionar Arquivo
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground">Itens do PAC</h3>
          <button onClick={addItem} className="flex items-center gap-1.5 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" /> Adicionar Item
          </button>
        </div>
        <div className="space-y-4">
          {itens.map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-3 p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-muted-foreground mb-1">Objeto</label>
                <input type="text" placeholder="Descrição do objeto" className="w-full px-3 py-2 text-sm bg-background rounded-lg border border-input outline-none focus:ring-2 focus:ring-primary/20 text-foreground" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Código</label>
                <input type="text" placeholder="Ex: 001" className="w-full px-3 py-2 text-sm bg-background rounded-lg border border-input outline-none focus:ring-2 focus:ring-primary/20 text-foreground" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Categoria</label>
                <select className="w-full px-3 py-2 text-sm bg-background rounded-lg border border-input outline-none focus:ring-2 focus:ring-primary/20 text-foreground">
                  <option>Bens</option>
                  <option>Serviços</option>
                  <option>Obras</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Valor Estimado</label>
                <input type="text" placeholder="R$ 0,00" className="w-full px-3 py-2 text-sm bg-background rounded-lg border border-input outline-none focus:ring-2 focus:ring-primary/20 text-foreground" />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Setor</label>
                  <input type="text" placeholder="Setor" className="w-full px-3 py-2 text-sm bg-background rounded-lg border border-input outline-none focus:ring-2 focus:ring-primary/20 text-foreground" />
                </div>
                <button onClick={() => removeItem(item.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors" title="Remover">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6 gap-3">
          <button className="px-4 py-2 text-sm bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">Cancelar</button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Save className="w-4 h-4" /> Salvar PAC
          </button>
        </div>
      </motion.div>
    </AppLayout>
  );
}
