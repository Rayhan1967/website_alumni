# Product Requirement Document (PRD)
## Sistem Informasi Alumni & Tracer Study SMK Sasmita Jaya 2

| Atribut | Keterangan |
| :--- | :--- |
| **Versi Dokumen** | 1.0.0 |
| **Status** | Draf Arsitektur Frontend & Kontrak API |
| **Target Institusi** | SMK Sasmita Jaya 2 Pamulang (Yayasan Sasmita Jaya) |
| **Fokus Tahap Ini** | Pembangunan Frontend Terpisah (Decoupled), Form Logika Kondisional, & Kontrak Data |

---

## 1. Latar Belakang & Tujuan Produk

### 1.1 Latar Belakang
SMK Sasmita Jaya 2 membutuhkan sistem pelacakan lulusan (*Tracer Study*) yang terstruktur, mudah diakses melalui perangkat seluler, serta mampu merekam status transisi alumni ke dunia kerja, pendidikan tinggi, wirausaha, maupun kombinasinya. Pembangunan sistem ini dilakukan secara independen di sisi klien (frontend) agar siap dihubungkan ke infrastruktur server yayasan mana pun di kemudian hari tanpa keterikatan erat (*tight coupling*).

### 1.2 Tujuan
* Menyediakan antarmuka kuesioner mandiri yang intuitif dengan validasi data ketat di sisi klien.
* Mengakomodasi kebutuhan data riil sekolah: verifikasi NIK/NISN, data atasan tempat kerja, sertifikasi BNSP/sekolah, hingga usaha mandiri.
* Menjamin portabilitas sistem tinggi melalui output statis (*Single Page Application*) yang kompatibel dengan hosting standar cPanel/Apache/Nginx milik yayasan.

---

## 2. Sasaran Pengguna & Alur Pengguna (User Flow)

### 2.1 Persona Pengguna
1. **Alumni SMK:** Pengguna utama pengisi survei melalui ponsel pintar (akses lewat tautan WhatsApp/BKK).
2. **Pengelola BKK / Sekolah:** Pihak yang memantau rekapitulasi data, sebaran kerja, dan keselarasan kurikulum (DUDI).

### 2.2 Alur Antarmuka Frontend (Multi-Step Wizard)
1. **Langkah 1: Identifikasi Diri**
   Input NIK, NISN, Nama Lengkap, Tahun Masuk, Tahun Lulus, Jurusan, WhatsApp, dan Email.
2. **Langkah 2: Status Utama**
   Pemilihan status: `KERJA`, `KULIAH`, `WIRAUSAHA`, `KERJA_KULIAH`, `WIRAUSAHA_KULIAH`, atau `BELUM_KERJA`.
3. **Langkah 3: Detail Spesifik (Formulir Kondisional)**
   * Jika Bekerja: Input nama PT, jabatan, alamat, nama & kontak atasan, saluran info kerja, tanggal mulai, dan sertifikat yang dipakai.
   * Jika Kuliah: Input nama kampus, alamat kampus, jenjang, dan program studi.
   * Jika Wirausaha: Input nama usaha, jenis usaha (jasa/kuliner/properti/lainnya), tanggal berdiri, dan alamat usaha.
   * Jika Kombinasi: Menampilkan gabungan blok formulir terkait.
4. **Langkah 4: Evaluasi & Umpan Balik Kurikulum**
   Penilaian relevansi kompetensi kejuruan, keterampilan paling bermanfaat, saran pengembangan BKK, dan masukan kerja sama industri.
5. **Langkah 5: Tinjauan Akhir & Pengiriman (Submit)**
   Ringkasan isian, persetujuan kesediaan dihubungi, dan pengiriman *payload* JSON.

---

## 3. Spesifikasi Fungsional & Kebutuhan Data

### 3.1 Atribut Data Kuesioner (Berdasarkan Kebutuhan Riil)

