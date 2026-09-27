// Types definition for Tracer Study & Alumni Portal SMK Sasmita Jaya 2
// Conforms to PRD v1.0.0

export type StatusKegiatan =
  | 'KERJA'
  | 'KULIAH'
  | 'WIRAUSAHA'
  | 'KERJA_KULIAH'
  | 'WIRAUSAHA_KULIAH'
  | 'BELUM_KERJA';

export type JurusanSMK =
  | 'Teknik Komputer dan Jaringan'
  | 'Rekayasa Perangkat Lunak'
  | 'Teknik Kendaraan Ringan Otomotif'
  | 'Teknik Bisnis Sepeda Motor'
  | 'Otomatisasi & Tata Kelola Perkantoran'
  | 'Akuntansi & Keuangan Lembaga'
  | 'Bisnis Daring & Pemasaran';

export type JenjangKuliah = 'D3' | 'D4' | 'S1';

export type KategoriUsaha =
  | 'Jasa'
  | 'Kuliner'
  | 'Properti'
  | 'Ritel'
  | 'Teknologi'
  | 'Lainnya';

export type SumberInfoKerja =
  | 'BKK'
  | 'Alumni'
  | 'Website'
  | 'Mandiri'
  | 'Lainnya';

export type JenisSertifikat = 'BNSP' | 'SEKOLAH' | 'TIDAK_ADA';

export type KesesuaianJurusan =
  | 'SANGAT_SESUAI'
  | 'SESUAI'
  | 'KURANG'
  | 'TIDAK';

export type MasaTunggu =
  | 'Kurang dari 1 bulan'
  | '1 - 3 bulan'
  | '3 - 6 bulan'
  | 'Lebih dari 6 bulan';

export interface IdentitasAlumni {
  nik: string;
  nisn: string;
  nama_lengkap: string;
  tahun_masuk: number;
  tahun_lulus: number;
  jurusan: JurusanSMK;
  no_whatsapp: string;
  email: string;
}

export interface DetailKerja {
  nama_perusahaan: string;
  jabatan: string;
  alamat_perusahaan: string;
  nama_atasan: string;
  kontak_atasan: string;
  sumber_info_kerja: SumberInfoKerja;
  tanggal_mulai_kerja: string; // YYYY-MM
  jenis_sertifikat: JenisSertifikat;
  nama_sertifikat?: string;
  kesesuaian_jurusan: KesesuaianJurusan;
}

export interface DetailKuliah {
  nama_kampus: string;
  alamat_kampus?: string;
  jenjang: JenjangKuliah;
  program_studi: string;
}

export interface DetailUsaha {
  nama_usaha: string;
  kategori_usaha: KategoriUsaha;
  alamat_usaha: string;
  tanggal_mulai_usaha: string; // YYYY-MM
}

export interface EvaluasiPembelajaran {
  skor_relevansi: number; // 1 - 5
  kompetensi_bermanfaat: string[];
  saran_bkk: string;
  kesediaan_dihubungi: boolean;
}

// Full Tracer Study Submission Payload as specified in PRD Section 5.1
export interface TracerSubmissionPayload {
  identitas: IdentitasAlumni;
  status_kegiatan: StatusKegiatan;
  masa_tunggu?: MasaTunggu;
  detail_kerja: DetailKerja | null;
  detail_kuliah: DetailKuliah | null;
  detail_usaha: DetailUsaha | null;
  evaluasi: EvaluasiPembelajaran;
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  data?: {
    submission_id: string;
    submitted_at: string;
  };
  errors?: Record<string, string[]>;
}

// User Profile & Authentication
export interface UserSession {
  id: string;
  nisn: string;
  nama: string;
  email: string;
  role: 'alumni' | 'admin_bkk';
  jurusan: string;
  tahun_lulus: number;
  tracerStatus: 'SUDAH' | 'BELUM' | 'DRAFT';
  submissionId?: string;
  submittedAt?: string;
  avatarUrl?: string;
}

// Loker & Magang
export interface JobVacancy {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'Full-time' | 'Internship / Magang' | 'Part-time' | 'Kontrak';
  salary: string;
  targetMajors: string[];
  postedAt: string;
  deadline: string;
  description: string;
  requirements: string[];
  contactPerson: string;
  isBkkPartner: boolean;
}

// Ijazah Tracking
export interface IjazahStatus {
  nisn: string;
  nama: string;
  jurusan: string;
  tahunLulus: number;
  statusPengambilan: 'SIAP_DIAMBIL' | 'SUDAH_DIAMBIL' | 'PROSES_LEGALISIR' | 'DALAM_PENCETAKAN';
  nomorIjazah: string;
  nomorSertifikatBnsp?: string;
  tanggalSiap?: string;
  tanggalDiambil?: string;
  lokasiPengambilan: string;
  persyaratan: string[];
  barcode: string;
}

// News
export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  author: string;
}

// Legal Basis SK
export interface LegalBasis {
  id: string;
  number: string;
  year: string;
  title: string;
  description: string;
  badge: string;
  pdfUrl?: string;
}
