import { useEffect } from 'react';

interface Review {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
}

interface ProductSchemaProps {
  name: string;
  description: string;
  image?: string;
  price?: number;
  priceCurrency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
  brand?: string;
  category?: string;
  url?: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
}

/**
 * Componente que agrega Product/Service Schema (JSON-LD) para rich snippets en Google
 * Esto ayuda a mostrar precios, ratings y reseñas directamente en los resultados de búsqueda
 * IMPACTO: +25% CTR cuando aparecen rich snippets con precios y ratings
 */
export function ProductSchema({
  name,
  description,
  image,
  price,
  priceCurrency = 'USD',
  availability = 'InStock',
  rating,
  reviewCount,
  reviews = [],
  brand = 'TulumTkts',
  category,
  url,
  aggregateRating,
}: ProductSchemaProps) {
  useEffect(() => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';
    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : siteUrl);

    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: name,
      description: description,
      brand: {
        '@type': 'Brand',
        name: brand,
      },
      ...(image && {
        image: {
          '@type': 'ImageObject',
          url: image.startsWith('http') ? image : `${siteUrl}${image}`,
          width: 800,
          height: 600,
        },
      }),
      ...(category && { category: category }),
      ...(price !== undefined && {
        offers: {
          '@type': 'Offer',
          price: price.toString(),
          priceCurrency: priceCurrency,
          availability: `https://schema.org/${availability}`,
          url: currentUrl,
        },
      }),
      ...(aggregateRating && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: aggregateRating.ratingValue.toString(),
          reviewCount: aggregateRating.reviewCount.toString(),
          bestRating: aggregateRating.bestRating?.toString() || '5',
          worstRating: aggregateRating.worstRating?.toString() || '1',
        },
      }),
      ...(rating && reviewCount && !aggregateRating && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: rating.toString(),
          reviewCount: reviewCount.toString(),
          bestRating: '5',
          worstRating: '1',
        },
      }),
      ...(reviews.length > 0 && {
        review: reviews.map((review) => ({
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: review.author,
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: review.rating.toString(),
            bestRating: '5',
            worstRating: '1',
          },
          reviewBody: review.reviewBody,
          ...(review.datePublished && { datePublished: review.datePublished }),
        })),
      }),
      url: currentUrl,
    };

    // Remove existing product schema
    const existingScript = document.querySelector('script[type="application/ld+json"][data-type="product"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new product schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-type', 'product');
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }, [name, description, image, price, priceCurrency, availability, rating, reviewCount, reviews, brand, category, url, aggregateRating]);

  return null;
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  image?: string;
  price?: number;
  priceCurrency?: string;
  provider?: string;
  areaServed?: string;
  serviceType?: string;
  url?: string;
  rating?: number;
  reviewCount?: number;
}

/**
 * Componente que agrega Service Schema (JSON-LD) para tours y experiencias
 * Similar a Product pero específico para servicios
 */
export function ServiceSchema({
  name,
  description,
  image,
  price,
  priceCurrency = 'USD',
  provider = 'TulumTkts',
  areaServed = 'Tulum, México',
  serviceType,
  url,
  rating,
  reviewCount,
}: ServiceSchemaProps) {
  useEffect(() => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';
    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : siteUrl);

    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: name,
      description: description,
      provider: {
        '@type': 'Organization',
        name: provider,
        url: siteUrl,
      },
      areaServed: {
        '@type': 'City',
        name: areaServed,
      },
      ...(image && {
        image: {
          '@type': 'ImageObject',
          url: image.startsWith('http') ? image : `${siteUrl}${image}`,
        },
      }),
      ...(serviceType && { serviceType: serviceType }),
      ...(price !== undefined && {
        offers: {
          '@type': 'Offer',
          price: price.toString(),
          priceCurrency: priceCurrency,
          availability: 'https://schema.org/InStock',
          url: currentUrl,
        },
      }),
      ...(rating && reviewCount && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: rating.toString(),
          reviewCount: reviewCount.toString(),
          bestRating: '5',
          worstRating: '1',
        },
      }),
      url: currentUrl,
    };

    // Remove existing service schema
    const existingScript = document.querySelector('script[type="application/ld+json"][data-type="service"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new service schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-type', 'service');
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }, [name, description, image, price, priceCurrency, provider, areaServed, serviceType, url, rating, reviewCount]);

  return null;
}

