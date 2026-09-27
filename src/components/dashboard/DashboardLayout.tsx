import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardSidebar, DashboardTab } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { OverviewTab } from './OverviewTab';
import { CekIjazahTab } from './CekIjazahTab';
import { LokerTab } from './LokerTab';
import { AlumniTab } from './AlumniTab';
import { HelpdeskTab } from './HelpdeskTab';
import { TracerWizard } from '@/components/tracer/TracerWizard';
import { SubmissionReceiptModal } from '@/components/tracer/SubmissionReceiptModal';
import { useTracerStore } from '@/store/tracerStore';
import { useAuthStore } from '@/store/authStore';
import { JobVacancy } from '@/types/tracer';

export const DashboardLayout: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [activeTab, setActiveTab] = useState<DashboardTab>('beranda');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobVacancy | null>(null);

  const { lastSubmissionId } = useTracerStore();

  const handleSelectJobFromOverview = (job: JobVacancy) => {
    setSelectedJob(job);
    setActiveTab('loker');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar matching Attachment 2 Wireframe */}
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/50 z-20 lg:hidden backdrop-blur-xs"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Header */}
        <DashboardHeader
          onToggleMobileMenu={() => setIsMobileOpen(!isMobileOpen)}
          onOpenReceipt={() => setReceiptModalOpen(true)}
        />

        {/* Dynamic Tab Body */}
        <main className="p-4 sm:p-8 flex-1 max-w-7xl w-full mx-auto">
          {activeTab === 'beranda' && (
            <OverviewTab
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenReceipt={() => setReceiptModalOpen(true)}
              onSelectJob={handleSelectJobFromOverview}
            />
          )}

          {activeTab === 'cek_ijazah' && <CekIjazahTab />}

          {activeTab === 'tracer_study' && (
            <div className="-mx-4 -my-4 sm:-mx-8 sm:-my-8">
              <TracerWizard />
            </div>
          )}

          {activeTab === 'loker' && (
            <LokerTab
              selectedJobFromOverview={selectedJob}
              onClearSelectedJob={() => setSelectedJob(null)}
            />
          )}

          {activeTab === 'alumni' && <AlumniTab />}

          {activeTab === 'helpdesk' && <HelpdeskTab />}
        </main>
      </div>

      {/* Official Receipt Modal */}
      <SubmissionReceiptModal
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        submissionId={lastSubmissionId || 'TRC-2026-0001'}
      />
    </div>
  );
};
