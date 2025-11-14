import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

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

export function generateSitemap(siteUrl: string = 'https://tulumtkts.com'): string {
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Static pages
  const staticPages: SitemapPage[] = [
    { url: '', priority: '1.0', changefreq: 'daily', lastmod: currentDate },
    { url: '/blog', priority: '0.9', changefreq: 'daily', lastmod: currentDate },
    { url: '/experiencias', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
    { url: '/eventos', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
    { url: '/villas', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
    { url: '/transporte', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
    { url: '/contacto', priority: '0.6', changefreq: 'monthly', lastmod: currentDate },
  ];

  // Load blog posts data from JSON file (generated during build)
  // This must not throw - sitemap must work even without blog data
  let blogPosts: BlogPost[] = [];
  
  try {
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
  } catch (error: any) {
    // Never throw - sitemap must always work
    console.log(`ℹ️  Could not load blog posts (${error?.message || 'unknown error'}). Sitemap will use static pages only.`);
    blogPosts = [];
  }

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
  xml += '        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
  xml += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n\n';
  
  // Add static pages
  staticPages.forEach(page => {
    xml += `  <url>\n`;
    xml += `    <loc>${siteUrl}${page.url}</loc>\n`;
    xml += `    <lastmod>${page.lastmod || currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  });
  
  // Add blog posts
  blogPosts.forEach(post => {
    xml += `  <url>\n`;
    xml += `    <loc>${siteUrl}/blog/${post.slug}</loc>\n`;
    xml += `    <lastmod>${post.publishDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>${post.featured ? '0.9' : '0.8'}</priority>\n`;
    xml += `  </url>\n`;
  });
  
  xml += '</urlset>';
  
  return xml;
}

