import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/ui/language-selector";
import { 
  Menu, 
  X, 
  User, 
  Calendar,
  MapPin,
  Home as HomeIcon,
  Car,
  BookOpen,
  Phone
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

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-2xl font-bold text-primary cursor-pointer">TulumTkts</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navigationItems.slice(1).map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    location === item.href 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-gray-700 hover:text-primary'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            <Button variant="ghost" className="text-gray-700 hover:text-primary">
              <User className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Iniciar Sesión</span>
            </Button>
            
            <Button className="bg-primary text-white hover:bg-primary/90 hidden sm:inline-flex">
              Publicar Experiencia
            </Button>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-100">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <span 
                      className={`flex items-center px-3 py-2 text-base font-medium transition-colors cursor-pointer ${
                        location === item.href 
                          ? 'text-primary bg-primary/10' 
                          : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {item.label}
                    </span>
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-gray-100">
                <Button className="w-full bg-primary text-white hover:bg-primary/90">
                  Publicar Experiencia
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}