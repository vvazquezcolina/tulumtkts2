import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, Search, Filter, Star, Heart, Users, Camera } from "lucide-react";

export default function Experiencias() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const experiences = [
    {
      id: "1",
      title: "Tour Ruinas de Tulum + Cenote + Tortugas en Akumal",
      description: "Descubre las ruinas mayas frente al mar, nada en cenotes cristalinos y snorkelea con tortugas marinas en un día completo de aventura.",
      duration: "8 horas",
      location: "Tulum - Akumal",
      category: "Arqueológicos y Culturales",
      price: "€89",
      rating: 4.9,
      reviews: 156,
      groupSize: "2-12 personas",
      image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      includes: ["Transporte", "Guía certificado", "Equipo de snorkel", "Almuerzo"]
    },
    {
      id: "2",
      title: "Aventura ATV en la Jungla y Cenote",
      description: "Día lleno de adrenalina manejando cuatrimotos por senderos de la jungla, lanzándote en tirolesa y nadando en cenotes sagrados.",
      duration: "6 horas",
      location: "Selva Maya",
      category: "Aventura y Naturaleza",
      price: "€125",
      rating: 4.8,
      reviews: 89,
      groupSize: "1-8 personas",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      includes: ["ATV individual", "Equipo de seguridad", "Cenote privado", "Refrigerios"]
    },
    {
      id: "3",
      title: "Retiro de Yoga y Temazcal",
      description: "Conecta con tu ser interior en una experiencia de bienestar que combina yoga al amanecer, ceremonia de temazcal y meditación.",
      duration: "4 horas",
      location: "Playa Tulum",
      category: "Bienestar y Lifestyle",
      price: "€75",
      rating: 4.7,
      reviews: 67,
      groupSize: "4-15 personas",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      includes: ["Clase de yoga", "Ceremonia temazcal", "Té herbal", "Meditación guiada"]
    },
    {
      id: "4",
      title: "Expedición Sian Ka'an UNESCO",
      description: "Explora la reserva de la biosfera Sian Ka'an, Patrimonio de la Humanidad, con avistamiento de vida silvestre y manglares.",
      duration: "10 horas",
      location: "Reserva Sian Ka'an",
      category: "Aventura y Naturaleza",
      price: "€145",
      rating: 4.9,
      reviews: 45,
      groupSize: "4-10 personas",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      includes: ["Transporte 4x4", "Guía naturalista", "Almuerzo eco", "Binoculares"]
    },
    {
      id: "5",
      title: "Tour Gastronómico Maya",
      description: "Sumérgete en los sabores auténticos de la cocina maya con clases de cocina, visita a mercados locales y degustación.",
      duration: "5 horas",
      location: "Pueblo de Tulum",
      category: "Bienestar y Lifestyle",
      price: "€95",
      rating: 4.6,
      reviews: 78,
      groupSize: "2-8 personas",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      includes: ["Clase de cocina", "Ingredientes locales", "Comida completa", "Recetas"]
    },
    {
      id: "6",
      title: "Buceo en Cenotes Dos Ojos",
      description: "Descubre el mundo subterráneo de los cenotes más famosos de México con buceo certificado en aguas cristalinas.",
      duration: "4 horas",
      location: "Cenote Dos Ojos",
      category: "Aventura y Naturaleza",
      price: "€110",
      rating: 4.8,
      reviews: 92,
      groupSize: "2-6 personas",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      includes: ["Equipo de buceo", "Instructor certificado", "2 inmersiones", "Fotos incluidas"]
    }
  ];

  const categories = [
    "Todos",
    "Arqueológicos y Culturales", 
    "Aventura y Naturaleza",
    "Bienestar y Lifestyle",
    "Vida Nocturna"
  ];

  const filteredExperiences = experiences.filter(experience => {
    const matchesSearch = experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         experience.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === "Todos" || experience.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const experiencesByCategory = categories.slice(1).reduce((acc, category) => {
    acc[category] = experiences.filter(exp => exp.category === category);
    return acc;
  }, {} as Record<string, typeof experiences>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-primary to-secondary">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative flex items-center justify-center h-full text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Experiencias y Tours
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Vive aventuras únicas en Tulum y la Riviera Maya
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
                placeholder="Buscar experiencias, tours, actividades..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[250px]">
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

      {/* Content Tabs */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="todos" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="arqueologicos">Arqueológicos</TabsTrigger>
              <TabsTrigger value="aventura">Aventura</TabsTrigger>
              <TabsTrigger value="bienestar">Bienestar</TabsTrigger>
              <TabsTrigger value="nocturna">Vida Nocturna</TabsTrigger>
            </TabsList>

            <TabsContent value="todos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExperiences.map((experience) => (
                  <ExperienceCard 
                    key={experience.id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="arqueologicos">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Tours Arqueológicos y Culturales</h3>
                <p className="text-gray-600">Descubre la fascinante historia maya con visitas a ruinas, ceremonias tradicionales y experiencias culturales auténticas.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory["Arqueológicos y Culturales"]?.map((experience) => (
                  <ExperienceCard 
                    key={experience.id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="aventura">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Aventura y Naturaleza</h3>
                <p className="text-gray-600">Vive la adrenalina con actividades extremas, explora cenotes, parques eco-arqueológicos y la increíble biodiversidad de la región.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory["Aventura y Naturaleza"]?.map((experience) => (
                  <ExperienceCard 
                    key={experience.id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bienestar">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Bienestar y Lifestyle</h3>
                <p className="text-gray-600">Conecta con tu ser interior a través de experiencias de yoga, temazcal, gastronomía local y relajación en entornos naturales.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory["Bienestar y Lifestyle"]?.map((experience) => (
                  <ExperienceCard 
                    key={experience.id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nocturna">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Vida Nocturna</h3>
                <p className="text-gray-600">Descubre la vibrante vida nocturna de Tulum con cenas exclusivas, espectáculos y acceso VIP a los mejores beach clubs.</p>
              </div>
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Próximamente experiencias de vida nocturna</p>
                <Button className="bg-primary text-white hover:bg-primary/90">
                  Notificarme cuando estén disponibles
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

function ExperienceCard({ experience, favorites, toggleFavorite }: {
  experience: any;
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
}) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
      <div className="relative">
        <img 
          src={experience.image} 
          alt={experience.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary text-white text-xs">{experience.category}</Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 backdrop-blur-sm rounded-full hover:bg-white h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(experience.id);
            }}
          >
            <Heart 
              className={`w-3 h-3 ${favorites.has(experience.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 text-xs">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" />
            ))}
          </div>
          <span className="ml-2 text-xs text-gray-600">({experience.rating}) {experience.reviews} reseñas</span>
        </div>
        
        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {experience.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{experience.description}</p>
        
        <div className="space-y-1 mb-3 text-xs text-gray-500">
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>{experience.duration}</span>
            <Users className="w-3 h-3 ml-3 mr-1" />
            <span>{experience.groupSize}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{experience.location}</span>
          </div>
        </div>

        <div className="mb-3">
          <div className="text-xs text-gray-500 mb-1">Incluye:</div>
          <div className="flex flex-wrap gap-1">
            {experience.includes.slice(0, 2).map((item: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {item}
              </Badge>
            ))}
            {experience.includes.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{experience.includes.length - 2} más
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">Desde</span>
            <div className="text-lg font-bold text-gray-900">{experience.price}</div>
          </div>
          <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}