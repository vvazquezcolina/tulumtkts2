import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateAffiliateLink, trackAffiliateClick } from "@/lib/affiliate";
import { ExternalLink, TrendingUp } from "lucide-react";
import { useI18n } from "@/contexts/i18n-context";
import { useLocalizedLink } from "@/hooks/use-localized-link";

interface AffiliateBannerProps {
  className?: string;
}

export function AffiliateBanner({ className = "" }: AffiliateBannerProps) {
  const { t } = useI18n();
  const { getLocalizedLink } = useLocalizedLink();
  
  const handleTravelpayoutsClick = () => {
    const affiliateUrl = generateAffiliateLink('travelpayouts');
    trackAffiliateClick('Travelpayouts', 'Tulum Experiences Collection', '$200', 'Banner');
    window.open(affiliateUrl, '_blank');
  };

  return (
    <Card className={`bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-secondary text-white">
                <TrendingUp className="w-3 h-3 mr-1" />
                {t('common.bestseller')}
              </Badge>
              <span className="text-sm text-gray-600">{t('home.bestseller.poweredBy')}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {t('home.bestseller.title')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('home.bestseller.description')}
            </p>
          </div>
          <div className="ml-6">
            <Button 
              onClick={() => {
                handleTravelpayoutsClick();
                window.location.href = getLocalizedLink('/experiencias');
              }}
              className="bg-primary text-white hover:bg-primary/90"
            >
              {t('home.bestseller.seeExperiences')}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}