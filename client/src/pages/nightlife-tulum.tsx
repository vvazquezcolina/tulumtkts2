import { Footer } from "@/components/footer";
import { CrossSell } from "@/components/cross-sell";
import { Navigation } from "@/components/ui/navigation";
import { SEOHead } from "@/components/seo-head";
import { WebsiteSchema } from "@/components/json-ld";
import { FAQSchema, FAQAccordion } from "@/components/faq-schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, Clock, DollarSign, MapPin, Star, Sunset, Zap, Users, ArrowRight } from "lucide-react";
import { useI18n } from "@/contexts/i18n-context";
import { useLocalizedLink } from "@/hooks/use-localized-link";

/**
 * Página de Destino: Vida Nocturna & Beach Clubs en Tulum
 * Keyword: "beach clubs tulum" / "nightlife tulum" - alto volumen de búsqueda
 * Objetivo: Capturar tráfico SEO de viajeros buscando vida nocturna en Tulum
 */

const beachClubs = [
  {
    name: "Papaya Playa Project",
    description: "Iconic beach club with full moon parties and live music",
    priceRange: "$$$",
    hours: "10:00 - 2:00 AM",
    vibe: "Bohemian Luxury",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Vagalume",
    description: "Electronic music venue with stunning beachfront setting",
    priceRange: "$$$",
    hours: "11:00 - 3:00 AM",
    vibe: "Electronic & Dance",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Tantra Beach Club",
    description: "Relaxed daytime vibes with gourmet Mexican cuisine",
    priceRange: "$$",
    hours: "10:00 - 12:00 AM",
    vibe: "Chill & Foodie",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Casa Malca",
    description: "Art-filled mansion turned into a luxury beach club",
    priceRange: "$$$$",
    hours: "10:00 - 11:00 PM",
    vibe: "Art & Luxury",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Bagatelle",
    description: "Mediterranean beach club with champagne brunch",
    priceRange: "$$$$",
    hours: "12:00 - 2:00 AM",
    vibe: "Upscale Party",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Mia Beach Club",
    description: "Local favorite with affordable prices and great music",
    priceRange: "$$",
    hours: "10:00 - 12:00 AM",
    vibe: "Local & Fun",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
];

const faqs = [
  {
    question: "What are the best beach clubs in Tulum?",
    answer: "Papaya Playa Project, Vagalume, and Casa Malca are consistently rated as the top beach clubs. Each offers a unique atmosphere from bohemian to ultra-luxury.",
  },
  {
    question: "Do I need reservations for beach clubs?",
    answer: "During high season (December-April), reservations are highly recommended, especially for weekends. Most beach clubs accept walk-ins during low season.",
  },
  {
    question: "What is the typical minimum spend at Tulum beach clubs?",
    answer: "Most beach clubs have a minimum spend of $50-100 USD per person, which can be applied toward food and drinks. Some premium venues may require $150+ during special events.",
  },
  {
    question: "Is Tulum safe for nightlife?",
    answer: "Tulum is generally safe for tourists enjoying nightlife. Stick to well-known venues, travel in groups, and use trusted transportation to get back to your hotel.",
  },
  {
    question: "When is the best time for nightlife in Tulum?",
    answer: "The peak nightlife season runs from December through April. Full moon parties at Papaya Playa Project happen monthly and are legendary. Weekends year-round are lively.",
  },
];

const nightlifeZones = [
  {
    icon: Sunset,
    name: "Hotel Zone",
    description: "The main strip of beach clubs and luxury venues. Most prestigious addresses, stunning ocean views, and the highest concentration of nightlife options.",
    highlight: "Beach clubs & luxury",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Users,
    name: "Pueblo (Town)",
    description: "The local heart of Tulum with rooftop bars, mezcal cantinas, and vibrant street life. More affordable and authentically Mexican.",
    highlight: "Bars & local scene",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Music,
    name: "Beach Road",
    description: "The scenic coastal road connecting jungle eco-lodges with beachfront clubs. Perfect for those who want a mix of nature and nightlife.",
    highlight: "Eco-chic & music",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Zap,
    name: "Special Events",
    description: "Tulum hosts world-class festivals like Zamna, BPM Festival, and full moon parties. Check the event calendar before you book your trip.",
    highlight: "Festivals & full moon",
    color: "from-amber-500 to-orange-500",
  },
];

const tips = [
  {
    icon: Clock,
    title: "Arrive Early for Sunsets",
    description: "The best sunset views at beach clubs are from 5-7 PM. Arrive by 4 PM on weekends to secure a prime spot without a reservation.",
  },
  {
    icon: DollarSign,
    title: "Cash & Cards",
    description: "Many beach clubs accept cards but may add a surcharge. Bring a mix of USD and Mexican pesos. ATMs can be scarce near the beach road.",
  },
  {
    icon: MapPin,
    title: "Plan Your Transport",
    description: "Taxis and ride-shares are scarce late at night. Arrange return transport before going out, or stay at a hotel within walking distance.",
  },
  {
    icon: Star,
    title: "Dress Code Matters",
    description: "Upscale venues like Bagatelle and Casa Malca enforce a smart-casual or chic dress code. Flip-flops and swimwear alone won't get you in.",
  },
];

export default function NightlifeTulum() {
  const { t } = useI18n();
  const { getLocalizedLink } = useLocalizedLink();
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://tulumtkts.com";

  return (
    <div className="min-h-screen bg-gray-50 page-enter">
      <SEOHead
        title={t("nightlife.seo.title")}
        description={t("nightlife.seo.description")}
        keywords={[
          "beach clubs tulum",
          "nightlife tulum",
          "tulum beach clubs",
          "best beach clubs tulum",
          "tulum nightlife 2026",
          "papaya playa project tulum",
          "vagalume tulum",
          "tulum clubs",
          "beach party tulum",
          "full moon party tulum",
          "tulum bars",
          "tulum party scene",
          "best nightlife tulum",
          "tulum dance clubs",
          "tulum electronic music",
        ]}
        canonicalUrl={`${siteUrl}/nightlife-tulum`}
        ogType="website"
        ogImage="https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630"
        currentPath="/nightlife-tulum"
      />
      <WebsiteSchema siteUrl={siteUrl} siteName="TulumTkts" />
      <FAQSchema faqs={faqs} />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600">
            <a href={getLocalizedLink("/")} className="hover:text-primary">
              {t("nightlife.breadcrumbs.home")}
            </a>
            <span className="mx-2">/</span>
            <a href={getLocalizedLink("/tulum-guia-completa")} className="hover:text-primary">
              {t("nightlife.breadcrumbs.guide")}
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{t("nightlife.breadcrumbs.current")}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-black text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              {t("nightlife.hero.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t("nightlife.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {t("nightlife.hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-purple-300" />
                <span>6+ Beach Clubs</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-300" />
                <span>World-class DJs</span>
              </div>
              <div className="flex items-center gap-2">
                <Sunset className="w-5 h-5 text-purple-300" />
                <span>Epic Sunsets</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beach Clubs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("nightlife.sections.beachClubs.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("nightlife.sections.beachClubs.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beachClubs.map((club, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={club.image}
                    alt={`${club.name} beach club Tulum`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-purple-600/90 text-white border-0 text-xs">
                      {club.vibe}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/60 text-white text-sm font-bold px-2 py-1 rounded">
                      {club.priceRange}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{club.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{club.description}</p>
                  <div className="space-y-2 text-sm text-gray-500 mb-5">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-500" />
                      <span>
                        <span className="font-medium text-gray-700">{t("nightlife.ui.hours")}:</span> {club.hours}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-purple-500" />
                      <span>
                        <span className="font-medium text-gray-700">{t("nightlife.ui.priceRange")}:</span> {club.priceRange}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-purple-500" />
                      <span>
                        <span className="font-medium text-gray-700">{t("nightlife.ui.vibe")}:</span> {club.vibe}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => window.open("https://www.viator.com/Tulum/d4254-ttd?q=beach+club+tulum", "_blank", "noopener,noreferrer")}
                    className="w-full bg-purple-700 text-white hover:bg-purple-800"
                  >
                    {t("nightlife.ui.visit")} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nightlife Zones Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("nightlife.sections.nightlifeZones.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("nightlife.sections.nightlifeZones.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nightlifeZones.map((zone, index) => {
              const Icon = zone.icon;
              return (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-2xl p-6 text-white"
                  style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${zone.color} opacity-90`} />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{zone.name}</h3>
                        <span className="text-xs text-white/80 font-medium">{zone.highlight}</span>
                      </div>
                    </div>
                    <p className="text-white/90 leading-relaxed text-sm">{zone.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("nightlife.sections.tips.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("nightlife.sections.tips.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-purple-700" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("nightlife.sections.faq.title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("nightlife.sections.faq.subtitle")}
            </p>
          </div>

          <FAQAccordion faqs={faqs} className="bg-gray-50 rounded-lg shadow-md p-6" />
        </div>
      </section>

      <CrossSell exclude={["experiencias"]} title={t("nightlife.ui.crossSellTitle")} />
      <Footer />
    </div>
  );
}
