import { Footer } from "@/components/footer";
import { CrossSell } from "@/components/cross-sell";
import { Navigation } from "@/components/ui/navigation";
import { SEOHead } from "@/components/seo-head";
import { WebsiteSchema } from "@/components/json-ld";
import { FAQSchema, FAQAccordion } from "@/components/faq-schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Anchor,
  Droplets,
  Eye,
  Fish,
  MapPin,
  Moon,
  Shield,
  Star,
  Waves,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useI18n } from "@/contexts/i18n-context";
import { useLocalizedLink } from "@/hooks/use-localized-link";
import { generateAffiliateLink, trackAffiliateClick } from "@/lib/affiliate";

/**
 * Página de Destino: Buceo y Snorkel en Tulum
 * Keyword: "buceo tulum" / "snorkel tulum" — alto booking intent
 * Objetivo: Capturar tráfico SEO de viajeros buscando experiencias acuáticas en Tulum
 */

const diveSites = [
  {
    name: "Great Mesoamerican Reef",
    depth: "5-30m",
    level: "All levels",
    type: "Ocean",
    highlights: ["World's 2nd largest reef", "Tropical fish", "Coral gardens"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Cenote Dos Ojos",
    depth: "8-10m",
    level: "Intermediate",
    type: "Cenote",
    highlights: ["Crystal visibility", "Stalactites", "Bat cave"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Gran Cenote",
    depth: "3-15m",
    level: "Beginners",
    type: "Cenote",
    highlights: ["Easy access", "Turtles", "Snorkeling friendly"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Cenote Angelita",
    depth: "30-60m",
    level: "Advanced",
    type: "Cenote",
    highlights: ["Hydrogen sulfide cloud", "Underwater river illusion", "Deep dive"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Akumal Bay",
    depth: "2-8m",
    level: "Beginners",
    type: "Ocean",
    highlights: ["Sea turtles", "Shallow water", "Family friendly"],
    image: "https://images.unsplash.com/photo-1544551763-77ab2f3e7e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Cenote Pit",
    depth: "40-120m",
    level: "Expert",
    type: "Cenote",
    highlights: ["Light beams", "Halocline", "Cathedral-like cavern"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
];

const levelColors: Record<string, string> = {
  "All levels": "bg-green-100 text-green-800",
  Beginners: "bg-green-100 text-green-800",
  Intermediate: "bg-yellow-100 text-yellow-800",
  Advanced: "bg-orange-100 text-orange-800",
  Expert: "bg-red-100 text-red-800",
};

const typeColors: Record<string, string> = {
  Ocean: "bg-blue-100 text-blue-800",
  Cenote: "bg-cyan-100 text-cyan-800",
};

const experienceTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  waves: Waves,
  anchor: Anchor,
  droplet: Droplets,
  moon: Moon,
};

export default function BuceoTulum() {
  const { t } = useI18n();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ta = (key: string): any => t(key) as unknown as any;
  const { getLocalizedLink } = useLocalizedLink();
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://tulumtkts.com";

  const faqs = ta("buceo.faq.items") as Array<{ question: string; answer: string }>;

  const experienceTypes = [
    ta("buceo.types.snorkeling"),
    ta("buceo.types.openWater"),
    ta("buceo.types.cenoteDiving"),
    ta("buceo.types.nightDiving"),
  ] as Array<{ title: string; description: string; badge: string; price: string; icon: string }>;

  const courses = ta("buceo.certifications.courses") as Array<{
    name: string;
    duration: string;
    price: string;
    description: string;
  }>;

  const seasonMonths = ta("buceo.season.months") as Array<{
    period: string;
    title: string;
    description: string;
    rating: number;
    badge: string;
  }>;

  const openViatorDiving = () => {
    const url = generateAffiliateLink(
      ta("buceo.cta.viatorUrl") as string,
      "viator",
      "buceo_main_cta"
    );
    trackAffiliateClick("viator", "Diving & Snorkeling Tulum", "0", "buceo_cta");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gray-50 page-enter">
      <SEOHead
        title={t("buceo.seo.title") as string}
        description={t("buceo.seo.description") as string}
        keywords={[
          "buceo tulum",
          "snorkel tulum",
          "diving tulum",
          "snorkeling tulum",
          "buceo cenotes tulum",
          "tulum diving tours",
          "tulum snorkeling tours",
          "padi tulum",
          "arrecife tulum",
          "cenote diving tulum",
          "great mesoamerican reef tulum",
          "night diving tulum",
          "dive sites tulum",
          "tulum underwater",
          "buceo riviera maya",
        ]}
        canonicalUrl={`${siteUrl}/buceo-tulum`}
        ogType="website"
        ogImage="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630"
        currentPath="/buceo-tulum"
      />
      <WebsiteSchema siteUrl={siteUrl} siteName="TulumTkts" />
      <FAQSchema faqs={faqs} />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600">
            <a href={getLocalizedLink("/")} className="hover:text-primary">
              {t("buceo.breadcrumbs.home")}
            </a>
            <span className="mx-2">/</span>
            <a href={getLocalizedLink("/tulum-guia-completa")} className="hover:text-primary">
              {t("buceo.breadcrumbs.guide")}
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{t("buceo.breadcrumbs.current")}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-cyan-800 to-teal-800 text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400')",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              {t("buceo.hero.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t("buceo.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {t("buceo.hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Fish className="w-5 h-5 text-cyan-300" />
                <span>{t("buceo.stats.sites")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-cyan-300" />
                <span>{t("buceo.stats.visibility")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-cyan-300" />
                <span>{t("buceo.stats.season")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dive Sites Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("buceo.sections.diveSites.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("buceo.sections.diveSites.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {diveSites.map((site, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={site.image}
                    alt={`${site.name} diving Tulum`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <Badge className={`border-0 text-xs ${typeColors[site.type] || "bg-blue-100 text-blue-800"}`}>
                      {site.type}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className={`border-0 text-xs ${levelColors[site.level] || "bg-gray-100 text-gray-800"}`}>
                      {site.level}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{site.name}</h3>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Waves className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                      <span>
                        <span className="font-medium text-gray-700">{t("buceo.labels.depth")}:</span>{" "}
                        {site.depth}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                      <span>
                        <span className="font-medium text-gray-700">{t("buceo.labels.level")}:</span>{" "}
                        {site.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                      <span>
                        <span className="font-medium text-gray-700">{t("buceo.labels.type")}:</span>{" "}
                        {site.type}
                      </span>
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      {t("buceo.labels.highlights")}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {site.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-xs bg-cyan-50 text-cyan-700 border border-cyan-100 rounded-full px-2 py-0.5"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      const url = generateAffiliateLink(
                        `https://www.viator.com/Tulum/d4254-ttd?q=diving+${encodeURIComponent(site.name)}`,
                        "viator",
                        `buceo_site_${index}`
                      );
                      trackAffiliateClick("viator", site.name, "0", "buceo_site");
                      window.open(url, "_blank", "noopener,noreferrer");
                    }}
                    className="w-full bg-cyan-700 text-white hover:bg-cyan-800"
                  >
                    {t("buceo.labels.bookDive")} <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Types Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("buceo.sections.types.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("buceo.sections.types.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experienceTypes.map((exp, index) => {
              const Icon = experienceTypeIcons[exp.icon] || Waves;
              const gradients = [
                "from-blue-500 to-cyan-500",
                "from-cyan-600 to-teal-600",
                "from-teal-500 to-emerald-500",
                "from-indigo-600 to-blue-700",
              ];
              return (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-2xl p-6 text-white"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]}`} />
                  <div className="relative">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold">{exp.title}</h3>
                          <span className="text-xs bg-white/20 rounded-full px-2 py-0.5 font-medium">
                            {exp.badge}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-white/80">{exp.price}</p>
                      </div>
                    </div>
                    <p className="text-white/90 leading-relaxed text-sm">{exp.description}</p>
                    <Button
                      onClick={openViatorDiving}
                      className="mt-4 bg-white/20 hover:bg-white/30 text-white border border-white/30"
                      size="sm"
                    >
                      {t("buceo.labels.bookDive")} <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("buceo.sections.certifications.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("buceo.sections.certifications.subtitle")}
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-10">
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              {t("buceo.certifications.intro")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-blue-100 text-blue-800 border-0 text-xs">
                    {course.duration}
                  </Badge>
                  <span className="text-sm font-bold text-cyan-700">{course.price}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{course.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{course.description}</p>
                <Button
                  onClick={openViatorDiving}
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full border-cyan-200 text-cyan-700 hover:bg-cyan-50"
                >
                  {t("buceo.labels.bookDive")} <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment & Tips Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("buceo.sections.tips.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("buceo.sections.tips.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* What to bring */}
            <div className="bg-cyan-50 rounded-2xl p-6 border border-cyan-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center">
                  <Waves className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {ta("buceo.tips.bring").title}
                </h3>
              </div>
              <ul className="space-y-2">
                {(ta("buceo.tips.bring").items as string[]).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* What's provided */}
            <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {ta("buceo.tips.provided").title}
                </h3>
              </div>
              <ul className="space-y-2">
                {(ta("buceo.tips.provided").items as string[]).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Warnings */}
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {ta("buceo.tips.warnings").title}
                </h3>
              </div>
              <ul className="space-y-2">
                {(ta("buceo.tips.warnings").items as string[]).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Best Season Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("buceo.sections.season.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("buceo.sections.season.subtitle")}
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-10">
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              {t("buceo.season.intro")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {seasonMonths.map((month, index) => {
              const ratingColors = ["border-green-200 bg-green-50", "border-yellow-200 bg-yellow-50", "border-orange-200 bg-orange-50"];
              const badgeColors = ["bg-green-100 text-green-800", "bg-yellow-100 text-yellow-800", "bg-orange-100 text-orange-800"];
              return (
                <div
                  key={index}
                  className={`rounded-2xl p-6 border-2 ${ratingColors[index % ratingColors.length]}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-gray-700 bg-white rounded-full px-3 py-1 border">
                      {month.period}
                    </span>
                    <Badge className={`border-0 text-xs ${badgeColors[index % badgeColors.length]}`}>
                      {month.badge}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{month.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{month.description}</p>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < month.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
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
              {t("buceo.sections.faq.title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("buceo.sections.faq.subtitle")}
            </p>
          </div>
          <FAQAccordion faqs={faqs} className="bg-gray-50 rounded-lg shadow-md p-6" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-cyan-800 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Anchor className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("buceo.cta.title")}
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            {t("buceo.cta.description")}
          </p>
          <Button
            size="lg"
            onClick={openViatorDiving}
            className="bg-white text-blue-900 hover:bg-white/90 font-semibold text-lg px-8 py-4"
          >
            {t("buceo.cta.button")} <ExternalLink className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-sm text-white/60 mt-4">
            Powered by Viator — {t("buceo.stats.sites")} · {t("buceo.stats.visibility")}
          </p>
        </div>
      </section>

      <CrossSell
        exclude={["experiencias"]}
        title={t("buceo.labels.crossSellTitle") as string}
      />
      <Footer />
    </div>
  );
}
