import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LogOut, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info' | 'success';
  icon?: React.ReactNode;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
  type = 'danger',
  icon,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const typeConfig = {
    danger: {
      icon: <LogOut className="w-5 h-5 text-rose-600" />,
      iconBg: 'bg-rose-50 border-rose-200',
      confirmBtn: 'bg-rose-600 hover:bg-rose-700 text-white',
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-slate-600" />,
      iconBg: 'bg-slate-50 border-slate-200',
      confirmBtn: 'bg-[#132238] hover:bg-[#1c3355] text-white',
    },
    info: {
      icon: <Info className="w-5 h-5 text-slate-600" />,
      iconBg: 'bg-slate-50 border-slate-200',
      confirmBtn: 'bg-[#132238] hover:bg-[#1c3355] text-white',
    },
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      iconBg: 'bg-emerald-50 border-emerald-200',
      confirmBtn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
  };

  const currentConfig = typeConfig[type];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card (Uiverse Window Style) */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Top Window Bar with macOS 3 Dots */}
        <div className="bg-slate-50/90 border-b border-slate-100 px-4 py-3 flex items-center justify-between select-none">
          <div className="flex items-center gap-1.5">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors cursor-pointer inline-block"
              aria-label="Tutup"
              title="Tutup"
            />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:bg-slate-200/60 hover:text-slate-600 transition cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="space-y-1.5 text-left">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {message}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            {onConfirm && cancelText && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                {cancelText}
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                if (onConfirm) onConfirm();
                onClose();
              }}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition active:scale-95 cursor-pointer ${currentConfig.confirmBtn}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
