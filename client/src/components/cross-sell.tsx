import { Card, CardContent } from "@/components/ui/card";
import { Plane, Hotel, Compass, Car, Shield, Wifi, ArrowRight, Map, DollarSign, Star } from "lucide-react";
import { useLocalizedLink } from "@/hooks/use-localized-link";
import { generateFlightLink, generateHotelLink, generateCarRentalLink, generateAffiliateLink, trackAffiliateClick } from "@/lib/affiliate";

interface CrossSellItem {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  isExternal?: boolean;
  trackCategory?: string;
}

const allItems: Record<string, CrossSellItem> = {
  vuelos: {
    icon: Plane,
    title: "Vuelos a Cancun",
    description: "Encuentra las mejores tarifas",
    href: "/vuelos",
  },
  hoteles: {
    icon: Hotel,
    title: "Hoteles en Tulum",
    description: "Desde $50/noche con cancelacion gratis",
    href: "/hoteles",
  },
  experiencias: {
    icon: Compass,
    title: "Tours y Actividades",
    description: "Cenotes, ruinas, snorkel y mas",
    href: "/experiencias",
  },
  transporte: {
    icon: Car,
    title: "Transfer y Autos",
    description: "Del aeropuerto a tu hotel",
    href: "/transporte",
  },
  seguro: {
    icon: Shield,
    title: "Seguro de Viaje",
    description: "Viaja protegido desde $8/dia",
    href: "https://safetywing.com/nomad-insurance",
    isExternal: true,
    trackCategory: "insurance",
  },
  esim: {
    icon: Wifi,
    title: "eSIM Mexico",
    description: "Internet movil desde $4.50",
    href: "https://www.airalo.com/mexico",
    isExternal: true,
    trackCategory: "esim",
  },
  comoLlegar: {
    icon: Map,
    title: "Como Llegar",
    description: "Guia completa del aeropuerto a Tulum",
    href: "/como-llegar-a-tulum",
  },
  cuantoCuesta: {
    icon: DollarSign,
    title: "Cuanto Cuesta",
    description: "Calcula tu presupuesto de viaje",
    href: "/cuanto-cuesta-viajar-a-tulum",
  },
  mejoresHoteles: {
    icon: Star,
    title: "Mejores Hoteles",
    description: "Top 15 hospedajes en Tulum",
    href: "/mejores-hoteles-tulum",
  },
};

interface CrossSellProps {
  /** Which items to show. Defaults to all internal pages. */
  items?: (keyof typeof allItems)[];
  /** Title for the section */
  title?: string;
  /** Exclude these items */
  exclude?: string[];
}

export function CrossSell({
  items,
  title = "Completa tu viaje a Tulum",
  exclude = [],
}: CrossSellProps) {
  const { getLocalizedLink } = useLocalizedLink();

  const displayItems = (items || ["vuelos", "hoteles", "experiencias", "transporte"])
    .filter((key) => !exclude.includes(key))
    .map((key) => allItems[key])
    .filter(Boolean);

  const handleClick = (item: CrossSellItem) => {
    if (item.isExternal) {
      if (item.trackCategory) {
        trackAffiliateClick(item.trackCategory, item.title, "0", item.trackCategory);
      }
      const url = generateAffiliateLink(item.href, "safetyWing", `crosssell_${item.trackCategory}`);
      window.open(url, "_blank", "noopener");
    } else {
      window.location.href = getLocalizedLink(item.href);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayItems.map((item) => (
            <Card
              key={item.title}
              className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 group"
              onClick={() => handleClick(item)}
            >
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-teal-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">{item.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors shrink-0" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
