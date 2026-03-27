import { Navigation } from "@/components/ui/navigation";
import { SEOHead } from "@/components/seo-head";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CrossSell } from "@/components/cross-sell";
import { generateHotelLink, generateFlightLink, trackAffiliateClick } from "@/lib/affiliate";
import { useI18n } from "@/contexts/i18n-context";
import {
  Sun,
  CloudRain,
  Waves,
  Thermometer,
  Wind,
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
  Calendar,
  ArrowRight,
  Umbrella,
  Shirt,
  ShieldCheck,
} from "lucide-react";

// ─── Monthly Weather Data ────────────────────────────────────────────────────

const monthlyWeather = [
  { month: "Jan", tempHigh: 29, tempLow: 21, rainDays: 4, oceanTemp: 26, crowd: "High", price: "$$$" },
  { month: "Feb", tempHigh: 30, tempLow: 21, rainDays: 3, oceanTemp: 26, crowd: "High", price: "$$$" },
  { month: "Mar", tempHigh: 31, tempLow: 22, rainDays: 2, oceanTemp: 27, crowd: "High", price: "$$$" },
  { month: "Apr", tempHigh: 32, tempLow: 23, rainDays: 3, oceanTemp: 27, crowd: "Medium", price: "$$" },
  { month: "May", tempHigh: 33, tempLow: 24, rainDays: 7, oceanTemp: 28, crowd: "Low", price: "$" },
  { month: "Jun", tempHigh: 33, tempLow: 25, rainDays: 10, oceanTemp: 28, crowd: "Low", price: "$" },
  { month: "Jul", tempHigh: 34, tempLow: 25, rainDays: 8, oceanTemp: 29, crowd: "Medium", price: "$$" },
  { month: "Aug", tempHigh: 34, tempLow: 25, rainDays: 9, oceanTemp: 29, crowd: "Medium", price: "$$" },
  { month: "Sep", tempHigh: 33, tempLow: 24, rainDays: 12, oceanTemp: 29, crowd: "Low", price: "$" },
  { month: "Oct", tempHigh: 31, tempLow: 23, rainDays: 10, oceanTemp: 28, crowd: "Low", price: "$" },
  { month: "Nov", tempHigh: 30, tempLow: 22, rainDays: 6, oceanTemp: 27, crowd: "Medium", price: "$$" },
  { month: "Dec", tempHigh: 29, tempLow: 21, rainDays: 4, oceanTemp: 26, crowd: "High", price: "$$$" },
];

// ─── Helper Functions ────────────────────────────────────────────────────────

function getCrowdColor(crowd: string): string {
  switch (crowd) {
    case "High":
      return "text-red-600 font-semibold";
    case "Medium":
      return "text-yellow-600 font-semibold";
    case "Low":
      return "text-green-600 font-semibold";
    default:
      return "text-gray-600";
  }
}

function getPriceColor(price: string): string {
  switch (price) {
    case "$$$":
      return "text-red-600 font-semibold";
    case "$$":
      return "text-yellow-600 font-semibold";
    case "$":
      return "text-green-600 font-semibold";
    default:
      return "text-gray-600";
  }
}

