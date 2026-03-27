import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateAffiliateLink, trackAffiliateClick } from "@/lib/affiliate";
import { ArrowRight, Star, Users } from "lucide-react";
import { useI18n } from "@/contexts/i18n-context";

interface AffiliateBannerProps {
  className?: string;
}

export function AffiliateBanner({ className = "" }: AffiliateBannerProps) {
  const { t } = useI18n();

  const handleClick = () => {
    trackAffiliateClick('Travelpayouts', 'Tulum Experiences Collection', '$200', 'Banner');
    const affiliateUrl = generateAffiliateLink('travelpayouts');
    window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card
      className={`relative overflow-hidden border-0 shadow-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 ${className}`}
    >
      {/* Decorative background circles */}
      <span
        aria-hidden="true"
        className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 pointer-events-none"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-10 -left-6 w-32 h-32 rounded-full bg-white/10 pointer-events-none"
      />

      <CardContent className="relative p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left: text block */}
          <div className="flex-1 min-w-0">
            {/* Top row: badge + powered-by */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs font-semibold px-2 py-0.5">
                <Star className="w-3 h-3 mr-1 fill-yellow-300 text-yellow-300" />
                {t('affiliateBanner.badge')}
              </Badge>
              <span className="text-white/80 text-xs">
                {t('affiliateBanner.poweredBy')}
              </span>
            </div>

            {/* Headline */}
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug mb-1">
              {t('affiliateBanner.title')}
            </h3>

            {/* Description */}
            <p className="text-sm text-white/85 leading-relaxed mb-2 max-w-lg">
              {t('affiliateBanner.description')}
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-1 text-white/70 text-xs">
              <Users className="w-3 h-3 shrink-0" />
              <span>{t('affiliateBanner.trustSignal')}</span>
            </div>
          </div>

          {/* Right: CTA button */}
          <div className="shrink-0">
            <Button
              onClick={handleClick}
              className="w-full sm:w-auto bg-white text-teal-700 font-semibold hover:bg-white/90 active:scale-95 transition-transform shadow-md px-5 py-2.5 text-sm"
            >
              {t('affiliateBanner.cta')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
