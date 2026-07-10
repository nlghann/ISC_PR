'use client'

import { ChevronDown, AlertCircle, Search } from 'lucide-react'
import { useState } from 'react'

interface Request {
  id: string
  status: 'Pending' | 'In Stock' | 'Processing' | 'Completed'
  orderDate: string
  deliveryDate: string
  itemCode: string
  itemName: string
  customerType: string
  quantity: number
  priority: 'Low' | 'Medium' | 'High'
}

const sampleData: Request[] = [
  {
    id: 'R&R-001',
    status: 'Pending',
    orderDate: '2026-04-10',
    deliveryDate: '2026-04-30',
    itemCode: '30133010A',
    itemName: '169FBG4(12x16)-0.5P-ISC',
    customerType: 'JCI Group',
    quantity: 5,
    priority: 'High',
  },
  {
    id: 'R&R-002',
    status: 'In Stock',
    orderDate: '2026-04-10',
    deliveryDate: '2026-05-11',
    itemCode: '34110031A',
    itemName: 'SJSAR335-30-00A',
    customerType: 'Dam & Co',
    quantity: 3,
    priority: 'Medium',
  },
  {
    id: 'R&R-003',
    status: 'Processing',
    orderDate: '2026-04-10',
    deliveryDate: '2026-05-08',
    itemCode: '14T280263',
    itemName: '263FC8GA(28x32)-0.5P-GLYMUR-UID ASSY',
    customerType: 'Qualcomm',
    quantity: 8,
    priority: 'High',
  },
  {
    id: 'R&R-004',
    status: 'Pending',
    orderDate: '2026-04-10',
    deliveryDate: '2026-04-24',
    itemCode: '15RA001581',
    itemName: 'ISC26.5-1581FCMSP(1503FCMSP)-14x15.8-0.35P-STIFFENER',
    customerType: 'Samsung',
    quantity: 12,
    priority: 'High',
  },
  {
    id: 'R&R-005',
    status: 'Completed',
    orderDate: '2026-04-09',
    deliveryDate: '2026-04-30',
    itemCode: '34110860',
    itemName: 'PNSAB300-22-X0S',
    customerType: 'LG Electronics',
    quantity: 2,
    priority: 'Low',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'bg-amber-50 text-amber-700 border border-amber-200'
    case 'In Stock':
      return 'bg-green-50 text-green-700 border border-green-200'
    case 'Processing':
      return 'bg-blue-50 text-blue-700 border border-blue-200'
    case 'Completed':
      return 'bg-slate-50 text-slate-700 border border-slate-200'
    default:
      return 'bg-slate-50 text-slate-700'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'text-red-600'
    case 'Medium':
      return 'text-amber-600'
    case 'Low':
      return 'text-green-600'
    default:
      return 'text-slate-600'
  }
}

export default function DataTable() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = sampleData.filter(
    (item) =>
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Item Code or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-slate-900 text-white z-20">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold w-12">
                <input type="checkbox" className="w-4 h-4" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold">R&R</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Item Code</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Item Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Qty</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-semibold w-12"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-200 hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4">
                  <input type="checkbox" className="w-4 h-4" />
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-slate-900">{item.id}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-mono text-blue-600">{item.itemCode}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-700 max-w-xs truncate block">{item.itemName}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600">{item.customerType}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-900">{item.quantity}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-semibold ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-slate-600 space-y-0.5">
                    <p>Order: {item.orderDate}</p>
                    <p>Delivery: {item.deliveryDate}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setExpandedRow(expandedRow === item.id ? null : item.id)}
                    className="p-1 hover:bg-slate-200 rounded transition"
                  >
                    <ChevronDown
                      className={`w-4 h-4 text-slate-600 transition-transform ${
                        expandedRow === item.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between">
        <span className="text-sm text-slate-600">
          Showing {filteredData.length} of {sampleData.length} items
        </span>
        <div className="flex gap-2">
          <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition">
            Previous
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
            1
          </button>
          <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition">
            2
          </button>
          <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
