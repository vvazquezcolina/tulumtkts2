import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useI18n } from "@/contexts/i18n-context";
import { useLocalizedLink } from "@/hooks/use-localized-link";

export function Footer() {
  const { t } = useI18n();
  const { getLocalizedLink } = useLocalizedLink();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="md:col-span-2 lg:col-span-2">
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
            <h4 className="font-semibold text-lg mb-4">{t('footer.planYourTrip')}</h4>
            <ul className="space-y-2">
              <li><a href={getLocalizedLink('/vuelos')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.planLinks.flights')}</a></li>
              <li><a href={getLocalizedLink('/hoteles')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.planLinks.hotels')}</a></li>
              <li><a href={getLocalizedLink('/experiencias')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.planLinks.tours')}</a></li>
              <li><a href={getLocalizedLink('/transporte')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.planLinks.transport')}</a></li>
              <li><a href={getLocalizedLink('/como-llegar-a-tulum')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.planLinks.howToGetThere')}</a></li>
              <li><a href={getLocalizedLink('/cuanto-cuesta-viajar-a-tulum')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.planLinks.howMuchItCosts')}</a></li>
              <li><a href={getLocalizedLink('/mejores-hoteles-tulum')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.planLinks.bestHotels')}</a></li>
              <li><a href={getLocalizedLink('/clima-tulum')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.planLinks.weather')}</a></li>
              <li><a href={getLocalizedLink('/bodas-tulum')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.planLinks.weddings')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.experiences')}</h4>
            <ul className="space-y-2">
              <li><a href={getLocalizedLink('/cenotes-tulum')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.experienceLinks.cenotes')}</a></li>
              <li><a href={getLocalizedLink('/experiencias?category=arqueologia')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.experienceLinks.mayanRuins')}</a></li>
              <li><a href={getLocalizedLink('/experiencias')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.experienceLinks.beachTours')}</a></li>
              <li><a href={getLocalizedLink('/nightlife-tulum')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.experienceLinks.nightlife')}</a></li>
              <li><a href={getLocalizedLink('/restaurantes-tulum')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.experienceLinks.restaurants')}</a></li>
              <li><a href={getLocalizedLink('/buceo-tulum')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.experienceLinks.diving')}</a></li>
              <li><a href={getLocalizedLink('/excursiones-tulum')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.experienceLinks.dayTrips')}</a></li>
              <li><a href={getLocalizedLink('/tulum-guia-completa')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.experienceLinks.completeGuide')}</a></li>
              <li><a href={getLocalizedLink('/blog')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.experienceLinks.blog')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.exploreMore')}</h4>
            <ul className="space-y-2">
              <li><a href={getLocalizedLink('/riviera-maya')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.exploreLinks.rivieraMaya')}</a></li>
              <li><a href={getLocalizedLink('/digital-nomad-tulum')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.exploreLinks.digitalNomad')}</a></li>
              <li><a href={getLocalizedLink('/villas')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.exploreLinks.villas')}</a></li>
              <li><a href={getLocalizedLink('/eventos')} className="text-gray-300 hover:text-primary transition-colors">{t('footer.exploreLinks.events')}</a></li>
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
  );
}