function getRainBarWidth(days: number): string {
  // max 12 rain days = 100%
  return `${Math.round((days / 12) * 100)}%`;
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function ClimaTulum() {
  const { t } = useI18n();
  // Helper to cast translation values that are arrays/objects in the translations file
  const ta = (key: string): any => t(key) as unknown as any;
  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://tulumtkts.com";

  const seasons = [
    {
      key: "dry",
      icon: Sun,
      gradient: "from-amber-50 to-yellow-50",
      border: "border-amber-200",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      badge: "bg-amber-100 text-amber-800 border-amber-200",
      pros: ta("clima.seasons.dry.pros") as string[],
      cons: ta("clima.seasons.dry.cons") as string[],
    },
    {
      key: "shoulder",
      icon: Wind,
      gradient: "from-blue-50 to-sky-50",
      border: "border-blue-200",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      badge: "bg-blue-100 text-blue-800 border-blue-200",
      pros: ta("clima.seasons.shoulder.pros") as string[],
      cons: ta("clima.seasons.shoulder.cons") as string[],
    },
    {
      key: "rainy",
      icon: CloudRain,
      gradient: "from-teal-50 to-cyan-50",
      border: "border-teal-200",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
      badge: "bg-teal-100 text-teal-800 border-teal-200",
      pros: ta("clima.seasons.rainy.pros") as string[],
      cons: ta("clima.seasons.rainy.cons") as string[],
    },
  ];

  const quarters = [
    {
      key: "q1",
      months: t("clima.quarters.q1.months"),
      icon: Sun,
      bg: "bg-amber-50",
      border: "border-amber-200",
      iconColor: "text-amber-500",
    },
    {
      key: "q2",
      months: t("clima.quarters.q2.months"),
      icon: CloudRain,
      bg: "bg-sky-50",
      border: "border-sky-200",
      iconColor: "text-sky-500",
    },
    {
      key: "q3",
      months: t("clima.quarters.q3.months"),
      icon: Waves,
      bg: "bg-teal-50",
      border: "border-teal-200",
      iconColor: "text-teal-500",
    },
    {
      key: "q4",
      months: t("clima.quarters.q4.months"),
      icon: Wind,
      bg: "bg-slate-50",
      border: "border-slate-200",
      iconColor: "text-slate-500",
    },
  ];

  const packColumns = [
    {
      key: "essentials",
      icon: ShieldCheck,
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
      items: ta("clima.pack.essentials.items") as string[],
    },
    {
      key: "rainy",
      icon: Umbrella,
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
      items: ta("clima.pack.rainy.items") as string[],
    },
    {
      key: "dry",
      icon: Shirt,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      items: ta("clima.pack.dry.items") as string[],
    },
  ];

  const faqs = ta("clima.faq.items") as Array<{ question: string; answer: string }>;

  const crowdLabel = (crowd: string): string => {
    if (crowd === "High") return t("clima.table.crowdHigh");
    if (crowd === "Medium") return t("clima.table.crowdMedium");
    return t("clima.table.crowdLow");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={t("clima.seo.title")}
        description={t("clima.seo.description")}
        keywords={[
          "clima tulum",
          "mejor epoca para ir a tulum",
          "cuando ir a tulum",
          "tiempo en tulum",
          "temporada de lluvias tulum",
          "temperatura tulum",
          "tulum weather",
          "when to visit tulum",
          "tulum best time to visit",
          "tulum rain season",
          "tulum hurricane season",
          "tulum climate",
        ]}
        canonicalUrl={`${siteUrl}/clima-tulum`}
        ogType="article"
        articlePublishedTime="2026-01-15T00:00:00Z"
        articleModifiedTime="2026-03-27T00:00:00Z"
        articleSection="Guias de Viaje"
        currentPath="/clima-tulum"
      />
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-sky-600 via-blue-500 to-cyan-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 text-sm">
              {t("clima.hero.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t("clima.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {t("clima.hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-cyan-200" />
                <span>{t("clima.hero.stat1")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-cyan-200" />
                <span>{t("clima.hero.stat2")}</span>
              </div>
              <div className="flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-cyan-200" />
                <span>{t("clima.hero.stat3")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Monthly Weather Table ─────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-sky-100 text-sky-800 border-sky-200">
              <Calendar className="w-3 h-3 mr-1 inline" />
              {t("clima.table.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("clima.table.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("clima.table.subtitle")}
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto rounded-2xl shadow-sm border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-sky-600 to-cyan-500 text-white">
                  <th className="px-4 py-3 text-left font-semibold">{t("clima.table.month")}</th>
                  <th className="px-4 py-3 text-center font-semibold">{t("clima.table.tempHigh")}</th>
                  <th className="px-4 py-3 text-center font-semibold">{t("clima.table.tempLow")}</th>
                  <th className="px-4 py-3 text-center font-semibold">{t("clima.table.rainDays")}</th>
                  <th className="px-4 py-3 text-center font-semibold">{t("clima.table.oceanTemp")}</th>
                  <th className="px-4 py-3 text-center font-semibold">{t("clima.table.crowd")}</th>
                  <th className="px-4 py-3 text-center font-semibold">{t("clima.table.price")}</th>
                </tr>
              </thead>
              <tbody>
                {monthlyWeather.map((row, idx) => (
                  <tr
                    key={row.month}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      {t(`clima.months.${row.month}`)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-orange-600 font-semibold">{row.tempHigh}°C</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-blue-600">{row.tempLow}°C</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-400 h-1.5 rounded-full"
                            style={{ width: getRainBarWidth(row.rainDays) }}
                          />
                        </div>
                        <span className="text-gray-700 w-4 text-right">{row.rainDays}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-teal-600 font-medium">{row.oceanTemp}°C</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={getCrowdColor(row.crowd)}>
                        {crowdLabel(row.crowd)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={getPriceColor(row.price)}>{row.price}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {monthlyWeather.map((row) => (
              <Card key={row.month} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900 text-base">
                      {t(`clima.months.${row.month}`)}
                    </h3>
                    <div className="flex gap-2">
                      <Badge variant="outline" className={getPriceColor(row.price)}>
                        {row.price}
                      </Badge>
                      <Badge variant="outline" className={getCrowdColor(row.crowd)}>
                        {crowdLabel(row.crowd)}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Thermometer className="w-3.5 h-3.5 text-orange-500" />
                      <span>{t("clima.table.tempHigh")}: <span className="font-medium text-orange-600">{row.tempHigh}°C</span></span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Thermometer className="w-3.5 h-3.5 text-blue-400" />
                      <span>{t("clima.table.tempLow")}: <span className="font-medium text-blue-600">{row.tempLow}°C</span></span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                      <span>{t("clima.table.rainDays")}: <span className="font-medium">{row.rainDays}</span></span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Waves className="w-3.5 h-3.5 text-teal-500" />
                      <span>{t("clima.table.oceanTemp")}: <span className="font-medium text-teal-600">{row.oceanTemp}°C</span></span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Best Seasons ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-cyan-100 text-cyan-800 border-cyan-200">
              <Sun className="w-3 h-3 mr-1 inline" />
              {t("clima.seasons.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("clima.seasons.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("clima.seasons.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seasons.map((season) => {
              const Icon = season.icon;
              const pros = season.pros;
              const cons = season.cons;
              return (
                <Card
                  key={season.key}
                  className={`overflow-hidden hover:shadow-lg transition-shadow bg-gradient-to-br ${season.gradient} ${season.border} border`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-11 h-11 rounded-xl ${season.iconBg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${season.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight">
                          {t(`clima.seasons.${season.key}.name`)}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {t(`clima.seasons.${season.key}.months`)}
                        </p>
                      </div>
                    </div>
                    <Badge className={`${season.badge} mb-4 text-xs`}>
                      {t(`clima.seasons.${season.key}.label`)}
                    </Badge>
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                      {t(`clima.seasons.${season.key}.description`)}
                    </p>
                    <div className="space-y-1.5 mb-4">
                      {pros.map((p, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1.5">
                      {cons.map((c, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Monthly Guide (Quarters) ──────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
              <Calendar className="w-3 h-3 mr-1 inline" />
              {t("clima.quarters.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("clima.quarters.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("clima.quarters.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quarters.map((q) => {
              const Icon = q.icon;
              return (
                <Card
                  key={q.key}
                  className={`border-l-4 ${q.border.replace("border-", "border-l-")} hover:shadow-md transition-shadow`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg ${q.bg} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${q.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {t(`clima.quarters.${q.key}.title`)}
                        </h3>
                        <p className="text-sm text-gray-500">{q.months}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      {t(`clima.quarters.${q.key}.description`)}
                    </p>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <p className="text-xs text-gray-700">
                        <span className="font-semibold">{t("clima.quarters.tipLabel")}</span>{" "}
                        {t(`clima.quarters.${q.key}.tip`)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── What to Pack ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-teal-100 text-teal-800 border-teal-200">
              {t("clima.pack.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("clima.pack.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("clima.pack.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packColumns.map((col) => {
              const Icon = col.icon;
              const items = col.items;
              return (
                <Card key={col.key} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-11 h-11 rounded-xl ${col.iconBg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${col.iconColor}`} />
                      </div>
                      <h3 className="font-bold text-gray-900">
                        {t(`clima.pack.${col.key}.title`)}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Affiliate CTA for hotels */}
          <div className="mt-10 bg-gradient-to-r from-sky-50 to-cyan-50 rounded-2xl p-6 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                {t("clima.pack.cta.title")}
              </h3>
              <p className="text-gray-600 text-sm">{t("clima.pack.cta.subtitle")}</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a
                href={generateHotelLink("Tulum")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAffiliateClick("hotellook", "clima_pack_cta", "", "clima-tulum")}
              >
                <Button size="sm" className="bg-sky-600 hover:bg-sky-700 text-white whitespace-nowrap">
                  {t("clima.pack.cta.hotels")} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
              <a
                href={generateFlightLink("MEX", "CUN")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAffiliateClick("aviasales", "clima_pack_cta_flights", "", "clima-tulum")}
              >
                <Button size="sm" variant="outline" className="text-sky-600 border-sky-300 hover:bg-sky-50 whitespace-nowrap">
                  {t("clima.pack.cta.flights")} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gray-100 text-gray-700 border-gray-200">
              {t("clima.faq.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("clima.faq.title")}
            </h2>
            <p className="text-lg text-gray-600">{t("clima.faq.subtitle")}</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow border-l-4 border-l-sky-400">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-base">{faq.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-br from-sky-600 via-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("clima.cta.title")}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t("clima.cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={generateFlightLink("MEX", "CUN")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAffiliateClick("aviasales", "clima_final_cta", "", "clima-tulum")}
            >
              <Button size="lg" className="bg-white text-sky-700 hover:bg-gray-100 font-bold px-8">
                <Sun className="w-5 h-5 mr-2" />
                {t("clima.cta.searchFlights")}
              </Button>
            </a>
            <a
              href={generateHotelLink("Tulum")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAffiliateClick("hotellook", "clima_final_cta_hotels", "", "clima-tulum")}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-bold px-8"
              >
                <Users className="w-5 h-5 mr-2" />
                {t("clima.cta.compareHotels")}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── CrossSell ─────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CrossSell />
        </div>
      </section>

      <Footer />
    </div>
  );
}
