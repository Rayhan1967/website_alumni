import React, { useState, useEffect } from "react";
import { useContentStore } from "@/store/contentStore";
import { JobVacancy, JurusanSMK } from "@/types/tracer";
import {
  Briefcase,
  Plus,
  Search,
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  Edit3,
  Trash2,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Clock,
  ChevronDown,
} from "lucide-react";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Pagination } from "@/components/ui/Pagination";

const JURUSAN_OPTIONS: JurusanSMK[] = [
  "Teknik Komputer dan Jaringan",
  "Teknik Pemesinan",
  "Teknik Instalasi Tenaga Listrik",
  "Teknik Elektronika Industri",
  "Teknik Kendaraan Ringan Otomotif",
  "Teknik dan Bisnis Sepeda Motor",
];

const JOB_TYPES: JobVacancy["type"][] = [
  "Full-time",
  "Internship / Magang",
  "Kontrak",
  "Part-time",
];

export const AdminJobsTab: React.FC = () => {
  const { jobList, addJob, updateJob, deleteJob, fetchJobsFromBackend } = useContentStore();

  const [viewMode, setViewMode] = useState<"list" | "editor">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("Semua");
  const [selectedMajor, setSelectedMajor] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchJobsFromBackend();
  }, [fetchJobsFromBackend]);

  // Editor State
  const [editingJob, setEditingJob] = useState<JobVacancy | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState<JobVacancy["type"]>("Full-time");
  const [salary, setSalary] = useState("Rp 4.500.000 - Rp 6.500.000");
  const [targetMajors, setTargetMajors] = useState<string[]>([
    "Teknik Komputer dan Jaringan",
  ]);
  const [deadline, setDeadline] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });
  const [contactPerson, setContactPerson] = useState(
    "bkk@smksasmitajaya2.sch.id",
  );
  const [isBkkPartner, setIsBkkPartner] = useState(true);
  const [description, setDescription] = useState("");
  const [requirementsText, setRequirementsText] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleOpenEditor = (job: JobVacancy | null) => {
    const formatDateForInput = (dateStr: string): string => {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '';
      return d.toISOString().split('T')[0];
    };

    if (job) {
      setEditingJob(job);
      setTitle(job.title);
      setCompany(job.company);
      setLocation(job.location);
      setType(job.type);
      setSalary(job.salary);
      setTargetMajors(job.targetMajors);
      setDeadline(formatDateForInput(job.deadline));
      setContactPerson(job.contactPerson);
      setIsBkkPartner(job.isBkkPartner);
      setDescription(job.description);
      setRequirementsText(job.requirements.join("\n"));
    } else {
      setEditingJob(null);
      setTitle("");
      setCompany("");
      setLocation("Tangerang Selatan");
      setType("Full-time");
      setSalary("Rp 4.500.000 - Rp 6.500.000");
      setTargetMajors(["Teknik Komputer dan Jaringan"]);
      setDeadline(formatDateForInput(new Date(Date.now() + 30 * 86400000).toISOString()));
      setContactPerson("bkk@smksasmitajaya2.sch.id");
      setIsBkkPartner(true);
      setDescription("");
      setRequirementsText("");
    }
    setViewMode("editor");
  };

  const handleCancelEditor = () => {
    setViewMode("list");
  };

  const toggleMajor = (major: string) => {
    setTargetMajors((prev) =>
      prev.includes(major) ? prev.filter((m) => m !== major) : [...prev, major],
    );
  };

  const selectAllMajors = () => {
    if (targetMajors.length === JURUSAN_OPTIONS.length) {
      setTargetMajors([]);
    } else {
      setTargetMajors([...JURUSAN_OPTIONS]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !company.trim() || !description.trim()) {
      showToast(
        "Harap lengkapi judul posisi, nama perusahaan, dan deskripsi pekerjaan.",
      );
      return;
    }

    if (targetMajors.length === 0) {
      showToast("Harap pilih minimal satu jurusan target.");
      return;
    }

    const requirements = requirementsText
      .split("\n")
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const todayStr = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    if (editingJob) {
      updateJob(editingJob.id, {
        title: title.trim(),
        company: company.trim(),
        location: location.trim(),
        type,
        salary: salary.trim(),
        targetMajors,
        deadline: deadline.trim(),
        contactPerson: contactPerson.trim(),
        isBkkPartner,
        description: description.trim(),
        requirements:
          requirements.length > 0
            ? requirements
            : ["Lulusan SMK Sasmita Jaya 2"],
      });
      showToast(
        "Lowongan kerja berhasil diperbarui dan disinkronkan ke Dashboard Alumni!",
      );
    } else {
      addJob({
        title: title.trim(),
        company: company.trim(),
        location: location.trim(),
        type,
        salary: salary.trim(),
        targetMajors,
        postedAt: todayStr,
        deadline: deadline.trim(),
        contactPerson: contactPerson.trim(),
        isBkkPartner,
        description: description.trim(),
        requirements:
          requirements.length > 0
            ? requirements
            : ["Lulusan SMK Sasmita Jaya 2"],
      });
      showToast(
        "Lowongan baru berhasil ditambahkan dan langsung tampil di Dashboard Alumni!",
      );
    }

    setViewMode("list");
  };

  const handleDelete = (id: string) => {
    deleteJob(id);
    setDeleteConfirmId(null);
    showToast("Lowongan kerja berhasil dihapus dari sistem.");
  };

  // Reset pagination when search query or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType, selectedMajor]);

  // Filtered Jobs
  const filteredJobs = jobList.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = selectedType === "Semua" || job.type === selectedType;
    const matchMajor =
      selectedMajor === "Semua" ||
      job.targetMajors.some((m) =>
        m.toLowerCase().includes(selectedMajor.toLowerCase()),
      );
    return matchSearch && matchType && matchMajor;
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#0d2346] text-white rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">
            {toastMessage}
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 1: DEDICATED EDITOR PAGE (FULL FORM VIEW)                           */}
      {/* ========================================================================= */}
      {viewMode === "editor" ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Editor Header Navigation */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCancelEditor}
                className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                title="Kembali ke daftar lowongan"
              >
                <ArrowLeft className="w-4 h-4 text-slate-600" />
                <span>Kembali</span>
              </button>

              <div>
                <h1 className="text-base sm:text-lg font-bold text-[#0d2346]">
                  {editingJob
                    ? "Edit Lowongan Kerja"
                    : "Tambah Lowongan Kerja Baru"}
                </h1>
                <p className="text-xs text-slate-500">
                  Lowongan akan langsung dipublikasikan dan ditampilkan pada Tab
                  Loker portal alumni.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={handleCancelEditor}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-5 py-2 rounded-xl bg-[#0d2346] hover:bg-[#163868] text-white text-xs sm:text-sm font-bold shadow-xs transition active:scale-95 cursor-pointer"
              >
                {editingJob
                  ? "Simpan Perubahan Loker"
                  : "Publikasikan Lowongan"}
              </button>
            </div>
          </div>

          {/* Form and Live Preview 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Form Column (8 cols) */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
              {/* Field 1: Posisi & Perusahaan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-900">
                    Posisi / Judul Pekerjaan{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Junior Network Administrator"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:border-[#0d2346] focus:ring-2 focus:ring-[#0d2346]/10 focus:outline-none transition bg-slate-50/50 focus:bg-white"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-900">
                    Nama Perusahaan / Instansi{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Contoh: PT Solusi Teknologi Nusantara"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:border-[#0d2346] focus:ring-2 focus:ring-[#0d2346]/10 focus:outline-none transition bg-slate-50/50 focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Field 2: Lokasi, Tipe, Gaji */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-900">
                    Lokasi Penempatan
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Contoh: Tangerang Selatan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0d2346] focus:ring-2 focus:ring-[#0d2346]/10 focus:outline-none transition bg-slate-50/50 focus:bg-white"
                  />
                </div>

                <CustomSelect
                  label="Tipe Pekerjaan"
                  options={JOB_TYPES.map((t) => ({ value: t, label: t }))}
                  value={type}
                  onChange={(val) => setType(val as JobVacancy["type"])}
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-900">
                    Kisaran Gaji
                  </label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="Contoh: Rp 4.500.000 - Rp 6.500.000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0d2346] focus:ring-2 focus:ring-[#0d2346]/10 focus:outline-none transition bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Field 3: Deadline & Kontak */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-900">
                    Batas Akhir Pendaftaran (Deadline)
                  </label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0d2346] focus:ring-2 focus:ring-[#0d2346]/10 focus:outline-none transition bg-slate-50/50 focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-900">
                    Kontak / Email Lamaran
                  </label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Email HRD atau kontak WA BKK"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0d2346] focus:ring-2 focus:ring-[#0d2346]/10 focus:outline-none transition bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Field 4: Mitra Resmi BKK Sasmita Card */}
              <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Tandai sebagai Mitra Resmi BKK Sasmita
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Memberikan badge resmi verifikasi DUDI mitra sekolah pada
                      kartu lowongan.
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isBkkPartner}
                  onChange={(e) => setIsBkkPartner(e.target.checked)}
                  className="w-5 h-5 rounded text-[#0d2346] accent-[#0d2346] cursor-pointer"
                />
              </div>

              {/* Field 5: Sasaran Jurusan */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900">
                    Sasaran Program Keahlian / Jurusan{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={selectAllMajors}
                    className="text-[11px] font-semibold text-[#0d2346] hover:underline cursor-pointer"
                  >
                    {targetMajors.length === JURUSAN_OPTIONS.length
                      ? "Batal Pilih Semua"
                      : "Pilih Semua Jurusan"}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-4 bg-slate-50/80 rounded-xl border border-slate-200">
                  {JURUSAN_OPTIONS.map((major) => {
                    const isChecked = targetMajors.includes(major);
                    return (
                      <label
                        key={major}
                        className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition ${
                          isChecked
                            ? "bg-white border-[#0d2346] text-[#0d2346] font-semibold shadow-2xs"
                            : "bg-white/60 border-slate-200 text-slate-700 hover:bg-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleMajor(major)}
                          className="w-4 h-4 rounded text-[#0d2346] accent-[#0d2346] cursor-pointer"
                        />
                        <span className="truncate">{major}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Field 6: Deskripsi Pekerjaan */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-900">
                  Deskripsi Pekerjaan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan ruang lingkup peran utama, tanggung jawab operasional, dan gambaran tugas harian..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:border-[#0d2346] focus:ring-2 focus:ring-[#0d2346]/10 focus:outline-none transition bg-slate-50/50 focus:bg-white leading-relaxed"
                  required
                />
              </div>

              {/* Field 7: Persyaratan & Kualifikasi */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-900">
                    Persyaratan & Kualifikasi Pelamar
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Pisahkan 1 kualifikasi per baris (Enter)
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={requirementsText}
                  onChange={(e) => setRequirementsText(e.target.value)}
                  placeholder="Lulusan SMK Sasmita Jaya 2&#10;Memiliki sertifikat kompetensi BNSP&#10;Mampu bekerjasama dalam tim kerja industri&#10;Disiplin dan teliti"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:border-[#0d2346] focus:ring-2 focus:ring-[#0d2346]/10 focus:outline-none transition bg-slate-50/50 focus:bg-white leading-relaxed"
                />
              </div>
            </div>

            {/* Right Column: Live Preview (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4 sticky top-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0d2346]">
                  <span>Pratinjau Kartu Loker</span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  Live Preview
                </span>
              </div>

              {/* Card Preview */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                        {type}
                      </span>
                      {isBkkPartner && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold">
                          <ShieldCheck className="w-3 h-3" />
                          Mitra BKK
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-[#0d2346] leading-tight">
                      {title || "Judul Posisi Pekerjaan"}
                    </h4>
                    <p className="text-xs font-semibold text-slate-600 mt-0.5 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      <span>{company || "Nama Perusahaan / DUDI"}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{location || "Lokasi"}</span>
                  </div>
                  <div className="flex items-center gap-1 truncate font-semibold text-slate-800">
                    <span className="truncate">{salary || "Gaji"}</span>
                  </div>
                  <div className="flex items-center gap-1 truncate text-slate-500">
                    <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">
                      Batas: {deadline || "30 Okt 2026"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 truncate text-slate-500">
                    <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>Dibuat: Baru saja</span>
                  </div>
                </div>

                {/* Target Majors Tags */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Sasaran Jurusan ({targetMajors.length}):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {targetMajors.slice(0, 3).map((m) => (
                      <span
                        key={m}
                        className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {m}
                      </span>
                    ))}
                    {targetMajors.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-200 text-slate-700">
                        +{targetMajors.length - 3} lainnya
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {description ||
                    "Deskripsi pekerjaan akan ditampilkan di sini sebagai ringkasan informasi bagi para alumni yang ingin melamar."}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate max-w-[150px]">
                    {contactPerson || "Kontak Lamaran"}
                  </span>
                  <span className="font-bold text-[#0d2346]">
                    {
                      requirementsText
                        .split("\n")
                        .filter((r) => r.trim().length > 0).length
                    }{" "}
                    Kualifikasi
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed italic text-center">
                Perubahan pada form otomatis terupdate secara instan pada
                pratinjau kartu di atas.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* VIEW 2: LIST VIEW OF ALL JOBS                                            */
        /* ========================================================================= */
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#0d2346]" />
                <span>Kelola Lowongan Kerja & Magang</span>
              </h1>
            </div>

            <button
              type="button"
              onClick={() => handleOpenEditor(null)}
              className="px-4 py-2 rounded-xl bg-[#0d2346] hover:bg-[#163868] text-white text-xs font-semibold shadow-xs transition active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Lowongan Baru</span>
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  Lowongan Aktif
                </p>
                <p className="text-2xl font-bold text-[#0d2346] mt-1">
                  {jobList.length}
                </p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Tampil di dashboard alumni
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  Mitra Resmi BKK
                </p>
                <p className="text-2xl font-bold text-[#0d2346] mt-1">
                  {jobList.filter((j) => j.isBkkPartner).length}
                </p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Perusahaan terverifikasi
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  Perusahaan Perekrut
                </p>
                <p className="text-2xl font-bold text-[#0d2346] mt-1">
                  {new Set(jobList.map((j) => j.company)).size}
                </p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Mitra DUDI aktif
                </p>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari posisi loker, nama perusahaan, atau kota..."
                  className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#0d2346] focus:border-[#0d2346] focus:bg-white"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="w-full sm:w-48">
                  <CustomSelect
                    options={[
                      { value: "Semua", label: "Semua Tipe Pekerjaan" },
                      ...JOB_TYPES.map((t) => ({ value: t, label: t })),
                    ]}
                    value={selectedType}
                    onChange={(val) => setSelectedType(val)}
                    triggerSize="sm"
                  />
                </div>

                <div className="w-full sm:w-56">
                  <CustomSelect
                    options={[
                      { value: "Semua", label: "Semua Jurusan" },
                      ...JURUSAN_OPTIONS.map((j) => ({ value: j, label: j })),
                    ]}
                    value={selectedMajor}
                    onChange={(val) => setSelectedMajor(val)}
                    triggerSize="sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>
                Menampilkan <strong>{filteredJobs.length}</strong> dari{" "}
                {jobList.length} lowongan
              </span>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.length === 0 ? (
              <div className="col-span-full bg-white rounded-xl p-12 text-center border border-slate-200">
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-800">
                  Tidak ada lowongan ditemukan
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Coba sesuaikan kata kunci pencarian atau filter tipe
                  pekerjaan.
                </p>
              </div>
            ) : (
              paginatedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    {/* Top Badge & Company */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            {job.type}
                          </span>
                          {job.isBkkPartner && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold">
                              <ShieldCheck className="w-3 h-3" />
                              Mitra BKK
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-[#0d2346] leading-tight">
                          {job.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-600 mt-0.5 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          {job.company}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditor(job)}
                          className="p-2 rounded-lg text-slate-600 hover:text-[#0d2346] hover:bg-slate-100 transition cursor-pointer"
                          title="Edit Lowongan"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(job.id)}
                          className="p-2 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition cursor-pointer"
                          title="Hapus Lowongan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Details Meta */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 my-3 p-3 bg-slate-50/70 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate font-semibold text-slate-800">
                        <span className="truncate">{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate text-[11px] text-slate-400">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          Batas: <strong>{job.deadline}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate text-[11px] text-slate-400">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>Dibuat: {job.postedAt}</span>
                      </div>
                    </div>

                    {/* Target Majors */}
                    <div className="space-y-1 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Sasaran Jurusan:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {job.targetMajors.map((m) => (
                          <span
                            key={m}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
                    <span className="text-[11px] text-slate-400 truncate max-w-[200px]">
                      Kontak: {job.contactPerson}
                    </span>
                    <span className="text-[11px] font-bold text-[#0d2346]">
                      {job.requirements.length} Persyaratan
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredJobs.length}
            itemsPerPage={itemsPerPage}
            itemName="lowongan"
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => {
          if (deleteConfirmId) {
            handleDelete(deleteConfirmId);
          }
        }}
        title="Hapus Lowongan Kerja Ini?"
        message="Lowongan yang dihapus tidak akan lagi muncul di Tab Loker pada Dashboard Alumni."
        confirmText="Ya, Hapus"
        cancelText="Batal"
        type="danger"
      />
    </div>
  );
};
