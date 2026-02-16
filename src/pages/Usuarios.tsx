import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import StatCard from "@/components/StatCard";
import { motion } from "framer-motion";
import { Users, UserCheck, Shield, Search, Plus, Eye, Edit } from "lucide-react";

const usuarios = [
  { id: 1, nome: "Admin Sistema", email: "admin@gestao.gov.br", perfil: "Administrador", setor: "TI", status: "Ativo", ultimoAcesso: "16/02/2026 09:30" },
  { id: 2, nome: "Maria Planejamento", email: "maria@gestao.gov.br", perfil: "Planejamento / Compras", setor: "Compras", status: "Ativo", ultimoAcesso: "16/02/2026 08:15" },
  { id: 3, nome: "José Demandante", email: "jose@gestao.gov.br", perfil: "Setor Demandante", setor: "Saúde", status: "Ativo", ultimoAcesso: "15/02/2026 17:00" },
  { id: 4, nome: "Ana Finanças", email: "ana@gestao.gov.br", perfil: "Orçamento e Finanças", setor: "Finanças", status: "Ativo", ultimoAcesso: "16/02/2026 10:00" },
  { id: 5, nome: "Pedro Fiscal", email: "pedro@gestao.gov.br", perfil: "Fiscal de Contrato", setor: "Administração", status: "Inativo", ultimoAcesso: "01/01/2026 08:00" },
];

const statusColors: Record<string, string> = {
  Ativo: "bg-success/10 text-success",
  Inativo: "bg-muted text-muted-foreground",
  Pendente: "bg-warning/10 text-warning",
};

export default function Usuarios() {
  const [search, setSearch] = useState("");
  return (
    <AppLayout title="Usuários" subtitle="Gerenciamento de usuários e perfis de acesso (RBAC)">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total de Usuários" value="32" icon={Users} variant="primary" />
        <StatCard title="Ativos" value="28" icon={UserCheck} variant="success" />
        <StatCard title="Perfis Configurados" value="9" icon={Shield} variant="accent" />
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground">Lista de Usuários</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 pr-4 py-2 text-sm bg-secondary rounded-lg border-none outline-none focus:ring-2 focus:ring-primary/20 w-52 text-foreground placeholder:text-muted-foreground" />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" /> Novo Usuário
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border">
                <th className="text-left py-2 font-medium">Nome</th>
                <th className="text-left py-2 font-medium">E-mail</th>
                <th className="text-left py-2 font-medium">Perfil</th>
                <th className="text-left py-2 font-medium">Setor</th>
                <th className="text-left py-2 font-medium">Último Acesso</th>
                <th className="text-center py-2 font-medium">Status</th>
                <th className="text-center py-2 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.filter((u) => u.nome.toLowerCase().includes(search.toLowerCase())).map((u) => (
                <tr key={u.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-2.5 font-medium text-foreground">{u.nome}</td>
                  <td className="py-2.5 text-muted-foreground">{u.email}</td>
                  <td className="py-2.5 text-muted-foreground">{u.perfil}</td>
                  <td className="py-2.5 text-muted-foreground">{u.setor}</td>
                  <td className="py-2.5 text-muted-foreground text-xs">{u.ultimoAcesso}</td>
                  <td className="py-2.5 text-center"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[u.status]}`}>{u.status}</span></td>
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
