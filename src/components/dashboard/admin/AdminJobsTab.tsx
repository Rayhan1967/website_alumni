import React, { useState } from 'react';
import { useContentStore } from '@/store/contentStore';
import { JobVacancy, JurusanSMK } from '@/types/tracer';
import {
  Briefcase,
  Plus,
  Search,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  CheckCircle2,
  Edit3,
  Trash2,
  X,
  Sparkles,
  ShieldCheck,
  Clock,
  Layers,
  GraduationCap,
} from 'lucide-react';

const JURUSAN_OPTIONS: JurusanSMK[] = [
  'Teknik Komputer dan Jaringan',
  'Teknik Pemesinan',
  'Teknik Instalasi Tenaga Listrik',
  'Teknik Elektronika Industri',
  'Teknik Kendaraan Ringan Otomotif',
  'Teknik dan Bisnis Sepeda Motor',
];

const JOB_TYPES: JobVacancy['type'][] = [
  'Full-time',
  'Internship / Magang',
  'Kontrak',
  'Part-time',
];

export const AdminJobsTab: React.FC = () => {
  const { jobList, addJob, updateJob, deleteJob } = useContentStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Semua');
  const [selectedMajor, setSelectedMajor] = useState('Semua');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobVacancy | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<JobVacancy['type']>('Full-time');
  const [salary, setSalary] = useState('Rp 4.000.000 - Rp 6.000.000');
  const [targetMajors, setTargetMajors] = useState<string[]>([
    'Teknik Komputer dan Jaringan',
  ]);
  const [deadline, setDeadline] = useState('30 Okt 2026');
  const [contactPerson, setContactPerson] = useState('bkk@smksasmitajaya2.sch.id');
  const [isBkkPartner, setIsBkkPartner] = useState(true);
  const [description, setDescription] = useState('');
  const [requirementsText, setRequirementsText] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleOpenAddModal = () => {
    setEditingJob(null);
    setTitle('');
    setCompany('');
    setLocation('Tangerang Selatan');
    setType('Full-time');
    setSalary('Rp 4.000.000 - Rp 6.000.000');
    setTargetMajors(['Teknik Komputer dan Jaringan']);
    setDeadline('30 Okt 2026');
    setContactPerson('bkk@smksasmitajaya2.sch.id');
    setIsBkkPartner(true);
    setDescription('');
    setRequirementsText('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (job: JobVacancy) => {
    setEditingJob(job);
    setTitle(job.title);
    setCompany(job.company);
    setLocation(job.location);
    setType(job.type);
    setSalary(job.salary);
    setTargetMajors(job.targetMajors);
    setDeadline(job.deadline);
    setContactPerson(job.contactPerson);
    setIsBkkPartner(job.isBkkPartner);
    setDescription(job.description);
    setRequirementsText(job.requirements.join('\n'));
    setIsModalOpen(true);
  };

  const toggleMajor = (major: string) => {
    setTargetMajors((prev) =>
      prev.includes(major)
        ? prev.filter((m) => m !== major)
        : [...prev, major]
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
      alert('Harap lengkapi judul posisi, nama perusahaan, dan deskripsi pekerjaan.');
      return;
    }

    if (targetMajors.length === 0) {
      alert('Harap pilih minimal satu jurusan target.');
      return;
    }

    const requirements = requirementsText
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const todayStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
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
        requirements: requirements.length > 0 ? requirements : ['Lulusan SMK Sasmita Jaya 2'],
      });
      showToast('Lowongan kerja berhasil diperbarui dan disinkronkan ke Dashboard User!');
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
        requirements: requirements.length > 0 ? requirements : ['Lulusan SMK Sasmita Jaya 2'],
      });
      showToast('Lowongan baru berhasil ditambahkan dan langsung tampil di Dashboard Alumni!');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteJob(id);
    setDeleteConfirmId(null);
    showToast('Lowongan kerja berhasil dihapus.');
  };

  // Filtered Jobs
  const filteredJobs = jobList.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = selectedType === 'Semua' || job.type === selectedType;
    const matchMajor =
      selectedMajor === 'Semua' ||
      job.targetMajors.some((m) =>
        m.toLowerCase().includes(selectedMajor.toLowerCase())
      );
    return matchSearch && matchType && matchMajor;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#0d2346] text-white rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-500/40 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0d2346] via-[#122e5d] to-[#182945] rounded-2xl p-5 sm:p-7 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-semibold mb-2">
            <Briefcase className="w-3.5 h-3.5 text-[#ffc72c]" />
            <span>Manajemen Penyaluran Kerja</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Kelola Lowongan Kerja & Magang
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Tambah, perbarui, dan sesuaikan lowongan dari mitra DUDI BKK. Seluruh info lowongan yang Anda kelola otomatis muncul pada <strong>Dashboard Alumni (Tab Loker)</strong>.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer shrink-0 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Lowongan Baru</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Lowongan Aktif</p>
            <p className="text-2xl font-black text-[#0d2346] mt-1">{jobList.length}</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Tampil di dashboard user</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 text-[#0d2346]">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Mitra Resmi BKK</p>
            <p className="text-2xl font-black text-[#0d2346] mt-1">
              {jobList.filter((j) => j.isBkkPartner).length}
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Perusahaan terverifikasi</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Perusahaan Perekrut</p>
            <p className="text-2xl font-black text-[#0d2346] mt-1">
              {new Set(jobList.map((j) => j.company)).size}
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Mitra DUDI aktif</p>
          </div>
          <div className="p-3 rounded-xl bg-purple-50 text-purple-700">
            <Building2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari posisi loker, nama perusahaan, atau kota..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0d2346] focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#0d2346] focus:outline-none"
            >
              <option value="Semua">Semua Tipe Pekerjaan</option>
              {JOB_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <select
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#0d2346] focus:outline-none"
            >
              <option value="Semua">Semua Jurusan</option>
              {JURUSAN_OPTIONS.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Menampilkan <strong>{filteredJobs.length}</strong> dari {jobList.length} lowongan</span>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-slate-200">
            <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <Briefcase className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Tidak ada lowongan ditemukan</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Coba sesuaikan kata kunci pencarian atau filter tipe pekerjaan.
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Top Badge & Company */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#0d2346] border border-blue-200">
                        {job.type}
                      </span>
                      {job.isBkkPartner && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <ShieldCheck className="w-3 h-3" />
                          Mitra BKK
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-[#0d2346] leading-tight">
                      {job.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 mt-0.5 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {job.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(job)}
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
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 my-3 p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate font-semibold text-slate-800">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>Batas: <strong>{job.deadline}</strong></span>
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
                <span className="text-[11px] font-bold text-blue-600">
                  {job.requirements.length} Persyaratan
                </span>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Create / Edit Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0d2346] to-[#182945] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/10 text-[#ffc72c]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingJob ? 'Edit Lowongan Kerja' : 'Tambah Lowongan Kerja Baru'}
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Lowongan ini akan otomatis tampil pada Tab Loker di Dashboard Alumni.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                aria-label="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[78vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Posisi / Judul Pekerjaan <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Junior Network Administrator"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0d2346] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Nama Perusahaan / Instansi <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Contoh: PT Astra Daihatsu Motor"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0d2346] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Lokasi Penempatan
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Contoh: Tangerang Selatan"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#0d2346] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Tipe Pekerjaan
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as JobVacancy['type'])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#0d2346] focus:outline-none bg-white"
                  >
                    {JOB_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Kisaran Gaji
                  </label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="Contoh: Rp 4.500.000 - Rp 6.500.000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#0d2346] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Batas Akhir Pendaftaran (Deadline)
                  </label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="Contoh: 30 Okt 2026"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#0d2346] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Kontak / Email Lamaran
                  </label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Email HRD atau kontak WA BKK"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#0d2346] focus:outline-none"
                  />
                </div>
              </div>

              {/* BKK Partner Checkbox */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800">
                    Tandai sebagai Mitra Resmi BKK Sasmita
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isBkkPartner}
                  onChange={(e) => setIsBkkPartner(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-[#0d2346] cursor-pointer"
                />
              </div>

              {/* Target Majors Multi-Select */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-800">
                    Sasaran Program Keahlian / Jurusan <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={selectAllMajors}
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    {targetMajors.length === JURUSAN_OPTIONS.length ? 'Batal Pilih Semua' : 'Pilih Semua Jurusan'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  {JURUSAN_OPTIONS.map((major) => (
                    <label
                      key={major}
                      className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer hover:text-slate-900"
                    >
                      <input
                        type="checkbox"
                        checked={targetMajors.includes(major)}
                        onChange={() => toggleMajor(major)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-[#0d2346]"
                      />
                      <span>{major}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Deskripsi Pekerjaan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan peran utama dan tugas harian..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0d2346] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Persyaratan & Kualifikasi (1 poin per baris)
                </label>
                <textarea
                  rows={4}
                  value={requirementsText}
                  onChange={(e) => setRequirementsText(e.target.value)}
                  placeholder="Lulusan SMK Sasmita Jaya 2&#10;Memiliki sertifikat BNSP&#10;Mampu bekerja dalam tim..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0d2346] focus:outline-none"
                />
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0d2346] hover:bg-[#182945] text-white text-xs sm:text-sm font-bold shadow-md transition cursor-pointer"
                >
                  {editingJob ? 'Simpan Perubahan Loker' : 'Publikasikan Lowongan'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Hapus Lowongan Kerja Ini?</h3>
            <p className="text-xs text-slate-500">
              Lowongan yang dihapus tidak akan lagi muncul di Tab Loker pada Dashboard Alumni.
            </p>
            <div className="pt-2 flex items-center justify-center gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
