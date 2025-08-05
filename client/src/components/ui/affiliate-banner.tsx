import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateAffiliateLink, trackAffiliateClick } from "@/lib/affiliate";
import { ExternalLink, TrendingUp } from "lucide-react";

interface AffiliateBannerProps {
  className?: string;
}

export function AffiliateBanner({ className = "" }: AffiliateBannerProps) {
  const handleGetYourGuideClick = () => {
    const affiliateUrl = generateAffiliateLink('getyourguide');
    trackAffiliateClick('GetYourGuide', 'Tulum Experiences Collection', '€200', 'Banner');
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
                Bestseller
              </Badge>
              <span className="text-sm text-gray-600">Powered by GetYourGuide</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Descubre las Mejores Experiencias en Tulum
            </h3>
            <p className="text-sm text-gray-600">
              Tours únicos, cenotes cristalinos y ruinas mayas. Reserva con cancelación gratuita.
            </p>
          </div>
          <div className="ml-6">
            <Button 
              onClick={handleGetYourGuideClick}
              className="bg-primary text-white hover:bg-primary/90"
            >
              Ver Experiencias
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}