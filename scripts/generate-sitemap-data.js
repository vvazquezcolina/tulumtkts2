import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// This script runs during build to generate a JSON file with blog data for sitemap
// It needs to be run with: node --loader ts-node/esm scripts/generate-sitemap-data.js

async function generateSitemapData() {
  try {
    // Import blog posts
    const { allBlogPosts } = await import('../client/src/data/blogPosts.ts');
    
    // Extract only the data needed for sitemap
    const sitemapData = allBlogPosts.map(post => ({
      slug: post.slug,
      publishDate: post.publishDate,
      featured: post.featured,
    }));
    
    // Ensure public directory exists
    const publicDir = join(process.cwd(), 'public');
    try {
      mkdirSync(publicDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }
    
    // Write JSON file
    const outputPath = join(publicDir, 'sitemap-blog-data.json');
    writeFileSync(outputPath, JSON.stringify(sitemapData, null, 2), 'utf-8');
    
    console.log(`✅ Generated sitemap data: ${sitemapData.length} blog posts`);
    console.log(`   Output: ${outputPath}`);
  } catch (error) {
    console.error('❌ Error generating sitemap data:', error);
    process.exit(1);
  }
}

generateSitemapData();

