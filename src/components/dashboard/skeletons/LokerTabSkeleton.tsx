import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export const LokerTabSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-6" aria-busy="true" aria-label="Memuat lowongan kerja...">
      {/* Header */}
      <div>
        <Skeleton className="h-6 sm:h-7 w-72 sm:w-96 bg-slate-200" />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <Skeleton className="h-10 flex-1 bg-slate-100 rounded-xl" />
        <Skeleton className="h-10 w-full sm:w-56 bg-slate-100 rounded-xl" />
      </div>

      {/* Jobs Grid (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-3.5 sm:space-y-4 min-h-[220px]"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <Skeleton className="h-5 w-20 rounded-md bg-slate-100" />
                <Skeleton className="h-4 w-28 bg-slate-100" />
              </div>

              <div className="space-y-1.5">
                <Skeleton className="h-5 w-3/4 bg-slate-200" />
                <Skeleton className="h-4 w-44 bg-slate-200/70" />
              </div>

              <div className="space-y-1.5 pt-1">
                <Skeleton className="h-3.5 w-36 bg-slate-200/60" />
                <Skeleton className="h-4 w-28 bg-slate-200/80" />
              </div>

              {/* Major tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <Skeleton className="h-4.5 w-16 rounded-full bg-slate-100" />
                <Skeleton className="h-4.5 w-20 rounded-full bg-slate-100" />
                <Skeleton className="h-4.5 w-14 rounded-full bg-slate-100" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <Skeleton className="h-9 flex-1 bg-slate-100 rounded-xl" />
              <Skeleton className="h-9 flex-1 bg-slate-200 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
