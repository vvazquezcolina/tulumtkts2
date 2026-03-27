import { useLocation } from "wouter";
import { Footer } from "@/components/footer";
import { CrossSell } from "@/components/cross-sell";
import { Navigation } from "@/components/ui/navigation";
import { SEOHead } from "@/components/seo-head";
import { WebsiteSchema } from "@/components/json-ld";
import { BreadcrumbSchema } from "@/components/json-ld";
import { FAQSchema, FAQAccordion } from "@/components/faq-schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, ArrowRight, ExternalLink, Navigation2, Car } from "lucide-react";
import { useI18n } from "@/contexts/i18n-context";
import { excursionesTulum as translations } from "@/translations/pages/excursiones-tulum";
import { generateCarRentalLink, generateAffiliateLink, trackAffiliateClick } from "@/lib/affiliate";
import { useLocalizedLink } from "@/hooks/use-localized-link";

/**
 * Página de Destino: Excursiones desde Tulum (Day Trips)
 * Keyword: "excursiones desde tulum" / "day trips from tulum"
 * Objetivo: Capturar tráfico de alta intención para tours y excursiones
 */

const dayTrips = [
  {
    name: "Cobá Ruins",
    distance: "47 km",
    time: "45 min",
    price: "From $35 USD",
    description: "Climb the tallest Mayan pyramid in the Yucatan peninsula",
    highlights: ["Nohoch Mul pyramid", "Bike through jungle", "Less crowded than Chichén Itzá"],
    image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    viatorQuery: "coba+ruins+tour"
  },
  {
    name: "Sian Ka'an Biosphere",
    distance: "20 km",
    time: "30 min",
    price: "From $80 USD",
    description: "UNESCO World Heritage site with pristine nature and wildlife",
    highlights: ["Floating canals", "Dolphins & manatees", "Ancient Mayan canals"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    viatorQuery: "sian+kaan+tour"
  },
  {
    name: "Playa del Carmen",
    distance: "63 km",
    time: "1 hour",
    price: "Bus $5 USD",
    description: "Vibrant beach town with 5th Avenue shopping and nightlife",
    highlights: ["5th Avenue shopping", "Ferry to Cozumel", "Beach clubs"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    viatorQuery: "playa+del+carmen+tour"
  },
  {
    name: "Cozumel Island",
    distance: "110 km",
    time: "2.5 hours",
    price: "From $60 USD",
    description: "World-class snorkeling and diving in crystal-clear Caribbean waters",
    highlights: ["Coral reefs", "Snorkeling paradise", "Jeep tours"],
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    viatorQuery: "cozumel+snorkeling+tour"
  },
  {
    name: "Chichén Itzá",
    distance: "200 km",
    time: "2.5 hours",
    price: "From $50 USD",
    description: "One of the New Seven Wonders of the World",
    highlights: ["El Castillo pyramid", "Ball court", "Cenote Sagrado"],
    image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    viatorQuery: "chichen+itza+tour+from+tulum"
  },
  {
    name: "Bacalar Lagoon",
    distance: "220 km",
    time: "2.5 hours",
    price: "From $70 USD",
    description: "The Lagoon of Seven Colors with stunning turquoise waters",
    highlights: ["Kayaking", "Cenote Azul", "Pirates canal"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    viatorQuery: "bacalar+lagoon+tour"
  },
  {
    name: "Akumal Beach",
    distance: "25 km",
    time: "25 min",
    price: "Free (gear rental $15)",
    description: "Swim with wild sea turtles in their natural habitat",
    highlights: ["Sea turtle snorkeling", "Half Moon Bay", "Yal-Ku lagoon"],
    image: "https://images.unsplash.com/photo-1544551763-77ab2f3e7e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    viatorQuery: "akumal+sea+turtles+snorkel"
  },
  {
    name: "Valladolid",
    distance: "160 km",
    time: "2 hours",
    price: "Bus $12 USD",
    description: "Charming colonial city with cenotes and authentic Yucatecan culture",
    highlights: ["Cenote Zací", "Colonial architecture", "Yucatecan cuisine"],
    image: "https://images.unsplash.com/photo-1570737209810-87a8e7245779?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    viatorQuery: "valladolid+day+trip+tulum"
  },
];

// Color coding by distance
function getDistanceBadgeColor(distance: string) {
  const km = parseInt(distance);
  if (km <= 50) return "bg-emerald-100 text-emerald-800";
  if (km <= 120) return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
}

export default function ExcursionesTulum() {
  const [, setLocation] = useLocation();
  const { locale } = useI18n();
  const { getLocalizedLink } = useLocalizedLink();
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[locale as keyof typeof translations];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const faqs = t('faqs.items') as Array<{ question: string; answer: string }>;
  const tips = t('tips.items') as Array<{ icon: string; title: string; description: string }>;

  const tipIcons = {
    clock: <Clock className="w-6 h-6 text-emerald-600" />,
    car: <Car className="w-6 h-6 text-emerald-600" />,
    tour: <Star className="w-6 h-6 text-emerald-600" />,
    water: <MapPin className="w-6 h-6 text-emerald-600" />,
  };

  return (
    <div className="min-h-screen bg-gray-50 page-enter">
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords') as unknown as string[]}
        canonicalUrl={`${siteUrl}/excursiones-tulum`}
        ogType="website"
        ogImage="https://images.unsplash.com/photo-1518638150340-f706e86654de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630"
        currentPath="/excursiones-tulum"
      />
      <WebsiteSchema siteUrl={siteUrl} siteName="TulumTkts" />
      <BreadcrumbSchema items={[
        { name: t('breadcrumbs.home'), url: "/" },
        { name: t('breadcrumbs.guide'), url: "/tulum-guia-completa" },
        { name: t('breadcrumbs.excursiones'), url: "/excursiones-tulum" }
      ]} />
      <FAQSchema faqs={faqs} />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600">
            <a href={getLocalizedLink("/")} className="hover:text-primary">{t('breadcrumbs.home')}</a>
            <span className="mx-2">/</span>
            <a href={getLocalizedLink("/tulum-guia-completa")} className="hover:text-primary">{t('breadcrumbs.guide')}</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{t('breadcrumbs.excursiones')}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-800 to-teal-900 text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518638150340-f706e86654de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900')" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              {t('hero.badge')}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{t('hero.stats.destinations')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{t('hero.stats.maxTime')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>{t('hero.stats.guide')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('intro.title')}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('intro.paragraph1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('intro.paragraph2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('intro.paragraph3')}
            </p>
          </div>
        </div>
      </section>

      {/* Day Trips Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('trips.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('trips.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dayTrips.map((trip, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={trip.image}
                    alt={`${trip.name} day trip from Tulum`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={`text-xs font-semibold ${getDistanceBadgeColor(trip.distance)}`}>
                      {trip.distance}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {trip.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 leading-snug">
                    {trip.description}
                  </p>

                  <div className="space-y-1.5 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-2">
                      <Navigation2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{t('trips.distance')}: <span className="font-medium text-gray-700">{trip.distance}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{t('trips.travelTime')}: <span className="font-medium text-gray-700">{trip.time}</span></span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-emerald-700">
                      <span>{t('trips.price')}: {trip.price}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                      {t('trips.highlights')}
                    </p>
                    <ul className="space-y-1">
                      {trip.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                          <span className="text-emerald-500 mt-0.5">✓</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    size="sm"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white"
                    onClick={() => {
                      const url = generateAffiliateLink(
                        `https://www.viator.com/Tulum/d4254-ttd?q=${trip.viatorQuery}`,
                        'viator',
                        `excursiones_card_${trip.name.toLowerCase().replace(/\s+/g, '_')}`
                      );
                      trackAffiliateClick('viator', trip.name, trip.price, 'excursiones');
                      window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    {t('trips.bookTour')} <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Legend / Distance Reference Table */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t('mapLegend.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('mapLegend.subtitle')}
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="text-gray-600">{t('mapLegend.nearbyLabel')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="text-gray-600">{t('mapLegend.mediumLabel')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
              <span className="text-gray-600">{t('mapLegend.farLabel')}</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-emerald-800 text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">{t('mapLegend.destination')}</th>
                  <th className="text-left px-4 py-3 font-semibold">{t('mapLegend.distance')}</th>
                  <th className="text-left px-4 py-3 font-semibold">{t('mapLegend.travelTime')}</th>
                  <th className="text-left px-4 py-3 font-semibold">{t('mapLegend.priceRange')}</th>
                </tr>
              </thead>
              <tbody>
                {dayTrips.map((trip, index) => {
                  const km = parseInt(trip.distance);
                  const dotColor = km <= 50 ? "bg-emerald-500" : km <= 120 ? "bg-amber-500" : "bg-red-500";
                  return (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dotColor}`} />
                          <span className="font-medium text-gray-900">{trip.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{trip.distance}</td>
                      <td className="px-4 py-3 text-gray-600">{trip.time}</td>
                      <td className="px-4 py-3 text-emerald-700 font-medium">{trip.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Viator CTA Banner */}
      <section className="py-14 bg-gradient-to-br from-emerald-50 to-teal-50 border-t border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <Badge className="mb-3 bg-emerald-100 text-emerald-800 border-0">Tours Guiados</Badge>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('cta.viator.title')}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {t('cta.viator.description')}
                </p>
                <ul className="mt-3 space-y-1 text-sm text-gray-500">
                  <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> {t('cta.viator.feature1')}</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> {t('cta.viator.feature2')}</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> {t('cta.viator.feature3')}</li>
                </ul>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px]">
                <Button
                  size="lg"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
                  onClick={() => {
                    const url = generateAffiliateLink(
                      'https://www.viator.com/Tulum/d4254-ttd?q=day+trip',
                      'viator',
                      'excursiones_main_cta'
                    );
                    trackAffiliateClick('viator', 'Day Trips from Tulum', '0', 'excursiones_cta');
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                >
                  {t('cta.viator.button')} <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-xs text-gray-400 text-center">{t('cta.viator.caption')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('tips.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('tips.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <div key={index} className="flex gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  {tipIcons[tip.icon as keyof typeof tipIcons] || <Star className="w-6 h-6 text-emerald-600" />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{tip.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Car Rental CTA */}
          <div className="mt-10 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6 border border-teal-100">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🚗</span>
                  <h3 className="font-bold text-gray-900">{t('cta.carRental.title')}</h3>
                </div>
                <p className="text-sm text-gray-600">{t('cta.carRental.description')}</p>
              </div>
              <div className="flex flex-col gap-2 min-w-[180px]">
                <Button
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={() => {
                    trackAffiliateClick('discovercars', 'Renta auto excursiones Tulum', '0', 'excursiones_car_cta');
                    window.open(generateCarRentalLink('Tulum'), '_blank', 'noopener,noreferrer');
                  }}
                >
                  {t('cta.carRental.button')} <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-xs text-gray-400 text-center">{t('cta.carRental.caption')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('faqs.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('faqs.subtitle')}
            </p>
          </div>

          <FAQAccordion faqs={faqs} className="bg-white rounded-lg shadow-md p-6" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-800 to-teal-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => {
                const url = generateAffiliateLink(
                  'https://www.viator.com/Tulum/d4254-ttd',
                  'viator',
                  'excursiones_footer_cta'
                );
                trackAffiliateClick('viator', 'All Tours Tulum', '0', 'excursiones_footer');
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
              className="bg-white text-emerald-800 hover:bg-white/90 font-semibold"
            >
              {t('cta.viewTours')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setLocation('/tulum-guia-completa')}
              className="bg-transparent text-white border-white hover:bg-white/10"
            >
              {t('cta.viewGuide')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <CrossSell exclude={["experiencias"]} />
      <Footer />
    </div>
  );
}
