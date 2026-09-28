import React, { useState } from 'react';
import { useTracerStore } from '@/store/tracerStore';
import { StatusKegiatan, MasaTunggu } from '@/types/tracer';
import {
  STATUS_KEGIATAN_OPTIONS,
  MASA_TUNGGU_OPTIONS,
} from '@/schemas/tracerSchema';
import { Button } from '@/components/ui/Button';
import { ConfirmModal } from '@/components/ui/ConfirmModal';

interface Step2Props {
  onNext: () => void;
  onPrev: () => void;
}

export const Step2Status: React.FC<Step2Props> = ({ onNext, onPrev }) => {
  const { status_kegiatan, masa_tunggu, updateStatusKegiatan } = useTracerStore();
  const [showWarningModal, setShowWarningModal] = useState<string | null>(null);

  const handleSelectStatus = (status: StatusKegiatan) => {
    updateStatusKegiatan(status, masa_tunggu || '< 3 bulan');
  };

  const handleSelectMasaTunggu = (val: string) => {
    updateStatusKegiatan(
      (status_kegiatan as StatusKegiatan) || 'KERJA',
      val as MasaTunggu
    );
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!status_kegiatan) {
      setShowWarningModal('Silakan pilih salah satu opsi status/kegiatan utama Anda saat ini.');
      return;
    }
    if (!masa_tunggu) {
      setShowWarningModal('Silakan pilih salah satu opsi waktu tunggu.');
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleContinue} className="space-y-5">
      {/* Blue Section Header Bar matching Dapodik screenshot */}
      <div className="bg-[#1d4ed8] text-white px-4 py-2 font-bold text-xs uppercase tracking-wider rounded-t-sm">
        Aktifitas Lulusan
      </div>

      {/* Status / Kegiatan Utama Saat Ini */}
      <div className="space-y-3 px-1">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Status/kegiatan utama saat ini: <span className="text-rose-500">*</span>
        </label>

        <div className="space-y-2.5 pt-1 pl-1">
          {STATUS_KEGIATAN_OPTIONS.map((item) => {
            const isSelected = status_kegiatan === item.value;
            return (
              <label
                key={item.value}
                className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-slate-800 hover:text-blue-600"
              >
                <input
                  type="radio"
                  name="status_kegiatan"
                  value={item.value}
                  checked={isSelected}
                  onChange={() => handleSelectStatus(item.value as StatusKegiatan)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                />
                <span>{item.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-200" />

      {/* Masa Tunggu */}
      <div className="space-y-3 px-1">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Berapa lama setelah lulus sampai mendapatkan kegiatan/pekerjaan pertama? <span className="text-rose-500">*</span>
        </label>

        <div className="space-y-2.5 pt-1 pl-1">
          {MASA_TUNGGU_OPTIONS.map((mt) => {
            const isSelected = masa_tunggu === mt;
            return (
              <label
                key={mt}
                className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-slate-800 hover:text-blue-600"
              >
                <input
                  type="radio"
                  name="masa_tunggu"
                  value={mt}
                  checked={isSelected}
                  onChange={() => handleSelectMasaTunggu(mt)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                />
                <span>{mt}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Bottom Bar with 'Simpan dan lanjut' matching screenshot */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
        <Button
          type="button"
          onClick={onPrev}
          variant="outline"
          size="md"
          className="text-xs sm:text-sm"
        >
          Kembali
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="bg-blue-600 hover:bg-blue-700 font-medium text-xs sm:text-sm px-6 py-2 rounded shadow-none"
        >
          Simpan dan lanjut
        </Button>
      </div>

      {/* Warning Modal */}
      <ConfirmModal
        isOpen={!!showWarningModal}
        onClose={() => setShowWarningModal(null)}
        title="Lengkapi Pertanyaan"
        message={showWarningModal || ''}
        confirmText="Mengerti"
        type="warning"
      />
    </form>
  );
};
