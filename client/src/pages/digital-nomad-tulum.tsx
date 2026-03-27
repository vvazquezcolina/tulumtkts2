import { Navigation } from "@/components/ui/navigation";
import { SEOHead } from "@/components/seo-head";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CrossSell } from "@/components/cross-sell";
import { FAQSchema, FAQAccordion } from "@/components/faq-schema";
import { useI18n } from "@/contexts/i18n-context";
import {
  generateHotelLink,
  generateCarRentalLink,
  generateAffiliateLink,
  trackAffiliateClick,
} from "@/lib/affiliate";
import {
  Wifi,
  MapPin,
  Star,
  Coffee,
  Monitor,
  Users,
  Shield,
  Smartphone,
  Globe,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Home,
  Car,
  Utensils,
  Zap,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const coworkingSpaces = [
  {
    name: "Digital Jungle",
    price: "$200/month",
    wifi: "100 Mbps",
    amenities: ["AC", "Standing desks", "Meeting rooms", "Coffee bar"],
    rating: 4.7,
  },
  {
    name: "Aldea Cowork",
    price: "$150/month",
    wifi: "80 Mbps",
    amenities: ["Pool access", "Garden", "Cafe", "Events"],
    rating: 4.5,
  },
  {
    name: "NomadX Tulum",
    price: "$250/month",
    wifi: "150 Mbps",
    amenities: ["24/7 access", "Phone booths", "Lounge", "Rooftop"],
    rating: 4.8,
  },
  {
    name: "Selina Tulum",
    price: "$180/month",
    wifi: "60 Mbps",
    amenities: ["Pool", "Restaurant", "Yoga", "Community"],
    rating: 4.3,
  },
];

const budgetRows = [
  {
    category: "Accommodation",
    icon: Home,
    budget: "$800",
    mid: "$1,200",
    premium: "$2,000+",
    affiliateType: "hotels" as const,
  },
  {
    category: "Coworking",
    icon: Monitor,
    budget: "$0 (cafes)",
    mid: "$150",
    premium: "$300",
    affiliateType: "other" as const,
  },
  {
    category: "Food & Groceries",
    icon: Utensils,
    budget: "$400",
    mid: "$600",
    premium: "$800+",
    affiliateType: "other" as const,
  },
  {
    category: "Transport",
    icon: Car,
    budget: "$100",
    mid: "$150",
    premium: "$250",
    affiliateType: "transport" as const,
  },
  {
    category: "Internet/eSIM",
    icon: Wifi,
    budget: "$30",
    mid: "$40",
    premium: "$50",
    affiliateType: "esim" as const,
  },
  {
    category: "Entertainment",
    icon: Star,
    budget: "$200",
    mid: "$350",
    premium: "$500+",
    affiliateType: "other" as const,
  },
];

const neighborhoods = [
  {
    name: "Tulum Pueblo",
    icon: Coffee,
    highlight: "Best value",
    color: "bg-teal-50 border-teal-200",
    badgeColor: "bg-teal-100 text-teal-800",
    description:
      "The authentic downtown area with local restaurants, markets, and a growing coworking scene. 10 minutes from the beach by bike. Most affordable rents and the best food.",
    monthlyRent: "$800–1,200",
    vibe: "Authentic, affordable, community-driven",
  },
  {
    name: "Zona Hotelera",
    icon: Globe,
    highlight: "Beach vibes",
    color: "bg-cyan-50 border-cyan-200",
    badgeColor: "bg-cyan-100 text-cyan-800",
    description:
      "The iconic beach strip with stunning cenotes, eco-hotels, and the famous Tulum Road. Remote-work from a beachfront café. Premium prices but unbeatable lifestyle.",
    monthlyRent: "$1,500–3,000",
    vibe: "Premium, Instagram-worthy, nature-immersed",
  },
  {
    name: "La Veleta",
    icon: Zap,
    highlight: "Nomad hub",
    color: "bg-emerald-50 border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-800",
    description:
      "A fast-growing residential neighborhood between the Pueblo and the jungle. Popular with long-term nomads for its mix of modern apartments, co-living spaces, and community.",
    monthlyRent: "$900–1,600",
    vibe: "Modern, social, up-and-coming",
  },
  {
    name: "Aldea Zama",
    icon: Shield,
    highlight: "Family-friendly",
    color: "bg-purple-50 border-purple-200",
    badgeColor: "bg-purple-100 text-purple-800",
    description:
      "A planned residential community with paved roads, gyms, supermarkets, and solid infrastructure. Great for nomads who want comfort and reliability over bohemian vibes.",
    monthlyRent: "$1,200–2,500",
    vibe: "Comfortable, safe, well-serviced",
  },
];

const connectivityTips = [
  {
    icon: Wifi,
    title: "WiFi reliability",
    description:
      "Internet in Tulum has improved dramatically. Most coworking spaces and hotels offer 50–150 Mbps. Backup with a local SIM (Telcel/AT&T) or eSIM for those jungle café moments when the power flickers.",
  },
  {
    icon: Smartphone,
    title: "Best eSIM for Mexico",
    description:
      "Airalo, Holafly, and BNESIM all offer Mexico data plans. A monthly 10 GB plan costs ~$30–40. Activate your eSIM before landing so you're connected the moment you clear customs.",
  },
  {
    icon: Zap,
    title: "Power outages",
    description:
      "Brief outages happen, especially during rainy season (May–October). Serious nomads carry a compact UPS or power bank. Most co-working spaces have generator backup.",
  },
];

const visaInfo = [
  {
    title: "Tourist Card (FMM) — up to 180 days",
    description:
      "Mexico grants most nationalities a free tourist card valid for up to 180 days. This is what the vast majority of digital nomads use. You declare it at immigration on arrival.",
    icon: CheckCircle,
    color: "text-teal-600",
  },
  {
    title: "Digital Nomad Visa (Temporal Residency)",
    description:
      "Mexico doesn't have a dedicated 'digital nomad visa', but the Residente Temporal visa works. You need proof of remote income (~$2,600 USD/month) and apply at a Mexican consulate before arrival. Valid 1–4 years.",
    icon: Globe,
    color: "text-cyan-600",
  },
  {
    title: "Tax Considerations",
    description:
      "If you stay over 183 days in a calendar year, Mexico may consider you a tax resident. Most nomads who do 3–6 month stints don't hit this threshold. Consult a cross-border tax professional if you plan to stay longer.",
    icon: Shield,
    color: "text-emerald-600",
  },
];

const communityTips = [
  "Join the 'Tulum Digital Nomads' Facebook group (10K+ members)",
  "Attend weekly coworking happy hours at Digital Jungle and NomadX",
  "Check Nomad List for current nomad score and community events",
  "Follow local expat blogs and Instagram accounts for meetup announcements",
  "Visit Selina Tulum — their community events are open to non-guests",
];

const faqs = [
  {
    question: "Is Tulum good for digital nomads in 2026?",
    answer:
      "Yes — Tulum has become one of Latin America's top remote-work destinations. Connectivity has improved significantly, coworking spaces have multiplied, and the community of long-term nomads is large and welcoming. The main trade-offs are higher costs vs. other Mexican cities and occasional infrastructure hiccups during rainy season.",
  },
  {
    question: "How much does it cost to live in Tulum per month as a nomad?",
    answer:
      "A comfortable nomad lifestyle in Tulum costs $1,530–2,400/month at the mid-range level: roughly $1,200 for accommodation, $150 for coworking, $600 for food, $150 for transport, $40 for internet, and $350 for entertainment. Budget nomads can get by on $1,330/month by staying in the Pueblo and working from cafés.",
  },
  {
    question: "Do I need a special visa to work remotely from Tulum?",
    answer:
      "Most nationalities can enter Mexico visa-free and receive a tourist card (FMM) valid for up to 180 days — more than enough for a typical nomad stay. Mexico doesn't issue a specific 'digital nomad visa', but the Residente Temporal visa works for longer stays if you can show ~$2,600/month in remote income.",
  },
  {
    question: "What is the internet like in Tulum?",
    answer:
      "Internet quality in Tulum has improved greatly. Dedicated coworking spaces offer 60–150 Mbps with generator backup. Cafés and restaurants are more variable (10–50 Mbps). Backup with a Telcel SIM or eSIM is strongly recommended for reliable connectivity anywhere in the region.",
  },
  {
    question: "Which neighborhood in Tulum is best for digital nomads?",
    answer:
      "Tulum Pueblo is the best value — local food, affordable rents ($800–1,200/month), and easy bike access to the beach. La Veleta is popular with longer-term nomads for its modern apartments and co-living spaces. Aldea Zama suits those who want reliable infrastructure. The Zona Hotelera is best for a few weeks of the full Tulum experience, though it's pricier.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function DigitalNomadTulum() {
  const { t } = useI18n();
  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://tulumtkts.com";

  const hotelLink = generateHotelLink("Tulum");
  const carLink = generateCarRentalLink("Cancun");
  const esimLink = generateAffiliateLink(
    "https://airalo.com/mexico-esim",
    "safetyWing",
    "digital_nomad_esim"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={t("digitalNomad.seo.title")}
        description={t("digitalNomad.seo.description")}
        keywords={[
          "digital nomad tulum",
          "work remotely tulum",
          "tulum coworking",
          "remote work mexico tulum",
          "digital nomad mexico 2026",
          "coworking tulum",
          "tulum nomad guide",
          "live and work in tulum",
          "tulum cost of living",
          "tulum wifi internet",
          "nomad visa mexico",
          "tulum neighborhoods nomad",
        ]}
        canonicalUrl={`${siteUrl}/digital-nomad-tulum`}
        ogType="article"
        articlePublishedTime="2026-01-20T00:00:00Z"
        articleModifiedTime="2026-03-27T00:00:00Z"
        articleSection="Digital Nomad Guides"
        currentPath="/digital-nomad-tulum"
      />

      <FAQSchema faqs={faqs} />
      <Navigation />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-teal-800 via-emerald-800 to-cyan-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 text-sm">
              {t("digitalNomad.hero.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t("digitalNomad.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {t("digitalNomad.hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-cyan-300" />
                <span>From $1,330/month</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="w-5 h-5 text-cyan-300" />
                <span>Up to 150 Mbps coworking</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-300" />
                <span>Up to 180 days visa-free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cost of Living ────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-teal-100 text-teal-800 border-teal-200">
              <DollarSign className="w-3 h-3 mr-1 inline" />
              {t("digitalNomad.sections.costOfLiving")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("digitalNomad.costTitle")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("digitalNomad.costSubtitle")}
            </p>
          </div>

          {/* Column headers */}
          <div className="hidden md:grid md:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 mb-4 px-4">
            <div className="font-semibold text-gray-500 text-sm uppercase tracking-wider">
              {t("digitalNomad.labels.category")}
            </div>
            <div className="text-center">
              <Badge className="bg-teal-100 text-teal-800 border-teal-200">
                {t("digitalNomad.labels.budget")}
              </Badge>
            </div>
            <div className="text-center">
              <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200">
                {t("digitalNomad.labels.midRange")}
              </Badge>
            </div>
            <div className="text-center">
              <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                {t("digitalNomad.labels.premium")}
              </Badge>
            </div>
            <div className="w-28" />
          </div>

          <div className="space-y-3">
            {budgetRows.map((row) => {
              const Icon = row.icon;
              const href =
                row.affiliateType === "hotels"
                  ? hotelLink
                  : row.affiliateType === "transport"
                    ? carLink
                    : row.affiliateType === "esim"
                      ? esimLink
                      : null;

              return (
                <Card
                  key={row.category}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-teal-600" />
                        </div>
                        <span className="font-medium text-gray-900">
                          {row.category}
                        </span>
                      </div>
                      <div className="md:text-center">
                        <span className="md:hidden text-xs text-gray-500 mr-2">
                          {t("digitalNomad.labels.budget")}:
                        </span>
                        <span className="font-semibold text-teal-700">
                          {row.budget}
                        </span>
                        <span className="text-gray-400 text-sm"> USD</span>
                      </div>
                      <div className="md:text-center">
                        <span className="md:hidden text-xs text-gray-500 mr-2">
                          {t("digitalNomad.labels.midRange")}:
                        </span>
                        <span className="font-semibold text-cyan-700">
                          {row.mid}
                        </span>
                        <span className="text-gray-400 text-sm"> USD</span>
                      </div>
                      <div className="md:text-center">
                        <span className="md:hidden text-xs text-gray-500 mr-2">
                          {t("digitalNomad.labels.premium")}:
                        </span>
                        <span className="font-semibold text-purple-700">
                          {row.premium}
                        </span>
                        <span className="text-gray-400 text-sm"> USD</span>
                      </div>
                      <div className="w-full md:w-28">
                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              trackAffiliateClick(
                                row.affiliateType === "hotels"
                                  ? "hotellook"
                                  : row.affiliateType === "transport"
                                    ? "discovercars"
                                    : "safetyWing",
                                row.category,
                                "",
                                "digital-nomad-tulum"
                              )
                            }
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-teal-600 hover:text-teal-800 hover:bg-teal-50 w-full md:w-auto text-xs"
                            >
                              {t("digitalNomad.labels.seeOptions")}{" "}
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </a>
                        ) : (
                          <div className="w-full md:w-28" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Monthly totals */}
            <Card className="border-2 border-teal-500 bg-gradient-to-r from-teal-50 to-cyan-50">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-gray-900">
                      {t("digitalNomad.labels.monthlyTotal")}
                    </span>
                  </div>
                  <div className="md:text-center">
                    <span className="md:hidden text-xs text-gray-500 mr-2">
                      {t("digitalNomad.labels.budget")}:
                    </span>
                    <span className="text-xl font-bold text-teal-700">
                      ~$1,530
                    </span>
                    <span className="text-gray-500 text-sm"> USD</span>
                  </div>
                  <div className="md:text-center">
                    <span className="md:hidden text-xs text-gray-500 mr-2">
                      {t("digitalNomad.labels.midRange")}:
                    </span>
                    <span className="text-xl font-bold text-cyan-700">
                      ~$2,290
                    </span>
                    <span className="text-gray-500 text-sm"> USD</span>
                  </div>
                  <div className="md:text-center">
                    <span className="md:hidden text-xs text-gray-500 mr-2">
                      {t("digitalNomad.labels.premium")}:
                    </span>
                    <span className="text-xl font-bold text-purple-700">
                      ~$3,900+
                    </span>
                    <span className="text-gray-500 text-sm"> USD</span>
                  </div>
                  <div className="w-full md:w-28" />
                </div>
              </CardContent>
            </Card>
          </div>
          <p className="text-sm text-gray-500 mt-6 text-center">
            * {t("digitalNomad.costDisclaimer")}
          </p>
        </div>
      </section>

      {/* ── Coworking Spaces ──────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 border-emerald-200">
              <Monitor className="w-3 h-3 mr-1 inline" />
              {t("digitalNomad.sections.coworking")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("digitalNomad.coworkingTitle")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("digitalNomad.coworkingSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coworkingSpaces.map((space) => (
              <Card
                key={space.name}
                className="hover:shadow-lg transition-shadow border-l-4 border-l-emerald-500"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {space.name}
                      </h3>
                      <p className="text-2xl font-bold text-teal-600 mt-1">
                        {space.price}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t("digitalNomad.labels.perMonth")}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-gray-900">
                          {space.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Wifi className="w-4 h-4 text-teal-500" />
                        <span>{space.wifi}</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {t("digitalNomad.labels.wifiSpeed")}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t("digitalNomad.labels.amenities")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {space.amenities.map((amenity) => (
                        <Badge
                          key={amenity}
                          variant="secondary"
                          className="text-xs bg-gray-100 text-gray-700"
                        >
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Internet & Connectivity ───────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-cyan-100 text-cyan-800 border-cyan-200">
              <Wifi className="w-3 h-3 mr-1 inline" />
              {t("digitalNomad.sections.connectivity")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("digitalNomad.connectivityTitle")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("digitalNomad.connectivitySubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {connectivityTips.map((tip) => {
              const Icon = tip.icon;
              return (
                <Card
                  key={tip.title}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-cyan-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {tip.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* eSIM CTA */}
          <div className="mt-10 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-6 border border-cyan-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {t("digitalNomad.esimCta.title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("digitalNomad.esimCta.subtitle")}
              </p>
            </div>
            <a
              href={esimLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackAffiliateClick(
                  "safetyWing",
                  "eSIM CTA Connectivity Section",
                  "",
                  "digital-nomad-tulum"
                )
              }
              className="flex-shrink-0"
            >
              <Button
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                {t("digitalNomad.esimCta.button")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── Visa & Legal ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
              <Shield className="w-3 h-3 mr-1 inline" />
              {t("digitalNomad.sections.visa")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("digitalNomad.visaTitle")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("digitalNomad.visaSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visaInfo.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <Icon className={`w-8 h-8 mb-4 ${item.color}`} />
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Best Neighborhoods ────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-teal-100 text-teal-800 border-teal-200">
              <MapPin className="w-3 h-3 mr-1 inline" />
              {t("digitalNomad.sections.neighborhoods")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("digitalNomad.neighborhoodsTitle")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("digitalNomad.neighborhoodsSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {neighborhoods.map((hood) => {
              const Icon = hood.icon;
              return (
                <Card
                  key={hood.name}
                  className={`hover:shadow-lg transition-shadow border ${hood.color}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                          <Icon className="w-5 h-5 text-teal-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {hood.name}
                        </h3>
                      </div>
                      <Badge className={hood.badgeColor}>
                        {hood.highlight}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {hood.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3 bg-white/60 rounded-lg p-3 border border-gray-200/50">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          {t("digitalNomad.labels.monthlyRent")}
                        </p>
                        <p className="font-semibold text-teal-700 text-sm">
                          {hood.monthlyRent}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          {t("digitalNomad.labels.vibe")}
                        </p>
                        <p className="text-gray-700 text-xs leading-tight">
                          {hood.vibe}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <a
              href={hotelLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackAffiliateClick(
                  "hotellook",
                  "Neighborhoods section hotel CTA",
                  "",
                  "digital-nomad-tulum"
                )
              }
            >
              <Button
                variant="outline"
                size="lg"
                className="text-teal-600 border-teal-300 hover:bg-teal-50"
              >
                <Home className="w-5 h-5 mr-2" />
                {t("digitalNomad.labels.browseAccommodation")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── Community ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 border-emerald-200">
              <Users className="w-3 h-3 mr-1 inline" />
              {t("digitalNomad.sections.community")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("digitalNomad.communityTitle")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("digitalNomad.communitySubtitle")}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <ul className="space-y-4">
                  {communityTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("digitalNomad.faq.title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("digitalNomad.faq.subtitle")}
            </p>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* ── CrossSell ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CrossSell
            items={["esim", "hoteles", "transporte", "seguro"]}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
