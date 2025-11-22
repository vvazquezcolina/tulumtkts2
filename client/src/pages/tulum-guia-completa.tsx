import { useLocation } from "wouter";
import { Navigation } from "@/components/ui/navigation";
import { SEOHead } from "@/components/seo-head";
import { WebsiteSchema } from "@/components/json-ld";
import { BreadcrumbSchema } from "@/components/json-ld";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { allBlogPosts } from "@/data/blogPosts";
import { ArrowRight, MapPin, Calendar, Star, TrendingUp } from "lucide-react";
import { useI18n } from "@/contexts/i18n-context";
import { tulumGuiaCompleta as translations } from "@/translations/pages/tulum-guia-completa";

/**
 * Página Hub "Guía Completa de Tulum" - Página de autoridad SEO
 * Esta página actúa como un hub central que enlaza a todos los artículos sobre Tulum
 * Objetivo: Posicionarse #1 en búsquedas sobre "tulum"
 */
export default function TulumGuiaCompleta() {
  const [, setLocation] = useLocation();
  const { locale, t: tCommon } = useI18n();
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';
  const t = (key: string, params?: Record<string, string | number>) => {
    const keys = key.split('.');
    let value: any = translations[locale as keyof typeof translations];
    for (const k of keys) {
      value = value?.[k];
    }
    if (typeof value === 'string' && params) {
      return value.replace(/\{(\w+)\}/g, (match, param) => String(params[param] || match));
    }
    return value || key;
  };

  // Categorizar artículos por tema principal
  const articlesByCategory = {
    "Guías de Viaje": allBlogPosts.filter(p => p.category === "Guías de Viaje" && p.type === "informativo").slice(0, 20),
    "Actividades y Tours": allBlogPosts.filter(p => 
      p.category === "Experiencias" || 
      p.keywords.some(k => k.includes("tours") || k.includes("activities") || k.includes("things to do"))
    ).slice(0, 20),
    "Hoteles y Alojamiento": allBlogPosts.filter(p => 
      p.category === "Alojamiento" || 
      p.keywords.some(k => k.includes("hotels") || k.includes("hoteles") || k.includes("resorts"))
    ).slice(0, 15),
    "Eventos y Festivales": allBlogPosts.filter(p => 
      p.category === "Eventos" || 
      p.keywords.some(k => k.includes("events") || k.includes("eventos") || k.includes("festival"))
    ).slice(0, 15),
    "Cenotes y Naturaleza": allBlogPosts.filter(p => 
      p.keywords.some(k => k.includes("cenote") || k.includes("cenotes") || k.includes("nature"))
    ).slice(0, 15),
    "Ruinas Mayas y Cultura": allBlogPosts.filter(p => 
      p.keywords.some(k => k.includes("ruins") || k.includes("ruinas") || k.includes("maya") || k.includes("archeological"))
    ).slice(0, 15),
    "Clima y Mejor Época": allBlogPosts.filter(p => 
      p.keywords.some(k => k.includes("weather") || k.includes("clima") || k.includes("best time") || k.includes("mejor época"))
    ).slice(0, 10),
    "Transporte": allBlogPosts.filter(p => 
      p.keywords.some(k => k.includes("transport") || k.includes("transporte") || k.includes("airport") || k.includes("aeropuerto"))
    ).slice(0, 10),
    "Gastronomía": allBlogPosts.filter(p => 
      p.keywords.some(k => k.includes("restaurant") || k.includes("restaurante") || k.includes("food") || k.includes("comida"))
    ).slice(0, 10),
  };

  const totalArticles = allBlogPosts.filter(p => p.type === "informativo").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Guía Completa de Tulum México 2025: Todo lo que Necesitas Saber | TulumTkts"
        description="La guía más completa de Tulum México 2025: tours, hoteles, cenotes, ruinas mayas, eventos, clima, transporte y más. Todo lo que necesitas saber para planificar tu viaje perfecto a Tulum. {totalArticles}+ artículos detallados."
        keywords={[
          'guía tulum',
          'guía completa tulum',
          'tulum mexico guia',
          'guía tulum 2025',
          'todo sobre tulum',
          'tulum guía completa',
          'guía turística tulum',
          'tulum información completa',
          'guía viaje tulum',
          'tulum completo',
          'tulum',
          'tulum mexico'
        ]}
        canonicalUrl={`${siteUrl}/tulum-guia-completa`}
        ogType="website"
        currentPath="/tulum-guia-completa"
      />
      <WebsiteSchema siteUrl={siteUrl} siteName="TulumTkts" />
      <BreadcrumbSchema items={[
        { name: t('breadcrumbs.home'), url: "/" },
        { name: t('breadcrumbs.guide'), url: "/tulum-guia-completa" }
      ]} />
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              {t('hero.badge')}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {t('hero.description', { totalArticles: String(totalArticles) })}
            </p>
            <div className="flex flex-wrap gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>{totalArticles}+ {t('hero.stats.articles')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>{t('hero.stats.updated')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{t('hero.stats.guide')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabla de Contenidos */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{t('toc.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(articlesByCategory).map((category) => (
              <a
                key={category}
                href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-primary hover:underline font-medium"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contenido Introductorio Optimizado */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('intro.title')}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('intro.paragraph1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('intro.paragraph2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('intro.paragraph3', { totalArticles: String(totalArticles) })}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('intro.paragraph4')}
            </p>
          </div>
        </div>
      </section>

      {/* Artículos por Categoría */}
      {Object.entries(articlesByCategory).map(([category, articles]) => (
        articles.length > 0 && (
          <section
            key={category}
            id={category.toLowerCase().replace(/\s+/g, '-')}
            className="py-16 bg-white border-t"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{category}</h2>
                  <p className="text-lg text-gray-600">
                    {articles.length} {t('categories.articlesAbout', { category: category.toLowerCase() })}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setLocation('/blog')}
                  className="hidden md:flex"
                >
                  {t('categories.viewAll')} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Card
                    key={article.id}
                    className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                    onClick={() => setLocation(`/blog/${article.slug}`)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-white/90 text-gray-900">
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{article.readTime}</span>
                        <span>{article.publishDate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {articles.length >= 10 && (
                <div className="mt-8 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setLocation('/blog')}
                    className="w-full md:w-auto"
                  >
                    {t('categories.viewAllArticles', { category })} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </section>
        )
      ))}

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setLocation('/experiencias')}
              className="bg-white text-primary hover:bg-white/90"
            >
              {t('cta.bookTours')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setLocation('/villas')}
              className="bg-transparent text-white border-white hover:bg-white/10"
            >
              {t('cta.searchHotels')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer con Enlaces Rápidos */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">{t('footer.planTrip')}</h3>
              <ul className="space-y-2">
                <li><a href="/experiencias" className="text-gray-600 hover:text-primary">{t('footer.links.tours')}</a></li>
                <li><a href="/villas" className="text-gray-600 hover:text-primary">{t('footer.links.hotels')}</a></li>
                <li><a href="/eventos" className="text-gray-600 hover:text-primary">{t('footer.links.events')}</a></li>
                <li><a href="/transporte" className="text-gray-600 hover:text-primary">{t('footer.links.transport')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">{t('footer.guides')}</h3>
              <ul className="space-y-2">
                <li><a href="/blog" className="text-gray-600 hover:text-primary">{t('footer.links.allArticles')}</a></li>
                <li><a href="/tulum-guia-completa" className="text-gray-600 hover:text-primary">{t('footer.links.completeGuide')}</a></li>
                <li><a href="/" className="text-gray-600 hover:text-primary">{t('footer.links.home')}</a></li>
                <li><a href="/contacto" className="text-gray-600 hover:text-primary">{t('footer.links.contact')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">{t('footer.categories')}</h3>
              <ul className="space-y-2">
                <li><a href="/blog" className="text-gray-600 hover:text-primary">{t('footer.links.activities')}</a></li>
                <li><a href="/blog" className="text-gray-600 hover:text-primary">{t('footer.links.activities')}</a></li>
                <li><a href="/blog" className="text-gray-600 hover:text-primary">{t('footer.links.hotels')}</a></li>
                <li><a href="/blog" className="text-gray-600 hover:text-primary">{t('footer.links.events')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">{t('footer.aboutTulum')}</h3>
              <ul className="space-y-2">
                <li><a href="/blog" className="text-gray-600 hover:text-primary">{t('footer.links.history')}</a></li>
                <li><a href="/blog" className="text-gray-600 hover:text-primary">{t('footer.links.cenotes')}</a></li>
                <li><a href="/blog" className="text-gray-600 hover:text-primary">{t('footer.links.ruins')}</a></li>
                <li><a href="/blog" className="text-gray-600 hover:text-primary">{t('footer.links.weather')}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

