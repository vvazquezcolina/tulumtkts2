import { useLocation, useRoute } from "wouter";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, User, Eye, ArrowLeft, Link2, Plane, Hotel, Compass, Car, ArrowRight, Mail } from "lucide-react";
import { Navigation } from "@/components/ui/navigation";
import { getBlogPostBySlug, allBlogPosts } from "@/data/blogPosts";
import { BlogImage } from "@/components/blog-image";
import { SEOHead } from "@/components/seo-head";
import { ArticleSchema, BreadcrumbSchema } from "@/components/json-ld";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { OrganizationSchema } from "@/components/organization-schema";
import { CrossSell } from "@/components/cross-sell";
import { generateFlightLink, generateHotelLink, generateAffiliateLink, generateCarRentalLink, generateTransferLink, trackAffiliateClick } from "@/lib/affiliate";
import { useI18n } from "@/contexts/i18n-context";

// ─── Contextual affiliate CTA ────────────────────────────────────────────────

interface CTAConfig {
  icon: React.ElementType;
  title: string;
  pitch: string;
  buttonText: string;
  link: string;
  trackKey: string;
}

function getCtaConfig(keywords: string[], category: string, t: (key: string) => string): CTAConfig {
  const text = [...keywords, category].join(" ").toLowerCase();

  if (text.includes("cenote") || text.includes("tour") || text.includes("aventura") || text.includes("actividad") || text.includes("snorkel") || text.includes("buceo")) {
    return {
      icon: Compass,
      title: t("blogPost.cta.cenotes.title"),
      pitch: t("blogPost.cta.cenotes.pitch"),
      buttonText: t("blogPost.cta.cenotes.button"),
      link: generateAffiliateLink("https://www.viator.com/Tulum/d5397", "viator", "blog_activities_cta"),
      trackKey: "blog_activities",
    };
  }

  if (text.includes("hotel") || text.includes("hospedaje") || text.includes("alojamiento") || text.includes("hostel") || text.includes("resort") || text.includes("villa")) {
    return {
      icon: Hotel,
      title: t("blogPost.cta.hotels.title"),
      pitch: t("blogPost.cta.hotels.pitch"),
      buttonText: t("blogPost.cta.hotels.button"),
      link: generateHotelLink("Tulum"),
      trackKey: "blog_hotels",
    };
  }

  if (text.includes("vuelo") || text.includes("viajar") || text.includes("llegar") || text.includes("flight") || text.includes("aeropuerto") || text.includes("avion") || text.includes("cancun")) {
    return {
      icon: Plane,
      title: t("blogPost.cta.flights.title"),
      pitch: t("blogPost.cta.flights.pitch"),
      buttonText: t("blogPost.cta.flights.button"),
      link: generateFlightLink("MEX", "CUN"),
      trackKey: "blog_flights",
    };
  }

  if (text.includes("transporte") || text.includes("transfer") || text.includes("traslado") || text.includes("taxi") || text.includes("bus") || text.includes("ado")) {
    return {
      icon: Car,
      title: t("blogPost.cta.transport.title"),
      pitch: t("blogPost.cta.transport.pitch"),
      buttonText: t("blogPost.cta.transport.button"),
      link: generateTransferLink("Cancun Airport", "Tulum"),
      trackKey: "blog_transfers",
    };
  }

  // Default
  return {
    icon: Plane,
    title: t("blogPost.cta.default.title"),
    pitch: t("blogPost.cta.default.pitch"),
    buttonText: t("blogPost.cta.default.button"),
    link: generateFlightLink("MEX", "CUN"),
    trackKey: "blog_default",
  };
}

interface BlogAffiliateCTAProps {
  keywords: string[];
  category: string;
}

