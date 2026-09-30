import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import {
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  ShieldCheck,
  FileText,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Building2,
  Headphones,
  Check,
} from 'lucide-react';

export const AboutDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-slate-800">
      
      {/* Top Header / Sticky Navbar */}
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200/60 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800">Tentang Tracer Study</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner Header */}
      <section className="bg-gradient-to-r from-[#102a4e] via-[#1a3d6d] to-[#102a4e] text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              Tentang Tracer Study <br className="hidden sm:inline" />
              SMK Sasmita Jaya 2 Pamulang
            </h1>
          </div>
        </div>

        {/* Subtle Background Pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-blue-400/10 blur-3xl pointer-events-none" />
      </section>

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Article Column (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview Section */}
            <article className="p-6 sm:p-9 space-y-6">
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Mengapa Tracer Study Sangat Penting?
                </h2>
              </div>

              <div className="prose max-w-none text-slate-600 text-sm sm:text-[15px] leading-relaxed space-y-4">
                <p>
                  Tracer Study SMK Sasmita Jaya 2 Pamulang merupakan survei longitudinal terstruktur yang diselenggarakan secara berkala oleh <strong>Bursa Kerja Khusus (BKK)</strong> dan Tim Penjaminan Mutu Pendidikan Sekolah.
                </p>
                <p>
                  Sesuai dengan amanat <strong>Perpres No. 68 Tahun 2022</strong> tentang Revitalisasi Pendidikan Vokasi dan Pelatihan Vokasi, keberhasilan sebuah SMK tidak hanya diukur dari angka kelulusan, melainkan dari <em>keterserapan lulusan</em> di dunia kerja, keberhasilan berwirausaha, serta kesiapan melanjutkan pendidikan ke jenjang yang lebih tinggi.
                </p>
                <p className="border-l-4 border-blue-900 pl-4 py-1.5 bg-blue-50/50 font-medium text-slate-800">
                  Data yang Anda isikan menjadi kompas strategis bagi sekolah dalam mengevaluasi kurikulum, memperbarui fasilitas laboratorium kejuruan, dan menjalin kemitraan rekrutmen dengan industri-industri terkemuka.
                </p>
              </div>
            </article>

            {/* Tahapan Alur Pengisian */}
            <section className="p-6 sm:p-9 space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                  Alur 5 Langkah Pengisian Kuesioner
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-7 h-7 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Validasi Identitas Alumni</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Memastikan nama lengkap, NIK, NISN, jurusan, angkatan kelulusan, dan nomor WhatsApp aktif.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-7 h-7 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Pemilihan Status Kegiatan Utama</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Memilih kategori: Bekerja, Melanjutkan Pendidikan (Kuliah), Wirausaha, atau Belum Bekerja / Mencari Kerja.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-7 h-7 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Rincian Informasi Profesi & Institusi</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Mengisi data instansi tempat bekerja/kampus/usaha serta tingkat kesesuaian dengan jurusan SMK.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-7 h-7 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Evaluasi Pembelajaran & Umpan Balik</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Memberikan rating skor relevansi materi sekolah serta saran untuk pengembangan fasilitas & kurikulum.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    5
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Finalisasi & Unduh Bukti Pengisian</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Memeriksa ringkasan isian dan mengunduh Tanda Bukti Resmi ber-QR Code untuk syarat pengambilan ijazah.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Keamanan & Kerahasiaan Data */}
            <div className="bg-blue-50/50 text-slate-900 p-6 sm:p-8 flex items-start gap-4 border border-x-1 blue-950">
              <div className="w-16 h-16 flex items-center justify-center shrink-0 p-2.5">
                <img src="/Shield.svg" alt="Keamanan Data" className="w-7 h-7 object-contain text-blue-900" />
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-bold text-slate-900">
                  Jaminan Kerahasiaan & Keamanan Data Alumni
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Seluruh data identitas pribadi, kontak perusahaan/atasan, dan informasi pendapatan yang Anda masukkan dilindungi dengan standar keamanan enkripsi. Data hanya dipergunakan secara agregat untuk keperluan riset pendidikan sekolah dan pelaporan resmi Direktorat Jenderal Pendidikan Vokasi.
                </p>
              </div>
            </div>

          </div>

          {/* Right Sidebar Column (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Action CTA Card */}
            <div className="p-6 space-y-4 text-center">
              <div className="w-14 h-14 rounded-ful text-blue-900 flex items-center justify-center mx-auto shadow-xs">
                <img src="/icon-login-btn.png" alt="Isi Kuisioner" className="w-7 h-7 object-contain" />
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900">
                  {isAuthenticated ? 'Lanjutkan Pengisian' : 'Mulai Tracer Study Sekarang'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Luangkan waktu 3–5 menit untuk mengisi data karir dan studi terbaru Anda.
                </p>
              </div>

              <button
                onClick={() => navigate(isAuthenticated ? '/tracer-study' : '/login')}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#132238] hover:bg-[#1a3050] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>{isAuthenticated ? 'Buka Formulir Kuesioner' : 'Login'}</span>
                <ArrowRight className="w-4 h-4 text-white-400" />
              </button>
            </div>

            {/* Quick Summary Highlights */}
            <div className="bg-white rounded-md p-5 border border-slate-200 shadow-xs space-y-3">
              <h4 className="font-bold text-xs text-slate-900 tracking-wider border-b border-slate-100 pb-2">
                Fakta Singkat Alumni
              </h4>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Total Alumni Terdaftar</span>
                  <span className="font-bold text-slate-900">3.500+ Orang</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tingkat Keterserapan Kerja</span>
                  <span className="font-bold text-slate-900">87,5 %</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Melanjutkan Kuliah</span>
                  <span className="font-bold text-slate-900">12,5 %</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Waktu Pengisian</span>
                  <span className="font-bold text-slate-900">3 - 5 Menit</span>
                </div>
              </div>
            </div>

            {/* Helpdesk Contact Box */}
            <div className="bg-slate-50 rounded-md p-5 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-slate-950 font-bold text-sm">
                <Headphones className="w-4 h-4 text-slate-600" />
                <span>Butuh Bantuan?</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Jika mengalami kendala NISN atau verifikasi data akun, silakan hubungi tim Helpdesk kami.
              </p>
              <a
                href="https://wa.me/6281298765432?text=Halo%20Helpdesk%20Tracer%20Study%20SMK%20Sasmita%20Jaya%202"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition shadow-xs"
              >
                <span>Hubungi Helpdesk</span>
              </a>
            </div>

          </aside>

        </div>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};
