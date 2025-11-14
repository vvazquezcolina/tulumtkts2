import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// This script embeds sitemap data as a TypeScript module
// This ensures the data is available in the bundled server code in Vercel

const jsonPath = join(rootDir, 'public/sitemap-blog-data.json');
const outputPath = join(rootDir, 'server/data/sitemap-blog-data.ts');

try {
  if (!existsSync(jsonPath)) {
    console.warn('⚠️  sitemap-blog-data.json not found. Creating empty data file.');
    const emptyData = `// Auto-generated file - do not edit manually
export const sitemapBlogData: Array<{ slug: string; publishDate: string; featured: boolean }> = [];
`;
    const outputDir = dirname(outputPath);
    if (!existsSync(outputDir)) {
      const { mkdirSync } = await import('fs');
      mkdirSync(outputDir, { recursive: true });
    }
    writeFileSync(outputPath, emptyData, 'utf-8');
    console.log('✅ Created empty sitemap data module');
    process.exit(0);
  }

  const jsonContent = readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(jsonContent);

  // Generate TypeScript module with embedded data
  const tsContent = `// Auto-generated file - do not edit manually
// This file is generated from public/sitemap-blog-data.json during build
// It embeds blog post data directly in the server bundle for Vercel compatibility

export const sitemapBlogData: Array<{ slug: string; publishDate: string; featured: boolean }> = ${JSON.stringify(data, null, 2)};
`;

  // Ensure output directory exists
  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) {
    const { mkdirSync } = await import('fs');
    mkdirSync(outputDir, { recursive: true });
  }

  writeFileSync(outputPath, tsContent, 'utf-8');
  console.log(`✅ Embedded ${data.length} blog posts in TypeScript module: ${outputPath}`);
} catch (error) {
  console.error('❌ Error embedding sitemap data:', error);
  process.exit(1);
}

