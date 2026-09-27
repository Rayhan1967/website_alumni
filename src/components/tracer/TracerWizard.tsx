import React, { useState, useEffect } from 'react';
import { useTracerStore } from '@/store/tracerStore';
import { useAuthStore } from '@/store/authStore';
import { Stepper } from './Stepper';
import { Step1Identity } from './Step1Identity';
import { Step2Status } from './Step2Status';
import { Step3Details } from './Step3Details';
import { Step4Evaluation } from './Step4Evaluation';
import { Step5Review } from './Step5Review';
import { SubmissionReceiptModal } from './SubmissionReceiptModal';
import { Card } from '@/components/ui/Card';
import { RotateCcw, Sparkles, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const TracerWizard: React.FC = () => {
  const { currentStep, setStep, resetForm, isSubmitted, lastSubmissionId } =
    useTracerStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
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

  return (
    <div className="min-h-screen bg-slate-50/50 py-5 sm:py-10 px-3.5 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Top Breadcrumb & Return to Home */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Apakah Anda yakin ingin mengatur ulang formulir?')) {
                resetForm();
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-600 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Isian</span>
          </button>
        </div>

        {/* Wizard Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-[#0b192e] rounded-xl p-4 sm:p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-[11px] sm:text-xs font-semibold mb-2 sm:mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Kuesioner Resmi Lulusan Vokasi</span>
            </div>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight">
              Tracer Study SMK Sasmita Jaya 2
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 sm:mt-2 max-w-2xl leading-relaxed">
              Bantu sekolah melakukan pemetaan karir lulusan dan penyelarasan kurikulum DUDI. Formulir tersimpan otomatis di perangkat Anda.
            </p>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-blue-500/10 blur-3xl pointer-events-none" />
        </div>

        {/* Stepper Progress Bar */}
        <Card className="p-3.5 sm:p-6 shadow-sm border-slate-200/80">
          <Stepper currentStep={currentStep} onStepClick={(step) => setStep(step)} />
        </Card>

        {/* Form Container Card */}
        <Card className="p-4 sm:p-8 shadow-md border-slate-200/80 bg-white">
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
        </Card>

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
    </div>
  );
};
