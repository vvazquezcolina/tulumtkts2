import { useLocation } from "wouter";
import { CrossSell } from "@/components/cross-sell";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/ui/navigation";
import { SEOHead } from "@/components/seo-head";
import { WebsiteSchema } from "@/components/json-ld";
import { BreadcrumbSchema } from "@/components/json-ld";
import { FAQSchema, FAQAccordion } from "@/components/faq-schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Globe, Waves, UtensilsCrossed, Landmark, Bus, Car, Users, CheckCircle, Clock } from "lucide-react";
import { useI18n } from "@/contexts/i18n-context";
import { rivieraMaya as translations } from "@/translations/pages/riviera-maya";
import { useLocalizedLink } from "@/hooks/use-localized-link";

/**
 * Página Hub "Guía de la Riviera Maya" - Gateway de exploración regional
 * Expande la cobertura geográfica más allá de Tulum
 * Objetivo: Posicionarse para búsquedas de "riviera maya" y destinos adyacentes
 */

const destinations = [
  {
    name: "Tulum",
    distanceFromCancun: "130 km",
    description: "Bohemian beach town with Mayan ruins and cenotes",
    highlights: ["Beach ruins", "Cenotes", "Eco-resorts"],
    link: "/",
    image: "https://images.unsplash.com/photo-1574181419028-e8c44c95a6d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Playa del Carmen",
    distanceFromCancun: "68 km",
    description: "Lively coastal city with 5th Avenue and vibrant nightlife",
    highlights: ["5th Avenue", "Nightlife", "Ferry to Cozumel"],
    link: "#",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Cancún",
    distanceFromCancun: "0 km",
    description: "International hub with all-inclusive resorts and nightlife",
    highlights: ["Hotel Zone", "Underwater Museum", "Isla Mujeres"],
    link: "#",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Cozumel",
    distanceFromCancun: "78 km + ferry",
    description: "Island paradise with world-class diving and snorkeling",
    highlights: ["Coral reefs", "Scuba diving", "Beach parks"],
    link: "#",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Akumal",
    distanceFromCancun: "105 km",
    description: "Swim with wild sea turtles in crystal-clear waters",
    highlights: ["Sea turtles", "Half Moon Bay", "Cenotes"],
    link: "#",
    image: "https://images.unsplash.com/photo-1544551763-77ab2f3e7e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Bacalar",
    distanceFromCancun: "350 km",
    description: "The Lagoon of Seven Colors - Mexico's best kept secret",
    highlights: ["Rainbow lagoon", "Kayaking", "Cenotes"],
    link: "#",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
];

const whyVisitIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  ruins: Landmark,
  water: Waves,
  beach: Globe,
  food: UtensilsCrossed,
};

const transportIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "ADO Bus": Bus,
  "Bus ADO": Bus,
  "Colectivo": Users,
  "Car Rental": Car,
  "Renta de Auto": Car,
  "Noleggio Auto": Car,
  "Location de Voiture": Car,
  "Private Transfer": Car,
  "Transfer Privado": Car,
  "Transfert Privé": Car,
  "Transfer Privato": Car,
};

