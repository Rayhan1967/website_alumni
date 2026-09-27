import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const AboutTracer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="tentang" className="relative pt-12 sm:pt-16 pb-16 sm:pb-24 bg-transparent">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Label 'Tentang' matching Attachment */}
        <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-wider block mb-1">
          Tentang
        </span>

        {/* Heading matching exact typography */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182a4a] mb-8 tracking-tight">
          Tracer Study
        </h2>

        {/* Narrative Paragraphs with exact wording and formatting from attachment */}
        <div className="space-y-6 text-slate-700 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal max-w-3xl mx-auto">
          <p>
            Tracer Study SMK Sasmita Jaya 2 bertujuan untuk mengetahui keberhasilan
            lulusan di dunia kerja, wirausaha, maupun yang melanjutkan pendidikan.
          </p>
          <p>
            Data ini menjadi evaluasi nyata bagi kualitas pembelajaran di sekolah,
            sekaligus dasar pengembangan kurikulum agar selalu relevan dengan kebutuhan
            industri saat ini.
          </p>
        </div>

        {/* Action Button: Selengkapnya navigating to dedicated detail page */}
        <div className="mt-10">
          <button
            onClick={() => navigate('/tentang')}
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-[#182945] hover:bg-[#132238] text-white font-semibold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <span>Selengkapnya</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
