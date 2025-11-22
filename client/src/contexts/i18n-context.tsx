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

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>(getInitialLocale());

  // Cargar traducciones síncronamente al iniciar (evita problemas de carga asíncrona)
  useEffect(() => {
    try {
      // Registrar traducciones comunes
      Object.keys(commonTranslations).forEach((lang) => {
        if (lang in commonTranslations) {
          registerTranslations(lang as SupportedLocale, commonTranslations[lang as SupportedLocale]);
        }
      });
      // Registrar traducciones de páginas
      Object.keys(pageTranslations).forEach((lang) => {
        if (lang in pageTranslations) {
          registerTranslations(lang as SupportedLocale, pageTranslations[lang as SupportedLocale]);
        }
      });
    } catch (err) {
      console.error('Error loading translations:', err);
    }
  }, []);

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
    return translate(key, locale, params);
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

