import AppLayout from "@/components/AppLayout";
import StatCard from "@/components/StatCard";
import { motion } from "framer-motion";
import { ClipboardCheck, AlertTriangle, CheckCircle2, Clock, Eye } from "lucide-react";

const fiscalizacoes = [
  { id: 1, contrato: "CT-2026/001", objeto: "Serviços de limpeza predial", fiscal: "João Mendes", status: "Em andamento", ultimaVistoria: "10/02/2026", conformidade: "Conforme" },
  { id: 2, contrato: "CT-2026/002", objeto: "Material de escritório", fiscal: "Maria Lúcia", status: "Recebimento definitivo", ultimaVistoria: "05/02/2026", conformidade: "Conforme" },
  { id: 3, contrato: "CT-2026/003", objeto: "Manutenção veicular", fiscal: "Pedro Costa", status: "Não conformidade", ultimaVistoria: "12/02/2026", conformidade: "Não conforme" },
  { id: 4, contrato: "CT-2025/048", objeto: "Reforma da sede", fiscal: "Ana Beatriz", status: "Recebimento provisório", ultimaVistoria: "08/02/2026", conformidade: "Conforme" },
];

const statusColors: Record<string, string> = {
  "Em andamento": "bg-info/10 text-info",
  "Recebimento definitivo": "bg-success/10 text-success",
  "Não conformidade": "bg-destructive/10 text-destructive",
  "Recebimento provisório": "bg-warning/10 text-warning",
};

export default function Fiscalizacao() {
  return (
    <AppLayout title="Fiscalização" subtitle="Acompanhamento da execução contratual e recebimento do objeto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Contratos Fiscalizados" value="34" icon={ClipboardCheck} variant="primary" />
        <StatCard title="Conformes" value="29" icon={CheckCircle2} variant="success" />
        <StatCard title="Não Conformidades" value="3" icon={AlertTriangle} variant="warning" />
        <StatCard title="Aguardando Recebimento" value="5" icon={Clock} variant="accent" />
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
        <h3 className="font-heading font-semibold text-foreground mb-4">Processos de Fiscalização</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border">
                <th className="text-left py-2 font-medium">Contrato</th>
                <th className="text-left py-2 font-medium">Objeto</th>
                <th className="text-left py-2 font-medium">Fiscal</th>
                <th className="text-left py-2 font-medium">Última Vistoria</th>
                <th className="text-center py-2 font-medium">Conformidade</th>
                <th className="text-center py-2 font-medium">Status</th>
                <th className="text-center py-2 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {fiscalizacoes.map((f) => (
                <tr key={f.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-2.5 font-medium text-foreground">{f.contrato}</td>
                  <td className="py-2.5 text-muted-foreground max-w-[200px] truncate">{f.objeto}</td>
                  <td className="py-2.5 text-muted-foreground">{f.fiscal}</td>
                  <td className="py-2.5 text-muted-foreground">{f.ultimaVistoria}</td>
                  <td className="py-2.5 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${f.conformidade === "Conforme" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>{f.conformidade}</span>
                  </td>
                  <td className="py-2.5 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[f.status]}`}>{f.status}</span>
                  </td>
                  <td className="py-2.5 text-center">
                    <button className="p-1.5 rounded hover:bg-secondary transition-colors"><Eye className="w-3.5 h-3.5 text-muted-foreground" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </AppLayout>
  );
}
