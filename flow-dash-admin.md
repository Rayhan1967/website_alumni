**Fondasi layout-nya bisa sama persis (konsisten), tapi fokus informasinya beda total.**

Kalau di dashboard user/alumni fokusnya adalah **mengisi kuesioner dan melihat status kelengkapan data pribadi**, maka di dashboard admin (BKK/Operator Sekolah) fokusnya adalah **monitoring skala besar, validasi data masuk, dan reporting ke dinas/yayasan.**

Secara shell antarmuka, lo tetap bisa pakai layout standar admin berbasis shadcn/ui:

* **Sidebar Navigasi di Kiri:** Berisi menu Dashboard, Master Alumni, Verifikasi Responden, Laporan & Ekspor, dan Pengaturan.
* **Header / Topbar:** Menampilkan profil admin yang login, indikator status sinkronisasi, dan tombol cepat ganti tema (dark/light mode).
* **Kontainer Konten Utama:** Menampilkan tabel data, kartu metrik, dan grafik analitik.

---

### Fitur-Fitur Proper & Esensial untuk Halaman Admin
---

#### 1. Quick Stats Cards (Ringkasan Metrik di Bagian Atas)

Bukan sekadar jumlah angka acak, tapi metrik operasional BKK:

* **Total Kuota Alumni Angkatan Aktif:** (Misal: 450 Siswa)
* **Response Rate (Tingkat Pengisian):** Persentase yang sudah mengisi vs belum (misal: 380 / 450 $\rightarrow$ 84.4%).
* **Menunggu Verifikasi:** Jumlah isian kuesioner yang baru disubmit alumni dan butuh ditinjau.
* **Distribusi BMW Cepat:** Angka ringkas Bekerja, Melanjutkan Kuliah, dan Wirausaha.

---

#### 2. Import Master Data Siswa Lulusan (Batch Pre-populate)

Sebelum alumni bisa mengisi form, admin harus memasukkan data master dari Dapodik/Sekolah:

* **Fitur:** Upload berkas `.xlsx` atau `.csv` yang berisi `nisn`, `nik`, `nama`, `jurusan`, `tahun_lulus`, dan `no_wa`.
* **Fungsi:** Sistem otomatis menyimpan daftar siswa berhak isi. Begitu alumni login memasukkan NISN/NIK di halaman depan, sistem mencocokkan ke tabel ini. Ini mencegah pihak luar/spam mengisi kuesioner sembarangan.

---

#### 3. Data Table Responden yang Komprehensif (Inti Pekerjaan Admin)

Gunakan tabel data berbasis komponen canggih (seperti TanStack Table di shadcn):

* **Fitur Pencarian & Filter Cepat:**
* Search bar global (Cari nama atau NISN).
* Filter dropdown: Jurusan (TKJ, RPL, OTKP, AKL), Tahun Kelulusan, dan Status Aktivitas (Kerja, Kuliah, Usaha, Belum Kerja).
* Filter status verifikasi: *Pending*, *Valid*, *Perlu Revisi*.


* **Kolom Tabel:**
* NISN & Nama Lengkap
* Jurusan & Tahun Lulus
* Status Aktivitas
* Nama Instansi / Kampus / Usaha
* Tanggal Submit
* Status Verifikasi (Badge status)
* Tombol Aksi (Detail, Verifikasi, Cetak)



---

#### 4. Drawer / Modal Detail Jawaban Kuesioner

Saat admin klik tombol **"Lihat Detail"** pada salah satu baris siswa:

* Muncul modal atau sliding sheet (drawer samping) yang menampilkan seluruh rekap jawaban multi-step form siswa tersebut.
* Termasuk data sensitif yang tidak tampil di publik: nomor WhatsApp alumni, estimasi rentang gaji, linieritas keahlian, dan nama kontak atasan langsung/HRD untuk keperluan survey DUDI.

---

#### 5. Fitur Follow-up Alumni Belum Mengisi (WhatsApp Blast / Quick Reminder)

Masalah terbesar Tracer Study di sekolah adalah **alumni malas mengisi kuesioner**.

