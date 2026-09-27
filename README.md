# Sistem Informasi Alumni & Tracer Study — SMK Sasmita Jaya 2 Pamulang

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Platform resmi penelusuran lulusan (*Tracer Study*) dan pengelolaan data alumni **SMK Sasmita Jaya 2 Pamulang**. Dikembangkan untuk memetakan keterserapan lulusan di Dunia Usaha/Dunia Industri (DUDI), perguruan tinggi, dan wirausaha, sekaligus memenuhi standar pelaporan **Direktorat Jenderal Pendidikan Vokasi (Kemendikbudristek)** dan amanat **Perpres No. 68 Tahun 2022**.

---

## Daftar Isi
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Kredensial Awal & Akun Demo](#-kredensial-awal--akun-demo)
- [Prasyarat Sistem](#-prasyarat-sistem)
- [Langkah Instalasi & Menjalankan Proyek](#-langkah-instalasi--menjalankan-proyek)
- [Struktur Direktori Proyek](#-struktur-direktori-proyek)
- [Panduan Git & Branch Staging](#-panduan-git--branch-staging)
- [Kebijakan Keamanan & Privasi](#-kebijakan-keamanan--privasi)

---

## Fitur Utama

### 1. Landing Page Interaktif & Responsif
- **Hero Section**: Desain modern dengan visual siswa, statistik keterserapan kerja, dan tombol aksi langsung ke kuesioner.
- **Navigasi Responsif**: Sidebar drawer khusus tampilan mobile dan tablet/iPad (< 1024px) dengan logo dan tombol login resmi.
- **6 Layanan Utama Alumni**: Tracer study, statistik karir, forum alumni, bursa kerja khusus (BKK), legalisir ijazah, dan helpdesk.
- **Dasar Hukum & Akreditasi**: Informasi regulasi resmi (Perpres No. 68/2022 & Permendikbud).
- **Portal Berita & Agenda Terkini**: Menampilkan update lowongan kerja BKK, workshop persiapan karir, dan agenda reuni.
- **FAQ Accordion Smooth**: Tanya jawab umum seputar kuesioner tracer study dengan transisi CSS Grid yang mulus.
- **Footer Komprehensif**: Kontak resmi, alamat Google Maps, dan tautan sosial media SMK Sasmita Jaya 2.

### 2. Halaman Detail Tentang (`/tentang`)
- Penjelasan mendalam mengenai urgensi dan tujuan tracer study.
- Rincian **5 Langkah Alur Pengisian Kuesioner**.
- Jaminan Kerahasiaan & Keamanan Data berstandar enkripsi.
- Quick highlights statistik alumni dan akses cepat chat WhatsApp Helpdesk BKK.

### 3. Formulir 5 Langkah Kuesioner Tracer Study (`/tracer-study`)
- **Langkah 1**: Validasi Identitas & Kontak Alumni (Nama, NISN, NIK, Jurusan, Tahun Lulus, WhatsApp).
- **Langkah 2**: Pemilihan Status Kegiatan Utama (*Bekerja*, *Melanjutkan Kuliah*, *Wirausaha*, *Mencari Kerja*).
- **Langkah 3**: Rincian Informasi Profesi / Kampus / Bidang Usaha & Tingkat Kesesuaian Jurusan.
- **Langkah 4**: Evaluasi Relevansi Kurikulum & Masukan untuk Sekolah.
- **Langkah 5**: Konfirmasi Ringkasan & Cetak/Unduh **Tanda Bukti Resmi Pengisian (PDF & QR Code)** sebagai syarat pengambilan ijazah.

### 4. Dashboard Alumni & Manajemen BKK (`/dashboard`)
- **Dashboard Alumni**: Memantau status pengisian, riwayat karir, dan unduh ulang kartu bukti pengisian.
- **Dashboard Admin BKK**: Rekapitulasi statistik serapan lulusan, analisis gaji/pendapatan, filter jurusan/tahun, serta ekspor data laporan ke Excel/PDF.

---

## Tech Stack

| Kategori | Teknologi |
|---|---|
| **Frontend Framework** | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool & Bundler** | [Vite 5](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + Vanilla CSS Custom Utilities |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) (dengan `persist` LocalStorage) |
| **Routing** | [React Router DOM v6](https://reactrouter.com/) |
| **Iconography** | [Lucide React](https://lucide.dev/) + Custom SVG School Assets |
| **Export & Reporting** | [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/) |
| **Animasi & Interaksi** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |

---

## Kredensial Awal & Akun Demo

Untuk mempermudah pengujian di lingkungan development atau staging, Anda dapat menggunakan akun demo berikut pada halaman [Login (`/login`)](http://localhost:5173/login):

### 1. Akun Alumni
- **Metode Login**: NISN atau NIK
- **Contoh NISN**: `0051234567` atau `0061234567`
- **Contoh NIK**: `3274012304050001`
- *Tersedia tombol "Demo Akun" pada halaman login untuk pengisian instan.*

### 2. Akun Admin BKK / Pengelola
- **Identifier**: `admin@smksasmitajaya2.sch.id`
- **Role**: `admin_bkk`
- Memberikan akses penuh ke data agregat dan statistik kuesioner.

---

## Prasyarat Sistem

Sebelum menjalankan proyek, pastikan perangkat Anda telah terpasang:
- **Node.js**: Versi `18.x` atau lebih baru ([Unduh Node.js](https://nodejs.org/))
- **npm** (v9+) atau **yarn** / **pnpm**
- **Git** ([Unduh Git](https://git-scm.com/))

---

## Langkah Instalasi & Menjalankan Proyek

Ikuti langkah-langkah berikut secara berurutan:

### 1. Clone Repository
```bash
git clone https://github.com/madin05/website-alumni.git
cd website-alumni
```

### 2. Switch ke Branch `staging`
```bash
git checkout -b staging
# Atau jika branch staging sudah ada di remote:
git checkout staging
```

### 3. Install Dependensi
```bash
npm install
```

### 4. Konfigurasi Environment Variable
Salin berkas template environment:
```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Linux / macOS
cp .env.example .env
```

### 5. Jalankan Server Development
```bash
npm run dev
```
Buka browser dan akses: `http://localhost:5173`

### 6. Build untuk Lingkungan Produksi
Untuk memvalidasi kesiapan kode dan membuat bundle statis:
```bash
npm run build
```
Hasil build akan berada di direktori `dist/`.

### 7. Uji Coba Hasil Build Produksi (Preview)
```bash
npm run preview
```

---

## Struktur Direktori Proyek

```text
web_alumni/
├── .vscode/               # Pengaturan workspace editor (Tailwind lint fix)
├── assets/                # Asset master sumber (gambar & SVG icon asli)
├── public/                # Asset statis publik (logo, shield, icon, favicon)
│   ├── Shield.svg         # Icon perisai keamanan data resmi
│   ├── icon-login-btn.png # Icon resmi topi wisuda tombol login
│   ├── logo-smk.png       # Logo resmi SMK Sasmita Jaya 2
│   └── hero-students.png  # Ilustrasi siswa SMK
├── src/
│   ├── components/        # Komponen antarmuka React
│   │   ├── about/         # Halaman detail Tentang Tracer Study (/tentang)
│   │   ├── auth/          # Halaman Login (/login)
│   │   ├── dashboard/     # Layout & komponen Dashboard Alumni & Admin
│   │   ├── landing/       # Komponen Landing Page (Hero, Navbar, Features, Footer, dll.)
│   │   ├── news/          # Portal Berita & Detail Artikel (/berita/:id)
│   │   ├── tracer/        # Form Wizard 5 Langkah Kuesioner (/tracer-study)
│   │   └── ui/            # Reusable UI Atoms (Button, Card, Modal, Select, dll.)
│   ├── data/              # Mock data berita, kuesioner, dan FAQ
│   ├── store/             # Global store state management (Zustand authStore)
│   ├── types/             # TypeScript type definitions (tracer, user, news)
│   ├── App.tsx            # Root routing & layout container
│   ├── index.css          # Core CSS tokens, typography, dan Tailwind directives
│   └── main.tsx           # Application entry point
├── .env.example           # Template environment variable
├── .gitignore             # Aturan berkas yang diabaikan Git
├── index.html             # HTML template utama
├── package.json           # Manifest proyek & dependensi
├── tailwind.config.js     # Konfigurasi Tailwind theme, colors & breakpoints
├── tsconfig.json          # Konfigurasi TypeScript
└── vite.config.ts         # Konfigurasi Vite bundler
```

---

## Panduan Git & Branch Staging

### Menyiapkan Remote & Push ke Branch `staging`:

1. **Inisialisasi & Verifikasi Branch**:
   ```bash
   git status
   git branch -M staging
   ```

2. **Tambahkan Remote Repository**:
   ```bash
   git remote add origin https://github.com/madin05/website-alumni.git
   ```

3. **Stage dan Commit Seluruh Berkas**:
   ```bash
   git add .
   git commit -m "feat: inisialisasi platform tracer study alumni SMK Sasmita Jaya 2 (staging)"
   ```

4. **Push ke GitHub Branch `staging`**:
   ```bash
   git push -u origin staging
   ```

---

## Kebijakan Keamanan & Privasi

1. **Data Dummy / Mock**: Seluruh data NIK, nomor kontak, dan identitas yang digunakan dalam kode demo adalah data fiktif untuk keperluan pengujian.
2. **Kerahasiaan Kredensial**: File `.env`, certificate, token API, dan `node_modules/` **secara ketat diabaikan** melalui berkas `.gitignore` dan dilarang di-push ke repository publik.
3. **Standar Desain**: Seluruh container kartu dan popup menerapkan radius sudut standar **12px (`rounded-xl` / `rounded-md`)** sesuai panduan desain antarmuka sekolah.

---

© 2026 **SMK Sasmita Jaya 2 Pamulang** — Tim Pengembang Sistem Informasi Alumni & Tracer Study.
