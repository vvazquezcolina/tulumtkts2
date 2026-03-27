import { Navigation } from "@/components/ui/navigation";
import { SEOHead } from "@/components/seo-head";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CrossSell } from "@/components/cross-sell";
import { generateHotelLink, generateAffiliateLink, trackAffiliateClick } from "@/lib/affiliate";
import { useLocalizedLink } from "@/hooks/use-localized-link";
import { FAQSchema, FAQAccordion } from "@/components/faq-schema";
import { Star, MapPin, Wifi, UtensilsCrossed, Waves, TreePine, Heart, ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/contexts/i18n-context";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Hotel {
  id: string;
  name: string;
  stars: number;
  zone: string;
  priceFrom: string;
  priceLabel: string;
  description: string;
  highlights: string[];
  searchQuery: string;
}

const luxuryHotels: Hotel[] = [
  {
    id: "azulik",
    name: "Azulik",
    stars: 5,
    zone: "Zona Hotelera",
    priceFrom: "$500+",
    priceLabel: "USD/noche",
    description:
      "Resort ecologico sin electricidad con vistas al Caribe. Las cabanas de madera flotan entre la selva y el mar, conectadas por puentes colgantes. Su restaurante Kin Toh es una experiencia gastronomica suspendida entre las copas de los arboles.",
    highlights: ["Eco-lujo", "Sin electricidad", "Adultos only"],
    searchQuery: "Azulik+Tulum",
  },
  {
    id: "be-tulum",
    name: "Be Tulum",
    stars: 5,
    zone: "Zona Hotelera",
    priceFrom: "$400+",
    priceLabel: "USD/noche",
    description:
      "Spa boutique con playa privada y cenote propio. Su arquitectura boho-chic combina piedra local con diseno contemporaneo. Los tratamientos del spa usan rituales mayas ancestrales y productos organicos de la region.",
    highlights: ["Spa de lujo", "Cenote privado", "Playa privada"],
    searchQuery: "Be+Tulum",
  },
  {
    id: "habitas",
    name: "Habitas",
    stars: 5,
    zone: "Zona Hotelera",
    priceFrom: "$350+",
    priceLabel: "USD/noche",
    description:
      "Glamping de lujo rodeado de selva virgen. Las tiendas premium incluyen aire acondicionado, bano privado y terraza con hamaca. Su comunidad internacional organiza cenas bajo las estrellas, sesiones de yoga y musica en vivo.",
    highlights: ["Glamping premium", "Comunidad", "Yoga & wellness"],
    searchQuery: "Habitas+Tulum",
  },
  {
    id: "casa-malca",
    name: "Casa Malca",
    stars: 5,
    zone: "Zona Hotelera",
    priceFrom: "$400+",
    priceLabel: "USD/noche",
    description:
      "Coleccion de arte contemporaneo en una antigua mansion frente al mar. Obras de Banksy, KAWS y artistas internacionales decoran cada rincon. Su playa privada y piscina infinita completan una experiencia unica entre arte y naturaleza.",
    highlights: ["Arte contemporaneo", "Playa privada", "Historica"],
    searchQuery: "Casa+Malca+Tulum",
  },
  {
    id: "papaya-playa",
    name: "Papaya Playa Project",
    stars: 5,
    zone: "Zona Hotelera",
    priceFrom: "$300+",
    priceLabel: "USD/noche",
    description:
      "Beach club legendario con cabanas bohemias frente al Caribe. Famoso por sus fiestas de luna llena, noches de DJ y ambiente cosmopolita. Las cabanas van desde rusticas hasta suites de lujo, todas con vista al mar.",
    highlights: ["Beach club", "Fiestas luna llena", "Bohemio-chic"],
    searchQuery: "Papaya+Playa+Project+Tulum",
  },
];

