import React, { useState } from "react";
import {
  useAdminStore,
  RespondentRecord,
  VerificationStatus,
} from "@/store/adminStore";
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Phone,
  Star,
  Send,
} from "lucide-react";

const SolidFileCheckIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4 text-[#0d2346]",
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-3.3 14.7-3.4-3.4 1.4-1.4 2 2 4.6-4.6 1.4 1.4-6 6zM13 9V3.5L18.5 9H13z" />
  </svg>
);

const SolidUserIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4 text-[#0d2346]",
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const SolidBuildingIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4 text-[#0d2346]",
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
  </svg>
);

const SolidGraduationCapIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4 text-[#0d2346]",
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
  </svg>
);

const SolidStoreIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4 text-[#0d2346]",
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" />
  </svg>
);

const SolidMessageSquareIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4 text-[#0d2346]",
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
  </svg>
);

interface AdminRespondentDetailDrawerProps {
  respondent: RespondentRecord | null;
  onClose: () => void;
}

export const AdminRespondentDetailDrawer: React.FC<
  AdminRespondentDetailDrawerProps
> = ({ respondent, onClose }) => {
  const { updateVerificationStatus } = useAdminStore();
  const [selectedStatus, setSelectedStatus] = useState<VerificationStatus>(
    respondent?.verificationStatus || "PENDING",
  );
  const [revisionNote, setRevisionNote] = useState<string>(
    respondent?.verificationNote || "",
  );
  const [isSaved, setIsSaved] = useState(false);

  // Sync state when respondent changes
  React.useEffect(() => {
    if (respondent) {
      setSelectedStatus(respondent.verificationStatus);
      setRevisionNote(respondent.verificationNote || "");
      setIsSaved(false);
    }
  }, [respondent]);

  if (!respondent) return null;

  const handleSaveVerification = () => {
    updateVerificationStatus(
      respondent.submissionId,
      selectedStatus,
      selectedStatus === "REVISI" ? revisionNote : undefined,
    );
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 400);
  };

  const payload = respondent.fullPayload;
  const identitas = payload.identitas;
  const kerja = payload.detail_kerja;
  const kuliah = payload.detail_kuliah;
  const usaha = payload.detail_usaha;
  const evaluasi = payload.evaluasi;

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case "VALID":
        return (
          <span className="px-1 py-1 font-medium text-slate-300">
            Disetujui
          </span>
        );
      case "REVISI":
        return (
          <span className="px-1 py-1 font-medium text-rose-300 ">
            Perlu Perbaikan
          </span>
        );
      default:
        return (
          <span className="px-1 py-1font-medium text-slate-300">
            Menunggu Tinjauan
          </span>
        );
    }
  };

  const getAktivitasLabel = (status: string) => {
    switch (status) {
      case "KERJA":
        return "Bekerja di Instansi / Perusahaan";
      case "KULIAH":
        return "Melanjutkan Kuliah";
      case "WIRAUSAHA":
        return "Wirausaha Mandiri";
      case "KERJA_KULIAH":
        return "Bekerja Sambil Kuliah";
      default:
        return "Sedang Mencari Kerja";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden touch-none select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sliding Sheet / Drawer Panel from Right */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-100 bg-[#0d2346] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-white truncate">
                    {respondent.nama}
                  </h2>
                  {getStatusBadge(respondent.verificationStatus)}
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Nomor Berkas:{" "}
                  <span className="font-mono text-white">
                    {respondent.submissionId}
                  </span>{" "}
                  | Angkatan {respondent.tahunLulus}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
            {/* Section 1: Identitas Alumni */}
            <div className="p-4 sm:p-5 space-y-3">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                <SolidUserIcon className="w-4 h-4 text-[#0d2346]" />
                <span>Identitas dan Kontak Alumni</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">
                    NISN / NIK:
                  </span>
                  <span className="font-mono font-semibold text-slate-800">
                    {identitas.nisn}{" "}
                    {identitas.nik ? ` / ${identitas.nik}` : ""}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">
                    Jurusan / Program Keahlian:
                  </span>
                  <span className="font-semibold text-slate-800">
                    {identitas.jurusan}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">
                    Nomor WhatsApp:
                  </span>
                  <a
                    href={`https://wa.me/${identitas.no_whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono font-semibold text-[#0d2346] hover:underline inline-flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-[#0d2346]" />
                    <span>{identitas.no_whatsapp}</span>
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">
                    Alamat Email:
                  </span>
                  <span className="font-semibold text-slate-800">
                    {identitas.email || "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Section 2: Aktivitas Pasca Kelulusan */}
            <div className="p-4 sm:p-5space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                  <SolidBuildingIcon className="w-4 h-4 text-[#0d2346]" />
                  <span>
                    Aktivitas Setelah Kelulusan (
                    {getAktivitasLabel(respondent.statusKegiatan)})
                  </span>
                </h3>
                {payload.masa_tunggu && (
                  <span className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-800 rounded-full text-[8px] font-small">
                    Waktu Tunggu: {payload.masa_tunggu}
                  </span>
                )}
              </div>

              {/* Kerja Detail */}
              {kerja && (
                <div className="pt-2 border-t border-slate-200 space-y-2 text-xs">
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <span>Rincian Pekerjaan dan Perusahaan:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-3">
                    <div>
                      <span className="text-slate-400 block text-[11px]">
                        Nama Perusahaan / Tempat Kerja:
                      </span>
                      <span className="font-semibold text-slate-800">
                        {kerja.nama_perusahaan}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">
                        Posisi / Jabatan:
                      </span>
                      <span className="font-semibold text-slate-800">
                        {kerja.jabatan}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">
                        Kesesuaian dengan Jurusan SMK:
                      </span>
                      <span className="font-semibold text-slate-700">
                        {kerja.kesesuaian_jurusan}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">
                        Perkiraan Penghasilan Per Bulan:
                      </span>
                      <span className="font-semibold text-slate-800">
                        {kerja.kisaran_penghasilan || "-"}
                      </span>
                    </div>
                    {kerja.nama_atasan && (
                      <div className="sm:col-span-2 bg-slate-100/70 border border-slate-200 p-2.5 rounded-lg">
                        <span className="text-slate-900 block font-semibold text-[11px]">
                          Kontak Atasan / HRD (Untuk Survei Kepuasan Pengguna
                          Lulusan):
                        </span>
                        <p className="text-slate-800 mt-0.5 font-medium">
                          {kerja.nama_atasan} (
                          {kerja.kontak_atasan || "Nomor kontak belum diisi"})
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Kuliah Detail */}
              {kuliah && (
                <div className="pt-2 border-t border-slate-200 space-y-2 text-xs">
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <SolidGraduationCapIcon className="w-4 h-4 text-[#0d2346]" />
                    <span>Rincian Perguruan Tinggi:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-3">
                    <div>
                      <span className="text-slate-400 block text-[11px]">
                        Nama Kampus:
                      </span>
                      <span className="font-semibold text-slate-800">
                        {kuliah.nama_kampus}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">
                        Program Studi:
                      </span>
                      <span className="font-semibold text-slate-800">
                        {kuliah.program_studi} ({kuliah.jenjang})
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Usaha Detail */}
              {usaha && (
                <div className="pt-2 border-t border-slate-200 space-y-2 text-xs">
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <SolidStoreIcon className="w-4 h-4 text-[#0d2346]" />
                    <span>Rincian Usaha Mandiri:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-3">
                    <div>
                      <span className="text-slate-400 block text-[11px]">
                        Nama Usaha:
                      </span>
                      <span className="font-semibold text-slate-800">
                        {usaha.nama_usaha}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">
                        Bidang Usaha:
                      </span>
                      <span className="font-semibold text-slate-800">
                        {usaha.bidang_usaha || usaha.kategori_usaha}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Evaluasi Pembelajaran & Masukan */}
            {evaluasi && (
              <div className="p-4 sm:p-5 space-y-3">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                  <SolidMessageSquareIcon className="w-4 h-4 text-[#0d2346]" />
                  <span>Evaluasi Pembelajaran dan Masukan Sekolah</span>
                </h3>
                <div className="space-y-2.5 text-xs">
                  {evaluasi.saran_pembelajaran && (
                    <div>
                      <span className="text-slate-400 block text-[11px]">
                        Saran Pembelajaran:
                      </span>
                      <p className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-800 italic">
                        "{evaluasi.saran_pembelajaran}"
                      </p>
                    </div>
                  )}
                  {evaluasi.saran_bkk && (
                    <div>
                      <span className="text-slate-400 block text-[11px]">
                        Saran Layanan Bursa Kerja Khusus:
                      </span>
                      <p className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-800 italic">
                        "{evaluasi.saran_bkk}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Section 4: Form Tindakan Verifikasi Admin */}
            <div className="p-4 sm:p-5 space-y-4">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                <SolidFileCheckIcon className="w-4 h-4 text-[#0d2346]" />
                <span>Pembaruan Status Verifikasi</span>
              </h3>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedStatus("VALID")}
                  className={`px-3.5 py-2 rounded-md text-xs font-medium transition flex items-center gap-1.5 cursor-pointer ${
                    selectedStatus === "VALID"
                      ? "bg-[#0d2346] text-white shadow-xs"
                      : "bg-white text-slate-800 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Disetujui</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStatus("REVISI")}
                  className={`px-3.5 py-2 rounded-md text-xs font-medium transition flex items-center gap-1.5 cursor-pointer ${
                    selectedStatus === "REVISI"
                      ? "bg-rose-700 text-white shadow-xs"
                      : "bg-white text-rose-800 border border-rose-200 hover:bg-rose-50"
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Perlu Perbaikan</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStatus("PENDING")}
                  className={`px-3.5 py-2 rounded-md text-xs font-medium transition flex items-center gap-1.5 cursor-pointer ${
                    selectedStatus === "PENDING"
                      ? "bg-slate-700 text-white shadow-xs"
                      : "bg-white text-slate-800 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Menunggu Tinjauan</span>
                </button>
              </div>

              {selectedStatus === "REVISI" && (
                <div className="space-y-1.5 animate-in fade-in duration-200">
                  <label className="text-[11px] font-medium text-slate-700 block">
                    Catatan Perbaikan untuk Alumni:
                  </label>
                  <textarea
                    rows={2}
                    value={revisionNote}
                    onChange={(e) => setRevisionNote(e.target.value)}
                    placeholder="Contoh: Mohon lengkapi nama atasan atau konfirmasi kembali nama instansi tempat bekerja..."
                    className="w-full p-2.5 text-xs rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0d2346] focus:border-[#0d2346] bg-white"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-medium border border-slate-200 transition cursor-pointer"
            >
              Tutup
            </button>
            <button
              onClick={handleSaveVerification}
              className="px-5 py-2.5 rounded-md bg-[#0d2346] hover:bg-[#163868] text-white text-xs sm:text-sm font-semibold shadow-xs transition active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-slate-300" />
              <span>{isSaved ? "Tersimpan" : "Simpan Status Verifikasi"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
