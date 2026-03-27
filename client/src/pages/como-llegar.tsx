import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/ui/navigation";
import { SEOHead } from "@/components/seo-head";
import { FAQSchema, FAQAccordion } from "@/components/faq-schema";
import { CrossSell } from "@/components/cross-sell";
import { TripPlanner } from "@/components/trip-planner";
import { useI18n } from "@/contexts/i18n-context";
import { useLocalizedLink } from "@/hooks/use-localized-link";
import {
  generateFlightLink,
  generateTransferLink,
  generateCarRentalLink,
  trackAffiliateClick,
} from "@/lib/affiliate";
import {
  Plane,
  Car,
  Bus,
  Clock,
  MapPin,
  DollarSign,
  ArrowRight,
  CheckCircle,
  Search,
  Calendar,
  Users,
  Star,
  AlertCircle,
  Navigation as NavigationIcon,
} from "lucide-react";

const DESTINATION_CODE = "CUN";

const popularRoutes = [
  { originCode: "MEX", originCity: "Ciudad de México", price: "desde $1,200 MXN", flag: "🇲🇽" },
  { originCode: "JFK", originCity: "Nueva York", price: "desde $180 USD", flag: "🇺🇸" },
  { originCode: "MIA", originCity: "Miami", price: "desde $120 USD", flag: "🇺🇸" },
  { originCode: "LAX", originCity: "Los Ángeles", price: "desde $220 USD", flag: "🇺🇸" },
  { originCode: "MAD", originCity: "Madrid", price: "desde €250", flag: "🇪🇸" },
  { originCode: "YYZ", originCity: "Toronto", price: "desde $300 CAD", flag: "🇨🇦" },
];

const transportOptions = [
  {
    id: "transfer",
    icon: Car,
    title: "Transfer Privado",
    price: "$50–80 USD",
    duration: "~2 horas",
    recommended: true,
    highlight: "Más cómodo",
    description:
      "Tu chofer espera en el aeropuerto con tu nombre. Puerta a puerta, sin escalas ni esperas. Ideal para grupos y familias.",
    pros: ["Puerta a puerta", "Horario flexible", "Sin escalas", "A/C y WiFi"],
    cons: ["Mayor costo"],
    cta: "Reservar Transfer",
    isAffiliate: true,
    affiliateType: "transfer" as const,
  },
  {
    id: "ado",
    icon: Bus,
    title: "Bus ADO",
    price: "$15 USD",
    duration: "~3 horas",
    recommended: false,
    highlight: "Más económico",
    description:
      "ADO opera buses de primera clase directos de CUN a Tulum. Compra tu boleto en la terminal T2 del aeropuerto.",
    pros: ["Muy económico", "Seguro y puntual", "A/C a bordo"],
    cons: ["Más tiempo", "Horarios fijos", "Sin puerta a puerta"],
    cta: "Ver horarios ADO",
    isAffiliate: false,
  },
  {
    id: "car",
    icon: Car,
    title: "Renta de Auto",
    price: "$35–85 USD/día",
    duration: "~1.5 horas",
    recommended: false,
    highlight: "Más libertad",
    description:
      "Con un auto renta desde el aeropuerto tienes total libertad para explorar cenotes, ruinas y playas a tu ritmo.",
    pros: ["Total libertad", "Explorar a tu ritmo", "Costo compartido", "Rutas secundarias"],
    cons: ["Requiere licencia", "Seguro obligatorio"],
    cta: "Ver autos disponibles",
    isAffiliate: true,
    affiliateType: "car" as const,
  },
  {
    id: "taxi",
    icon: NavigationIcon,
    title: "Taxi Oficial",
    price: "$100–120 USD",
    duration: "~2 horas",
    recommended: false,
    highlight: "Sin reserva",
    description:
      "Taxis oficiales disponibles a la salida del aeropuerto. Sin reserva previa pero precio fijo al destino.",
    pros: ["Sin reserva previa", "Disponible 24/7", "Precio acordado"],
    cons: ["Caro sin grupos", "Sin rastreo", "Efectivo/USD"],
    cta: null,
    isAffiliate: false,
  },
];

