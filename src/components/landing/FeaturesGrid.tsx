import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface FeatureItem {
  title: string;
  description: string;
  iconSrc: string;
  action?: 'survey' | 'dashboard' | 'contact' | 'report';
}

const FEATURES: FeatureItem[] = [
  {
    title: 'Isi Kuesioner',
    description: 'Berikan informasi tentang aktivitas dan kondisi Anda setelah lulus.',
    iconSrc: '/Notepad.svg',
    action: 'survey',
  },
  {
    title: 'Lihat Hasil',
    description: 'Pantau hasil tracer study secara ringkas dan terpercaya.',
    iconSrc: '/Pie chart.svg',
    action: 'report',
  },
  {
    title: 'Data Alumni',
    description: 'Informasi seputar lulusan SMK Sasmita Jaya 2 setiap tahun.',
    iconSrc: '/Student.svg',
    action: 'dashboard',
  },
  {
    title: 'Dunia Kerja',
    description: 'Ketahui peluang kerja dan kerja sama industri terkini.',
    iconSrc: '/Job search.svg',
    action: 'dashboard',
  },
  {
    title: 'Laporan & Statistik',
    description: 'Akses laporan dan data untuk pengembangan sekolah.',
    iconSrc: '/Open book.svg',
    action: 'report',
  },
  {
    title: 'Hubungi Kami',
    description: 'Jika ada pertanyaan atau kendala, silakan hubungi tim kami.',
    iconSrc: '/Phone.svg',
    action: 'contact',
  },
];

export const FeaturesGrid: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleItemClick = (item: FeatureItem) => {
    if (item.action === 'contact') {
      window.location.href = '#kontak';
      return;
    }
    if (item.action === 'report') {
      navigate('/laporan');
      return;
    }
    if (item.action === 'survey') {
      navigate(isAuthenticated ? '/tracer-study' : '/login');
      return;
    }
    // Dashboard or other portal features
    navigate(isAuthenticated ? '/dashboard' : '/login');
  };

  return (
    <section className="relative pt-16 sm:pt-24 pb-12 sm:pb-16 bg-transparent">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching exact attachment typography & text */}
        <div className="text-left mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#182a4a] tracking-tight leading-tight">
            Bersama Membangun <br />
            Masa Depan Lulusan
          </h2>
          <p className="mt-3 text-xs sm:text-sm lg:text-[15px] text-slate-500 font-normal max-w-lg leading-relaxed">
            Satu langkah kecil dari Anda sangat berarti <br className="hidden sm:inline" />
            untuk kemajuan SMK Sasmita Jaya 2
          </p>
        </div>

        {/* 6 Features: Clean, static, clickable to login / dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {FEATURES.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleItemClick(item)}
              className="flex flex-col items-center text-center p-2 cursor-pointer"
            >
              {/* Clean Dark Icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3">
                <img
                  src={item.iconSrc}
                  alt={item.title}
                  className="w-11 h-11 sm:w-13 sm:h-13 object-contain"
                />
              </div>

              {/* Title adjusted */}
              <h3 className="text-sm sm:text-[15px] font-bold text-[#182a4a] mb-1.5 leading-snug">
                {item.title}
              </h3>

              {/* Description adjusted */}
              <p className="text-xs sm:text-[12.5px] text-slate-500 font-normal leading-relaxed max-w-[170px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
