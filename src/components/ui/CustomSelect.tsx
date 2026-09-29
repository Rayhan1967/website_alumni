import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface CustomSelectProps {
  label?: string;
  error?: string;
  helperText?: string;
  requiredStar?: boolean;
  options: SelectOption[];
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  error,
  helperText,
  requiredStar,
  options = [],
  value,
  onChange,
  placeholder = 'Pilih opsi...',
  className,
  disabled = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Find the selected option object
  const selectedOption = options.find((opt) => String(opt.value) === String(value));

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = (val: string | number) => {
    if (disabled) return;
    onChange(String(val));
    setIsOpen(false);
  };

  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={cn('w-full space-y-1.5', className)} ref={containerRef}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold  tracking-wider text-slate-700"
        >
          {label}
          {requiredStar && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Trigger Button */}
        <button
          type="button"
          id={selectId}
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            'w-full flex items-center justify-between rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-xs sm:text-sm text-slate-900 font-semibold shadow-xs transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-[#182a4a] hover:bg-white hover:border-slate-400',
            isOpen && 'border-[#182a4a] bg-white ring-2 ring-slate-400/20',
            error && 'border-rose-500 focus:ring-rose-500/20 text-rose-900',
            disabled && 'cursor-not-allowed bg-slate-50 text-slate-400'
          )}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={cn('truncate', !selectedOption && 'text-slate-400')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={cn(
              'w-4 h-4 text-slate-500 shrink-0 ml-2 transition-transform duration-200',
              isOpen && 'rotate-180 text-[#182a4a]'
            )}
          />
        </button>

        {/* Custom Dropdown Menu */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white rounded-xl border border-slate-200 shadow-xl py-1.5 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            {options.length === 0 ? (
              <div className="px-4 py-3 text-xs text-slate-400 text-center">
                Tidak ada pilihan tersedia
              </div>
            ) : (
              options.map((opt) => {
                const isSelected = String(opt.value) === String(value);

                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      'w-full px-4 py-2.5 text-left text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer',
                      isSelected
                        ? 'bg-slate-100 text-[#182a4a] font-bold'
                        : 'text-slate-800 hover:bg-slate-50 hover:text-[#182a4a]'
                    )}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-[#182a4a] shrink-0 ml-2" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs font-medium text-rose-600 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 inline-block shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};
