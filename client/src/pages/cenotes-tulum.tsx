import { useLocation } from "wouter";
import { Navigation } from "@/components/ui/navigation";
import { SEOHead } from "@/components/seo-head";
import { WebsiteSchema } from "@/components/json-ld";
import { BreadcrumbSchema } from "@/components/json-ld";
import { FAQSchema, FAQAccordion } from "@/components/faq-schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, ArrowRight, Droplet, Users, Camera } from "lucide-react";
import { useI18n } from "@/contexts/i18n-context";
import { cenotesTulum as translations } from "@/translations/pages/cenotes-tulum";

/**
 * Página de Destino: Cenotes en Tulum
 * Keyword: "cenotes tulum" - 12.1K búsquedas/mes
 * Objetivo: Posicionarse #1 para "cenotes tulum"
 */
export default function CenotesTulum() {
  const [, setLocation] = useLocation();
  const { locale, t: tCommon } = useI18n();
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[locale as keyof typeof translations];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const faqs = t('faqs.items') as Array<{ question: string; answer: string }>;

  const topCenotes = [
    {
      name: "Gran Cenote",
      description: "El cenote más popular de Tulum, perfecto para snorkel con aguas cristalinas, formaciones de estalactitas, y peces coloridos. Ideal para familias y principiantes.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      price: "$500 MXN",
      distance: "4 km de Tulum",
      type: "Abierto y semi-abierto"
    },
    {
      name: "Dos Ojos",
      description: "Famoso internacionalmente por buceo en cuevas. Dos aberturas conectadas con sistema de cuevas extenso y visibilidad perfecta. Experiencia única para buceadores certificados.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      price: "$350 MXN",
      distance: "18 km de Tulum",
      type: "Semi-abierto"
    },
    {
      name: "Cenote Calavera",
      description: "Cenote abierto circular perfecto para saltos desde diferentes alturas. Ambiente relajado y menos turístico. Ideal para aventureros que buscan experiencia auténtica.",
      image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      price: "$150 MXN",
      distance: "5 km de Tulum",
      type: "Abierto"
    },
    {
      name: "Cenote Carwash",
      description: "Cenote rodeado de naturaleza virgen con aguas turquesas profundas. Perfecto para snorkel y buceo con formaciones subacuáticas impresionantes. Ambiente tranquilo y auténtico.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      price: "$200 MXN",
      distance: "6 km de Tulum",
      type: "Abierto"
    },
    {
      name: "Cenote Azul",
      description: "Cenote grande y profundo ideal para familias. Aguas profundas perfectas para nadar y saltar. Gran área para relajarse y disfrutar del día. Menos turístico y más local.",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      price: "$120 MXN",
      distance: "25 km de Tulum",
      type: "Abierto"
    },
    {
      name: "Cenote Nicte-Ha",
      description: "Cenote pequeño y encantador con aguas turquesas brillantes y lirios acuáticos. Perfecto para fotos y experiencia íntima. Conectado al sistema Dos Ojos para buceadores.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      price: "$250 MXN",
      distance: "18 km de Tulum",
      type: "Abierto"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Cenotes en Tulum México 2025: Los Mejores Cenotes para Visitar | TulumTkts"
        description="Descubre los mejores cenotes en Tulum México 2025: Gran Cenote, Dos Ojos, Calavera y más. Guía completa con precios, cómo llegar, tours y consejos para tu visita. Reserva tours a cenotes con los mejores precios."
        keywords={[
          'cenotes tulum',
          'cenotes en tulum',
          'tulum cenotes',
          'mejores cenotes tulum',
          'cenotes tulum mexico',
          'tours cenotes tulum',
          'cenotes tulum precio',
          'gran cenote tulum',
          'dos ojos cenote',
          'cenotes tulum buceo',
          'cenotes tulum snorkel',
          'cenotes cerca de tulum'
        ]}
        canonicalUrl={`${siteUrl}/cenotes-tulum`}
        ogType="website"
        currentPath="/cenotes-tulum"
      />
      <WebsiteSchema siteUrl={siteUrl} siteName="TulumTkts" />
      <BreadcrumbSchema items={[
        { name: t('breadcrumbs.home'), url: "/" },
        { name: t('breadcrumbs.guide'), url: "/tulum-guia-completa" },
        { name: t('breadcrumbs.cenotes'), url: "/cenotes-tulum" }
      ]} />
      <FAQSchema faqs={faqs} />
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              {t('hero.badge')}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Droplet className="w-5 h-5" />
                <span>{t('hero.stats.cenotes')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>{t('hero.stats.experiences')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{t('hero.stats.guide')}</span>
              </div>
            </div>
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
              {t('intro.paragraph3')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('intro.paragraph4')}
            </p>
          </div>
        </div>
      </section>

      {/* Top Cenotes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('topCenotes.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('topCenotes.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topCenotes.map((cenote, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={cenote.image}
                    alt={`${cenote.name} cenote en Tulum`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white">
                      #{index + 1} {t('topCenotes.topBadge')}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {cenote.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {cenote.description}
                  </p>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{cenote.distance}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{cenote.type}</span>
                    </div>
                    <div className="flex items-center font-semibold text-primary">
                      {cenote.price} {t('topCenotes.perPerson')}
                    </div>
                  </div>
                  <Button
                    onClick={() => setLocation('/experiencias?q=cenote')}
                    className="w-full bg-primary text-white hover:bg-primary/90"
                  >
                    {t('topCenotes.viewTours')} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo Llegar y Consejos */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {t('howToGet.title')}
          </h2>
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {t('howToGet.paragraph1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {t('howToGet.paragraph2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('howToGet.paragraph3')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('faqs.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('faqs.subtitle')}
            </p>
          </div>
          
          <FAQAccordion faqs={faqs} className="bg-white rounded-lg shadow-md p-6" />
        </div>
      </section>

      {/* CTA Section */}
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
              onClick={() => setLocation('/experiencias?q=cenote')}
              className="bg-white text-primary hover:bg-white/90"
            >
              {t('cta.viewTours')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setLocation('/tulum-guia-completa')}
              className="bg-transparent text-white border-white hover:bg-white/10"
            >
              {t('cta.viewGuide')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

