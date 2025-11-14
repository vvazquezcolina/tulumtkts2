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

  // Try to read blog posts data from generated JSON file (works in production)
  let blogPosts: BlogPost[] = [];
  
  // First try: Read from generated JSON file (production/build)
  // In Vercel, files are in different locations depending on context
  // Try multiple possible locations in order of likelihood
  const cwd = process.cwd();
  
  // Build array of possible paths
  const possibleJsonPaths = [
    // Vercel serverless function location (most likely in production)
    join('/var/task', 'dist/public/sitemap-blog-data.json'),
    join('/var/task', 'public/sitemap-blog-data.json'),
    // Production build location (local production)
    join(cwd, 'dist/public/sitemap-blog-data.json'),
    // Root public directory (development/build)
    join(cwd, 'public/sitemap-blog-data.json'),
    // Vercel output directory
    join(cwd, '.vercel/output/static/sitemap-blog-data.json'),
    // Client public directory
    join(cwd, 'client/public/sitemap-blog-data.json'),
    // Root directory fallback
    join(cwd, 'sitemap-blog-data.json'),
  ];
  
  let jsonPathFound = null;
  for (const jsonPath of possibleJsonPaths) {
    if (existsSync(jsonPath)) {
      try {
        const jsonContent = readFileSync(jsonPath, 'utf-8');
        const parsed = JSON.parse(jsonContent);
        if (Array.isArray(parsed) && parsed.length > 0) {
          blogPosts = parsed;
          jsonPathFound = jsonPath;
          console.log(`✅ Loaded ${blogPosts.length} blog posts from ${jsonPath}`);
          break; // Found and loaded, exit loop
        }
      } catch (error) {
        // Silently continue to next path
        continue;
      }
    }
  }
  
  if (blogPosts.length === 0) {
    console.warn('⚠️  No blog posts data found in JSON files. Trying TypeScript files as fallback...');
    console.warn(`   Searched paths: ${possibleJsonPaths.slice(0, 3).join(', ')}...`);
  }
  
  // Fallback: Try to read from TypeScript files directly (development)
  if (blogPosts.length === 0) {
    try {
      const blogPostsPath = join(process.cwd(), 'client/src/data/blogPosts.ts');
      const blogPostsExtendedPath = join(process.cwd(), 'client/src/data/blogPostsExtended.ts');
      
      if (existsSync(blogPostsPath) && existsSync(blogPostsExtendedPath)) {
        const blogPostsContent = readFileSync(blogPostsPath, 'utf-8');
        const blogPostsExtendedContent = readFileSync(blogPostsExtendedPath, 'utf-8');
        
        const extractBlogPost = (content: string): BlogPost[] => {
          const posts: BlogPost[] = [];
          const blogPostPattern = /\{\s*id:\s*"([^"]+)",[\s\S]*?slug:\s*"([^"]+)",[\s\S]*?publishDate:\s*"([^"]+)",[\s\S]*?featured:\s*(true|false)/g;
          let match;
          
          while ((match = blogPostPattern.exec(content)) !== null) {
            posts.push({
              slug: match[2],
              publishDate: match[3],
              featured: match[4] === 'true',
            });
          }
          
          return posts;
        };
        
        blogPosts = [
          ...extractBlogPost(blogPostsContent),
          ...extractBlogPost(blogPostsExtendedContent),
        ];
        
        // Remove duplicates
        const seen = new Set<string>();
        blogPosts = blogPosts.filter(post => {
          if (seen.has(post.slug)) return false;
          seen.add(post.slug);
          return true;
        });
      }
    } catch (error) {
      console.error('Error reading blog posts from TypeScript files:', error);
      // Continue with static pages only
    }
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

