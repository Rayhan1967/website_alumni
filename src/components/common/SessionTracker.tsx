import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const SessionTracker: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, checkSessionExpiry, recordDashboardActivity } = useAuthStore();

  // 1. Pantau setiap pergantian rute URL
  useEffect(() => {
    if (isAuthenticated) {
      if (location.pathname.startsWith('/dashboard')) {
        recordDashboardActivity();
      } else {
        checkSessionExpiry(location.pathname);
      }
    }
  }, [location.pathname, isAuthenticated, recordDashboardActivity, checkSessionExpiry]);

  // 2. Pemeriksaan periodik setiap 30 detik & saat tab browser kembali aktif
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      checkSessionExpiry(window.location.pathname);
    }, 30000);

    const handleFocusOrVisible = () => {
      checkSessionExpiry(window.location.pathname);
    };

    window.addEventListener('visibilitychange', handleFocusOrVisible);
    window.addEventListener('focus', handleFocusOrVisible);

    return () => {
      clearInterval(interval);
      window.removeEventListener('visibilitychange', handleFocusOrVisible);
      window.removeEventListener('focus', handleFocusOrVisible);
    };
  }, [isAuthenticated, checkSessionExpiry]);

  return null;
};
