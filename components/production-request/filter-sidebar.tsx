'use client'

import { ChevronDown, ChevronLeft, AlertCircle, Package, Clock, CheckCircle } from 'lucide-react'
import { useState } from 'react'

interface FilterSidebarProps {
  open: boolean
  onToggle: () => void
  selectedFilters: Record<string, string>
  onFilterChange: (filters: Record<string, string>) => void
}

export default function FilterSidebar({
  open,
  onToggle,
  selectedFilters,
  onFilterChange,
}: FilterSidebarProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('status')

  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({
      ...selectedFilters,
      [key]: value,
    })
  }

  const stats = [
    { label: 'Pending', value: '45', icon: Clock, color: 'bg-amber-50', textColor: 'text-amber-600' },
    { label: 'In Stock', value: '32', icon: Package, color: 'bg-green-50', textColor: 'text-green-600' },
    { label: 'Completed', value: '31', icon: CheckCircle, color: 'bg-blue-50', textColor: 'text-blue-600' },
  ]

  return (
    <>
      {/* Sidebar */}
      <div
        className={`bg-white border-r border-slate-200 transition-all duration-300 ease-out flex flex-col ${
          open ? 'w-72' : 'w-0'
        } overflow-hidden`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">Filters</h2>
          <button
            onClick={onToggle}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="px-6 py-4 border-b border-slate-200 space-y-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className={`${stat.color} rounded-lg p-3 flex items-center gap-3`}>
                <Icon className={`w-5 h-5 ${stat.textColor}`} />
                <div>
                  <p className="text-xs text-slate-600">{stat.label}</p>
                  <p className={`text-lg font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Filters */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* Is Delivery */}
          <div>
            <button
              onClick={() =>
                setExpandedSection(expandedSection === 'delivery' ? null : 'delivery')
              }
              className="w-full flex items-center justify-between py-2 hover:bg-slate-50 rounded px-2 transition"
            >
              <span className="text-sm font-semibold text-slate-700">Is Delivery</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  expandedSection === 'delivery' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSection === 'delivery' && (
              <div className="space-y-2 mt-2 ml-2">
                {['All', 'Yes', 'No'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="delivery"
                      value={option.toLowerCase()}
                      checked={selectedFilters.isDelivery === option.toLowerCase()}
                      onChange={(e) => handleFilterChange('isDelivery', e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <div>
            <button
              onClick={() =>
                setExpandedSection(expandedSection === 'status' ? null : 'status')
              }
              className="w-full flex items-center justify-between py-2 hover:bg-slate-50 rounded px-2 transition"
            >
              <span className="text-sm font-semibold text-slate-700">Status</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  expandedSection === 'status' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSection === 'status' && (
              <div className="space-y-2 mt-2 ml-2">
                {['All', 'Pending', 'In Stock', 'Processing'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="status"
                      value={option.toLowerCase()}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* HQ Destination */}
          <div>
            <button
              onClick={() =>
                setExpandedSection(expandedSection === 'destination' ? null : 'destination')
              }
              className="w-full flex items-center justify-between py-2 hover:bg-slate-50 rounded px-2 transition"
            >
              <span className="text-sm font-semibold text-slate-700">HQ Destination</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  expandedSection === 'destination' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSection === 'destination' && (
              <div className="space-y-2 mt-2 ml-2">
                {['All', 'HQ-A', 'HQ-B', 'HQ-C'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="destination"
                      value={option.toLowerCase()}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Order From */}
          <div>
            <button
              onClick={() =>
                setExpandedSection(expandedSection === 'order' ? null : 'order')
              }
              className="w-full flex items-center justify-between py-2 hover:bg-slate-50 rounded px-2 transition"
            >
              <span className="text-sm font-semibold text-slate-700">Order From</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  expandedSection === 'order' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSection === 'order' && (
              <div className="space-y-2 mt-2 ml-2">
                {['All', 'HQ', 'SAP', 'Local'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="order"
                      value={option.toLowerCase()}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-4 flex gap-2">
          <button className="flex-1 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition">
            Reset
          </button>
          <button className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            Apply
          </button>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      {!open && (
        <button
          onClick={onToggle}
          className="w-12 border-r border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition"
        >
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </button>
      )}
    </>
  )
}
