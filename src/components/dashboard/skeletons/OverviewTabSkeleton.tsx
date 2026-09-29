import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export const OverviewTabSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8" aria-busy="true" aria-label="Memuat ringkasan beranda...">
      {/* 1. Banner Tracer Study Skeleton */}
      <div className="rounded-lg overflow-hidden bg-slate-200/90 p-4 sm:p-6 md:p-8 min-h-[140px] flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 animate-shimmer relative">
        <div className="space-y-2.5 max-w-xl flex-1">
          <Skeleton className="h-6 sm:h-7 w-64 sm:w-80 bg-slate-300/90" />
          <Skeleton className="h-4 w-full max-w-lg bg-slate-300/60" />
          <Skeleton className="h-3.5 w-3/4 max-w-md bg-slate-300/50" />
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
          <Skeleton className="h-10 w-full sm:w-44 bg-slate-300/90 rounded-md" />
          <Skeleton className="h-10 w-full sm:w-28 bg-slate-300/60 rounded-md" />
        </div>
      </div>

      {/* 2. Statistik & Status Akun (3 Cards Grid) */}
      <div>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <Skeleton className="h-6 w-56 bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-[14px] p-6 border border-slate-200 min-h-[165px] flex flex-col justify-between relative overflow-hidden shadow-xs"
            >
              {/* Corner badge placeholder */}
              <div className="absolute top-0 right-0 w-10 h-10 bg-slate-100 rounded-bl-[36px] rounded-tr-[14px]" />

              <div className="space-y-2">
                <Skeleton className="h-3.5 w-28 bg-slate-200/90" />
                <Skeleton className="h-6 w-44 bg-slate-200" />
                <Skeleton className="h-3.5 w-52 bg-slate-200/70 mt-1" />
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <Skeleton className="h-3.5 w-32 bg-slate-200/80" />
                <Skeleton className="h-3 w-4 bg-slate-200/80" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Info Loker & Magang Rekomendasi (3 Cards Grid) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-5 w-56 bg-slate-200" />
          <Skeleton className="h-4 w-20 bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl p-5 border border-slate-200 min-h-[200px] flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-2">
                  <Skeleton className="h-5 w-20 rounded-full bg-slate-100" />
                  <Skeleton className="h-4 w-24 bg-slate-100" />
                </div>

                <div className="space-y-1.5">
                  <Skeleton className="h-5 w-44 bg-slate-200" />
                  <Skeleton className="h-3.5 w-32 bg-slate-200/70" />
                </div>

                <div className="space-y-1.5 pt-1">
                  <Skeleton className="h-3.5 w-40 bg-slate-200/60" />
                  <Skeleton className="h-4 w-28 bg-slate-200/80" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <Skeleton className="h-3.5 w-28 bg-slate-200/80" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
