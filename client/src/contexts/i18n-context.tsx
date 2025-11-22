import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'wouter';
import { 
  SupportedLocale, 
  getInitialLocale, 
  setStoredLocale as storeLocale,
  registerTranslations,
  t as translate
} from '@/lib/i18n';
import { getLocaleFromPath, getLocalizedPath, getPathWithoutLocale } from '@/lib/routing';
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
  const [location, setLocation] = useLocation();
  
  // Obtener el idioma de la URL o usar el inicial
  const getCurrentLocale = (): SupportedLocale => {
    const urlLocale = getLocaleFromPath(location);
    if (urlLocale) {
      return urlLocale;
    }
    return getInitialLocale();
  };

  const [locale, setLocaleState] = useState<SupportedLocale>(() => {
    try {
      return getCurrentLocale();
    } catch (err) {
      console.error('Error getting initial locale:', err);
      return 'es'; // Fallback a español
    }
  });

  // Sincronizar locale con la URL cuando cambie la ruta
  useEffect(() => {
    const urlLocale = getLocaleFromPath(location);
    if (urlLocale && urlLocale !== locale) {
      setLocaleState(urlLocale);
      storeLocale(urlLocale);
    }
  }, [location, locale]);

  const setLocale = (newLocale: SupportedLocale) => {
    // Obtener la ruta actual sin prefijo de idioma
    const currentPath = getPathWithoutLocale(location);
    
    // Construir la nueva URL con el prefijo de idioma
    const newPath = getLocalizedPath(currentPath, newLocale);
    
    // Actualizar el estado y localStorage
    setLocaleState(newLocale);
    storeLocale(newLocale);
    
    // Actualizar la URL
    setLocation(newPath);
    
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

