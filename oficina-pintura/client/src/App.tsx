import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Agendamentos from "./pages/Agendamentos";
import Projetos from "./pages/Projetos";
import Materiais from "./pages/Materiais";
import Financeiro from "./pages/Financeiro";
import Relatorios from "./pages/Relatorios";

/**
 * App.tsx - Roteador Principal
 * Design Artístico Contemporâneo com tema claro
 * Laranja, Azul Profundo, Ouro e Rosa Coral
 */

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Dashboard} />
      <Route path={"/clientes"} component={Clientes} />
      <Route path={"/agendamentos"} component={Agendamentos} />
      <Route path={"/projetos"} component={Projetos} />
      <Route path={"/materiais"} component={Materiais} />
      <Route path={"/financeiro"} component={Financeiro} />
      <Route path={"/relatorios"} component={Relatorios} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
