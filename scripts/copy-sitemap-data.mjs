import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Copy sitemap data JSON to multiple locations
// This ensures it's available for the serverless function in Vercel
const sitemapSourcePath = join(rootDir, 'public/sitemap-blog-data.json');
const sitemapDestPaths = [
  join(rootDir, 'dist/public/sitemap-blog-data.json'),  // For static files
  join(rootDir, 'dist/sitemap-blog-data.json'),          // For serverless function access
];

// Copy CSV activities file to dist/
// This ensures it's available for the serverless function in Vercel
const csvSourcePath = join(rootDir, 'TulumTkts_Activities.csv');
const csvDestPaths = [
  join(rootDir, 'dist/TulumTkts_Activities.csv'),        // For serverless function access (primary)
  join(rootDir, 'dist/public/TulumTkts_Activities.csv'), // For static files (backup)
];

// Helper function to copy a file to multiple destinations
function copyFileToDestinations(sourcePath, destPaths, fileDescription) {
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
          console.warn(`⚠️  Could not copy ${fileDescription} to ${destPath}:`, err.message);
        }
      }
      
      if (copied > 0) {
        console.log(`✅ Copied ${fileDescription} to ${copied} location(s)`);
      } else {
        console.warn(`⚠️  Could not copy ${fileDescription} to any destination`);
      }
    } else {
      console.warn(`⚠️  ${fileDescription} not found at ${sourcePath}, skipping copy`);
    }
  } catch (error) {
    console.error(`❌ Error copying ${fileDescription}:`, error.message);
    // Don't fail the build
  }
}

// Copy sitemap data
copyFileToDestinations(sitemapSourcePath, sitemapDestPaths, 'sitemap-blog-data.json');

// Copy CSV activities file
copyFileToDestinations(csvSourcePath, csvDestPaths, 'TulumTkts_Activities.csv');

