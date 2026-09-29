import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { TracerWizard } from './components/tracer/TracerWizard';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { NewsDetailPage } from './components/news/NewsDetailPage';
import { AboutDetailPage } from './components/about/AboutDetailPage';
import { SessionTracker } from './components/common/SessionTracker';
import { ScrollToTopOrHash } from './components/common/ScrollToTopOrHash';

import { useAuthStore } from './store/authStore';

export const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      {/* Auto-logout & session tracker: logs out if user is outside dashboard for > 1 hour */}
      <SessionTracker />
      {/* Scroll restoration and hash anchor navigation handler */}
      <ScrollToTopOrHash />

      <Routes>
        {/* Landing Page - Guest Only: If already logged in, redirect directly to /dashboard */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />}
        />

        {/* Dedicated Login Page - Guest Only: If already logged in, redirect directly to /dashboard */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />

        {/* Dedicated About Tracer Study Detail Page */}
        <Route path="/tentang" element={<AboutDetailPage />} />
        <Route path="/about" element={<AboutDetailPage />} />

        {/* Dedicated News Article Portal Page */}
        <Route path="/berita/:id" element={<NewsDetailPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />

        {/* Standalone Tracer Study Wizard (Requires Login) */}
        <Route
          path="/tracer-study"
          element={isAuthenticated ? <TracerWizard /> : <Navigate to="/login" replace />}
        />

        {/* Protected Dashboard and all sub-routes */}
        <Route
          path="/dashboard/*"
          element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" replace />}
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
