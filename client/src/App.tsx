import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useGA4PageView } from "@/hooks/use-ga4-pageview";
import { I18nProvider } from "@/contexts/i18n-context";
import { ErrorBoundary } from "@/components/error-boundary";
import { ScrollToTop } from "@/components/scroll-to-top";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { SUPPORTED_LOCALES } from "@/lib/i18n";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

// Lazy-loaded pages for code splitting
const Eventos = lazy(() => import("@/pages/eventos"));
const Experiencias = lazy(() => import("@/pages/experiencias"));
const Villas = lazy(() => import("@/pages/villas"));
const Transporte = lazy(() => import("@/pages/transporte"));
const Vuelos = lazy(() => import("@/pages/vuelos"));
const Hoteles = lazy(() => import("@/pages/hoteles"));
const Blog = lazy(() => import("@/pages/blog"));
const BlogPost = lazy(() => import("@/pages/blog-post"));
const Contacto = lazy(() => import("@/pages/contacto"));
const AffiliateDashboard = lazy(() => import("@/pages/affiliate-dashboard"));
const TulumGuiaCompleta = lazy(() => import("@/pages/tulum-guia-completa"));
const CenotesTulum = lazy(() => import("@/pages/cenotes-tulum"));
const ComoLlegar = lazy(() => import("@/pages/como-llegar"));
const CuantoCuesta = lazy(() => import("@/pages/cuanto-cuesta"));
const MejoresHoteles = lazy(() => import("@/pages/mejores-hoteles"));
const NightlifeTulum = lazy(() => import("@/pages/nightlife-tulum"));
const RestaurantesTulum = lazy(() => import("@/pages/restaurantes-tulum"));
const DigitalNomadTulum = lazy(() => import("@/pages/digital-nomad-tulum"));
const ExcursionesTulum = lazy(() => import("@/pages/excursiones-tulum"));
const BodasTulum = lazy(() => import("@/pages/bodas-tulum"));
const BuceoTulum = lazy(() => import("@/pages/buceo-tulum"));
const RivieraMaya = lazy(() => import("@/pages/riviera-maya"));
const ClimaTulum = lazy(() => import("@/pages/clima-tulum"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="text-2xl font-bold text-primary">TulumTkts</div>
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}

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
      {createLocalizedRoutes("/vuelos", Vuelos)}
      {createLocalizedRoutes("/hoteles", Hoteles)}
      {createLocalizedRoutes("/como-llegar-a-tulum", ComoLlegar)}
      {createLocalizedRoutes("/cuanto-cuesta-viajar-a-tulum", CuantoCuesta)}
      {createLocalizedRoutes("/mejores-hoteles-tulum", MejoresHoteles)}
      {createLocalizedRoutes("/nightlife-tulum", NightlifeTulum)}
      {createLocalizedRoutes("/restaurantes-tulum", RestaurantesTulum)}
      {createLocalizedRoutes("/digital-nomad-tulum", DigitalNomadTulum)}
      {createLocalizedRoutes("/excursiones-tulum", ExcursionesTulum)}
      {createLocalizedRoutes("/bodas-tulum", BodasTulum)}
      {createLocalizedRoutes("/buceo-tulum", BuceoTulum)}
      {createLocalizedRoutes("/riviera-maya", RivieraMaya)}
      {createLocalizedRoutes("/clima-tulum", ClimaTulum)}
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
            <Suspense fallback={<PageLoader />}>
              <Router />
            </Suspense>
            <ScrollToTop />
            <WhatsAppButton />
          </TooltipProvider>
        </I18nProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
