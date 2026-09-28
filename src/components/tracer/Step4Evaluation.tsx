import React, { useState } from 'react';
import { useTracerStore } from '@/store/tracerStore';
import { KOMPETENSI_OPTIONS } from '@/schemas/tracerSchema';
import { Button } from '@/components/ui/Button';
import { ConfirmModal } from '@/components/ui/ConfirmModal';

interface Step4Props {
  onNext: () => void;
  onPrev: () => void;
}

const RATING_SCALE = [
  { score: 1, label: 'Tidak Relevan' },
  { score: 2, label: 'Kurang Relevan' },
  { score: 3, label: 'Cukup Relevan' },
  { score: 4, label: 'Relevan' },
  { score: 5, label: 'Sangat Relevan' },
];

export const Step4Evaluation: React.FC<Step4Props> = ({ onNext, onPrev }) => {
  const { evaluasi, updateEvaluasi } = useTracerStore();
  const [warningModal, setWarningModal] = useState<{ title: string; message: string } | null>(null);

  const handleRating = (score: number) => {
    updateEvaluasi({ skor_relevansi: score });
  };

  const handleToggleKompetensi = (item: string) => {
    const current = evaluasi.kompetensi_bermanfaat || [];
    if (current.includes(item)) {
      updateEvaluasi({
        kompetensi_bermanfaat: current.filter((k) => k !== item),
      });
    } else {
      updateEvaluasi({
        kompetensi_bermanfaat: [...current, item],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evaluasi.skor_relevansi) {
      setWarningModal({
        title: 'Penilaian Relevansi',
        message: 'Silakan pilih skor penilaian relevansi kurikulum (skala 1 - 5) sebelum melanjutkan.',
      });
      return;
    }
    if (
      !evaluasi.kompetensi_bermanfaat ||
      evaluasi.kompetensi_bermanfaat.length === 0
    ) {
      setWarningModal({
        title: 'Pilih Kompetensi Bermanfaat',
        message: 'Pilih minimal 1 kompetensi yang paling bermanfaat bagi Anda dalam dunia kerja / perkuliahan.',
      });
      return;
    }
    onNext();
  };

  const currentScore = evaluasi.skor_relevansi || 5;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="pb-3 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">
          Langkah 4: Evaluasi Pembelajaran & Umpan Balik
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Masukan Anda menjadi dasar penyusunan program BKK dan kurikulum SMK di masa mendatang
        </p>
      </div>

      {/* 1. Skor Relevansi: Skala 1 - 5 Sederhana */}
      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <label className="block text-xs font-bold  tracking-wider text-slate-700">
            Tingkat Relevansi Pembelajaran SMK dengan Aktivitas Saat Ini (1 - 5) <span className="text-rose-500">*</span>
          </label>
          <span className="text-xs font-semibold text-blue-700">
            {currentScore ? `${currentScore} / 5 (${RATING_SCALE.find(r => r.score === currentScore)?.label})` : 'Pilih skor'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
          {RATING_SCALE.map((item) => {
            const isSelected = currentScore === item.score;
            return (
              <button
                key={item.score}
                type="button"
                onClick={() => handleRating(item.score)}
                className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100/70'
                }`}
              >
                <span className="text-base font-bold">{item.score}</span>
                <span className={`text-[11px] leading-tight text-center ${isSelected ? 'text-blue-100 font-medium' : 'text-slate-500'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Multi-Select Kompetensi Paling Bermanfaat */}
      <div className="space-y-3">
        <label className="block text-xs font-bold  tracking-wider text-slate-700">
          Keahlian / Kompetensi yang Paling Bermanfaat di Lapangan <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {KOMPETENSI_OPTIONS.map((item) => {
            const isChecked = (evaluasi.kompetensi_bermanfaat || []).includes(item);
            return (
              <label
                key={item}
                className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  isChecked
                    ? 'border-blue-600 bg-blue-50/60 font-semibold text-blue-900 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggleKompetensi(item)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Saran & Masukan untuk BKK */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold  tracking-wider text-slate-700">
          Saran / Rekomendasi untuk Pengembangan BKK & Sekolah
        </label>
        <textarea
          rows={3}
          value={evaluasi.saran_bkk || ''}
          onChange={(e) => updateEvaluasi({ saran_bkk: e.target.value })}
          placeholder="Tuliskan saran Anda mengenai program magang, relasi industri, atau sarana laboratorium..."
          className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
        />
      </div>

      {/* 4. Kesediaan Dihubungi */}
      <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-3">
        <input
          id="kesediaan"
          type="checkbox"
          checked={evaluasi.kesediaan_dihubungi !== false}
          onChange={(e) => updateEvaluasi({ kesediaan_dihubungi: e.target.checked })}
          className="rounded border-emerald-400 text-emerald-600 focus:ring-emerald-500 w-4 h-4 mt-0.5"
        />
        <label htmlFor="kesediaan" className="text-xs text-emerald-900 cursor-pointer">
          <span className="font-bold">Bersedia dihubungi oleh tim BKK / Sekolah</span> untuk konfirmasi data atau penawaran peluang kerjasama & lowongan kerja lanjutan.
        </label>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
        <Button type="button" onClick={onPrev} variant="outline" size="md">
          Kembali
        </Button>

        <Button type="submit" variant="primary" size="md" className="bg-blue-600 hover:bg-blue-700">
          Lanjut ke Tinjauan & Submit
        </Button>
      </div>

      {/* Warning Modal */}
      <ConfirmModal
        isOpen={Boolean(warningModal)}
        onClose={() => setWarningModal(null)}
        title={warningModal?.title || 'Perhatian'}
        message={warningModal?.message || ''}
        confirmText="Mengerti"
        type="warning"
      />
    </form>
  );
};
