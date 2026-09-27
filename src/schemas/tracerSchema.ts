import { z } from 'zod';

export const JURUSAN_OPTIONS = [
  'Teknik Komputer dan Jaringan',
  'Rekayasa Perangkat Lunak',
  'Teknik Kendaraan Ringan Otomotif',
  'Teknik Bisnis Sepeda Motor',
  'Otomatisasi & Tata Kelola Perkantoran',
  'Akuntansi & Keuangan Lembaga',
  'Bisnis Daring & Pemasaran',
] as const;

export const STATUS_KEGIATAN_OPTIONS = [
  { value: 'KERJA', label: 'Bekerja (Full Time / Part Time / Kontrak)' },
  { value: 'KULIAH', label: 'Melanjutkan Studi / Kuliah' },
  { value: 'WIRAUSAHA', label: 'Wirausaha / Membuka Usaha Mandiri' },
  { value: 'KERJA_KULIAH', label: 'Bekerja Sambil Kuliah' },
  { value: 'WIRAUSAHA_KULIAH', label: 'Wirausaha Sambil Kuliah' },
  { value: 'BELUM_KERJA', label: 'Sedang Mencari Kerja / Belum Bekerja' },
] as const;

export const SUMBER_INFO_KERJA_OPTIONS = [
  'BKK',
  'Alumni',
  'Website',
  'Mandiri',
  'Lainnya',
] as const;

export const JENIS_SERTIFIKAT_OPTIONS = [
  { value: 'BNSP', label: 'Sertifikat Kompetensi BNSP' },
  { value: 'SEKOLAH', label: 'Sertifikat Keahlian Sekolah / Industri' },
  { value: 'TIDAK_ADA', label: 'Tidak Ada Sertifikat Khusus' },
] as const;

export const KESESUAIAN_JURUSAN_OPTIONS = [
  { value: 'SANGAT_SESUAI', label: 'Sangat Sesuai (100% Selaras)' },
  { value: 'SESUAI', label: 'Sesuai (Cukup Selaras)' },
  { value: 'KURANG', label: 'Kurang Sesuai' },
  { value: 'TIDAK', label: 'Tidak Sesuai (Beda Bidang)' },
] as const;

export const JENJANG_OPTIONS = ['D3', 'D4', 'S1'] as const;

export const KATEGORI_USAHA_OPTIONS = [
  'Jasa',
  'Kuliner',
  'Properti',
  'Ritel',
  'Teknologi',
  'Lainnya',
] as const;

export const MASA_TUNGGU_OPTIONS = [
  'Kurang dari 1 bulan',
  '1 - 3 bulan',
  '3 - 6 bulan',
  'Lebih dari 6 bulan',
] as const;

export const KOMPETENSI_OPTIONS = [
  'Keahlian Teknis / Hard Skills Kejuruan',
  'Jaringan & Troubleshooting',
  'Pemrograman & Desain Digital',
  'Mesin Otomotif & Diagnostik',
  'Administrasi Perkantoran & Kearsipan',
  'Akuntansi Keuangan & Pembukuan',
  'Pemasaran Digital & Negosiasi',
  'Komunikasi & Kerjasama Tim',
  'Kedisiplinan & Budaya Kerja 5R/5S',
  'Bahasa Inggris / Komunikasi Global',
  'Pemecahan Masalah & Kreativitas',
];

// Step 1: Identitas Schema
export const step1Schema = z
  .object({
    nik: z
      .string()
      .min(1, 'NIK wajib diisi')
      .regex(/^\d{16}$/, 'NIK harus tepat 16 digit angka'),
    nisn: z
      .string()
      .min(1, 'NISN wajib diisi')
      .regex(/^\d{10}$/, 'NISN harus tepat 10 digit angka'),
    nama_lengkap: z
      .string()
      .min(3, 'Nama lengkap minimal 3 karakter')
      .max(100, 'Nama terlalu panjang'),
    tahun_masuk: z
      .number()
      .min(2000, 'Tahun masuk minimal 2000')
      .max(new Date().getFullYear(), 'Tahun masuk tidak valid'),
    tahun_lulus: z
      .number()
      .min(2003, 'Tahun lulus minimal 2003')
      .max(new Date().getFullYear() + 1, 'Tahun lulus tidak valid'),
    jurusan: z.enum([
      'Teknik Komputer dan Jaringan',
      'Rekayasa Perangkat Lunak',
      'Teknik Kendaraan Ringan Otomotif',
      'Teknik Bisnis Sepeda Motor',
      'Otomatisasi & Tata Kelola Perkantoran',
      'Akuntansi & Keuangan Lembaga',
      'Bisnis Daring & Pemasaran',
    ]),
    no_whatsapp: z
      .string()
      .min(1, 'Nomor WhatsApp wajib diisi')
      .regex(
        /^(\+62|62|0)8[1-9][0-9]{6,10}$/,
        'Format nomor WhatsApp tidak valid (contoh: 081234567890)'
      ),
    email: z
      .string()
      .min(1, 'Email wajib diisi')
      .email('Format alamat email tidak valid'),
  })
  .refine((data) => data.tahun_lulus >= data.tahun_masuk, {
    message: 'Tahun lulus tidak boleh lebih awal dari tahun masuk',
    path: ['tahun_lulus'],
  });

