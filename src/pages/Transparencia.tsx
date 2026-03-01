import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Search, FileText, DollarSign, ShoppingCart, Users, Download, ExternalLink, MessageSquare, Newspaper } from "lucide-react";

const despesasRecentes = [
  { data: "12/02/2026", tipo: "Pagamento", favorecido: "Clean Services Ltda", objeto: "Serviços de limpeza", valor: "R$ 40.000,00" },
  { data: "10/02/2026", tipo: "Empenho", favorecido: "Papelaria Central", objeto: "Material de escritório", valor: "R$ 15.200,00" },
  { data: "08/02/2026", tipo: "Liquidação", favorecido: "Auto Mecânica SP", objeto: "Manutenção veicular", valor: "R$ 8.750,00" },
  { data: "05/02/2026", tipo: "Pagamento", favorecido: "TechSupport S.A.", objeto: "Suporte de TI", valor: "R$ 13.000,00" },
  { data: "03/02/2026", tipo: "Empenho", favorecido: "Vigil Security Ltda", objeto: "Vigilância patrimonial", valor: "R$ 80.000,00" },
  { data: "01/02/2026", tipo: "Pagamento", favorecido: "Clima Frio ME", objeto: "Manutenção de ar-condicionado", valor: "R$ 4.800,00" },
];

const tipoColors: Record<string, string> = {
  Pagamento: "bg-success/10 text-success",
  Empenho: "bg-primary/10 text-primary",
  Liquidação: "bg-accent/10 text-accent-foreground",
};

export default function Transparencia() {
  return (
    <div className="min-h-screen bg-background">
      {/* Public Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Building2 className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-heading font-bold">Portal da Transparência</h1>
                <p className="text-xs text-primary-foreground/70">Município de Exemplo - Gestão 2025-2028</p>
              </div>
            </div>
            <Link
              to="/"
              className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Área restrita →
            </Link>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="bg-primary/95 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-primary-foreground/80 text-sm mb-3">
            Consulte as despesas, contratações e informações do município
          </p>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por fornecedor, processo, objeto..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="max-w-6xl mx-auto px-6 -mt-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: FileText, label: "Plano de Contratações", desc: "PAC 2026", count: "194 itens" },
            { icon: ShoppingCart, label: "Contratações", desc: "Processos licitatórios", count: "47 ativos" },
            { icon: DollarSign, label: "Despesas", desc: "Empenhos e pagamentos", count: "R$ 12M executado" },
            { icon: Users, label: "Fornecedores", desc: "Cadastro de empresas", count: "238 cadastrados" },
          ].map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="stat-card cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <p className="font-heading font-semibold text-foreground text-sm">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
              <p className="text-xs font-medium text-primary mt-1">{item.count}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Public Portals */}
      <div className="max-w-6xl mx-auto px-6 mt-6">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-3">Serviços ao Cidadão</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link to="/ouvidoria">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="stat-card group flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground text-sm">Ouvidoria</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Registre denúncias, sugestões, elogios e reclamações. Acompanhe o andamento pelo número do protocolo.
                </p>
                <span className="text-xs font-medium text-primary mt-1.5 inline-flex items-center gap-1">
                  Acessar portal <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          </Link>
          <Link to="/diario-oficial">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="stat-card group flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <Newspaper className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground text-sm">Diário Oficial</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Consulte decretos, portarias, leis e demais atos administrativos publicados pelo município.
                </p>
                <span className="text-xs font-medium text-primary mt-1.5 inline-flex items-center gap-1">
                  Acessar portal <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-foreground">Últimas Despesas</h2>
          <button className="flex items-center gap-1.5 text-sm text-primary hover:underline">
            <Download className="w-3.5 h-3.5" /> Exportar CSV
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="stat-card overflow-x-auto"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border">
                <th className="text-left py-2.5 font-medium">Data</th>
                <th className="text-left py-2.5 font-medium">Tipo</th>
                <th className="text-left py-2.5 font-medium">Favorecido</th>
                <th className="text-left py-2.5 font-medium">Objeto</th>
                <th className="text-right py-2.5 font-medium">Valor</th>
              </tr>
            </thead>
            <tbody>
              {despesasRecentes.map((d, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-2.5 text-muted-foreground">{d.data}</td>
                  <td className="py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tipoColors[d.tipo]}`}>
                      {d.tipo}
                    </span>
                  </td>
                  <td className="py-2.5 text-foreground">{d.favorecido}</td>
                  <td className="py-2.5 text-muted-foreground">{d.objeto}</td>
                  <td className="py-2.5 text-right font-medium text-foreground">{d.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className="text-xs text-muted-foreground mt-6 text-center">
          Dados atualizados em tempo real • Em conformidade com a Lei de Acesso à Informação (LAI)
        </p>
      </div>
    </div>
  );
}
