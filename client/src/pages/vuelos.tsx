import { useState } from "react";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/ui/navigation";
import { SEOHead } from "@/components/seo-head";
import { WebsiteSchema } from "@/components/json-ld";
import { FAQSchema, FAQAccordion } from "@/components/faq-schema";
import { useI18n } from "@/contexts/i18n-context";
import { useLocalizedLink } from "@/hooks/use-localized-link";
import { generateFlightLink, trackAffiliateClick } from "@/lib/affiliate";
import {
  Plane,
  Search,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle,
  TrendingDown,
} from "lucide-react";

interface PopularRoute {
  originCode: string;
  originCity: string;
  destinationCode: string;
  destinationCity: string;
  price: string;
  flag: string;
}

const DESTINATION_CODE = "CUN";
const DESTINATION_CITY = "Cancún";

const popularRoutes: PopularRoute[] = [
  {
    originCode: "MEX",
    originCity: "CDMX",
    destinationCode: DESTINATION_CODE,
    destinationCity: DESTINATION_CITY,
    price: "$1,200 MXN",
    flag: "🇲🇽",
  },
  {
    originCode: "JFK",
    originCity: "New York",
    destinationCode: DESTINATION_CODE,
    destinationCity: DESTINATION_CITY,
    price: "$180 USD",
    flag: "🇺🇸",
  },
  {
    originCode: "LAX",
    originCity: "Los Angeles",
    destinationCode: DESTINATION_CODE,
    destinationCity: DESTINATION_CITY,
    price: "$220 USD",
    flag: "🇺🇸",
  },
  {
    originCode: "MIA",
    originCity: "Miami",
    destinationCode: DESTINATION_CODE,
    destinationCity: DESTINATION_CITY,
    price: "$120 USD",
    flag: "🇺🇸",
  },
  {
    originCode: "ORD",
    originCity: "Chicago",
    destinationCode: DESTINATION_CODE,
    destinationCity: DESTINATION_CITY,
    price: "$200 USD",
    flag: "🇺🇸",
  },
  {
    originCode: "MAD",
    originCity: "Madrid",
    destinationCode: DESTINATION_CODE,
    destinationCity: DESTINATION_CITY,
    price: "€250",
    flag: "🇪🇸",
  },
  {
    originCode: "LHR",
    originCity: "London",
    destinationCode: DESTINATION_CODE,
    destinationCity: DESTINATION_CITY,
    price: "£280",
    flag: "🇬🇧",
  },
  {
    originCode: "YYZ",
    originCity: "Toronto",
    destinationCode: DESTINATION_CODE,
    destinationCity: DESTINATION_CITY,
    price: "$300 CAD",
    flag: "🇨🇦",
  },
];

function formatDateForAviasales(dateStr: string): string {
  // aviasales expects DDMM format
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return "";
  return `${parts[2]}${parts[1]}`;
}

