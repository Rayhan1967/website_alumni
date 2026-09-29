import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export const CekIjazahTabSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-6" aria-busy="true" aria-label="Memuat status ijazah...">
      {/* Header */}
      <div>
        <Skeleton className="h-6 sm:h-7 w-72 sm:w-80 bg-slate-200" />
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <Skeleton className="h-10 flex-1 bg-slate-100 rounded-xl" />
        <Skeleton className="h-10 w-full sm:w-32 bg-slate-200 rounded-xl" />
      </div>

      {/* Main Status Tracker Card */}
      <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-5 sm:space-y-6">
        {/* Profile & Status Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-24 bg-slate-200/60" />
            <Skeleton className="h-5 sm:h-6 w-52 bg-slate-200" />
            <Skeleton className="h-3.5 w-64 bg-slate-200/70" />
          </div>

          <Skeleton className="h-7 w-32 rounded-full bg-slate-100 shrink-0" />
        </div>

        {/* 4 Timeline Milestones */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2"
            >
              <Skeleton className="w-5 h-5 mx-auto rounded-full bg-slate-200" />
              <Skeleton className="h-3.5 w-24 mx-auto bg-slate-200" />
              <Skeleton className="h-2.5 w-16 mx-auto bg-slate-200/60" />
            </div>
          ))}
        </div>

        {/* Nomor Ijazah & Barcode Box */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 w-full sm:w-auto">
            <Skeleton className="h-3.5 w-60 bg-slate-200" />
            <Skeleton className="h-3.5 w-52 bg-slate-200" />
            <Skeleton className="h-3 w-64 bg-slate-200/70" />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Skeleton className="w-14 h-14 bg-slate-200 rounded-xl" />
            <Skeleton className="h-8 w-36 bg-slate-200 rounded-xl" />
          </div>
        </div>

        {/* Checklist Persyaratan */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-48 bg-slate-200" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="p-3 flex items-center gap-2.5 rounded-xl bg-slate-50 border border-slate-100"
              >
                <Skeleton className="w-4 h-4 rounded-full bg-slate-200 shrink-0" />
                <Skeleton className="h-3.5 w-48 bg-slate-200/80" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
