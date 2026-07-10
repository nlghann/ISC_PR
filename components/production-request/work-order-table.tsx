'use client';

import { Search, ChevronDown } from 'lucide-react';

interface WorkOrderTableProps {
  filters: {
    woId: string;
    prodLevel: string;
    status: string;
  };
  setFilters: (filters: any) => void;
}

const mockData = [
  {
    id: 1,
    woId: 'WOC4',
    prodLevel: '1',
    woType: 'Normal',
    line: 'L1',
    status: 'Ready',
    itemCode: 'ISC26-5-1581FCMSP',
    woQty: 1557,
    realQty: 1557,
    woEndDate: '2026-07-04',
    remark: '',
  },
  {
    id: 2,
    woId: 'WOC5',
    prodLevel: '2',
    woType: 'Urgent',
    line: 'L2',
    status: 'In Progress',
    itemCode: 'B2845-93030',
    woQty: 200,
    realQty: 150,
    woEndDate: '2026-07-01',
    remark: 'Rush order',
  },
  {
    id: 3,
    woId: 'WOC6',
    prodLevel: '1',
    woType: 'Normal',
    line: 'L3',
    status: 'Hold',
    itemCode: 'GJ569-20020',
    woQty: 999,
    realQty: 999,
    woEndDate: '2026-07-31',
    remark: 'Waiting materials',
  },
  {
    id: 4,
    woId: 'WOC7',
    prodLevel: '3',
    woType: 'Normal',
    line: 'L1',
    status: 'Ready',
    itemCode: 'P8845-92000',
    woQty: 1600,
    realQty: 1200,
    woEndDate: '2026-06-30',
    remark: '',
  },
  {
    id: 5,
    woId: 'WOC8',
    prodLevel: '2',
    woType: 'Normal',
    line: 'L4',
    status: 'Completed',
    itemCode: 'P8845-72000',
    woQty: 250,
    realQty: 250,
    woEndDate: '2026-06-30',
    remark: 'noData',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Ready':
      return 'bg-green-100 text-green-800';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800';
    case 'Hold':
      return 'bg-amber-100 text-amber-800';
    case 'Completed':
      return 'bg-slate-100 text-slate-800';
    default:
      return 'bg-slate-100 text-slate-800';
  }
};

export default function WorkOrderTable({
  filters,
  setFilters,
}: WorkOrderTableProps) {
  const filteredData = mockData.filter((item) => {
    if (filters.woId && !item.woId.toUpperCase().includes(filters.woId.toUpperCase()))
      return false;
    if (filters.prodLevel && !item.prodLevel.includes(filters.prodLevel))
      return false;
    if (filters.status && !item.status.toUpperCase().includes(filters.status.toUpperCase()))
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
          <div className="flex-1 grid grid-cols-9 gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute top-2 left-2 text-slate-400" />
              <input
                type="text"
                placeholder="WO ID"
                value={filters.woId}
                onChange={(e) =>
                  setFilters({ ...filters, woId: e.target.value })
                }
                className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute top-2 left-2 text-slate-400" />
              <input
                type="text"
                placeholder="Prod Level"
                value={filters.prodLevel}
                onChange={(e) =>
                  setFilters({ ...filters, prodLevel: e.target.value })
                }
                className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute top-2 left-2 text-slate-400" />
              <input
                type="text"
                placeholder="WO Type"
                className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute top-2 left-2 text-slate-400" />
              <input
                type="text"
                placeholder="Line"
                className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute top-2 left-2 text-slate-400" />
              <input
                type="text"
                placeholder="Status"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute top-2 left-2 text-slate-400" />
              <input
                type="text"
                placeholder="Item Code"
                className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute top-2 left-2 text-slate-400" />
              <input
                type="text"
                placeholder="WO Qty"
                className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute top-2 left-2 text-slate-400" />
              <input
                type="text"
                placeholder="Real Qty"
                className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute top-2 left-2 text-slate-400" />
              <input
                type="text"
                placeholder="End Date"
                className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
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
              <th className="w-8 px-3 py-3 text-left font-semibold text-slate-700">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
              </th>
              <th className="px-3 py-3 text-left font-semibold text-slate-700 min-w-[70px]">WO ID</th>
              <th className="px-3 py-3 text-center font-semibold text-slate-700 min-w-[60px]">Level</th>
              <th className="px-3 py-3 text-left font-semibold text-slate-700 min-w-[70px]">WO Type</th>
              <th className="px-3 py-3 text-center font-semibold text-slate-700 min-w-[50px]">Line</th>
              <th className="px-3 py-3 text-left font-semibold text-slate-700 min-w-[70px]">Status</th>
              <th className="px-3 py-3 text-left font-semibold text-slate-700 min-w-[100px]">Item Code</th>
              <th className="px-3 py-3 text-right font-semibold text-slate-700 min-w-[70px]">WO Qty</th>
              <th className="px-3 py-3 text-right font-semibold text-slate-700 min-w-[70px]">Real Qty</th>
              <th className="px-3 py-3 text-left font-semibold text-slate-700 min-w-[80px]">End Date</th>
              <th className="px-3 py-3 text-left font-semibold text-slate-700 min-w-[80px]">Remark</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b border-slate-200 hover:bg-teal-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                }`}
              >
                <td className="w-8 px-3 py-3">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                </td>
                <td className="px-3 py-3 text-slate-900 font-medium">{item.woId}</td>
                <td className="px-3 py-3 text-center text-slate-700">{item.prodLevel}</td>
                <td className="px-3 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.woType === 'Urgent' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-slate-100 text-slate-800'
                  }`}>
                    {item.woType}
                  </span>
                </td>
                <td className="px-3 py-3 text-center text-slate-700">{item.line}</td>
                <td className="px-3 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <span className="text-teal-600 font-medium hover:underline cursor-pointer">
                    {item.itemCode}
                  </span>
                </td>
                <td className="px-3 py-3 text-right text-slate-900 font-medium">
                  {item.woQty.toLocaleString()}
                </td>
                <td className="px-3 py-3 text-right text-slate-900 font-medium">
                  {item.realQty.toLocaleString()}
                </td>
                <td className="px-3 py-3 text-slate-700">{item.woEndDate}</td>
                <td className="px-3 py-3 text-slate-600 text-xs">{item.remark}</td>
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
        <span>Page #1 total: 1 (5 items)</span>
        <div className="flex gap-1">
          <button className="px-2 py-1 hover:bg-slate-100 rounded transition">«</button>
          <button className="px-2 py-1 hover:bg-slate-100 rounded transition">‹</button>
          <button className="px-3 py-1 bg-teal-600 text-white rounded font-medium">1</button>
          <button className="px-2 py-1 hover:bg-slate-100 rounded transition">›</button>
          <button className="px-2 py-1 hover:bg-slate-100 rounded transition">»</button>
        </div>
      </div>
    </div>
  );
}
