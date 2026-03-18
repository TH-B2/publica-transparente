import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PAC from "./pages/PAC";
import NovoPAC from "./pages/NovoPAC";
import Contratacoes from "./pages/Contratacoes";
import NovaContratacao from "./pages/NovaContratacao";
import Fornecedores from "./pages/Fornecedores";
import ExecucaoOrcamentaria from "./pages/ExecucaoOrcamentaria";
import Contabilidade from "./pages/Contabilidade";
import Fiscalizacao from "./pages/Fiscalizacao";
import Transparencia from "./pages/Transparencia";
import GestaoPessoal from "./pages/GestaoPessoal";
import Relatorios from "./pages/Relatorios";
import Usuarios from "./pages/Usuarios";
import Configuracoes from "./pages/Configuracoes";
import Ouvidoria from "./pages/Ouvidoria";
import OuvidoriaInterna from "./pages/OuvidoriaInterna";
import DiarioOficial from "./pages/DiarioOficial";
import DiarioOficialInterno from "./pages/DiarioOficialInterno";
import AuditoriaControle from "./pages/AuditoriaControle";
import AlertasIA from "./pages/AlertasIA";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Login />} />
            <Route path="/transparencia" element={<Transparencia />} />
            <Route path="/ouvidoria" element={<Ouvidoria />} />
            <Route path="/diario-oficial" element={<DiarioOficial />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/pac" element={<ProtectedRoute><PAC /></ProtectedRoute>} />
            <Route path="/pac/novo" element={<ProtectedRoute><NovoPAC /></ProtectedRoute>} />
            <Route path="/contratacoes" element={<ProtectedRoute><Contratacoes /></ProtectedRoute>} />
            <Route path="/contratacoes/nova" element={<ProtectedRoute><NovaContratacao /></ProtectedRoute>} />
            <Route path="/fornecedores" element={<ProtectedRoute><Fornecedores /></ProtectedRoute>} />
            <Route path="/empenhos" element={<ProtectedRoute><ExecucaoOrcamentaria /></ProtectedRoute>} />
            <Route path="/liquidacoes" element={<ProtectedRoute><ExecucaoOrcamentaria /></ProtectedRoute>} />
            <Route path="/pagamentos" element={<ProtectedRoute><ExecucaoOrcamentaria /></ProtectedRoute>} />
            <Route path="/contabilidade" element={<ProtectedRoute><Contabilidade /></ProtectedRoute>} />
            <Route path="/fiscalizacao" element={<ProtectedRoute><Fiscalizacao /></ProtectedRoute>} />
            <Route path="/pessoal" element={<ProtectedRoute><GestaoPessoal /></ProtectedRoute>} />
            <Route path="/pessoal/ponto" element={<ProtectedRoute><GestaoPessoal /></ProtectedRoute>} />
            <Route path="/pessoal/pagamento" element={<ProtectedRoute><GestaoPessoal /></ProtectedRoute>} />
            <Route path="/pessoal/ferias" element={<ProtectedRoute><GestaoPessoal /></ProtectedRoute>} />
            <Route path="/pessoal/licencas" element={<ProtectedRoute><GestaoPessoal /></ProtectedRoute>} />
            <Route path="/relatorios" element={<ProtectedRoute><Relatorios /></ProtectedRoute>} />
            <Route path="/usuarios" element={<ProtectedRoute requiredRoles={["admin"]}><Usuarios /></ProtectedRoute>} />
            <Route path="/configuracoes" element={<ProtectedRoute requiredRoles={["admin"]}><Configuracoes /></ProtectedRoute>} />
            <Route path="/ouvidoria/interna" element={<ProtectedRoute><OuvidoriaInterna /></ProtectedRoute>} />
            <Route path="/diario-oficial/interno" element={<ProtectedRoute><DiarioOficialInterno /></ProtectedRoute>} />
            <Route path="/auditoria" element={<ProtectedRoute requiredRoles={["auditor", "admin"]}><AuditoriaControle /></ProtectedRoute>} />
            <Route path="/alertas" element={<ProtectedRoute requiredRoles={["auditor", "admin"]}><AlertasIA /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
