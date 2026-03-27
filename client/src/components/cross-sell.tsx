import { Card, CardContent } from "@/components/ui/card";
import { Plane, Hotel, Compass, Car, Shield, Wifi, ArrowRight, Map, DollarSign, Star } from "lucide-react";
import { useLocalizedLink } from "@/hooks/use-localized-link";
import { generateFlightLink, generateHotelLink, generateCarRentalLink, generateAffiliateLink, trackAffiliateClick } from "@/lib/affiliate";
import { useI18n } from "@/contexts/i18n-context";

interface CrossSellItem {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  isExternal?: boolean;
  trackCategory?: string;
}

type CrossSellKey = 'vuelos' | 'hoteles' | 'experiencias' | 'transporte' | 'seguro' | 'esim' | 'comoLlegar' | 'cuantoCuesta' | 'mejoresHoteles';

function getCrossSellItems(t: (key: string) => string): Record<CrossSellKey, CrossSellItem> {
  return {
    vuelos: {
      icon: Plane,
      title: t('crossSell.items.flights.title'),
      description: t('crossSell.items.flights.description'),
      href: "/vuelos",
    },
    hoteles: {
      icon: Hotel,
      title: t('crossSell.items.hotels.title'),
      description: t('crossSell.items.hotels.description'),
      href: "/hoteles",
    },
    experiencias: {
      icon: Compass,
      title: t('crossSell.items.experiences.title'),
      description: t('crossSell.items.experiences.description'),
      href: "/experiencias",
    },
    transporte: {
      icon: Car,
      title: t('crossSell.items.transport.title'),
      description: t('crossSell.items.transport.description'),
      href: "/transporte",
    },
    seguro: {
      icon: Shield,
      title: t('crossSell.items.insurance.title'),
      description: t('crossSell.items.insurance.description'),
      href: "https://safetywing.com/nomad-insurance",
      isExternal: true,
      trackCategory: "insurance",
    },
    esim: {
      icon: Wifi,
      title: t('crossSell.items.esim.title'),
      description: t('crossSell.items.esim.description'),
      href: "https://www.airalo.com/mexico",
      isExternal: true,
      trackCategory: "esim",
    },
    comoLlegar: {
      icon: Map,
      title: t('crossSell.items.howToGetThere.title'),
      description: t('crossSell.items.howToGetThere.description'),
      href: "/como-llegar-a-tulum",
    },
    cuantoCuesta: {
      icon: DollarSign,
      title: t('crossSell.items.howMuchItCosts.title'),
      description: t('crossSell.items.howMuchItCosts.description'),
      href: "/cuanto-cuesta-viajar-a-tulum",
    },
    mejoresHoteles: {
      icon: Star,
      title: t('crossSell.items.bestHotels.title'),
      description: t('crossSell.items.bestHotels.description'),
      href: "/mejores-hoteles-tulum",
    },
  };
}

interface CrossSellProps {
  /** Which items to show. Defaults to all internal pages. */
  items?: CrossSellKey[];
  /** Title for the section */
  title?: string;
  /** Exclude these items */
  exclude?: string[];
}

export function CrossSell({ items, title, exclude = [] }: CrossSellProps) {
  const { t } = useI18n();
  const allItems = getCrossSellItems(t);
  const displayTitle = title || t('crossSell.defaultTitle');
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
          {displayTitle}
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