const midRangeHotels: Hotel[] = [
  {
    id: "mia-tulum",
    name: "Mia Tulum",
    stars: 4,
    zone: "Tulum Pueblo",
    priceFrom: "$100",
    priceLabel: "USD/noche",
    description:
      "Boutique moderno en el corazon del pueblo con diseno colorido y piscina rodeada de vegetacion tropical. Ubicacion perfecta para caminar a restaurantes, tiendas y la vida nocturna de Tulum sin gastar en transporte.",
    highlights: ["Centrico", "Piscina", "Diseno moderno"],
    searchQuery: "Mia+Tulum",
  },
  {
    id: "alaya-tulum",
    name: "Alaya Tulum",
    stars: 4,
    zone: "Tulum Pueblo",
    priceFrom: "$120",
    priceLabel: "USD/noche",
    description:
      "Piscina infinita con vista a la selva y desayuno gourmet incluido cada manana. Las habitaciones combinan minimalismo con toques mayas y cada una tiene balcon privado. Excelente relacion calidad-precio para quienes buscan confort sin el precio de la zona hotelera.",
    highlights: ["Piscina infinita", "Desayuno incluido", "Balcon privado"],
    searchQuery: "Alaya+Tulum",
  },
  {
    id: "la-zebra",
    name: "La Zebra",
    stars: 4,
    zone: "Zona Hotelera",
    priceFrom: "$180",
    priceLabel: "USD/noche",
    description:
      "Restaurante premiado, salsa dancing los domingos y acceso directo a la playa. Uno de los pocos hoteles de gama media en la zona hotelera con autentica vibra mexicana. Sus tacos de pescado son legendarios en todo Tulum.",
    highlights: ["Restaurante premiado", "Frente al mar", "Salsa nights"],
    searchQuery: "La+Zebra+Tulum",
  },
  {
    id: "hip-hotel",
    name: "Hip Hotel",
    stars: 3,
    zone: "Tulum Pueblo",
    priceFrom: "$90",
    priceLabel: "USD/noche",
    description:
      "Bohemio con hamacas, jardin tropical exuberante y ambiente relajado que define el espiritu de Tulum. Las habitaciones son sencillas pero con encanto, decoradas con artesania local. Perfecto para viajeros que priorizan experiencia sobre lujo.",
    highlights: ["Bohemio", "Jardin tropical", "Hamacas"],
    searchQuery: "Hip+Hotel+Tulum",
  },
  {
    id: "coco-tulum",
    name: "Coco Tulum",
    stars: 4,
    zone: "Zona Hotelera",
    priceFrom: "$150",
    priceLabel: "USD/noche",
    description:
      "Cabanas frente al mar con estilo rustico-chic y vistas directas al Caribe. Despierta con el sonido de las olas y camina descalzo hasta la playa. Su bar de cocteles artesanales es el lugar perfecto para el atardecer.",
    highlights: ["Frente al mar", "Cabanas rusticas", "Bar de cocteles"],
    searchQuery: "Coco+Tulum",
  },
];

const budgetHotels: Hotel[] = [
  {
    id: "hotel-labnah",
    name: "Hotel Labnah",
    stars: 3,
    zone: "Tulum Pueblo",
    priceFrom: "$55",
    priceLabel: "USD/noche",
    description:
      "Limpio, centrico y con excelente staff que te ayuda a planificar tu viaje. Jardin tropical con piscina refrescante, habitaciones amplias con aire acondicionado y desayuno opcional. La mejor base economica para explorar Tulum.",
    highlights: ["Centrico", "Piscina", "Staff excepcional"],
    searchQuery: "Hotel+Labnah+Tulum",
  },
  {
    id: "mango-tulum",
    name: "Mango Tulum",
    stars: 3,
    zone: "Tulum Pueblo",
    priceFrom: "$45",
    priceLabel: "USD/noche",
    description:
      "Hostal boutique con alberca rodeada de palmeras y ambiente social perfecto para conocer otros viajeros. Habitaciones privadas y dormitorios disponibles. Organizan tours grupales a cenotes y noches de juegos.",
    highlights: ["Hostal boutique", "Alberca", "Social"],
    searchQuery: "Mango+Tulum",
  },
  {
    id: "quintana-roo-national",
    name: "Quintana Roo National",
    stars: 2,
    zone: "Tulum Pueblo",
    priceFrom: "$40",
    priceLabel: "USD/noche",
    description:
      "Lo basico bien hecho: habitaciones limpias, aire acondicionado funcional y ubicacion practica en el centro del pueblo. Sin pretensiones pero cumple perfectamente para viajeros que pasan el dia fuera explorando.",
    highlights: ["Economico", "A/C", "Ubicacion practica"],
    searchQuery: "Quintana+Roo+National+Tulum",
  },
  {
    id: "hotelito-tulum",
    name: "Hotelito Tulum",
    stars: 3,
    zone: "Tulum Pueblo",
    priceFrom: "$60",
    priceLabel: "USD/noche",
    description:
      "Encanto mexicano autentico con azulejos coloridos, patio interior con fuente y habitaciones decoradas con artesania local. Desayuno casero incluido con frutas tropicales, chilaquiles y cafe de Chiapas.",
    highlights: ["Encanto mexicano", "Desayuno casero", "Patio colonial"],
    searchQuery: "Hotelito+Tulum",
  },
  {
    id: "che-tulum",
    name: "Che Tulum",
    stars: 2,
    zone: "Tulum Pueblo",
    priceFrom: "$35",
    priceLabel: "USD/noche",
    description:
      "Hostal social para mochileros con dormitorios limpios, cocina compartida equipada y terraza con hamacas. Organizan noches de tacos, bar crawls y excursiones grupales. El lugar donde nacen las amistades viajeras.",
    highlights: ["Mochileros", "Cocina compartida", "Vida social"],
    searchQuery: "Che+Tulum+Hostel",
  },
];

