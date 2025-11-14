import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// This script runs during build to generate a JSON file with blog data for sitemap
// It reads the TypeScript files directly and extracts blog post data

function extractBlogPosts(content) {
  const posts = [];
  // Pattern to match blog post objects: id, slug, publishDate, featured
  // This pattern is more flexible and handles different formatting
  const pattern = /\{\s*id:\s*"([^"]+)",[\s\S]*?slug:\s*"([^"]+)",[\s\S]*?publishDate:\s*"([^"]+)",[\s\S]*?featured:\s*(true|false)/g;
  
  let match;
  let lastIndex = 0;
  
  // Reset regex lastIndex to ensure we match all occurrences
  while ((match = pattern.exec(content)) !== null) {
    // Prevent infinite loops on zero-length matches
    if (match.index === lastIndex) {
      pattern.lastIndex++;
      continue;
    }
    lastIndex = match.index;
    
    posts.push({
      slug: match[2],
      publishDate: match[3],
      featured: match[4] === 'true',
    });
  }
  
  return posts;
}

async function generateSitemapData() {
  try {
    const rootDir = join(__dirname, '..');
    const blogPostsPath = join(rootDir, 'client/src/data/blogPosts.ts');
    const blogPostsExtendedPath = join(rootDir, 'client/src/data/blogPostsExtended.ts');
    
    // Read blog post files
    const blogPostsContent = readFileSync(blogPostsPath, 'utf-8');
    const blogPostsExtendedContent = readFileSync(blogPostsExtendedPath, 'utf-8');
    
    // Extract blog posts
    const blogPosts = extractBlogPosts(blogPostsContent);
    const extendedBlogPosts = extractBlogPosts(blogPostsExtendedContent);
    
    const allPosts = [...blogPosts, ...extendedBlogPosts];
    
    // Remove duplicates based on slug
    const uniquePosts = [];
    const seenSlugs = new Set();
    for (const post of allPosts) {
      if (!seenSlugs.has(post.slug)) {
        seenSlugs.add(post.slug);
        uniquePosts.push(post);
      }
    }
    
    // Write to multiple locations to ensure it's available in all contexts
    const outputDirs = [
      join(rootDir, 'public'),
      join(rootDir, 'dist/public'),
    ];
    
    const jsonData = JSON.stringify(uniquePosts, null, 2);
    let outputPath;
    
    for (const dir of outputDirs) {
      try {
        mkdirSync(dir, { recursive: true });
        const path = join(dir, 'sitemap-blog-data.json');
        writeFileSync(path, jsonData, 'utf-8');
        if (!outputPath) outputPath = path; // Track first successful write
        console.log(`   Written to: ${path}`);
      } catch (err) {
        console.warn(`   Warning: Could not write to ${dir}:`, err.message);
      }
    }
    
    if (!outputPath) {
      throw new Error('Failed to write sitemap data to any location');
    }
    
    console.log(`✅ Generated sitemap data: ${uniquePosts.length} blog posts`);
    console.log(`   Output: ${outputPath}`);
  } catch (error) {
    console.error('❌ Error generating sitemap data:', error);
    // Don't exit with error - allow build to continue
    console.log('⚠️  Continuing build without sitemap data...');
  }
}

generateSitemapData();

