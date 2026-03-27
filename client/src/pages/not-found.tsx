import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/ui/navigation";
import { useLocalizedLink } from "@/hooks/use-localized-link";
import { Home, Compass, Map, Plane, Hotel } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  const { getLocalizedLink } = useLocalizedLink();

  const quickLinks = [
    { href: "/experiencias", icon: Compass, label: "Tours & Experiences" },
    { href: "/cenotes-tulum", icon: Map, label: "Cenotes" },
    { href: "/vuelos", icon: Plane, label: "Flights" },
    { href: "/hoteles", icon: Hotel, label: "Hotels" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-lg mx-auto">
          <div className="text-8xl md:text-9xl font-black text-primary/20 mb-4">404</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lost in Paradise?
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            This page doesn't exist, but there's so much to discover in Tulum. Let us help you find your way.
          </p>

          <Link href={getLocalizedLink("/")}>
            <Button className="bg-primary text-white hover:bg-primary/90 px-8 py-3 text-lg mb-12">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <Link key={link.href} href={getLocalizedLink(link.href)}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-4 text-center">
                    <link.icon className="w-8 h-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-gray-700">{link.label}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
