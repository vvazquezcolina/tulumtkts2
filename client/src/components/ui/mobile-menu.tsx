import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/i18n-context";
import { useLocalizedLink } from "@/hooks/use-localized-link";
import { getPathWithoutLocale } from "@/lib/routing";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  Menu, 
  Calendar,
  MapPin,
  Home as HomeIcon,
  Car,
  BookOpen,
  Phone,
  User
} from "lucide-react";

const navigationItems = [
  { href: "/", labelKey: "nav.home", icon: HomeIcon },
  { href: "/eventos", labelKey: "nav.events", icon: Calendar },
  { href: "/experiencias", labelKey: "nav.experiences", icon: MapPin },
  { href: "/villas", labelKey: "nav.villas", icon: HomeIcon },
  { href: "/transporte", labelKey: "nav.transport", icon: Car },
  { href: "/blog", labelKey: "nav.blog", icon: BookOpen },
  { href: "/contacto", labelKey: "nav.contact", icon: Phone }
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { t } = useI18n();
  const { getLocalizedLink } = useLocalizedLink();
  
  // Obtener la ruta actual sin prefijo de idioma para comparación
  const currentPath = getPathWithoutLocale(location);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left">
            <span className="text-2xl font-bold text-primary">TulumTkts</span>
          </SheetTitle>
          <SheetDescription className="text-left">
            {t('common.discoverTulum')}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const localizedHref = getLocalizedLink(item.href);
            const isActive = currentPath === item.href;
            return (
              <Link key={item.href} href={localizedHref}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setOpen(false)}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {t(item.labelKey)}
                </Button>
              </Link>
            );
          })}
          <div className="border-t pt-4 mt-4">
            <Button variant="ghost" className="w-full justify-start mb-2">
              <User className="w-4 h-4 mr-3" />
              {t('common.signIn')}
            </Button>
            <Button className="w-full bg-primary text-white hover:bg-primary/90">
              {t('common.publishExperience')}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}