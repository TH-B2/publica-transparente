import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import StatCard from "@/components/StatCard";
import { motion } from "framer-motion";
import { Building, Search, Plus, Eye, Edit, Users, CheckCircle2 } from "lucide-react";

const fornecedores = [
  { id: 1, razaoSocial: "Clean Services Ltda", cnpj: "12.345.678/0001-90", cidade: "São Paulo - SP", segmento: "Serviços", contratos: 3, status: "Regular" },
  { id: 2, razaoSocial: "Papelaria Central", cnpj: "23.456.789/0001-01", cidade: "Campinas - SP", segmento: "Comércio", contratos: 2, status: "Regular" },
  { id: 3, razaoSocial: "Auto Mecânica SP", cnpj: "34.567.890/0001-12", cidade: "São Paulo - SP", segmento: "Serviços", contratos: 1, status: "Regular" },
  { id: 4, razaoSocial: "TechSupport S.A.", cnpj: "45.678.901/0001-23", cidade: "Barueri - SP", segmento: "Tecnologia", contratos: 4, status: "Regular" },
  { id: 5, razaoSocial: "Construtora Horizonte", cnpj: "56.789.012/0001-34", cidade: "Osasco - SP", segmento: "Obras", contratos: 2, status: "Irregular" },
];

const statusColors: Record<string, string> = {
  Regular: "bg-success/10 text-success",
  Irregular: "bg-destructive/10 text-destructive",
};

export default function Fornecedores() {
  const [search, setSearch] = useState("");

  return (
    <AppLayout title="Fornecedores" subtitle="Cadastro e consulta de fornecedores">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Cadastrados" value="127" icon={Building} variant="primary" />
        <StatCard title="Regulares" value="119" icon={CheckCircle2} variant="success" />
        <StatCard title="Com Contratos Ativos" value="48" icon={Users} variant="accent" />
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground">Lista de Fornecedores</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 pr-4 py-2 text-sm bg-secondary rounded-lg border-none outline-none focus:ring-2 focus:ring-primary/20 w-52 text-foreground placeholder:text-muted-foreground" />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" /> Novo Fornecedor
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border">
                <th className="text-left py-2 font-medium">Razão Social</th>
                <th className="text-left py-2 font-medium">CNPJ</th>
                <th className="text-left py-2 font-medium">Cidade</th>
                <th className="text-left py-2 font-medium">Segmento</th>
                <th className="text-center py-2 font-medium">Contratos</th>
                <th className="text-center py-2 font-medium">Status</th>
                <th className="text-center py-2 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {fornecedores.filter((f) => f.razaoSocial.toLowerCase().includes(search.toLowerCase())).map((f) => (
                <tr key={f.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-2.5 font-medium text-foreground">{f.razaoSocial}</td>
                  <td className="py-2.5 text-muted-foreground">{f.cnpj}</td>
                  <td className="py-2.5 text-muted-foreground">{f.cidade}</td>
                  <td className="py-2.5 text-muted-foreground">{f.segmento}</td>
                  <td className="py-2.5 text-center text-foreground">{f.contratos}</td>
                  <td className="py-2.5 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[f.status]}`}>{f.status}</span>
                  </td>
                  <td className="py-2.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 rounded hover:bg-secondary transition-colors"><Eye className="w-3.5 h-3.5 text-muted-foreground" /></button>
                      <button className="p-1.5 rounded hover:bg-secondary transition-colors"><Edit className="w-3.5 h-3.5 text-muted-foreground" /></button>
                    </div>
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
