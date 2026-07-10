'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Copy, Settings, Globe } from 'lucide-react';

interface HeaderContextMenuProps {
  x: number;
  y: number;
  columnName: string;
  onClose: () => void;
  onSortAsc: () => void;
  onSortDesc: () => void;
  onClearSort: () => void;
  onCopyHeader: () => void;
}

export default function HeaderContextMenu({
  x,
  y,
  columnName,
  onClose,
  onSortAsc,
  onSortDesc,
  onClearSort,
  onCopyHeader,
}: HeaderContextMenuProps) {
  const [fixedColumns, setFixedColumns] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleClickOutside = () => onClose();
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  const isFixed = fixedColumns.has(columnName);

  const handleFix = () => {
    const newFixed = new Set(fixedColumns);
    if (isFixed) {
      newFixed.delete(columnName);
    } else {
      newFixed.add(columnName);
    }
    setFixedColumns(newFixed);
    onClose();
  };

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-xl border border-slate-300 w-56 py-1"
      style={{ top: `${y}px`, left: `${x}px` }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Sort Ascending */}
      <button
        onClick={() => {
          onSortAsc();
          onClose();
        }}
        className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3 text-slate-700"
      >
        <ArrowUp className="w-4 h-4" />
        Sort Ascending
      </button>

      {/* Sort Descending */}
      <button
        onClick={() => {
          onSortDesc();
          onClose();
        }}
        className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3 text-slate-700"
      >
        <ArrowDown className="w-4 h-4" />
        Sort Descending
      </button>

      {/* Clear Sorting */}
      <button
        onClick={() => {
          onClearSort();
          onClose();
        }}
        className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 text-slate-700"
      >
        Clear Sorting
      </button>

      {/* Divider */}
      <div className="h-px bg-slate-200 my-1" />

      {/* Fix */}
      <button
        onClick={handleFix}
        className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between ${
          isFixed ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-100 text-slate-700'
        }`}
      >
        <span>Fix</span>
        <span className="text-xs">→</span>
      </button>

      {/* Unfix */}
      <button
        onClick={handleFix}
        disabled={!isFixed}
        className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between ${
          isFixed ? 'hover:bg-slate-100 text-slate-700' : 'text-slate-400 cursor-not-allowed'
        }`}
      >
        Unfix
      </button>

      {/* Divider */}
      <div className="h-px bg-slate-200 my-1" />

      {/* Copy header */}
      <button
        onClick={() => {
          onCopyHeader();
          onClose();
        }}
        className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3 text-slate-700"
      >
        <Copy className="w-4 h-4" />
        Copy header
      </button>

      {/* Form Setting */}
      <button
        onClick={() => onClose()}
        className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3 text-slate-700"
      >
        <Settings className="w-4 h-4" />
        Form Setting
      </button>

      {/* Translate */}
      <button
        onClick={() => onClose()}
        className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3 text-slate-700"
      >
        <Globe className="w-4 h-4" />
        Translate
      </button>
    </div>
  );
}
