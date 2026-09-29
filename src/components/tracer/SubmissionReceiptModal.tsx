import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useTracerStore } from '@/store/tracerStore';
import { useNavigate } from 'react-router-dom';
import { generateTracerReceiptPdf } from '@/lib/pdfGenerator';

interface SubmissionReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissionId: string;
}

export const SubmissionReceiptModal: React.FC<SubmissionReceiptModalProps> = ({
  isOpen,
  onClose,
  submissionId,
}) => {
  const { identitas, status_kegiatan, lastSubmittedAt } = useTracerStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();

  const handleDownloadPdf = () => {
    try {
      setIsDownloading(true);
      generateTracerReceiptPdf({
        submissionId: submissionId || 'TRC-2026-0001',
        identitas,
        statusKegiatan: status_kegiatan || 'Alumni',
        submittedAt: lastSubmittedAt || undefined,
      });
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleGoDashboard = () => {
    onClose();
    navigate('/dashboard');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="xl"
    >
      <div className="space-y-6 text-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Pengisian Tracer Study Berhasil!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Terima kasih telah berpartisipasi memajukan SMK Sasmita Jaya 2. Simpan tanda bukti di bawah ini.
          </p>
        </div>

        {/* Printable Official Receipt Card */}
        <div className="p-6 rounded-xl bg-slate-50 border-2 border-slate-200 text-left space-y-4 shadow-sm print:border-black print:bg-white">
          {/* Header of Receipt */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo sasmita.png"
                alt="Logo SMK"
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo smk sasmita.png';
                }}
              />
              <div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                  SMK Sasmita Jaya 2 Pamulang
                </h4>
                <p className="text-[10px] text-slate-500 tracking-wider">
                  Bukti Resmi Pengisian Tracer Study
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Nomor Registrasi</span>
              <span className="font-mono font-bold text-xs sm:text-sm text-blue-700">
                {submissionId}
              </span>
            </div>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">Nama Lengkap</span>
              <span className="font-bold text-slate-800">{identitas.nama_lengkap}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">NISN / NIK</span>
              <span className="font-semibold text-slate-800">{identitas.nisn} / {identitas.nik}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Kompetensi Keahlian</span>
              <span className="font-semibold text-slate-800">{identitas.jurusan}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Tahun Lulus</span>
              <span className="font-semibold text-slate-800">{identitas.tahun_lulus}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Status Terdata</span>
              <span className="inline-block px-2 py-0.5 rounded text-slate-800 font-bold text-[10px]">
                {status_kegiatan}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Waktu Pengiriman</span>
              <span className="text-slate-800 text-[11px]">
                {lastSubmittedAt ? new Date(lastSubmittedAt).toLocaleString('id-ID') : new Date().toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Verification Box */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span className="text-[10px] leading-tight">
              Tunjukkan bukti ini di loket Tata Usaha / BKK untuk verifikasi pengambilan Ijazah & Sertifikat BNSP.
            </span>
            <div className="text-right shrink-0">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                TERVALIDASI
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <Button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            isLoading={isDownloading}
            size="md"
            className="w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
              <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>
            {isDownloading ? 'Menyiapkan PDF...' : 'Download PDF'}
          </Button>

          <Button
            type="button"
            onClick={handleGoDashboard}
            variant="primary"
            size="md"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
          >
            Buka Dashboard Alumni
          </Button>
        </div>
      </div>
    </Modal>
  );
};
