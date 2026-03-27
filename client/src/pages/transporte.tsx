import { useState } from "react";
import { useLocation } from "wouter";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/ui/navigation";
import { SEOHead } from "@/components/seo-head";
import { WebsiteSchema } from "@/components/json-ld";
import { FAQSchema, FAQAccordion } from "@/components/faq-schema";
import { useI18n } from "@/contexts/i18n-context";
import { generateCarRentalLink, generateTransferLink, generateAffiliateLink, trackAffiliateClick } from "@/lib/affiliate";
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
  Navigation as NavigationIcon,
  Wifi,
  CheckCircle,
  Hotel,
  Star
} from "lucide-react";

export default function Transporte() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [transferDate, setTransferDate] = useState("");
  const [passengers, setPassengers] = useState("");

  const carRentalUrl = generateCarRentalLink('Cancun');
  const transferUrl = generateTransferLink('Cancun Airport', 'Tulum');
  const insuranceUrl = generateAffiliateLink('https://safetywing.com/nomad-insurance', 'safetyWing', 'insurance_tulum');
  const esimUrl = generateAffiliateLink('https://www.airalo.com/mexico', 'safetyWing', 'esim_mexico');

  const handleCarRentalClick = (carName: string, price: number) => {
    trackAffiliateClick('discovercars', carName, String(price), 'car-rental');
    window.open(carRentalUrl, '_blank');
  };

  const handleTransferClick = (serviceName: string, price: number) => {
    trackAffiliateClick('kiwitaxi', serviceName, String(price), 'transfer');
    window.open(transferUrl, '_blank');
  };

  const handleInsuranceClick = () => {
    trackAffiliateClick('safetyWing', 'Seguro de Viaje México', '0', 'insurance');
    window.open(insuranceUrl, '_blank');
  };

  const handleEsimClick = (plan: string, price: number) => {
    trackAffiliateClick('airalo', plan, String(price), 'esim');
    window.open(esimUrl, '_blank');
  };

  const carRentals = [
    {
      id: "1",
      name: "Compacto Económico",
      model: "Nissan March o similar",
      price: 35,
      features: ["Aire acondicionado", "5 puertas", "Manual", "Tarifas transparentes"],
      passengers: 4,
      luggage: 2,
      category: "Económico",
      description: "Autos compactos económicos para parejas. Perfectos para moverse por Tulum centro y zonas cercanas.",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: "2", 
      name: "SUV Familiar",
      model: "Toyota RAV4 o similar",
      price: 65,
      features: ["4x4", "Aire acondicionado", "Automático", "SUVs espaciosos"],
      passengers: 5,
      luggage: 4,
      category: "SUV",
      description: "SUVs espaciosos para familias. Ideales para explorar cenotes y carreteras de la península de Yucatán.",
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: "3",
      name: "Jeep 4x4 Aventurero",
      model: "Jeep Wrangler o similar", 
      price: 85,
      features: ["4x4", "Convertible", "Ideal aventureros", "Todo terreno"],
      passengers: 4,
      luggage: 2,
      category: "Premium",
      description: "Jeeps 4x4 para aventureros que buscan explorar senderos off-road y playas remotas con estilo.",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: "4",
      name: "Vehículo de Lujo",
      model: "BMW X3 o similar",
      price: 125,
      features: ["Premium", "Automático", "Cuero", "Para quien busca estilo"],
      passengers: 5,
      luggage: 4,
      category: "Lujo",
      description: "Vehículos de lujo para quienes buscan estilo y confort durante su estadía en Tulum.",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    }
  ];

  const transferServices = [
    {
      id: "1",
      name: "Traslado Privado en Coche",
      description: "Traslados privados en van o coche con chofer desde/hacia el Aeropuerto Internacional de Cancún hasta Tulum. Agua y toalla refrescante de cortesía.",
      price: 65,
      duration: "1.5 horas",
      passengers: "1-4 personas",
      vehicle: "Sedán cómodo",
      features: ["Conductor profesional", "Aire acondicionado", "Agua de cortesía", "Toalla refrescante"],
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: "2",
      name: "Traslado en Van Privada",
      description: "Servicio muy demandado en van espaciosa, perfecta para familias o grupos medianos con equipaje.",
      price: 95,
      duration: "1.5 horas",
      passengers: "1-8 personas", 
      vehicle: "Van espaciosa",
      features: ["Vehículo amplio", "Conductor bilingüe", "Agua incluida", "Espacio para equipaje"],
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: "3",
      name: "Shuttle para Eventos",
      description: "Transportes para grupos a eventos como Zamna o Day Zero, para que todos vayan y vuelvan seguros.",
      price: 45,
      duration: "Variable",
      passengers: "8-15 personas",
      vehicle: "Shuttle bus",
      features: ["Servicio grupal", "Evento específico", "Ida y vuelta", "Conductor designado"],
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    }
  ];

  const otherTransport = [
    {
      id: "1",
      name: "Renta de Bicicletas",
      description: "Explora Tulum de forma ecológica. Ideales para el centro de Tulum donde restaurantes, tiendas y cenotes están a distancia cicleable.",
      price: 15,
      unit: "/día",
      features: ["Casco incluido", "Candado de seguridad", "Mapa de rutas", "Perfecto para pueblo"],
      icon: <Bike className="w-8 h-8" />
    },
    {
      id: "2", 
      name: "Motos Scooter",
      description: "Libertad total para explorar cenotes, pueblos cercanos y playas escondidas a tu propio ritmo. Vehículos alternativos perfectos para aventureros.",
      price: 25,
      unit: "/día",
      features: ["Sin licencia requerida", "Casco incluido", "Seguro básico", "Gasolina incluida"],
      icon: <NavigationIcon className="w-8 h-8" />
    },
    {
      id: "3",
      name: "Golf Cart",
      description: "Perfectos para la zona hotelera de Tulum. Cómodos y divertidos, ideales para distancias cortas con velocidades limitadas y seguras.",
      price: 45,
      unit: "/día",
      features: ["4 pasajeros", "Fácil manejo", "Ideal zona hotelera", "Eléctrico"],
      icon: <Car className="w-8 h-8" />
    }
  ];

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={t('transporte.title')}
        description={t('transporte.description')}
        keywords={[
          'transporte tulum',
          'transporte en tulum',
          'renta autos tulum',
          'traslado cancun tulum',
          'transporte aeropuerto cancun tulum',
          'renta carros tulum',
          'shuttle cancun tulum',
          'taxi cancun tulum',
          'transporte tulum mexico',
          'como llegar a tulum'
        ]}
        canonicalUrl={`${siteUrl}/transporte`}
        ogType="website"
        currentPath="/transporte"
      />
      <WebsiteSchema siteUrl={siteUrl} siteName="TulumTkts" />
      
      {/* FAQs Schema */}
      <FAQSchema faqs={[
        {
          question: "¿Cómo llegar del aeropuerto de Cancún a Tulum?",
          answer: "Desde el aeropuerto de Cancún a Tulum tienes varias opciones: traslado privado ($80-150 USD, más cómodo), shuttle compartido ($25-50 USD por persona, económico), taxi ($100-180 USD, rápido pero caro), renta de auto ($35-85 USD/día, más flexible), o ADO bus ($15-25 USD, más económico pero menos flexible). El viaje toma aproximadamente 90-120 minutos dependiendo del tráfico."
        },
        {
          question: "¿Cuánto cuesta el transporte del aeropuerto de Cancún a Tulum?",
          answer: "El costo del transporte del aeropuerto de Cancún a Tulum varía según la opción elegida: traslado privado ($80-150 USD ida y vuelta), shuttle compartido ($25-50 USD por persona), taxi ($100-180 USD), renta de auto ($35-85 USD/día más gasolina), o bus ADO ($15-25 USD). Los precios pueden variar según temporada y demanda."
        },
        {
          question: "¿Necesito rentar un auto en Tulum?",
          answer: "Rentar un auto en Tulum es recomendable si planeas explorar cenotes, ruinas, o áreas cercanas como Coba o Playa del Carmen de forma independiente. No es necesario si te quedas en la zona hotelera o pueblo de Tulum, donde puedes usar taxis, colectivos, o caminar. Los colectivos son económicos ($25-50 MXN) para viajes cortos."
        },
        {
          question: "¿Cómo moverse dentro de Tulum?",
          answer: "Dentro de Tulum puedes moverte en: bicicleta (ideal para zona hotelera, $10-20 USD/día), taxi (conveniente, $5-15 USD trayectos cortos), colectivo (económico, $25-50 MXN), caminar (zona hotelera es transitable), o renta de auto (si planeas explorar mucho). Muchos hoteles ofrecen traslados gratuitos o bicicletas para huéspedes."
        },
        {
          question: "¿Es seguro conducir en Tulum?",
          answer: "Sí, es relativamente seguro conducir en Tulum. Las carreteras principales están en buen estado, pero es importante ser precavido: conducir con cuidado especialmente de noche, respetar límites de velocidad, estar atento a topes (badenes), y evitar áreas desoladas. El tráfico puede ser pesado durante temporada alta. Un seguro de auto es recomendable."
        },
        {
          question: "¿Hay transporte público en Tulum?",
          answer: "Sí, Tulum tiene transporte público limitado pero funcional. Los colectivos (combis) conectan el pueblo con la zona hotelera, cenotes cercanos, y ciudades como Playa del Carmen ($25-50 MXN). También hay taxis disponibles en toda la zona. Para destinos más lejanos, los buses ADO conectan Tulum con Cancún, Playa del Carmen, y otras ciudades de la Riviera Maya."
        }
      ]} />
      
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600">
            <a href="/" className="hover:text-primary">{t('transporte.breadcrumb.home')}</a>
            <span className="mx-2">/</span>
            <a href="/tulum-guia-completa" className="hover:text-primary">{t('transporte.breadcrumb.guide')}</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{t('transporte.breadcrumb.current')}</span>
          </nav>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-primary to-secondary">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative flex items-center justify-center h-full text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t('transporte.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              {t('transporte.hero.subtitle')}
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
                {t('transporte.tabs.carRentals')}
              </TabsTrigger>
              <TabsTrigger value="transfers" className="flex items-center gap-2">
                <Plane className="w-4 h-4" />
                {t('transporte.tabs.transfers')}
              </TabsTrigger>
              <TabsTrigger value="other" className="flex items-center gap-2">
                <Bike className="w-4 h-4" />
                {t('transporte.tabs.other')}
              </TabsTrigger>
            </TabsList>

            {/* Car Rentals */}
            <TabsContent value="cars">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('transporte.tabs.carRentals.title')}</h2>
                <p className="text-gray-600 mb-6">
                  {t('transporte.tabs.carRentals.description')}
                </p>

                {/* Car Rental Search */}
                <Card className="p-6 mb-8">
                  <h3 className="text-lg font-semibold mb-4">{t('transporte.tabs.carRentals.searchTitle')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="block text-sm font-medium mb-2">{t('transporte.search.pickupDate')}</Label>
                      <Input 
                        type="date" 
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium mb-2">{t('transporte.search.returnDate')}</Label>
                      <Input 
                        type="date" 
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium mb-2">{t('transporte.search.passengers')}</Label>
                      <Select value={passengers} onValueChange={setPassengers}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('labels.selectGuests')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 {t('transporte.search.passengers')}</SelectItem>
                          <SelectItem value="4">4 {t('transporte.search.passengers')}</SelectItem>
                          <SelectItem value="5">5 {t('transporte.search.passengers')}</SelectItem>
                          <SelectItem value="8">8+ {t('transporte.search.passengers')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button
                        className="w-full bg-primary text-white hover:bg-primary/90"
                        onClick={() => {
                          trackAffiliateClick('discovercars', 'Búsqueda Autos Cancún', '0', 'car-rental');
                          window.open(carRentalUrl, '_blank');
                        }}
                      >
                        {t('buttons.search')}
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
                            <span className="text-sm text-gray-500">{t('transporte.units.perDay')}</span>
                          </div>
                        </div>
                        
                        <h3 className="font-bold text-gray-900 mb-1">{car.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{car.model}</p>
                        <p className="text-xs text-gray-500 mb-3">{car.description}</p>
                        
                        <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{car.passengers} {t('transporte.units.people')}</span>
                          </div>
                          <div className="flex items-center">
                            <Truck className="w-4 h-4 mr-1" />
                            <span>{car.luggage} {t('transporte.units.bags')}</span>
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
                                +{car.features.length - 2} {t('transporte.units.more')}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <Button
                          className="w-full bg-primary text-white hover:bg-primary/90"
                          onClick={() => handleCarRentalClick(car.name, car.price)}
                        >
                          {t('transporte.buttons.bookNow')}
                          <ArrowRight className="w-4 h-4 ml-2" />
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('transporte.tabs.transfers.title')}</h2>
                <p className="text-gray-600 mb-6">
                  {t('transporte.tabs.transfers.description')}
                </p>

                {/* Transfer Booking Form */}
                <Card className="p-6 mb-8">
                  <h3 className="text-lg font-semibold mb-4">{t('transporte.tabs.transfers.searchTitle')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="block text-sm font-medium mb-2">{t('transporte.form.flightDate')}</Label>
                      <Input
                        type="date"
                        value={transferDate}
                        onChange={(e) => setTransferDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium mb-2">{t('transporte.form.arrivalTime')}</Label>
                      <Input type="time" />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium mb-2">{t('transporte.form.passengers')}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={t('transporte.form.quantity')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">{t('transporte.form.passengerOptions.one')}</SelectItem>
                          <SelectItem value="2">{t('transporte.form.passengerOptions.two')}</SelectItem>
                          <SelectItem value="4">{t('transporte.form.passengerOptions.threeFour')}</SelectItem>
                          <SelectItem value="6">{t('transporte.form.passengerOptions.fiveSix')}</SelectItem>
                          <SelectItem value="8">{t('transporte.form.passengerOptions.sevenPlus')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button
                        className="w-full bg-primary text-white hover:bg-primary/90"
                        onClick={() => {
                          trackAffiliateClick('kiwitaxi', 'Cotizar Traslado Cancún-Tulum', '0', 'transfer');
                          window.open(transferUrl, '_blank');
                        }}
                      >
                        {t('transporte.buttons.quoteTransfer')}
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
                          <span className="text-sm text-gray-500">{t('transporte.units.perTrip')}</span>
                        </div>
                        <Button
                          className="bg-primary text-white hover:bg-primary/90"
                          onClick={() => handleTransferClick(service.name, service.price)}
                        >
                          {t('transporte.buttons.book')}
                          <ArrowRight className="w-4 h-4 ml-2" />
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('transporte.tabs.other.title')}</h2>
                <p className="text-gray-600">
                  {t('transporte.tabs.other.description')}
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
                    
                    <Button
                      className="w-full bg-primary text-white hover:bg-primary/90"
                      onClick={() => handleCarRentalClick(transport.name, transport.price)}
                    >
                      {t('transporte.buttons.rentNow')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Card>
                ))}
              </div>

              {/* Transportation Tips */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('transporte.tips.title')}</h3>
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

      {/* Travel Insurance Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-4">
              <Shield className="w-7 h-7 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('transporte.insurance.title')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('transporte.insurance.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Cobertura médica internacional</p>
                    <p className="text-sm text-gray-600">Hasta $250,000 USD en gastos médicos de emergencia en México.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Cancelación del viaje</p>
                    <p className="text-sm text-gray-600">Recupera tus gastos si tu viaje se cancela por causas imprevistas.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Protección de equipaje</p>
                    <p className="text-sm text-gray-600">Cobertura por pérdida, robo o daño de tu equipaje.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Asistencia 24/7 en español</p>
                    <p className="text-sm text-gray-600">Línea de emergencias disponible las 24 horas, los 7 días.</p>
                  </div>
                </li>
              </ul>
            </div>

            <Card className="p-8 border-2 border-green-100 bg-green-50">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-1">{t('transporte.insurance.from')}</p>
                <p className="text-4xl font-bold text-green-600">$1.50 <span className="text-lg font-normal text-gray-500">{t('transporte.insurance.perDay')}</span></p>
                <p className="text-sm text-gray-500 mt-1">Con SafetyWing Nomad Insurance</p>
              </div>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Sin edad mínima requerida</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Activa en minutos, antes o durante tu viaje</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Cancela cuando quieras</li>
              </ul>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white text-base font-semibold py-3"
                onClick={handleInsuranceClick}
              >
                Cotizar Seguro
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-gray-400 text-center mt-3">Serás redirigido a SafetyWing para completar tu compra</p>
            </Card>
          </div>
        </div>
      </section>

      {/* eSIM Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-4">
              <Wifi className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('transporte.esim.title')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('transporte.esim.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Plan 1 */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">Básico</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">$4.50 <span className="text-base font-normal text-gray-500">USD</span></p>
              </div>
              <div className="mb-6">
                <p className="text-lg font-semibold text-gray-800">1 GB</p>
                <p className="text-sm text-gray-500">Válido 7 días</p>
                <p className="text-xs text-gray-400 mt-2">Ideal para estancias cortas o uso básico de mapas y mensajería</p>
              </div>
              <Button
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => handleEsimClick('eSIM 1GB 7 días', 4.50)}
              >
                {t('transporte.esim.buy')}
              </Button>
            </Card>

            {/* Plan 2 - Popular */}
            <Card className="p-6 text-center border-2 border-blue-500 relative hover:shadow-lg transition-shadow">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-3 py-1">Más Popular</Badge>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">Recomendado</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">$11 <span className="text-base font-normal text-gray-500">USD</span></p>
              </div>
              <div className="mb-6">
                <p className="text-lg font-semibold text-gray-800">3 GB</p>
                <p className="text-sm text-gray-500">Válido 30 días</p>
                <p className="text-xs text-gray-400 mt-2">Perfecto para una semana completa explorando Tulum y la Riviera Maya</p>
              </div>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleEsimClick('eSIM 3GB 30 días', 11)}
              >
                {t('transporte.esim.buy')}
              </Button>
            </Card>

            {/* Plan 3 */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">Premium</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">$16 <span className="text-base font-normal text-gray-500">USD</span></p>
              </div>
              <div className="mb-6">
                <p className="text-lg font-semibold text-gray-800">5 GB</p>
                <p className="text-sm text-gray-500">Válido 30 días</p>
                <p className="text-xs text-gray-400 mt-2">Para trabajadores remotos y viajeros que necesitan conectividad constante</p>
              </div>
              <Button
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => handleEsimClick('eSIM 5GB 30 días', 16)}
              >
                {t('transporte.esim.buy')}
              </Button>
            </Card>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-blue-700">Sin chip físico</p>
              <p className="text-sm text-gray-500">Actívala digitalmente</p>
            </div>
            <div>
              <p className="text-lg font-bold text-blue-700">Cobertura 4G/5G</p>
              <p className="text-sm text-gray-500">En toda la Riviera Maya</p>
            </div>
            <div>
              <p className="text-lg font-bold text-blue-700">Activa online</p>
              <p className="text-sm text-gray-500">Antes o durante el viaje</p>
            </div>
            <div>
              <p className="text-lg font-bold text-blue-700">Compatible iPhone & Android</p>
              <p className="text-sm text-gray-500">Con soporte eSIM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-sell: Completa tu viaje */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('transporte.crossSell.title')}</h2>
            <p className="text-gray-600">{t('transporte.crossSell.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/vuelos"
              className="group block"
              onClick={() => trackAffiliateClick('aviasales', 'Cross-sell Vuelos', '0', 'cross-sell')}
            >
              <Card className="p-6 hover:shadow-lg transition-all group-hover:border-primary border-2 border-transparent">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Plane className="w-6 h-6 text-primary" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-lg">Vuelos Baratos</h3>
                <p className="text-sm text-gray-600">Encuentra vuelos baratos a Cancún desde tu ciudad. Compara precios y ahorra en tu billete.</p>
              </Card>
            </a>

            <a
              href="/hoteles"
              className="group block"
            >
              <Card className="p-6 hover:shadow-lg transition-all group-hover:border-primary border-2 border-transparent">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Hotel className="w-6 h-6 text-primary" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-lg">Hoteles en Tulum</h3>
                <p className="text-sm text-gray-600">Reserva tu hotel en Tulum al mejor precio. Desde eco-lodges hasta resorts de lujo en la selva.</p>
              </Card>
            </a>

            <a
              href="/experiencias"
              className="group block"
            >
              <Card className="p-6 hover:shadow-lg transition-all group-hover:border-primary border-2 border-transparent">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-lg">Actividades Increíbles</h3>
                <p className="text-sm text-gray-600">Descubre los cenotes, ruinas mayas, y tours más populares de Tulum y la Riviera Maya.</p>
              </Card>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}