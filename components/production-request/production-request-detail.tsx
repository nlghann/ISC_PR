'use client';

import { Search } from 'lucide-react';
import { SelectedItem } from '@/app/page';
import { useState, useMemo } from 'react';

interface ProductionRequestDetailProps {
  selectedItem: SelectedItem | null;
}

// Mock production request data mapped to selected items
const mockProductionRequests: Record<string, any[]> = {
  '1': [
    {
      id: 'pr-1-1',
      bomCode: 'BOM',
      prodReqQty: 500,
      realQty: 3340,
      woQty: 16012,
      uom: 'EA',
      vnItemType: '[LA16U30000]',
      salesPrice: '[USD]',
      currency: 'US Dollar',
      customer: '[CKR001R]',
      salesDept: 'CÔNG TY TNHH ISC',
      mfgDept: '[G02]PY1-Kinh doanh RS',
      mfgCategory: '[R] RS',
    },
    {
      id: 'pr-1-2',
      bomCode: 'BOM',
      prodReqQty: 100,
      realQty: 0,
      woQty: 0,
      uom: '공',
      vnItemType: '[MMD3]',
      salesPrice: '[USD]',
      currency: 'US Dollar',
      customer: '[CKR001R]',
      salesDept: 'CÔNG TY TNHH ISC',
      mfgDept: '[G05]PY1-Kinh doanh X2',
      mfgCategory: '[T] Xưởng 2',
    },
  ],
  '2': [
    {
      id: 'pr-2-1',
      bomCode: 'BOM',
      prodReqQty: 50,
      realQty: 0,
      woQty: 0,
      uom: '공',
      vnItemType: '[TMD3]',
      salesPrice: '[USD]',
      currency: 'US Dollar',
      customer: '[CKR001R]',
      salesDept: 'CÔNG TY TNHH ISC',
      mfgDept: '[G05]PY1-Kinh doanh X2',
      mfgCategory: '[T] Xưởng 2',
    },
  ],
  '3': [
    {
      id: 'pr-3-1',
      bomCode: 'BOM',
      prodReqQty: 75,
      realQty: 0,
      woQty: 0,
      uom: '공',
      vnItemType: '[TMD3]',
      salesPrice: '[USD]',
      currency: 'US Dollar',
      customer: '[CKR001R]',
      salesDept: 'CÔNG TY TNHH ISC',
      mfgDept: '[G05]PY1-Kinh doanh X2',
      mfgCategory: '[T] Xưởng 2',
    },
  ],
  '4': [
    {
      id: 'pr-4-1',
      bomCode: 'BOM',
      prodReqQty: 200,
      realQty: 0,
      woQty: 0,
      uom: '공',
      vnItemType: '[TMD3]',
      salesPrice: '[USD]',
      currency: 'US Dollar',
      customer: '[CKR001R]',
      salesDept: 'CÔNG TY TNHH ISC',
      mfgDept: '[G05]PY1-Kinh doanh X2',
      mfgCategory: '[T] Xưởng 2',
    },
  ],
  '5': [
    {
      id: 'pr-5-1',
      bomCode: 'BOM',
      prodReqQty: 150,
      realQty: 0,
      woQty: 0,
      uom: '공',
      vnItemType: '[TMD3]',
      salesPrice: '[USD]',
      currency: 'US Dollar',
      customer: '[CKR001R]',
      salesDept: 'CÔNG TY TNHH ISC',
      mfgDept: '[G05]PY1-Kinh doanh X2',
      mfgCategory: '[T] Xưởng 2',
    },
  ],
};

const statusColors: Record<string, string> = {
  Pending: 'bg-amber-50 text-amber-700 border-amber-300',
  'In Progress': 'bg-blue-50 text-blue-700 border-blue-300',
  Completed: 'bg-green-50 text-green-700 border-green-300',
  Hold: 'bg-red-50 text-red-700 border-red-300',
};

