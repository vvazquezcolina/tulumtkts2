import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Search, Filter, ArrowRight, User, Eye, Heart } from "lucide-react";

export default function Blog() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const handlePostClick = (postId: string) => {
    // Navigate to blog post detail page
    setLocation(`/blog/${postId}`);
  };

  const blogPosts = [
    {
      id: "1",
      title: "Agenda de Eventos en Tulum 2025-2026",
      excerpt: "Descubre todos los festivales, conciertos y eventos imperdibles que tendrán lugar en Tulum durante la temporada 2025-2026.",
      category: "Eventos",
      author: "María González",
      publishDate: "2025-01-15",
      readTime: "8 min",
      views: 1250,
      featured: true,
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "2",
      title: "Las Mejores Fiestas de Año Nuevo en Tulum",
      excerpt: "Guía completa de las celebraciones de Año Nuevo más espectaculares en Tulum, desde beach parties hasta ceremonias ancestrales.",
      category: "Eventos", 
      author: "Carlos Mendoza",
      publishDate: "2024-12-20",
      readTime: "6 min",
      views: 987,
      featured: true,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "3",
      title: "Guía de Cenotes Imperdibles cerca de Tulum",
      excerpt: "Explora los cenotes más hermosos y místicos alrededor de Tulum. Desde los más famosos hasta los tesoros escondidos.",
      category: "Aventura",
      author: "Ana Rodríguez",
      publishDate: "2025-01-10",
      readTime: "12 min",
      views: 2156,
      featured: true,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "4",
      title: "Consejos para Viajar a Tulum: Clima, Seguridad y Transporte",
      excerpt: "Todo lo que necesitas saber antes de tu viaje a Tulum. Información práctica sobre el clima, seguridad y opciones de transporte.",
      category: "Consejos",
      author: "Roberto Silva",
      publishDate: "2025-01-05",
      readTime: "10 min",
      views: 1876,
      featured: false,
      image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "5",
      title: "Top 5 Beach Clubs en Tulum para el Día y la Noche",
      excerpt: "Descubre los beach clubs más exclusivos de Tulum, perfectos para relajarte durante el día y disfrutar la vida nocturna.",
      category: "Lifestyle",
      author: "Isabella Torres",
      publishDate: "2024-12-28",
      readTime: "7 min", 
      views: 1543,
      featured: false,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "6",
      title: "Gastronomía Maya Auténtica: Donde Comer en Tulum",
      excerpt: "Un recorrido por los mejores restaurantes que sirven auténtica comida maya y cocina mexicana contemporánea en Tulum.",
      category: "Gastronomía",
      author: "Chef Miguel Pech",
      publishDate: "2024-12-15",
      readTime: "9 min",
      views: 892,
      featured: false,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "7",
      title: "Retiros de Yoga y Bienestar en Tulum",
      excerpt: "Guía completa de los mejores retiros de yoga, spas y experiencias de bienestar que Tulum tiene para ofrecer.",
      category: "Bienestar",
      author: "Sofía Martín",
      publishDate: "2024-12-10",
      readTime: "11 min",
      views: 1234,
      featured: false,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "8", 
      title: "Expediciones a Sian Ka'an: Paraíso Natural UNESCO",
      excerpt: "Todo sobre la Reserva de la Biosfera Sian Ka'an, Patrimonio de la Humanidad, y cómo planificar tu visita.",
      category: "Aventura",
      author: "Dr. Emilio Caamal",
      publishDate: "2024-12-05",
      readTime: "15 min",
      views: 756,
      featured: false,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    }
  ];

  const categories = ["Todos", "Eventos", "Aventura", "Consejos", "Lifestyle", "Gastronomía", "Bienestar"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === "Todos" || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-primary to-secondary">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative flex items-center justify-center h-full text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Blog & Guías de Viaje
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Tu fuente de información experta sobre Tulum y la Riviera Maya
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar artículos, guías, consejos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Artículos Destacados</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Main Featured Article */}
              <Card 
                className="lg:col-span-2 overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
                onClick={() => handlePostClick(featuredPosts[0].id)}
              >
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img 
                      src={featuredPosts[0].image} 
                      alt={featuredPosts[0].title}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="md:w-1/2 p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-secondary text-white">Destacado</Badge>
                      <Badge variant="outline">{featuredPosts[0].category}</Badge>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                      {featuredPosts[0].title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg">{featuredPosts[0].excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-1" />
                        <span>{featuredPosts[0].author}</span>
                        <Calendar className="w-4 h-4 ml-4 mr-1" />
                        <span>{new Date(featuredPosts[0].publishDate).toLocaleDateString('es-ES')}</span>
                        <Clock className="w-4 h-4 ml-4 mr-1" />
                        <span>{featuredPosts[0].readTime}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="text-primary font-semibold"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePostClick(featuredPosts[0].id);
                        }}
                      >
                        Leer más <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Secondary Featured Articles */}
              {featuredPosts.slice(1, 3).map((post) => (
                <Card 
                  key={post.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                  onClick={() => handlePostClick(post.id)}
                >
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          <span>{post.views}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Todos los Artículos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Card 
                key={post.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                onClick={() => handlePostClick(post.id)}
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Eye className="w-3 h-3 mr-1" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{new Date(post.publishDate).toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 text-primary font-semibold hover:bg-primary/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePostClick(post.id);
                    }}
                  >
                    Leer artículo <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Cargar más artículos
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Mantente al día con Tulum
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Recibe nuestros últimos artículos, consejos de viaje y ofertas exclusivas directamente en tu email.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Tu email"
              className="flex-1 bg-white"
            />
            <Button className="bg-secondary text-white hover:bg-secondary/90">
              Suscribirse
            </Button>
          </div>
          
          <p className="text-sm text-gray-300 mt-4">
            Sin spam. Cancela tu suscripción en cualquier momento.
          </p>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Explora por Categorías</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category) => {
              const categoryCount = blogPosts.filter(post => post.category === category).length;
              return (
                <Card key={category} className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer group">
                  <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {category}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {categoryCount} artículo{categoryCount !== 1 ? 's' : ''}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}