import { Navigation } from "@/components/ui/navigation";
import { SEOHead } from "@/components/seo-head";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CrossSell } from "@/components/cross-sell";
import { WebsiteSchema } from "@/components/json-ld";
import { FAQSchema, FAQAccordion } from "@/components/faq-schema";
import { useLocalizedLink } from "@/hooks/use-localized-link";
import { Star, MapPin, UtensilsCrossed, Flame, Leaf, DollarSign, ArrowRight, ChefHat } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/contexts/i18n-context";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Restaurant {
  name: string;
  cuisine: string;
  priceRange: string;
  rating: number;
  mustTry: string;
  category: "fine" | "mexican" | "seafood" | "vegan" | "budget";
  image: string;
}

const restaurants: Restaurant[] = [
  {
    name: "Hartwood",
    cuisine: "Farm-to-Table",
    priceRange: "$$$",
    rating: 4.7,
    mustTry: "Wood-fired catch of the day",
    category: "fine",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Arca",
    cuisine: "Contemporary Mexican",
    priceRange: "$$$$",
    rating: 4.8,
    mustTry: "Tasting menu with local ingredients",
    category: "fine",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Taquería La Eufemia",
    cuisine: "Mexican Street Food",
    priceRange: "$",
    rating: 4.5,
    mustTry: "Fish tacos on the beach",
    category: "mexican",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Chamico's",
    cuisine: "Seafood",
    priceRange: "$$",
    rating: 4.6,
    mustTry: "Ceviche and seafood cocktails",
    category: "seafood",
    image: "https://images.unsplash.com/photo-1535140728325-a4d3707eee61?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Raw Love",
    cuisine: "Vegan & Raw",
    priceRange: "$$",
    rating: 4.4,
    mustTry: "Acai bowls and cold-pressed juice",
    category: "vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Matcha Mama",
    cuisine: "Healthy Café",
    priceRange: "$",
    rating: 4.3,
    mustTry: "Matcha smoothie bowls",
    category: "vegan",
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "La Zebra",
    cuisine: "Mexican Grill",
    priceRange: "$$$",
    rating: 4.5,
    mustTry: "Sunday brunch with live music",
    category: "mexican",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    name: "Burrito Amor",
    cuisine: "Fast Mexican",
    priceRange: "$",
    rating: 4.6,
    mustTry: "Breakfast burritos",
    category: "budget",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
];

const categories = [
  { id: "all", labelKey: "restaurantes.categories.all", icon: UtensilsCrossed, color: "bg-amber-100 text-amber-700" },
  { id: "fine", labelKey: "restaurantes.categories.fine", icon: ChefHat, color: "bg-purple-100 text-purple-700" },
  { id: "mexican", labelKey: "restaurantes.categories.mexican", icon: Flame, color: "bg-red-100 text-red-700" },
  { id: "seafood", labelKey: "restaurantes.categories.seafood", icon: MapPin, color: "bg-blue-100 text-blue-700" },
  { id: "vegan", labelKey: "restaurantes.categories.vegan", icon: Leaf, color: "bg-green-100 text-green-700" },
  { id: "budget", labelKey: "restaurantes.categories.budget", icon: DollarSign, color: "bg-teal-100 text-teal-700" },
];

const foodTips = [
  {
    titleKey: "restaurantes.tips.tip1.title",
    descriptionKey: "restaurantes.tips.tip1.description",
  },
  {
    titleKey: "restaurantes.tips.tip2.title",
    descriptionKey: "restaurantes.tips.tip2.description",
  },
  {
    titleKey: "restaurantes.tips.tip3.title",
    descriptionKey: "restaurantes.tips.tip3.description",
  },
  {
    titleKey: "restaurantes.tips.tip4.title",
    descriptionKey: "restaurantes.tips.tip4.description",
  },
];

const faqs = [
  {
    question: "¿Cuál es el mejor restaurante de Tulum?",
    answer:
      "Arca y Hartwood son consistentemente los más premiados. Arca ofrece una experiencia de tasting menu con ingredientes locales de temporada. Hartwood es famoso por su cocina de leña sin electricidad en plena selva. Ambos requieren reserva con semanas de anticipación en temporada alta.",
  },
  {
    question: "¿Cuánto cuesta comer en Tulum?",
    answer:
      "El rango varía enormemente. Tacos callejeros y ceviches: $3-8 USD por persona. Restaurantes casuales: $15-30 USD. Fine dining como Arca o Hartwood: $80-150+ USD por persona. Con un presupuesto de $25-40 USD/día puedes comer muy bien sin sacrificar calidad.",
  },
  {
    question: "¿Necesito reservar con anticipación?",
    answer:
      "Para restaurantes populares como Hartwood, Arca y La Zebra es indispensable reservar, especialmente en temporada alta (diciembre-abril). Muchos tienen lista de espera de 2-4 semanas. Los taquerías y comedores locales no requieren reserva.",
  },
  {
    question: "¿Dónde comer barato en Tulum?",
    answer:
      "El Mercado Municipal de Tulum Pueblo tiene los mejores precios: menús del día desde $5 USD. La calle principal (Avenida Tulum) tiene taquerías excelentes de $2-4 USD por taco. Burrito Amor y las fondas del pueblo son opciones estupendas bajo $10 USD.",
  },
  {
    question: "¿Hay opciones veganas en Tulum?",
    answer:
      "Tulum es uno de los destinos más amigables para veganos de México. Raw Love, Matcha Mama, Burrito Amor y docenas de cafés ofrecen menús completamente veganos. La mayoría de restaurantes también tienen opciones vegetarianas etiquetadas. Es casi imposible no comer bien siendo vegano en Tulum.",
  },
];

// ─── Star Rating ───────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < full ? "text-yellow-400 fill-current" : "text-gray-200 fill-current"
          }`}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating}</span>
    </div>
  );
}

// ─── Restaurant Card ───────────────────────────────────────────────────────────

function RestaurantCard({ restaurant, rank }: { restaurant: Restaurant; rank: number }) {
  const { t } = useI18n();

  const categoryColors: Record<string, string> = {
    fine: "bg-purple-100 text-purple-700",
    mexican: "bg-red-100 text-red-700",
    seafood: "bg-blue-100 text-blue-700",
    vegan: "bg-green-100 text-green-700",
    budget: "bg-teal-100 text-teal-700",
  };

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute top-3 left-3 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
              {rank}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                  {restaurant.name}
                </h3>
                <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
              </div>
              <Badge className={`${categoryColors[restaurant.category]} border-0 text-xs font-medium flex-shrink-0`}>
                {t(`restaurantes.categories.${restaurant.category}`)}
              </Badge>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <StarRating rating={restaurant.rating} />
              <span className="text-sm font-semibold text-amber-700">{restaurant.priceRange}</span>
            </div>

            <div className="bg-amber-50 rounded-lg p-3 mb-4">
              <p className="text-xs font-semibold text-amber-800 mb-1">
                {t("restaurantes.labels.mustTry")}
              </p>
              <p className="text-sm text-amber-900">{restaurant.mustTry}</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="border-amber-600 text-amber-700 hover:bg-amber-50 font-semibold text-xs"
              onClick={() =>
                window.open(
                  `https://www.google.com/search?q=${encodeURIComponent(restaurant.name + " Tulum reservas")}`,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              {t("restaurantes.labels.viewMenu")}
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RestaurantesTulum() {
  const { t } = useI18n();
  const { getLocalizedLink } = useLocalizedLink();
  const [activeCategory, setActiveCategory] = useState("all");

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://tulumtkts.com";

  const filteredRestaurants =
    activeCategory === "all"
      ? restaurants
      : restaurants.filter((r) => r.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={t("restaurantes.seo.title")}
        description={t("restaurantes.seo.description")}
        keywords={[
          "restaurantes tulum",
          "mejores restaurantes tulum",
          "best restaurants tulum",
          "donde comer tulum",
          "restaurantes tulum 2026",
          "fine dining tulum",
          "tacos tulum",
          "comida tulum",
          "hartwood tulum",
          "arca tulum",
          "restaurantes playa tulum",
          "comida vegana tulum",
          "mariscos tulum",
          "street food tulum",
        ]}
        canonicalUrl={`${siteUrl}/restaurantes-tulum`}
        ogType="article"
        articlePublishedTime="2026-01-20T08:00:00Z"
        articleModifiedTime="2026-03-27T10:00:00Z"
        articleSection="Gastronomía"
        currentPath="/restaurantes-tulum"
      />

      <FAQSchema faqs={faqs} />
      <WebsiteSchema />

      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600">
            <a href={getLocalizedLink("/")} className="hover:text-amber-700">
              Inicio
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Restaurantes en Tulum</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-amber-800 to-orange-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <Badge className="bg-white/20 text-white border-0 text-sm font-medium mb-4 backdrop-blur-sm">
            {t("restaurantes.hero.badge")}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {t("restaurantes.hero.title")}
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 mb-10 max-w-2xl mx-auto">
            {t("restaurantes.hero.subtitle")}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { value: "8+", label: "Restaurantes" },
              { value: "5", label: "Categorías" },
              { value: "$–$$$$", label: "Todos los presupuestos" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-orange-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Filter + Restaurant Grid ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("restaurantes.sections.topRestaurants.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("restaurantes.sections.topRestaurants.subtitle")}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-amber-700 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t(cat.labelKey)}
                </button>
              );
            })}
          </div>

          {/* Restaurant Cards */}
          <div className="space-y-5">
            {filteredRestaurants.map((restaurant, i) => (
              <RestaurantCard
                key={restaurant.name}
                restaurant={restaurant}
                rank={i + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Food Tips ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("restaurantes.sections.tips.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("restaurantes.sections.tips.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {foodTips.map((tip, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{t(tip.titleKey)}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{t(tip.descriptionKey)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Street Food & Markets ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("restaurantes.sections.streetFood.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("restaurantes.sections.streetFood.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                titleKey: "restaurantes.streetFood.mercado.title",
                descriptionKey: "restaurantes.streetFood.mercado.description",
                priceKey: "restaurantes.streetFood.mercado.price",
                icon: "🏪",
              },
              {
                titleKey: "restaurantes.streetFood.tacos.title",
                descriptionKey: "restaurantes.streetFood.tacos.description",
                priceKey: "restaurantes.streetFood.tacos.price",
                icon: "🌮",
              },
              {
                titleKey: "restaurantes.streetFood.antojitos.title",
                descriptionKey: "restaurantes.streetFood.antojitos.description",
                priceKey: "restaurantes.streetFood.antojitos.price",
                icon: "🥘",
              },
            ].map((item) => (
              <Card key={item.titleKey} className="border-0 shadow-sm hover:shadow-lg transition-shadow text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{t(item.titleKey)}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{t(item.descriptionKey)}</p>
                  <Badge className="bg-green-100 text-green-700 border-0 font-semibold text-sm">
                    {t(item.priceKey)}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Banner */}
          <div className="mt-10 bg-gradient-to-r from-amber-700 to-orange-700 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              {t("restaurantes.streetFood.bannerTitle")}
            </h3>
            <p className="text-orange-100 mb-6 max-w-xl mx-auto">
              {t("restaurantes.streetFood.bannerDescription")}
            </p>
            <Button
              size="lg"
              className="bg-white text-amber-800 hover:bg-orange-50 font-semibold"
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/search/mercado+tulum+pueblo/@20.2119,-87.4654,15z",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <MapPin className="w-5 h-5 mr-2" />
              {t("restaurantes.streetFood.bannerCta")}
            </Button>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("restaurantes.sections.faq.title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("restaurantes.sections.faq.subtitle")}
            </p>
          </div>

          <FAQAccordion
            faqs={faqs}
            className="bg-white rounded-2xl p-6 shadow-sm"
          />
        </div>
      </section>

      {/* ── Cross Sell ── */}
      <CrossSell
        exclude={["restaurantes"]}
        items={["vuelos", "hoteles", "experiencias", "transporte"]}
        title={t("restaurantes.labels.crossSellTitle")}
      />

      <Footer />
    </div>
  );
}
