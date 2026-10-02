import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

// Admin Tabs
import { AdminOverviewTab } from './admin/AdminOverviewTab';
import { AdminMasterAlumniTab } from './admin/AdminMasterAlumniTab';
import { AdminRespondentsTab } from './admin/AdminRespondentsTab';
import { AdminNewsTab } from './admin/AdminNewsTab';
import { AdminJobsTab } from './admin/AdminJobsTab';
import { AdminExportReportTab } from './admin/AdminExportReportTab';
import { AdminSettingsTab } from './admin/AdminSettingsTab';

import {
  OverviewTabSkeleton,
  CekIjazahTabSkeleton,
  LokerTabSkeleton,
  AlumniTabSkeleton,
  HelpdeskTabSkeleton,
} from './skeletons';

const VALID_TABS: DashboardTab[] = [
  'beranda',
  'cek_ijazah',
  'tracer_study',
  'loker',
  'alumni',
  'helpdesk',
  'master_alumni',
  'verifikasi',
  'kelola_berita',
  'kelola_loker',
  'laporan',
  'pengaturan',
];

export const DashboardLayout: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const isAdmin = user?.role === 'admin_bkk';

  const tabParam = (searchParams.get('tab') as DashboardTab) || 'beranda';
  const activeTab: DashboardTab = VALID_TABS.includes(tabParam) ? tabParam : 'beranda';

  // Purposeful tab-level loading state to avoid layout shifts during transitions
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [selectedRespondentId, setSelectedRespondentId] = useState<string | null>(null);

  const setActiveTab = (tab: DashboardTab) => {
    setSelectedRespondentId(null);
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      if (tab === 'beranda') {
        nextParams.delete('tab');
        nextParams.delete('step');
      } else {
        nextParams.set('tab', tab);
        if (tab !== 'tracer_study') {
          nextParams.delete('step');
        }
      }
      return nextParams;
    });
  };

  // Brief initial/tab-switch simulated data load for perceptual performance
  useEffect(() => {
    setIsTabLoading(true);
    const timer = setTimeout(() => {
      setIsTabLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [activeTab]);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return localStorage.getItem('sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobVacancy | null>(null);

  // Lock body & html scroll when mobile sidebar drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobileOpen]);

  const handleToggleCollapse = (val: boolean | ((prev: boolean) => boolean)) => {
    setIsCollapsed((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      try {
        localStorage.setItem('sidebar_collapsed', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

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
      {/* Sidebar with Blue 900 scheme & Collapse Support */}
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={handleToggleCollapse}
      />

      {/* Mobile Backdrop Overlay - Fully blocks touches, scrolls, & interactions outside sidebar */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 z-40 lg:hidden backdrop-blur-xs transition-opacity duration-300 touch-none select-none overscroll-none"
          onClick={() => setIsMobileOpen(false)}
          onTouchMove={(e) => e.preventDefault()}
          onWheel={(e) => e.preventDefault()}
          aria-hidden="true"
        />
      )}

      {/* Main Content Area - Smooth dynamic padding without layout shift */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Header */}
        <DashboardHeader
          onToggleMobileMenu={() => setIsMobileOpen(!isMobileOpen)}
          onOpenReceipt={() => setReceiptModalOpen(true)}
          onNavigateTab={(tab, respondentId) => {
            if (respondentId) {
              setSelectedRespondentId(respondentId);
            }
            setActiveTab(tab as DashboardTab);
          }}
        />

        {/* Dynamic Tab Body */}
        <main className="p-3.5 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
          {/* ADMIN VIEW */}
          {isAdmin ? (
            <>
              {activeTab === 'beranda' && (
                isTabLoading ? (
                  <OverviewTabSkeleton />
                ) : (
                  <AdminOverviewTab
                    onNavigateTab={(tab) => setActiveTab(tab as DashboardTab)}
                    onOpenRespondentDetail={(subId) => {
                      setSelectedRespondentId(subId);
                      setSearchParams((prev) => {
                        const nextParams = new URLSearchParams(prev);
                        nextParams.set('tab', 'verifikasi');
                        return nextParams;
                      });
                    }}
                  />
                )
              )}

              {activeTab === 'master_alumni' && <AdminMasterAlumniTab />}

              {activeTab === 'verifikasi' && (
                <AdminRespondentsTab
                  initialSelectedId={selectedRespondentId}
                  onClearInitialSelectedId={() => setSelectedRespondentId(null)}
                />
              )}

              {activeTab === 'kelola_berita' && <AdminNewsTab />}

              {activeTab === 'kelola_loker' && <AdminJobsTab />}

              {activeTab === 'laporan' && <AdminExportReportTab />}

              {activeTab === 'pengaturan' && <AdminSettingsTab />}
            </>
          ) : (
            /* ALUMNI VIEW */
            <>
              {activeTab === 'beranda' && (
                isTabLoading ? (
                  <OverviewTabSkeleton />
                ) : (
                  <OverviewTab
                    onNavigateTab={(tab) => setActiveTab(tab)}
                    onOpenReceipt={() => setReceiptModalOpen(true)}
                    onSelectJob={handleSelectJobFromOverview}
                  />
                )
              )}

              {activeTab === 'cek_ijazah' && (
                isTabLoading ? <CekIjazahTabSkeleton /> : <CekIjazahTab />
              )}

              {activeTab === 'tracer_study' && (
                <div className="-mx-4 -my-4 sm:-mx-8 sm:-my-8">
                  <TracerWizard onBackToOverview={() => setActiveTab('beranda')} />
                </div>
              )}

              {activeTab === 'loker' && (
                isTabLoading ? (
                  <LokerTabSkeleton />
                ) : (
                  <LokerTab
                    selectedJobFromOverview={selectedJob}
                    onClearSelectedJob={() => setSelectedJob(null)}
                  />
                )
              )}

              {activeTab === 'alumni' && (
                isTabLoading ? <AlumniTabSkeleton /> : <AlumniTab />
              )}

              {activeTab === 'helpdesk' && (
                isTabLoading ? <HelpdeskTabSkeleton /> : <HelpdeskTab />
              )}
            </>
          )}
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
