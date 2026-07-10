'use client';

import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface FilterState {
  isDelivery: string;
  status: string;
  hqDestination: string;
  orderFrom: string;
  orderDate: [string, string]; // [from, to]
  deliveryRequestDate: string;
  typeLarge: string;
  typeSmall: string;
  partType: string;
  dept: string;
  drawingNo: string;
  hqType: string;
  rAnd: string;
  hqPioNumber: string;
}

interface FilterField {
  key: keyof FilterState;
  label: string;
  type: 'text' | 'select' | 'date' | 'dateRange';
  options?: string[];
}

interface FilterPanelProps {
  onClose: () => void;
  onApply?: (filters: FilterState) => void;
}

const allFields: FilterField[] = [
  { key: 'isDelivery', label: 'Is Delivery', type: 'select', options: ['Yes', 'No'] },
  { key: 'status', label: 'Status', type: 'select', options: ['Pending', 'Approved', 'Completed'] },
  { key: 'hqDestination', label: 'HQ Destination', type: 'select' },
  { key: 'orderFrom', label: 'Order From', type: 'select', options: ['HQ', 'Branch'] },
  { key: 'orderDate', label: 'Order Date', type: 'dateRange' },
  { key: 'deliveryRequestDate', label: 'Delivery Request Date', type: 'date' },
  { key: 'typeLarge', label: 'Type (Large)', type: 'select' },
  { key: 'typeSmall', label: 'Type (small)', type: 'select' },
  { key: 'partType', label: 'Part type', type: 'select' },
  { key: 'dept', label: 'Dept', type: 'text' },
  { key: 'drawingNo', label: 'Drawing No', type: 'text' },
  { key: 'hqType', label: 'HQ Type', type: 'select' },
  { key: 'rAnd', label: 'R&R', type: 'select' },
  { key: 'hqPioNumber', label: 'HQ P/O Number', type: 'text' },
];

export default function FilterPanel({ onClose, onApply }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    isDelivery: '',
    status: 'Pending',
    hqDestination: '',
    orderFrom: 'HQ',
    orderDate: ['2026-07-01', '2026-07-08'],
    deliveryRequestDate: '',
    typeLarge: '',
    typeSmall: '',
    partType: '',
    dept: '',
    drawingNo: '',
    hqType: '',
    rAnd: '',
    hqPioNumber: '',
  });

  // Track which fields are visible
  const [visibleFields, setVisibleFields] = useState<Set<keyof FilterState>>(
    new Set(['status', 'orderFrom', 'orderDate', 'dept', 'drawingNo'])
  );

  const [showFieldManager, setShowFieldManager] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string | [string, string]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleFieldVisibility = (fieldKey: keyof FilterState) => {
    const newVisible = new Set(visibleFields);
    if (newVisible.has(fieldKey)) {
      newVisible.delete(fieldKey);
    } else {
      newVisible.add(fieldKey);
    }
    setVisibleFields(newVisible);
  };

  const getFieldsToDisplay = () => {
    return allFields.filter(field => visibleFields.has(field.key));
  };

  const renderFilterField = (field: FilterField) => {
    if (field.type === 'text') {
      return (
        <input
          type="text"
          value={filters[field.key] as string}
          onChange={(e) => handleFilterChange(field.key, e.target.value)}
          placeholder={field.label}
          className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      );
    }

    if (field.type === 'dateRange') {
      const [from, to] = filters[field.key] as [string, string];
      return (
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={from}
            onChange={(e) => handleFilterChange(field.key, [e.target.value, to])}
            className="flex-1 px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-slate-400">-</span>
          <input
            type="date"
            value={to}
            onChange={(e) => handleFilterChange(field.key, [from, e.target.value])}
            className="flex-1 px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      );
    }

    if (field.type === 'date') {
      return (
        <input
          type="date"
          value={filters[field.key] as string}
          onChange={(e) => handleFilterChange(field.key, e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      );
    }

    return (
      <select
        value={filters[field.key] as string}
        onChange={(e) => handleFilterChange(field.key, e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="">Select...</option>
        {field.options?.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    );
  };

  const displayFields = getFieldsToDisplay();

  return (
    <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-slate-200 z-50 overflow-hidden" style={{ width: '500px' }}>
      {/* Header with Manage Fields */}
      <div className="p-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <span className="text-xs font-medium text-slate-700">Filter ({displayFields.length} fields)</span>
        <div className="relative">
          <button
            onClick={() => setShowFieldManager(!showFieldManager)}
            className="px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded font-medium transition-colors flex items-center gap-1"
          >
            <ChevronDown className="w-3 h-3" />
            Manage Fields
          </button>

          {/* Field Manager Dropdown */}
          {showFieldManager && (
            <div className="absolute top-full right-0 mt-1 bg-white border border-slate-300 rounded shadow-md w-48 z-50">
              <div className="p-2 max-h-60 overflow-y-auto space-y-1">
                {allFields.map(field => (
                  <label key={field.key} className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-100 rounded cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={visibleFields.has(field.key)}
                      onChange={() => toggleFieldVisibility(field.key)}
                      className="w-3 h-3 accent-blue-600"
                    />
                    <span className="text-slate-700">{field.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Fields */}
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {displayFields.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4">No fields selected. Click "Manage Fields" to add fields.</p>
        ) : (
          displayFields.map((field, idx) => (
            <div key={field.key}>
              <label className="block text-xs font-medium text-slate-700 mb-1">{field.label}</label>
              {renderFilterField(field)}
            </div>
          ))
        )}
      </div>

      {/* Close Button */}
      <div className="border-t border-slate-200 p-3 bg-slate-50 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-sm font-medium transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
