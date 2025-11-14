import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Eye, ArrowLeft, Link2 } from "lucide-react";
import { Navigation } from "@/components/ui/navigation";
import { getBlogPostBySlug, allBlogPosts } from "@/data/blogPosts";
import { BlogImage } from "@/components/blog-image";
import { SEOHead } from "@/components/seo-head";
import { ArticleSchema, BreadcrumbSchema } from "@/components/json-ld";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { OrganizationSchema } from "@/components/organization-schema";

// Old blog posts data (kept for backward compatibility if needed)
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
    title: "Agenda de Eventos en Tulum 2025-2026",
    excerpt: "Descubre todos los festivales, conciertos y eventos imperdibles que tendrán lugar en Tulum durante la temporada 2025-2026.",
    category: "Eventos",
    author: "María González",
    publishDate: "2025-01-15",
    readTime: "8 min",
    views: 1250,
    featured: true,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    content: "Tulum se ha convertido en uno de los destinos más vibrantes de México, especialmente durante la temporada 2025-2026. La ciudad maya costera ofrece una agenda repleta de eventos que combinan cultura, música, bienestar y aventura..."
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
    publishDate: "2025-01-10",
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
    publishDate: "2025-01-05",
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

export default function BlogPost() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute<{ slug: string }>("/blog/:slug");
  
  // Get post slug from route params
  const postSlug = params?.slug || '';
  const post = getBlogPostBySlug(postSlug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Artículo no encontrado</h1>
          <p className="text-gray-600 mb-8">El artículo que buscas no existe.</p>
          <Button onClick={() => setLocation('/blog')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Blog
          </Button>
        </div>
      </div>
    );
  }

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
  
  // Get related posts (same category or same keywords)
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
          Volver al Blog
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
      <article className="max-w-4xl mx-auto px-4 pb-16">
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
                    Destacado
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
                  <span>{post.readTime} de lectura</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  <span>{post.views} vistas</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <article className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-6 font-medium" role="doc-subtitle">
                {post.excerpt}
              </p>
              
              <div 
                className="text-gray-700 leading-relaxed space-y-4 blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
                itemProp="articleBody"
              />
            </article>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compartir este artículo</h3>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const url = encodeURIComponent(canonicalUrl);
                    const text = encodeURIComponent(post.title);
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                  }}
                >
                  Facebook
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const url = encodeURIComponent(canonicalUrl);
                    const text = encodeURIComponent(post.title);
                    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
                  }}
                >
                  Twitter
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const url = encodeURIComponent(canonicalUrl);
                    const text = encodeURIComponent(post.title);
                    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
                  }}
                >
                  WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(canonicalUrl);
                  }}
                >
                  <Link2 className="w-4 h-4 mr-2" />
                  Copiar enlace
                </Button>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Artículos Relacionados</h3>
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
                          Leer más <ArrowLeft className="w-3 h-3 ml-2 rotate-180" />
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
    </div>
  );
}