const hotelZones = [
  {
    id: "zona-hotelera",
    name: "Zona Hotelera",
    description:
      "Franja costera de 7 km con eco-resorts de lujo, playa privada y cenotes. La experiencia Tulum por excelencia: despierta frente al Caribe.",
    priceRange: "$150 - $800+/noche",
    searchSlug: "Tulum+Hotel+Zone",
    icon: Waves,
  },
  {
    id: "tulum-pueblo",
    name: "Tulum Pueblo",
    description:
      "Centro local con restaurantes, mercados y vida nocturna. La opcion mas economica y practica con facil acceso a todo.",
    priceRange: "$35 - $150/noche",
    searchSlug: "Tulum+Town",
    icon: UtensilsCrossed,
  },
  {
    id: "zona-arqueologica",
    name: "Zona Arqueologica",
    description:
      "Cerca de las ruinas mayas con ambiente tranquilo y exclusivo. Ideal para amantes de la historia y la naturaleza.",
    priceRange: "$70 - $250/noche",
    searchSlug: "Tulum+Archaeological+Zone",
    icon: TreePine,
  },
  {
    id: "sian-kaan",
    name: "Sian Ka'an",
    description:
      "Reserva de la biosfera UNESCO. Eco-lujo extremo, fauna salvaje y lagunas turquesa en aislamiento total.",
    priceRange: "$250 - $800+/noche",
    searchSlug: "Sian+Kaan",
    icon: Heart,
  },
];

const bookingTips = [
  {
    title: "Reserva con 3-6 meses de anticipacion",
    description:
      "En temporada alta (diciembre a abril) los mejores hoteles se agotan rapido. Reservar con anticipacion garantiza mejor precio y la habitacion que realmente quieres.",
  },
  {
    title: "Temporada baja = precios hasta 50% menos",
    description:
      "De mayo a octubre los precios bajan dramaticamente. Muchos hoteles de lujo que normalmente cuestan $500+ bajan a $250-300. El clima sigue siendo calido y hay menos turistas.",
  },
  {
    title: "Zona Hotelera vs Pueblo: elige bien",
    description:
      "Si tu prioridad es playa y relax, elige la Zona Hotelera. Si prefieres restaurantes, vida nocturna y ahorrar dinero, Tulum Pueblo es mejor opcion. Puedes llegar a la playa en bicicleta en 15 minutos.",
  },
  {
    title: "Siempre filtra por cancelacion gratuita",
    description:
      "Los planes cambian. Reserva hoteles con cancelacion gratuita hasta 24-48h antes. Hotellook muestra esta opcion claramente y te permite cambiar sin penalizacion.",
  },
];

const faqs = [
  {
    question: "¿Cual es el mejor hotel de Tulum en 2026?",
    answer:
      "Azulik es consistentemente el hotel mejor valorado de Tulum, con su concepto unico de eco-lujo sin electricidad. Para relacion calidad-precio, La Zebra destaca por su restaurante premiado y acceso a playa. Si buscas algo economico, Hotel Labnah ofrece la mejor experiencia en Tulum Pueblo.",
  },
  {
    question: "¿Cuanto cuesta una noche de hotel en Tulum?",
    answer:
      "Los precios varian enormemente segun zona y temporada. Tulum Pueblo: desde $35-150/noche. Zona Hotelera: desde $150-800+/noche. Sian Ka'an: desde $250-800+/noche. En temporada baja (mayo-octubre) los precios bajan entre 30-50%.",
  },
  {
    question: "¿Es mejor hospedarse en la Zona Hotelera o en el Pueblo?",
    answer:
      "Depende de tu estilo de viaje. La Zona Hotelera ofrece playa privada, eco-resorts y tranquilidad, pero es cara y aislada. El Pueblo tiene restaurantes, vida nocturna, mercados y precios mucho mas accesibles. Muchos viajeros eligen el Pueblo y van a la playa en bicicleta (15 min).",
  },
  {
    question: "¿Cuando es la mejor epoca para reservar hotel en Tulum?",
    answer:
      "Para precios bajos: mayo a octubre (excepto Semana Santa). Para mejor clima: noviembre a abril. El sweet spot es noviembre y principios de diciembre: buen clima, precios razonables y menos multitudes que en temporada alta plena (dic-ene).",
  },
  {
    question: "¿Los hoteles en Tulum tienen wifi y electricidad?",
    answer:
      "La mayoria si, pero algunos eco-resorts de lujo como Azulik funcionan sin electricidad a proposito (usan velas y ventilacion natural). El wifi en la Zona Hotelera puede ser limitado en algunos hoteles boutique. En Tulum Pueblo la conectividad es buena. Consulta resenas recientes sobre wifi si trabajas remotamente.",
  },
];

