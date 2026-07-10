'use client';

import { Search, ChevronDown } from 'lucide-react';

interface ProductionRequestTableProps {
  filters: {
    dueDate: string;
    itemCode: string;
    itemName: string;
  };
  setFilters: (filters: any) => void;
}

const mockData = [
  {
    id: 1,
    dueDate: '2026-07-04',
    itemCode: 'B2845_93030',
    itemName: 'RETAINER',
    planQty: 1557,
    remainQty: 1557,
    prodLot: 'M202607030',
  },
  {
    id: 2,
    dueDate: '2026-07-01',
    itemCode: 'B2845_93030',
    itemName: 'RETAINER',
    planQty: 200,
    remainQty: -1302,
    prodLot: 'M202607010',
  },
  {
    id: 3,
    dueDate: '2026-07-01',
    itemCode: 'B2845_93030',
    itemName: 'RETAINER',
    planQty: 100,
    remainQty: 100,
    prodLot: 'M202607010',
  },
  {
    id: 4,
    dueDate: '2026-07-01',
    itemCode: 'B2845_93030',
    itemName: 'RETAINER',
    planQty: 1000,
    remainQty: 1000,
    prodLot: 'M202607010',
  },
  {
    id: 5,
    dueDate: '2026-07-01',
    itemCode: 'B2845_93030',
    itemName: 'RETAINER',
    planQty: 1000,
    remainQty: 1000,
    prodLot: 'M202607010',
  },
  {
    id: 6,
    dueDate: '2026-07-31',
    itemCode: 'GJ569_20020_A1',
    itemName: 'ASS\'Y_A1',
    planQty: 999,
    remainQty: 999,
    prodLot: 'M202607010',
  },
  {
    id: 7,
    dueDate: '2026-06-30',
    itemCode: 'P8845_92000',
    itemName: 'LQ2 PAB DEP',
    planQty: 1600,
    remainQty: 1200,
    prodLot: 'M202606290',
  },
  {
    id: 8,
    dueDate: '2026-06-30',
    itemCode: 'P8845_72000',
    itemName: 'LQ2 PAB ADV',
    planQty: 250,
    remainQty: 0,
    prodLot: 'M202606290',
  },
];

export default function ProductionRequestTable({
  filters,
  setFilters,
}: ProductionRequestTableProps) {
  const filteredData = mockData.filter((item) => {
    if (filters.dueDate && !item.dueDate.includes(filters.dueDate))
      return false;
    if (filters.itemCode && !item.itemCode.toUpperCase().includes(filters.itemCode.toUpperCase()))
      return false;
    if (filters.itemName && !item.itemName.toUpperCase().includes(filters.itemName.toUpperCase()))
      return false;
    return true;
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Filter Row */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-slate-300"
          />
          <div className="flex-1 grid grid-cols-6 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute top-2 left-2 text-slate-400" />
              <input
                type="text"
                placeholder="Due Date"
                value={filters.dueDate}
                onChange={(e) =>
                  setFilters({ ...filters, dueDate: e.target.value })
                }
                className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute top-2 left-2 text-slate-400" />
              <input
                type="text"
                placeholder="Item Code"
                value={filters.itemCode}
                onChange={(e) =>
                  setFilters({ ...filters, itemCode: e.target.value })
                }
                className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute top-2 left-2 text-slate-400" />
              <input
                type="text"
                placeholder="Item Name"
                value={filters.itemName}
                onChange={(e) =>
                  setFilters({ ...filters, itemName: e.target.value })
                }
                className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute top-2 left-2 text-slate-400" />
              <input
                type="text"
                placeholder="Plan Qty"
                className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute top-2 left-2 text-slate-400" />
              <input
                type="text"
                placeholder="Remain Qty"
                className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute top-2 left-2 text-slate-400" />
              <input
                type="text"
                placeholder="Prod Lot"
                className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 sticky top-0">
              <th className="w-8 px-4 py-3 text-left font-semibold text-slate-700">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Due Date</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Item Code</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Item Name</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-700">Plan Qty</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-700">Remain Qty</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Prod Lot</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b border-slate-200 hover:bg-blue-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                }`}
              >
                <td className="w-8 px-4 py-3">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                </td>
                <td className="px-4 py-3 text-slate-900 font-medium">{item.dueDate}</td>
                <td className="px-4 py-3">
                  <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                    {item.itemCode}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-700">{item.itemName}</td>
                <td className="px-4 py-3 text-right text-slate-900 font-medium">
                  {item.planQty.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={item.remainQty < 0 ? 'text-red-600 font-semibold' : 'text-slate-900'}>
                    {item.remainQty.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-700">{item.prodLot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="border-t border-slate-200 bg-white px-4 py-3 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span>20</span>
          <select className="px-2 py-1 border border-slate-300 rounded text-xs">
            <option>20</option>
            <option>50</option>
            <option>100</option>
            <option>200</option>
          </select>
        </div>
        <span>Page #1 total: 2 (40 items)</span>
        <div className="flex gap-1">
          <button className="px-2 py-1 hover:bg-slate-100 rounded transition">«</button>
          <button className="px-2 py-1 hover:bg-slate-100 rounded transition">‹</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded font-medium">1</button>
          <button className="px-2 py-1 hover:bg-slate-100 rounded transition">›</button>
          <button className="px-2 py-1 hover:bg-slate-100 rounded transition">»</button>
        </div>
      </div>
    </div>
  );
}
