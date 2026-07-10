'use client';

import { useState } from 'react';
import { ChevronDown, Search, Plus, Sliders, AlertCircle, CheckCircle, FileText, Box, Database, AlertTriangle, XCircle, Settings, Package, Truck } from 'lucide-react';
import HQPOTable from '@/components/production-request/hq-po-table';
import ProductionRequestTree from '@/components/production-request/production-request-tree';
import FilterPanel from '@/components/production-request/filter-panel';
import Pagination from '@/components/production-request/pagination';
import IconActionToolbar from '@/components/production-request/icon-action-toolbar';
import BatchProductionPlanModal from '@/components/production-request/batch-production-plan-modal';

export interface SelectedItem {
  id: string;
  dueDate: string;
  itemCode: string;
  itemName: string;
  planQty: number;
  remainQty: number;
  prodLot: string;
}

export default function ProductionRequest() {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [hqPoFilters, setHqPoFilters] = useState({
    dueDate: '',
    itemCode: '',
    itemName: '',
    planQty: '',
    remainQty: '',
    prodLot: '',
  });

  // Left table pagination
  const [hqPoPage, setHqPoPage] = useState(1);
  const [hqPoRowsPerPage, setHqPoRowsPerPage] = useState(20);

  // Right table pagination
  const [prPage, setPrPage] = useState(1);
  const [prRowsPerPage, setPrRowsPerPage] = useState(20);

  // Batch production plan modal
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [selectedRequestsData, setSelectedRequestsData] = useState<any[]>([]);

  const handleOpenBatchModal = () => {
    // Map selected IDs to actual request data with all fields
    const mockRequests = [
      { id: 'pr-1-parent-1', bomCode: 'BOM-001', itemCode: '15R730017806800001A', itemName: '178(166)BGA(25X50)-0.65P-0.8P-HO-F-SWAP-ASSY', routing: '[RS-S] SWAP / ITB / NSP', routingType: 'RS ASSY', drawingNo: 'R73-0178B0680000-00-A-R0', prodReqQty: 500, realQty: 3340, woQty: 16012, uom: 'EA', vnItemType: '[LA16U30000]', customer: '[CKR001R]', mfgDept: '[G02]PY1-Kinh doanh RS', mfgCategory: '[R] RS', status: 'Ready' },
      { id: 'pr-1-parent-2', bomCode: 'BOM-002', itemCode: '15R730178068000046', itemName: '178BGA-0.65P-0.8P-HO-F-SWAP-TOP ISC-YKF', routing: '[DR-9] Gia công NLF', routingType: 'Drill/Router', drawingNo: 'R75-0178B0680000-05-A', prodReqQty: 200, realQty: 1000, woQty: 5000, uom: '공', vnItemType: '[MMD3]', customer: '[CKR001R]', mfgDept: '[G05]PY1-Kinh doanh X2', mfgCategory: '[T] Xưởng 2', status: 'Ready' },
      { id: 'pr-1-parent-3', bomCode: 'BOM-003', itemCode: '25R830017806800001A', itemName: '178(166)BGA(25X50)-0.65P-0.8P-HO-F-SWAP-ISC', routing: '[RS-S] SWAP / ITB / NSP', routingType: 'RS ASSY', drawingNo: 'R73-0178B0680000-00-A-R0', prodReqQty: 300, realQty: 1500, woQty: 7500, uom: 'EA', vnItemType: '[LA16U30003]', customer: '[CKR002R]', mfgDept: '[G03]PY1-Kinh doanh RS', mfgCategory: '[R] RS', status: 'Ready' },
      { id: 'pr-1-parent-4', bomCode: 'BOM-004', itemCode: '35R830017806800001A', itemName: '178(166)BGA(25X50)-0.65P-0.8P-HO-F-SWAP-BMD', routing: '[RS-S] SWAP / ITB / NSP', routingType: 'RS ASSY', drawingNo: 'R73-0178B0680000-00-A-R0', prodReqQty: 250, realQty: 1250, woQty: 6250, uom: 'EA', vnItemType: '[LA16U30004]', customer: '[CKR003R]', mfgDept: '[G04]PY1-Kinh doanh RS', mfgCategory: '[R] RS', status: 'Warning' },
      { id: 'pr-1-parent-5', bomCode: 'BOM-005', itemCode: '45R930017806800001A', itemName: '1744BGA(25x50)-0.65p-adl-p-customized-iti-bmd', routing: '[RS-S] SWAP / ITB / NSP', routingType: 'RS ASSY', drawingNo: 'R73-0178B0680000-00-A-R0', prodReqQty: 180, realQty: 900, woQty: 4500, uom: 'EA', vnItemType: '[LA16U30009]', customer: '[CKR004R]', mfgDept: '[G06]PY1-Kinh doanh RS', mfgCategory: '[R] RS', status: 'Ready' },
      { id: 'pr-1-child-1', bomCode: 'SUB-001', itemCode: '15R750017806800001A', itemName: '178(166)BGA-0.65P-0.8P-HO-F-SWAP-TOP ISC', routing: '[RS-1] H0 R5,R6,R7.SWAP,P.SWAP.2A,2K.AND.A2.A3.K2', routingType: 'RS ISC', drawingNo: 'R75-0178B0680000-00-A-R0', prodReqQty: 100, realQty: 500, woQty: 2000, uom: 'EA', vnItemType: '[LA16U30001]', customer: '[CKR001R]', mfgDept: '[G02]PY1', mfgCategory: '[R] RS', status: 'Ready' },
      { id: 'pr-1-child-2', bomCode: 'SUB-002', itemCode: '15R740017806800001A', itemName: '178(166)BGA-0.65P-0.8P-HO-F-SWAP-TOP ISC-YKF', routing: '[LE-14] Gia công Laser ngoài', routingType: 'Outsourcing', drawingNo: 'R75-0178B0680000-46-0', prodReqQty: 150, realQty: 800, woQty: 4000, uom: 'EA', vnItemType: '[LA16U30002]', customer: '[CKR001R]', mfgDept: '[G02]PY1', mfgCategory: '[R] RS', status: 'Ready' },
      { id: 'pr-1-child-3', bomCode: 'SUB-003', itemCode: '15R750178068000002A', itemName: '178(166)BGA-0.65P-0.8P-HO-F-SWAP-OFF', routing: '[ET-2] 있 정 짓종', routingType: 'Etching', drawingNo: 'R75-0178B0680000-02-A', prodReqQty: 50, realQty: 250, woQty: 1200, uom: '공', vnItemType: '[MMD3-1]', customer: '[CKR001R]', mfgDept: '[G05]PY1', mfgCategory: '[T] Xưởng 2', status: 'Ready' },
      { id: 'pr-1-child-4', bomCode: 'SUB-004', itemCode: '15R750178068000032A-CC', itemName: '178(166)BGA-0.65P-0.8P-HO-F-SWAP-TOP MMD', routing: '[ET-1] 도금 정 짓종', routingType: 'Etching', drawingNo: 'R75-0178B0680000-32-A', prodReqQty: 75, realQty: 400, woQty: 1800, uom: '공', vnItemType: '[MMD3-2]', customer: '[CKR001R]', mfgDept: '[G05]PY1', mfgCategory: '[T] Xưởng 2', status: 'Warning' },
    ];
    
    const data = mockRequests.filter((req) => selectedRequests.includes(req.id));
    setSelectedRequestsData(data);
    setIsBatchModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Production Request</h1>
          </div>
          <div className="flex items-center gap-3 relative">
            <div className="relative">
              <button 
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                title="Open filters"
              >
                <Sliders className="w-5 h-5 text-slate-600" />
              </button>
              {showFilterPanel && (
                <FilterPanel 
                  onClose={() => setShowFilterPanel(false)}
                  onSearch={(filters) => {
                    console.log('Applied filters:', filters);
                    setShowFilterPanel(false);
                  }}
                />
              )}
            </div>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Plus className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Split Screen */}
      <main className="p-4 flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
        <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
          {/* Left: HQ P/O Table */}
          <div className="flex flex-col bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-3 bg-slate-100 text-slate-900 font-semibold text-sm border-b border-slate-200 flex items-center justify-between relative z-20 overflow-visible">
              <span>HQ P/O & SAP Local Sales</span>
              <IconActionToolbar
                actions={[
                  { label: 'Issue', icon: <AlertCircle className="w-4 h-4" />, color: 'blue' },
                  { label: 'SOP', icon: <FileText className="w-4 h-4" />, color: 'blue' },
                  { label: 'Semi products', icon: <Box className="w-4 h-4" />, color: 'gray' },
                  { label: 'Have stock in DL40', icon: <Database className="w-4 h-4" />, color: 'yellow' },
                  { label: 'Have stock in RS30', icon: <Database className="w-4 h-4" />, color: 'purple' },
                  { label: 'RAR Save', icon: <CheckCircle className="w-4 h-4" />, color: 'red' },
                  { label: 'Close Prod Req', icon: <XCircle className="w-4 h-4" />, color: 'red' },
                  { label: 'Settings', icon: <Settings className="w-4 h-4" />, color: 'blue' },
                ]}
              />
            </div>
            <div className="flex-1 overflow-x-auto overflow-y-auto">
              <HQPOTable 
                filters={hqPoFilters} 
                setFilters={setHqPoFilters}
                selectedItem={selectedItem}
                onSelectItem={setSelectedItem}
                currentPage={hqPoPage}
                rowsPerPage={hqPoRowsPerPage}
                onPageChange={setHqPoPage}
                onRowsPerPageChange={setHqPoRowsPerPage}
              />
            </div>
          </div>

          {/* Right: Production Request Detail */}
          <div className="flex flex-col bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-3 bg-slate-100 text-slate-900 font-semibold text-sm border-b border-slate-200 flex items-center justify-between relative z-20 overflow-visible">
              <span>PRODUCTION REQUEST</span>
              <div className="flex items-center gap-2">
              <IconActionToolbar
                actions={[
                  { label: 'Production Plan', icon: <Plus className="w-4 h-4" />, color: 'orange', onClick: handleOpenBatchModal },
                  { label: 'Prod. Inspection', icon: <CheckCircle className="w-4 h-4" />, color: 'gray' },
                  { label: 'Delivery Request', icon: <Truck className="w-4 h-4" />, color: 'orange' },
                  { label: 'Production Request', icon: <Package className="w-4 h-4" />, color: 'orange' },
                  { label: 'Reject', icon: <AlertTriangle className="w-4 h-4" />, color: 'gray' },
                  { label: 'Cancel', icon: <XCircle className="w-4 h-4" />, color: 'orange' },
                  { label: 'Settings', icon: <Settings className="w-4 h-4" />, color: 'blue' },
                ]}
              />
                <button className="p-1 hover:bg-slate-200 rounded transition-colors disabled:opacity-50" disabled={!selectedItem}>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-x-auto overflow-y-auto">
              <ProductionRequestTree 
                selectedItem={selectedItem}
                selectedRequests={selectedRequests}
                onSelectRequests={setSelectedRequests}
              />
            </div>
          </div>
        </div>

        {/* Pagination - Two columns */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {/* Left table pagination */}
          <Pagination
            currentPage={hqPoPage}
            totalPages={Math.ceil(53 / hqPoRowsPerPage)}
            totalItems={53}
            rowsPerPage={hqPoRowsPerPage}
            onPageChange={setHqPoPage}
            onRowsPerPageChange={setHqPoRowsPerPage}
          />

          {/* Right table pagination */}
          <Pagination
            currentPage={prPage}
            totalPages={4}
            totalItems={72}
            rowsPerPage={prRowsPerPage}
            onPageChange={setPrPage}
            onRowsPerPageChange={setPrRowsPerPage}
          />
        </div>
      </main>

      {/* Batch Production Plan Modal */}
      <BatchProductionPlanModal
        isOpen={isBatchModalOpen}
        selectedRequests={selectedRequestsData}
        onClose={() => setIsBatchModalOpen(false)}
        onCreatePlans={(count) => {
          console.log(`[v0] Creating ${count} production plans`);
          setIsBatchModalOpen(false);
          setSelectedRequests([]);
        }}
      />
    </div>
  );
}
