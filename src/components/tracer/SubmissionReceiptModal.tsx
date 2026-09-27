import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useTracerStore } from '@/store/tracerStore';
import { CheckCircle2, Printer, Download, ArrowRight, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
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
        {/* Success Icon Badge */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

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
                src="/logo-smk.png"
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
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">
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
              <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">
                {status_kegiatan}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Waktu Pengiriman</span>
              <span className="text-slate-700 text-[11px]">
                {lastSubmittedAt ? new Date(lastSubmittedAt).toLocaleString('id-ID') : new Date().toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* QR Verification Box */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white border border-slate-300 rounded p-1 flex items-center justify-center">
                <QrCode className="w-8 h-8 text-slate-800" />
              </div>
              <span className="text-[10px] leading-tight">
                Scan QR ini di loket Tata Usaha / BKK untuk verifikasi pengambilan Ijazah & Sertifikat BNSP.
              </span>
            </div>
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
            onClick={handlePrint}
            variant="outline"
            size="md"
            className="w-full sm:w-auto"
          >
            <Printer className="w-4 h-4 mr-2" />
            <span>Cetak Bukti (Print / PDF)</span>
          </Button>

          <Button
            type="button"
            onClick={handleGoDashboard}
            variant="primary"
            size="md"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
          >
            <span>Buka Dashboard Alumni</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};
