import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/ui/navigation";
import { Star, Clock, Heart, Search, ArrowRight, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Home() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchGuests, setSearchGuests] = useState("");
  const [email, setEmail] = useState("");

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handleSearch = () => {
    console.log("Search:", { query: searchQuery, date: searchDate, guests: searchGuests });
  };

  const handleNewsletterSignup = () => {
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <div className="bg-white font-sans">
      <Navigation />

      {/* Hero Section */}
      <section className="relative">
        <div 
          className="h-[600px] bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1574181419028-e8c44c95a6d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl mx-auto px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Discover <span className="text-primary">Tulum's</span> Magic
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                Book unforgettable experiences in paradise. From ancient ruins to cenotes, your adventure awaits.
              </p>
              
              {/* Search Bar */}
              <Card className="p-6 shadow-2xl max-w-3xl mx-auto">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="md:col-span-2 lg:col-span-2">
                      <Label className="block text-sm font-medium text-gray-700 mb-2 text-left">What do you want to do?</Label>
                      <Input 
                        type="text" 
                        placeholder="Cenotes, ruins, tours..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2 text-left">Date</Label>
                      <Input 
                        type="date" 
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        className="focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2 text-left">Guests</Label>
                      <Select value={searchGuests} onValueChange={setSearchGuests}>
                        <SelectTrigger className="focus:ring-2 focus:ring-primary focus:border-transparent">
                          <SelectValue placeholder="Select guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Guest</SelectItem>
                          <SelectItem value="2">2 Guests</SelectItem>
                          <SelectItem value="3+">3+ Guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    onClick={handleSearch}
                    className="w-full mt-4 bg-primary text-white py-4 text-lg font-semibold hover:bg-primary/90"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search Experiences
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Categories</h2>
            <p className="text-lg text-gray-600">Explore the best of what Tulum has to offer</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Cenotes",
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600"
              },
              {
                name: "Mayan Ruins",
                image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600"
              },
              {
                name: "Beach Tours",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600"
              },
              {
                name: "Adventure",
                image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600"
              }
            ].map((category) => (
              <div key={category.name} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl aspect-square mb-3">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-semibold text-lg">{category.name}</h3>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Experiences</h2>
              <p className="text-lg text-gray-600">Handpicked adventures you can't miss</p>
            </div>
            <Button variant="ghost" className="hidden md:flex text-primary font-semibold hover:underline">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: "1",
                title: "Grand Cenote Swimming Experience",
                description: "Swim in crystal-clear waters surrounded by stunning stalactites and tropical fish in one of Tulum's most beautiful cenotes.",
                price: "$89",
                duration: "4 hours",
                rating: 4.9,
                reviews: 127,
                badge: "Bestseller",
                badgeColor: "secondary",
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              },
              {
                id: "2",
                title: "Chichen Itza Full Day Tour",
                description: "Explore one of the Seven Wonders of the World with an expert guide and learn about ancient Mayan civilization.",
                price: "$159",
                duration: "12 hours",
                rating: 4.8,
                reviews: 89,
                badge: "Popular",
                badgeColor: "primary",
                image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              },
              {
                id: "3",
                title: "Catamaran Sunset Cruise",
                description: "Sail into the sunset with drinks, music, and snorkeling in the pristine waters of the Caribbean Sea.",
                price: "$129",
                duration: "5 hours",
                rating: 4.6,
                reviews: 34,
                badge: "New",
                badgeColor: "secondary",
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              }
            ].map((experience) => (
              <Card key={experience.id} className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img 
                    src={experience.image} 
                    alt={experience.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${experience.badgeColor === 'secondary' ? 'bg-secondary' : 'bg-primary'} text-white`}>
                      {experience.badge}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white/80 backdrop-blur-sm rounded-full hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(experience.id);
                      }}
                    >
                      <Heart 
                        className={`w-4 h-4 ${favorites.has(experience.id) ? 'fill-secondary text-secondary' : 'text-gray-600'}`}
                      />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({experience.rating}) {experience.reviews} reviews</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {experience.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{experience.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{experience.duration}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">From</span>
                      <div className="text-2xl font-bold text-gray-900">{experience.price}</div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4 bg-primary text-white hover:bg-primary/90">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
            <p className="text-lg text-gray-600">Real experiences from real travelers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Absolutely incredible experience! The cenote was even more beautiful than the photos. Our guide was knowledgeable and made sure we felt safe throughout the entire adventure.",
                author: "Sarah Johnson",
                location: "New York, USA",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c1d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
              },
              {
                text: "The Chichen Itza tour was perfectly organized. Transportation was comfortable, the guide was amazing, and seeing the pyramid was a life-changing experience!",
                author: "Mike Rodriguez",
                location: "Los Angeles, USA",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
              },
              {
                text: "Best vacation ever! Easy booking, fair prices, and unforgettable memories. The sunset cruise was romantic and beautiful. Highly recommend TulumTkts!",
                author: "Emma Chen",
                location: "Toronto, Canada",
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
            Never Miss a Deal
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get exclusive offers and be the first to know about new experiences in Tulum
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border-0 focus:ring-4 focus:ring-white/30 focus:outline-none"
            />
            <Button 
              onClick={handleNewsletterSignup}
              className="bg-secondary text-white hover:bg-secondary/90 whitespace-nowrap"
            >
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-blue-100 mt-4">
            No spam, unsubscribe anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-primary mb-4">TulumTkts</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Your gateway to unforgettable experiences in Tulum. Discover ancient wonders, natural beauty, and adventure in paradise.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Experiences</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Cenotes</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Mayan Ruins</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Beach Tours</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Adventure Sports</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Cultural Tours</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Cancellation Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 TulumTkts. All rights reserved. | Made with ❤️ for travelers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
