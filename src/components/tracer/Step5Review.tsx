import React, { useState } from 'react';
import { useTracerStore } from '@/store/tracerStore';
import { useAuthStore } from '@/store/authStore';
import { TracerSubmissionPayload } from '@/types/tracer';
import { submitTracerStudy } from '@/services/tracerService';
import { Button } from '@/components/ui/Button';
import confetti from 'canvas-confetti';

interface Step5Props {
  onPrev: () => void;
  onSuccess: (submissionId: string) => void;
}

const getScoreLabel = (score?: number) => {
  switch (score) {
    case 5: return 'Sangat Relevan';
    case 4: return 'Relevan';
    case 3: return 'Cukup Relevan';
    case 2: return 'Kurang Relevan';
    case 1: return 'Tidak Relevan';
    default: return 'Sangat Relevan';
  }
};

export const Step5Review: React.FC<Step5Props> = ({ onPrev, onSuccess }) => {
  const {
    identitas,
    status_kegiatan,
    masa_tunggu,
    detail_kerja,
    detail_kuliah,
    detail_usaha,
    evaluasi,
    agreement,
    setAgreement,
    submitTracer,
  } = useTracerStore();

  const { updateUserTracerStatus } = useAuthStore();
  const [showJsonTab, setShowJsonTab] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Construct official payload according to PRD section 5.1
  const payload: TracerSubmissionPayload = {
    identitas: {
      nik: identitas.nik || '',
      nisn: identitas.nisn || '',
      nama_lengkap: identitas.nama_lengkap || '',
      tahun_masuk: identitas.tahun_masuk || 2021,
      tahun_lulus: identitas.tahun_lulus || 2024,
      jurusan: (identitas.jurusan || 'Teknik Komputer dan Jaringan') as any,
      no_whatsapp: identitas.no_whatsapp || '',
      email: identitas.email || '',
    },
    status_kegiatan: (status_kegiatan || 'KERJA') as any,
    masa_tunggu: masa_tunggu,
    detail_kerja:
      status_kegiatan === 'KERJA' || status_kegiatan === 'KERJA_KULIAH'
        ? (detail_kerja as any)
        : null,
    detail_kuliah:
      status_kegiatan === 'KULIAH' ||
      status_kegiatan === 'KERJA_KULIAH' ||
      status_kegiatan === 'WIRAUSAHA_KULIAH'
        ? (detail_kuliah as any)
        : null,
    detail_usaha:
      status_kegiatan === 'WIRAUSAHA' || status_kegiatan === 'WIRAUSAHA_KULIAH'
        ? (detail_usaha as any)
        : null,
    evaluasi: {
      skor_relevansi: evaluasi.skor_relevansi || 5,
      kompetensi_bermanfaat: evaluasi.kompetensi_bermanfaat || [],
      saran_bkk: evaluasi.saran_bkk || '',
      kesediaan_dihubungi: evaluasi.kesediaan_dihubungi ?? true,
    },
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!agreement) {
      setSubmitError('Anda harus menyetujui pernyataan kebenaran data sebelum mengirim kuesioner.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitTracerStudy({ ...payload, agreement: true });

      if (response.success && response.data) {
        // Update local store
        await submitTracer(payload);
        updateUserTracerStatus('SUDAH', response.data.submission_id);

        // Fire celebration confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        onSuccess(response.data.submission_id);
      } else {
        setSubmitError(
          response.message || 'Terjadi kesalahan saat memproses data. Silakan periksa formulir Anda.'
        );
      }
    } catch (err: any) {
      setSubmitError('Gagal mengirim data. Silakan periksa koneksi internet Anda.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFinalSubmit} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Langkah 5: Tinjauan Akhir & Pengiriman
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Periksa ringkasan isian Anda sebelum mengirimkan payload data ke sistem
          </p>
        </div>

        {/* Payload JSON Inspector Toggle Button */}
        <button
          type="button"
          onClick={() => setShowJsonTab(!showJsonTab)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer"
        >
          {showJsonTab ? 'Tutup JSON Payload' : 'Lihat Raw JSON (API Contract)'}
        </button>
      </div>

      {submitError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
          {submitError}
        </div>
      )}

      {/* Optional Raw JSON Inspector conforming to PRD 5.1 */}
      {showJsonTab && (
        <div className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto shadow-inner border border-slate-800">
          <div className="flex justify-between items-center text-slate-400 pb-2 mb-2 border-b border-slate-800">
            <span>POST /api/v1/tracer-study</span>
            <span className="text-emerald-400">Content-Type: application/json</span>
          </div>
          <pre>{JSON.stringify(payload, null, 2)}</pre>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        
        {/* Identitas Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="font-bold text-slate-900 border-b border-slate-200 pb-2">
            1. Identitas Alumni
          </div>
          <div className="space-y-1 text-slate-600">
            <p><strong className="text-slate-800">Nama:</strong> {identitas.nama_lengkap || '-'}</p>
            <p><strong className="text-slate-800">NIK:</strong> {identitas.nik || '-'}</p>
            <p><strong className="text-slate-800">NISN:</strong> {identitas.nisn || '-'}</p>
            <p><strong className="text-slate-800">Jurusan:</strong> {identitas.jurusan || '-'}</p>
            <p><strong className="text-slate-800">Angkatan:</strong> {identitas.tahun_masuk} - {identitas.tahun_lulus}</p>
            <p><strong className="text-slate-800">WhatsApp / Email:</strong> {identitas.no_whatsapp} | {identitas.email}</p>
          </div>
        </div>

        {/* Status Kegiatan Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="font-bold text-slate-900 border-b border-slate-200 pb-2">
            2. Status Kegiatan Utama
          </div>
          <div className="space-y-1 text-slate-600">
            <p className="font-bold text-blue-700 text-sm">{status_kegiatan}</p>
            {masa_tunggu && (
              <p><strong className="text-slate-800">Masa Tunggu Kerja:</strong> {masa_tunggu}</p>
            )}
          </div>
        </div>

        {/* Detail Kerja (if any) */}
        {detail_kerja && (
          <div className="p-4 rounded-xl bg-blue-50/40 border border-blue-200/80 space-y-2">
            <div className="font-bold text-blue-900 border-b border-blue-200 pb-2">
              Detail Pekerjaan
            </div>
            <div className="space-y-1 text-slate-700">
              <p><strong className="text-slate-900">Perusahaan:</strong> {detail_kerja.nama_perusahaan}</p>
              <p><strong className="text-slate-900">Posisi / Jabatan:</strong> {detail_kerja.jabatan}</p>
              <p><strong className="text-slate-900">Atasan:</strong> {detail_kerja.nama_atasan} ({detail_kerja.kontak_atasan})</p>
              <p><strong className="text-slate-900">Kesesuaian Jurusan:</strong> {detail_kerja.kesesuaian_jurusan}</p>
            </div>
          </div>
        )}

        {/* Detail Kuliah (if any) */}
        {detail_kuliah && (
          <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-200/80 space-y-2">
            <div className="font-bold text-purple-900 border-b border-purple-200 pb-2">
              Detail Kuliah
            </div>
            <div className="space-y-1 text-slate-700">
              <p><strong className="text-slate-900">Kampus:</strong> {detail_kuliah.nama_kampus}</p>
              <p><strong className="text-slate-900">Program Studi:</strong> {detail_kuliah.jenjang} - {detail_kuliah.program_studi}</p>
            </div>
          </div>
        )}

        {/* Detail Usaha (if any) */}
        {detail_usaha && (
          <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/80 space-y-2">
            <div className="font-bold text-amber-900 border-b border-amber-200 pb-2">
              Detail Wirausaha
            </div>
            <div className="space-y-1 text-slate-700">
              <p><strong className="text-slate-900">Nama Usaha:</strong> {detail_usaha.nama_usaha}</p>
              <p><strong className="text-slate-900">Kategori:</strong> {detail_usaha.kategori_usaha}</p>
              <p><strong className="text-slate-900">Alamat:</strong> {detail_usaha.alamat_usaha}</p>
            </div>
          </div>
        )}

        {/* Evaluasi Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="font-bold text-slate-900 border-b border-slate-200 pb-2">
            Evaluasi & Masukan
          </div>
          <div className="space-y-1 text-slate-600">
            <p><strong className="text-slate-800">Skor Relevansi:</strong> {evaluasi.skor_relevansi} / 5 ({getScoreLabel(evaluasi.skor_relevansi)})</p>
            <p><strong className="text-slate-800">Kompetensi Bermanfaat:</strong> {(evaluasi.kompetensi_bermanfaat || []).join(', ')}</p>
            {evaluasi.saran_bkk && (
              <p><strong className="text-slate-800">Saran:</strong> {evaluasi.saran_bkk}</p>
            )}
          </div>
        </div>

      </div>

      {/* Persetujuan & Legalitas */}
      <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 flex items-start gap-3">
        <input
          id="agreement"
          type="checkbox"
          checked={agreement}
          onChange={(e) => setAgreement(e.target.checked)}
          className="rounded border-blue-400 text-blue-600 focus:ring-blue-500 w-4 h-4 mt-0.5"
          required
        />
        <label htmlFor="agreement" className="text-xs text-blue-900 cursor-pointer">
          <span className="font-bold">Pernyataan Kebenaran Data:</span> Saya menyatakan dengan sebenar-benarnya bahwa seluruh informasi kuesioner Tracer Study yang saya isikan adalah benar, akurat, dan dapat dipertanggungjawabkan untuk keperluan pengembangan mutu SMK Sasmita Jaya 2 Pamulang.
        </label>
      </div>

      {/* Action Buttons */}
      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
        <Button
          type="button"
          onClick={onPrev}
          variant="outline"
          size="md"
          disabled={isSubmitting}
        >
          Kembali
        </Button>

        <Button
          type="submit"
          variant="yellow"
          size="lg"
          isLoading={isSubmitting}
          className="shadow-lg hover:shadow-xl font-bold px-8"
        >
          Kirim Data Tracer Study
        </Button>
      </div>
    </form>
  );
};