export type Step1FormData = z.infer<typeof step1Schema>;

// Step 2: Status Kegiatan Schema
export const step2Schema = z.object({
  status_kegiatan: z.enum([
    'KERJA',
    'KULIAH',
    'WIRAUSAHA',
    'KERJA_KULIAH',
    'WIRAUSAHA_KULIAH',
    'BELUM_KERJA',
  ]),
  masa_tunggu: z
    .enum(['Kurang dari 1 bulan', '1 - 3 bulan', '3 - 6 bulan', 'Lebih dari 6 bulan'])
    .optional(),
});

// Detail Kerja Schema
export const detailKerjaSchema = z
  .object({
    nama_perusahaan: z.string().min(2, 'Nama perusahaan/instansi wajib diisi'),
    jabatan: z.string().min(2, 'Posisi / Jabatan wajib diisi'),
    alamat_perusahaan: z.string().min(5, 'Alamat perusahaan wajib diisi'),
    nama_atasan: z.string().min(2, 'Nama atasan langsung wajib diisi'),
    kontak_atasan: z
      .string()
      .min(8, 'Kontak atasan wajib diisi')
      .regex(/^[0-9+\-\s]{8,18}$/, 'Format nomor kontak atasan tidak valid'),
    sumber_info_kerja: z.enum(['BKK', 'Alumni', 'Website', 'Mandiri', 'Lainnya']),
    tanggal_mulai_kerja: z
      .string()
      .min(4, 'Bulan/Tahun mulai bekerja wajib diisi (YYYY-MM)'),
    jenis_sertifikat: z.enum(['BNSP', 'SEKOLAH', 'TIDAK_ADA']),
    nama_sertifikat: z.string().optional(),
    kesesuaian_jurusan: z.enum(['SANGAT_SESUAI', 'SESUAI', 'KURANG', 'TIDAK']),
  })
  .refine(
    (data) => {
      if (
        data.jenis_sertifikat !== 'TIDAK_ADA' &&
        (!data.nama_sertifikat || data.nama_sertifikat.trim() === '')
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Nama sertifikat wajib diisi bila memilih sertifikat BNSP/Sekolah',
      path: ['nama_sertifikat'],
    }
  );

// Detail Kuliah Schema
export const detailKuliahSchema = z.object({
  nama_kampus: z.string().min(3, 'Nama perguruan tinggi / kampus wajib diisi'),
  alamat_kampus: z.string().optional(),
  jenjang: z.enum(['D3', 'D4', 'S1']),
  program_studi: z.string().min(2, 'Program studi / jurusan kuliah wajib diisi'),
});

// Detail Usaha Schema
export const detailUsahaSchema = z.object({
  nama_usaha: z.string().min(2, 'Nama usaha/bisnis wajib diisi'),
  kategori_usaha: z.enum([
    'Jasa',
    'Kuliner',
    'Properti',
    'Ritel',
    'Teknologi',
    'Lainnya',
  ]),
  alamat_usaha: z.string().min(5, 'Alamat / domisili usaha wajib diisi'),
  tanggal_mulai_usaha: z
    .string()
    .min(4, 'Bulan/Tahun mulai usaha wajib diisi (YYYY-MM)'),
});

// Step 4: Evaluasi Schema
export const step4Schema = z.object({
  skor_relevansi: z
    .number()
    .min(1, 'Berikan penilaian skala 1-5')
    .max(5, 'Maksimal skor adalah 5'),
  kompetensi_bermanfaat: z
    .array(z.string())
    .min(1, 'Pilih minimal satu kompetensi yang paling bermanfaat'),
  saran_bkk: z
    .string()
    .min(5, 'Berikan saran dan masukan untuk kemajuan BKK SMK Sasmita Jaya 2'),
  kesediaan_dihubungi: z.boolean().default(true),
});

// Full Combined Form Schema
export const completeTracerFormSchema = z.object({
  identitas: step1Schema,
  status_kegiatan: z.enum([
    'KERJA',
    'KULIAH',
    'WIRAUSAHA',
    'KERJA_KULIAH',
    'WIRAUSAHA_KULIAH',
    'BELUM_KERJA',
  ]),
  masa_tunggu: z
    .enum(['Kurang dari 1 bulan', '1 - 3 bulan', '3 - 6 bulan', 'Lebih dari 6 bulan'])
    .optional(),
  detail_kerja: detailKerjaSchema.nullable().optional(),
  detail_kuliah: detailKuliahSchema.nullable().optional(),
  detail_usaha: detailUsahaSchema.nullable().optional(),
  evaluasi: step4Schema,
  agreement: z.boolean().refine((val) => val === true, {
    message: 'Anda harus menyetujui pernyataan kebenaran data',
  }),
});

export type CompleteTracerFormData = z.infer<typeof completeTracerFormSchema>;
