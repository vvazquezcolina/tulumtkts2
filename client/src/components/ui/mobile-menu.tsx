import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
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
  { href: "/", label: "Inicio", icon: HomeIcon },
  { href: "/eventos", label: "Eventos", icon: Calendar },
  { href: "/experiencias", label: "Experiencias", icon: MapPin },
  { href: "/villas", label: "Villas & Rentals", icon: HomeIcon },
  { href: "/transporte", label: "Transporte", icon: Car },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/contacto", label: "Contacto", icon: Phone }
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

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
            Discover the magic of Tulum
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={location === item.href ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setOpen(false)}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
          <div className="border-t pt-4 mt-4">
            <Button variant="ghost" className="w-full justify-start mb-2">
              <User className="w-4 h-4 mr-3" />
              Iniciar Sesión
            </Button>
            <Button className="w-full bg-primary text-white hover:bg-primary/90">
              Publicar Experiencia
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}