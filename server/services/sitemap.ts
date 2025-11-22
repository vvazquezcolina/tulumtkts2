import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface BlogPost {
  slug: string;
  publishDate: string;
  featured: boolean;
}

interface SitemapPage {
  url: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}

export async function generateSitemap(siteUrl: string = 'https://tulumtkts.com'): Promise<string> {
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Static pages
  const staticPages: SitemapPage[] = [
    { url: '', priority: '1.0', changefreq: 'daily', lastmod: currentDate },
    { url: '/tulum-guia-completa', priority: '0.95', changefreq: 'weekly', lastmod: currentDate },
    { url: '/cenotes-tulum', priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
    { url: '/blog', priority: '0.9', changefreq: 'daily', lastmod: currentDate },
    { url: '/experiencias', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
    { url: '/eventos', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
    { url: '/villas', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
    { url: '/transporte', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
    { url: '/contacto', priority: '0.6', changefreq: 'monthly', lastmod: currentDate },
  ];

  // Load blog posts data - try embedded data first, then file system
  // This must not throw - sitemap must work even without blog data
  let blogPosts: BlogPost[] = [];
  
  try {
    // First try: Try to import embedded data dynamically
    try {
      const sitemapDataModule = await import('./data/sitemap-blog-data.js');
      if (sitemapDataModule && sitemapDataModule.sitemapBlogData && Array.isArray(sitemapDataModule.sitemapBlogData)) {
        blogPosts = sitemapDataModule.sitemapBlogData;
        console.log(`✅ Loaded ${blogPosts.length} blog posts from embedded data`);
      }
    } catch (importErr) {
      // Import failed, try file system fallback
      console.log('ℹ️  Embedded data import failed, trying file system...');
    }
    
    // Fallback: Try reading from JSON file if embedded data didn't work
    if (blogPosts.length === 0) {
      const cwd = process.cwd();
      const possiblePaths = [
        // Vercel serverless function location (most likely)
        join('/var/task', 'sitemap-blog-data.json'),
        join('/var/task', 'dist/sitemap-blog-data.json'),
        join('/var/task', 'dist/public/sitemap-blog-data.json'),
        // Standard build locations
        join(cwd, 'dist/sitemap-blog-data.json'),              // Server code location
        join(cwd, 'dist/public/sitemap-blog-data.json'),       // Static files location
        join(cwd, 'public/sitemap-blog-data.json'),            // Source location
        join(cwd, 'sitemap-blog-data.json'),                   // Root fallback
        // Try relative to __dirname (bundled server code location)
        join(__dirname, 'sitemap-blog-data.json'),
        join(__dirname, '../sitemap-blog-data.json'),
        join(__dirname, '../public/sitemap-blog-data.json'),
        join(__dirname, '../../public/sitemap-blog-data.json'),
      ];
      
      for (const jsonPath of possiblePaths) {
        try {
          if (existsSync(jsonPath)) {
            const jsonContent = readFileSync(jsonPath, 'utf-8');
            const parsed = JSON.parse(jsonContent);
            if (Array.isArray(parsed) && parsed.length > 0) {
              blogPosts = parsed;
              console.log(`✅ Loaded ${blogPosts.length} blog posts from ${jsonPath}`);
              break;
            }
          }
        } catch (err) {
          // Silently continue to next path
          continue;
        }
      }
      
      if (blogPosts.length === 0) {
        // This is OK - sitemap will work with static pages only
        console.log('ℹ️  No blog posts data found. Sitemap will include static pages only.');
      }
    }
  } catch (error: any) {
    // Never throw - sitemap must always work
    console.log(`ℹ️  Could not load blog posts (${error?.message || 'unknown error'}). Sitemap will use static pages only.`);
    blogPosts = [];
  }

  // Supported languages for hreflang tags
  const languages = [
    { code: 'es', hreflang: 'es-mx' }, // Spanish (Mexico) - no prefix
    { code: 'en', hreflang: 'en' },
    { code: 'fr', hreflang: 'fr' },
    { code: 'it', hreflang: 'it' },
  ];

  // Helper function to get localized URL
  const getLocalizedUrl = (baseUrl: string, langCode: string): string => {
    if (langCode === 'es') {
      return baseUrl; // Spanish has no prefix
    }
    return `/${langCode}${baseUrl}`;
  };

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
  xml += '        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
  xml += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n\n';
  
  // Add static pages - create separate URLs for each language
  staticPages.forEach(page => {
    const baseUrl = page.url || '/';
    
    languages.forEach(lang => {
      const localizedUrl = getLocalizedUrl(baseUrl, lang.code);
      xml += `  <url>\n`;
      xml += `    <loc>${siteUrl}${localizedUrl}</loc>\n`;
      xml += `    <lastmod>${page.lastmod || currentDate}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      
      // Add hreflang tags for all language versions
      languages.forEach(altLang => {
        const altLocalizedUrl = getLocalizedUrl(baseUrl, altLang.code);
        xml += `    <xhtml:link rel="alternate" hreflang="${altLang.hreflang}" href="${siteUrl}${altLocalizedUrl}" />\n`;
      });
      // Add x-default pointing to Spanish (default language)
      const defaultUrl = getLocalizedUrl(baseUrl, 'es');
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${defaultUrl}" />\n`;
      
      xml += `  </url>\n`;
    });
  });
  
  // Add blog posts - create separate URLs for each language
  blogPosts.forEach(post => {
    const baseUrl = `/blog/${post.slug}`;
    
    languages.forEach(lang => {
      const localizedUrl = getLocalizedUrl(baseUrl, lang.code);
      xml += `  <url>\n`;
      xml += `    <loc>${siteUrl}${localizedUrl}</loc>\n`;
      xml += `    <lastmod>${post.publishDate}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>${post.featured ? '0.9' : '0.8'}</priority>\n`;
      
      // Add hreflang tags for all language versions
      languages.forEach(altLang => {
        const altLocalizedUrl = getLocalizedUrl(baseUrl, altLang.code);
        xml += `    <xhtml:link rel="alternate" hreflang="${altLang.hreflang}" href="${siteUrl}${altLocalizedUrl}" />\n`;
      });
      // Add x-default pointing to Spanish (default language)
      const defaultUrl = getLocalizedUrl(baseUrl, 'es');
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${defaultUrl}" />\n`;
      
      xml += `  </url>\n`;
    });
  });
  
  xml += '</urlset>';
  
  return xml;
}

