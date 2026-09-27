import React from 'react';
import { useTracerStore } from '@/store/tracerStore';
import { KOMPETENSI_OPTIONS } from '@/schemas/tracerSchema';
import { Button } from '@/components/ui/Button';
import { Star, CheckSquare, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';

interface Step4Props {
  onNext: () => void;
  onPrev: () => void;
}

export const Step4Evaluation: React.FC<Step4Props> = ({ onNext, onPrev }) => {
  const { evaluasi, updateEvaluasi } = useTracerStore();

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
      alert('Silakan berikan skor penilaian relevansi kurikulum (1 - 5 bintang).');
      return;
    }
    if (
      !evaluasi.kompetensi_bermanfaat ||
      evaluasi.kompetensi_bermanfaat.length === 0
    ) {
      alert('Pilih minimal 1 kompetensi yang paling bermanfaat bagi Anda.');
      return;
    }
    onNext();
  };

  const currentScore = evaluasi.skor_relevansi || 5;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="pb-3 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          <span>Langkah 4: Evaluasi Pembelajaran & Umpan Balik</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Masukan Anda menjadi dasar penyusunan program BKK dan kurikulum SMK di masa mendatang
        </p>
      </div>

      {/* 1. Star Rating: Skor Relevansi */}
      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Tingkat Relevansi Pembelajaran SMK dengan Aktivitas Saat Ini (1 - 5) <span className="text-rose-500">*</span>
        </label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRating(star)}
              className="p-1.5 focus:outline-none transition-transform hover:scale-125"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= currentScore
                    ? 'text-amber-400 fill-amber-400 drop-shadow-sm'
                    : 'text-slate-300 hover:text-amber-200'
                }`}
              />
            </button>
          ))}
          <span className="ml-3 text-sm font-bold text-slate-700">
            {currentScore === 5
              ? '⭐⭐⭐⭐⭐ Sangat Relevan (5/5)'
              : currentScore === 4
              ? '⭐⭐⭐⭐ Relevan (4/5)'
              : currentScore === 3
              ? '⭐⭐⭐ Cukup Relevan (3/5)'
              : currentScore === 2
              ? '⭐⭐ Kurang Relevan (2/5)'
              : '⭐ Tidak Relevan (1/5)'}
          </span>
        </div>
      </div>

      {/* 2. Multi-Select Kompetensi Paling Bermanfaat */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
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
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
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
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Kembali</span>
        </Button>

        <Button type="submit" variant="primary" size="md" className="bg-blue-600 hover:bg-blue-700">
          <span>Lanjut ke Tinjauan & Submit</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </form>
  );
};
