import { useEffect } from 'react';

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  contactPoint?: {
    telephone?: string;
    contactType?: string;
    email?: string;
  };
  sameAs?: string[]; // Social media URLs
}

export function OrganizationSchema({
  name = 'TulumTkts',
  url = 'https://tulumtkts.com',
  logo = 'https://tulumtkts.com/logo.png',
  description = 'Plataforma de turismo #1 para experiencias en Tulum, México. Reserva tours, experiencias, eventos y alojamientos en Tulum.',
  contactPoint,
  sameAs = [],
}: OrganizationSchemaProps) {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: name,
      url: url,
      logo: {
        '@type': 'ImageObject',
        url: logo,
        width: 600,
        height: 60,
      },
      description: description,
      ...(contactPoint && {
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: contactPoint.telephone,
          contactType: contactPoint.contactType || 'customer service',
          email: contactPoint.email,
          availableLanguage: ['Spanish', 'English'],
        },
      }),
      ...(sameAs.length > 0 && { sameAs: sameAs }),
      // Additional SEO fields
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tulum',
        addressRegion: 'Quintana Roo',
        addressCountry: 'MX',
      },
    };

    // Remove existing organization schema
    const existingScript = document.querySelector('script[type="application/ld+json"][data-type="organization"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new organization schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-type', 'organization');
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }, [name, url, logo, description, contactPoint, sameAs]);

  return null;
}

