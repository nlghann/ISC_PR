'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Sliders, Search } from 'lucide-react';
import { SelectedItem } from '@/app/page';
import ColumnFilterPopup from './column-filter-popup';

interface ProductionRequestTreeProps {
  selectedItem: SelectedItem | null;
  selectedRequests?: string[];
  onSelectRequests?: (ids: string[]) => void;
}

interface TreeNode {
  id: string;
  type: 'parent' | 'child';
  parentId?: string;
  bomCode: string;
  itemCode: string;
  itemName: string;
  routing: string;
  routingType: string;
  drawingNo: string;
  dwg: string;
  prodReqQty: number;
  realQty: number;
  woQty: number;
  uom: string;
  vnItemType: string;
  salesPrice: string;
  currency: string;
  customer: string;
  salesDept: string;
  mfgDept: string;
  mfgCategory: string;
}

const mockProductionRequests: Record<string, TreeNode[]> = {
  '1': [
    { id: 'pr-1-parent-1', type: 'parent', bomCode: 'BOM-001', itemCode: '15R730017806800001A', itemName: '178(166)BGA(25X50)-0.65P-0.8P-HO-F-SWAP-ASSY', routing: '[RS-S] SWAP / ITB / NSP', routingType: 'RS ASSY', drawingNo: 'R73-0178B0680000-00-A-R0', dwg: 'Download DWG', prodReqQty: 500, realQty: 3340, woQty: 16012, uom: 'EA', vnItemType: '[LA16U30000]', salesPrice: '[USD]', currency: 'US Dollar', customer: '[CKR001R]', salesDept: 'CÔNG TY TNHH ISC', mfgDept: '[G02]PY1-Kinh doanh RS', mfgCategory: '[R] RS' },
    { id: 'pr-1-child-1', type: 'child', parentId: 'pr-1-parent-1', bomCode: 'SUB-001', itemCode: '15R750017806800001A', itemName: '178(166)BGA-0.65P-0.8P-HO-F-SWAP-TOP ISC', routing: '[RS-1] H0 R5,R6,R7.SWAP,P.SWAP.2A,2K.AND.A2.A3.K2', routingType: 'RS ISC', drawingNo: 'R75-0178B0680000-00-A-R0', dwg: 'Download DWG', prodReqQty: 100, realQty: 500, woQty: 2000, uom: 'EA', vnItemType: '[LA16U30001]', salesPrice: '[USD]', currency: 'US Dollar', customer: '[CKR001R]', salesDept: 'CÔNG TY TNHH ISC', mfgDept: '[G02]PY1', mfgCategory: '[R] RS' },
    { id: 'pr-1-child-2', type: 'child', parentId: 'pr-1-parent-1', bomCode: 'SUB-002', itemCode: '15R740017806800001A', itemName: '178(166)BGA-0.65P-0.8P-HO-F-SWAP-TOP ISC-YKF', routing: '[LE-14] Gia công Laser ngoài [자이인 외조 가공]', routingType: 'Outsourcing', drawingNo: 'R75-0178B0680000-46-0', dwg: 'Download DWG', prodReqQty: 150, realQty: 800, woQty: 4000, uom: 'EA', vnItemType: '[LA16U30002]', salesPrice: '[USD]', currency: 'US Dollar', customer: '[CKR001R]', salesDept: 'CÔNG TY TNHH ISC', mfgDept: '[G02]PY1', mfgCategory: '[R] RS' },
    { id: 'pr-1-parent-2', type: 'parent', bomCode: 'BOM-002', itemCode: '15R730178068000046', itemName: '178BGA-0.65P-0.8P-HO-F-SWAP-TOP ISC-YKF', routing: '[DR-9] Gia công NLF', routingType: 'Drill/Router', drawingNo: 'R75-0178B0680000-05-A', dwg: 'Download DWG', prodReqQty: 200, realQty: 1000, woQty: 5000, uom: '공', vnItemType: '[MMD3]', salesPrice: '[USD]', currency: 'US Dollar', customer: '[CKR001R]', salesDept: 'CÔNG TY TNHH ISC', mfgDept: '[G05]PY1-Kinh doanh X2', mfgCategory: '[T] Xưởng 2' },
    { id: 'pr-1-child-3', type: 'child', parentId: 'pr-1-parent-2', bomCode: 'SUB-003', itemCode: '15R750178068000002A', itemName: '178(166)BGA-0.65P-0.8P-HO-F-SWAP-OFF', routing: '[ET-2] 있 정 짓종 (없이 마)', routingType: 'Etching', drawingNo: 'R75-0178B0680000-02-A', dwg: 'Download DWG', prodReqQty: 50, realQty: 250, woQty: 1200, uom: '공', vnItemType: '[MMD3-1]', salesPrice: '[USD]', currency: 'US Dollar', customer: '[CKR001R]', salesDept: 'CÔNG TY TNHH ISC', mfgDept: '[G05]PY1', mfgCategory: '[T] Xưởng 2' },
    { id: 'pr-1-child-4', type: 'child', parentId: 'pr-1-parent-2', bomCode: 'SUB-004', itemCode: '15R750178068000032A-CC', itemName: '178(166)BGA-0.65P-0.8P-HO-F-SWAP-TOP MMD', routing: '[ET-1] 도금 정 짓종 [Etching 마]', routingType: 'Etching', drawingNo: 'R75-0178B0680000-32-A', dwg: 'Download DWG', prodReqQty: 75, realQty: 400, woQty: 1800, uom: '공', vnItemType: '[MMD3-2]', salesPrice: '[USD]', currency: 'US Dollar', customer: '[CKR001R]', salesDept: 'CÔNG TY TNHH ISC', mfgDept: '[G05]PY1', mfgCategory: '[T] Xưởng 2' },
    { id: 'pr-1-parent-3', type: 'parent', bomCode: 'BOM-003', itemCode: '25R830017806800001A', itemName: '178(166)BGA(25X50)-0.65P-0.8P-HO-F-SWAP-ISC', routing: '[RS-S] SWAP / ITB / NSP', routingType: 'RS ASSY', drawingNo: 'R73-0178B0680000-00-A-R0', dwg: 'Download DWG', prodReqQty: 300, realQty: 1500, woQty: 7500, uom: 'EA', vnItemType: '[LA16U30003]', salesPrice: '[USD]', currency: 'US Dollar', customer: '[CKR002R]', salesDept: 'CÔNG TY TNHH ISC', mfgDept: '[G03]PY1-Kinh doanh RS', mfgCategory: '[R] RS' },
    { id: 'pr-1-child-5', type: 'child', parentId: 'pr-1-parent-3', bomCode: 'SUB-005', itemCode: '25R850017806800001A', itemName: '178(166)BGA-0.65P-0.8P-HO-F-SWAP-ADL-P-ITB', routing: '[RS-1] H0 R5,R6,R7.SWAP,P.SWAP.2A,2K.AND.A2.A3.K2', routingType: 'RS ISC', drawingNo: 'R75-0178B0680000-00-A-R0', dwg: 'Download DWG', prodReqQty: 120, realQty: 600, woQty: 3000, uom: 'EA', vnItemType: '[LA16U30005]', salesPrice: '[USD]', currency: 'US Dollar', customer: '[CKR002R]', salesDept: 'CÔNG TY TNHH ISC', mfgDept: '[G03]PY1', mfgCategory: '[R] RS' },
    { id: 'pr-1-child-6', type: 'child', parentId: 'pr-1-parent-3', bomCode: 'SUB-006', itemCode: '25R840017806800001A', itemName: '178(166)BGA-0.65P-0.8P-HO-F-SWAP-ADL-P-BMD', routing: '[LE-14] Gia công Laser ngoài [자이인 외조 가공]', routingType: 'Outsourcing', drawingNo: 'R75-0178B0680000-46-0', dwg: 'Download DWG', prodReqQty: 90, realQty: 450, woQty: 2250, uom: 'EA', vnItemType: '[LA16U30006]', salesPrice: '[USD]', currency: 'US Dollar', customer: '[CKR002R]', salesDept: 'CÔNG TY TNHH ISC', mfgDept: '[G03]PY1', mfgCategory: '[R] RS' },
    { id: 'pr-1-parent-4', type: 'parent', bomCode: 'BOM-004', itemCode: '35R830017806800001A', itemName: '178(166)BGA(25X50)-0.65P-0.8P-HO-F-SWAP-BMD', routing: '[RS-S] SWAP / ITB / NSP', routingType: 'RS ASSY', drawingNo: 'R73-0178B0680000-00-A-R0', dwg: 'Download DWG', prodReqQty: 250, realQty: 1250, woQty: 6250, uom: 'EA', vnItemType: '[LA16U30004]', salesPrice: '[USD]', currency: 'US Dollar', customer: '[CKR003R]', salesDept: 'CÔNG TY TNHH ISC', mfgDept: '[G04]PY1-Kinh doanh RS', mfgCategory: '[R] RS' },
    { id: 'pr-1-child-7', type: 'child', parentId: 'pr-1-parent-4', bomCode: 'SUB-007', itemCode: '35R850017806800001A', itemName: '178(166)BGA-0.65P-0.8P-HO-F-SWAP-ADL-P-ISC', routing: '[RS-1] H0 R5,R6,R7.SWAP,P.SWAP.2A,2K.AND.A2.A3.K2', routingType: 'RS ISC', drawingNo: 'R75-0178B0680000-00-A-R0', dwg: 'Download DWG', prodReqQty: 100, realQty: 500, woQty: 2500, uom: 'EA', vnItemType: '[LA16U30007]', salesPrice: '[USD]', currency: 'US Dollar', customer: '[CKR003R]', salesDept: 'CÔNG TY TNHH ISC', mfgDept: '[G04]PY1', mfgCategory: '[R] RS' },
    { id: 'pr-1-child-8', type: 'child', parentId: 'pr-1-parent-4', bomCode: 'SUB-008', itemCode: '35R840017806800001A', itemName: '178(166)BGA-0.65P-0.8P-HO-F-SWAP-ADL-P-IRS', routing: '[DR-9] Gia công NLF', routingType: 'Drill/Router', drawingNo: 'R75-0178B0680000-05-A', dwg: 'Download DWG', prodReqQty: 80, realQty: 400, woQty: 2000, uom: 'EA', vnItemType: '[LA16U30008]', salesPrice: '[USD]', currency: 'US Dollar', customer: '[CKR003R]', salesDept: 'CÔNG TY TNHH ISC', mfgDept: '[G04]PY1', mfgCategory: '[R] RS' },
    { id: 'pr-1-parent-5', type: 'parent', bomCode: 'BOM-005', itemCode: '45R930017806800001A', itemName: '1744BGA(25x50)-0.65p-adl-p-customized-iti-bmd', routing: '[RS-S] SWAP / ITB / NSP', routingType: 'RS ASSY', drawingNo: 'R73-0178B0680000-00-A-R0', dwg: 'Download DWG', prodReqQty: 180, realQty: 900, woQty: 4500, uom: 'EA', vnItemType: '[LA16U30009]', salesPrice: '[USD]', currency: 'US Dollar', customer: '[CKR004R]', salesDept: 'CÔNG TY TNHH ISC', mfgDept: '[G06]PY1-Kinh doanh RS', mfgCategory: '[R] RS' },
    { id: 'pr-1-child-9', type: 'child', parentId: 'pr-1-parent-5', bomCode: 'SUB-009', itemCode: '45R950017806800001A', itemName: '1744BGA(25x50)-0.65p-adl-p-itb', routing: '[RS-1] H0 R5,R6,R7.SWAP,P.SWAP.2A,2K.AND.A2.A3.K2', routingType: 'RS ISC', drawingNo: 'R75-0178B0680000-00-A-R0', dwg: 'Download DWG', prodReqQty: 70, realQty: 350, woQty: 1750, uom: 'EA', vnItemType: '[LA16U30010]', salesPrice: '[USD]', currency: 'US Dollar', customer: '[CKR004R]', salesDept: 'CÔNG TY TNHH ISC', mfgDept: '[G06]PY1', mfgCategory: '[R] RS' },
    { id: 'pr-1-child-10', type: 'child', parentId: 'pr-1-parent-5', bomCode: 'SUB-010', itemCode: '45R940017806800001A', itemName: '1744BGA(25x50)-0.65p-adl-p-irs', routing: '[LE-14] Gia công Laser ngoài [자이인 외조 가공]', routingType: 'Outsourcing', drawingNo: 'R75-0178B0680000-46-0', dwg: 'Download DWG', prodReqQty: 60, realQty: 300, woQty: 1500, uom: 'EA', vnItemType: '[LA16U30011]', salesPrice: '[USD]', currency: 'US Dollar', customer: '[CKR004R]', salesDept: 'CÔNG TY TNHH ISC', mfgDept: '[G06]PY1', mfgCategory: '[R] RS' },
  ],
};

