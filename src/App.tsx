import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PAC from "./pages/PAC";
import NovoPAC from "./pages/NovoPAC";
import Contratacoes from "./pages/Contratacoes";
import NovaContratacao from "./pages/NovaContratacao";
import Fornecedores from "./pages/Fornecedores";
import ExecucaoOrcamentaria from "./pages/ExecucaoOrcamentaria";
import Fiscalizacao from "./pages/Fiscalizacao";
import Transparencia from "./pages/Transparencia";
import GestaoPessoal from "./pages/GestaoPessoal";
import Relatorios from "./pages/Relatorios";
import Usuarios from "./pages/Usuarios";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pac" element={<PAC />} />
          <Route path="/pac/novo" element={<NovoPAC />} />
          <Route path="/contratacoes" element={<Contratacoes />} />
          <Route path="/contratacoes/nova" element={<NovaContratacao />} />
          <Route path="/fornecedores" element={<Fornecedores />} />
          <Route path="/empenhos" element={<ExecucaoOrcamentaria />} />
          <Route path="/liquidacoes" element={<ExecucaoOrcamentaria />} />
          <Route path="/pagamentos" element={<ExecucaoOrcamentaria />} />
          <Route path="/fiscalizacao" element={<Fiscalizacao />} />
          <Route path="/transparencia" element={<Transparencia />} />
          <Route path="/pessoal" element={<GestaoPessoal />} />
          <Route path="/pessoal/ponto" element={<GestaoPessoal />} />
          <Route path="/pessoal/pagamento" element={<GestaoPessoal />} />
          <Route path="/pessoal/ferias" element={<GestaoPessoal />} />
          <Route path="/pessoal/licencas" element={<GestaoPessoal />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
