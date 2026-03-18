import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Preencha e-mail e senha");
      return;
    }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      toast.error("Credenciais inválidas. Verifique e-mail e senha.");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden flex-col items-center justify-center text-primary-foreground p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 border border-primary-foreground/20 rounded-full" />
          <div className="absolute bottom-32 right-16 w-48 h-48 border border-primary-foreground/20 rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-96 h-96 border border-primary-foreground/10 rounded-full" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 max-w-md"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-8">
            <Building2 className="w-8 h-8 text-accent-foreground" />
          </div>
          <h2 className="text-3xl font-heading font-bold mb-4">
            Plataforma SaaS de Gestão Pública
          </h2>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            Controle, transparência e conformidade na execução orçamentária municipal.
            Multi-tenant, com IA integrada e em conformidade com a Lei 14.133/2021, LRF e PCASP.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            <div className="bg-primary-foreground/10 rounded-xl p-4">
              <p className="text-2xl font-bold">SaaS</p>
              <p className="text-xs text-primary-foreground/60 mt-1">Multi-tenant</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-xl p-4">
              <p className="text-2xl font-bold">IA</p>
              <p className="text-xs text-primary-foreground/60 mt-1">Alertas n8n</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-xl p-4">
              <p className="text-2xl font-bold">PCASP</p>
              <p className="text-xs text-primary-foreground/60 mt-1">Completo</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right panel - Login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-heading font-bold text-foreground">GestãoPública</h1>
          </div>

          <h2 className="text-2xl font-heading font-bold text-foreground mb-1">
            Acesse sua conta
          </h2>
          <p className="text-muted-foreground mb-8">
            Entre com suas credenciais para acessar o sistema
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.gov.br"
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded border-input" />
                Lembrar de mim
              </label>
              <a href="#" className="text-primary hover:underline font-medium">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Não possui conta?{" "}
            <a href="#" className="text-primary hover:underline font-medium">
              Solicitar acesso
            </a>
          </p>

          <div className="mt-10 pt-6 border-t border-border text-center space-y-2">
            <Link to="/transparencia" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
              🔍 Acessar Portal da Transparência
            </Link>
            <Link to="/ouvidoria" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
              📢 Ouvidoria Pública
            </Link>
            <Link to="/diario-oficial" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
              📰 Diário Oficial
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
