import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, Search, Filter, Star, Heart, Users, Camera } from "lucide-react";
import { generateAffiliateLink, trackAffiliateClick } from "@/lib/affiliate";
import { AffiliateBanner } from "@/components/ui/affiliate-banner";

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
      title: "Zona Arqueológica de Tulum - Castillo frente al Mar",
      description: "Explora el famoso sitio frente al mar Caribe, con su castillo sobre el acantilado y vistas espectaculares. Sumérgete en la historia maya con guías expertos.",
      duration: "4 horas",
      location: "Tulum",
      category: "Arqueológicos y Culturales",
      price: "€65",
      rating: 4.9,
      reviews: 342,
      groupSize: "2-15 personas",
      image: "https://images.unsplash.com/photo-1574181419028-e8c44c95a6d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      includes: ["Guía experto", "Entrada incluida", "Transporte", "Agua embotellada"]
    },
    {
      id: "2",
      title: "Chichén Itzá - Nueva Maravilla del Mundo",
      description: "Excursión de día completo a una de las Nuevas 7 Maravillas del Mundo. Incluye parada en cenote sagrado y pueblo colonial de Valladolid.",
      duration: "12 horas",
      location: "Chichén Itzá",
      category: "Arqueológicos y Culturales",
      price: "€159",
      rating: 4.8,
      reviews: 278,
      groupSize: "8-25 personas",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      includes: ["Transporte A/C", "Guía certificado", "Almuerzo buffet", "Cenote Ik Kil", "Valladolid"]
    },
    {
      id: "3",
      title: "Cobá - Sube a la Pirámide Nohoch Mul",
      description: "Donde puedes subir a la pirámide Nohoch Mul para dominar la jungla. Única pirámide escalable en la región maya.",
      duration: "6 horas",
      location: "Cobá",
      category: "Arqueológicos y Culturales",
      price: "€89",
      rating: 4.7,
      reviews: 156,
      groupSize: "4-12 personas",
      image: "https://images.unsplash.com/photo-1552832230-1a28d5cf8389?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      includes: ["Transporte", "Bicicletas incluidas", "Guía bilingüe", "Refrescos"]
    },
    {
      id: "4",
      title: "Gran Cenote y Dos Ojos - Snorkel en Ríos Subterráneos",
      description: "Snorkel en cenotes de agua dulce cristalina. Aprecia formaciones de estalactitas bajo el agua en los cenotes más famosos de Tulum.",
      duration: "5 horas",
      location: "Gran Cenote - Dos Ojos",
      category: "Cenotes y Snorkel",
      price: "€85",
      rating: 4.9,
      reviews: 423,
      groupSize: "2-10 personas",
      image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      includes: ["Equipo de snorkel", "Chalecos salvavidas", "Toallas", "Cámara acuática"]
    },
    {
      id: "5",
      title: "Tortugas Marinas en Akumal + Cenote Casa Tortuga",
      description: "Nada con tortugas marinas en Akumal y explora varios cenotes abiertos y cerrados en Casa Tortuga. Día completo de aventura acuática.",
      duration: "8 horas",
      location: "Akumal - Casa Tortuga",
      category: "Cenotes y Snorkel",
      price: "€115",
      rating: 4.8,
      reviews: 267,
      groupSize: "4-12 personas",
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      includes: ["Transporte", "Equipo completo", "Guía marino", "Almuerzo", "Lockers"]
    },
    {
      id: "6",
      title: "Expedición ATV - Día Lleno de Adrenalina",
      description: "Conduce por senderos selváticos, visita cenote para nadar y vuela en tirolesas sobre la jungla. Rappel en cenote y avistamiento de fauna.",
      duration: "7 horas",
      location: "Selva Maya",
      category: "Tours de Aventura",
      price: "€135",
      rating: 4.9,
      reviews: 189,
      groupSize: "2-8 personas",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      includes: ["ATV individual", "Tirolesas", "Rappel", "Cenote privado", "Equipo seguridad"]
    },
    {
      id: "7",
      title: "Safari Sian Ka'an - Biosfera UNESCO",
      description: "Recorrido en lancha por la biosfera de Sian Ka'an, avistando delfines, tortugas, aves exóticas y manglares. Naturaleza + aventura.",
      duration: "9 horas",
      location: "Reserva Sian Ka'an",
      category: "Tours de Aventura",
      price: "€165",
      rating: 4.8,
      reviews: 134,
      groupSize: "6-12 personas",
      image: "https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      includes: ["Transporte 4x4", "Paseo en lancha", "Guía naturalista", "Almuerzo", "Binoculares"]
    },
    {
      id: "8",
      title: "Ceremonia de Temazcal Tradicional",
      description: "Ritual de vapor guiado por chamán maya para purificación del cuerpo y alma. Experiencia espiritual auténtica en ambiente sagrado.",
      duration: "3 horas",
      location: "Centro Ceremonial",
      category: "Bienestar y Cultura",
      price: "€75",
      rating: 4.7,
      reviews: 98,
      groupSize: "4-8 personas",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      includes: ["Ceremonia completa", "Chamán certificado", "Hierbas medicinales", "Té herbal"]
    },
    {
      id: "9",
      title: "Yoga en la Playa + Meditación al Amanecer",
      description: "Clases de yoga en la playa de Tulum con vista al mar Caribe. Sesiones de meditación al amanecer para conectar con la naturaleza.",
      duration: "2 horas",
      location: "Playa Tulum",
      category: "Bienestar y Cultura",
      price: "€45",
      rating: 4.6,
      reviews: 156,
      groupSize: "1-15 personas",
      image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      includes: ["Mat de yoga", "Instructor certificado", "Agua de coco", "Vista al mar"]
    },
    {
      id: "10",
      title: "Cocina Yucateca - Taller Gastronómico",
      description: "Aprende a hacer platillos tradicionales como cochinita pibil y sopa de lima. Incluye visita al mercado local para ingredientes frescos.",
      duration: "4 horas",
      location: "Tulum Pueblo",
      category: "Bienestar y Cultura",
      price: "€85",
      rating: 4.8,
      reviews: 87,
      groupSize: "4-10 personas",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      includes: ["Ingredientes frescos", "Chef profesional", "Recetas impresas", "Comida completa"]
    },
    {
      id: "11",
      title: "Xel-Há - Parque Natural Acuático",
      description: "Snorkel ilimitado en caleta natural, toboganes, cenotes, río perezoso. Parque eco-arqueológico a 15 minutos de Tulum.",
      duration: "8 horas",
      location: "Xel-Há",
      category: "Parques y Atracciones",
      price: "€125",
      rating: 4.7,
      reviews: 234,
      groupSize: "1-20 personas",
      image: "https://images.unsplash.com/photo-1527004760525-b2e6bb39c544?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      includes: ["Entrada completa", "Equipo snorkel", "Buffet libre", "Bebidas incluidas"]
    },
    {
      id: "12",
      title: "Akumal Monkey Sanctuary - Rescate Animal",
      description: "Reserva de rescate animal donde puedes interactuar con monos araña rescatados y aprender sobre conservación de fauna local.",
      duration: "3 horas",
      location: "Akumal",
      category: "Parques y Atracciones",
      price: "€55",
      rating: 4.5,
      reviews: 78,
      groupSize: "2-12 personas",
      image: "https://images.unsplash.com/photo-1607295644303-8c7ba47c70f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      includes: ["Entrada al santuario", "Guía especialista", "Interacción guiada", "Donación incluida"]
    }
  ];

  const categories = [
    "Todos",
    "Arqueológicos y Culturales", 
    "Cenotes y Snorkel",
    "Tours de Aventura",
    "Bienestar y Cultura",
    "Parques y Atracciones"
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
            <div className="flex gap-4 w-full md:w-auto">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[250px]">
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

      {/* Affiliate Banner */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AffiliateBanner />
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="todos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 mb-6 md:mb-8 h-auto p-1">
              <TabsTrigger value="todos" className="text-xs sm:text-sm">Todos</TabsTrigger>
              <TabsTrigger value="arqueologicos" className="text-xs sm:text-sm">Arqueológicos</TabsTrigger>
              <TabsTrigger value="cenotes" className="text-xs sm:text-sm">Cenotes</TabsTrigger>
              <TabsTrigger value="aventura" className="text-xs sm:text-sm">Aventura</TabsTrigger>
              <TabsTrigger value="bienestar" className="text-xs sm:text-sm">Bienestar</TabsTrigger>
              <TabsTrigger value="parques" className="text-xs sm:text-sm">Parques</TabsTrigger>
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
                <p className="text-gray-600">Exploraciones guiadas a los sitios arqueológicos emblemáticos de la región con guías expertos que relatan las leyendas y arquitectura de estos antiguos imperios mayas.</p>
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

            <TabsContent value="cenotes">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Cenotes y Snorkel</h3>
                <p className="text-gray-600">Descubre los famosos cenotes de la región - ríos subterráneos de agua dulce cristalina. Vive una aventura refrescante explorando cenotes ocultos y snorkeleando con tortugas.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory["Cenotes y Snorkel"]?.map((experience) => (
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
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Tours de Aventura en la Selva</h3>
                <p className="text-gray-600">Actividades para descargar adrenalina en los alrededores selváticos. Emoción garantizada con vehículos todo-terreno, tirolesas y chapuzones en cenotes escondidos.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory["Tours de Aventura"]?.map((experience) => (
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
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Experiencias de Bienestar y Cultura</h3>
                <p className="text-gray-600">Tulum es un epicentro bohemio y holístico. Actividades que conectan con la cultura local y el bienestar personal, desde ceremonias ancestrales hasta gastronomía yucateca.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory["Bienestar y Cultura"]?.map((experience) => (
                  <ExperienceCard 
                    key={experience.id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="parques">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Parques y Atracciones Cercanas</h3>
                <p className="text-gray-600">Aprovecha la ubicación estratégica de Tulum con entradas y tours a parques reconocidos de la Riviera Maya, desde parques acuáticos hasta santuarios de rescate animal.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory["Parques y Atracciones"]?.map((experience) => (
                  <ExperienceCard 
                    key={experience.id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
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
          <Button 
            size="sm" 
            className="bg-primary text-white hover:bg-primary/90"
            onClick={() => {
              const affiliateUrl = generateAffiliateLink('getyourguide');
              trackAffiliateClick('GetYourGuide', experience.title, experience.price, experience.category);
              window.open(affiliateUrl, '_blank');
            }}
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}