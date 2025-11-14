import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useGA4PageView } from "@/hooks/use-ga4-pageview";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/eventos" component={Eventos} />
      <Route path="/experiencias" component={Experiencias} />
      <Route path="/villas" component={Villas} />
      <Route path="/transporte" component={Transporte} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/blog" component={Blog} />
      <Route path="/contacto" component={Contacto} />
      <Route path="/affiliate-dashboard" component={AffiliateDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Track page views on route changes
  useGA4PageView();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
