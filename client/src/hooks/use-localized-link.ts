// Hook para generar enlaces localizados automáticamente
import { useI18n } from '@/contexts/i18n-context';
import { getLocalizedPath } from '@/lib/routing';

/**
 * Hook que devuelve una función para generar enlaces localizados
 * basándose en el idioma actual
 */
export function useLocalizedLink() {
  const { locale } = useI18n();

  /**
   * Genera una ruta localizada basándose en el idioma actual
   * @param path - La ruta base (ej: "/experiencias")
   * @returns La ruta localizada (ej: "/en/experiencias" o "/experiencias" si es español)
   */
  const getLocalizedLink = (path: string): string => {
    return getLocalizedPath(path, locale);
  };

  return { getLocalizedLink, locale };
}

