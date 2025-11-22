import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { trackPageView } from '@/lib/analytics';

/**
 * Hook to automatically track page views on route changes
 * This is essential for SPAs where route changes don't trigger full page reloads
 */
export const useGA4PageView = () => {
  const [location] = useLocation();

  useEffect(() => {
    // Track page view when location changes
    const pageTitle = document.title || 'TulumTkts';
    trackPageView(location, pageTitle);
  }, [location]);
};



