import React, { useState } from 'react';
import { MOCK_JOBS } from '@/lib/mockData';
import { JobVacancy } from '@/types/tracer';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import {
  Briefcase,
  Search,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  Send,
  CheckCircle,
  Filter,
} from 'lucide-react';

interface LokerTabProps {
  selectedJobFromOverview?: JobVacancy | null;
  onClearSelectedJob?: () => void;
}

export const LokerTab: React.FC<LokerTabProps> = ({
  selectedJobFromOverview,
  onClearSelectedJob,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState<string>('ALL');
  const [selectedJob, setSelectedJob] = useState<JobVacancy | null>(
    selectedJobFromOverview || null
  );
  const [applyModalJob, setApplyModalJob] = useState<JobVacancy | null>(null);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const filteredJobs = MOCK_JOBS.filter((job) => {
    const matchQuery =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchMajor =
      selectedMajor === 'ALL' ||
      job.targetMajors.some((m) => m.toLowerCase().includes(selectedMajor.toLowerCase()));

    return matchQuery && matchMajor;
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      setApplyModalJob(null);
      alert('Lamaran berhasil dikirim ke Bursa Kerja Khusus (BKK) SMK Sasmita Jaya 2!');
    }, 1200);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-base sm:text-xl font-bold text-slate-900">
          Bursa Kerja Khusus (BKK) & Info Lowongan
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Daftar lowongan kerja, magang bersertifikat, dan penempatan industri mitra resmi SMK Sasmita Jaya 2
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Cari posisi pekerjaan, nama perusahaan, atau kota..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <select
            value={selectedMajor}
            onChange={(e) => setSelectedMajor(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20"
          >
            <option value="ALL">Semua Jurusan</option>
            <option value="Teknik Komputer dan Jaringan">TKJ</option>
            <option value="Rekayasa Perangkat Lunak">RPL</option>
            <option value="Teknik Kendaraan Ringan Otomotif">TKRO</option>
            <option value="Teknik Bisnis Sepeda Motor">TBSM</option>
            <option value="Akuntansi">Akuntansi (AKL)</option>
            <option value="Otomatisasi">OTKP</option>
            <option value="Bisnis Daring">BDP</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-3.5 sm:space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold">
                  {job.type}
                </span>
                <span className="text-xs text-slate-400">
                  Batas: {job.deadline}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {job.title}
              </h3>
              <p className="text-xs font-semibold text-slate-700 mt-1 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>{job.company}</span>
              </p>

              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{job.location}</span>
                </p>
                <p className="font-bold text-emerald-600">
                  {job.salary}
                </p>
              </div>

              <p className="mt-3 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {job.description}
              </p>

              {/* Target Majors Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {job.targetMajors.map((major, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-medium"
                  >
                    {major}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <Button
                onClick={() => setSelectedJob(job)}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Lihat Detail
              </Button>
              <Button
                onClick={() => setApplyModalJob(job)}
                variant="primary"
                size="sm"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Lamar Loker
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail Loker */}
      <Modal
        isOpen={!!selectedJob}
        onClose={() => {
          setSelectedJob(null);
          if (onClearSelectedJob) onClearSelectedJob();
        }}
        title={selectedJob?.title}
        subtitle={selectedJob?.company}
        maxWidth="lg"
      >
        {selectedJob && (
          <div className="space-y-5 text-xs text-slate-700">
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 block text-[10px]">Tipe Pekerjaan</span>
                <span className="font-bold text-slate-800">{selectedJob.type}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Estimasi Gaji</span>
                <span className="font-bold text-emerald-600">{selectedJob.salary}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Lokasi</span>
                <span className="font-medium text-slate-800">{selectedJob.location}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Batas Pendaftaran</span>
                <span className="font-medium text-slate-800">{selectedJob.deadline}</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Deskripsi Pekerjaan</h4>
              <p className="text-slate-600 leading-relaxed">{selectedJob.description}</p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Kualifikasi & Persyaratan</h4>
              <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                {selectedJob.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button
                onClick={() => {
                  const current = selectedJob;
                  setSelectedJob(null);
                  setApplyModalJob(current);
                }}
                variant="primary"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Lamar Sekarang via BKK
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Lamar Pekerjaan */}
      <Modal
        isOpen={!!applyModalJob}
        onClose={() => setApplyModalJob(null)}
        title="Lamar Pekerjaan"
        subtitle={`Posisi: ${applyModalJob?.title} - ${applyModalJob?.company}`}
        maxWidth="md"
      >
        <form onSubmit={handleApply} className="space-y-4 text-xs">
          <p className="text-slate-600">
            Profil data alumni Anda dari Tracer Study akan otomatis dilampirkan ke tim HRD mitra BKK.
          </p>

          <Input label="Nama Lengkap Pelamar" defaultValue="Ahmad Dani" required />
          <Input label="Nomor WhatsApp" defaultValue="081298765432" required />
          <Input label="Link Portofolio / LinkedIn / CV (Opsional)" placeholder="https://linkedin.com/in/..." />

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-semibold block text-slate-800 mb-1">Unggah Lampiran Berkas (PDF):</span>
            <input type="file" accept=".pdf,.doc,.docx" className="text-xs text-slate-500 w-full" />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button type="button" onClick={() => setApplyModalJob(null)} variant="outline" size="sm">
              Batal
            </Button>
            <Button type="submit" variant="primary" size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-3.5 h-3.5 mr-1" />
              <span>Kirim Lamaran</span>
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
