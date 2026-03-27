import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/ui/navigation";
import { SEOHead } from "@/components/seo-head";
import { WebsiteSchema } from "@/components/json-ld";
import { FAQSchema, FAQAccordion } from "@/components/faq-schema";
import { useI18n } from "@/contexts/i18n-context";
import { useLocalizedLink } from "@/hooks/use-localized-link";
import { generateAffiliateLink } from "@/lib/affiliate";
import {
  Search,
  Star,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  CheckCircle,
  Clock,
  TrendingDown,
  Shield,
  Plane,
  Car,
  Zap,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const hotelZones = [
  {
    id: "zona-hotelera",
    name: "Zona Hotelera de Tulum",
    description:
      "La franja costera con los eco-resorts de lujo frente al Caribe. Perfecta si quieres playa privada, cenotes secretos y la mejor puesta de sol de México.",
    priceFrom: "$200",
    unit: "/noche",
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    highlights: ["Playa privada", "Eco-resorts", "Vista al mar", "Cenotes privados"],
    searchSlug: "Tulum+Hotel+Zone",
  },
  {
    id: "tulum-pueblo",
    name: "Tulum Pueblo",
    description:
      "El corazón local: calles animadas, restaurantes impresionantes, vida nocturna y mercados artesanales. Ideal para presupuestos ajustados o si quieres moverte fácil.",
    priceFrom: "$50",
    unit: "/noche",
    image:
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    highlights: ["Restaurantes", "Nightlife", "Mercados", "Económico"],
    searchSlug: "Tulum+Town",
  },
  {
    id: "zona-arqueologica",
    name: "Zona Arqueológica",
    description:
      "A pasos de las ruinas mayas con vistas al mar. Tranquila y exclusiva, perfecta para escapar del bullicio y despertarte con historia.",
    priceFrom: "$80",
    unit: "/noche",
    image:
      "https://images.unsplash.com/photo-1518638150340-f706e86654de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    highlights: ["Ruinas mayas", "Tranquilidad", "Historia", "Vista panorámica"],
    searchSlug: "Tulum+Archaeological+Zone",
  },
  {
    id: "sian-kaan",
    name: "Sian Ka'an",
    description:
      "Reserva de la biosfera y Patrimonio de la Humanidad. Eco-lujo extremo, fauna salvaje y lagunas azul turquesa lejos de todo. Solo para los más aventureros.",
    priceFrom: "$300",
    unit: "/noche",
    image:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    highlights: ["Eco-lujo", "Reserva natural", "Fauna silvestre", "Aislamiento total"],
    searchSlug: "Sian+Kaan",
  },
];

const featuredHotels = [
  {
    id: "azulik",
    name: "Azulik",
    zone: "Zona Hotelera",
    stars: 5,
    priceRange: "$500+/noche",
    description: "Resort de lujo ecológico con vistas al Caribe. Cabañas sobre la selva y el mar, gastronomía de autor y spa holístico.",
    image:
      "https://images.unsplash.com/photo-1571041804726-53e8bf082096?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    tags: ["Eco-lujo", "Adultos", "Playa privada"],
    searchQuery: "Azulik+Tulum",
  },
  {
    id: "be-tulum",
    name: "Be Tulum",
    zone: "Zona Hotelera",
    stars: 5,
    priceRange: "$400+/noche",
    description: "Spa boutique con playa privada. Arquitectura boho-chic, tratamientos ancestrales y cocina orgánica frente al Caribe.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    tags: ["Boutique", "Spa", "Adultos"],
    searchQuery: "Be+Tulum",
  },
  {
    id: "habitas-tulum",
    name: "Habitas Tulum",
    zone: "Zona Hotelera",
    stars: 4,
    priceRange: "$300+/noche",
    description: "Experiencia glamping de lujo en la selva. Tents premium con aire acondicionado, piscina y comunidad internacional.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    tags: ["Glamping", "Comunidad", "Selva"],
    searchQuery: "Habitas+Tulum",
  },
  {
    id: "mia-tulum",
    name: "Mia Tulum",
    zone: "Tulum Pueblo",
    stars: 3,
    priceRange: "$80/noche",
    description: "Hotel boutique en el centro. Diseño colorido, piscina, y ubicación perfecta para explorar restaurantes y cenotes.",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    tags: ["Céntrico", "Boutique", "Relación calidad-precio"],
    searchQuery: "Mia+Tulum",
  },
  {
    id: "hotel-labnah",
    name: "Hotel Labnah",
    zone: "Tulum Pueblo",
    stars: 3,
    priceRange: "$60/noche",
    description: "Excelente relación calidad-precio. Jardín tropical, piscina refrescante y personal atento a pocos pasos del centro.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    tags: ["Económico", "Jardín", "Piscina"],
    searchQuery: "Hotel+Labnah+Tulum",
  },
  {
    id: "casa-malca",
    name: "Casa Malca",
    zone: "Zona Hotelera",
    stars: 5,
    priceRange: "$350+/noche",
    description: "Arte y lujo frente al mar. Antigua mansión de Pablo Escobar convertida en hotel boutique con playa privada y arte contemporáneo.",
    image:
      "https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    tags: ["Arte", "Historia", "Playa privada"],
    searchQuery: "Casa+Malca+Tulum",
  },
];

const bookingTips = [
  {
    icon: <Clock className="w-6 h-6 text-primary" />,
    title: "Reserva con 3-6 meses de anticipación",
    description:
      "La temporada alta (diciembre–abril) se agota rápido, especialmente en Navidad y Semana Santa. Reservar con anticipación te asegura mejor precio y disponibilidad.",
  },
  {
    icon: <TrendingDown className="w-6 h-6 text-primary" />,
    title: "Temporada baja: hasta 50% de descuento",
    description:
      "Mayo–octubre es temporada baja (excepto Semana Santa). Los precios bajan drásticamente aunque el clima sigue siendo bueno. Ideal para viajeros con presupuesto ajustado.",
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Siempre reserva con cancelación gratuita",
    description:
      "Los planes cambian. Filtra siempre por hoteles con cancelación gratuita hasta 24-48h antes. Hotellook muestra esta opción claramente en todos sus resultados.",
  },
  {
    icon: <MapPin className="w-6 h-6 text-primary" />,
    title: "Presupuesto por zona",
    description:
      "Zona Hotelera: $150–$600+/noche. Tulum Pueblo: $40–$120/noche. Zona Arqueológica: $70–$250/noche. Sian Ka'an: $250–$800+/noche.",
  },
];

// ─── Helper ────────────────────────────────────────────────────────────────────

function buildHotellookUrl(destination: string, checkIn?: string, checkOut?: string, adults?: string): string {
  const base = "https://search.hotellook.com/";
  const params = new URLSearchParams({ destination });
  if (checkIn) params.set("checkIn", checkIn);
  if (checkOut) params.set("checkOut", checkOut);
  if (adults) params.set("adults", adults);
  return `${base}?${params.toString()}`;
}

function buildHotelAffiliate(destination: string, checkIn?: string, checkOut?: string, adults?: string): string {
  const target = buildHotellookUrl(destination, checkIn, checkOut, adults);
  return generateAffiliateLink(target, "hotellook", `hotels_${destination.replace(/\s+/g, "_")}`);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hoteles() {
  const { t } = useI18n();
  const { getLocalizedLink } = useLocalizedLink();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://tulumtkts.com";

  const handleSearch = () => {
    const url = buildHotelAffiliate("Tulum", checkIn || undefined, checkOut || undefined, guests);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleZoneSearch = (slug: string) => {
    const url = buildHotelAffiliate(slug, checkIn || undefined, checkOut || undefined, guests);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleHotelSearch = (query: string) => {
    const url = buildHotelAffiliate(query, checkIn || undefined, checkOut || undefined, guests);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Hoteles en Tulum - Encuentra el Mejor Alojamiento | TulumTkts"
        description="Busca y compara hoteles en Tulum. Eco-resorts de lujo en la Zona Hotelera, boutiques económicos en el pueblo y retiros en la selva. Precios desde $50/noche con cancelación gratuita."
        keywords={[
          "hoteles tulum",
          "hoteles en tulum",
          "tulum hotels",
          "hoteles zona hotelera tulum",
          "hoteles tulum pueblo",
          "eco resort tulum",
          "hoteles tulum baratos",
          "best hotels tulum",
          "alojamiento tulum",
          "hoteles tulum mexico",
          "hoteles tulum playa",
          "hoteles lujo tulum",
          "azulik tulum",
          "be tulum hotel",
        ]}
        canonicalUrl={`${siteUrl}/hoteles`}
        ogType="website"
        currentPath="/hoteles"
      />
      <WebsiteSchema siteUrl={siteUrl} siteName="TulumTkts" />

      <FAQSchema
        faqs={[
          {
            question: "¿Cuánto cuesta un hotel en Tulum?",
            answer:
              "Los precios varían mucho según la zona y temporada. En Tulum Pueblo puedes encontrar hoteles desde $50–$120/noche. En la Zona Hotelera los eco-resorts de lujo cuestan entre $200 y $600+/noche. En Sian Ka'an los precios oscilan entre $300 y $800+/noche. La temporada alta (diciembre–abril) es entre un 30 y 80% más cara que la baja.",
          },
          {
            question: "¿Cuál es la mejor zona para hospedarse en Tulum?",
            answer:
              "Depende de tu presupuesto y estilo de viaje. La Zona Hotelera es ideal para lujo y playa privada. Tulum Pueblo es la mejor opción si buscas acceso a restaurantes, tiendas y vida nocturna con precios más asequibles. La Zona Arqueológica ofrece tranquilidad y acceso a las ruinas. Sian Ka'an es perfecta para el eco-turismo y la desconexión total.",
          },
          {
            question: "¿Con cuánta anticipación debo reservar hotel en Tulum?",
            answer:
              "Para temporada alta (diciembre–abril, especialmente Navidad y Semana Santa) se recomienda reservar entre 3 y 6 meses antes. Para temporada baja (mayo–octubre) puedes encontrar disponibilidad con 4–6 semanas de antelación. Siempre reserva con cancelación gratuita para tener flexibilidad.",
          },
          {
            question: "¿Hay hoteles con todo incluido en Tulum?",
            answer:
              "Tulum tiene muy pocos hoteles todo incluido tradicionales, ya que la filosofía de la zona prioriza el eco-turismo boutique. La mayoría de hoteles en la Zona Hotelera cobran el desayuno o lo incluyen. Algunos eco-resorts como Azulik ofrecen paquetes que incluyen todas las comidas en sus restaurantes de autor.",
          },
          {
            question: "¿Cuándo es la temporada baja en Tulum?",
            answer:
              "La temporada baja en Tulum es de mayo a mediados de noviembre. Los precios bajan entre un 30 y 50% respecto a la temporada alta. El clima sigue siendo cálido aunque con más lluvia (especialmente septiembre–octubre). Es el mejor momento para encontrar ofertas en hoteles de lujo que normalmente están fuera de presupuesto.",
          },
          {
            question: "¿Los hoteles de Tulum tienen playa privada?",
            answer:
              "Solo los hoteles de la Zona Hotelera tienen acceso directo a la playa. Legalmente, todas las playas en México son públicas, pero los hoteles de playa gestionan su tramo con camastros y servicios exclusivos para huéspedes. Los hoteles en Tulum Pueblo no tienen playa propia pero suelen ofrecer traslados o estar a pocos minutos en bicicleta.",
          },
        ]}
      />

      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600">
            <a href={getLocalizedLink("/")} className="hover:text-primary">
              Inicio
            </a>
            <span className="mx-2">/</span>
            <a href={getLocalizedLink("/tulum-guia-completa")} className="hover:text-primary">
              Guía de Tulum
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Hoteles</span>
          </nav>
        </div>
      </div>

      {/* ── Hero + Search ── */}
      <section className="relative bg-gradient-to-br from-teal-800 via-primary to-secondary overflow-hidden">
        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Hoteles en Tulum
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Encuentra el alojamiento perfecto: desde eco-resorts de lujo frente al mar hasta boutiques
            con encanto en el corazón del pueblo.
          </p>

          {/* Search Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Check-in */}
              <div className="space-y-1 text-left">
                <Label htmlFor="checkin" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Entrada
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  <Input
                    id="checkin"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="pl-9 text-sm"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="space-y-1 text-left">
                <Label htmlFor="checkout" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Salida
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  <Input
                    id="checkout"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="pl-9 text-sm"
                    min={checkIn || new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="space-y-1 text-left">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Huéspedes
                </Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="text-sm">
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    <SelectValue placeholder="Huéspedes" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n} {n === 1 ? "huésped" : "huéspedes"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <div className="space-y-1">
                <div className="h-5" aria-hidden="true" />
                <Button
                  onClick={handleSearch}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm h-10"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Buscar hoteles
                </Button>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-3 text-center">
              Comparamos precios en cientos de webs. Sin cargos extra al reservar.
            </p>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="bg-white border-b py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Cancelación gratuita disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Pago seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-500" />
              <span>Confirmación instantánea</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>+500 hoteles en Tulum</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Zonas ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Zonas para hospedarse
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tulum tiene varias áreas con carácter propio. Elige la que mejor encaje con tu estilo de viaje.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotelZones.map((zone) => (
              <Card
                key={zone.id}
                className="overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer border-0"
                onClick={() => handleZoneSearch(zone.searchSlug)}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={zone.image}
                    alt={zone.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{zone.name}</h3>
                    <div className="flex items-center gap-1 text-white/90 text-sm">
                      <span className="font-semibold">desde {zone.priceFrom}</span>
                      <span className="text-white/70">{zone.unit}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{zone.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {zone.highlights.map((h) => (
                      <Badge key={h} variant="outline" className="text-xs">
                        {h}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white group-hover:shadow-md transition-shadow"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleZoneSearch(zone.searchSlug);
                    }}
                  >
                    Ver hoteles en esta zona
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hoteles Destacados ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Hoteles destacados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Una selección de los mejores alojamientos en Tulum para todos los estilos y presupuestos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHotels.map((hotel) => (
              <Card
                key={hotel.id}
                className="overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => handleHotelSearch(hotel.searchQuery)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
                    }}
                  />
                  {/* Stars badge */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-semibold text-gray-800">{hotel.stars} estrellas</span>
                    </div>
                  </div>
                  {/* Price badge */}
                  <div className="absolute bottom-3 right-3">
                    <div className="bg-primary text-white text-xs font-bold rounded-lg px-2 py-1">
                      desde {hotel.priceRange}
                    </div>
                  </div>
                </div>

                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {hotel.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{hotel.zone}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {hotel.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {hotel.tags.map((tag) => (
                      <Badge key={tag} className="bg-primary/10 text-primary text-xs border-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Star rating display */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < hotel.stars ? "text-yellow-400 fill-current" : "text-gray-200 fill-current"
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleHotelSearch(hotel.searchQuery);
                    }}
                  >
                    Ver precios
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA to see all hotels */}
          <div className="text-center mt-10">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8"
              onClick={() => handleSearch()}
            >
              Ver todos los hoteles en Tulum
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── Consejos ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Consejos para reservar
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lo que necesitas saber antes de reservar tu hotel en Tulum para sacar el máximo provecho
              a tu presupuesto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookingTips.map((tip, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Season comparison table */}
          <div className="mt-10 bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="grid grid-cols-3 text-center">
              <div className="p-4 bg-gray-50 border-r border-b">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Temporada</span>
              </div>
              <div className="p-4 bg-gray-50 border-r border-b">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Meses</span>
              </div>
              <div className="p-4 bg-gray-50 border-b">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Precio relativo</span>
              </div>

              <div className="p-4 border-r border-b">
                <Badge className="bg-orange-100 text-orange-700 border-0">Alta</Badge>
              </div>
              <div className="p-4 border-r border-b text-sm text-gray-700">Dic – Abr</div>
              <div className="p-4 border-b text-sm font-semibold text-gray-900">+++</div>

              <div className="p-4 border-r border-b">
                <Badge className="bg-yellow-100 text-yellow-700 border-0">Media</Badge>
              </div>
              <div className="p-4 border-r border-b text-sm text-gray-700">May – Jul</div>
              <div className="p-4 border-b text-sm font-semibold text-gray-900">++</div>

              <div className="p-4 border-r">
                <Badge className="bg-green-100 text-green-700 border-0">Baja</Badge>
              </div>
              <div className="p-4 border-r text-sm text-gray-700">Ago – Nov</div>
              <div className="p-4 text-sm font-semibold text-green-700">+ (mejor precio)</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Preguntas frecuentes sobre hoteles en Tulum
            </h2>
            <p className="text-lg text-gray-600">
              Todo lo que necesitas saber antes de reservar tu alojamiento.
            </p>
          </div>

          <FAQAccordion
            faqs={[
              {
                question: "¿Cuánto cuesta un hotel en Tulum?",
                answer:
                  "Los precios varían mucho según la zona y temporada. En Tulum Pueblo puedes encontrar hoteles desde $50–$120/noche. En la Zona Hotelera los eco-resorts de lujo cuestan entre $200 y $600+/noche. En Sian Ka'an los precios oscilan entre $300 y $800+/noche. La temporada alta (diciembre–abril) es entre un 30 y 80% más cara que la baja.",
              },
              {
                question: "¿Cuál es la mejor zona para hospedarse en Tulum?",
                answer:
                  "Depende de tu presupuesto y estilo de viaje. La Zona Hotelera es ideal para lujo y playa privada. Tulum Pueblo es la mejor opción si buscas acceso a restaurantes, tiendas y vida nocturna con precios más asequibles. La Zona Arqueológica ofrece tranquilidad y acceso a las ruinas. Sian Ka'an es perfecta para el eco-turismo y la desconexión total.",
              },
              {
                question: "¿Con cuánta anticipación debo reservar hotel en Tulum?",
                answer:
                  "Para temporada alta (diciembre–abril, especialmente Navidad y Semana Santa) se recomienda reservar entre 3 y 6 meses antes. Para temporada baja (mayo–octubre) puedes encontrar disponibilidad con 4–6 semanas de antelación. Siempre reserva con cancelación gratuita para tener flexibilidad.",
              },
              {
                question: "¿Hay hoteles con todo incluido en Tulum?",
                answer:
                  "Tulum tiene muy pocos hoteles todo incluido tradicionales, ya que la filosofía de la zona prioriza el eco-turismo boutique. La mayoría de hoteles en la Zona Hotelera cobran el desayuno o lo incluyen. Algunos eco-resorts como Azulik ofrecen paquetes que incluyen todas las comidas en sus restaurantes de autor.",
              },
              {
                question: "¿Cuándo es la temporada baja en Tulum?",
                answer:
                  "La temporada baja en Tulum es de mayo a mediados de noviembre. Los precios bajan entre un 30 y 50% respecto a la temporada alta. El clima sigue siendo cálido aunque con más lluvia (especialmente septiembre–octubre). Es el mejor momento para encontrar ofertas en hoteles de lujo que normalmente están fuera de presupuesto.",
              },
              {
                question: "¿Los hoteles de Tulum tienen playa privada?",
                answer:
                  "Solo los hoteles de la Zona Hotelera tienen acceso directo a la playa. Legalmente, todas las playas en México son públicas, pero los hoteles de playa gestionan su tramo con camastros y servicios exclusivos para huéspedes. Los hoteles en Tulum Pueblo no tienen playa propia pero suelen ofrecer traslados o estar a pocos minutos en bicicleta.",
              },
            ]}
            className="bg-gray-50 rounded-2xl p-6 shadow-sm"
          />
        </div>
      </section>

      {/* ── Cross-sell CTA ── */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Completa tu viaje</h2>
            <p className="text-lg text-gray-600">
              Tu hotel ya está listo. Ahora prepara el resto de tu aventura en Tulum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vuelos */}
            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <a href={getLocalizedLink("/vuelos")} className="block">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <Plane className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    Busca vuelos baratos
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Compara precios a Cancún desde tu ciudad y ahorra en tu vuelo a Tulum.
                  </p>
                  <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">
                    Hasta 40% de descuento
                  </Badge>
                </CardContent>
              </a>
            </Card>

            {/* Experiencias */}
            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <a href={getLocalizedLink("/experiencias")} className="block">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <Star className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    Explora actividades
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Cenotes, ruinas mayas, snorkel y tours. Todo lo que puedes hacer en Tulum.
                  </p>
                  <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                    +200 experiencias
                  </Badge>
                </CardContent>
              </a>
            </Card>

            {/* Transporte */}
            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <a href={getLocalizedLink("/transporte")} className="block">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                    <Car className="w-7 h-7 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    Reserva tu transfer
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Traslados privados desde el aeropuerto de Cancún y renta de autos en Tulum.
                  </p>
                  <Badge className="bg-orange-100 text-orange-700 border-0 text-xs">
                    Desde $65 USD
                  </Badge>
                </CardContent>
              </a>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