| Bagian | Nama Field | Tipe Data | Validasi / Aturan |
| :--- | :--- | :--- | :--- |
| **A. Identitas** | `nik` | String | Wajib, tepat 16 digit angka[cite: 2] |
| | `nisn` | String | Wajib, tepat 10 digit angka[cite: 2] |
| | `nama_lengkap` | String | Wajib, min. 3 karakter |
| | `tahun_masuk` | Number | Wajib, YYYY |
| | `tahun_lulus` | Number | Wajib, YYYY |
| | `jurusan` | String | Wajib, pilihan enum kompetensi keahlian |
| | `no_whatsapp` | String | Wajib, format nomor Indonesia (`08...` / `628...`) |
| | `email` | String | Wajib, format email valid |
| **B. Status** | `status_kegiatan` | Enum | `KERJA`, `KULIAH`, `WIRAUSAHA`, `KERJA_KULIAH`, `WIRAUSAHA_KULIAH`, `BELUM_KERJA`[cite: 1, 2] |
| | `masa_tunggu` | Enum | Pilihan rentang waktu tunggu kerja pertama |
| **C. Kerja** | `nama_perusahaan` | String | Wajib jika status memuat elemen kerja[cite: 2] |
| | `jabatan` | String | Wajib jika status memuat elemen kerja[cite: 2] |
| | `alamat_perusahaan` | String | Wajib jika status memuat elemen kerja[cite: 2] |
| | `nama_atasan` | String | Wajib jika status memuat elemen kerja[cite: 2] |
| | `kontak_atasan` | String | Wajib jika status memuat elemen kerja (format telp)[cite: 2] |
| | `sumber_info_kerja` | Enum | Pilihan: BKK, Alumni, Website, Mandiri, Lainnya[cite: 2] |
| | `tanggal_mulai_kerja` | String / Date | Format YYYY-MM[cite: 2] |
| | `jenis_sertifikat` | Enum | Pilihan: `BNSP`, `SEKOLAH`, `TIDAK_ADA`[cite: 2] |
| | `nama_sertifikat` | String | Wajib jika jenis sertifikat dipilih[cite: 2] |
| | `kesesuaian_jurusan` | Enum | Sangat Sesuai, Sesuai, Kurang, Tidak |
| **D. Kuliah** | `nama_kampus` | String | Wajib jika status memuat elemen kuliah[cite: 1] |
| | `alamat_kampus` | String | Opsional/Wajib jika kuliah[cite: 1] |
| | `jenjang` | Enum | D3, D4, S1[cite: 1] |
| | `program_studi` | String | Wajib jika status memuat elemen kuliah[cite: 1] |
| **E. Usaha** | `nama_usaha` | String | Wajib jika status memuat elemen wirausaha[cite: 1] |
| | `kategori_usaha` | Enum | Jasa, Kuliner, Properti, Ritel, Teknologi, Lainnya[cite: 1] |
| | `alamat_usaha` | String | Wajib jika status memuat elemen wirausaha[cite: 1] |
| | `tanggal_mulai_usaha`| String / Date | Format YYYY-MM[cite: 1] |
| **F. Evaluasi** | `skor_relevansi` | Number | Skala 1 - 5 |
| | `kompetensi_bermanfaat`| Array[String] | Multi-select keahlian |
| | `saran_bkk` | String | Teks terbuka |
| | `kesediaan_dihubungi` | Boolean | Default `true` |

---

## 4. Arsitektur Frontend & Tech Stack

### 4.1 Pilihan Stack Utama
* **Runtime & Bundler:** Vite 5+ (React 18/19 Template)
* **Bahasa:** TypeScript (Strict Mode)
* **Styling:** Tailwind CSS v3/v4
* **Design System / UI Components:** `shadcn/ui` (Radix UI primitives)
* **Form & Validasi:** `react-hook-form` + `zod`
* **Icons:** `lucide-react`
* **Client Storage (State Sementara):** `zustand` dengan `persist middleware` (mencegah data hilang jika formulir ter-refresh sebelum submit).

