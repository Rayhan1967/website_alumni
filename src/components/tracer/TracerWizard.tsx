import React, { useState, useEffect } from 'react';
import { useTracerStore } from '@/store/tracerStore';
import { useAuthStore } from '@/store/authStore';
import { TracerIntro } from './TracerIntro';
import { Stepper } from './Stepper';
import { Step1Identity } from './Step1Identity';
import { Step2Status } from './Step2Status';
import { Step3Details } from './Step3Details';
import { Step4Evaluation } from './Step4Evaluation';
import { Step5Review } from './Step5Review';
import { SubmissionReceiptModal } from './SubmissionReceiptModal';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { Card } from '@/components/ui/Card';
import { Link, useNavigate } from 'react-router-dom';

interface TracerWizardProps {
  onBackToOverview?: () => void;
}

export const TracerWizard: React.FC<TracerWizardProps> = ({ onBackToOverview }) => {
  const {
    currentStep,
    setStep,
    hasStartedSurvey,
    setHasStartedSurvey,
    resetForm,
    isSubmitted,
    lastSubmissionId,
  } = useTracerStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [activeSubmissionId, setActiveSubmissionId] = useState<string>(
    lastSubmissionId || 'TRC-2026-0001'
  );

  const handleSuccess = (submissionId: string) => {
    setActiveSubmissionId(submissionId);
    setReceiptModalOpen(true);
  };

  if (!isAuthenticated) {
    return null;
  }

  // Tampilkan Pengantar bagi Alumni SMK sebelum user mengklik MULAI SURVEY
  if (!hasStartedSurvey) {
    return (
      <div className="min-h-screen bg-slate-50/50 py-5 sm:py-10 px-3.5 sm:px-6 lg:px-8">
        <TracerIntro
          onStart={() => {
            setHasStartedSurvey(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBack={onBackToOverview}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-5 sm:py-10 px-3.5 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Top Breadcrumb & Actions */}
        <div className="flex items-center justify-between">
          {onBackToOverview ? (
            <button
              type="button"
              onClick={onBackToOverview}
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition cursor-pointer"
            >
              ← Kembali ke Beranda
            </button>
          ) : (
            <Link
              to="/dashboard"
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition"
            >
              ← Kembali ke Beranda
            </Link>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setHasStartedSurvey(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-medium text-slate-500 hover:text-blue-600 transition cursor-pointer"
              title="Lihat teks pengantar tracer study"
            >
              Baca Pengantar
            </button>

            <button
              type="button"
              onClick={() => setResetModalOpen(true)}
              className="text-xs text-slate-400 hover:text-rose-600 transition cursor-pointer"
            >
              Reset Isian
            </button>
          </div>
        </div>

        {/* Unified Portal Container Card matching Dapodik screenshot */}
        <div className="border border-slate-300 rounded-lg overflow-hidden bg-white shadow-sm">
          {/* Step Tabs Bar */}
          <Stepper currentStep={currentStep} />

          {/* Dark Header Banner Strip */}
          <div className="bg-[#1e293b] text-white px-4 py-2.5 font-bold text-xs uppercase tracking-wider flex items-center justify-between">
            <span>DAPODIK ALUMNI - DATA UMUM (2026)</span>
            <span className="text-[11px] text-slate-300 font-normal hidden sm:inline">SMK Sasmita Jaya 2 Pamulang</span>
          </div>

          {/* Form Step Body */}
          <div className="p-4 sm:p-6 bg-white">
            {currentStep === 1 && <Step1Identity onNext={() => setStep(2)} />}
            {currentStep === 2 && (
              <Step2Status onNext={() => setStep(3)} onPrev={() => setStep(1)} />
            )}
            {currentStep === 3 && (
              <Step3Details onNext={() => setStep(4)} onPrev={() => setStep(2)} />
            )}
            {currentStep === 4 && (
              <Step4Evaluation onNext={() => setStep(5)} onPrev={() => setStep(3)} />
            )}
            {currentStep === 5 && (
              <Step5Review
                onPrev={() => setStep(4)}
                onSuccess={(subId) => handleSuccess(subId)}
              />
            )}
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-slate-400">
          Dilindungi standar kerahasiaan data alumni • Yayasan Sasmita Jaya Pamulang
        </p>

      </div>

      {/* Submission Proof Receipt Modal */}
      <SubmissionReceiptModal
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        submissionId={activeSubmissionId}
      />

      {/* Reset Form Confirmation Modal */}
      <ConfirmModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={resetForm}
        title="Atur Ulang Formulir Tracer Study?"
        message="Semua isian formulir yang tersimpan sementara di perangkat Anda akan dihapus dan dikembalikan ke awal."
        confirmText="Ya, Reset Isian"
        cancelText="Batal"
        type="warning"
      />
    </div>
  );
};
