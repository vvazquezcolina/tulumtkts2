import { useEffect } from 'react';

interface ArticleSchemaProps {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  publisher?: {
    name: string;
    logo?: string;
  };
  url?: string;
  category?: string;
  keywords?: string[];
}

export function ArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
  publisher = {
    name: 'TulumTkts',
    logo: 'https://tulumtkts.com/logo.png',
  },
  url,
  category,
  keywords = [],
}: ArticleSchemaProps) {
  useEffect(() => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';
    
    // Use BlogPosting for better SEO instead of generic Article
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting', // Changed from Article to BlogPosting for better SEO
      headline: title,
      description: description,
      image: {
        '@type': 'ImageObject',
        url: image || `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
      },
      datePublished: datePublished,
      dateModified: dateModified || datePublished,
      author: {
        '@type': 'Person',
        name: author,
        url: `${siteUrl}/blog`,
      },
      publisher: {
        '@type': 'Organization',
        name: publisher.name,
        logo: {
          '@type': 'ImageObject',
          url: publisher.logo || `${siteUrl}/logo.png`,
          width: 600,
          height: 60,
        },
        url: siteUrl,
        sameAs: [
          // Add social media links if available
          // 'https://www.facebook.com/tulumtkts',
          // 'https://www.instagram.com/tulumtkts',
        ],
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url || (typeof window !== 'undefined' ? window.location.href : siteUrl),
      },
      ...(category && { articleSection: category }),
      ...(keywords.length > 0 && { keywords: keywords.join(', ') }),
      // Add additional fields for better SEO
      inLanguage: 'es-MX',
      isAccessibleForFree: true,
      wordCount: description.split(' ').length, // Approximate
    };

    // Remove existing schema
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }, [title, description, image, datePublished, dateModified, author, publisher, url, category, keywords]);

  return null;
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  useEffect(() => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';
    
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
      })),
    };

    // Remove existing breadcrumb schema
    const existingScript = document.querySelector('script[type="application/ld+json"][data-type="breadcrumb"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new breadcrumb schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-type', 'breadcrumb');
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }, [items]);

  return null;
}

interface WebsiteSchemaProps {
  siteUrl?: string;
  siteName?: string;
  searchAction?: string;
}

export function WebsiteSchema({
  siteUrl = 'https://tulumtkts.com',
  siteName = 'TulumTkts',
  searchAction,
}: WebsiteSchemaProps) {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
      ...(searchAction && {
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: searchAction,
          },
          'query-input': 'required name=search_term_string',
        },
      }),
    };

    // Remove existing website schema
    const existingScript = document.querySelector('script[type="application/ld+json"][data-type="website"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new website schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-type', 'website');
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }, [siteUrl, siteName, searchAction]);

  return null;
}

