import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/ui/navigation";
import { Star, Clock, Heart, Search, ArrowRight, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { generateAffiliateLink, trackAffiliateClick } from "@/lib/affiliate";
import { AffiliateBanner } from "@/components/ui/affiliate-banner";
import { useTulumExperiences, trackAffiliateClickAPI } from "@/hooks/use-travelpayouts";
import { SEOHead } from "@/components/seo-head";
import { WebsiteSchema } from "@/components/json-ld";
import { OrganizationSchema } from "@/components/organization-schema";
import { FAQSchema, FAQAccordion, FAQ } from "@/components/faq-schema";
import { useI18n } from "@/contexts/i18n-context";
import { useLocalizedLink } from "@/hooks/use-localized-link";
import {
  trackSearch,
  trackFavoriteToggle,
  trackAffiliateClick as trackGA4AffiliateClick,
  trackCategoryClick,
} from "@/lib/analytics";

export default function Home() {
  const { t, locale } = useI18n();
  const { getLocalizedLink } = useLocalizedLink();
  const [, setLocation] = useLocation();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchGuests, setSearchGuests] = useState("");
  const [email, setEmail] = useState("");
  
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';

  // Fetch real experiences from Travelpayouts
  const { data: experiencesData } = useTulumExperiences({
    page: 1,
    per_page: 6,
    sort_by: 'popularity'
  });

  const toggleFavorite = (id: string, title: string) => {
    const newFavorites = new Set(favorites);
    const isFavorite = newFavorites.has(id);
    if (isFavorite) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
    
    // Track favorite toggle in GA4
    trackFavoriteToggle(id, title, !isFavorite);
  };

  const handleSearch = () => {
    // Track search in GA4
    trackSearch(searchQuery || 'all', {
      date: searchDate || undefined,
      guests: searchGuests || undefined,
    });
    
    // Build query parameters
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (searchDate) params.set('date', searchDate);
    if (searchGuests) params.set('guests', searchGuests);
    
    // Navigate to experiences page with search parameters
    const queryString = params.toString();
    setLocation(`/experiencias${queryString ? `?${queryString}` : ''}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleNewsletterSignup = () => {
    if (email) {
      console.log("Newsletter signup:", email);
      setEmail("");
    }
  };

  return (
    <div className="bg-white font-sans">
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        currentPath="/"
        keywords={[
          'tulum',
          'tulum mexico',
          'tulum tours',
          'tours tulum',
          'tulum experiencias',
          'tulum mexico things to do',
          'best things to do in tulum',
          'tulum cenotes',
          'tulum ruins',
          'tulum hotels',
          'tulum mexico hotels',
          'riviera maya',
          'tulum travel guide',
          'guía tulum'
        ]}
        canonicalUrl={siteUrl}
        ogType="website"
      />
      <WebsiteSchema siteUrl={siteUrl} siteName="TulumTkts" />
      <OrganizationSchema 
        name="TulumTkts"
        url={siteUrl}
        description={t('seo.organizationDescription')}
      />
      
      {/* FAQs Schema para rich snippets */}
      <FAQSchema faqs={[
        { question: t('faqs.q1.question'), answer: t('faqs.q1.answer') },
        { question: t('faqs.q2.question'), answer: t('faqs.q2.answer') },
        { question: t('faqs.q3.question'), answer: t('faqs.q3.answer') },
        { question: t('faqs.q4.question'), answer: t('faqs.q4.answer') },
        { question: t('faqs.q5.question'), answer: t('faqs.q5.answer') },
        { question: t('faqs.q6.question'), answer: t('faqs.q6.answer') },
        { question: t('faqs.q7.question'), answer: t('faqs.q7.answer') },
        { question: t('faqs.q8.question'), answer: t('faqs.q8.answer') },
      ]} />
      
      <Navigation />

      {/* Hero Section */}
      <section className="relative">
        <div className="h-[600px] relative overflow-hidden">
          {/* YouTube Video Background */}
          <div className="absolute inset-0 w-full h-full">
            <iframe
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              src="https://www.youtube.com/embed/i4-XVv-TAJ8?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=i4-XVv-TAJ8&start=229&modestbranding=1&iv_load_policy=3"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{
                width: '177.78vh', // 16:9 aspect ratio based on viewport height
                height: '177.78vw', // 16:9 aspect ratio based on viewport width
                minWidth: '100%',
                minHeight: '100%',
                transform: 'translate(-50%, -50%) scale(1.15)',
                pointerEvents: 'none',
                border: 'none',
              }}
            />
            {/* Fallback image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1574181419028-e8c44c95a6d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
              }}
            />
          </div>
          {/* Overlay oscuro para legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl mx-auto px-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                {t('hero.title', { tours: t('hero.tours') })}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-200">
                {t('hero.subtitle')}
              </p>
              
              {/* Search Bar */}
              <Card className="p-6 shadow-2xl max-w-3xl mx-auto">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="md:col-span-2 lg:col-span-2">
                      <Label className="block text-sm font-medium text-gray-700 mb-2 text-left">{t('hero.searchLabel')}</Label>
                      <Input 
                        type="text" 
                        placeholder={t('hero.searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2 text-left">{t('hero.dateLabel')}</Label>
                      <Input 
                        type="date" 
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        className="focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2 text-left">{t('hero.guestsLabel')}</Label>
                      <Select value={searchGuests} onValueChange={setSearchGuests}>
                        <SelectTrigger className="focus:ring-2 focus:ring-primary focus:border-transparent">
                          <SelectValue placeholder={t('labels.selectGuests')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">{t('hero.guestOptions.one')}</SelectItem>
                          <SelectItem value="2">{t('hero.guestOptions.two')}</SelectItem>
                          <SelectItem value="3+">{t('hero.guestOptions.threePlus')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    onClick={handleSearch}
                    className="w-full mt-4 bg-primary text-white py-4 text-lg font-semibold hover:bg-primary/90"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {t('hero.searchButton')}
                  </Button>
                </CardContent>
              </Card>
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

      {/* Contenido Introductorio Optimizado para SEO */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p 
              className="text-lg text-gray-700 leading-relaxed mb-4"
              dangerouslySetInnerHTML={{
                __html: t('intro.paragraph1', {
                  tulum: t('intro.tulum'),
                  playas: t('intro.playas'),
                  ruinas: t('intro.ruinas'),
                  cenotes: t('intro.cenotes'),
                }).replace(`{tulum}`, `<strong>${t('intro.tulum')}</strong>`)
                  .replace(`{playas}`, `<strong>${t('intro.playas')}</strong>`)
                  .replace(`{ruinas}`, `<strong>${t('intro.ruinas')}</strong>`)
                  .replace(`{cenotes}`, `<strong>${t('intro.cenotes')}</strong>`)
              }}
            />
            <p className="text-lg text-gray-700 leading-relaxed mb-4"
               dangerouslySetInnerHTML={{
                 __html: t('intro.paragraph2', {
                   tulum2025: t('intro.tulum2025'),
                   tours: t('intro.tours'),
                   mejoresExperiencias: t('intro.mejoresExperiencias'),
                   hoteles: t('intro.hoteles'),
                   eventos: t('intro.eventos'),
                   guiaCompleta: t('intro.guiaCompleta'),
                 }).replace(`{tulum2025}`, `<strong>${t('intro.tulum2025')}</strong>`)
                   .replace(`{tours}`, `<a href="${getLocalizedLink('/experiencias')}" class="text-primary hover:underline font-semibold">${t('intro.tours')}</a>`)
                   .replace(`{mejoresExperiencias}`, `<a href="${getLocalizedLink('/experiencias')}" class="text-primary hover:underline font-semibold">${t('intro.mejoresExperiencias')}</a>`)
                   .replace(`{hoteles}`, `<a href="${getLocalizedLink('/villas')}" class="text-primary hover:underline font-semibold">${t('intro.hoteles')}</a>`)
                   .replace(`{eventos}`, `<a href="${getLocalizedLink('/eventos')}" class="text-primary hover:underline font-semibold">${t('intro.eventos')}</a>`)
                   .replace(`{guiaCompleta}`, `<a href="${getLocalizedLink('/tulum-guia-completa')}" class="text-primary hover:underline font-semibold">${t('intro.guiaCompleta')}</a>`)
               }}
            />
            <p className="text-lg text-gray-700 leading-relaxed"
               dangerouslySetInnerHTML={{
                 __html: t('intro.paragraph3', {
                   cenotesTulum: t('intro.cenotesTulum'),
                   ruinasMayas: t('intro.ruinasMayas'),
                   playasParadisíacas: t('intro.playasParadisíacas'),
                   toursEnTulum: t('intro.toursEnTulum'),
                   mejorHotel: t('intro.mejorHotel'),
                   cosasQueHacer: t('intro.cosasQueHacer'),
                   guiaCompleta2025: t('intro.guiaCompleta2025'),
                 }).replace(`{cenotesTulum}`, `<a href="${getLocalizedLink('/cenotes-tulum')}" class="text-primary hover:underline font-semibold">${t('intro.cenotesTulum')}</a>`)
                   .replace(`{ruinasMayas}`, `<strong>${t('intro.ruinasMayas')}</strong>`)
                   .replace(`{playasParadisíacas}`, `<strong>${t('intro.playasParadisíacas')}</strong>`)
                   .replace(`{toursEnTulum}`, `<a href="${getLocalizedLink('/experiencias')}" class="text-primary hover:underline font-semibold">${t('intro.toursEnTulum')}</a>`)
                   .replace(`{mejorHotel}`, `<a href="${getLocalizedLink('/villas')}" class="text-primary hover:underline font-semibold">${t('intro.mejorHotel')}</a>`)
                   .replace(`{cosasQueHacer}`, `<a href="${getLocalizedLink('/blog')}" class="text-primary hover:underline font-semibold">${t('intro.cosasQueHacer')}</a>`)
                   .replace(`{guiaCompleta2025}`, `<a href="${getLocalizedLink('/tulum-guia-completa')}" class="text-primary hover:underline font-semibold">${t('intro.guiaCompleta2025')}</a>`)
               }}
            />
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('categories.title')}</h2>
            <p className="text-lg text-gray-600">{t('categories.subtitle')}</p>
            <p className="text-base text-gray-500 mt-2">
              {t('categories.discoverMore', { guiaCompleta: t('categories.guiaCompleta') }).split(t('categories.guiaCompleta')).map((part, i, arr) => 
                i < arr.length - 1 ? (
                  <span key={i}>{part}<a href={getLocalizedLink('/tulum-guia-completa')} className="text-primary hover:underline font-semibold">{t('categories.guiaCompleta')}</a></span>
                ) : part
              )}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                name: t('categories.cenotes'),
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600",
                url: "/cenotes-tulum"
              },
              {
                name: t('categories.mayanRuins'),
                image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600",
                url: "/experiencias?category=arqueologia"
              },
              {
                name: t('categories.beachTours'),
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600"
              },
              {
                name: t('categories.adventure'),
                image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600"
              }
            ].map((category) => (
              <div 
                key={category.name} 
                className="group cursor-pointer"
                onClick={() => {
                  trackCategoryClick(category.name);
                  if (category.url) {
                    setLocation(getLocalizedLink(category.url));
                  } else {
                    setLocation(getLocalizedLink(`/experiencias?category=${encodeURIComponent(category.name)}`));
                  }
                }}
              >
                <div className="relative overflow-hidden rounded-xl aspect-square mb-3">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4">
                    <h3 className="text-white font-semibold text-sm md:text-lg">{category.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('featured.title')}</h2>
              <p className="text-lg text-gray-600">{t('featured.subtitle')}</p>
            </div>
            <Button 
              variant="ghost" 
              className="hidden md:flex text-primary font-semibold hover:underline"
              onClick={() => setLocation(getLocalizedLink('/experiencias'))}
            >
              {t('featured.seeAll')} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(experiencesData?.data?.slice(0, 6) || []).map((experience) => {
              const activityId = experience.activity_id;
              const title = experience.title;
              const description = experience.abstract;
              const imageUrl = experience.image_url;
              const rating = experience.rating;
              const reviewCount = experience.number_of_ratings;
              // Convert EUR to USD (approximate rate 1 EUR = 1.08 USD)
              const eurAmount = experience.price.values[0].amount;
              const usdAmount = Math.round(eurAmount * 1.08);
              const price = `$${usdAmount} USD`;
              const duration = experience.duration;
              const affiliateUrl = experience.url;

              return (
                <Card key={activityId} className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img 
                    src={imageUrl} 
                    alt={title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    {experience.instant_confirmation && (
                      <Badge className="bg-green-600 text-white mr-2">
                        {t('featured.instantConfirmation')}
                      </Badge>
                    )}
                    {experience.free_cancellation && (
                      <Badge className="bg-blue-600 text-white">
                        {t('featured.freeCancellation')}
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white/80 backdrop-blur-sm rounded-full hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(activityId, title);
                      }}
                    >
                      <Heart 
                        className={`w-4 h-4 ${favorites.has(activityId) ? 'fill-secondary text-secondary' : 'text-gray-600'}`}
                      />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({rating}) {reviewCount} {t('featured.reviews')}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{duration}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">{t('featured.from')}</span>
                      <div className="text-2xl font-bold text-gray-900">{price}</div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-primary text-white hover:bg-primary/90"
                    onClick={async () => {
                      try {
                        await trackAffiliateClickAPI(activityId, title, price, 'Featured Home');
                        // Track in GA4
                        trackGA4AffiliateClick(activityId, title, price, 'Featured Home');
                        window.open(affiliateUrl, '_blank');
                      } catch (error) {
                        // Track in GA4 even if API fails
                        trackGA4AffiliateClick(activityId, title, price, 'Featured Home');
                        // Fallback to direct URL
                        window.open(affiliateUrl, '_blank');
                      }
                    }}
                  >
                    {t('featured.bookNow')}
                  </Button>
                </CardContent>
              </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('testimonials.title')}</h2>
            <p className="text-lg text-gray-600">{t('testimonials.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: t('testimonials.testimonial1.text'),
                author: t('testimonials.testimonial1.author'),
                location: t('testimonials.testimonial1.location'),
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c1d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
              },
              {
                text: t('testimonials.testimonial2.text'),
                author: t('testimonials.testimonial2.author'),
                location: t('testimonials.testimonial2.location'),
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
              },
              {
                text: t('testimonials.testimonial3.text'),
                author: t('testimonials.testimonial3.author'),
                location: t('testimonials.testimonial3.location'),
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-8">
                <CardContent className="p-0">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('newsletter.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('newsletter.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder={t('newsletter.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border-0 focus:ring-4 focus:ring-white/30 focus:outline-none"
            />
            <Button 
              onClick={handleNewsletterSignup}
              className="bg-secondary text-white hover:bg-secondary/90 whitespace-nowrap"
            >
              {t('newsletter.subscribe')}
            </Button>
          </div>
          <p className="text-sm text-blue-100 mt-4">
            {t('newsletter.noSpam')}
          </p>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('faqs.title')}</h2>
            <p className="text-lg text-gray-600">{t('faqs.subtitle')}</p>
          </div>
          
          <FAQAccordion faqs={[
            { question: t('faqs.q1.question'), answer: t('faqs.q1.answer') },
            { question: t('faqs.q2.question'), answer: t('faqs.q2.answer') },
            { question: t('faqs.q3.question'), answer: t('faqs.q3.answer') },
            { question: t('faqs.q4.question'), answer: t('faqs.q4.answer') },
            { question: t('faqs.q5.question'), answer: t('faqs.q5.answer') },
            { question: t('faqs.q6.question'), answer: t('faqs.q6.answer') },
            { question: t('faqs.q7.question'), answer: t('faqs.q7.answer') },
            { question: t('faqs.q8.question'), answer: t('faqs.q8.answer') },
          ]} className="bg-white rounded-lg shadow-md p-6" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-primary mb-4">TulumTkts</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">{t('footer.experiences')}</h4>
              <ul className="space-y-2">
                <li><a href={getLocalizedLink('/cenotes-tulum')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.experienceLinks.cenotes')}</a></li>
                <li><a href={getLocalizedLink('/experiencias?category=arqueologia')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.experienceLinks.mayanRuins')}</a></li>
                <li><a href={getLocalizedLink('/experiencias')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.experienceLinks.beachTours')}</a></li>
                <li><a href={getLocalizedLink('/experiencias')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.experienceLinks.adventureSports')}</a></li>
                <li><a href={getLocalizedLink('/experiencias')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.experienceLinks.culturalTours')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">{t('footer.support')}</h4>
              <ul className="space-y-2">
                <li><a href={getLocalizedLink('/contacto')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.supportLinks.helpCenter')}</a></li>
                <li><a href={getLocalizedLink('/contacto')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.supportLinks.contactUs')}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">{t('footer.supportLinks.cancellationPolicy')}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">{t('footer.supportLinks.termsOfService')}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">{t('footer.supportLinks.privacyPolicy')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 mb-2">
              &copy; {new Date().getFullYear()} TulumTkts. {t('footer.copyright')}
            </p>
            <p 
              className="text-gray-400"
              dangerouslySetInnerHTML={{
                __html: t('footer.poweredBy')
              }}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