* **Fitur:** Di tabel master data, admin bisa memfilter status `Belum Mengisi`.
* **Aksi Cepat:** Tombol icon WhatsApp per baris yang otomatis membuka tautan `[https://wa.me/](https://wa.me/){nomor}?text=Halo%20{nama},%20mohon%20segera%20isi%20kuesioner%20tracer%20study...`. Ini fitur yang sangat aplikatif dan disukai staf BKK sekolah.

---

#### 6. Export Engine (Excel & Cetak Laporan PDF Resmi)

Fitur wajib pelaporan:

* **Export Master Data to Excel (.xlsx):** Download seluruh kolom responden mentah untuk disesuaikan dengan template unggah portal Ditjen Vokasi Kemendikbud.
* **Print / Cetak Rekapitulasi PDF:** Menghasilkan lembar ringkasan eksekutif berformat kop surat resmi SMK Sasmita Jaya 2 yang berisi tabel persentase keterserapan per jurusan untuk ditandatangani Kepala Sekolah.

---

### Struktur Halaman di Folder Proyek Frontend

Di router React lo, pembagian jalurnya bisa sesimpel ini:

* `/admin/login` $\rightarrow$ Halaman masuk khusus admin BKK.
* `/admin/dashboard` $\rightarrow$ Ringkasan grafik analitik dan metrik respons.
* `/admin/alumni` $\rightarrow$ Manajemen master data siswa & tombol import Excel.
* `/admin/responden` $\rightarrow$ Tabel verifikasi kuesioner yang sudah masuk.
* `/admin/laporan` $\rightarrow$ Modul ekspor Excel dan cetak PDF rekapitulasi.


**Harus disediakan fiturnya di aplikasi biar operator/admin sekolah yang melakukan import sendiri secara mandiri.**

Alasan teknis dan akademisnya:

---

### 1. Hakikat Sistem Informasi (Prinsip PKM & Rekayasa Perangkat Lunak)

Dalam proyek Pengabdian kepada Masyarakat (PKM) atau tugas akhir sistem informasi, sistem kamu harus **berkelanjutan (*sustainable*)** dan bisa dioperasikan sendiri oleh mitra sekolah setelah masa pengabdian selesai.

* Kalau kamu yang memasukkan data manual lewat terminal/database GUI (seperti phpMyAdmin atau Prisma Studio), sistem tersebut belum bisa dikatakan sebagai produk utuh yang siap pakai bagi pengguna non-teknis.
* Saat sidang atau serah terima, penguji dan sekolah akan menilai sejauh mana aplikasi ini memudahkan staf BKK/TU melakukan pembaruan data tanpa bantuan programmer.

---

### 2. Bagaimana Alur Kerja yang Ideal di Aplikasi?

Berikut alur sederhana yang umum diterapkan:

1. **Unduh Format/Template:**
* Di dashboard admin, sediakan satu tombol: **"Unduh Format Excel/CSV"**.
* File template ini berisi baris judul kolom yang baku, misalnya:
`nisn` | `nik` | `nama_lengkap` | `jurusan` | `tahun_lulus` | `no_whatsapp`


2. **Pengisian oleh Staf Sekolah:**
* Staf BKK atau Tata Usaha (TU) menyalin data lulusan dari buku induk atau ekspor Dapodik ke dalam file template tersebut.


3. **Unggah Berkas (Upload/Import):**
* Staf membuka halaman admin, lalu menekan tombol **"Import Data Alumni"** dan memilih file Excel/CSV yang sudah disiapkan.


4. **Validasi & Simpan Otomatis:**
* Sistem backend membaca file tersebut, mengecek duplikasi (misalnya NISN yang sudah terdaftar), lalu memasukkan data yang valid ke database sekaligus.



---

### 3. Solusi Sementara Selama Masa Pengembangan (Development)

Saat proses coding di laptop (sebelum fitur upload selesai):

* Kamu dan rekan tim tetap bisa memasukkan 10–20 data *dummy* menggunakan fitur **database seeding** (misalnya via `prisma/seed.ts`) agar pengerjaan form frontend tidak terhambat.
* Setelah antarmuka dasar selesai, buatkan form upload file sederhana di panel admin agar operator sekolah dapat mengelola data secara mandiri.