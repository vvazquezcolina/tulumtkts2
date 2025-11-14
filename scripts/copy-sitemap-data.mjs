import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Copy sitemap data JSON to multiple locations
// This ensures it's available for the serverless function in Vercel
const sourcePath = join(rootDir, 'public/sitemap-blog-data.json');

const destPaths = [
  join(rootDir, 'dist/public/sitemap-blog-data.json'),  // For static files
  join(rootDir, 'dist/sitemap-blog-data.json'),          // For serverless function access
];

try {
  if (existsSync(sourcePath)) {
    let copied = 0;
    
    for (const destPath of destPaths) {
      try {
        // Ensure destination directory exists
        const destDir = dirname(destPath);
        mkdirSync(destDir, { recursive: true });
        
        // Copy file
        copyFileSync(sourcePath, destPath);
        copied++;
      } catch (err) {
        console.warn(`⚠️  Could not copy to ${destPath}:`, err.message);
      }
    }
    
    if (copied > 0) {
      console.log(`✅ Copied sitemap-blog-data.json to ${copied} location(s)`);
    } else {
      console.warn('⚠️  Could not copy sitemap-blog-data.json to any destination');
    }
  } else {
    console.warn('⚠️  sitemap-blog-data.json not found in public/, skipping copy');
  }
} catch (error) {
  console.error('❌ Error copying sitemap data:', error.message);
  // Don't fail the build
}

