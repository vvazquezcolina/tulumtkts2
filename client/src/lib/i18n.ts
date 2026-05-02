// Sistema de traducción i18n simple y robusto
export type SupportedLocale = 'es' | 'en' | 'fr' | 'it';

export const SUPPORTED_LOCALES: SupportedLocale[] = ['es', 'en', 'fr', 'it'];

export const LOCALE_NAMES: Record<SupportedLocale, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  it: 'Italiano',
};

export const LOCALE_FLAGS: Record<SupportedLocale, string> = {
  es: '🇲🇽',
  en: '🇺🇸',
  fr: '🇫🇷',
  it: '🇮🇹',
};

// Tipo para las traducciones (evitar referencia circular)
export type Translations = Record<string, any>;

// Almacenamiento de traducciones
const translations: Record<SupportedLocale, Translations> = {
  es: {},
  en: {},
  fr: {},
  it: {},
};

// Función para obtener traducción con soporte para nested keys
export function t(
  key: string,
  locale: SupportedLocale = 'es',
  params?: Record<string, string | number>
): string {
  const keys = key.split('.');
  let value: any = translations[locale];

  // Navegar por el objeto de traducciones
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Si no existe en el idioma solicitado, intentar en español como fallback
      value = translations.es;
      for (const k2 of keys) {
        if (value && typeof value === 'object' && k2 in value) {
          value = value[k2];
        } else {
          return key; // Fallback final: devolver la key
        }
      }
      break;
    }
  }

  // Si el valor es un string, reemplazar parámetros y devolver
  if (typeof value === 'string') {
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }
    return value;
  }

  return key; // Fallback final
}

// Deep-merge plain-object translations.
//
// 2026-05 — earlier this used a shallow `{...a, ...b}`. When a page-level
// translation file (e.g. home.ts) declared a top-level `crossSell: {title}`
// it overwrote the entire `crossSell.items` block from common.ts, leaving
// every cross-sell card rendering raw keys like `crossSell.items.flights.title`.
function deepMerge(target: Translations, source: Translations): Translations {
  const out: Translations = { ...target };
  for (const key of Object.keys(source)) {
    const a = out[key];
    const b = source[key];
    const bothPlainObjects =
      a && b && typeof a === 'object' && typeof b === 'object' &&
      !Array.isArray(a) && !Array.isArray(b);
    out[key] = bothPlainObjects ? deepMerge(a, b) : b;
  }
  return out;
}

export function registerTranslations(
  locale: SupportedLocale,
  translation: Translations
) {
  translations[locale] = deepMerge(translations[locale] || {}, translation);
}

// Función para obtener el idioma del navegador
export function getBrowserLocale(): SupportedLocale {
  if (typeof window === 'undefined') return 'es';
  
  const browserLang = navigator.language.split('-')[0] as SupportedLocale;
  return SUPPORTED_LOCALES.includes(browserLang) ? browserLang : 'es';
}

// Función para obtener el idioma guardado en localStorage
export function getStoredLocale(): SupportedLocale | null {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem('tulumtkts_locale');
  if (stored && SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
    return stored as SupportedLocale;
  }
  return null;
}

// Función para guardar el idioma en localStorage
export function setStoredLocale(locale: SupportedLocale): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('tulumtkts_locale', locale);
}

// Función para obtener el idioma de la URL actual
export function getLocaleFromUrl(): SupportedLocale | null {
  if (typeof window === 'undefined') return null;
  
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  
  if (segments.length === 0) return null;
  
  const firstSegment = segments[0];
  
  if (SUPPORTED_LOCALES.includes(firstSegment as SupportedLocale)) {
    return firstSegment as SupportedLocale;
  }
  
  return null;
}

// Función para obtener el idioma inicial (prioridad: URL > localStorage > browser)
export function getInitialLocale(): SupportedLocale {
  // 1. Intentar obtener de la URL (prioridad más alta)
  const urlLocale = getLocaleFromUrl();
  if (urlLocale) {
    // Guardar en localStorage para persistencia
    setStoredLocale(urlLocale);
    return urlLocale;
  }
  
  // 2. Intentar obtener de localStorage
  const storedLocale = getStoredLocale();
  if (storedLocale) {
    return storedLocale;
  }
  
  // 3. Usar idioma del navegador como fallback
  return getBrowserLocale();
}

