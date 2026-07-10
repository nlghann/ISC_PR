'use client';

import { ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) {
  const pageOptions = [20, 50, 100, 200, 500];
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPages = 5;
    
    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, 2, 3, 4, 5);
      if (totalPages > 5) {
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-slate-200">
      {/* Left: Rows per page */}
      <div className="flex items-center gap-3">
        {pageOptions.map((option) => (
          <button
            key={option}
            onClick={() => onRowsPerPageChange(option)}
            className={`px-2 py-1 text-sm font-medium transition-colors ${
              rowsPerPage === option
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {option}
          </button>
        ))}
        <button
          onClick={() => onRowsPerPageChange(totalItems)}
          className={`px-2 py-1 text-sm font-medium transition-colors ${
            rowsPerPage === totalItems
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All
        </button>
      </div>

      {/* Right: Page info and navigation */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">
          page <span className="font-medium text-slate-900">#{currentPage}</span> total{' '}
          <span className="font-medium text-slate-900">{totalPages}</span> (
          <span className="font-medium text-slate-900">{totalItems}</span> items)
        </span>
        
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, idx) => (
            <div key={idx}>
              {page === '...' ? (
                <span className="px-2 py-1 text-slate-400">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page as number)}
                  className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {page}
                </button>
              )}
            </div>
          ))}
          
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="ml-2 p-1 text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
