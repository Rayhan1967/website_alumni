import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Printer } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="kontak" className="bg-[#0b192e] text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top/Middle row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pb-10 border-b border-slate-800">
          
          {/* Logo prominently sized */}
          <Link
            to="/"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center text-left cursor-pointer mx-auto md:mx-0"
          >
            <img
              src="/logo-smk-dark.png"
              alt="Logo SMK Sasmita Jaya 2"
              className="h-16 sm:h-20 w-auto object-contain brightness-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo-smk-dark.png';
              }}
            />
          </Link>

          {/* School Address & Contacts (4 clean rows) */}
          <div className="flex flex-col items-center md:items-start text-xs text-slate-400 max-w-md space-y-2 leading-relaxed mx-auto md:mx-0">
            {/* 1. Alamat */}
            <div className="flex items-start gap-2.5 text-left w-full max-w-xs sm:max-w-sm md:max-w-md">
              <MapPin className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
              <span className="text-left">
                Jl. Surya Kencana No. 1, Pamulang Barat, Kec. Pamulang, Kota Tangerang Selatan, Banten 15417
              </span>
            </div>

            {/* 2. Email */}
            <a
              href="mailto:sasmitajaya2pml@gmail.com"
              className="inline-flex items-center gap-2.5 hover:text-white transition-colors text-slate-300 w-full max-w-xs sm:max-w-sm md:max-w-md"
            >
              <Mail className="w-4 h-4 shrink-0 text-slate-400" />
              <span>sasmitajaya2pml@gmail.com</span>
            </a>

            {/* 3. Telepon */}
            <a
              href="tel:0217427375"
              className="inline-flex items-center gap-2.5 hover:text-white transition-colors text-slate-300 w-full max-w-xs sm:max-w-sm md:max-w-md"
            >
              <Phone className="w-4 h-4 shrink-0 text-slate-400" />
              <span>(021) 7427375</span>
            </a>

            {/* 4. Fax */}
            <div className="inline-flex items-center gap-2.5 text-slate-300 w-full max-w-xs sm:max-w-sm md:max-w-md">
              <Printer className="w-4 h-4 shrink-0 text-slate-400" />
              <span>Fax: (021) 7412491</span>
            </div>
          </div>

          {/* Social Icons & Copyright */}
          <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right mx-auto md:mx-0">
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10  text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10  text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
            <p className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} SMK Sasmita Jaya 2. All rights reserved.
            </p>
          </div>

        </div>

        {/* Bottom micro note */}
        <div className="pt-6 text-center text-[11px] text-slate-500">
          Sistem Informasi Alumni & Tracer Study Vokasi
        </div>

      </div>
    </footer>
  );
};
