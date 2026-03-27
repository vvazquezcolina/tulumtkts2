import { Footer } from "@/components/footer";
import { CrossSell } from "@/components/cross-sell";
import { Navigation } from "@/components/ui/navigation";
import { SEOHead } from "@/components/seo-head";
import { WebsiteSchema, BreadcrumbSchema } from "@/components/json-ld";
import { FAQSchema, FAQAccordion } from "@/components/faq-schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MapPin,
  Users,
  Star,
  CheckCircle,
  Calendar,
  DollarSign,
  Sparkles,
  Waves,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { useI18n } from "@/contexts/i18n-context";
import { useLocalizedLink } from "@/hooks/use-localized-link";
import { generateHotelLink, trackAffiliateClick } from "@/lib/affiliate";

const venues = [
  {
    name: "Papaya Playa Project",
    capacity: "Up to 200 guests",
    priceRange: "$$$",
    style: "Bohemian Beach",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Ahau Tulum",
    capacity: "Up to 150 guests",
    priceRange: "$$$$",
    style: "Eco-Luxury",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Be Tulum",
    capacity: "Up to 100 guests",
    priceRange: "$$$$",
    style: "Modern Luxury",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "La Zebra",
    capacity: "Up to 80 guests",
    priceRange: "$$$",
    style: "Rustic Beach",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Nomade Tulum",
    capacity: "Up to 120 guests",
    priceRange: "$$$$",
    style: "Spiritual & Boho",
    image:
      "https://images.unsplash.com/photo-1530023367847-a683933f4172?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Dreams Tulum",
    capacity: "Up to 300 guests",
    priceRange: "$$$",
    style: "All-Inclusive Resort",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
];

const whyFeatures = [
  {
    icon: <Waves className="w-7 h-7 text-rose-400" />,
    titleKey: "beachTitle",
    descKey: "beachDesc",
  },
  {
    icon: <Sparkles className="w-7 h-7 text-pink-400" />,
    titleKey: "ecoTitle",
    descKey: "ecoDesc",
  },
  {
    icon: <Star className="w-7 h-7 text-rose-400" />,
    titleKey: "weatherTitle",
    descKey: "weatherDesc",
  },
  {
    icon: <MapPin className="w-7 h-7 text-pink-400" />,
    titleKey: "accessTitle",
    descKey: "accessDesc",
  },
];

const honeymoonExperiences = [
  {
    emoji: "💆",
    titleKey: "spaTitle",
    descKey: "spaDesc",
    price: "From $180/couple",
  },
  {
    emoji: "🌊",
    titleKey: "cenoteTitle",
    descKey: "cenoteDesc",
    price: "From $120/couple",
  },
  {
    emoji: "⛵",
    titleKey: "sailingTitle",
    descKey: "sailingDesc",
    price: "From $250/couple",
  },
  {
    emoji: "🍷",
    titleKey: "dinnerTitle",
    descKey: "dinnerDesc",
    price: "From $200/couple",
  },
  {
    emoji: "🌸",
    titleKey: "ceremonyTitle",
    descKey: "ceremonyDesc",
    price: "From $350/couple",
  },
];

const timelineMonths = [
  { month: "12–18 months", key: "months18" },
  { month: "9–12 months", key: "months12" },
  { month: "6–9 months", key: "months9" },
  { month: "3–6 months", key: "months6" },
  { month: "1–3 months", key: "months3" },
  { month: "Final week", key: "monthsFinal" },
];

const budgetTiers = [
  {
    key: "intimate",
    guestsKey: "guestsIntimate",
    rangeKey: "rangeIntimate",
    colorClass: "border-rose-200 bg-rose-50",
    badgeClass: "bg-rose-100 text-rose-800",
  },
  {
    key: "medium",
    guestsKey: "guestsMedium",
    rangeKey: "rangeMedium",
    colorClass: "border-pink-200 bg-pink-50",
    badgeClass: "bg-pink-100 text-pink-800",
  },
  {
    key: "large",
    guestsKey: "guestsLarge",
    rangeKey: "rangeLarge",
    colorClass: "border-purple-200 bg-purple-50",
    badgeClass: "bg-purple-100 text-purple-800",
  },
];

/* ---------- inline static translations (avoid growing common.ts further) ---------- */
const staticT: Record<string, Record<string, string>> = {
  es: {
    // why features
    beachTitle: "Ceremonias en la Playa",
    beachDesc:
      "Intercambia votos con el Mar Caribe como fondo y la arena blanca bajo tus pies.",
    ecoTitle: "Venues Eco-Luxury",
    ecoDesc:
      "Propiedades únicas entre la selva y el mar, con diseño sostenible y atmósfera mágica.",
    weatherTitle: "Clima Perfecto Todo el Año",
    weatherDesc:
      "Temperatura media de 27°C con brisas caribeñas. La temporada alta es de noviembre a abril.",
    accessTitle: "Fácil Acceso Internacional",
    accessDesc:
      "Vuelos directos desde las principales ciudades de EE.UU., Europa y Latinoamérica.",
    // honeymoon
    spaTitle: "Spa para Parejas",
    spaDesc:
      "Rituales mayas de bienestar en cenotes y spas privados en plena naturaleza.",
    cenoteTitle: "Cenote Privado",
    cenoteDesc:
      "Nada en aguas cristalinas bajo las estrellas en un cenote exclusivo solo para ustedes.",
    sailingTitle: "Navegación al Atardecer",
    sailingDesc:
      "Catamarán privado frente a la costa de Tulum con champán y puesta de sol.",
    dinnerTitle: "Cena Romántica en la Playa",
    dinnerDesc:
      "Mesa para dos en la orilla del mar, menú de chef privado y velas bajo el cielo estrellado.",
    ceremonyTitle: "Ceremonia en un Cenote",
    ceremonyDesc:
      "Una ceremonia íntima y espiritual dentro de un cenote, rodeados de estalactitas y luz natural.",
    // timeline
    months18:
      "Elige la fecha, reserva el venue y contrata al wedding planner.",
    months12:
      "Envía las invitaciones, confirma proveedor de catering y fotógrafo.",
    months9:
      "Reserva alojamiento para los invitados y coordina traslados.",
    months6:
      "Diseña la decoración, elige el menú y confirma el DJ o banda.",
    months3:
      "Cita de ensayo, ajuste de vestido/traje y detalles finales del itinerario.",
    monthsFinal:
      "Check-in de invitados, ensayo de la ceremonia y disfrutar del gran día.",
    // budget
    intimateLabel: "Boda Íntima",
    guestsIntimate: "Hasta 20 invitados",
    rangeIntimate: "$8,000 – $20,000 USD",
    mediumLabel: "Boda Mediana",
    guestsMedium: "20 – 80 invitados",
    rangeMedium: "$20,000 – $60,000 USD",
    largeLabel: "Gran Boda",
    guestsLarge: "80 – 200 invitados",
    rangeLarge: "$60,000 – $150,000 USD",
    // faqs
    faq1q: "¿Se necesita visa para casarse en México?",
    faq1a:
      "Los ciudadanos de la mayoría de países pueden entrar a México sin visa turística. Sin embargo, para una boda civil legal necesitarás documentación especial. Muchas parejas optan por una ceremonia simbólica en Tulum y legalizarla en su país de origen.",
    faq2q: "¿Cuál es la mejor época para una boda en Tulum?",
    faq2a:
      "La temporada ideal es de noviembre a abril, con clima seco y temperaturas de 24–28°C. Evita la temporada de huracanes (junio–octubre). Diciembre y enero son los meses más populares, por lo que debes reservar con al menos 18 meses de anticipación.",
    faq3q: "¿Cuánto cuesta en promedio una boda en Tulum?",
    faq3a:
      "Una boda íntima de 20 personas puede costar desde $8,000 USD. Una boda mediana (50 personas) ronda los $30,000–$50,000 USD. Los gastos principales son el venue, catering, flores, fotografía y alojamiento para los novios.",
    faq4q: "¿Los venues incluyen coordinador de bodas?",
    faq4a:
      "La mayoría de los grandes venues como Papaya Playa Project o Ahau Tulum incluyen un coordinador de bodas en sus paquetes. Te recomendamos contratar también un wedding planner independiente con experiencia en bodas de destino en Tulum.",
    faq5q: "¿Cómo llegan los invitados al venue?",
    faq5a:
      "La mayoría de los venues en Tulum están en la Zona Hotelera, a lo largo de la carretera principal. Se pueden organizar traslados en grupo desde el Aeropuerto de Cancún (2 horas) o desde hoteles en Tulum. Muchos venues ofrecen coordinación de transporte.",
    // cta
    ctaTitle: "Empieza a Planificar tu Boda en Tulum",
    ctaSubtitle:
      "Reserva tu villa o hotel para los novios y comienza a hacer realidad el sueño.",
    ctaButton: "Buscar Alojamiento para la Boda",
    breadcrumbHome: "Inicio",
    breadcrumbGuide: "Guía Tulum",
    breadcrumbCurrent: "Bodas en Tulum",
    timelineTitle: "Cronograma de Planificación",
    timelineSubtitle:
      "Un calendario detallado para que no se te escape ningún detalle.",
    venueCapacity: "Capacidad",
    venuePriceRange: "Precio",
    venueStyle: "Estilo",
    venueViewBtn: "Ver Venue",
  },
  en: {
    beachTitle: "Beach Ceremonies",
    beachDesc:
      "Exchange vows with the Caribbean Sea as backdrop and white sand beneath your feet.",
    ecoTitle: "Eco-Luxury Venues",
    ecoDesc:
      "Unique properties between jungle and sea, with sustainable design and magical atmosphere.",
    weatherTitle: "Perfect Weather Year-Round",
    weatherDesc:
      "Average temperature of 27°C with Caribbean breezes. High season runs November to April.",
    accessTitle: "Easy International Access",
    accessDesc:
      "Direct flights from major cities in the US, Europe, and Latin America.",
    spaTitle: "Couples Spa",
    spaDesc:
      "Mayan wellness rituals in cenotes and private spas immersed in nature.",
    cenoteTitle: "Private Cenote",
    cenoteDesc:
      "Swim in crystal-clear waters under the stars in an exclusive cenote, just the two of you.",
    sailingTitle: "Sunset Sailing",
    sailingDesc:
      "Private catamaran off the coast of Tulum with champagne and a stunning sunset.",
    dinnerTitle: "Romantic Beach Dinner",
    dinnerDesc:
      "Table for two on the shoreline, private chef menu, and candles under a starlit sky.",
    ceremonyTitle: "Cenote Ceremony",
    ceremonyDesc:
      "An intimate spiritual ceremony inside a cenote, surrounded by stalactites and natural light.",
    months18: "Choose your date, book the venue, and hire a wedding planner.",
    months12: "Send invitations, confirm catering provider and photographer.",
    months9: "Book guest accommodation and coordinate transfers.",
    months6: "Design décor, choose the menu, and confirm DJ or band.",
    months3:
      "Rehearsal dinner, final dress/suit fitting, and last itinerary details.",
    monthsFinal:
      "Guest check-in, ceremony rehearsal, and enjoying the big day.",
    intimateLabel: "Intimate Wedding",
    guestsIntimate: "Up to 20 guests",
    rangeIntimate: "$8,000 – $20,000 USD",
    mediumLabel: "Medium Wedding",
    guestsMedium: "20 – 80 guests",
    rangeMedium: "$20,000 – $60,000 USD",
    largeLabel: "Grand Wedding",
    guestsLarge: "80 – 200 guests",
    rangeLarge: "$60,000 – $150,000 USD",
    faq1q: "Do you need a visa to get married in Mexico?",
    faq1a:
      "Citizens of most countries can enter Mexico without a tourist visa. However, for a legally binding civil ceremony you will need special documentation. Many couples opt for a symbolic ceremony in Tulum and legalize it in their home country.",
    faq2q: "What is the best time of year for a Tulum wedding?",
    faq2a:
      "The ideal season is November to April, with dry weather and temperatures of 24–28°C. Avoid hurricane season (June–October). December and January are the most popular months, so book at least 18 months in advance.",
    faq3q: "How much does a Tulum wedding cost on average?",
    faq3a:
      "An intimate wedding of 20 people can start from $8,000 USD. A medium wedding (50 guests) averages $30,000–$50,000 USD. Main costs are venue, catering, flowers, photography, and accommodation for the couple.",
    faq4q: "Do venues include a wedding coordinator?",
    faq4a:
      "Most major venues like Papaya Playa Project or Ahau Tulum include a wedding coordinator in their packages. We also recommend hiring an independent wedding planner experienced in Tulum destination weddings.",
    faq5q: "How do guests get to the venue?",
    faq5a:
      "Most Tulum venues are in the Hotel Zone along the main road. Group transfers can be arranged from Cancún Airport (2 hours) or from hotels in Tulum. Many venues offer transport coordination.",
    ctaTitle: "Start Planning Your Tulum Wedding",
    ctaSubtitle:
      "Book your villa or hotel for the couple and start making the dream a reality.",
    ctaButton: "Find Wedding Accommodation",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Tulum Guide",
    breadcrumbCurrent: "Weddings in Tulum",
    timelineTitle: "Planning Timeline",
    timelineSubtitle:
      "A detailed calendar so no detail slips through the cracks.",
    venueCapacity: "Capacity",
    venuePriceRange: "Price",
    venueStyle: "Style",
    venueViewBtn: "View Venue",
  },
  fr: {
    beachTitle: "Cérémonies sur la Plage",
    beachDesc:
      "Échangez vos vœux avec la mer des Caraïbes en toile de fond et le sable blanc sous vos pieds.",
    ecoTitle: "Lieux Éco-Luxe",
    ecoDesc:
      "Des propriétés uniques entre jungle et mer, au design durable et à l'atmosphère magique.",
    weatherTitle: "Météo Parfaite Toute l'Année",
    weatherDesc:
      "Température moyenne de 27°C avec des brises caraïbéennes. La haute saison va de novembre à avril.",
    accessTitle: "Accès International Facile",
    accessDesc:
      "Vols directs depuis les grandes villes des États-Unis, d'Europe et d'Amérique latine.",
    spaTitle: "Spa en Couple",
    spaDesc:
      "Rituels de bien-être mayas dans des cenotes et spas privés en pleine nature.",
    cenoteTitle: "Cenote Privé",
    cenoteDesc:
      "Nagez dans des eaux cristallines sous les étoiles dans un cenote exclusif, rien que pour vous deux.",
    sailingTitle: "Voile au Coucher du Soleil",
    sailingDesc:
      "Catamaran privé au large de Tulum avec champagne et coucher de soleil époustouflant.",
    dinnerTitle: "Dîner Romantique sur la Plage",
    dinnerDesc:
      "Table pour deux au bord de l'eau, menu chef privé et bougies sous un ciel étoilé.",
    ceremonyTitle: "Cérémonie dans un Cenote",
    ceremonyDesc:
      "Une cérémonie intime et spirituelle dans un cenote, entourée de stalactites et de lumière naturelle.",
    months18:
      "Choisissez la date, réservez le lieu et engagez un wedding planner.",
    months12:
      "Envoyez les invitations, confirmez le traiteur et le photographe.",
    months9:
      "Réservez l'hébergement des invités et coordonnez les transferts.",
    months6:
      "Concevez la décoration, choisissez le menu et confirmez le DJ ou le groupe.",
    months3:
      "Dîner de répétition, derniers ajustements de robe/costume et détails finaux.",
    monthsFinal:
      "Enregistrement des invités, répétition de la cérémonie et profiter du grand jour.",
    intimateLabel: "Mariage Intime",
    guestsIntimate: "Jusqu'à 20 invités",
    rangeIntimate: "8 000 – 20 000 USD",
    mediumLabel: "Mariage Moyen",
    guestsMedium: "20 – 80 invités",
    rangeMedium: "20 000 – 60 000 USD",
    largeLabel: "Grand Mariage",
    guestsLarge: "80 – 200 invités",
    rangeLarge: "60 000 – 150 000 USD",
    faq1q: "Faut-il un visa pour se marier au Mexique ?",
    faq1a:
      "Les citoyens de la plupart des pays peuvent entrer au Mexique sans visa touristique. Cependant, pour un mariage civil légal, vous aurez besoin de documents spéciaux. Beaucoup de couples optent pour une cérémonie symbolique à Tulum et la légalisent dans leur pays d'origine.",
    faq2q: "Quelle est la meilleure période pour un mariage à Tulum ?",
    faq2a:
      "La saison idéale est de novembre à avril, avec un temps sec et des températures de 24–28°C. Évitez la saison des ouragans (juin–octobre). Décembre et janvier sont les mois les plus demandés, réservez au moins 18 mois à l'avance.",
    faq3q: "Combien coûte en moyenne un mariage à Tulum ?",
    faq3a:
      "Un mariage intime de 20 personnes peut commencer à partir de 8 000 USD. Un mariage moyen (50 personnes) est de 30 000–50 000 USD. Les principaux coûts sont le lieu, le traiteur, les fleurs, la photographie et l'hébergement des mariés.",
    faq4q: "Les lieux incluent-ils un coordinateur de mariage ?",
    faq4a:
      "La plupart des grands lieux comme Papaya Playa Project ou Ahau Tulum incluent un coordinateur dans leurs forfaits. Nous recommandons également d'engager un wedding planner indépendant expérimenté en mariages de destination à Tulum.",
    faq5q: "Comment les invités se rendent-ils au lieu de réception ?",
    faq5a:
      "La plupart des lieux à Tulum se trouvent dans la Zone Hôtelière le long de la route principale. Des transferts en groupe peuvent être organisés depuis l'aéroport de Cancún (2 heures) ou depuis les hôtels de Tulum.",
    ctaTitle: "Commencez à Planifier votre Mariage à Tulum",
    ctaSubtitle:
      "Réservez votre villa ou hôtel pour les mariés et commencez à réaliser le rêve.",
    ctaButton: "Trouver un Hébergement pour le Mariage",
    breadcrumbHome: "Accueil",
    breadcrumbGuide: "Guide Tulum",
    breadcrumbCurrent: "Mariages à Tulum",
    timelineTitle: "Calendrier de Planification",
    timelineSubtitle:
      "Un calendrier détaillé pour ne manquer aucun détail.",
    venueCapacity: "Capacité",
    venuePriceRange: "Prix",
    venueStyle: "Style",
    venueViewBtn: "Voir le Lieu",
  },
  it: {
    beachTitle: "Cerimonie in Spiaggia",
    beachDesc:
      "Scambiate le promesse con il Mar dei Caraibi come sfondo e la sabbia bianca sotto i piedi.",
    ecoTitle: "Venue Eco-Lusso",
    ecoDesc:
      "Proprietà uniche tra giungla e mare, con design sostenibile e atmosfera magica.",
    weatherTitle: "Clima Perfetto Tutto l'Anno",
    weatherDesc:
      "Temperatura media di 27°C con brezze caraibiche. L'alta stagione va da novembre ad aprile.",
    accessTitle: "Facile Accesso Internazionale",
    accessDesc:
      "Voli diretti dalle principali città di USA, Europa e America Latina.",
    spaTitle: "Spa di Coppia",
    spaDesc:
      "Rituali benessere maya in cenotes e spa privati immersi nella natura.",
    cenoteTitle: "Cenote Privato",
    cenoteDesc:
      "Nuotate in acque cristalline sotto le stelle in un cenote esclusivo, solo voi due.",
    sailingTitle: "Vela al Tramonto",
    sailingDesc:
      "Catamarano privato al largo di Tulum con champagne e tramonto mozzafiato.",
    dinnerTitle: "Cena Romantica in Spiaggia",
    dinnerDesc:
      "Tavolo per due sulla riva del mare, menù di chef privato e candele sotto un cielo stellato.",
    ceremonyTitle: "Cerimonia in un Cenote",
    ceremonyDesc:
      "Una cerimonia intima e spirituale all'interno di un cenote, circondata da stalattiti e luce naturale.",
    months18:
      "Scegliete la data, prenotate la location e assumete un wedding planner.",
    months12:
      "Inviate gli inviti, confermate il catering e il fotografo.",
    months9:
      "Prenotate l'alloggio per gli ospiti e coordinate i trasferimenti.",
    months6:
      "Progettate la decorazione, scegliete il menu e confermate il DJ o la band.",
    months3:
      "Cena di prova, ultimo fitting dell'abito/abito e dettagli finali dell'itinerario.",
    monthsFinal:
      "Check-in degli ospiti, prova della cerimonia e godimento del grande giorno.",
    intimateLabel: "Matrimonio Intimo",
    guestsIntimate: "Fino a 20 ospiti",
    rangeIntimate: "$8.000 – $20.000 USD",
    mediumLabel: "Matrimonio Medio",
    guestsMedium: "20 – 80 ospiti",
    rangeMedium: "$20.000 – $60.000 USD",
    largeLabel: "Grande Matrimonio",
    guestsLarge: "80 – 200 ospiti",
    rangeLarge: "$60.000 – $150.000 USD",
    faq1q: "È necessario un visto per sposarsi in Messico?",
    faq1a:
      "I cittadini della maggior parte dei paesi possono entrare in Messico senza visto turistico. Tuttavia, per un matrimonio civile legale sono necessari documenti speciali. Molte coppie optano per una cerimonia simbolica a Tulum e la legalizzano nel loro paese d'origine.",
    faq2q: "Qual è il momento migliore per un matrimonio a Tulum?",
    faq2a:
      "La stagione ideale è da novembre ad aprile, con tempo secco e temperature di 24–28°C. Evitate la stagione degli uragani (giugno–ottobre). Dicembre e gennaio sono i mesi più richiesti, prenotate almeno 18 mesi prima.",
    faq3q: "Quanto costa in media un matrimonio a Tulum?",
    faq3a:
      "Un matrimonio intimo di 20 persone può partire da $8.000 USD. Un matrimonio medio (50 persone) si aggira intorno ai $30.000–$50.000 USD. I costi principali sono la location, il catering, i fiori, la fotografia e l'alloggio per gli sposi.",
    faq4q: "Le location includono un coordinatore matrimoniale?",
    faq4a:
      "La maggior parte delle grandi location come Papaya Playa Project o Ahau Tulum include un coordinatore nei loro pacchetti. Consigliamo anche di assumere un wedding planner indipendente con esperienza in matrimoni di destinazione a Tulum.",
    faq5q: "Come raggiungono gli ospiti la location?",
    faq5a:
      "La maggior parte delle location a Tulum si trova nella Zona Alberghiera lungo la strada principale. È possibile organizzare trasferimenti di gruppo dall'aeroporto di Cancún (2 ore) o dagli hotel di Tulum. Molte location offrono coordinamento del trasporto.",
    ctaTitle: "Inizia a Pianificare il tuo Matrimonio a Tulum",
    ctaSubtitle:
      "Prenota la tua villa o hotel per gli sposi e inizia a realizzare il sogno.",
    ctaButton: "Trova Alloggio per il Matrimonio",
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guida Tulum",
    breadcrumbCurrent: "Matrimoni a Tulum",
    timelineTitle: "Cronoprogramma di Pianificazione",
    timelineSubtitle:
      "Un calendario dettagliato per non perdere nessun dettaglio.",
    venueCapacity: "Capacità",
    venuePriceRange: "Prezzo",
    venueStyle: "Stile",
    venueViewBtn: "Vedi Location",
  },
};

export default function BodasTulum() {
  const { t, locale } = useI18n();
  const { getLocalizedLink } = useLocalizedLink();
  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://tulumtkts.com";

  const st = (key: string): string =>
    staticT[locale as keyof typeof staticT]?.[key] ||
    staticT["en"][key] ||
    key;

  const faqs = [
    { question: st("faq1q"), answer: st("faq1a") },
    { question: st("faq2q"), answer: st("faq2a") },
    { question: st("faq3q"), answer: st("faq3a") },
    { question: st("faq4q"), answer: st("faq4a") },
    { question: st("faq5q"), answer: st("faq5a") },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={t("bodas.seo.title")}
        description={t("bodas.seo.description")}
        keywords={[
          "bodas tulum",
          "boda en tulum",
          "tulum wedding",
          "wedding tulum mexico",
          "beach wedding tulum",
          "luna de miel tulum",
          "honeymoon tulum",
          "venues bodas tulum",
          "wedding venues tulum",
          "destination wedding tulum",
          "boda playa mexico",
          "tulum wedding cost",
          "wedding planner tulum",
          "romantic tulum",
          "mariage tulum",
          "matrimonio tulum",
        ]}
        canonicalUrl={`${siteUrl}/bodas-tulum`}
        ogType="website"
        ogImage="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630"
        currentPath="/bodas-tulum"
      />
      <WebsiteSchema siteUrl={siteUrl} siteName="TulumTkts" />
      <BreadcrumbSchema
        items={[
          { name: st("breadcrumbHome"), url: "/" },
          { name: st("breadcrumbGuide"), url: "/tulum-guia-completa" },
          { name: st("breadcrumbCurrent"), url: "/bodas-tulum" },
        ]}
      />
      <FAQSchema faqs={faqs} />

      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600">
            <a href={getLocalizedLink("/")} className="hover:text-primary">
              {st("breadcrumbHome")}
            </a>
            <span className="mx-2">/</span>
            <a
              href={getLocalizedLink("/tulum-guia-completa")}
              className="hover:text-primary"
            >
              {st("breadcrumbGuide")}
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{st("breadcrumbCurrent")}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-800 via-pink-800 to-purple-900 text-white py-24 overflow-hidden">
        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-rose-900/60 via-transparent to-purple-900/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-5 bg-white/15 text-white border-white/25 text-sm px-4 py-1">
              <Heart className="w-4 h-4 mr-2 inline" />
              {t("bodas.hero.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t("bodas.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
              {t("bodas.hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span>6 exclusive venues</span>
              </div>
              <div className="flex items-center gap-2">
                <Waves className="w-5 h-5 text-blue-300" />
                <span>Caribbean beachfront</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-rose-300" />
                <span>Year-round planning</span>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Why Tulum for Your Wedding */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("bodas.sections.whyTulum.title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("bodas.sections.whyTulum.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyFeatures.map((feature, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-white shadow flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  {st(feature.titleKey)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {st(feature.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Venues */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("bodas.sections.venues.title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("bodas.sections.venues.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-md"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={venue.image}
                    alt={`${venue.name} wedding venue in Tulum`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-rose-700 font-semibold text-sm border-0">
                      {venue.priceRange}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-bold text-xl drop-shadow">
                      {venue.name}
                    </p>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-500">
                        {st("venueCapacity")}:
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {venue.capacity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-500">
                        {st("venueStyle")}:
                      </span>
                      <Badge
                        variant="outline"
                        className="text-xs border-rose-200 text-rose-700"
                      >
                        {venue.style}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white border-0"
                    onClick={() => {
                      trackAffiliateClick(
                        "hotellook",
                        venue.name,
                        "0",
                        "bodas_venue_cta"
                      );
                      window.open(
                        generateHotelLink("Tulum"),
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                  >
                    {st("venueViewBtn")} <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Honeymoon Experiences */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("bodas.sections.honeymoon.title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("bodas.sections.honeymoon.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {honeymoonExperiences.map((exp, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 border border-pink-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="text-4xl mb-4">{exp.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {st(exp.titleKey)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {st(exp.descKey)}
                </p>
                <Badge className="bg-rose-100 text-rose-700 border-0 text-xs">
                  {exp.price}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planning Timeline */}
      <section className="py-16 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {st("timelineTitle")}
            </h2>
            <p className="text-lg text-gray-600">{st("timelineSubtitle")}</p>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-rose-200 hidden sm:block" />
            <div className="space-y-6">
              {timelineMonths.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-6 bg-white rounded-2xl p-6 shadow-sm border border-rose-100 sm:ml-4"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="inline-block bg-rose-100 text-rose-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {item.month}
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {st(item.key)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Budget Guide */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("bodas.sections.budget.title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("bodas.sections.budget.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {budgetTiers.map((tier) => (
              <div
                key={tier.key}
                className={`rounded-2xl border-2 p-8 text-center ${tier.colorClass}`}
              >
                <Badge className={`mb-4 text-sm font-semibold border-0 ${tier.badgeClass}`}>
                  {st(`${tier.key}Label`)}
                </Badge>
                <div className="flex items-center justify-center gap-2 mb-3 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">{st(tier.guestsKey)}</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-900">
                  <DollarSign className="w-6 h-6 text-rose-500" />
                  <span>{st(tier.rangeKey)}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">
            * Estimated ranges. Actual costs vary based on venue, guest count, and chosen services.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("bodas.sections.faq.title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("bodas.sections.faq.subtitle")}
            </p>
          </div>
          <FAQAccordion faqs={faqs} className="bg-white rounded-xl shadow-sm p-6" />
        </div>
      </section>

      {/* CTA Banner — villa/hotel booking */}
      <section className="py-16 bg-gradient-to-r from-rose-800 via-pink-700 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur rounded-3xl p-10 text-center border border-white/20">
            <Heart className="w-12 h-12 text-rose-300 mx-auto mb-5" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {st("ctaTitle")}
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {st("ctaSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-rose-700 hover:bg-white/90 font-semibold text-base px-8"
                onClick={() => {
                  trackAffiliateClick(
                    "hotellook",
                    "Wedding accommodation Tulum",
                    "0",
                    "bodas_main_cta"
                  );
                  window.open(
                    generateHotelLink("Tulum"),
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                {st("ctaButton")} <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white/50 hover:bg-white/10 text-base px-8"
                onClick={() => {
                  window.open(
                    "https://www.viator.com/Tulum/d4254-ttd?q=wedding+ceremony",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Wedding Experiences
              </Button>
            </div>
            <p className="text-white/50 text-sm mt-4">
              Via Hotellook — best price guarantee · no extra charges
            </p>
          </div>
        </div>
      </section>

      <CrossSell exclude={["hoteles"]} />
      <Footer />
    </div>
  );
}
