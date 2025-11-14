import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Search, Filter, ArrowRight, User, Eye, Heart } from "lucide-react";
import { allBlogPosts, getFeaturedPosts, getPostsByCategory } from "@/data/blogPosts";
import { BlogImage } from "@/components/blog-image";
import { SEOHead } from "@/components/seo-head";
import { WebsiteSchema } from "@/components/json-ld";
import { OrganizationSchema } from "@/components/organization-schema";

export default function Blog() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const handlePostClick = (postSlug: string) => {
    // Navigate to blog post detail page using slug for SEO
    setLocation(`/blog/${postSlug}`);
  };

  // Get all blog posts from data file (includes extended blogs)
  const allPosts = allBlogPosts;

  // Get unique categories from blog posts
  const categories = ["Todos", ...Array.from(new Set(allPosts.map(post => post.category)))];

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === "Todos" || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Blog y Guías de Viaje de Tulum | TulumTkts"
        description="Descubre las mejores guías de viaje sobre Tulum: clima, actividades, cenotes, restaurantes, hoteles y más. Tu fuente de información experta sobre Tulum y la Riviera Maya."
        keywords={Array.from(new Set(allPosts.flatMap(post => post.keywords))).slice(0, 10)}
        canonicalUrl={`${siteUrl}/blog`}
        ogType="website"
      />
      <WebsiteSchema siteUrl={siteUrl} siteName="TulumTkts" />
      <OrganizationSchema 
        name="TulumTkts"
        url={siteUrl}
        description="Guías de viaje y blog sobre Tulum, México. Descubre los mejores consejos, actividades y experiencias en Tulum."
      />
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
                onClick={() => handlePostClick(featuredPosts[0].slug)}
              >
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <BlogImage
                      pexelsQuery={featuredPosts[0].pexelsQuery}
                      fallbackImage={featuredPosts[0].image}
                      alt={`${featuredPosts[0].title} - Artículo destacado`}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="eager"
                      width={800}
                      height={450}
                      fetchpriority="high"
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
                          handlePostClick(featuredPosts[0].slug);
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
                  onClick={() => handlePostClick(post.slug)}
                >
                  <BlogImage
                    pexelsQuery={post.pexelsQuery}
                    fallbackImage={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
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
                    onClick={() => handlePostClick(post.slug)}
              >
                <BlogImage
                  pexelsQuery={post.pexelsQuery}
                  fallbackImage={post.image}
                  alt={`${post.title} - ${post.category}`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  width={400}
                  height={192}
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
                          handlePostClick(post.slug);
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
              const categoryCount = allPosts.filter(post => post.category === category).length;
              return (
                <Card 
                  key={category} 
                  className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => {
                    setCategoryFilter(category === "Todos" ? "" : category);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
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