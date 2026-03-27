import { Navigation } from "@/components/ui/navigation";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TripPlanner } from "@/components/trip-planner";
import { CrossSell } from "@/components/cross-sell";
import {
  generateFlightLink,
  generateHotelLink,
  generateCarRentalLink,
  generateAffiliateLink,
  trackAffiliateClick,
} from "@/lib/affiliate";
import { useLocalizedLink } from "@/hooks/use-localized-link";
import {
  Plane,
  Hotel,
  UtensilsCrossed,
  Compass,
  Car,
  Shield,
  DollarSign,
  TrendingDown,
  Calendar,
  ArrowRight,
} from "lucide-react";

// ─── Budget Data ────────────────────────────────────────────────────────────

interface BudgetRow {
  category: string;
  icon: React.ElementType;
  economico: string;
  intermedio: string;
  premium: string;
  affiliateType: "flights" | "hotels" | "food" | "activities" | "transport" | "insurance";
}

const budgetRows: BudgetRow[] = [
  {
    category: "Vuelos ida/vuelta",
    icon: Plane,
    economico: "$180",
    intermedio: "$300",
    premium: "$500+",
    affiliateType: "flights",
  },
  {
    category: "Hotel por noche",
    icon: Hotel,
    economico: "$50",
    intermedio: "$150",
    premium: "$400+",
    affiliateType: "hotels",
  },
  {
    category: "Comida por dia",
    icon: UtensilsCrossed,
    economico: "$20",
    intermedio: "$50",
    premium: "$100+",
    affiliateType: "food",
  },
  {
    category: "Actividades",
    icon: Compass,
    economico: "$30",
    intermedio: "$80",
    premium: "$150+",
    affiliateType: "activities",
  },
  {
    category: "Transporte",
    icon: Car,
    economico: "$15",
    intermedio: "$30",
    premium: "$60+",
    affiliateType: "transport",
  },
  {
    category: "Seguro de viaje",
    icon: Shield,
    economico: "$5",
    intermedio: "$10",
    premium: "$15+",
    affiliateType: "insurance",
  },
];

const totalRow = {
  category: "Total 5 dias / 2 personas",
  economico: "$1,500",
  intermedio: "$3,200",
  premium: "$6,500+",
};

const savingTips = [
  {
    icon: Plane,
    title: "Vuelos: Reserva con anticipacion",
    description:
      "Compra tus vuelos con 2-3 meses de anticipacion para obtener las mejores tarifas. Los martes y miercoles suelen tener precios mas bajos. Vuelos desde $180 USD ida y vuelta.",
    cta: "Buscar vuelos baratos",
    affiliateType: "flights" as const,
  },
  {
    icon: Hotel,
    title: "Hotel: Quedate en el Pueblo",
    description:
      "Los hoteles en Tulum Pueblo cuestan 50-70% menos que en la Zona Hotelera de playa. Estaras a 10 minutos en bici de la playa y tendras restaurantes y tiendas a pie.",
    cta: "Comparar hoteles",
    affiliateType: "hotels" as const,
  },
  {
    icon: Compass,
    title: "Actividades: Compra combos",
    description:
      "Los paquetes que combinan cenotes + ruinas + snorkel cuestan hasta 40% menos que reservar cada actividad por separado. Reservar en linea siempre es mas barato que en sitio.",
    cta: "Ver experiencias combo",
    affiliateType: "activities" as const,
  },
  {
    icon: Car,
    title: "Transporte: Renta un auto",
    description:
      "Si planeas visitar cenotes y ruinas, rentar un auto desde $25 USD/dia sale mas barato que pagar taxi para cada excursion. Incluye la libertad de explorar a tu ritmo.",
    cta: "Comparar autos",
    affiliateType: "transport" as const,
  },
];

