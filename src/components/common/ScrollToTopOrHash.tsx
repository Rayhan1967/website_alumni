import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTopOrHash
 * Handles smooth scrolling to anchor hash (e.g. #tentang, #berita, #kontak)
 * or scrolls to top on route change without hash.
 * Ensures browser Back (<) and Forward (>) work smoothly across pages.
 */
export const ScrollToTopOrHash: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small timeout to allow target element to be rendered
      const timeoutId = setTimeout(() => {
        const targetId = hash.replace('#', '');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);

      return () => clearTimeout(timeoutId);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
};