const cityRoutes = [
  {
    city: "Playa del Carmen",
    distance: "60 km",
    time: "45 min",
    options: ["Colectivo $2 USD", "Taxi $30 USD", "Auto propio"],
    icon: "🏖️",
  },
  {
    city: "Cancún",
    distance: "130 km",
    time: "2 horas",
    options: ["ADO Bus $15 USD", "Transfer $50 USD", "Colectivo $8 USD"],
    icon: "✈️",
  },
  {
    city: "Mérida",
    distance: "310 km",
    time: "4.5 horas",
    options: ["ADO Bus $25 USD", "Auto propio", "Avión vía CUN"],
    icon: "🏛️",
  },
  {
    city: "Bacalar",
    distance: "155 km",
    time: "2.5 horas",
    options: ["ADO Bus $18 USD", "Auto propio", "Colectivo con trasbordo"],
    icon: "💙",
  },
];

const faqs = [
  {
    question: "¿Cuál es el aeropuerto más cercano a Tulum?",
    answer:
      "El Aeropuerto Internacional de Cancún (CUN) es el más cercano, ubicado a 130 km (aproximadamente 2 horas). También existe el nuevo Aeropuerto Internacional Felipe Ángeles (NLU) en CDMX con conexiones directas a CUN.",
  },
  {
    question: "¿Cuánto cuesta llegar del aeropuerto de Cancún a Tulum?",
    answer:
      "El transfer privado cuesta $50–80 USD (más cómodo), el bus ADO $15 USD (más económico), la renta de auto $35–85 USD/día (más libertad) y el taxi oficial $100–120 USD. Recomendamos el transfer privado para mayor comodidad.",
  },
  {
    question: "¿Cuánto tiempo tarda el viaje de Cancún a Tulum?",
    answer:
      "En transfer privado o taxi son aproximadamente 1.5–2 horas por la carretera federal 307. En bus ADO son 2.5–3 horas con paradas. En temporada alta puede haber tráfico adicional.",
  },
  {
    question: "¿Es seguro viajar de noche de Cancún a Tulum?",
    answer:
      "La carretera 307 es bien iluminada y transitada. El transfer privado con empresa acreditada es la opción más segura. Evita colectivos informales de noche y prefiere servicios con rastreo GPS.",
  },
  {
    question: "¿Hay vuelos directos a Tulum?",
    answer:
      "Tulum no tiene aeropuerto comercial propio. El aeropuerto más cercano es Cancún (CUN) a 130 km. El Aeropuerto Internacional de Tulum (TQO) está en construcción pero aún no opera vuelos comerciales.",
  },
  {
    question: "¿Qué es mejor, transfer privado o renta de auto?",
    answer:
      "Depende de tu viaje: el transfer es mejor si solo vas a Tulum y prefieres comodidad sin complicaciones. La renta de auto es mejor si planeas explorar cenotes, ruinas de Cobá, Bacalar u otras zonas por tu cuenta durante varios días.",
  },
];

function formatDateForAviasales(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return "";
  return `${parts[2]}${parts[1]}`;
}

