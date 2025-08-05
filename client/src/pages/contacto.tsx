import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Globe, 
  MessageCircle,
  Shield,
  Award,
  Users,
  Headphones
} from "lucide-react";

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    language: "es"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Here you would typically send the form data to your backend
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-primary to-secondary">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative flex items-center justify-center h-full text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Contacto
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Estamos aquí para hacer tu experiencia en Tulum perfecta
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Envíanos un Mensaje</h2>
              <p className="text-gray-600 mb-8">
                ¿Tienes preguntas sobre nuestros servicios? ¿Necesitas ayuda planificando tu viaje? 
                Nuestro equipo de expertos locales está listo para asistirte.
              </p>

              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nombre completo *</Label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="subject">Asunto</Label>
                        <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un tema" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">Consulta General</SelectItem>
                            <SelectItem value="booking">Reservas</SelectItem>
                            <SelectItem value="events">Eventos</SelectItem>
                            <SelectItem value="experiences">Experiencias</SelectItem>
                            <SelectItem value="villas">Villas & Alojamiento</SelectItem>
                            <SelectItem value="transport">Transporte</SelectItem>
                            <SelectItem value="partnerships">Alianzas Comerciales</SelectItem>
                            <SelectItem value="support">Soporte Técnico</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="language">Idioma preferido</Label>
                        <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="es">🇲🇽 Español</SelectItem>
                            <SelectItem value="en">🇺🇸 English</SelectItem>
                            <SelectItem value="fr">🇫🇷 Français</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Mensaje *</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Cuéntanos en qué podemos ayudarte..."
                        rows={6}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
                      Enviar Mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
              
              {/* Contact Methods */}
              <div className="space-y-6 mb-8">
                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Teléfono</h4>
                      <p className="text-gray-600 mb-1">+52 984 123 4567 (México)</p>
                      <p className="text-gray-600 mb-1">+1 555 123 4567 (US/Canada)</p>
                      <p className="text-gray-600">+33 1 23 45 67 89 (France)</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <MessageCircle className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">WhatsApp</h4>
                      <p className="text-gray-600 mb-1">+52 984 123 4567</p>
                      <p className="text-sm text-gray-500">Disponible 24/7 para consultas urgentes</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                      <p className="text-gray-600 mb-1">info@tulumtkts.com</p>
                      <p className="text-gray-600 mb-1">reservas@tulumtkts.com</p>
                      <p className="text-gray-600">soporte@tulumtkts.com</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Oficinas</h4>
                      <p className="text-gray-600 mb-1">Av. Tulum 123, Centro</p>
                      <p className="text-gray-600 mb-1">Tulum, Quintana Roo 77780</p>
                      <p className="text-gray-600">México</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Horarios de Atención</h4>
                      <p className="text-gray-600 mb-1">Lunes - Domingo: 8:00 AM - 10:00 PM</p>
                      <p className="text-gray-600 mb-1">Emergencias: 24/7</p>
                      <p className="text-sm text-gray-500">Horario del Este de México (UTC-5)</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Language Support */}
              <Card className="p-6 bg-primary text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="w-6 h-6" />
                  <h4 className="font-semibold">Soporte Multilingüe</h4>
                </div>
                <p className="text-gray-200 mb-3">
                  Nuestro equipo te atiende en tu idioma preferido:
                </p>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>🇪🇸 Español</div>
                  <div>🇺🇸 English</div>
                  <div>🇫🇷 Français</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sobre TulumTkts</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos la plataforma #1 de reservas en Tulum, conectando viajeros con experiencias auténticas 
              y alojamientos únicos en el paraíso caribeño.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h4 className="font-semibold text-gray-900 mb-2">Equipo Local</h4>
              <p className="text-sm text-gray-600">
                Expertos nacidos y criados en Tulum que conocen cada rincón del destino.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h4 className="font-semibold text-gray-900 mb-2">Garantía de Mejor Precio</h4>
              <p className="text-sm text-gray-600">
                Garantizamos los mejores precios o igualamos cualquier oferta competitiva.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Headphones className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h4 className="font-semibold text-gray-900 mb-2">Atención 24/7</h4>
              <p className="text-sm text-gray-600">
                Soporte continuo durante tu estadía para cualquier necesidad o emergencia.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h4 className="font-semibold text-gray-900 mb-2">Calidad Certificada</h4>
              <p className="text-sm text-gray-600">
                Todos nuestros socios están verificados y certificados para garantizar calidad.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Preguntas Frecuentes</h2>
          
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-2">¿Puedo cancelar mi reserva?</h4>
              <p className="text-gray-600">
                Las políticas de cancelación varían según el tipo de servicio. La mayoría permiten 
                cancelación gratuita hasta 24-48 horas antes. Consulta los términos específicos en tu reserva.
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-2">¿Ofrecen servicios de emergencia?</h4>
              <p className="text-gray-600">
                Sí, tenemos línea de emergencia 24/7. También contamos con seguros de viaje y 
                coordinación con servicios médicos locales.
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-2">¿Qué métodos de pago aceptan?</h4>
              <p className="text-gray-600">
                Aceptamos tarjetas de crédito/débito (Visa, MasterCard, American Express), 
                PayPal, transferencias bancarias y pagos en efectivo en nuestras oficinas.
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-2">¿Puedo modificar mi reserva después de confirmarla?</h4>
              <p className="text-gray-600">
                En la mayoría de casos sí, dependiendo de la disponibilidad y las políticas del proveedor. 
                Contáctanos lo antes posible para gestionar cualquier cambio.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Encuéntranos</h2>
          
          <Card className="overflow-hidden">
            <div className="bg-gray-200 h-96 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-16 h-16 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Oficinas TulumTkts</h4>
                <p>Av. Tulum 123, Centro</p>
                <p>Tulum, Quintana Roo 77780, México</p>
                <Button className="mt-4 bg-primary text-white hover:bg-primary/90">
                  Ver en Google Maps
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}