### 4.2 Struktur Direktori yang Direkomendasikan
```text
src/
├── assets/              # Logo SMK Sasmita Jaya 2, ilustrasi, gambar
├── components/
│   ├── ui/              # Komponen instalan shadcn/ui (Button, Card, Form, dll)
│   ├── forms/           # Komponen potongan form per langkah (Step1, Step2, dsb)
│   ├── shared/          # Header, Footer, Stepper Progress Indicator
│   └── feedback/        # Dialog konfirmasi, alert sukses/gagal
├── hooks/               # Custom hooks (useTracerForm, useMultiStep)
├── lib/
│   ├── api.ts           # Axios / Fetch client wrapper
│   └── utils.ts         # Utility class twMerge & clsx
├── schemas/
│   └── tracerSchema.ts  # Definisi Zod schema validasi kondisional
├── services/
│   └── tracerService.ts # Fungsi pengiriman payload ke REST API
├── types/
│   └── tracer.ts        # Definisi TypeScript interface/type data
├── App.tsx
└── main.tsx


5. Spesifikasi Kontrak API (Hybrid Backend Contract)
Frontend dirancang secara independen. Backend apa pun yang nantinya disediakan yayasan (Laravel REST API, Node.js Express/Nest, Python FastAPI, atau BaaS) wajib mematuhi kontrak antarmuka di bawah ini:

5.1 Endpoint Pengiriman Kuesioner (Utama)
Method: POST

Path: /api/v1/tracer-study

Header: Content-Type: application/json

Contoh Payload Pengiriman (Status: Kerja Sambil Kuliah):

{
  "identitas": {
    "nik": "3674012345670001",
    "nisn": "0051234567",
    "nama_lengkap": "Ahmad Dani",
    "tahun_masuk": 2021,
    "tahun_lulus": 2024,
    "jurusan": "Teknik Komputer dan Jaringan",
    "no_whatsapp": "081298765432",
    "email": "ahmaddani@example.com"
  },
  "status_kegiatan": "KERJA_KULIAH",
  "detail_kerja": {
    "nama_perusahaan": "PT Solusi Teknologi Nusantara",
    "jabatan": "Technical Support",
    "alamat_perusahaan": "Jl. Raya Puspiptek No. 10, Tangerang Selatan",
    "nama_atasan": "Budi Santoso",
    "kontak_atasan": "081311223344",
    "sumber_info_kerja": "BKK",
    "tanggal_mulai_kerja": "2024-08",
    "jenis_sertifikat": "BNSP",
    "nama_sertifikat": "Junior Network Administrator",
    "kesesuaian_jurusan": "SANGAT_SESUAI"
  },
  "detail_kuliah": {
    "nama_kampus": "Universitas Pamulang",
    "alamat_kampus": "Jl. Surya Kencana No. 1, Pamulang",
    "jenjang": "S1",
    "program_studi": "Teknik Informatika"
  },
  "detail_usaha": null,
  "evaluasi": {
    "skor_relevansi": 5,
    "kompetensi_bermanfaat": ["Jaringan Komputer", "Kerjasama Tim", "Kedisiplinan"],
    "saran_bkk": "Perbanyak relasi loker industri di luar Tangerang Selatan.",
    "kesediaan_dihubungi": true
  }
}

Sukses (201 Created):
{
  "success": true,
  "message": "Data tracer study berhasil disimpan. Terima kasih atas partisipasi Anda.",
  "data": {
    "submission_id": "TRC-2026-0001",
    "submitted_at": "2026-09-26T13:38:16Z"
  }
}


Gagal Validasi (422 Unprocessable Entity):
{
  "success": false,
  "message": "Validasi gagal.",
  "errors": {
    "identitas.nik": ["NIK harus terdiri dari 16 digit."],
    "detail_kerja.kontak_atasan": ["Nomor kontak atasan tidak valid."]
  }
}

6. Penanganan Deployment & Kompatibilitas Hosting Sekolah
Build Artifact Statis:

Script build: npm run build menghasilkan folder tunggal /dist.

Seluruh asset (JS, CSS, Font) menggunakan hashing file untuk mencegah cache invalidation bug.

Hosting Kompatibilitas Tinggi:

Menghilangkan seluruh dependensi runtime Node.js di sisi server produksi.

Jika dipasang pada server cPanel/Apache yayasan, cukup tambahkan file .htaccess di dalam folder root agar navigasi SPA (React Router) tidak menghasilkan error 404:
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

7. Indikator Keberhasilan (Definition of Done - Frontend)
[ ] Komponen UI responsif penuh dari layar 360px (mobile) hingga desktop 1920px.

[ ] Seluruh aturan form kondisional tervalidasi menggunakan Zod schema tanpa error console.

[ ] Mocking API berjalan lancar menggunakan localStorage atau mock fetcher sebelum backend riil tersedia.

[ ] Ukuran bundle output dist terkompresi di bawah batas wajar (< 300 kB Gzipped).

[ ] Build static berhasil dideploy ke server statis tanpa kendala client routing.