function BlogAffiliateCTA({ keywords, category }: BlogAffiliateCTAProps) {
  const { t } = useI18n();
  const config = getCtaConfig(keywords, category, t);
  const Icon = config.icon;

  const handleClick = () => {
    trackAffiliateClick(config.trackKey, config.title, "0", "blog_inline");
    window.open(config.link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="my-8 not-prose">
      <Card className="border-l-4 border-l-teal-500 border border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50 shadow-md rounded-xl overflow-hidden">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 text-teal-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-0.5">
                {t("blogPost.cta.recommended")}
              </p>
              <h4 className="text-lg font-bold text-gray-900 mb-1">
                {config.title}
              </h4>
              <p className="text-sm text-gray-600">
                {config.pitch}
              </p>
            </div>
            <Button
              onClick={handleClick}
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-5 py-2.5 text-sm font-semibold shrink-0 transition-colors"
            >
              {config.buttonText}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Bottom sidebar / trip CTA ───────────────────────────────────────────────

function BlogTripCTA() {
  const { t } = useI18n();

  const links = [
    {
      icon: Plane,
      label: t("blogPost.tripCta.flights.label"),
      sub: t("blogPost.tripCta.flights.sub"),
      href: generateFlightLink("MEX", "CUN"),
      track: "blog_trip_flights",
    },
    {
      icon: Hotel,
      label: t("blogPost.tripCta.hotels.label"),
      sub: t("blogPost.tripCta.hotels.sub"),
      href: generateHotelLink("Tulum"),
      track: "blog_trip_hotels",
    },
    {
      icon: Compass,
      label: t("blogPost.tripCta.activities.label"),
      sub: t("blogPost.tripCta.activities.sub"),
      href: generateAffiliateLink("https://www.viator.com/Tulum/d5397", "viator", "blog_trip_activities"),
      track: "blog_trip_activities",
    },
  ];

  const handleClick = (href: string, track: string, label: string) => {
    trackAffiliateClick(track, label, "0", "blog_trip_cta");
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl shadow-md mt-12">
      <CardContent className="p-6 md:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {t("blogPost.tripCta.title")}
        </h3>
        <p className="text-sm text-gray-500 mb-5">
          {t("blogPost.tripCta.subtitle")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.track}
                onClick={() => handleClick(item.href, item.track, item.label)}
                className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md border border-teal-100 hover:border-teal-300 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-teal-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-teal-700 transition-colors">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{item.sub}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-teal-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Newsletter CTA ──────────────────────────────────────────────────────────

function NewsletterCTA() {
  const { t } = useI18n();

  return (
    <div className="my-10">
      <Card className="bg-gradient-to-r from-teal-600 to-cyan-600 border-0 rounded-xl shadow-lg">
        <CardContent className="p-6 md:p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            {t("blogPost.newsletter.title")}
          </h3>
          <p className="text-teal-100 text-sm mb-5 max-w-md mx-auto">
            {t("blogPost.newsletter.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <Input
              type="email"
              placeholder={t("blogPost.newsletter.emailPlaceholder")}
              className="flex-1 bg-white border-0 text-gray-900 placeholder:text-gray-400"
            />
            <Button className="bg-white text-teal-700 hover:bg-teal-50 font-semibold px-6 transition-colors">
              {t("blogPost.newsletter.subscribe")}
            </Button>
          </div>
          <p className="text-xs text-teal-200 mt-3">{t("blogPost.newsletter.noSpam")}</p>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Content renderer that injects inline CTA after 2nd–3rd paragraph ────────

interface BlogContentProps {
  html: string;
  keywords: string[];
  category: string;
}

function BlogContent({ html, keywords, category }: BlogContentProps) {
  // Split the HTML on closing paragraph tags so we can inject the CTA
  const parts = html.split(/(?<=<\/p>)/i);

  // Find the injection point (after 2nd or 3rd </p> tag)
  const injectionIndex = Math.min(3, Math.max(2, Math.floor(parts.length / 4)));

  const before = parts.slice(0, injectionIndex).join("");
  const after = parts.slice(injectionIndex).join("");

  return (
    <>
      <div
        className="text-gray-700 leading-relaxed space-y-4 blog-content"
        dangerouslySetInnerHTML={{ __html: before }}
        itemProp="articleBody"
      />
      <BlogAffiliateCTA keywords={keywords} category={category} />
      <div
        className="text-gray-700 leading-relaxed space-y-4 blog-content"
        dangerouslySetInnerHTML={{ __html: after }}
      />
    </>
  );
}

// ─── Old blog posts data (kept for backward compatibility) ───────────────────

const oldBlogPosts: Record<string, {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  views: number;
  featured: boolean;
  image: string;
  content?: string;
}> = {
  "1": {
    id: "1",
    title: "Agenda de Eventos en Tulum 2026-2027",
    excerpt: "Descubre todos los festivales, conciertos y eventos imperdibles que tendrán lugar en Tulum durante la temporada 2026-2027.",
    category: "Eventos",
    author: "María González",
    publishDate: "2026-01-15",
    readTime: "8 min",
    views: 1250,
    featured: true,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    content: "Tulum se ha convertido en uno de los destinos más vibrantes de México, especialmente durante la temporada 2026-2027. La ciudad maya costera ofrece una agenda repleta de eventos que combinan cultura, música, bienestar y aventura..."
  },
  "2": {
    id: "2",
    title: "Las Mejores Fiestas de Año Nuevo en Tulum",
    excerpt: "Guía completa de las celebraciones de Año Nuevo más espectaculares en Tulum, desde beach parties hasta ceremonias ancestrales.",
    category: "Eventos",
    author: "Carlos Mendoza",
    publishDate: "2024-12-20",
    readTime: "6 min",
    views: 987,
    featured: true,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    content: "Celebrar el Año Nuevo en Tulum es una experiencia única que combina la magia de la Riviera Maya con festividades inolvidables. Desde playas privadas hasta cenotes, aquí encontrarás las mejores opciones para recibir el nuevo año..."
  },
  "3": {
    id: "3",
    title: "Guía de Cenotes Imperdibles cerca de Tulum",
    excerpt: "Explora los cenotes más hermosos y místicos alrededor de Tulum. Desde los más famosos hasta los tesoros escondidos.",
    category: "Aventura",
    author: "Ana Rodríguez",
    publishDate: "2026-01-10",
    readTime: "12 min",
    views: 2156,
    featured: true,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    content: "Los cenotes son una de las maravillas naturales más impresionantes de la Península de Yucatán. Estos pozos de agua dulce formados naturalmente son considerados sagrados por los mayas y ofrecen experiencias de natación y buceo únicas..."
  },
  "4": {
    id: "4",
    title: "Consejos para Viajar a Tulum: Clima, Seguridad y Transporte",
    excerpt: "Todo lo que necesitas saber antes de tu viaje a Tulum. Información práctica sobre el clima, seguridad y opciones de transporte.",
    category: "Consejos",
    author: "Roberto Silva",
    publishDate: "2026-01-05",
    readTime: "10 min",
    views: 1876,
    featured: false,
    image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    content: "Planificar tu viaje a Tulum requiere conocer algunos aspectos importantes sobre el clima, la seguridad y las opciones de transporte disponibles. Esta guía te ayudará a prepararte para una experiencia inolvidable..."
  },
  "5": {
    id: "5",
    title: "Top 5 Beach Clubs en Tulum para el Día y la Noche",
    excerpt: "Descubre los beach clubs más exclusivos de Tulum, perfectos para relajarte durante el día y disfrutar la vida nocturna.",
    category: "Lifestyle",
    author: "Isabella Torres",
    publishDate: "2024-12-28",
    readTime: "7 min",
    views: 1543,
    featured: false,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    content: "Tulum es famoso por sus beach clubs de clase mundial que combinan música, gastronomía y vistas espectaculares al Caribe. Aquí te presentamos los 5 mejores para disfrutar tanto de día como de noche..."
  },
  "6": {
    id: "6",
    title: "Gastronomía Maya Auténtica: Donde Comer en Tulum",
    excerpt: "Un recorrido por los mejores restaurantes que sirven auténtica comida maya y cocina mexicana contemporánea en Tulum.",
    category: "Gastronomía",
    author: "Chef Miguel Pech",
    publishDate: "2024-12-15",
    readTime: "9 min",
    views: 892,
    featured: false,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    content: "La gastronomía de Tulum es una fusión única entre la tradición maya milenaria y la cocina mexicana contemporánea. Descubre los restaurantes que mejor representan esta rica herencia culinaria..."
  },
  "7": {
    id: "7",
    title: "Retiros de Yoga y Bienestar en Tulum",
    excerpt: "Guía completa de los mejores retiros de yoga, spas y experiencias de bienestar que Tulum tiene para ofrecer.",
    category: "Bienestar",
    author: "Sofía Martín",
    publishDate: "2024-12-10",
    readTime: "11 min",
    views: 1234,
    featured: false,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    content: "Tulum se ha convertido en un destino mundial para el bienestar y la espiritualidad. Con una amplia oferta de retiros de yoga, spas de lujo y experiencias de sanación, aquí encontrarás tu espacio de paz..."
  },
  "8": {
    id: "8",
    title: "Expediciones a Sian Ka'an: Paraíso Natural UNESCO",
    excerpt: "Todo sobre la Reserva de la Biosfera Sian Ka'an, Patrimonio de la Humanidad, y cómo planificar tu visita.",
    category: "Aventura",
    author: "Dr. Emilio Caamal",
    publishDate: "2024-12-05",
    readTime: "15 min",
    views: 756,
    featured: false,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    content: "Sian Ka'an es una de las reservas naturales más importantes de México, declarada Patrimonio de la Humanidad por la UNESCO. Esta guía te ayudará a planificar tu expedición a este paraíso ecológico..."
  }
};

// ─── Main page component ─────────────────────────────────────────────────────

export default function BlogPost() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const [, params] = useRoute<{ slug: string }>("/blog/:slug");

  const postSlug = params?.slug || '';
  const post = getBlogPostBySlug(postSlug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("blogPost.notFound.title")}</h1>
          <p className="text-gray-600 mb-8">{t("blogPost.notFound.subtitle")}</p>
          <Button onClick={() => setLocation('/blog')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("blogPost.notFound.backToBlog")}
          </Button>
        </div>
      </div>
    );
  }

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;

  const relatedPosts = allBlogPosts
    .filter(p => p.id !== post.id && (
      p.category === post.category ||
      p.keywords.some(k => post.keywords.includes(k))
    ))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={post.metaTitle}
        description={post.metaDescription}
        keywords={post.keywords}
        canonicalUrl={canonicalUrl}
        ogImage={post.image}
        ogType="article"
        articleAuthor={post.author}
        articlePublishedTime={post.publishDate}
        articleModifiedTime={post.publishDate}
        articleSection={post.category}
        articleTag={post.keywords}
      />
      <ArticleSchema
        title={post.title}
        description={post.metaDescription}
        image={post.image}
        datePublished={post.publishDate}
        dateModified={post.publishDate}
        author={post.author}
        url={canonicalUrl}
        category={post.category}
        keywords={post.keywords}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Inicio', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.category, url: `/blog?category=${encodeURIComponent(post.category)}` },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      <OrganizationSchema
        name="TulumTkts"
        url={siteUrl}
        description="Guías de viaje y blog sobre Tulum, México."
      />
      <Navigation />

      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <Breadcrumbs
          items={[
            { name: 'Blog', url: '/blog' },
            { name: post.category, url: `/blog?category=${encodeURIComponent(post.category)}` },
            { name: post.title, url: `/blog/${post.slug}` },
          ]}
        />
      </div>

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => setLocation('/blog')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("blogPost.backToBlog")}
        </Button>
      </div>

      {/* Hero Image */}
      <div className="relative h-[400px] w-full mb-8">
        <BlogImage
          pexelsQuery={post.pexelsQuery}
          fallbackImage={post.image}
          alt={`${post.title} - ${post.metaDescription}`}
          className="w-full h-full object-cover"
          loading="eager"
          width={1200}
          height={400}
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 pb-8">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 md:p-12">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="text-sm">
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge className="bg-secondary text-white text-sm">
                    {t("blogPost.featured")}
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(post.publishDate).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{post.readTime} {t("blogPost.readingTime")}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  <span>{post.views} {t("blogPost.views")}</span>
                </div>
              </div>
            </div>

            {/* Content with inline CTA injected */}
            <article className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-6 font-medium" role="doc-subtitle">
                {post.excerpt}
              </p>

              <BlogContent
                html={post.content}
                keywords={post.keywords}
                category={post.category}
              />
            </article>

            {/* Bottom trip planning CTA */}
            <BlogTripCTA />

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("blogPost.shareTitle")}</h3>
              <div className="flex flex-wrap items-center gap-3">
                {/* Twitter / X */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : canonicalUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X (Twitter)"
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-900 hover:border-gray-900 hover:text-white text-gray-600 transition-colors"
                >
                  <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.632 5.905-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : canonicalUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 bg-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white text-gray-600 transition-colors"
                >
                  <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + (typeof window !== 'undefined' ? window.location.href : canonicalUrl))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 bg-white hover:bg-[#25D366] hover:border-[#25D366] hover:text-white text-gray-600 transition-colors"
                >
                  <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>

                {/* Copy Link */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : canonicalUrl);
                  }}
                  className="h-9 px-3 rounded-full text-sm text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900 transition-colors"
                >
                  <Link2 className="w-4 h-4 mr-2" />
                  {t("blogPost.copyLink")}
                </Button>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("blogPost.relatedTitle")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Card
                      key={relatedPost.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                      onClick={() => setLocation(`/blog/${relatedPost.slug}`)}
                    >
                      <BlogImage
                        pexelsQuery={relatedPost.pexelsQuery}
                        fallbackImage={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <CardContent className="p-4">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {relatedPost.category}
                        </Badge>
                        <h4 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {relatedPost.excerpt}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-primary text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLocation(`/blog/${relatedPost.slug}`);
                          }}
                        >
                          {t("blogPost.readMore")} <ArrowLeft className="w-3 h-3 ml-2 rotate-180" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </article>

      {/* Newsletter CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <NewsletterCTA />
      </div>

      {/* CrossSell */}
      <CrossSell title={t("blog.crossSellTitle")} />
      <Footer />
    </div>
  );
}