export default function ProductionRequestTree({
  selectedItem,
  selectedRequests = [],
  onSelectRequests,
}: ProductionRequestTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [filterPopup, setFilterPopup] = useState<{
    column: string;
    isOpen: boolean;
  }>({
    column: '',
    isOpen: false,
  });

  const data = useMemo(() => {
    if (!selectedItem) return [];
    return mockProductionRequests[selectedItem.id] || [];
  }, [selectedItem]);

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getChildNodes = (parentId: string) => {
    return data.filter((node) => node.parentId === parentId);
  };

  const renderTree = () => {
    return data
      .filter((node) => node.type === 'parent')
      .map((parentNode) => (
        <div key={parentNode.id}>
          {/* Parent row */}
          <div
            className="flex items-center border-b border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <div className="w-10 flex-shrink-0 px-2 py-2">
              <input
                type="checkbox"
                checked={selectedRequests.includes(parentNode.id)}
                onChange={(e) => {
                  const newSelected = e.target.checked
                    ? [...selectedRequests, parentNode.id]
                    : selectedRequests.filter((id) => id !== parentNode.id);
                  onSelectRequests?.(newSelected);
                }}
                className="w-4 h-4"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <button
              onClick={() => toggleNode(parentNode.id)}
              className="p-2 hover:bg-slate-100 rounded flex-shrink-0"
            >
              {expandedNodes.has(parentNode.id) ? (
                <ChevronDown className="w-4 h-4 text-slate-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-600" />
              )}
            </button>

            <div className="flex-1 px-3 py-3 flex gap-2 text-sm min-w-max">
              <div className="w-40 text-slate-700 truncate text-xs">{parentNode.routing}</div>
              <div className="w-32 text-slate-700 truncate text-xs">{parentNode.routingType}</div>
              <div className="w-44 font-medium text-slate-900 truncate text-xs">{parentNode.itemCode}</div>
              <div className="w-64 text-slate-700 truncate text-xs">{parentNode.itemName}</div>
              <div className="w-40 text-slate-700 truncate text-xs">{parentNode.drawingNo}</div>
              <div className="w-24 text-blue-600 cursor-pointer text-xs">{parentNode.dwg}</div>
              <div className="w-20 text-right text-slate-700 text-xs">{parentNode.prodReqQty}</div>
              <div className="w-20 text-right text-slate-700 text-xs">{parentNode.realQty}</div>
              <div className="w-20 text-right text-slate-700 text-xs">{parentNode.woQty}</div>
              <div className="w-16 text-slate-700 text-xs">{parentNode.uom}</div>
              <div className="w-32 text-slate-700 text-xs">{parentNode.vnItemType}</div>
              <div className="w-32 text-slate-700 text-xs">{parentNode.customer}</div>
              <div className="w-40 text-slate-700 truncate text-xs">{parentNode.mfgDept}</div>
              <div className="w-32 text-slate-700 text-xs">{parentNode.mfgCategory}</div>
            </div>
          </div>

          {/* Child rows */}
          {expandedNodes.has(parentNode.id) &&
            getChildNodes(parentNode.id).map((childNode) => (
              <div
                key={childNode.id}
                className="flex items-center border-b border-slate-100 hover:bg-blue-50 transition-colors bg-blue-50/50"
              >
                <div className="w-10 flex-shrink-0 px-2 py-2">
                  <input
                    type="checkbox"
                    checked={selectedRequests.includes(childNode.id)}
                    onChange={(e) => {
                      const newSelected = e.target.checked
                        ? [...selectedRequests, childNode.id]
                        : selectedRequests.filter((id) => id !== childNode.id);
                      onSelectRequests?.(newSelected);
                    }}
                    className="w-4 h-4"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="flex-1 px-3 py-2 flex gap-2 text-sm min-w-max">
                  <div className="w-40 text-slate-600 truncate text-xs">{childNode.routing}</div>
                  <div className="w-32 text-slate-600 truncate text-xs">{childNode.routingType}</div>
                  <div className="w-44 text-slate-700 italic truncate text-xs">{childNode.itemCode}</div>
                  <div className="w-64 text-slate-600 truncate text-xs">{childNode.itemName}</div>
                  <div className="w-40 text-slate-600 truncate text-xs">{childNode.drawingNo}</div>
                  <div className="w-24 text-blue-600 cursor-pointer text-xs">{childNode.dwg}</div>
                  <div className="w-20 text-right text-slate-600 text-xs">{childNode.prodReqQty}</div>
                  <div className="w-20 text-right text-slate-600 text-xs">{childNode.realQty}</div>
                  <div className="w-20 text-right text-slate-600 text-xs">{childNode.woQty}</div>
                  <div className="w-16 text-slate-600 text-xs">{childNode.uom}</div>
                  <div className="w-32 text-slate-600 text-xs">{childNode.vnItemType}</div>
                  <div className="w-32 text-slate-600 text-xs">{childNode.customer}</div>
                  <div className="w-40 text-slate-600 truncate text-xs">{childNode.mfgDept}</div>
                  <div className="w-32 text-slate-600 text-xs">{childNode.mfgCategory}</div>
                </div>
              </div>
            ))}
        </div>
      ));
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
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs flex-shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-slate-600">Production Req. No:</span>{' '}
            <span className="font-semibold text-slate-900">
              {selectedItem.itemCode.substring(0, 16)}001-62 | Release
            </span>
          </div>
          <button
            onClick={() => setFilterPopup({ column: 'Production Request', isOpen: true })}
            className="p-1 hover:bg-slate-200 rounded transition-colors"
          >
            <Sliders className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Column headers */}
      <div className="border-b-2 border-slate-300 bg-slate-50 sticky top-0 z-10 flex-shrink-0">
        <div className="flex items-center">
          <div className="w-10 flex-shrink-0 px-2 py-2">
            <input type="checkbox" className="w-4 h-4" />
          </div>
          <div className="flex-1 px-3 py-3 flex gap-2 text-xs font-semibold text-slate-700 min-w-max">
            <div className="flex items-center justify-between gap-2" onContextMenu={(e) => { e.preventDefault(); setFilterPopup({ column: 'Routing', isOpen: true }); }}>
              <span>Routing</span>
              <button onClick={() => setFilterPopup({ column: 'Routing', isOpen: true })} className="p-1 hover:bg-slate-200 rounded">
                <Sliders className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-2" onContextMenu={(e) => { e.preventDefault(); setFilterPopup({ column: 'Routing Type', isOpen: true }); }}>
              <span>Routing Type</span>
              <button onClick={() => setFilterPopup({ column: 'Routing Type', isOpen: true })} className="p-1 hover:bg-slate-200 rounded">
                <Sliders className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-2" onContextMenu={(e) => { e.preventDefault(); setFilterPopup({ column: 'Item Code', isOpen: true }); }}>
              <span>Item Code</span>
              <button onClick={() => setFilterPopup({ column: 'Item Code', isOpen: true })} className="p-1 hover:bg-slate-200 rounded">
                <Sliders className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-2" onContextMenu={(e) => { e.preventDefault(); setFilterPopup({ column: 'Item Name', isOpen: true }); }}>
              <span>Item Name</span>
              <button onClick={() => setFilterPopup({ column: 'Item Name', isOpen: true })} className="p-1 hover:bg-slate-200 rounded">
                <Sliders className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-2" onContextMenu={(e) => { e.preventDefault(); setFilterPopup({ column: 'Drawing No', isOpen: true }); }}>
              <span>Drawing No</span>
              <button onClick={() => setFilterPopup({ column: 'Drawing No', isOpen: true })} className="p-1 hover:bg-slate-200 rounded">
                <Sliders className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-2" onContextMenu={(e) => { e.preventDefault(); setFilterPopup({ column: 'DWG', isOpen: true }); }}>
              <span>DWG</span>
              <button onClick={() => setFilterPopup({ column: 'DWG', isOpen: true })} className="p-1 hover:bg-slate-200 rounded">
                <Sliders className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-2 text-right" onContextMenu={(e) => { e.preventDefault(); setFilterPopup({ column: 'Prod Req Qty', isOpen: true }); }}>
              <span className="flex-1">Prod Req Qty</span>
              <button onClick={() => setFilterPopup({ column: 'Prod Req Qty', isOpen: true })} className="p-1 hover:bg-slate-200 rounded flex-shrink-0">
                <Sliders className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-2 text-right" onContextMenu={(e) => { e.preventDefault(); setFilterPopup({ column: 'Real Qty', isOpen: true }); }}>
              <span className="flex-1">Real Qty</span>
              <button onClick={() => setFilterPopup({ column: 'Real Qty', isOpen: true })} className="p-1 hover:bg-slate-200 rounded flex-shrink-0">
                <Sliders className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-2 text-right" onContextMenu={(e) => { e.preventDefault(); setFilterPopup({ column: 'WO Qty', isOpen: true }); }}>
              <span className="flex-1">WO Qty</span>
              <button onClick={() => setFilterPopup({ column: 'WO Qty', isOpen: true })} className="p-1 hover:bg-slate-200 rounded flex-shrink-0">
                <Sliders className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-2" onContextMenu={(e) => { e.preventDefault(); setFilterPopup({ column: 'UoM', isOpen: true }); }}>
              <span>UoM</span>
              <button onClick={() => setFilterPopup({ column: 'UoM', isOpen: true })} className="p-1 hover:bg-slate-200 rounded">
                <Sliders className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-2" onContextMenu={(e) => { e.preventDefault(); setFilterPopup({ column: 'VN Item Type', isOpen: true }); }}>
              <span>VN Item Type</span>
              <button onClick={() => setFilterPopup({ column: 'VN Item Type', isOpen: true })} className="p-1 hover:bg-slate-200 rounded">
                <Sliders className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-2" onContextMenu={(e) => { e.preventDefault(); setFilterPopup({ column: 'Customer', isOpen: true }); }}>
              <span>Customer</span>
              <button onClick={() => setFilterPopup({ column: 'Customer', isOpen: true })} className="p-1 hover:bg-slate-200 rounded">
                <Sliders className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-2" onContextMenu={(e) => { e.preventDefault(); setFilterPopup({ column: 'Mfg Dept', isOpen: true }); }}>
              <span>Mfg Dept</span>
              <button onClick={() => setFilterPopup({ column: 'Mfg Dept', isOpen: true })} className="p-1 hover:bg-slate-200 rounded">
                <Sliders className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-2" onContextMenu={(e) => { e.preventDefault(); setFilterPopup({ column: 'Mfg Category', isOpen: true }); }}>
              <span>Mfg Category</span>
              <button onClick={() => setFilterPopup({ column: 'Mfg Category', isOpen: true })} className="p-1 hover:bg-slate-200 rounded">
                <Sliders className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tree content */}
      <div className="flex-1 overflow-y-auto">
        {data.filter((node) => node.type === 'parent').length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-500">
            No production requests found
          </div>
        ) : (
          renderTree()
        )}
      </div>

      {/* Filter panel */}
      {filterPopup.isOpen && (
        <ColumnFilterPopup
          column={filterPopup.column}
          data={['BOM-001', 'BOM-002', 'SUB-001', 'SUB-002', 'SUB-003', 'SUB-004']}
          onApply={(selectedValues) => {
            console.log('[v0] Filter applied:', selectedValues);
            setFilterPopup({ column: '', isOpen: false });
          }}
          onClose={() => setFilterPopup({ column: '', isOpen: false })}
        />
      )}
    </div>
  );
}