export default function ComoLlegar() {
  const { t } = useI18n();
  const { getLocalizedLink } = useLocalizedLink();
  const [origin, setOrigin] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://tulumtkts.com";

  function handleFlightSearch() {
    if (!origin.trim()) return;
    setIsSearching(true);
    const originCode = origin.trim().toUpperCase().replace(/\s+/g, "").slice(0, 3);
    const formattedDepart = formatDateForAviasales(departureDate);
    const formattedReturn = formatDateForAviasales(returnDate);
    const affiliateUrl = generateFlightLink(originCode, DESTINATION_CODE, formattedDepart || undefined, formattedReturn || undefined);
    trackAffiliateClick("aviasales", `${originCode} → ${DESTINATION_CODE}`, "flight", "como-llegar");
    setTimeout(() => {
      setIsSearching(false);
      window.open(affiliateUrl, "_blank", "noopener,noreferrer");
    }, 300);
  }

  function handleTransferClick() {
    const url = generateTransferLink("Cancun Airport", "Tulum");
    trackAffiliateClick("kiwitaxi", "Transfer CUN → Tulum", "65", "como-llegar-transfer");
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleCarClick() {
    const url = generateCarRentalLink("Cancun");
    trackAffiliateClick("discovercars", "Car Rental CUN", "45", "como-llegar-car");
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleRouteClick(originCode: string) {
    const affiliateUrl = generateFlightLink(originCode, DESTINATION_CODE);
    trackAffiliateClick("aviasales", `${originCode} → ${DESTINATION_CODE}`, "flight", "como-llegar-routes");
    window.open(affiliateUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Cómo Llegar a Tulum 2026 - Vuelos, Transfers y Transporte"
        description="Guía completa para llegar a Tulum: vuelos baratos a Cancún, transfers privados CUN→Tulum desde $50, bus ADO, renta de autos. Todas las opciones con precios actualizados."
        keywords={[
          "como llegar a tulum",
          "how to get to tulum",
          "cancun to tulum",
          "cancun tulum transfer",
          "tulum airport transfer",
          "bus cancun tulum",
          "renta auto cancun tulum",
          "vuelos tulum",
          "aeropuerto cancun tulum",
          "traslado cancun tulum",
        ]}
        canonicalUrl={`${siteUrl}/como-llegar-a-tulum`}
        ogType="website"
        currentPath="/como-llegar-a-tulum"
      />

      <FAQSchema faqs={faqs} />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600 flex flex-wrap gap-1 items-center">
            <a href={getLocalizedLink("/")} className="hover:text-primary">Inicio</a>
            <span>/</span>
            <a href={getLocalizedLink("/tulum-guia-completa")} className="hover:text-primary">Guía Tulum</a>
            <span>/</span>
            <span className="text-gray-900">Cómo Llegar</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 opacity-5 flex items-center justify-end pr-12 pointer-events-none">
          <Plane className="w-96 h-96 text-white rotate-12" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-10">
            <Badge className="bg-white/20 text-white border-white/30 mb-4 text-sm px-4 py-1">
              Aeropuerto CUN · 130 km de Tulum
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Cómo Llegar a Tulum
            </h1>
            <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto">
              Guía Completa 2026 · Vuelos, Transfers, Bus y Renta de Auto
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <div className="flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 text-white text-sm">
                <Plane className="w-4 h-4" />
                Vuelos desde $120 USD
              </div>
              <div className="flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 text-white text-sm">
                <Car className="w-4 h-4" />
                Transfer desde $50 USD
              </div>
              <div className="flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 text-white text-sm">
                <Bus className="w-4 h-4" />
                Bus ADO $15 USD
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Volar a CUN */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-4">
              <Plane className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Paso 1: Volar al Aeropuerto de Cancún (CUN)
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              El Aeropuerto Internacional de Cancún es el punto de entrada a Tulum. Busca vuelos directos desde tu ciudad.
            </p>
          </div>

          {/* Compact Flight Search */}
          <div className="max-w-3xl mx-auto mb-10">
            <Card className="shadow-xl border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Buscar vuelos baratos a Cancún (CUN)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div className="md:col-span-1">
                    <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Ciudad de origen</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Ej: MEX, JFK, MAD..."
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="pl-9"
                        onKeyDown={(e) => e.key === "Enter" && handleFlightSearch()}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Ida</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="pl-9"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Button
                      className="w-full bg-primary text-white hover:bg-primary/90 font-semibold"
                      onClick={handleFlightSearch}
                      disabled={isSearching || !origin.trim()}
                    >
                      {isSearching ? (
                        <><Clock className="w-4 h-4 mr-2 animate-spin" />Buscando...</>
                      ) : (
                        <><Search className="w-4 h-4 mr-2" />Buscar Vuelos</>
                      )}
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-400 text-center">
                  Powered by Aviasales · Comparador de vuelos en tiempo real
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Popular Routes */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {popularRoutes.map((route) => (
              <Card
                key={route.originCode}
                className="hover:shadow-md transition-all cursor-pointer group border border-gray-200 hover:border-primary/40"
                onClick={() => handleRouteClick(route.originCode)}
              >
                <CardContent className="p-4 text-center">
                  <span className="text-2xl mb-2 block">{route.flag}</span>
                  <p className="font-semibold text-sm text-gray-900 group-hover:text-primary transition-colors">
                    {route.originCity}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{route.originCode} → CUN</p>
                  <p className="text-sm font-bold text-primary mt-2">{route.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Del aeropuerto a Tulum */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-4">
              <MapPin className="w-7 h-7 text-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Paso 2: Del Aeropuerto de Cancún a Tulum
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              130 km separan CUN de Tulum. Estas son todas las opciones de transporte con precios reales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {transportOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card
                  key={option.id}
                  className={`border-2 transition-all hover:shadow-lg ${
                    option.recommended ? "border-primary" : "border-gray-200"
                  }`}
                >
                  {option.recommended && (
                    <div className="bg-primary text-white text-xs font-bold px-4 py-1.5 text-center rounded-t-md">
                      RECOMENDADO · Mejor relación calidad/precio
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          option.recommended ? "bg-primary/10" : "bg-gray-100"
                        }`}>
                          <Icon className={`w-6 h-6 ${option.recommended ? "text-primary" : "text-gray-600"}`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{option.title}</h3>
                          <Badge variant="outline" className="text-xs mt-0.5">
                            {option.highlight}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl text-gray-900">{option.price}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {option.duration}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{option.description}</p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <p className="text-xs font-semibold text-green-700 mb-1.5">Ventajas</p>
                        <ul className="space-y-1">
                          {option.pros.map((pro) => (
                            <li key={pro} className="text-xs text-gray-600 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-red-600 mb-1.5">Desventajas</p>
                        <ul className="space-y-1">
                          {option.cons.map((con) => (
                            <li key={con} className="text-xs text-gray-600 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {option.cta && option.isAffiliate && (
                      <Button
                        className={`w-full font-semibold ${
                          option.recommended
                            ? "bg-primary text-white hover:bg-primary/90"
                            : "bg-gray-800 text-white hover:bg-gray-700"
                        }`}
                        onClick={option.affiliateType === "transfer" ? handleTransferClick : handleCarClick}
                      >
                        {option.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}

                    {option.cta && !option.isAffiliate && (
                      <div className="bg-gray-50 rounded-md p-3 text-center">
                        <p className="text-sm font-medium text-gray-700">{option.cta}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Disponible en la Terminal 2 del aeropuerto CUN
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Desde otras ciudades */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-4">
              <NavigationIcon className="w-7 h-7 text-purple-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Desde Otras Ciudades de México
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ¿Ya estás en la Riviera Maya o en el sureste? Estas son las mejores opciones para llegar a Tulum.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cityRoutes.map((route) => (
              <Card key={route.city} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="text-3xl mb-3">{route.icon}</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{route.city}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {route.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {route.time}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {route.options.map((opt) => (
                      <div key={opt} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        {opt}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA for car rental */}
          <div className="mt-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center text-white">
            <Car className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Explora la Riviera Maya a tu ritmo</h3>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Con una renta de auto desde Cancún puedes visitar Tulum, Cobá, Bacalar, Playa del Carmen y más destinos en un solo viaje sin depender de horarios.
            </p>
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 font-bold px-8"
              onClick={handleCarClick}
            >
              Ver autos desde $35/día
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-xs text-gray-400 mt-3">Powered by DiscoverCars · +500 empresas comparadas</p>
          </div>
        </div>
      </section>

      {/* Trip Planner */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Planifica Todo tu Viaje a Tulum
            </h2>
            <p className="text-lg text-gray-600">
              Calcula el presupuesto total de tu viaje: vuelos, hotel, transporte y actividades.
            </p>
          </div>
          <TripPlanner />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-gray-600">
              Todo lo que necesitas saber para llegar a Tulum sin sorpresas.
            </p>
          </div>
          <FAQAccordion faqs={faqs} className="bg-gray-50 rounded-lg p-6" />
        </div>
      </section>

      {/* CrossSell */}
      <CrossSell
        exclude={["transporte"]}
        title="También necesitas para tu viaje a Tulum"
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-3">TulumTkts</h3>
          <p className="text-gray-400 mb-4 max-w-md mx-auto">
            Tu guía completa para viajar a Tulum: vuelos, hoteles, transfers y experiencias únicas.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <a href={getLocalizedLink("/")} className="hover:text-primary transition-colors">Inicio</a>
            <a href={getLocalizedLink("/vuelos")} className="hover:text-primary transition-colors">Vuelos</a>
            <a href={getLocalizedLink("/hoteles")} className="hover:text-primary transition-colors">Hoteles</a>
            <a href={getLocalizedLink("/transporte")} className="hover:text-primary transition-colors">Transporte</a>
            <a href={getLocalizedLink("/experiencias")} className="hover:text-primary transition-colors">Experiencias</a>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            &copy; {new Date().getFullYear()} TulumTkts. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
