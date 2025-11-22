import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useGA4PageView } from "@/hooks/use-ga4-pageview";
import { I18nProvider } from "@/contexts/i18n-context";
import { ErrorBoundary } from "@/components/error-boundary";
import { SUPPORTED_LOCALES } from "@/lib/i18n";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Eventos from "@/pages/eventos";
import Experiencias from "@/pages/experiencias";
import Villas from "@/pages/villas";
import Transporte from "@/pages/transporte";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import Contacto from "@/pages/contacto";
import AffiliateDashboard from "@/pages/affiliate-dashboard";
import TulumGuiaCompleta from "@/pages/tulum-guia-completa";
import CenotesTulum from "@/pages/cenotes-tulum";

// Componente helper para crear rutas localizadas (con y sin prefijo de idioma)
function createLocalizedRoutes(basePath: string, component: React.ComponentType<any>) {
  const routes: JSX.Element[] = [];
  
  // Ruta sin prefijo de idioma (español - default)
  routes.push(<Route key={basePath} path={basePath} component={component} />);
  
  // Agregar rutas con prefijo de idioma para en, fr, it
  SUPPORTED_LOCALES.filter(locale => locale !== 'es').forEach(locale => {
    routes.push(
      <Route key={`/${locale}${basePath}`} path={`/${locale}${basePath}`} component={component} />
    );
  });
  
  return routes;
}

function Router() {
  return (
    <Switch>
      {createLocalizedRoutes("/", Home)}
      {createLocalizedRoutes("/tulum-guia-completa", TulumGuiaCompleta)}
      {createLocalizedRoutes("/cenotes-tulum", CenotesTulum)}
      {createLocalizedRoutes("/eventos", Eventos)}
      {createLocalizedRoutes("/experiencias", Experiencias)}
      {createLocalizedRoutes("/villas", Villas)}
      {createLocalizedRoutes("/transporte", Transporte)}
      {createLocalizedRoutes("/blog/:slug", BlogPost)}
      {createLocalizedRoutes("/blog", Blog)}
      {createLocalizedRoutes("/contacto", Contacto)}
      {createLocalizedRoutes("/affiliate-dashboard", AffiliateDashboard)}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Track page views on route changes
  useGA4PageView();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <I18nProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </I18nProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
