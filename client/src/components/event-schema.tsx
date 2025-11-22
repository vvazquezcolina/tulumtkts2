import { useEffect } from 'react';

interface EventSchemaProps {
  name: string;
  description: string;
  startDate: string; // ISO 8601 format
  endDate?: string; // ISO 8601 format
  location?: {
    name: string;
    address?: string;
    city?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
  };
  image?: string;
  price?: number;
  priceCurrency?: string;
  organizer?: {
    name: string;
    url?: string;
  };
  eventStatus?: 'EventScheduled' | 'EventCancelled' | 'EventPostponed';
  eventAttendanceMode?: 'OfflineEventAttendanceMode' | 'OnlineEventAttendanceMode' | 'MixedEventAttendanceMode';
  url?: string;
}

/**
 * Componente que agrega Event Schema (JSON-LD) para rich snippets en Google
 * Esto ayuda a mostrar eventos directamente en los resultados de búsqueda
 * IMPACTO: +20% CTR cuando aparecen rich snippets para eventos
 */
export function EventSchema({
  name,
  description,
  startDate,
  endDate,
  location,
  image,
  price,
  priceCurrency = 'USD',
  organizer = {
    name: 'TulumTkts',
    url: 'https://tulumtkts.com',
  },
  eventStatus = 'EventScheduled',
  eventAttendanceMode = 'OfflineEventAttendanceMode',
  url,
}: EventSchemaProps) {
  useEffect(() => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';
    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : siteUrl);

    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: name,
      description: description,
      startDate: startDate,
      ...(endDate && { endDate: endDate }),
      ...(image && {
        image: {
          '@type': 'ImageObject',
          url: image.startsWith('http') ? image : `${siteUrl}${image}`,
          width: 1200,
          height: 630,
        },
      }),
      organizer: {
        '@type': 'Organization',
        name: organizer.name,
        ...(organizer.url && { url: organizer.url }),
      },
      eventStatus: `https://schema.org/${eventStatus}`,
      eventAttendanceMode: `https://schema.org/${eventAttendanceMode}`,
      ...(location && {
        location: {
          '@type': 'Place',
          name: location.name,
          ...(location.address && { address: location.address }),
          ...(location.city && { addressLocality: location.city }),
          ...(location.country && { addressCountry: location.country }),
          ...(location.latitude && location.longitude && {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: location.latitude,
              longitude: location.longitude,
            },
          }),
        },
      }),
      ...(price !== undefined && {
        offers: {
          '@type': 'Offer',
          price: price.toString(),
          priceCurrency: priceCurrency,
          availability: 'https://schema.org/InStock',
          url: currentUrl,
          ...(price === 0 && { price: '0', priceCurrency: priceCurrency }),
        },
      }),
      url: currentUrl,
    };

    // Remove existing event schema
    const existingScript = document.querySelector('script[type="application/ld+json"][data-type="event"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new event schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-type', 'event');
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }, [name, description, startDate, endDate, location, image, price, priceCurrency, organizer, eventStatus, eventAttendanceMode, url]);

  return null;
}

/**
 * Componente para agregar múltiples eventos (EventSeries)
 */
interface EventSeriesProps {
  events: EventSchemaProps[];
  seriesName: string;
}

export function EventSeriesSchema({ events, seriesName }: EventSeriesProps) {
  useEffect(() => {
    if (!events || events.length === 0) return;

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'EventSeries',
      name: seriesName,
      event: events.map((event) => ({
        '@type': 'Event',
        name: event.name,
        description: event.description,
        startDate: event.startDate,
        ...(event.endDate && { endDate: event.endDate }),
        ...(event.location && {
          location: {
            '@type': 'Place',
            name: event.location.name,
          },
        }),
        ...(event.image && {
          image: {
            '@type': 'ImageObject',
            url: event.image.startsWith('http') ? event.image : `${siteUrl}${event.image}`,
          },
        }),
        ...(event.price !== undefined && {
          offers: {
            '@type': 'Offer',
            price: event.price.toString(),
            priceCurrency: event.priceCurrency || 'USD',
          },
        }),
      })),
    };

    // Remove existing event series schema
    const existingScript = document.querySelector('script[type="application/ld+json"][data-type="event-series"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new event series schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-type', 'event-series');
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }, [events, seriesName]);

  return null;
}