const seasons = [
  {
    name: "Temporada Alta",
    months: "Dic - Abr",
    priceChange: "+30-50%",
    color: "bg-red-100 text-red-800 border-red-200",
    bgGradient: "from-red-50 to-orange-50",
    description:
      "Precios mas altos por la demanda de invierno y Semana Santa. Reserva con 3+ meses de anticipacion para asegurar disponibilidad y mejores tarifas.",
    tip: "Reserva antes de septiembre para mejores precios",
  },
  {
    name: "Temporada Media",
    months: "Jul - Ago, Nov",
    priceChange: "Precio normal",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    bgGradient: "from-yellow-50 to-amber-50",
    description:
      "Buen equilibrio entre precio y clima. Julio-agosto tiene vacaciones de verano con buen ambiente, noviembre es tranquilo antes de la temporada alta.",
    tip: "Noviembre es el mes con mejor relacion calidad-precio",
  },
  {
    name: "Temporada Baja",
    months: "May - Jun, Sep - Oct",
    priceChange: "-20-30%",
    color: "bg-green-100 text-green-800 border-green-200",
    bgGradient: "from-green-50 to-teal-50",
    description:
      "Los mejores precios del ano. Menos turistas, mismas playas increibles. Es temporada de lluvias pero suelen ser aguaceros cortos por la tarde.",
    tip: "Septiembre tiene los precios mas bajos del ano",
  },
];

// ─── Helper ─────────────────────────────────────────────────────────────────

function getAffiliateUrl(type: string): string {
  switch (type) {
    case "flights":
      return generateFlightLink("MEX", "CUN");
    case "hotels":
      return generateHotelLink("Tulum");
    case "transport":
      return generateCarRentalLink("Cancun");
    case "insurance":
      return generateAffiliateLink(
        "https://safetywing.com/nomad-insurance",
        "safetyWing",
        "cuanto_cuesta_insurance"
      );
    default:
      return "";
  }
}

