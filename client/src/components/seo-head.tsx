import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  articleAuthor?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleSection?: string;
  articleTag?: string[];
}

export function SEOHead({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  ogType = 'website',
  articleAuthor,
  articlePublishedTime,
  articleModifiedTime,
  articleSection,
  articleTag = [],
}: SEOHeadProps) {
  useEffect(() => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';
    const baseTitle = 'TulumTkts - #1 Booking Destination for Tulum Experiences';
    const baseDescription = 'Discover and book the best tours, experiences, events, and accommodations in Tulum, Mexico. Your comprehensive tourism platform for authentic Tulum adventures.';
    
    // Update document title
    document.title = title ? `${title} | ${baseTitle.split(' - ')[0]}` : baseTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description || baseDescription);
    if (keywords.length > 0) {
      updateMetaTag('keywords', keywords.join(', '));
    }

    // Canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    } else if (typeof window !== 'undefined') {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', window.location.href.split('?')[0]);
    }

    // Open Graph tags
    updateMetaTag('og:title', title || baseTitle, true);
    updateMetaTag('og:description', description || baseDescription, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', canonicalUrl || (typeof window !== 'undefined' ? window.location.href : siteUrl), true);
    updateMetaTag('og:image', ogImage || `${siteUrl}/og-image.jpg`, true);
    updateMetaTag('og:site_name', 'TulumTkts', true);
    updateMetaTag('og:locale', 'es_ES', true);

    // Article specific OG tags
    if (ogType === 'article') {
      if (articleAuthor) updateMetaTag('article:author', articleAuthor, true);
      if (articlePublishedTime) updateMetaTag('article:published_time', articlePublishedTime, true);
      if (articleModifiedTime) updateMetaTag('article:modified_time', articleModifiedTime, true);
      if (articleSection) updateMetaTag('article:section', articleSection, true);
      articleTag.forEach(tag => {
        const tagMeta = document.createElement('meta');
        tagMeta.setAttribute('property', 'article:tag');
        tagMeta.setAttribute('content', tag);
        document.head.appendChild(tagMeta);
      });
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title || baseTitle);
    updateMetaTag('twitter:description', description || baseDescription);
    updateMetaTag('twitter:image', ogImage || `${siteUrl}/og-image.jpg`);

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('author', articleAuthor || 'TulumTkts');
    
    if (articlePublishedTime) {
      updateMetaTag('article:published_time', articlePublishedTime, true);
    }

  }, [title, description, keywords, canonicalUrl, ogImage, ogType, articleAuthor, articlePublishedTime, articleModifiedTime, articleSection, articleTag]);

  return null;
}

