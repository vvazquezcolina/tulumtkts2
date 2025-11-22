#!/usr/bin/env node
/**
 * Script para convertir los artículos JSON generados a TypeScript
 * e integrarlos en el sistema de blogs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Leer todos los artículos generados
const allArticlesJson = readFileSync(
  join(projectRoot, 'generated-content', 'all-articles.json'),
  'utf-8'
);

const articles = JSON.parse(allArticlesJson);

console.log(`📚 Convirtiendo ${articles.length} artículos a TypeScript...`);

// Generar el contenido TypeScript
const typescriptContent = `// Generated blog posts from CSV data
// This file is auto-generated - do not edit manually
// Generated on: ${new Date().toISOString()}
// Total articles: ${articles.length}

import { BlogPost } from './blogPosts';

export const generatedBlogPosts: BlogPost[] = [
${articles.map((article, index) => {
  // Escapar comillas en strings
  const escapeString = (str) => {
    if (typeof str !== 'string') return str;
    return str
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\${/g, '\\${');
  };

  const id = escapeString(article.id);
  const slug = escapeString(article.slug);
  const title = escapeString(article.title);
  const metaTitle = escapeString(article.metaTitle);
  const metaDescription = escapeString(article.metaDescription);
  const excerpt = escapeString(article.excerpt);
  const category = escapeString(article.category);
  const author = escapeString(article.author);
  const publishDate = escapeString(article.publishDate);
  const readTime = escapeString(article.readTime);
  const image = escapeString(article.image);
  const pexelsQuery = article.pexelsQuery ? escapeString(article.pexelsQuery) : 'undefined';
  const content = article.content.replace(/`/g, '\\`').replace(/\${/g, '\\${');
  const type = escapeString(article.type);
  const keywords = JSON.stringify(article.keywords);

  return `  {
    id: "${id}",
    slug: "${slug}",
    title: "${title}",
    metaTitle: "${metaTitle}",
    metaDescription: "${metaDescription}",
    excerpt: "${excerpt}",
    category: "${category}",
    author: "${author}",
    publishDate: "${publishDate}",
    readTime: "${readTime}",
    views: ${article.views},
    featured: ${article.featured},
    image: "${image}",
    ${pexelsQuery !== 'undefined' ? `pexelsQuery: "${pexelsQuery}",` : ''}
    keywords: ${keywords},
    type: "${type}" as const,
    content: \`${content}\`
  }`;
}).join(',\n')}
];
`;

// Escribir el archivo TypeScript
const outputPath = join(projectRoot, 'client', 'src', 'data', 'generatedBlogPosts.ts');
writeFileSync(outputPath, typescriptContent, 'utf-8');

console.log(`✅ Archivo TypeScript generado: ${outputPath}`);
console.log(`📊 Total de artículos: ${articles.length}`);
console.log(`💾 Tamaño del archivo: ${(typescriptContent.length / 1024 / 1024).toFixed(2)} MB`);

