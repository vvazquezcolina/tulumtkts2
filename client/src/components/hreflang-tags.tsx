import { useEffect } from 'react';

interface HreflangTagsProps {
  currentPath: string;
  languages?: string[];
}

/**
 * Componente que agrega hreflang tags para SEO multi-idioma
 * Esto ayuda a Google a mostrar la versión correcta según el idioma del usuario
 * CRÍTICO para SEO internacional
 */
export function HreflangTags({ 
  currentPath,
  languages = ['es', 'en', 'fr', 'it'] 
}: HreflangTagsProps) {
  useEffect(() => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';
    
    // Remover hreflang tags existentes
    const existingTags = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingTags.forEach(tag => tag.remove());

    // Mapeo de códigos de idioma a hreflang codes
    const hreflangMap: Record<string, string> = {
      es: 'es-MX',
      en: 'en-US',
      fr: 'fr-FR',
      it: 'it-IT',
    };

    // Agregar hreflang tags para cada idioma
    // Nota: Por ahora las URLs son las mismas para todos los idiomas
    // En el futuro podrías implementar rutas con prefijos de idioma (/en/, /fr/, /it/)
    languages.forEach(lang => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflangMap[lang] || lang);
      
      // Por ahora todas las URLs son las mismas (idioma se maneja en el estado de la app)
      // En el futuro podrías tener: ${siteUrl}/${lang}${currentPath}
      link.setAttribute('href', `${siteUrl}${currentPath}`);
      document.head.appendChild(link);
    });

    // Agregar x-default (versión por defecto - español)
    const defaultLink = document.createElement('link');
    defaultLink.setAttribute('rel', 'alternate');
    defaultLink.setAttribute('hreflang', 'x-default');
    defaultLink.setAttribute('href', `${siteUrl}${currentPath}`);
    document.head.appendChild(defaultLink);
  }, [currentPath, languages]);

  return null;
}

