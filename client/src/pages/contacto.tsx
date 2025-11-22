import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/contexts/i18n-context";
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
  const { t } = useI18n();
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
              {t('contacto.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              {t('contacto.hero.subtitle')}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('contacto.form.title')}</h2>
              <p className="text-gray-600 mb-8">
                {t('contacto.form.description')}
              </p>

              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">{t('contacto.form.name')}</Label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder={t('contacto.form.placeholders.name')}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">{t('contacto.form.email')}</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder={t('contacto.form.placeholders.email')}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="subject">{t('contacto.form.subject')}</Label>
                        <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('contacto.form.placeholders.selectSubject')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">{t('contacto.form.subjects.general')}</SelectItem>
                            <SelectItem value="booking">{t('contacto.form.subjects.booking')}</SelectItem>
                            <SelectItem value="events">{t('contacto.form.subjects.events')}</SelectItem>
                            <SelectItem value="experiences">{t('contacto.form.subjects.experiences')}</SelectItem>
                            <SelectItem value="villas">{t('contacto.form.subjects.villas')}</SelectItem>
                            <SelectItem value="transport">{t('contacto.form.subjects.transport')}</SelectItem>
                            <SelectItem value="partnerships">{t('contacto.form.subjects.partnerships')}</SelectItem>
                            <SelectItem value="support">{t('contacto.form.subjects.support')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="language">{t('contacto.form.language')}</Label>
                        <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="es">🇲🇽 {t('contacto.form.languages.es')}</SelectItem>
                            <SelectItem value="en">🇺🇸 {t('contacto.form.languages.en')}</SelectItem>
                            <SelectItem value="fr">🇫🇷 {t('contacto.form.languages.fr')}</SelectItem>
                            <SelectItem value="it">🇮🇹 {t('contacto.form.languages.it')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">{t('contacto.form.message')}</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder={t('contacto.form.placeholders.message')}
                        rows={6}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
                      {t('contacto.form.send')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('contacto.contact.title')}</h2>
              
              {/* Contact Methods */}
              <div className="space-y-6 mb-8">
                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{t('contacto.contact.phone')}</h4>
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
                      <h4 className="font-semibold text-gray-900 mb-2">{t('contacto.contact.whatsapp')}</h4>
                      <p className="text-gray-600 mb-1">+52 984 123 4567</p>
                      <p className="text-sm text-gray-500">{t('contacto.contact.available247')}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{t('contacto.contact.email')}</h4>
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
                      <h4 className="font-semibold text-gray-900 mb-2">{t('contacto.contact.offices')}</h4>
                      <p className="text-gray-600 mb-1">{t('contacto.map.address1')}</p>
                      <p className="text-gray-600 mb-1">{t('contacto.map.address2')}</p>
                      <p className="text-gray-600">México</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{t('contacto.contact.hours')}</h4>
                      <p className="text-gray-600 mb-1">{t('contacto.contact.hoursValue')}</p>
                      <p className="text-gray-600 mb-1">{t('contacto.contact.emergencies')}</p>
                      <p className="text-sm text-gray-500">{t('contacto.contact.timezone')}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Language Support */}
              <Card className="p-6 bg-primary text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="w-6 h-6" />
                  <h4 className="font-semibold">{t('contacto.contact.multilingual')}</h4>
                </div>
                <p className="text-gray-200 mb-3">
                  {t('contacto.contact.multilingualDesc')}
                </p>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div>🇪🇸 {t('contacto.form.languages.es')}</div>
                  <div>🇺🇸 {t('contacto.form.languages.en')}</div>
                  <div>🇫🇷 {t('contacto.form.languages.fr')}</div>
                  <div>🇮🇹 {t('contacto.form.languages.it')}</div>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('contacto.about.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('contacto.about.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h4 className="font-semibold text-gray-900 mb-2">{t('contacto.about.team.title')}</h4>
              <p className="text-sm text-gray-600">
                {t('contacto.about.team.desc')}
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h4 className="font-semibold text-gray-900 mb-2">{t('contacto.about.guarantee.title')}</h4>
              <p className="text-sm text-gray-600">
                {t('contacto.about.guarantee.desc')}
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Headphones className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h4 className="font-semibold text-gray-900 mb-2">{t('contacto.about.support.title')}</h4>
              <p className="text-sm text-gray-600">
                {t('contacto.about.support.desc')}
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h4 className="font-semibold text-gray-900 mb-2">{t('contacto.about.quality.title')}</h4>
              <p className="text-sm text-gray-600">
                {t('contacto.about.quality.desc')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t('contacto.faq.title')}</h2>
          
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-2">{t('contacto.faq.q1.question')}</h4>
              <p className="text-gray-600">
                {t('contacto.faq.q1.answer')}
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-2">{t('contacto.faq.q2.question')}</h4>
              <p className="text-gray-600">
                {t('contacto.faq.q2.answer')}
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-2">{t('contacto.faq.q3.question')}</h4>
              <p className="text-gray-600">
                {t('contacto.faq.q3.answer')}
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-2">{t('contacto.faq.q4.question')}</h4>
              <p className="text-gray-600">
                {t('contacto.faq.q4.answer')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('contacto.map.title')}</h2>
          
          <Card className="overflow-hidden">
            <div className="bg-gray-200 h-96 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-16 h-16 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">{t('contacto.map.office')}</h4>
                <p>{t('contacto.map.address1')}</p>
                <p>{t('contacto.map.address2')}</p>
                <Button className="mt-4 bg-primary text-white hover:bg-primary/90">
                  {t('contacto.map.viewMap')}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}