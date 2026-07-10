'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface ColumnFilterPopupProps {
  column: string;
  data: string[];
  onApply: (selectedValues: string[]) => void;
  onClose: () => void;
}

export default function ColumnFilterPopup({
  column,
  data,
  onApply,
  onClose,
}: ColumnFilterPopupProps) {
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set(data));

  // Get unique values from data
  const uniqueValues = Array.from(new Set(data)).sort();
  
  // Filter unique values based on search text
  const filteredValues = uniqueValues.filter(value =>
    value.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectAll = () => {
    setSelected(new Set(uniqueValues));
  };

  const handleClearAll = () => {
    setSelected(new Set());
  };

  const toggleValue = (value: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(value)) {
      newSelected.delete(value);
    } else {
      newSelected.add(value);
    }
    setSelected(newSelected);
  };

  const handleApply = () => {
    onApply(Array.from(selected));
  };

  return (
    <div className="absolute top-full left-0 z-50 bg-white shadow-lg border border-slate-300 w-96 mt-1 flex flex-col" style={{ maxHeight: '450px' }}>
      {/* Search Box */}
      <div className="px-4 py-3 border-b border-slate-200">
        <div className="flex items-center gap-2 px-3 py-2.5 border-2 border-blue-400 rounded bg-white">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 text-sm focus:outline-none bg-transparent"
          />
          {searchText && (
            <button
              onClick={() => setSearchText('')}
              className="p-1 hover:bg-slate-100 rounded"
            >
              <X className="w-3 h-3 text-slate-400" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Options */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="space-y-2">
          {/* Select All */}
          <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded">
            <input
              type="checkbox"
              checked={selected.size === uniqueValues.length}
              onChange={handleSelectAll}
              className="w-4 h-4 rounded border-slate-300 text-blue-600"
            />
            <span className="text-sm text-slate-800 font-medium">Select All</span>
          </label>

          {/* Divider */}
          <div className="h-px bg-slate-200 my-2" />

          {/* Filter Items */}
          {filteredValues.length > 0 ? (
            filteredValues.map((value) => (
              <label key={value} className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded">
                <input
                  type="checkbox"
                  checked={selected.has(value)}
                  onChange={() => toggleValue(value)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600"
                />
                <span className="text-sm text-slate-800">{value || '(Empty)'}</span>
              </label>
            ))
          ) : (
            <div className="text-sm text-slate-500 py-6 text-center">
              No matching items
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-200 bg-white flex gap-3 justify-center">
        <button
          onClick={onClose}
          className="px-6 py-2 text-sm font-medium text-slate-800 border border-slate-300 rounded hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          className="px-6 py-2 text-sm font-medium text-slate-800 border border-slate-300 rounded hover:bg-slate-50 transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
}