function handleAffiliateLinkClick(type: string, label: string) {
  const programMap: Record<string, string> = {
    flights: "aviasales",
    hotels: "hotellook",
    transport: "discovercars",
    insurance: "safetyWing",
  };
  const program = programMap[type];
  if (program) {
    trackAffiliateClick(program, label, "", "cuanto-cuesta");
  }
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function CuantoCuesta() {
  const { getLocalizedLink } = useLocalizedLink();
  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://tulumtkts.com";

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="¿Cuanto Cuesta Viajar a Tulum en 2026? - Presupuesto Completo | TulumTkts"
        description="Descubre cuanto cuesta viajar a Tulum en 2026. Presupuesto detallado para viaje economico ($1,500 USD), intermedio ($3,200 USD) y premium ($6,500+ USD) para 2 personas, 5 dias. Vuelos, hotel, comida, actividades y transporte."
        keywords={[
          "cuanto cuesta viajar a tulum",
          "presupuesto tulum 2026",
          "cuanto cuesta tulum",
          "precio viaje tulum",
          "costo viajar a tulum",
          "tulum presupuesto viaje",
          "cuanto sale viajar a tulum",
          "gastos viaje tulum",
          "tulum costo por persona",
          "cuanto dinero necesito para tulum",
          "tulum barato",
          "tulum economico",
          "presupuesto vacaciones tulum",
          "cuanto cuesta ir a tulum desde mexico",
          "tulum todo incluido precio",
        ]}
        canonicalUrl={`${siteUrl}/cuanto-cuesta-viajar-a-tulum`}
        ogType="article"
        articlePublishedTime="2026-01-15T00:00:00Z"
        articleModifiedTime="2026-03-20T00:00:00Z"
        articleSection="Guias de Viaje"
        currentPath="/cuanto-cuesta-viajar-a-tulum"
      />
      <Navigation />

      {/* ── Hero Section ────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-teal-600 via-cyan-700 to-teal-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 text-sm">
              Actualizado Marzo 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              ¿Cuanto Cuesta Viajar a Tulum?
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Presupuesto completo y desglosado para planificar tu viaje
              perfecto a Tulum. Desde opciones economicas hasta experiencias
              premium, con precios reales actualizados para 2026.
            </p>
            <div className="flex flex-wrap gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-cyan-300" />
                <span>Desde $1,500 USD / 2 personas</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-300" />
                <span>5 dias / 4 noches</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-cyan-300" />
                <span>Tips para ahorrar hasta 40%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Budget Breakdown Table ──────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Desglose de Presupuesto por Categoria
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comparativa detallada de costos para 3 niveles de presupuesto.
              Todos los precios son en USD por persona, excepto donde se indique.
            </p>
          </div>

          {/* Column headers */}
          <div className="hidden md:grid md:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 mb-4 px-4">
            <div className="font-semibold text-gray-500 text-sm uppercase tracking-wider">
              Categoria
            </div>
            <div className="text-center">
              <Badge className="bg-teal-100 text-teal-800 border-teal-200">
                Economico
              </Badge>
            </div>
            <div className="text-center">
              <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200">
                Intermedio
              </Badge>
            </div>
            <div className="text-center">
              <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                Premium
              </Badge>
            </div>
            <div className="w-28" />
          </div>

          {/* Budget rows */}
          <div className="space-y-3">
            {budgetRows.map((row) => {
              const Icon = row.icon;
              const isInternalLink =
                row.affiliateType === "activities" ||
                row.affiliateType === "food";
              const href = isInternalLink
                ? row.affiliateType === "activities"
                  ? getLocalizedLink("/experiencias")
                  : getLocalizedLink("/experiencias")
                : getAffiliateUrl(row.affiliateType);

              return (
                <Card
                  key={row.category}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 items-center">
                      {/* Category */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-teal-600" />
                        </div>
                        <span className="font-medium text-gray-900">
                          {row.category}
                        </span>
                      </div>

                      {/* Mobile labels + values */}
                      <div className="md:text-center">
                        <span className="md:hidden text-xs text-gray-500 mr-2">
                          Economico:
                        </span>
                        <span className="font-semibold text-teal-700">
                          {row.economico}
                        </span>
                        <span className="text-gray-400 text-sm"> USD</span>
                      </div>
                      <div className="md:text-center">
                        <span className="md:hidden text-xs text-gray-500 mr-2">
                          Intermedio:
                        </span>
                        <span className="font-semibold text-cyan-700">
                          {row.intermedio}
                        </span>
                        <span className="text-gray-400 text-sm"> USD</span>
                      </div>
                      <div className="md:text-center">
                        <span className="md:hidden text-xs text-gray-500 mr-2">
                          Premium:
                        </span>
                        <span className="font-semibold text-purple-700">
                          {row.premium}
                        </span>
                        <span className="text-gray-400 text-sm"> USD</span>
                      </div>

                      {/* CTA */}
                      <div className="w-full md:w-28">
                        {isInternalLink ? (
                          <a href={href}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-teal-600 hover:text-teal-800 hover:bg-teal-50 w-full md:w-auto text-xs"
                            >
                              Ver precios <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </a>
                        ) : (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              handleAffiliateLinkClick(
                                row.affiliateType,
                                row.category
                              )
                            }
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-teal-600 hover:text-teal-800 hover:bg-teal-50 w-full md:w-auto text-xs"
                            >
                              Ver precios <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Total row */}
            <Card className="border-2 border-teal-500 bg-gradient-to-r from-teal-50 to-cyan-50">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-gray-900">
                      {totalRow.category}
                    </span>
                  </div>
                  <div className="md:text-center">
                    <span className="md:hidden text-xs text-gray-500 mr-2">
                      Economico:
                    </span>
                    <span className="text-xl font-bold text-teal-700">
                      {totalRow.economico}
                    </span>
                    <span className="text-gray-500 text-sm"> USD</span>
                  </div>
                  <div className="md:text-center">
                    <span className="md:hidden text-xs text-gray-500 mr-2">
                      Intermedio:
                    </span>
                    <span className="text-xl font-bold text-cyan-700">
                      {totalRow.intermedio}
                    </span>
                    <span className="text-gray-500 text-sm"> USD</span>
                  </div>
                  <div className="md:text-center">
                    <span className="md:hidden text-xs text-gray-500 mr-2">
                      Premium:
                    </span>
                    <span className="text-xl font-bold text-purple-700">
                      {totalRow.premium}
                    </span>
                    <span className="text-gray-500 text-sm"> USD</span>
                  </div>
                  <div className="w-full md:w-28">
                    <a href="#calculadora">
                      <Button
                        size="sm"
                        className="bg-teal-600 hover:bg-teal-700 text-white w-full md:w-auto text-xs"
                      >
                        Calcular <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            * Precios estimados en USD. Los vuelos son por persona ida y vuelta.
            Hotel es por habitacion. El total es aproximado para 2 personas, 5
            dias (4 noches).
          </p>
        </div>
      </section>

      {/* ── Como Ahorrar Section ────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              <TrendingDown className="w-3 h-3 mr-1 inline" />
              Ahorra hasta 40%
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como Ahorrar en tu Viaje a Tulum
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Consejos probados para reducir costos sin sacrificar la
              experiencia. Viajeros inteligentes ahorran entre $500-$1,500 USD
              con estos tips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savingTips.map((tip) => {
              const Icon = tip.icon;
              const isInternalLink = tip.affiliateType === "activities";
              const href = isInternalLink
                ? getLocalizedLink("/experiencias")
                : tip.affiliateType === "flights"
                  ? generateFlightLink("MEX", "CUN")
                  : tip.affiliateType === "hotels"
                    ? generateHotelLink("Tulum")
                    : generateCarRentalLink("Cancun");

              return (
                <Card
                  key={tip.title}
                  className="hover:shadow-lg transition-shadow border-l-4 border-l-teal-500"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {tip.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                          {tip.description}
                        </p>
                        {isInternalLink ? (
                          <a href={href}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-teal-600 border-teal-300 hover:bg-teal-50"
                            >
                              {tip.cta}{" "}
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </a>
                        ) : (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              handleAffiliateLinkClick(
                                tip.affiliateType,
                                tip.title
                              )
                            }
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-teal-600 border-teal-300 hover:bg-teal-50"
                            >
                              {tip.cta}{" "}
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Seasonal Price Comparison ───────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-cyan-100 text-cyan-800 border-cyan-200">
              <Calendar className="w-3 h-3 mr-1 inline" />
              Mejor epoca para viajar
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Precios por Temporada
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Elige la epoca adecuada y ahorra hasta 30% en tu viaje. Aqui
              tienes como varian los precios a lo largo del ano.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seasons.map((season) => (
              <Card
                key={season.name}
                className={`overflow-hidden hover:shadow-lg transition-shadow bg-gradient-to-br ${season.bgGradient}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {season.name}
                    </h3>
                    <Badge className={season.color}>{season.priceChange}</Badge>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    {season.months}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {season.description}
                  </p>
                  <div className="bg-white/60 rounded-lg p-3 border border-gray-200/50">
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold">Tip:</span> {season.tip}
                    </p>
                  </div>
                  <div className="mt-4">
                    <a
                      href={generateFlightLink("MEX", "CUN")}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        handleAffiliateLinkClick(
                          "flights",
                          `Temporada ${season.name}`
                        )
                      }
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-teal-600 border-teal-300 hover:bg-teal-50"
                      >
                        Ver vuelos en {season.months.split(",")[0].trim()}{" "}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick comparison bar */}
          <div className="mt-10 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
              Ejemplo: Mismo viaje, diferente temporada
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Diciembre (Alta)</p>
                <p className="text-2xl font-bold text-red-600">~$4,200 USD</p>
                <p className="text-xs text-gray-400">2 personas, 5 dias</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Julio (Media)</p>
                <p className="text-2xl font-bold text-yellow-600">
                  ~$3,200 USD
                </p>
                <p className="text-xs text-gray-400">2 personas, 5 dias</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-green-300">
                <p className="text-sm text-gray-500 mb-1">
                  Septiembre (Baja)
                </p>
                <p className="text-2xl font-bold text-green-600">
                  ~$2,300 USD
                </p>
                <p className="text-xs text-gray-400">2 personas, 5 dias</p>
                <Badge className="mt-2 bg-green-100 text-green-700 text-xs">
                  Mejor precio
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Trip Planner ─────────────────────────────────────────── */}
      <section id="calculadora" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-teal-100 text-teal-800 border-teal-200">
              <DollarSign className="w-3 h-3 mr-1 inline" />
              Calculadora interactiva
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Calcula tu Presupuesto Personalizado
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ajusta el numero de viajeros, noches y nivel de presupuesto para
              obtener un estimado personalizado con links directos para reservar
              cada componente.
            </p>
          </div>
          <TripPlanner />
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-cyan-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para planificar tu viaje a Tulum?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Empieza reservando tus vuelos y hotel con las mejores tarifas.
            Nuestros links te llevan directamente a los precios mas bajos
            disponibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={generateFlightLink("MEX", "CUN")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                handleAffiliateLinkClick("flights", "CTA Final Vuelos")
              }
            >
              <Button
                size="lg"
                className="bg-white text-teal-700 hover:bg-gray-100 font-bold px-8"
              >
                <Plane className="w-5 h-5 mr-2" />
                Buscar Vuelos Baratos
              </Button>
            </a>
            <a
              href={generateHotelLink("Tulum")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                handleAffiliateLinkClick("hotels", "CTA Final Hoteles")
              }
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-bold px-8"
              >
                <Hotel className="w-5 h-5 mr-2" />
                Comparar Hoteles
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── CrossSell ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CrossSell />
        </div>
      </section>
    </div>
  );
}