export default function ProductionRequestDetail({
  selectedItem,
}: ProductionRequestDetailProps) {
  const [filters, setFilters] = useState({
    woId: '',
    prodLevel: '',
    status: '',
    itemCode: '',
  });

  // Get data for selected item
  const data = useMemo(() => {
    if (!selectedItem) return [];
    return mockProductionRequests[selectedItem.id] || [];
  }, [selectedItem]);

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return (
        (filters.woId === '' ||
          item.woId.toLowerCase().includes(filters.woId.toLowerCase())) &&
        (filters.prodLevel === '' ||
          item.prodLevel.toString().includes(filters.prodLevel)) &&
        (filters.status === '' ||
          item.status.toLowerCase().includes(filters.status.toLowerCase())) &&
        (filters.itemCode === '' ||
          item.itemCode.toLowerCase().includes(filters.itemCode.toLowerCase()))
      );
    });
  }, [data, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  if (!selectedItem) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-400">
        <div className="text-center">
          <div className="mb-3 text-4xl">📋</div>
          <p className="font-medium">Select an item from the left table</p>
          <p className="text-sm mt-1">to view production requests</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-x-auto overflow-y-auto flex flex-col">
      {/* Selected item info */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs flex-shrink-0">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-slate-600">Production Req. No:</span>{' '}
            <span className="font-semibold text-slate-900">
              {selectedItem.itemCode.substring(0, 16)}001-62 | Release
            </span>
          </div>
        </div>
      </div>

      <table className="w-full border-collapse min-w-max">
        {/* Header with filters */}
        <thead>
          {/* Column names */}
          <tr className="border-b-2 border-slate-300 bg-slate-50 sticky top-0 z-10">
            <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-r border-slate-200">
              BOM
            </th>
            <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-r border-slate-200">
              Production Req. Qty. *
            </th>
            <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-r border-slate-200">
              Real Qty
            </th>
            <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-r border-slate-200">
              Work order qty
            </th>
            <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-r border-slate-200">
              UoM
            </th>
            <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-r border-slate-200">
              VN Item Type *
            </th>
            <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-r border-slate-200">
              Sales Price
            </th>
            <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-r border-slate-200">
              Currency *
            </th>
            <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-r border-slate-200">
              Customer
            </th>
            <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-r border-slate-200">
              Sales Dept. *
            </th>
            <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-r border-slate-200">
              Manufacturing Dept. *
            </th>
            <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-r border-slate-200">
              Manufacturing Category
            </th>
            <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700">
              Type (large)
            </th>
          </tr>

          {/* Filter inputs */}
          <tr className="border-b border-slate-200 bg-white sticky top-10 z-10">
            <th className="px-2 py-2 border-r border-slate-200">
              <div className="flex items-center gap-1">
                <Search className="w-3 h-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter..."
                  value={filters.woId}
                  onChange={(e) => handleFilterChange('woId', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </th>
            <th className="px-2 py-2 border-r border-slate-200">
              <div className="flex items-center gap-1">
                <Search className="w-3 h-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter..."
                  value={filters.prodLevel}
                  onChange={(e) =>
                    handleFilterChange('prodLevel', e.target.value)
                  }
                  className="w-full px-2 py-1 text-xs border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </th>
            <th className="px-2 py-2 border-r border-slate-200">
              <div className="flex items-center gap-1">
                <Search className="w-3 h-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter..."
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </th>
            <th className="px-2 py-2 border-r border-slate-200">
              <div className="flex items-center gap-1">
                <Search className="w-3 h-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter..."
                  value={filters.itemCode}
                  onChange={(e) =>
                    handleFilterChange('itemCode', e.target.value)
                  }
                  className="w-full px-2 py-1 text-xs border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </th>
            <th colSpan={6} />
          </tr>
        </thead>

        {/* Data rows */}
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={13} className="px-4 py-8 text-center text-slate-500">
                No production requests found
              </td>
            </tr>
          ) : (
            filteredData.map((item, idx) => (
              <tr
                key={item.id}
                className={`border-b border-slate-200 cursor-pointer transition-colors ${
                  idx % 2 === 0
                    ? 'bg-white hover:bg-slate-50'
                    : 'bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <td className="px-3 py-2 text-sm border-r border-slate-200">
                  <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800 border border-amber-300">
                    {item.bomCode}
                  </span>
                </td>
                <td className="px-3 py-2 text-sm text-slate-700 border-r border-slate-200 text-right">
                  {item.prodReqQty}
                </td>
                <td className="px-3 py-2 text-sm text-slate-700 border-r border-slate-200 text-right">
                  {item.realQty}
                </td>
                <td className="px-3 py-2 text-sm text-slate-700 border-r border-slate-200 text-right">
                  {item.woQty}
                </td>
                <td className="px-3 py-2 text-sm text-slate-700 border-r border-slate-200">
                  {item.uom}
                </td>
                <td className="px-3 py-2 text-sm text-slate-700 border-r border-slate-200">
                  {item.vnItemType}
                </td>
                <td className="px-3 py-2 text-sm text-slate-700 border-r border-slate-200">
                  {item.salesPrice}
                </td>
                <td className="px-3 py-2 text-sm text-slate-700 border-r border-slate-200">
                  {item.currency}
                </td>
                <td className="px-3 py-2 text-sm text-slate-700 border-r border-slate-200">
                  {item.customer}
                </td>
                <td className="px-3 py-2 text-sm text-slate-700 border-r border-slate-200">
                  {item.salesDept}
                </td>
                <td className="px-3 py-2 text-sm text-slate-700 border-r border-slate-200">
                  {item.mfgDept}
                </td>
                <td className="px-3 py-2 text-sm text-slate-700 border-r border-slate-200">
                  {item.mfgCategory}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="border-t border-slate-200 px-4 py-3 bg-slate-50 flex items-center justify-between text-sm text-slate-600">
        <span>{filteredData.length} items</span>
        <div className="flex items-center gap-2">
          <button className="px-2 py-1 hover:bg-slate-200 rounded transition-colors">
            ‹
          </button>
          <span>1</span>
          <button className="px-2 py-1 hover:bg-slate-200 rounded transition-colors">
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
