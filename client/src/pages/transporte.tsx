import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { 
  Car, 
  Plane, 
  Clock, 
  Users, 
  MapPin, 
  Shield, 
  Fuel, 
  Calendar,
  ArrowRight,
  Bike,
  Truck,
  Navigation
} from "lucide-react";

export default function Transporte() {
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [transferDate, setTransferDate] = useState("");
  const [passengers, setPassengers] = useState("");

  const carRentals = [
    {
      id: "1",
      name: "Compacto Económico",
      model: "Nissan March o similar",
      price: 35,
      features: ["Aire acondicionado", "5 puertas", "Manual", "Combustible eficiente"],
      passengers: 4,
      luggage: 2,
      category: "Económico",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: "2", 
      name: "SUV Familiar",
      model: "Toyota RAV4 o similar",
      price: 65,
      features: ["4x4", "Aire acondicionado", "Automático", "GPS incluido"],
      passengers: 5,
      luggage: 4,
      category: "SUV",
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: "3",
      name: "Jeep Aventura",
      model: "Jeep Wrangler o similar", 
      price: 85,
      features: ["Convertible", "4x4", "Ideal para playa", "Seguro todo riesgo"],
      passengers: 4,
      luggage: 2,
      category: "Premium",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: "4",
      name: "Minivan Grupo",
      model: "Honda Odyssey o similar",
      price: 95,
      features: ["8 pasajeros", "Amplio equipaje", "Automático", "Ideal familias"],
      passengers: 8,
      luggage: 6,
      category: "Van",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    }
  ];

  const transferServices = [
    {
      id: "1",
      name: "Traslado Privado Estándar",
      description: "Servicio directo del aeropuerto a tu hotel en vehículo cómodo y con aire acondicionado.",
      price: 65,
      duration: "1.5 horas",
      passengers: "1-4 personas",
      vehicle: "Sedán o similar",
      features: ["Conductor profesional", "Aire acondicionado", "WiFi gratis", "Agua cortesía"],
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: "2",
      name: "Traslado SUV Premium",
      description: "Viaja con estilo en un SUV de lujo con todas las comodidades para grupos medianos.",
      price: 95,
      duration: "1.5 horas",
      passengers: "1-6 personas", 
      vehicle: "SUV Premium",
      features: ["Vehículo de lujo", "Conductor bilingüe", "Bebidas incluidas", "Cargadores USB"],
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: "3",
      name: "Van Grupal",
      description: "Perfecto para grupos grandes o familias con mucho equipaje. Amplio y confortable.",
      price: 125,
      duration: "1.5 horas",
      passengers: "7-12 personas",
      vehicle: "Van o Sprinter",
      features: ["Amplio espacio", "Equipaje extra", "Conductor experimentado", "Aire acondicionado"],
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    }
  ];

  const otherTransport = [
    {
      id: "1",
      name: "Renta de Bicicletas",
      description: "Explora Tulum de forma ecológica con nuestras bicicletas de alta calidad.",
      price: 15,
      unit: "/día",
      features: ["Casco incluido", "Candado de seguridad", "Mapa de rutas", "Soporte 24h"],
      icon: <Bike className="w-8 h-8" />
    },
    {
      id: "2", 
      name: "Motos Scooter",
      description: "Movilízate rápido y fácil por Tulum con nuestras motos scooter automáticas.",
      price: 25,
      unit: "/día",
      features: ["Licencia no requerida", "Casco incluido", "Seguro básico", "Gasolina incluida"],
      icon: <Navigation className="w-8 h-8" />
    },
    {
      id: "3",
      name: "Golf Cart",
      description: "Perfectos para la zona hotelera, cómodos y divertidos para toda la familia.",
      price: 45,
      unit: "/día",
      features: ["4 pasajeros", "Fácil manejo", "Ideal playa", "Carga eléctrica"],
      icon: <Car className="w-8 h-8" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-primary to-secondary">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative flex items-center justify-center h-full text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Transporte en Tulum
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Renta de autos, traslados y más opciones de movilidad
            </p>
          </div>
        </div>
      </section>

      {/* Transportation Tabs */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="cars" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="cars" className="flex items-center gap-2">
                <Car className="w-4 h-4" />
                Renta de Autos
              </TabsTrigger>
              <TabsTrigger value="transfers" className="flex items-center gap-2">
                <Plane className="w-4 h-4" />
                Traslados
              </TabsTrigger>
              <TabsTrigger value="other" className="flex items-center gap-2">
                <Bike className="w-4 h-4" />
                Otros Transportes
              </TabsTrigger>
            </TabsList>

            {/* Car Rentals */}
            <TabsContent value="cars">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Renta de Autos en Tulum</h2>
                <p className="text-gray-600 mb-6">
                  Encuentra el vehículo perfecto para explorar Tulum y la Riviera Maya a tu ritmo.
                </p>

                {/* Car Rental Search */}
                <Card className="p-6 mb-8">
                  <h3 className="text-lg font-semibold mb-4">Busca tu auto ideal</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="block text-sm font-medium mb-2">Fecha de recogida</Label>
                      <Input 
                        type="date" 
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium mb-2">Fecha de devolución</Label>
                      <Input 
                        type="date" 
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium mb-2">Pasajeros</Label>
                      <Select value={passengers} onValueChange={setPassengers}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 pasajeros</SelectItem>
                          <SelectItem value="4">4 pasajeros</SelectItem>
                          <SelectItem value="5">5 pasajeros</SelectItem>
                          <SelectItem value="8">8+ pasajeros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full bg-primary text-white hover:bg-primary/90">
                        Buscar Autos
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Car Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {carRentals.map((car) => (
                  <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex">
                      <img 
                        src={car.image} 
                        alt={car.name}
                        className="w-48 h-32 object-cover"
                      />
                      <CardContent className="flex-1 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{car.category}</Badge>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-primary">€{car.price}</span>
                            <span className="text-sm text-gray-500">/día</span>
                          </div>
                        </div>
                        
                        <h3 className="font-bold text-gray-900 mb-1">{car.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{car.model}</p>
                        
                        <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{car.passengers} personas</span>
                          </div>
                          <div className="flex items-center">
                            <Truck className="w-4 h-4 mr-1" />
                            <span>{car.luggage} maletas</span>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {car.features.slice(0, 2).map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {car.features.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{car.features.length - 2} más
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <Button className="w-full bg-primary text-white hover:bg-primary/90">
                          Reservar Ahora
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Car Rental Info */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h4 className="font-semibold mb-2">Seguro Incluido</h4>
                  <p className="text-sm text-gray-600">Todos nuestros vehículos incluyen seguro básico y asistencia en carretera 24h.</p>
                </Card>
                <Card className="p-6 text-center">
                  <Fuel className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h4 className="font-semibold mb-2">Combustible Flexible</h4>
                  <p className="text-sm text-gray-600">Recoge con tanque lleno y devuelve como prefieras. Sin penalizaciones.</p>
                </Card>
                <Card className="p-6 text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h4 className="font-semibold mb-2">Múltiples Ubicaciones</h4>
                  <p className="text-sm text-gray-600">Recogida en aeropuerto, hoteles o nuestras oficinas en Tulum centro.</p>
                </Card>
              </div>
            </TabsContent>

            {/* Transfers */}
            <TabsContent value="transfers">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Traslados Privados</h2>
                <p className="text-gray-600 mb-6">
                  Servicio de traslado desde el Aeropuerto de Cancún hasta tu hotel en Tulum con total comodidad.
                </p>

                {/* Transfer Booking Form */}
                <Card className="p-6 mb-8">
                  <h3 className="text-lg font-semibold mb-4">Reserva tu traslado</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="block text-sm font-medium mb-2">Fecha del vuelo</Label>
                      <Input 
                        type="date" 
                        value={transferDate}
                        onChange={(e) => setTransferDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium mb-2">Hora de llegada</Label>
                      <Input type="time" />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium mb-2">Pasajeros</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Cantidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 pasajero</SelectItem>
                          <SelectItem value="2">2 pasajeros</SelectItem>
                          <SelectItem value="4">3-4 pasajeros</SelectItem>
                          <SelectItem value="6">5-6 pasajeros</SelectItem>
                          <SelectItem value="8">7+ pasajeros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full bg-primary text-white hover:bg-primary/90">
                        Cotizar Traslado
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Transfer Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {transferServices.map((service) => (
                  <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                      
                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{service.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{service.passengers}</span>
                        </div>
                        <div className="flex items-center">
                          <Car className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{service.vehicle}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {service.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-primary">€{service.price}</span>
                          <span className="text-sm text-gray-500">/viaje</span>
                        </div>
                        <Button className="bg-primary text-white hover:bg-primary/90">
                          Reservar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Transfer Route Info */}
              <div className="mt-12">
                <Card className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Ruta Cancún ↔ Tulum</h3>
                    <p className="text-gray-600">Información sobre tu traslado</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                      <Plane className="w-12 h-12 mx-auto mb-4 text-primary" />
                      <h4 className="font-semibold mb-2">Aeropuerto de Cancún</h4>
                      <p className="text-sm text-gray-600">Recogida directa en el área de llegadas internacionales</p>
                    </div>
                    <div>
                      <ArrowRight className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h4 className="font-semibold mb-2">118 km • 1.5 horas</h4>
                      <p className="text-sm text-gray-600">Viaje directo por carretera federal en vehículos cómodos</p>
                    </div>
                    <div>
                      <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
                      <h4 className="font-semibold mb-2">Tu Hotel en Tulum</h4>
                      <p className="text-sm text-gray-600">Llegada directa a la puerta de tu alojamiento</p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Other Transport */}
            <TabsContent value="other">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Otros Transportes</h2>
                <p className="text-gray-600">
                  Alternativas de movilidad para explorar Tulum de manera única y divertida.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherTransport.map((transport) => (
                  <Card key={transport.id} className="p-6 hover:shadow-lg transition-shadow text-center">
                    <div className="mb-4 text-primary">
                      {transport.icon}
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-2">{transport.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{transport.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-primary">€{transport.price}</span>
                      <span className="text-sm text-gray-500">{transport.unit}</span>
                    </div>

                    <div className="mb-6">
                      <div className="grid grid-cols-2 gap-2">
                        {transport.features.map((feature, index) => (
                          <div key={index} className="text-xs text-gray-600 bg-gray-50 rounded px-2 py-1">
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-primary text-white hover:bg-primary/90">
                      Rentar Ahora
                    </Button>
                  </Card>
                ))}
              </div>

              {/* Transportation Tips */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Consejos de Transporte en Tulum</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h4 className="font-semibold mb-3">🚗 Para la Zona Hotelera</h4>
                    <p className="text-sm text-gray-600">
                      Los golf carts son perfectos para moverte por la zona hotelera. Las distancias son cortas y 
                      las velocidades limitadas hacen que sea seguro y divertido.
                    </p>
                  </Card>
                  <Card className="p-6">
                    <h4 className="font-semibold mb-3">🚲 Para el Pueblo</h4>
                    <p className="text-sm text-gray-600">
                      Las bicicletas son ideales para explorar el centro de Tulum. La mayoría de restaurantes, 
                      tiendas y cenotes cercanos están a distancia cicleable.
                    </p>
                  </Card>
                  <Card className="p-6">
                    <h4 className="font-semibold mb-3">🏍️ Para Aventureros</h4>
                    <p className="text-sm text-gray-600">
                      Las motos scooter te dan libertad total para explorar cenotes, pueblos cercanos y 
                      playas escondidas a tu propio ritmo.
                    </p>
                  </Card>
                  <Card className="p-6">
                    <h4 className="font-semibold mb-3">🚙 Para Excursiones</h4>
                    <p className="text-sm text-gray-600">
                      Si planeas visitar Chichén Itzá, Valladolid o otros destinos lejanos, un auto 
                      con aire acondicionado será tu mejor opción.
                    </p>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}