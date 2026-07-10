'use client';

import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface SelectedRequest {
  id: string;
  code: string;
  number: string;
  itemCode: string;
  itemName: string;
  level: string;
  startDate: string;
  endDate: string;
  qty: number;
  hardLevel?: number;
  status: string;
  routing?: string;
  routingType?: string;
  drawingNo?: string;
  prodReqQty?: number;
  realQty?: number;
  woQty?: number;
  uom?: string;
  vnItemType?: string;
  customer?: string;
  mfgDept?: string;
  mfgCategory?: string;
}

interface BatchProductionPlanModalProps {
  isOpen: boolean;
  selectedRequests: SelectedRequest[];
  onClose: () => void;
  onCreatePlans: (count: number) => void;
}

export default function BatchProductionPlanModal({
  isOpen,
  selectedRequests,
  onClose,
  onCreatePlans,
}: BatchProductionPlanModalProps) {
  const [selectedDetail, setSelectedDetail] = useState<SelectedRequest | null>(null);
  const [activeTab, setActiveTab] = useState<'request' | 'lineSetup'>('request');
  const [editable, setEditable] = useState<{
    startDate: string;
    endDate: string;
    hardLevel: string;
  }>({ startDate: '', endDate: '', hardLevel: '' });

  const handleSelectRow = (req: SelectedRequest) => {
    setSelectedDetail(req);
    setEditable({
      startDate: req.startDate || '',
      endDate: req.endDate || '',
      hardLevel: req.hardLevel != null ? String(req.hardLevel) : '1',
    });
  };

  if (!isOpen) return null;

  const validCount = selectedRequests.length;
  const totalQty = selectedRequests.reduce((sum, req) => sum + req.qty, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-blue-600 text-white px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold">Batch Create Production Plans</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-blue-700 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* Production Requests */}
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b">
              <h3 className="text-sm font-semibold text-slate-900">
                Production Requests ({selectedRequests.length})
              </h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 flex items-center gap-1">
                  Save
                </button>
                <button className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 flex items-center gap-1">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="px-3 py-2 text-left w-8">
                      <input type="checkbox" className="w-4 h-4" />
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-slate-700 whitespace-nowrap">No.</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-slate-700 whitespace-nowrap">Item Code</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-slate-700 whitespace-nowrap">Item Name</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-slate-700 whitespace-nowrap">Level</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-slate-700 whitespace-nowrap">Start Date</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-slate-700 whitespace-nowrap">End Date</th>
                    <th className="px-3 py-2 text-right text-xs font-semibold text-slate-700 whitespace-nowrap">Qty (EA)</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-slate-700 whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRequests.map((req, idx) => (
                    <tr
                      key={req.id}
                      className={`border-b border-slate-200 cursor-pointer hover:bg-blue-50 ${
                        selectedDetail?.id === req.id ? 'bg-blue-100' : idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                      }`}
                      onClick={() => handleSelectRow(req)}
                    >
                      <td className="px-3 py-2">
                        <input type="checkbox" className="w-4 h-4" defaultChecked />
                      </td>
                      <td className="px-3 py-2 text-xs">{idx + 1}</td>
                      <td className="px-3 py-2 text-xs text-blue-600">{req.itemCode}</td>
                      <td className="px-3 py-2 text-xs">{req.itemName}</td>
                      <td className="px-3 py-2 text-xs">{req.level}</td>
                      <td className="px-3 py-2 text-xs">{req.startDate}</td>
                      <td className="px-3 py-2 text-xs">{req.endDate}</td>
                      <td className="px-3 py-2 text-xs text-right">{req.qty}</td>
                      <td className="px-3 py-2 text-xs">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          req.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Details of Selected Request */}
          <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b">
                <h3 className="text-sm font-semibold text-slate-900">
                  Detail of Selected Request
                </h3>
                <span className="text-sm text-blue-600 font-medium">
                  {selectedDetail ? `${selectedDetail.code} - ${selectedDetail.number}` : 'Select a request above'}
                </span>
              </div>

              {/* Tabs */}
              <div className="flex gap-6 mb-4 border-b">
                <button
                  onClick={() => setActiveTab('request')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'request'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Request Info
                </button>
                <button
                  onClick={() => setActiveTab('lineSetup')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'lineSetup'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Line Setup (2)
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'request' ? (
                <div className="grid grid-cols-2 gap-6 p-4 bg-slate-50 rounded border border-slate-200">
                  <div>
                    <label className="text-xs text-slate-600 font-medium">Production Request Code</label>
                    <input
                      type="text"
                      disabled
                      value={selectedDetail?.code ?? ''}
                      className="mt-1 w-full px-2 py-1.5 text-sm text-slate-900 bg-slate-100 border border-slate-300 rounded disabled:cursor-not-allowed disabled:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 font-medium">Production Request No.</label>
                    <input
                      type="text"
                      disabled
                      value={selectedDetail?.number ?? ''}
                      className="mt-1 w-full px-2 py-1.5 text-sm text-slate-900 bg-slate-100 border border-slate-300 rounded disabled:cursor-not-allowed disabled:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 font-medium">Item Code</label>
                    <input
                      type="text"
                      disabled
                      value={selectedDetail?.itemCode ?? ''}
                      className="mt-1 w-full px-2 py-1.5 text-sm text-slate-900 bg-slate-100 border border-slate-300 rounded disabled:cursor-not-allowed disabled:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 font-medium">Item Name</label>
                    <input
                      type="text"
                      disabled
                      value={selectedDetail?.itemName ?? ''}
                      className="mt-1 w-full px-2 py-1.5 text-sm text-slate-900 bg-slate-100 border border-slate-300 rounded disabled:cursor-not-allowed disabled:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 font-medium">Level</label>
                    <input
                      type="text"
                      disabled
                      value={selectedDetail?.level ?? ''}
                      className="mt-1 w-full px-2 py-1.5 text-sm text-slate-900 bg-slate-100 border border-slate-300 rounded disabled:cursor-not-allowed disabled:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 font-medium">Qty (EA)</label>
                    <input
                      type="text"
                      disabled
                      value={selectedDetail?.qty ?? ''}
                      className="mt-1 w-full px-2 py-1.5 text-sm text-slate-900 bg-slate-100 border border-slate-300 rounded disabled:cursor-not-allowed disabled:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 font-medium">Routing</label>
                    <input
                      type="text"
                      disabled
                      value={selectedDetail?.routing ?? ''}
                      className="mt-1 w-full px-2 py-1.5 text-sm text-slate-900 bg-slate-100 border border-slate-300 rounded disabled:cursor-not-allowed disabled:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-blue-700 font-semibold">Start Date</label>
                    <input
                      type="date"
                      disabled={!selectedDetail}
                      value={editable.startDate}
                      onChange={(e) => setEditable((prev) => ({ ...prev, startDate: e.target.value }))}
                      className="mt-1 w-full px-2 py-1.5 text-sm text-slate-900 bg-white border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:border-slate-300 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-blue-700 font-semibold">End Date</label>
                    <input
                      type="date"
                      disabled={!selectedDetail}
                      value={editable.endDate}
                      onChange={(e) => setEditable((prev) => ({ ...prev, endDate: e.target.value }))}
                      className="mt-1 w-full px-2 py-1.5 text-sm text-slate-900 bg-white border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:border-slate-300 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-blue-700 font-semibold">Hard Level</label>
                    <input
                      type="number"
                      disabled={!selectedDetail}
                      value={editable.hardLevel}
                      onChange={(e) => setEditable((prev) => ({ ...prev, hardLevel: e.target.value }))}
                      className="mt-1 w-full px-2 py-1.5 text-sm text-slate-900 bg-white border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:border-slate-300 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded border border-slate-200">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <div className="mt-4 flex gap-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 flex items-center gap-1">
                      <Plus className="w-4 h-4" /> Add Line
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 flex items-center gap-1">
                      <Trash2 className="w-4 h-4" /> Delete Line
                    </button>
                  </div>
                      <thead>
                        <tr className="bg-slate-100 border-b">
                          <th className="px-3 py-2 text-left text-xs font-semibold">Line No.</th>
                          <th className="px-3 py-2 text-left text-xs font-semibold">Line Name</th>
                          <th className="px-3 py-2 text-left text-xs font-semibold">Process</th>
                          <th className="px-3 py-2 text-left text-xs font-semibold">No. of Equipment</th>
                          <th className="px-3 py-2 text-left text-xs font-semibold">No. of Worker</th>
                          <th className="px-3 py-2 text-left text-xs font-semibold">Remark</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-slate-100">
                          <td className="px-3 py-2 text-xs">1</td>
                          <td className="px-3 py-2 text-xs">L03</td>
                          <td className="px-3 py-2 text-xs">DR-1) AFF/FF 볼트 (Bình Thưởng)</td>
                          <td className="px-3 py-2 text-xs">2</td>
                          <td className="px-3 py-2 text-xs">6</td>
                          <td className="px-3 py-2 text-xs">-</td>
                        </tr>
                        <tr className="border-b hover:bg-slate-100">
                          <td className="px-3 py-2 text-xs">2</td>
                          <td className="px-3 py-2 text-xs">L03-2</td>
                          <td className="px-3 py-2 text-xs">ILE-11 LASER 볼트 (Bình Thưởng)</td>
                          <td className="px-3 py-2 text-xs">1</td>
                          <td className="px-3 py-2 text-xs">3</td>
                          <td className="px-3 py-2 text-xs">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                </div>
              )}
            </div>

        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 px-6 py-4 flex items-center justify-end gap-3 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-slate-300 text-slate-700 rounded font-medium hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onCreatePlans(validCount)}
            className="px-6 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors"
          >
            Create {validCount} Plans
          </button>
        </div>
      </div>
    </div>
  );
}
