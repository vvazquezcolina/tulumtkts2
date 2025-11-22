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

// Función para registrar traducciones
export function registerTranslations(
  locale: SupportedLocale,
  translation: Translations
) {
  translations[locale] = {
    ...translations[locale],
    ...translation,
  };
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

// Función para obtener el idioma inicial
export function getInitialLocale(): SupportedLocale {
  return getStoredLocale() || getBrowserLocale();
}

