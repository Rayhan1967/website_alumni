import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import {
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  Info,
  Sparkles,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<'nisn' | 'nik'>('nisn');
  const [identifier, setIdentifier] = useState('0061234567');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLoginMethodChange = (method: 'nisn' | 'nik') => {
    setLoginMethod(method);
    setIdentifier(method === 'nisn' ? '0061234567' : '3274012304050001');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('Harap masukkan NISN atau NIK Anda.');
      return;
    }

    setLoading(true);
    try {
      await login(identifier, 'alumni');
      navigate('/dashboard');
    } catch {
      setError('Data tidak ditemukan. Silakan periksa kembali NISN/NIK Anda.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    setLoginMethod('nisn');
    setIdentifier('0051234567');
  };

  return (
    <div className="min-h-screen bg-[#edf2f7] flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden">
      
      {/* Static Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
        <img
          src="/background-decoration.svg"
          alt="Decoration"
          className="w-full h-full object-cover opacity-[0.06] -scale-x-100"
        />
      </div>

      {/* Main Split Login Card without animations */}
      <div className="relative z-10 w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200/90 grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Dark Navy Branding & Guarantee Panel (5 cols) */}
        <div className="lg:col-span-5 bg-[#122e5d] text-white p-8 sm:p-10 lg:p-11 flex flex-col justify-between relative overflow-hidden">
          
          {/* Seigaiha Wave Pattern Overlay */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.14] pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="login-seigaiha" width="60" height="30" patternUnits="userSpaceOnUse">
                <g stroke="#ffffff" strokeWidth="1.2" fill="none">
                  <circle cx="30" cy="0" r="30" />
                  <circle cx="30" cy="0" r="24" />
                  <circle cx="30" cy="0" r="18" />
                  <circle cx="30" cy="0" r="12" />
                  <circle cx="30" cy="0" r="6" />
                  <circle cx="0" cy="30" r="30" />
                  <circle cx="0" cy="30" r="24" />
                  <circle cx="0" cy="30" r="18" />
                  <circle cx="0" cy="30" r="12" />
                  <circle cx="0" cy="30" r="6" />
                  <circle cx="60" cy="30" r="30" />
                  <circle cx="60" cy="30" r="24" />
                  <circle cx="60" cy="30" r="18" />
                  <circle cx="60" cy="30" r="12" />
                  <circle cx="60" cy="30" r="6" />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#login-seigaiha)" />
          </svg>

          {/* Top Brand Logo */}
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 cursor-pointer group">
              <img
                src="/favicon.png"
                alt="Logo SMK Sasmita Jaya 2"
                className="w-10 h-10 object-contain drop-shadow-md"
              />
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-white leading-none tracking-tight group-hover:text-blue-200 transition-colors">
                  SMK SASMITA JAYA 2
                </h3>
                <p className="text-[9px] text-slate-300 font-medium tracking-wider uppercase mt-1">
                  TRACER STUDY & ALUMNI
                </p>
              </div>
            </Link>
          </div>

          {/* Middle Content */}
          <div className="relative z-10 my-8 sm:my-10 space-y-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
              Selamat datang kembali, pejuang pendidikan kejuruan.
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              Masuk menggunakan NISN atau NIK untuk memulai atau melanjutkan pengisian tracer study alumni tahun 2026.
            </p>

            {/* Privacy callout box */}
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-left space-y-1 mt-6">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
                <span>Data Anda aman</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Seluruh jawaban tidak dipublikasikan & dilindungi sesuai UU Perlindungan Data.
              </p>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="relative z-10 text-[10px] text-slate-400">
            © Direktorat SMK • SMK Sasmita Jaya 2
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Login Form (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
          
          <div>
            {/* Top Back Link */}
            <div className="flex items-center justify-between mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kembali ke beranda</span>
              </Link>

              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 uppercase tracking-wider">
                Portal Resmi 2026
              </span>
            </div>

            {/* Step Label & Title */}
            <div className="mb-6">
              <span className="text-[11px] font-extrabold text-slate-900 tracking-wider block uppercase mb-1">
                LANGKAH 1 DARI 2
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182a4a] tracking-tight">
                Masuk Alumni
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
                Pilih metode login menggunakan NISN atau NIK kependudukan Anda.
              </p>
            </div>

            {/* Login Method Switcher */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                type="button"
                onClick={() => handleLoginMethodChange('nisn')}
                className={`py-2 px-3 rounded-xl text-xs font-bold text-center cursor-pointer ${
                  loginMethod === 'nisn'
                    ? 'border-2 border-[#182a4a] text-[#182a4a] bg-blue-50/40 shadow-xs'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Login pakai NISN
              </button>

              <button
                type="button"
                onClick={() => handleLoginMethodChange('nik')}
                className={`py-2 px-3 rounded-xl text-xs font-bold text-center cursor-pointer ${
                  loginMethod === 'nik'
                    ? 'border-2 border-[#182a4a] text-[#182a4a] bg-blue-50/40 shadow-xs'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Login pakai NIK
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                {error}
              </div>
            )}

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  {loginMethod === 'nisn' ? 'NISN (10 digit)' : 'NIK KTP (16 digit)'}
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={loginMethod === 'nisn' ? 'Contoh: 0061234567' : 'Contoh: 3274012304050001'}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#182a4a] focus:border-transparent"
                  required
                />
              </div>


              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#182945] hover:bg-[#122038] text-white font-bold text-sm tracking-wide shadow-md cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Memproses...</span>
                ) : (
                  <>
                    <span>Masuk & Mulai Survey</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Demo Fill & Helpdesk */}
          <div className="mt-8 pt-4 border-t border-slate-100 space-y-3 text-center">
            {/* 1-Click Demo Shortcut */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-400 text-[11px] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                1-Click Demo:
              </span>
              <button
                type="button"
                onClick={handleQuickDemo}
                className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-[11px]"
              >
                Alumni (Ahmad Dani)
              </button>
            </div>

            {/* WA Helpdesk Link */}
            <p className="text-xs text-slate-500">
              Butuh bantuan?{' '}
              <a
                href="https://wa.me/6281298765432?text=Halo%20BKK%20SMK%20Sasmita%20Jaya%202,%20saya%20butuh%20bantuan%20login%20Tracer%20Study"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#182a4a] hover:text-blue-600 underline"
              >
                Hubungi WA Helpdesk BKK
              </a>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
