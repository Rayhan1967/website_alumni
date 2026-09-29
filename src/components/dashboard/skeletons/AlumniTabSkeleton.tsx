import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export const AlumniTabSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-6" aria-busy="true" aria-label="Memuat direktori alumni...">
      {/* Header */}
      <div>
        <Skeleton className="h-6 sm:h-7 w-72 sm:w-96 bg-slate-200" />
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <Skeleton className="h-10 flex-1 bg-slate-100 rounded-xl" />
        <Skeleton className="h-10 w-full sm:w-56 bg-slate-100 rounded-xl" />
      </div>

      {/* Alumni Cards Grid (6 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col justify-between min-h-[190px]"
          >
            <div className="flex items-start gap-3.5">
              <Skeleton className="w-12 h-12 rounded-full bg-slate-200 shrink-0" />
              <div className="space-y-1.5 flex-1 min-w-0">
                <Skeleton className="h-4 w-32 bg-slate-200" />
                <Skeleton className="h-3 w-28 bg-slate-200/70" />
                <Skeleton className="h-2.5 w-20 bg-slate-200/50" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
              <Skeleton className="h-3.5 w-40 bg-slate-200/80" />
              <Skeleton className="h-3.5 w-32 bg-slate-200/60" />
              <Skeleton className="h-3 w-24 bg-slate-200/50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
