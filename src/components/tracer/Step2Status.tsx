import React, { useState } from 'react';
import { useTracerStore } from '@/store/tracerStore';
import { StatusKegiatan, MasaTunggu } from '@/types/tracer';
import {
  STATUS_KEGIATAN_OPTIONS,
  MASA_TUNGGU_OPTIONS,
} from '@/schemas/tracerSchema';
import { Button } from '@/components/ui/Button';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { ConfirmModal } from '@/components/ui/ConfirmModal';

interface Step2Props {
  onNext: () => void;
  onPrev: () => void;
}

export const Step2Status: React.FC<Step2Props> = ({ onNext, onPrev }) => {
  const { status_kegiatan, masa_tunggu, updateStatusKegiatan } = useTracerStore();
  const [showWarningModal, setShowWarningModal] = useState(false);

  const handleSelectStatus = (status: StatusKegiatan) => {
    updateStatusKegiatan(status, masa_tunggu);
  };

  const handleMasaTungguChange = (val: string) => {
    updateStatusKegiatan(
      (status_kegiatan as StatusKegiatan) || 'KERJA',
      val as MasaTunggu
    );
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!status_kegiatan) {
      setShowWarningModal(true);
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleContinue} className="space-y-6">
      <div className="pb-3 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">
          Langkah 2: Status Utama Kegiatan Alumni
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Pilih kategori yang paling menggambarkan aktivitas utama Anda saat ini
        </p>
      </div>

      {/* Grid Status Cards Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {STATUS_KEGIATAN_OPTIONS.map((item) => {
          const isSelected = status_kegiatan === item.value;
          return (
            <div
              key={item.value}
              onClick={() => handleSelectStatus(item.value as StatusKegiatan)}
              className={`relative rounded-xl p-4 sm:p-5 border-2 transition-all cursor-pointer flex items-start justify-between gap-3 ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-600/10'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex-1">
                <h3
                  className={`text-sm font-bold ${
                    isSelected ? 'text-blue-900' : 'text-slate-900'
                  }`}
                >
                  {item.label.split('(')[0].trim()}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {item.label.includes('(')
                    ? item.label.substring(item.label.indexOf('('))
                    : 'Status aktivitas alumni saat ini'}
                </p>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-slate-300'
                }`}
              >
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Masa Tunggu Pertanyaan Tambahan */}
      {(status_kegiatan === 'KERJA' ||
        status_kegiatan === 'KERJA_KULIAH' ||
        status_kegiatan === 'WIRAUSAHA' ||
        status_kegiatan === 'WIRAUSAHA_KULIAH') && (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <CustomSelect
            label="Masa Tunggu Memperoleh Pekerjaan / Usaha Pertama"
            helperText="Berapa lama waktu yang dibutuhkan sejak dinyatakan lulus hingga mulai bekerja / berwirausaha?"
            value={masa_tunggu || '1 - 3 bulan'}
            onChange={handleMasaTungguChange}
            options={MASA_TUNGGU_OPTIONS.map((mt) => ({
              value: mt,
              label: mt,
            }))}
          />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
        <Button
          type="button"
          onClick={onPrev}
          variant="outline"
          size="md"
        >
          Kembali
        </Button>

        <Button type="submit" variant="primary" size="md" className="bg-blue-600 hover:bg-blue-700">
          Lanjut ke Detail Spesifik
        </Button>
      </div>

      {/* Warning Modal */}
      <ConfirmModal
        isOpen={showWarningModal}
        onClose={() => setShowWarningModal(false)}
        title="Pilih Status Kegiatan"
        message="Silakan pilih salah satu status kegiatan utama Anda saat ini (Bekerja, Kuliah, Wirausaha, dsb) sebelum melanjutkan."
        confirmText="Mengerti"
        type="warning"
      />
    </form>
  );
};
