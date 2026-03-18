import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Wallet,
  ClipboardCheck,
  Eye,
  BarChart3,
  Settings,
  Users,
  ChevronDown,
  ChevronRight,
  Building2,
  Menu,
  X,
  LogOut,
  Bell,
  Calculator,
  ShieldAlert,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ElementType;
  path?: string;
  children?: { label: string; path: string }[];
  roles?: string[];
}

const navItems: NavItem[] = [
  { label: "Painel Geral", icon: LayoutDashboard, path: "/dashboard" },
  {
    label: "PAC",
    icon: FileText,
    children: [
      { label: "Planos Anuais", path: "/pac" },
      { label: "Novo PAC", path: "/pac/novo" },
    ],
  },
  {
    label: "Contratações",
    icon: ShoppingCart,
    children: [
      { label: "Processos", path: "/contratacoes" },
      { label: "Nova Contratação", path: "/contratacoes/nova" },
      { label: "Fornecedores", path: "/fornecedores" },
    ],
  },
  {
    label: "Contabilidade",
    icon: Calculator,
    path: "/contabilidade",
  },
  {
    label: "Execução Orçamentária",
    icon: Wallet,
    children: [
      { label: "Empenhos", path: "/empenhos" },
      { label: "Liquidações", path: "/liquidacoes" },
      { label: "Pagamentos", path: "/pagamentos" },
    ],
  },
  {
    label: "Gestão de Pessoal",
    icon: Users,
    children: [
      { label: "Servidores", path: "/pessoal" },
      { label: "Folha de Ponto", path: "/pessoal/ponto" },
      { label: "Folha de Pagamento", path: "/pessoal/pagamento" },
      { label: "Férias", path: "/pessoal/ferias" },
      { label: "Licenças", path: "/pessoal/licencas" },
    ],
  },
  { label: "Fiscalização", icon: ClipboardCheck, path: "/fiscalizacao" },
  {
    label: "Ouvidoria",
    icon: Bell,
    children: [
      { label: "Gestão de Manifestações", path: "/ouvidoria/interna" },
      { label: "Portal Público", path: "/ouvidoria" },
    ],
  },
  {
    label: "Diário Oficial",
    icon: FileText,
    children: [
      { label: "Gestão de Publicações", path: "/diario-oficial/interno" },
      { label: "Portal Público", path: "/diario-oficial" },
    ],
  },
  { label: "Transparência", icon: Eye, path: "/transparencia" },
  { label: "Auditoria e Controle", icon: ClipboardCheck, path: "/auditoria", roles: ["auditor", "admin"] },
  { label: "Alertas IA", icon: ShieldAlert, path: "/alertas", roles: ["auditor", "admin"] },
  { label: "Relatórios", icon: BarChart3, path: "/relatorios" },
  { label: "Usuários", icon: Users, path: "/usuarios", roles: ["admin"] },
  { label: "Configurações", icon: Settings, path: "/configuracoes", roles: ["admin"] },
];

export default function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, tenant, roles, signOut } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Contratações", "Execução Orçamentária"]);
  const [collapsed, setCollapsed] = useState(false);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isGroupActive = (item: NavItem) =>
    item.children?.some((c) => location.pathname.startsWith(c.path));

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Filter nav items by role
  const visibleItems = navItems.filter((item) => {
    if (!item.roles) return true;
    return item.roles.some((r) => roles.includes(r));
  });

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-sidebar flex flex-col z-40 transition-all duration-300 ${
        collapsed ? "w-[68px]" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
          <Building2 className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in overflow-hidden">
            <h1 className="text-sm font-bold text-sidebar-foreground leading-tight truncate">
              {tenant?.nome || "GestãoPública"}
            </h1>
            <p className="text-[11px] text-sidebar-muted truncate">
              {tenant?.municipio ? `${tenant.municipio}/${tenant.uf}` : "Controle de Despesas"}
            </p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-sidebar-muted hover:text-sidebar-foreground transition-colors"
        >
          {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-0.5">
        {visibleItems.map((item) => {
          const Icon = item.icon;

          if (item.children) {
            const expanded = expandedItems.includes(item.label);
            const groupActive = isGroupActive(item);

            return (
              <div key={item.label}>
                <button
                  onClick={() => !collapsed && toggleExpand(item.label)}
                  className={`sidebar-link w-full ${
                    groupActive ? "sidebar-link-active" : "sidebar-link-inactive"
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {expanded ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </>
                  )}
                </button>
                {expanded && !collapsed && (
                  <div className="ml-8 mt-0.5 space-y-0.5 animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`block px-3 py-2 rounded-md text-[13px] transition-colors ${
                          isActive(child.path)
                            ? "text-sidebar-primary font-medium bg-sidebar-accent/50"
                            : "text-sidebar-foreground/60 hover:text-sidebar-foreground"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path!}
              className={`sidebar-link ${
                isActive(item.path!)
                  ? "sidebar-link-active"
                  : "sidebar-link-inactive"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User info + Footer */}
      <div className="px-2.5 py-3 border-t border-sidebar-border space-y-2">
        {!collapsed && profile && (
          <div className="px-3 py-2 text-xs text-sidebar-muted">
            <p className="text-sidebar-foreground font-medium truncate">{profile.nome_completo}</p>
            <p className="truncate">{profile.cargo || roles[0] || "Usuário"}</p>
          </div>
        )}
        <button onClick={handleSignOut} className="sidebar-link sidebar-link-inactive w-full" title="Sair">
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}
