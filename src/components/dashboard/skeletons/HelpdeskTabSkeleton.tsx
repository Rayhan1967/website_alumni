import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export const HelpdeskTabSkeleton: React.FC = () => {
  return (
    <div className="space-y-5 sm:space-y-8" aria-busy="true" aria-label="Memuat helpdesk...">
      {/* Header */}
      <div>
        <Skeleton className="h-6 sm:h-7 w-64 bg-slate-200" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Direct Contact Cards (Top 12 cols on desktop) */}
        <div className="order-2 lg:order-1 lg:col-span-12">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 p-4 sm:p-5">
            {[1, 2, 3].map((card) => (
              <div key={card} className="flex items-start gap-3.5">
                <Skeleton className="w-6 h-6 rounded-lg bg-slate-200 shrink-0 mt-0.5" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-4 w-36 bg-slate-200" />
                  <Skeleton className="h-3 w-48 bg-slate-200/70" />
                  <Skeleton className="h-3 w-28 bg-slate-200/90 pt-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Form (Left 6 cols on desktop) */}
        <div className="order-1 lg:order-2 lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3 space-y-1.5">
            <Skeleton className="h-5 w-52 bg-slate-200" />
            <Skeleton className="h-3.5 w-72 bg-slate-200/60" />
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-32 bg-slate-200" />
              <Skeleton className="h-10 w-full bg-slate-100 rounded-xl" />
            </div>

            <div className="space-y-1.5">
              <Skeleton className="h-3 w-36 bg-slate-200" />
              <Skeleton className="h-28 w-full bg-slate-100 rounded-xl" />
            </div>

            <Skeleton className="h-10 w-full bg-slate-200 rounded-xl" />
          </div>
        </div>

        {/* FAQs Accordion Column (Right 6 cols on desktop) */}
        <div className="order-3 lg:order-3 lg:col-span-6 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="w-4 h-4 rounded-full bg-slate-200" />
            <Skeleton className="h-5 w-56 bg-slate-200" />
          </div>

          {[1, 2, 3, 4, 5].map((faq) => (
            <div
              key={faq}
              className="bg-white rounded-xl border border-slate-200 p-4 sm:px-5 sm:py-3.5 flex items-center justify-between gap-3 shadow-xs"
            >
              <Skeleton className="h-4 w-3/4 bg-slate-200" />
              <Skeleton className="w-4 h-4 rounded-full bg-slate-200 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
