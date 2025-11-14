import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Copy sitemap data JSON to dist/public after build
const sourcePath = join(rootDir, 'public/sitemap-blog-data.json');
const destPath = join(rootDir, 'dist/public/sitemap-blog-data.json');

try {
  if (existsSync(sourcePath)) {
    // Ensure destination directory exists
    const destDir = dirname(destPath);
    mkdirSync(destDir, { recursive: true });
    
    // Copy file
    copyFileSync(sourcePath, destPath);
    console.log('✅ Copied sitemap-blog-data.json to dist/public/');
  } else {
    console.warn('⚠️  sitemap-blog-data.json not found in public/, skipping copy');
  }
} catch (error) {
  console.error('❌ Error copying sitemap data:', error.message);
  // Don't fail the build
}

