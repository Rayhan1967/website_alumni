import React from 'react';
import { Check, User, Activity, FileSpreadsheet, Star, Send } from 'lucide-react';

interface StepperProps {
  currentStep: number;
}

const STEPS = [
  { id: 1, title: 'Identitas Diri', icon: User, desc: 'NIK, NISN, Biodata' },
  { id: 2, title: 'Status Utama', icon: Activity, desc: 'Kerja, Kuliah, Usaha' },
  { id: 3, title: 'Detail Spesifik', icon: FileSpreadsheet, desc: 'Form Kondisional' },
  { id: 4, title: 'Evaluasi Kurikulum', icon: Star, desc: 'Relevansi & Saran' },
  { id: 5, title: 'Tinjauan & Submit', icon: Send, desc: 'Ringkasan & Kirim' },
];

export const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  return (
    <div className="w-full py-2">
      {/* Desktop Stepper */}
      <div className="hidden md:block w-full">
        <div className="relative grid grid-cols-5">
          {/* Background connecting track: centered at top-[22px], spanning from 10% (step 1 center) to 90% (step 5 center) */}
          <div className="absolute top-[22px] -translate-y-1/2 left-[10%] right-[10%] h-[3px] bg-slate-200 z-0" />
          
          {/* Active progress track: starts at left-[10%] and extends proportionally */}
          <div
            className="absolute top-[22px] -translate-y-1/2 left-[10%] h-[3px] bg-blue-600 transition-all duration-500 ease-out z-0"
            style={{
              width: `${((currentStep - 1) / (STEPS.length - 1)) * 80}%`,
            }}
          />

          {STEPS.map((step) => {
            const isDone = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="relative z-10 flex flex-col items-center text-center px-1 select-none"
              >
                {/* Circle Icon Badge */}
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-xs ${
                    isDone
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100/80 shadow-emerald-200'
                      : isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-blue-200 scale-105'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {isDone ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <Icon className="w-4.5 h-4.5" />
                  )}
                </div>

                {/* Step Title & Subtitle */}
                <div className="mt-2.5">
                  <p
                    className={`text-xs font-bold leading-tight ${
                      isCurrent
                        ? 'text-blue-600'
                        : isDone
                        ? 'text-slate-800'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-[10px] text-slate-400 hidden lg:block mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Stepper Progress Bar */}
      <div className="md:hidden space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-blue-600">
            Langkah {currentStep} dari 5: {STEPS[currentStep - 1].title}
          </span>
          <span className="text-slate-500 font-semibold">
            {Math.round((currentStep / 5) * 100)}%
          </span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
