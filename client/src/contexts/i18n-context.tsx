import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  SupportedLocale, 
  getInitialLocale, 
  setStoredLocale as storeLocale,
  registerTranslations,
  t as translate
} from '@/lib/i18n';
import commonTranslations from '@/translations/common';
import pageTranslations from '@/translations/pages';

interface I18nContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Cargar traducciones síncronamente antes de renderizar el provider
// Esto asegura que las traducciones estén disponibles inmediatamente
try {
  // Registrar traducciones comunes
  if (commonTranslations) {
    Object.keys(commonTranslations).forEach((lang) => {
      try {
        if (lang in commonTranslations && commonTranslations[lang as SupportedLocale]) {
          registerTranslations(lang as SupportedLocale, commonTranslations[lang as SupportedLocale]);
        }
      } catch (err) {
        console.error(`Error registering common translations for ${lang}:`, err);
      }
    });
  }
  // Registrar traducciones de páginas
  if (pageTranslations) {
    Object.keys(pageTranslations).forEach((lang) => {
      try {
        if (lang in pageTranslations && pageTranslations[lang as SupportedLocale]) {
          registerTranslations(lang as SupportedLocale, pageTranslations[lang as SupportedLocale]);
        }
      } catch (err) {
        console.error(`Error registering page translations for ${lang}:`, err);
      }
    });
  }
} catch (err) {
  console.error('Error loading translations:', err);
  // No lanzar error - permitir que la app continúe
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => {
    try {
      return getInitialLocale();
    } catch (err) {
      console.error('Error getting initial locale:', err);
      return 'es'; // Fallback a español
    }
  });

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    storeLocale(newLocale);
    // Actualizar el atributo lang del HTML
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
    }
  };

  // Función t con el locale actual
  const t = (key: string, params?: Record<string, string | number>): string => {
    try {
      return translate(key, locale, params);
    } catch (err) {
      console.error(`Error translating key "${key}":`, err);
      return key; // Fallback a la key si hay error
    }
  };

  // Actualizar el atributo lang del HTML cuando cambie el locale
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

