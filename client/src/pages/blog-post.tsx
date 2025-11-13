import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Eye, ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/ui/navigation";

// Mock blog posts data (same as in blog.tsx)
const blogPosts: Record<string, {
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
  const [, params] = useRoute<{ id: string }>("/blog/:id");
  
  // Get post ID from route params
  const postId = params?.id || '';
  const post = blogPosts[postId];

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
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
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
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
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-6 font-medium">
                {post.excerpt}
              </p>
              
              <div className="text-gray-700 leading-relaxed space-y-4">
                {post.content ? (
                  <p>{post.content}</p>
                ) : (
                  <>
                    <p>
                      Este es un artículo completo sobre {post.title.toLowerCase()}. 
                      Aquí encontrarás información detallada y consejos útiles para tu experiencia en Tulum.
                    </p>
                    <p>
                      Tulum ofrece una experiencia única que combina la rica historia maya con la belleza natural 
                      del Caribe mexicano. Desde sus playas de arena blanca hasta sus cenotes místicos, cada 
                      rincón de esta ciudad costera tiene algo especial que ofrecer.
                    </p>
                    <p>
                      Ya sea que estés buscando aventura, relajación, cultura o gastronomía, Tulum tiene algo 
                      para todos los gustos. Esperamos que esta guía te ayude a planificar el viaje perfecto.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compartir este artículo</h3>
              <div className="flex gap-4">
                <Button variant="outline" size="sm">
                  Facebook
                </Button>
                <Button variant="outline" size="sm">
                  Twitter
                </Button>
                <Button variant="outline" size="sm">
                  WhatsApp
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </article>
    </div>
  );
}

