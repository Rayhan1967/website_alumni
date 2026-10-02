import React, { useState } from 'react';
import { useAdminStore } from '@/store/adminStore';
import {
  Settings,
  Save,
  RotateCcw,
  CheckCircle2,
  Building,
  Calendar,
  UserCheck,
} from 'lucide-react';

const SolidSettingsIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-[#0d2346]" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54A.484.484 0 0 0 13.9 2h-3.8c-.24 0-.45.17-.48.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.485.485 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.8c.24 0 .45-.17.48-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

const SolidCalendarIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 text-[#0d2346]" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z" />
  </svg>
);

const SolidUserCheckIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 text-[#0d2346]" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.41-4.83L17.7 7.46l-1.41 1.41 3.12 3.12 6.07-6.07-1.41-1.41-4.66 4.66z" />
  </svg>
);

const SolidBuildingIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 text-[#0d2346]" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
  </svg>
);

export const AdminSettingsTab: React.FC = () => {
  const { settings, updateSettings, resetToDefaultData } = useAdminStore();

  const [formData, setFormData] = useState({ ...settings });
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    showToast('Pengaturan sistem dan profil pelaporan berhasil disimpan.');
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Apakah Anda yakin ingin mengembalikan seluruh data master dan kuesioner ke data awal demo?'
      )
    ) {
      resetToDefaultData();
      setFormData({ ...useAdminStore.getState().settings });
      showToast('Data berhasil dikembalikan ke kondisi awal.');
    }
  };

  return (
    <>
      <div className="space-y-6 max-w-4xl animate-in fade-in duration-200">
        {/* Header */}
        <div className="p-5">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <SolidSettingsIcon className="w-5 h-5 text-[#0d2346]" />
            <span>Pengaturan Sistem dan Profil Pelaporan</span>
          </h2>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Target Kuota & Periode */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <SolidCalendarIcon className="w-4 h-4 text-[#0d2346]" />
              <span>Target Sasaran dan Periode Pengisian</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Target Jumlah Alumni (Siswa)
                </label>
                <input
                  type="number"
                  value={formData.targetQuota}
                  onChange={(e) =>
                    setFormData({ ...formData, targetQuota: Number(e.target.value) })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0d2346] focus:border-[#0d2346] focus:outline-none"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Jumlah total alumni yang dijadikan dasar perhitungan persentase partisipasi.
                </span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Tahun Kelulusan Sasaran
                </label>
                <input
                  type="number"
                  value={formData.targetYear}
                  onChange={(e) =>
                    setFormData({ ...formData, targetYear: Number(e.target.value) })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0d2346] focus:border-[#0d2346] focus:outline-none"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Tahun kelulusan alumni yang menjadi fokus pengumpulan data saat ini.
                </span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Tanggal Mulai Pengisian
                </label>
                <input
                  type="date"
                  value={formData.periodStart}
                  onChange={(e) =>
                    setFormData({ ...formData, periodStart: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0d2346] focus:border-[#0d2346] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Tanggal Batas Pengisian
                </label>
                <input
                  type="date"
                  value={formData.periodEnd}
                  onChange={(e) =>
                    setFormData({ ...formData, periodEnd: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0d2346] focus:border-[#0d2346] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Penandatangan Laporan Resmi (Kepala Sekolah & BKK) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <SolidUserCheckIcon className="w-4 h-4 text-[#0d2346]" />
              <span>Nama Pejabat Penandatangan Laporan Resmi</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nama Kepala Sekolah
                </label>
                <input
                  type="text"
                  value={formData.kepalaSekolah}
                  onChange={(e) =>
                    setFormData({ ...formData, kepalaSekolah: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0d2346] focus:border-[#0d2346] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nomor Induk Pegawai (NIP) Kepala Sekolah
                </label>
                <input
                  type="text"
                  value={formData.nipKepalaSekolah}
                  onChange={(e) =>
                    setFormData({ ...formData, nipKepalaSekolah: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0d2346] focus:border-[#0d2346] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nama Ketua Bursa Kerja Khusus (BKK)
                </label>
                <input
                  type="text"
                  value={formData.ketuaBkk}
                  onChange={(e) =>
                    setFormData({ ...formData, ketuaBkk: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0d2346] focus:border-[#0d2346] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nomor Induk Pegawai (NIP / NUPTK) Ketua BKK
                </label>
                <input
                  type="text"
                  value={formData.nipKetuaBkk}
                  onChange={(e) =>
                    setFormData({ ...formData, nipKetuaBkk: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0d2346] focus:border-[#0d2346] focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Identitas Sekolah & Kontak Layanan */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <SolidBuildingIcon className="w-4 h-4 text-[#0d2346]" />
              <span>Identitas Sekolah dan Kontak Layanan</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nama Sekolah
                </label>
                <input
                  type="text"
                  value={formData.namaSekolah}
                  onChange={(e) =>
                    setFormData({ ...formData, namaSekolah: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0d2346] focus:border-[#0d2346] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nomor Pokok Sekolah Nasional (NPSN)
                </label>
                <input
                  type="text"
                  value={formData.npsn}
                  onChange={(e) =>
                    setFormData({ ...formData, npsn: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0d2346] focus:border-[#0d2346] focus:outline-none font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">
                  Alamat Lengkap Sekolah (Untuk Kop Surat Resmi)
                </label>
                <input
                  type="text"
                  value={formData.alamatSekolah}
                  onChange={(e) =>
                    setFormData({ ...formData, alamatSekolah: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0d2346] focus:border-[#0d2346] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nomor Kontak WhatsApp Layanan Alumni
                </label>
                <input
                  type="text"
                  value={formData.kontakBkk}
                  onChange={(e) =>
                    setFormData({ ...formData, kontakBkk: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0d2346] focus:border-[#0d2346] focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 text-xs font-semibold transition flex items-center gap-2 cursor-pointer border border-slate-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Kembalikan ke Data Awal Demo</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0d2346] hover:bg-[#163868] text-white text-xs sm:text-sm font-semibold shadow-xs transition active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4 text-slate-300" />
              <span>Simpan Pengaturan</span>
            </button>
          </div>
        </form>
      </div>

      {/* Toast Alert (Outside space-y container to eliminate any layout shifting) */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 pointer-events-none animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
};
