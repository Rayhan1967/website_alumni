import React from "react";
import { useAuthStore } from "@/store/authStore";
import { useTracerStore } from "@/store/tracerStore";
import { MOCK_JOBS } from "@/lib/mockData";
import { DashboardTab } from "./DashboardSidebar";
import {
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Building,
  ArrowRight,
  MapPin,
  Calendar,
  Sparkles,
  FileCheck2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface OverviewTabProps {
  onNavigateTab: (tab: DashboardTab) => void;
  onOpenReceipt: () => void;
  onSelectJob: (job: (typeof MOCK_JOBS)[0]) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  onNavigateTab,
  onOpenReceipt,
  onSelectJob,
}) => {
  const { user } = useAuthStore();
  const { isSubmitted, lastSubmissionId } = useTracerStore();

  const isTracerDone = isSubmitted || user?.tracerStatus === "SUDAH";
  const recentJobs = MOCK_JOBS.slice(0, 3);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Banner Tracer Study matching Wireframe */}
      <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-[#102a4e] via-[#1a3d6d] to-[#254f8a] text-white p-4 sm:p-6 md:p-8 shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2 max-w-xl">
            <h2 className="text-base sm:text-xl md:text-2xl font-bold tracking-tight">
              {isTracerDone
                ? "Data Tracer Study Anda Sudah Tersimpan"
                : "Kuesioner Tracer Study 2026 Tersedia"}
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {isTracerDone
                ? `Terima kasih telah mengisi Tracer Study. Nomor registrasi Anda: ${lastSubmissionId || "TRC-2026-0001"}. Gunakan bukti ini untuk pengambilan ijazah asli.`
                : "Mohon luangkan waktu 3-5 menit untuk memperbarui data karir, studi, atau wirausaha Anda guna membantu pengembangan kurikulum sekolah."}
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            {isTracerDone ? (
              <>
                <Button
                  onClick={onOpenReceipt}
                  variant="yellow"
                  size="md"
                  className="font-bold text-slate-950 w-full sm:w-auto"
                >
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  <span>Lihat Bukti Pengisian</span>
                </Button>
                <Button
                  onClick={() => onNavigateTab("tracer_study")}
                  variant="outline"
                  size="md"
                  className="bg-white/10 text-white hover:bg-white/20 border-white/30 w-full sm:w-auto"
                >
                  <span>Update Data</span>
                </Button>
              </>
            ) : (
              <Button
                onClick={() => onNavigateTab("tracer_study")}
                variant="yellow"
                size="lg"
                className="font-bold text-slate-950 shadow-lg w-full sm:w-auto"
              >
                <span>Isi Kuesioner Sekarang</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Ambient decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-full bg-blue-400/10 blur-3xl pointer-events-none" />
      </div>

      {/* 2. Bagian Statistik matching Wireframe (3 Cards in a row) */}
      <div>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600">
            Statistik & Status Akun
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
          {/* Stat Card 1: Status Tracer Study */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-xs font-semibold text-slate-500">
                Status Tracer Study
              </span>
              <div
                className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl ${isTracerDone ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}
              >
                {isTracerDone ? (
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </div>
            </div>
            <div>
              <div className="text-base sm:text-xl font-bold text-slate-900">
                {isTracerDone ? "Sudah Diisi (Lengkap)" : "Belum Terisi"}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {isTracerDone
                  ? "Tervalidasi di sistem BKK"
                  : "Wajib diisi sebelum ambil ijazah"}
              </p>
            </div>
            <div className="mt-3.5 sm:mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => onNavigateTab("tracer_study")}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>
                  {isTracerDone ? "Buka Form Tracer" : "Lengkapi Sekarang"}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Stat Card 2: Status Ijazah */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-xs font-semibold text-slate-500">
                Status Fisik Ijazah
              </span>
              <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-blue-100 text-blue-600">
                <FileCheck2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div>
              <div className="text-base sm:text-xl font-bold text-slate-900">
                Siap Diambil di TU
              </div>
              <p className="text-xs text-slate-500 mt-1">
                No. Ijazah: M-SMK/24/0048291
              </p>
            </div>
            <div className="mt-3.5 sm:mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => onNavigateTab("cek_ijazah")}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Cek Alur Pengambilan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Stat Card 3: Info Loker Terbuka */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-xs font-semibold text-slate-500">
                Lowongan BKK Aktif
              </span>
              <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-purple-100 text-purple-600">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div>
              <div className="text-base sm:text-xl font-bold text-slate-900">
                28 Lowongan Baru
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Kemitraan DUDI Tangerang Selatan & Jabodetabek
              </p>
            </div>
            <div className="mt-3.5 sm:mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => onNavigateTab("loker")}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Eksplor Lowongan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bagian Info Loker matching Wireframe (3 Cards + 'Lihat semua' button) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Info Loker & Magang Rekomendasi
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab("loker")}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat semua</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recentJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => onSelectJob(job)}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-[11px] font-bold">
                    {job.type}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Batas: {job.deadline}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition leading-snug">
                    {job.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 font-medium flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.company}</span>
                  </p>
                </div>

                <div className="space-y-1 text-xs text-slate-500 pt-1">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </p>
                  <p className="font-semibold text-emerald-600">{job.salary}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">
                  Target: {job.targetMajors[0]}
                </span>
                <span className="text-xs font-bold text-blue-600 group-hover:underline">
                  Detail & Lamar ➜
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
