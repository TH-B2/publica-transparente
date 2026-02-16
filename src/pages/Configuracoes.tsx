import AppLayout from "@/components/AppLayout";
import { motion } from "framer-motion";
import { Settings, Building2, Bell, Shield, Database, Palette } from "lucide-react";

const secoes = [
  { titulo: "Dados do Órgão", descricao: "Nome, CNPJ, endereço e logotipo do órgão municipal", icon: Building2 },
  { titulo: "Notificações", descricao: "Configurar alertas por e-mail e no sistema", icon: Bell },
  { titulo: "Segurança", descricao: "Políticas de senha, tempo de sessão e autenticação", icon: Shield },
  { titulo: "Perfis e Permissões", descricao: "Gerenciar perfis RBAC e permissões de acesso", icon: Shield },
  { titulo: "Backup e Dados", descricao: "Configurações de backup automático e exportação", icon: Database },
  { titulo: "Aparência", descricao: "Tema claro/escuro, cores e personalização visual", icon: Palette },
];

export default function Configuracoes() {
  return (
    <AppLayout title="Configurações" subtitle="Configurações gerais do sistema">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {secoes.map((s) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.titulo} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card flex items-center gap-4 cursor-pointer hover:border-primary/30">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm">{s.titulo}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{s.descricao}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </AppLayout>
  );
}
