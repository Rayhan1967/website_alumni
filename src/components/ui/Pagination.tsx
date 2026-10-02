import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  itemName?: string;
  className?: string;
  showInfo?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  itemName = 'data',
  className,
  showInfo = true,
}) => {
  if (totalPages <= 1) {
    if (!showInfo || !totalItems || totalItems === 0) return null;
    return (
      <div
        className={cn(
          'flex items-center justify-between py-3.5 px-4 text-xs text-slate-500 font-medium select-none',
          className
        )}
      >
        <div>
          Menampilkan <strong className="text-slate-800">{totalItems}</strong> {itemName}
        </div>
      </div>
    );
  }

  // Calculate item range for information
  const startItem = itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : 1;
  const endItem = itemsPerPage && totalItems ? Math.min(currentPage * itemsPerPage, totalItems) : totalItems;

  // Generate page numbers with intelligent ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 select-none',
        className
      )}
    >
      {/* Information string */}
      {showInfo && totalItems !== undefined ? (
        <div className="text-xs text-slate-500 order-2 sm:order-1 text-center sm:text-left font-medium">
          Menampilkan <strong className="text-slate-800">{startItem}-{endItem}</strong> dari{' '}
          <strong className="text-slate-800">{totalItems}</strong> {itemName}
        </div>
      ) : (
        <div className="order-2 sm:order-1" />
      )}

      {/* Pagination controls */}
      <div className="flex items-center gap-1.5 order-1 sm:order-2">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage <= 1}
          className={cn(
            'inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-2xs',
            currentPage <= 1
              ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-[#0d2346] active:scale-95'
          )}
          aria-label="Halaman Sebelumnya"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Sebelumnya</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, idx) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-8 h-8 flex items-center justify-center text-xs text-slate-400 font-bold tracking-widest"
                >
                  •••
                </span>
              );
            }

            const pageNum = Number(page);
            const isActive = pageNum === currentPage;

            return (
              <button
                key={`page-${pageNum}`}
                type="button"
                onClick={() => handlePageClick(pageNum)}
                className={cn(
                  'w-8 h-8 flex items-center justify-center rounded-xl text-xs font-bold transition-all cursor-pointer',
                  isActive
                    ? 'bg-[#0d2346] text-white shadow-xs scale-105 pointer-events-none'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 active:scale-95'
                )}
                aria-label={`Halaman ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={cn(
            'inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-2xs',
            currentPage >= totalPages
              ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-[#0d2346] active:scale-95'
          )}
          aria-label="Halaman Selanjutnya"
        >
          <span className="hidden sm:inline">Berikutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