// ─── Helper ────────────────────────────────────────────────────────────────────

function buildHotellookUrl(destination: string, checkIn?: string, checkOut?: string, guests?: string): string {
  const base = "https://search.hotellook.com/";
  const params = new URLSearchParams({ destination });
  if (checkIn) params.set("checkIn", checkIn);
  if (checkOut) params.set("checkOut", checkOut);
  if (guests) params.set("adults", guests);
  return `${base}?${params.toString()}`;
}

function buildHotelAffiliate(destination: string, checkIn?: string, checkOut?: string, guests?: string): string {
  const target = buildHotellookUrl(destination, checkIn, checkOut, guests);
  return generateAffiliateLink(target, "hotellook", `mejores_hotels_${destination.replace(/\s+/g, "_")}`);
}

// ─── Star Renderer ─────────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < count ? "text-yellow-400 fill-current" : "text-gray-200 fill-current"
          }`}
        />
      ))}
    </div>
  );
}

// ─── Hotel Card ────────────────────────────────────────────────────────────────

function HotelCard({
  hotel,
  rank,
  checkIn,
  checkOut,
  guests,
}: {
  hotel: Hotel;
  rank: number;
  checkIn: string;
  checkOut: string;
  guests: string;
}) {
  const { t } = useI18n();
  const handleClick = () => {
    trackAffiliateClick("hotellook", hotel.name, hotel.priceFrom, "mejores_hoteles");
    const url = buildHotelAffiliate(hotel.searchQuery, checkIn || undefined, checkOut || undefined, guests);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Left: Rank + Info */}
          <div className="flex-1 p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {rank}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                  {hotel.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating count={hotel.stars} />
                  <span className="text-xs text-gray-400">|</span>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <MapPin className="w-3 h-3" />
                    <span>{hotel.zone}</span>
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xl font-bold text-teal-600">{hotel.priceFrom}</div>
                <div className="text-xs text-gray-400">{hotel.priceLabel}</div>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {hotel.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {hotel.highlights.map((h) => (
                <Badge key={h} className="bg-teal-50 text-teal-700 text-xs border-0 font-medium">
                  {h}
                </Badge>
              ))}
            </div>

            <Button
              onClick={handleClick}
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold"
            >
              {t('hoteles.featured.viewPrices')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MejoresHoteles() {
  const { t } = useI18n();
  const { getLocalizedLink } = useLocalizedLink();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://tulumtkts.com";

  const handleHeroSearch = () => {
    trackAffiliateClick("hotellook", "Hero Search", "0", "mejores_hoteles_search");
    const url = buildHotelAffiliate("Tulum", checkIn || undefined, checkOut || undefined, guests);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleZoneSearch = (slug: string) => {
    trackAffiliateClick("hotellook", slug, "0", "mejores_hoteles_zona");
    const url = buildHotelAffiliate(slug, checkIn || undefined, checkOut || undefined, guests);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Los 15 Mejores Hoteles en Tulum 2026 - Guia Definitiva | TulumTkts"
        description="Descubre los 15 mejores hoteles en Tulum para 2026: eco-resorts de lujo como Azulik, boutiques con encanto y hostales economicos. Comparativa con precios, zonas y consejos para reservar."
        keywords={[
          "mejores hoteles tulum",
          "mejores hoteles en tulum",
          "best hotels tulum",
          "hoteles tulum 2026",
          "donde hospedarse en tulum",
          "hoteles lujo tulum",
          "hoteles baratos tulum",
          "hoteles tulum zona hotelera",
          "hoteles tulum pueblo",
          "azulik tulum",
          "be tulum hotel",
          "top hotels tulum mexico",
          "hoteles boutique tulum",
          "eco resort tulum",
          "alojamiento tulum",
        ]}
        canonicalUrl={`${siteUrl}/mejores-hoteles-tulum`}
        ogType="article"
        articlePublishedTime="2026-01-15T08:00:00Z"
        articleModifiedTime="2026-03-20T10:00:00Z"
        articleSection="Hoteles"
        currentPath="/mejores-hoteles-tulum"
      />

      <FAQSchema faqs={faqs} />

      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600">
            <a href={getLocalizedLink("/")} className="hover:text-teal-600">
              Inicio
            </a>
            <span className="mx-2">/</span>
            <a href={getLocalizedLink("/hoteles")} className="hover:text-teal-600">
              Hoteles
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Mejores Hoteles 2026</span>
          </nav>
        </div>
      </div>

      {/* ── Hero + Search ── */}
      <section className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <Badge className="bg-white/20 text-white border-0 text-sm font-medium mb-4 backdrop-blur-sm">
            {t('mejoresHoteles.badge')}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {t('mejoresHoteles.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto">
            {t('mejoresHoteles.hero.subtitle')}
          </p>

          {/* Search Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              {/* Check-in */}
              <div className="space-y-1 text-left">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {t('mejoresHoteles.search.checkIn')}
                </label>
                <Input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="text-sm"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Check-out */}
              <div className="space-y-1 text-left">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {t('mejoresHoteles.search.checkOut')}
                </label>
                <Input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="text-sm"
                  min={checkIn || new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Guests */}
              <div className="space-y-1 text-left">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {t('mejoresHoteles.search.guests')}
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={String(n)}>
                      {n} {n === 1 ? t('mejoresHoteles.search.guestSingular') : t('mejoresHoteles.search.guestPlural')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <Button
                onClick={handleHeroSearch}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold h-10"
              >
                <Search className="w-4 h-4 mr-2" />
                {t('mejoresHoteles.search.button')}
              </Button>
            </div>

            <p className="text-xs text-gray-400 mt-3 text-center">
              {t('mejoresHoteles.search.caption')}
            </p>
          </div>
        </div>
      </section>

      {/* ── Top 5 Lujo ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-amber-100 text-amber-700 border-0 text-sm font-medium mb-3">
              {t('mejoresHoteles.luxury.badge')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t('mejoresHoteles.luxury.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('mejoresHoteles.luxury.subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            {luxuryHotels.map((hotel, i) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                rank={i + 1}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Top 5 Calidad-Precio ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-teal-100 text-teal-700 border-0 text-sm font-medium mb-3">
              {t('mejoresHoteles.midRange.badge')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t('mejoresHoteles.midRange.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('mejoresHoteles.midRange.subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            {midRangeHotels.map((hotel, i) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                rank={i + 6}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Top 5 Economicos ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-green-100 text-green-700 border-0 text-sm font-medium mb-3">
              {t('mejoresHoteles.budget.badge')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t('mejoresHoteles.budget.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('mejoresHoteles.budget.subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            {budgetHotels.map((hotel, i) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                rank={i + 11}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Por Zona ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t('mejoresHoteles.zones.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('mejoresHoteles.zones.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotelZones.map((zone) => (
              <Card
                key={zone.id}
                className="overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer border-0"
                onClick={() => handleZoneSearch(zone.searchSlug)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                      <zone.icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">
                        {zone.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">
                        {zone.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs font-semibold">
                          {zone.priceRange}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 font-semibold text-xs p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleZoneSearch(zone.searchSlug);
                          }}
                        >
                          {t('mejoresHoteles.zones.viewHotels')}
                          <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tips ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t('mejoresHoteles.tips.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('mejoresHoteles.tips.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookingTips.map((tip, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t('mejoresHoteles.faq.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('mejoresHoteles.faq.subtitle')}
            </p>
          </div>

          <FAQAccordion
            faqs={faqs}
            className="bg-white rounded-2xl p-6 shadow-sm"
          />
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 bg-gradient-to-r from-teal-700 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('mejoresHoteles.cta.title')}
          </h2>
          <p className="text-teal-100 text-lg mb-8 max-w-xl mx-auto">
            {t('mejoresHoteles.cta.subtitle')}
          </p>
          <Button
            size="lg"
            onClick={handleHeroSearch}
            className="bg-white text-teal-700 hover:bg-gray-100 font-semibold px-8 text-base"
          >
            <Search className="w-5 h-5 mr-2" />
            {t('mejoresHoteles.cta.button')}
          </Button>
        </div>
      </section>

      {/* ── Cross Sell ── */}
      <CrossSell
        exclude={["hoteles", "mejoresHoteles"]}
        items={["vuelos", "experiencias", "transporte", "comoLlegar"]}
        title="Completa tu viaje a Tulum"
      />
      <Footer />
    </div>
  );
}
