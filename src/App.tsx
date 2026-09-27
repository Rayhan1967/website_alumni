import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '@/components/landing/LandingPage';
import { LoginPage } from '@/components/auth/LoginPage';
import { TracerWizard } from '@/components/tracer/TracerWizard';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { NewsDetailPage } from '@/components/news/NewsDetailPage';
import { AboutDetailPage } from '@/components/about/AboutDetailPage';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Dedicated Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dedicated About Tracer Study Detail Page */}
        <Route path="/tentang" element={<AboutDetailPage />} />
        <Route path="/about" element={<AboutDetailPage />} />

        {/* Dedicated News Article Portal Page */}
        <Route path="/berita/:id" element={<NewsDetailPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />

        {/* Standalone Tracer Study Wizard (e.g. from WhatsApp Link) */}
        <Route path="/tracer-study" element={<TracerWizard />} />

        {/* Dashboard and all sub-routes */}
        <Route path="/dashboard/*" element={<DashboardLayout />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