export default function Vuelos() {
  const { t } = useI18n();
  const { getLocalizedLink } = useLocalizedLink();

  const [origin, setOrigin] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://tulumtkts.com";

  function handleSearch() {
    if (!origin.trim()) return;

    setIsSearching(true);

    const originCode = origin.trim().toUpperCase().replace(/\s+/g, "").slice(0, 3);
    const formattedDepart = formatDateForAviasales(departureDate);
    const formattedReturn = formatDateForAviasales(returnDate);

    const affiliateUrl = generateFlightLink(
      originCode,
      DESTINATION_CODE,
      formattedDepart || undefined,
      formattedReturn || undefined
    );

    trackAffiliateClick("aviasales", `${originCode} → ${DESTINATION_CODE}`, "flight", "vuelos");

    setTimeout(() => {
      setIsSearching(false);
      window.open(affiliateUrl, "_blank", "noopener,noreferrer");
    }, 300);
  }

  function handleRouteClick(route: PopularRoute) {
    const affiliateUrl = generateFlightLink(route.originCode, route.destinationCode);
    trackAffiliateClick("aviasales", `${route.originCode} → ${route.destinationCode}`, route.price, "vuelos_popular");
    window.open(affiliateUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={t("vuelos.title")}
        description={t("vuelos.description")}
        keywords={[
          "vuelos cancun baratos",
          "vuelos a cancun",
          "vuelos tulum",
          "flights to cancun",
          "vuelos CUN",
          "aeropuerto cancun tulum",
          "vuelos baratos mexico caribe",
          "flights cancun mexico",
          "vuelos cdmx cancun",
          "boletos avion cancun",
        ]}
        canonicalUrl={`${siteUrl}/vuelos`}
        ogType="website"
        ogImage="https://images.unsplash.com/photo-1574181419028-e8c44c95a6d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630"
        currentPath="/vuelos"
      />
      <WebsiteSchema siteUrl={siteUrl} siteName="TulumTkts" />

      <FAQSchema
        faqs={[
          {
            question: "¿Cuál es el aeropuerto más cercano a Tulum?",
            answer:
              "El aeropuerto más cercano a Tulum es el Aeropuerto Internacional de Cancún (CUN), ubicado a aproximadamente 130 km (2 horas en auto) de Tulum. No existe aeropuerto comercial en Tulum mismo.",
          },
          {
            question: "¿Cuánto tiempo tarda el vuelo a Cancún desde CDMX?",
            answer:
              "El vuelo de Ciudad de México (MEX) a Cancún (CUN) dura aproximadamente 2 horas y 15 minutos. Hay múltiples vuelos directos diarios operados por Aeromexico, Volaris, VivaAerobus y otras aerolíneas.",
          },
          {
            question: "¿Cuál es la mejor época para comprar vuelos baratos a Cancún?",
            answer:
              "La mejor época para encontrar vuelos baratos a Cancún es durante los meses de mayo, junio, septiembre y octubre (temporada baja). Se recomienda comprar con 2 a 3 meses de anticipación y evitar Semana Santa, Navidad y julio-agosto.",
          },
          {
            question: "¿Cómo llego de Cancún a Tulum?",
            answer:
              "Desde el aeropuerto de Cancún puedes llegar a Tulum en: transfer privado ($65-150 USD, 1.5-2 horas), shuttle compartido ($25-50 USD), renta de auto ($35-85 USD/día), taxi ($100-180 USD) o bus ADO ($15-25 USD). El traslado privado es la opción más cómoda.",
          },
          {
            question: "¿Qué aerolíneas vuelan a Cancún?",
            answer:
              "Múltiples aerolíneas operan vuelos a Cancún (CUN): Aeromexico, Volaris, VivaAerobus (desde México), American Airlines, Delta, United, Southwest (desde EE.UU.), Air Canada (desde Canadá), Iberia, Air Europa (desde España), y más aerolíneas europeas según temporada.",
          },
        ]}
      />

      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600">
            <a href={getLocalizedLink("/")} className="hover:text-primary">
              {t("vuelos.breadcrumb.home")}
            </a>
            <span className="mx-2">/</span>
            <a href={getLocalizedLink("/tulum-guia-completa")} className="hover:text-primary">
              {t("vuelos.breadcrumb.guide")}
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{t("vuelos.breadcrumb.current")}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section with Search Form */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-primary overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        {/* Decorative background plane silhouette */}
        <div className="absolute inset-0 opacity-5 flex items-center justify-end pr-12 pointer-events-none">
          <Plane className="w-96 h-96 text-white rotate-12" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-10">
            <Badge className="bg-white/20 text-white border-white/30 mb-4 text-sm px-4 py-1">
              {t("vuelos.hero.airportBadge")}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {t("vuelos.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
              {t("vuelos.hero.subtitle")}
            </p>
          </div>

          {/* Search Form Card */}
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-2xl border-0">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  {t("vuelos.search.title")}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Origin */}
                  <div className="md:col-span-3">
                    <Label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("vuelos.search.origin")}
                    </Label>
                    <div className="relative">
                      <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder={t("vuelos.search.originPlaceholder")}
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="pl-10"
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      />
                    </div>
                  </div>

                  {/* Departure date */}
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("vuelos.search.departure")}
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="pl-10"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>

                  {/* Return date */}
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("vuelos.search.return")}
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="pl-10"
                        min={departureDate || new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>

                  {/* Search button */}
                  <div className="flex items-end">
                    <Button
                      className="w-full bg-primary text-white hover:bg-primary/90 h-10 font-semibold"
                      onClick={handleSearch}
                      disabled={isSearching || !origin.trim()}
                    >
                      {isSearching ? (
                        <>
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                          {t("vuelos.search.searching")}
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          {t("vuelos.search.searchButton")}
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-gray-400 text-center">
                  {t("vuelos.search.poweredBy")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("vuelos.popularRoutes.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("vuelos.popularRoutes.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularRoutes.map((route) => (
              <Card
                key={route.originCode}
                className="hover:shadow-lg transition-all duration-200 cursor-pointer group border border-gray-200 hover:border-primary/40"
                onClick={() => handleRouteClick(route)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{route.flag}</span>
                    <Badge variant="outline" className="text-xs font-mono">
                      {route.originCode} → {route.destinationCode}
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {route.originCity}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                      <ArrowRight className="w-3 h-3" />
                      <span>{route.destinationCity} (CUN)</span>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-500 mb-0.5">{t("vuelos.popularRoutes.from")}</p>
                    <p className="text-lg font-bold text-primary">{route.price}</p>
                  </div>

                  <div className="mt-3">
                    <span className="text-xs text-primary font-medium group-hover:underline flex items-center gap-1">
                      {t("vuelos.popularRoutes.searchRoute")}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("vuelos.tips.title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("vuelos.tips.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tip 1 - Book ahead */}
            <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t("vuelos.tips.bookAhead.title")}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {t("vuelos.tips.bookAhead.description")}
                  </p>
                </div>
              </div>
            </Card>

            {/* Tip 2 - Cheap months */}
            <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t("vuelos.tips.cheapMonths.title")}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {t("vuelos.tips.cheapMonths.description")}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {[
                      t("vuelos.tips.cheapMonths.month1"),
                      t("vuelos.tips.cheapMonths.month2"),
                      t("vuelos.tips.cheapMonths.month3"),
                      t("vuelos.tips.cheapMonths.month4"),
                    ].map((month) => (
                      <Badge key={month} variant="outline" className="text-xs text-green-700 border-green-300 bg-green-50">
                        {month}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Tip 3 - Airport */}
            <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Plane className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t("vuelos.tips.airport.title")}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {t("vuelos.tips.airport.description")}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{t("vuelos.tips.airport.distance")}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{t("vuelos.tips.airport.driveTime")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tip 4 - Transfer */}
            <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t("vuelos.tips.transfer.title")}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {t("vuelos.tips.transfer.description")}
                  </p>
                  <a
                    href={getLocalizedLink("/transporte")}
                    className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary hover:underline"
                  >
                    {t("vuelos.tips.transfer.linkText")}
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("vuelos.faq.title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("vuelos.faq.subtitle")}
            </p>
          </div>

          <FAQAccordion
            faqs={[
              {
                question: "¿Cuál es el aeropuerto más cercano a Tulum?",
                answer:
                  "El aeropuerto más cercano a Tulum es el Aeropuerto Internacional de Cancún (CUN), ubicado a aproximadamente 130 km (2 horas en auto) de Tulum. No existe aeropuerto comercial en Tulum mismo.",
              },
              {
                question: "¿Cuánto tiempo tarda el vuelo a Cancún desde CDMX?",
                answer:
                  "El vuelo de Ciudad de México (MEX) a Cancún (CUN) dura aproximadamente 2 horas y 15 minutos. Hay múltiples vuelos directos diarios operados por Aeromexico, Volaris, VivaAerobus y otras aerolíneas.",
              },
              {
                question: "¿Cuál es la mejor época para comprar vuelos baratos a Cancún?",
                answer:
                  "La mejor época para encontrar vuelos baratos a Cancún es durante los meses de mayo, junio, septiembre y octubre (temporada baja). Se recomienda comprar con 2 a 3 meses de anticipación y evitar Semana Santa, Navidad y julio-agosto.",
              },
              {
                question: "¿Cómo llego de Cancún a Tulum?",
                answer:
                  "Desde el aeropuerto de Cancún puedes llegar a Tulum en: transfer privado ($65-150 USD, 1.5-2 horas), shuttle compartido ($25-50 USD), renta de auto ($35-85 USD/día), taxi ($100-180 USD) o bus ADO ($15-25 USD). El traslado privado es la opción más cómoda.",
              },
              {
                question: "¿Qué aerolíneas vuelan a Cancún?",
                answer:
                  "Múltiples aerolíneas operan vuelos a Cancún (CUN): Aeromexico, Volaris, VivaAerobus (desde México), American Airlines, Delta, United, Southwest (desde EE.UU.), Air Canada (desde Canadá), Iberia, Air Europa (desde España), y más aerolíneas europeas según temporada.",
              },
            ]}
            className="bg-gray-50 rounded-lg p-6"
          />
        </div>
      </section>

      {/* Transfer CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {t("vuelos.transferCta.title")}
            </h2>
            <p className="text-xl text-white/90 font-medium mb-3">
              {t("vuelos.transferCta.subtitle")}
            </p>
            <p className="text-white/80 max-w-xl mx-auto text-base">
              {t("vuelos.transferCta.description")}
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 text-white text-sm">
              <CheckCircle className="w-4 h-4" />
              {t("vuelos.transferCta.features.private")}
            </div>
            <div className="flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 text-white text-sm">
              <CheckCircle className="w-4 h-4" />
              {t("vuelos.transferCta.features.professional")}
            </div>
            <div className="flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 text-white text-sm">
              <MapPin className="w-4 h-4" />
              {t("vuelos.transferCta.features.distance")}
            </div>
          </div>

          <a href={getLocalizedLink("/transporte")}>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 font-bold text-base px-8 py-6 rounded-xl shadow-lg"
            >
              {t("vuelos.transferCta.button")}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
