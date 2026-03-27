import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Search, Filter, ArrowRight, User, Eye, Heart, Plane, Hotel, Compass } from "lucide-react";
import { allBlogPosts, getFeaturedPosts, getPostsByCategory } from "@/data/blogPosts";
import { BlogImage } from "@/components/blog-image";
import { SEOHead } from "@/components/seo-head";
import { WebsiteSchema } from "@/components/json-ld";
import { OrganizationSchema } from "@/components/organization-schema";
import { CrossSell } from "@/components/cross-sell";
import { generateFlightLink, generateHotelLink, generateAffiliateLink, trackAffiliateClick } from "@/lib/affiliate";
import { Footer } from "@/components/footer";
import { useI18n } from "@/contexts/i18n-context";

// ─── Affiliate ad cards injected every 4th post ──────────────────────────────

interface AffiliateAdConfig {
  icon: React.ElementType;
  eyebrow: string;
  title: string;
  sub: string;
  cta: string;
  href: string;
  trackKey: string;
  gradientFrom: string;
  gradientTo: string;
  iconBg: string;
  iconColor: string;
}

interface AffiliateAdCardProps {
  ad: AffiliateAdConfig;
}

function AffiliateAdCard({ ad }: AffiliateAdCardProps) {
  const Icon = ad.icon;

  const handleClick = () => {
    trackAffiliateClick(ad.trackKey, ad.title, "0", "blog_listing_ad");
    window.open(ad.href, "_blank", "noopener");
  };

  return (
    <Card
      className={`overflow-hidden border border-teal-100 bg-gradient-to-br ${ad.gradientFrom} ${ad.gradientTo} cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5 group`}
      onClick={handleClick}
    >
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-full ${ad.iconBg} flex items-center justify-center shrink-0`}>
            <Icon className={`w-5 h-5 ${ad.iconColor}`} />
          </div>
          <span className={`text-xs font-semibold uppercase tracking-wider ${ad.iconColor}`}>
            {ad.eyebrow}
          </span>
        </div>
        <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-teal-700 transition-colors">
          {ad.title}
        </h3>
        <p className="text-sm text-gray-600 flex-1 mb-4">{ad.sub}</p>
        <Button
          size="sm"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors"
        >
          {ad.cta}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Blog() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const { t, locale } = useI18n();

  // Build locale string for toLocaleDateString
  const dateLocale =
    locale === "es" ? "es-ES" :
    locale === "fr" ? "fr-FR" :
    locale === "it" ? "it-IT" :
    "en-US";

  // Affiliate ad configs — defined inside the component so they can use t()
  const affiliateAds: AffiliateAdConfig[] = [
    {
      icon: Plane,
      eyebrow: t("blog.ads.flights.eyebrow"),
      title: t("blog.ads.flights.title"),
      sub: t("blog.ads.flights.sub"),
      cta: t("blog.ads.flights.cta"),
      href: generateFlightLink("MEX", "CUN"),
      trackKey: "blog_listing_flights",
      gradientFrom: "from-teal-50",
      gradientTo: "to-cyan-50",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
    },
    {
      icon: Hotel,
      eyebrow: t("blog.ads.hotels.eyebrow"),
      title: t("blog.ads.hotels.title"),
      sub: t("blog.ads.hotels.sub"),
      cta: t("blog.ads.hotels.cta"),
      href: generateHotelLink("Tulum"),
      trackKey: "blog_listing_hotels",
      gradientFrom: "from-blue-50",
      gradientTo: "to-indigo-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Compass,
      eyebrow: t("blog.ads.activities.eyebrow"),
      title: t("blog.ads.activities.title"),
      sub: t("blog.ads.activities.sub"),
      cta: t("blog.ads.activities.cta"),
      href: generateAffiliateLink("https://www.viator.com/Tulum/d5397", "viator", "blog_listing_activities"),
      trackKey: "blog_listing_activities",
      gradientFrom: "from-emerald-50",
      gradientTo: "to-teal-50",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  const handlePostClick = (postSlug: string) => {
    setLocation(`/blog/${postSlug}`);
  };

  const allPosts = allBlogPosts;
  const allCategoryLabel = t("blog.search.allCategories");
  const categories = [allCategoryLabel, ...Array.from(new Set(allPosts.map(post => post.category)))];

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === allCategoryLabel || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  // Build regular posts grid with affiliate ad cards injected every 4 posts
  const regularPostsWithAds: Array<{ type: "post"; post: typeof regularPosts[0] } | { type: "ad"; ad: AffiliateAdConfig }> = [];
  regularPosts.forEach((post, idx) => {
    regularPostsWithAds.push({ type: "post", post });
    // Insert ad after every 4th post (0-indexed: after index 3, 7, 11 …)
    if ((idx + 1) % 4 === 0) {
      const adIndex = Math.floor(idx / 4) % affiliateAds.length;
      regularPostsWithAds.push({ type: "ad", ad: affiliateAds[adIndex] });
    }
  });

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';

  return (
    <div className="min-h-screen bg-gray-50 page-enter">
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
              {t("blog.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              {t("blog.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Featured flight-search CTA banner */}
      <section className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                <Plane className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">
                  {t("blog.banner.heading")}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {t("blog.banner.sub")}
                </p>
              </div>
            </div>
            <Button
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 shrink-0 transition-colors"
              onClick={() => {
                trackAffiliateClick("blog_banner_flights", "Blog Banner Flight CTA", "0", "blog_banner");
                window.open(generateFlightLink("MEX", "CUN"), "_blank", "noopener");
              }}
            >
              {t("blog.banner.cta")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
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
                placeholder={t("blog.search.placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder={t("blog.search.categoryPlaceholder")} />
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t("blog.featured.heading")}</h2>

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
                      alt={`${featuredPosts[0].title} - ${t("blog.featured.badge")}`}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="eager"
                      width={800}
                      height={450}
                      fetchpriority="high"
                    />
                  </div>
                  <div className="md:w-1/2 p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-secondary text-white">{t("blog.featured.badge")}</Badge>
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
                        <span>{new Date(featuredPosts[0].publishDate).toLocaleDateString(dateLocale)}</span>
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
                        {t("blog.featured.readMore")} <ArrowRight className="w-4 h-4 ml-2" />
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

      {/* All Articles — with affiliate cards injected every 4 posts */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t("blog.all.heading")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPostsWithAds.map((item, idx) => {
              if (item.type === "ad") {
                return <AffiliateAdCard key={`ad-${idx}`} ad={item.ad} />;
              }

              const post = item.post;
              return (
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
                        <span>{new Date(post.publishDate).toLocaleDateString(dateLocale)}</span>
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
                      {t("blog.all.readArticle")} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              {t("blog.all.loadMore")}
            </Button>
          </div>
        </div>
      </section>

      {/* CrossSell */}
      <CrossSell title={t("blog.crossSellTitle")} />

      {/* Newsletter Subscription */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t("blog.newsletter.heading")}
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            {t("blog.newsletter.sub")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={t("blog.newsletter.emailPlaceholder")}
              className="flex-1 bg-white"
            />
            <Button className="bg-secondary text-white hover:bg-secondary/90">
              {t("blog.newsletter.subscribe")}
            </Button>
          </div>

          <p className="text-sm text-gray-300 mt-4">
            {t("blog.newsletter.noSpam")}
          </p>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t("blog.categories.heading")}</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category) => {
              const categoryCount = allPosts.filter(post => post.category === category).length;
              const articleLabel = categoryCount === 1
                ? t("blog.categories.articleCount_one")
                : t("blog.categories.articleCount_other");
              return (
                <Card
                  key={category}
                  className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => {
                    setCategoryFilter(category === allCategoryLabel ? "" : category);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {category}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {categoryCount} {articleLabel}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
