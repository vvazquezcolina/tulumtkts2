// Utilidades para manejo de routing con idiomas
import { SupportedLocale, SUPPORTED_LOCALES } from './i18n';

/**
 * Extrae el idioma de una URL
 * @param path - La ruta de la URL (ej: "/en/experiencias" o "/experiencias")
 * @returns El idioma encontrado o null si no hay prefijo de idioma
 */
export function getLocaleFromPath(path: string): SupportedLocale | null {
  const pathSegments = path.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) return null;
  
  const firstSegment = pathSegments[0];
  
  // Si el primer segmento es un idioma válido, retornarlo
  if (SUPPORTED_LOCALES.includes(firstSegment as SupportedLocale)) {
    return firstSegment as SupportedLocale;
  }
  
  return null;
}

/**
 * Extrae la ruta base sin el prefijo de idioma
 * @param path - La ruta completa (ej: "/en/experiencias" o "/experiencias")
 * @returns La ruta sin prefijo de idioma (ej: "/experiencias")
 */
export function getPathWithoutLocale(path: string): string {
  const locale = getLocaleFromPath(path);
  
  if (!locale) {
    return path || '/';
  }
  
  // Remover el prefijo de idioma
  const segments = path.split('/').filter(Boolean);
  segments.shift(); // Remover el primer segmento (idioma)
  
  return '/' + segments.join('/') || '/';
}

/**
 * Construye una URL con el prefijo de idioma
 * @param path - La ruta base (ej: "/experiencias")
 * @param locale - El idioma (si es 'es', no agrega prefijo)
 * @returns La URL con prefijo de idioma si es necesario
 */
export function getLocalizedPath(path: string, locale: SupportedLocale): string {
  // Limpiar la ruta
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Si es español (idioma por defecto), no agregar prefijo
  if (locale === 'es') {
    return cleanPath;
  }
  
  // Remover cualquier prefijo de idioma existente
  const pathWithoutLocale = getPathWithoutLocale(cleanPath);
  
  // Agregar el nuevo prefijo de idioma
  return `/${locale}${pathWithoutLocale}`;
}

/**
 * Obtiene todas las versiones de una ruta en diferentes idiomas
 * @param path - La ruta base (ej: "/experiencias")
 * @returns Objeto con todas las versiones de la ruta
 */
export function getAllLocalizedPaths(path: string): Record<SupportedLocale, string> {
  const result = {} as Record<SupportedLocale, string>;
  
  SUPPORTED_LOCALES.forEach((locale) => {
    result[locale] = getLocalizedPath(path, locale);
  });
  
  return result;
}

/**
 * Obtiene la ruta actual sin el prefijo de idioma
 * @param currentPath - La ruta actual (ej: "/en/experiencias")
 * @returns La ruta base sin idioma (ej: "/experiencias")
 */
export function getCurrentPathWithoutLocale(currentPath: string): string {
  return getPathWithoutLocale(currentPath);
}