export default function RivieraMaya() {
  const [, setLocation] = useLocation();
  const { locale } = useI18n();
  const { getLocalizedLink } = useLocalizedLink();
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://tulumtkts.com";

  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = translations[locale as keyof typeof translations];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const faqs = t("faqs.items") as Array<{ question: string; answer: string }>;
  const whyFeatures = t("whyVisit.features") as Array<{ icon: string; title: string; description: string }>;
  const transportOptions = t("gettingAround.options") as Array<{ title: string; description: string; detail: string; recommended: boolean }>;
  const itineraryCards = t("itineraries.cards") as Array<{ title: string; days: number; description: string; highlights: string[] }>;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={t("seo.title")}
        description={t("seo.description")}
        keywords={t("seo.keywords").split(", ")}
        canonicalUrl={`${siteUrl}/riviera-maya`}
        ogType="website"
        ogImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630"
        currentPath="/riviera-maya"
      />
      <WebsiteSchema siteUrl={siteUrl} siteName="TulumTkts" />
      <BreadcrumbSchema
        items={[
          { name: t("breadcrumbs.home"), url: "/" },
          { name: t("breadcrumbs.guide"), url: "/riviera-maya" },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600">
            <a href={getLocalizedLink("/")} className="hover:text-primary">
              {t("breadcrumbs.home")}
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{t("breadcrumbs.guide")}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-700 via-cyan-600 to-blue-600 text-white overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800"
            alt="Riviera Maya Caribbean coastline"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              {t("hero.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-6 font-medium">
              {t("hero.subtitle")}
            </p>
            <p className="text-lg text-white/90 mb-10 leading-relaxed max-w-2xl">
              {t("hero.description")}
            </p>
            <div className="flex flex-wrap gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <MapPin className="w-5 h-5" />
                <span>{t("hero.stats.destinations")}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <Waves className="w-5 h-5" />
                <span>{t("hero.stats.km")}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <Globe className="w-5 h-5" />
                <span>{t("hero.stats.guide")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("destinations.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("destinations.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <Card
                key={dest.name}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer border-0 shadow-md"
                onClick={() => dest.link !== "#" && setLocation(getLocalizedLink(dest.link))}
              >
                {/* Destination Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={`${dest.name} - Riviera Maya`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                    <div className="flex items-center gap-1 text-white/80 text-sm mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{t("destinations.distanceFromCancun")}: {dest.distanceFromCancun}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-5">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{dest.description}</p>

                  {/* Highlights */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      {t("destinations.highlights")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dest.highlights.map((h) => (
                        <Badge
                          key={h}
                          variant="secondary"
                          className="text-xs bg-teal-50 text-teal-700 border-teal-100"
                        >
                          {h}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {dest.link !== "#" ? (
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLocation(getLocalizedLink(dest.link));
                      }}
                    >
                      {t("destinations.explore")} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="w-full" disabled>
                      {t("destinations.explore")} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Visit Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("whyVisit.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("whyVisit.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyFeatures.map((feature) => {
              const Icon = whyVisitIcons[feature.icon] || Globe;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center group"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Getting Around Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("gettingAround.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("gettingAround.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transportOptions.map((option) => {
              const Icon = transportIcons[option.title] || Bus;
              return (
                <div
                  key={option.title}
                  className={`relative rounded-2xl p-6 border-2 transition-all ${
                    option.recommended
                      ? "border-teal-400 bg-teal-50 shadow-md"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {option.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-teal-500 text-white text-xs px-3">Recomendado</Badge>
                    </div>
                  )}
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                      option.recommended
                        ? "bg-teal-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{option.description}</p>
                  <p
                    className={`text-sm font-semibold ${
                      option.recommended ? "text-teal-700" : "text-gray-500"
                    }`}
                  >
                    {option.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Quick tip */}
          <div className="mt-10 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
            <p className="text-blue-800 text-sm md:text-base">
              <strong>Tip:</strong>{" "}
              {locale === "es"
                ? "Reserva tu transfer del aeropuerto con anticipación para asegurarte el mejor precio y evitar el caos al llegar a Cancún."
                : locale === "fr"
                ? "Réservez votre transfert de l'aéroport à l'avance pour obtenir le meilleur prix et éviter le chaos à l'arrivée à Cancún."
                : locale === "it"
                ? "Prenota il tuo transfer dall'aeroporto in anticipo per garantirti il miglior prezzo ed evitare il caos all'arrivo a Cancún."
                : "Book your airport transfer in advance to get the best price and avoid chaos when arriving at Cancun."}
            </p>
            <Button
              size="sm"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setLocation(getLocalizedLink("/transporte"))}
            >
              {locale === "es" ? "Ver Opciones de Transporte" : locale === "fr" ? "Voir les Options de Transport" : locale === "it" ? "Vedi Opzioni di Trasporto" : "View Transport Options"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Suggested Itineraries Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("itineraries.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("itineraries.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {itineraryCards.map((itinerary, index) => {
              const gradients = [
                "from-teal-500 to-cyan-500",
                "from-cyan-500 to-blue-500",
                "from-blue-600 to-teal-600",
              ];
              return (
                <div
                  key={itinerary.title}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${gradients[index]} p-6 text-white`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-white/80" />
                      <span className="text-white/80 text-sm font-medium">
                        {itinerary.days} {t("itineraries.days")}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{itinerary.title}</h3>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">
                      {itinerary.description}
                    </p>

                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        {t("itineraries.highlights")}
                      </p>
                      <ul className="space-y-2">
                        {itinerary.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("faqs.title")}
            </h2>
            <p className="text-lg text-gray-600">{t("faqs.subtitle")}</p>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-700 via-cyan-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600"
            alt="Cancun Riviera Maya"
            className="w-full h-full object-cover opacity-15"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("cta.title")}</h2>
          <p className="text-xl text-white/90 mb-10">{t("cta.description")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-teal-700 hover:bg-white/90 font-semibold"
              onClick={() => setLocation(getLocalizedLink("/experiencias"))}
            >
              {t("cta.bookTours")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10"
              onClick={() => setLocation(getLocalizedLink("/hoteles"))}
            >
              {t("cta.searchHotels")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <CrossSell exclude={[]} />

      <Footer />
    </div>
  );
}
