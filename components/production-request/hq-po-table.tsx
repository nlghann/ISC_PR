'use client';

import { useState, useMemo } from 'react';
import { Search, Sliders } from 'lucide-react';
import { SelectedItem } from '@/app/page';
import ColumnFilterPopup from './column-filter-popup';
import HeaderContextMenu from './header-context-menu';

interface HQPOTableProps {
  filters: {
    dueDate: string;
    itemCode: string;
    itemName: string;
    planQty: string;
    remainQty: string;
    prodLot: string;
  };
  setFilters: (filters: any) => void;
  selectedItem: SelectedItem | null;
  onSelectItem: (item: SelectedItem) => void;
  currentPage?: number;
  rowsPerPage?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rows: number) => void;
}

// Sample data matching reference
const mockData = [
  { id: '1', dueDate: '2026-06-10', itemCode: '14R200258799000007', itemName: '2587(2580)LGA56x45)-0.94P-MMG-G3-CT-Elastomer', planQty: 1557, remainQty: 1557, prodLot: 'R20-2587L9900001-00-0-R3', status: 'Approved', customerType: 'Intel SLT', finishedDate: '2026-08-19', classification: 'ISC', deliveryProgress: 'Ready', drawingNo: 'ISC-DRS', typeSmall: 'RND' },
  { id: '2', dueDate: '2026-04-10', itemCode: '35130216', itemName: '441BGA(14x14)-0.65P-ISC', planQty: 200, remainQty: -1302, prodLot: 'M202607010', status: 'Approved', customerType: 'ĐỘI TÌNH ATE', finishedDate: '2026-05-23', classification: 'ISC', deliveryProgress: 'Failed', drawingNo: 'ISC(51)', typeSmall: 'H0' },
  { id: '3', dueDate: '2026-04-10', itemCode: 'B540316B080000207', itemName: '316(176)BGA(14x18)-0.8P-BI-BMD', planQty: 100, remainQty: 100, prodLot: 'B54-0316B0800002-07-0', status: 'Approved', customerType: 'KIỂU CÔNG', finishedDate: '2026-04-23', classification: 'ISC', deliveryProgress: 'Failed', drawingNo: 'SB-BRS-RND', typeSmall: '2A' },
  { id: '4', dueDate: '2026-04-10', itemCode: 'RA104717B1000007113', itemName: '4717BGA(70x70)-1.0P-RheoM3P(2xG4)-중장 JIG-BLOCK4', planQty: 1000, remainQty: 1000, prodLot: 'RA104717B1000007130', status: 'Approved', customerType: 'KIỂU CÔNG', finishedDate: '2026-04-22', classification: '조립', deliveryProgress: 'Failed', drawingNo: 'ISC-JIG', typeSmall: 'JIG-I' },
  { id: '5', dueDate: '2026-06-24', itemCode: 'R2000000E000003201', itemName: 'EM TEST 완 금형 MOLD 120X150-MOLD', planQty: 2000, remainQty: 2000, prodLot: 'R2000000E0000032010', status: 'Approved', customerType: 'KIỂU CÔNG', finishedDate: '2026-06-21', classification: 'ISC', deliveryProgress: 'Failed', drawingNo: 'ISC-DRS', typeSmall: 'RND' },
  { id: '6', dueDate: '2026-06-23', itemCode: 'B510031GB0800004', itemName: '316(176)BGA(14x18)-0.8P-BI-ISC-MMD', planQty: 100, remainQty: 100, prodLot: 'B510031GB0800000040', status: 'Approved', customerType: 'KIỂU CÔNG', finishedDate: '2026-06-22', classification: 'ISC', deliveryProgress: 'Failed', drawingNo: 'SB-BRS-RND', typeSmall: 'H0' },
  { id: '7', dueDate: '2026-07-01', itemCode: 'B2845_93030', itemName: 'RETAINER', planQty: 1000, remainQty: 1000, prodLot: 'M202607010', status: 'Pending', customerType: 'KIỂU CÔNG', finishedDate: '2026-07-15', classification: 'ISC', deliveryProgress: 'In Progress', drawingNo: 'ISC-DRS', typeSmall: 'RND' },
  { id: '8', dueDate: '2026-07-01', itemCode: 'B2845_93030', itemName: 'RETAINER', planQty: 1000, remainQty: 500, prodLot: 'M202607010', status: 'Approved', customerType: 'Intel SLT', finishedDate: '2026-07-10', classification: 'ISC', deliveryProgress: 'Ready', drawingNo: 'ISC-DRS', typeSmall: 'RND' },
  { id: '9', dueDate: '2026-07-31', itemCode: 'GJ569_20020_A1', itemName: 'ASS\'Y_A1', planQty: 999, remainQty: 999, prodLot: 'M202607010', status: 'Approved', customerType: 'KIỂU CÔNG', finishedDate: '2026-08-01', classification: 'ISC', deliveryProgress: 'Failed', drawingNo: 'SB-BRS-RND', typeSmall: '2A' },
  { id: '10', dueDate: '2026-06-30', itemCode: 'P8845_92000', itemName: 'LQ2 PAB DEP', planQty: 1600, remainQty: 1200, prodLot: 'M202606290', status: 'Approved', customerType: 'ĐỘI TÌNH ATE', finishedDate: '2026-07-05', classification: 'ISC', deliveryProgress: 'In Progress', drawingNo: 'ISC(51)', typeSmall: 'H0' },
  { id: '11', dueDate: '2026-06-30', itemCode: 'P8845_72000', itemName: 'LQ2 PAB ADV', planQty: 250, remainQty: 0, prodLot: 'M202606290', status: 'Approved', customerType: 'KIỂU CÔNG', finishedDate: '2026-06-28', classification: 'ISC', deliveryProgress: 'Ready', drawingNo: 'ISC-DRS', typeSmall: 'RND' },
  { id: '12', dueDate: '2026-05-15', itemCode: 'ABC123456', itemName: 'IC COMPONENT A', planQty: 500, remainQty: 450, prodLot: 'P202605150', status: 'Pending', customerType: 'Intel SLT', finishedDate: '2026-05-20', classification: 'ISC', deliveryProgress: 'In Progress', drawingNo: 'ISC-JIG', typeSmall: 'JIG-I' },
  { id: '13', dueDate: '2026-05-20', itemCode: 'DEF789012', itemName: 'PCB MODULE B', planQty: 800, remainQty: 800, prodLot: 'P202605200', status: 'Approved', customerType: 'KIỂU CÔNG', finishedDate: '2026-05-25', classification: '조립', deliveryProgress: 'Ready', drawingNo: 'SB-BRS-RND', typeSmall: '2A' },
  { id: '14', dueDate: '2026-05-25', itemCode: 'GHI345678', itemName: 'CONNECTOR SET C', planQty: 1200, remainQty: 100, prodLot: 'P202605250', status: 'Approved', customerType: 'ĐỘI TÌNH ATE', finishedDate: '2026-05-30', classification: 'ISC', deliveryProgress: 'Failed', drawingNo: 'ISC(51)', typeSmall: 'H0' },
  { id: '15', dueDate: '2026-06-01', itemCode: 'JKL901234', itemName: 'ASSEMBLY PART D', planQty: 600, remainQty: 600, prodLot: 'P202606010', status: 'Approved', customerType: 'Intel SLT', finishedDate: '2026-06-05', classification: 'ISC', deliveryProgress: 'In Progress', drawingNo: 'ISC-DRS', typeSmall: 'RND' },
  { id: '16', dueDate: '2026-06-05', itemCode: 'MNO567890', itemName: 'COMPONENT E', planQty: 400, remainQty: 400, prodLot: 'P202606050', status: 'Pending', customerType: 'KIỂU CÔNG', finishedDate: '2026-06-10', classification: 'ISC', deliveryProgress: 'Ready', drawingNo: 'ISC-JIG', typeSmall: 'JIG-I' },
  { id: '17', dueDate: '2026-06-08', itemCode: 'PQR123456', itemName: 'MODULE SET F', planQty: 950, remainQty: 950, prodLot: 'P202606080', status: 'Approved', customerType: 'ĐỘI TÌNH ATE', finishedDate: '2026-06-12', classification: '조립', deliveryProgress: 'Failed', drawingNo: 'SB-BRS-RND', typeSmall: '2A' },
  { id: '18', dueDate: '2026-06-12', itemCode: 'STU789012', itemName: 'PART ASSEMBLY G', planQty: 1100, remainQty: 550, prodLot: 'P202606120', status: 'Approved', customerType: 'Intel SLT', finishedDate: '2026-06-15', classification: 'ISC', deliveryProgress: 'In Progress', drawingNo: 'ISC(51)', typeSmall: 'H0' },
  { id: '19', dueDate: '2026-06-15', itemCode: 'VWX345678', itemName: 'CONNECTOR H', planQty: 300, remainQty: 300, prodLot: 'P202606150', status: 'Pending', customerType: 'KIỂU CÔNG', finishedDate: '2026-06-18', classification: 'ISC', deliveryProgress: 'Ready', drawingNo: 'ISC-DRS', typeSmall: 'RND' },
  { id: '20', dueDate: '2026-06-18', itemCode: 'YZA901234', itemName: 'CIRCUIT BOARD I', planQty: 700, remainQty: 700, prodLot: 'P202606180', status: 'Approved', customerType: 'ĐỘI TÌNH ATE', finishedDate: '2026-06-22', classification: 'ISC', deliveryProgress: 'Failed', drawingNo: 'ISC-JIG', typeSmall: 'JIG-I' },
  { id: '21', dueDate: '2026-06-20', itemCode: 'BCD567890', itemName: 'COMPONENT J', planQty: 850, remainQty: 850, prodLot: 'P202606200', status: 'Approved', customerType: 'Intel SLT', finishedDate: '2026-06-25', classification: '조립', deliveryProgress: 'In Progress', drawingNo: 'SB-BRS-RND', typeSmall: '2A' },
  { id: '22', dueDate: '2026-06-25', itemCode: 'EFG123456', itemName: 'MODULE K', planQty: 500, remainQty: 500, prodLot: 'P202606250', status: 'Pending', customerType: 'KIỂU CÔNG', finishedDate: '2026-06-28', classification: 'ISC', deliveryProgress: 'Ready', drawingNo: 'ISC(51)', typeSmall: 'H0' },
  { id: '23', dueDate: '2026-06-28', itemCode: 'HIJ789012', itemName: 'ASSEMBLY L', planQty: 1300, remainQty: 650, prodLot: 'P202606280', status: 'Approved', customerType: 'ĐỘI TÌNH ATE', finishedDate: '2026-07-02', classification: 'ISC', deliveryProgress: 'Failed', drawingNo: 'ISC-DRS', typeSmall: 'RND' },
  { id: '24', dueDate: '2026-07-02', itemCode: 'KLM345678', itemName: 'PART M', planQty: 600, remainQty: 600, prodLot: 'P202607020', status: 'Approved', customerType: 'Intel SLT', finishedDate: '2026-07-05', classification: 'ISC', deliveryProgress: 'In Progress', drawingNo: 'ISC-JIG', typeSmall: 'JIG-I' },
  { id: '25', dueDate: '2026-07-05', itemCode: 'NOP901234', itemName: 'CONNECTOR N', planQty: 400, remainQty: 400, prodLot: 'P202607050', status: 'Pending', customerType: 'KIỂU CÔNG', finishedDate: '2026-07-08', classification: '조립', deliveryProgress: 'Ready', drawingNo: 'SB-BRS-RND', typeSmall: '2A' },
  { id: '26', dueDate: '2026-07-08', itemCode: 'QRS567890', itemName: 'CIRCUIT O', planQty: 950, remainQty: 950, prodLot: 'P202607080', status: 'Approved', customerType: 'ĐỘI TÌNH ATE', finishedDate: '2026-07-12', classification: 'ISC', deliveryProgress: 'Failed', drawingNo: 'ISC(51)', typeSmall: 'H0' },
  { id: '27', dueDate: '2026-07-10', itemCode: 'TUV123456', itemName: 'COMPONENT P', planQty: 1100, remainQty: 550, prodLot: 'P202607100', status: 'Approved', customerType: 'Intel SLT', finishedDate: '2026-07-15', classification: 'ISC', deliveryProgress: 'In Progress', drawingNo: 'ISC-DRS', typeSmall: 'RND' },
  { id: '28', dueDate: '2026-07-12', itemCode: 'WXY789012', itemName: 'MODULE Q', planQty: 300, remainQty: 300, prodLot: 'P202607120', status: 'Pending', customerType: 'KIỂU CÔNG', finishedDate: '2026-07-15', classification: 'ISC', deliveryProgress: 'Ready', drawingNo: 'ISC-JIG', typeSmall: 'JIG-I' },
  { id: '29', dueDate: '2026-07-15', itemCode: 'ZAB345678', itemName: 'ASSEMBLY R', planQty: 700, remainQty: 700, prodLot: 'P202607150', status: 'Approved', customerType: 'ĐỘI TÌNH ATE', finishedDate: '2026-07-20', classification: '조립', deliveryProgress: 'Failed', drawingNo: 'SB-BRS-RND', typeSmall: '2A' },
  { id: '30', dueDate: '2026-07-18', itemCode: 'CDE901234', itemName: 'PART S', planQty: 850, remainQty: 850, prodLot: 'P202607180', status: 'Approved', customerType: 'Intel SLT', finishedDate: '2026-07-22', classification: 'ISC', deliveryProgress: 'In Progress', drawingNo: 'ISC(51)', typeSmall: 'H0' },
  { id: '31', dueDate: '2026-07-20', itemCode: 'FGH567890', itemName: 'CONNECTOR T', planQty: 500, remainQty: 500, prodLot: 'P202607200', status: 'Pending', customerType: 'KIỂU CÔNG', finishedDate: '2026-07-25', classification: 'ISC', deliveryProgress: 'Ready', drawingNo: 'ISC-DRS', typeSmall: 'RND' },
  { id: '32', dueDate: '2026-07-22', itemCode: 'IJK123456', itemName: 'CIRCUIT U', planQty: 1300, remainQty: 650, prodLot: 'P202607220', status: 'Approved', customerType: 'ĐỘI TÌNH ATE', finishedDate: '2026-07-28', classification: 'ISC', deliveryProgress: 'Failed', drawingNo: 'ISC-JIG', typeSmall: 'JIG-I' },
  { id: '33', dueDate: '2026-07-25', itemCode: 'LMN789012', itemName: 'COMPONENT V', planQty: 600, remainQty: 600, prodLot: 'P202607250', status: 'Approved', customerType: 'Intel SLT', finishedDate: '2026-08-01', classification: '조립', deliveryProgress: 'In Progress', drawingNo: 'SB-BRS-RND', typeSmall: '2A' },
  { id: '34', dueDate: '2026-07-28', itemCode: 'OPQ345678', itemName: 'MODULE W', planQty: 400, remainQty: 400, prodLot: 'P202607280', status: 'Pending', customerType: 'KIỂU CÔNG', finishedDate: '2026-08-02', classification: 'ISC', deliveryProgress: 'Ready', drawingNo: 'ISC(51)', typeSmall: 'H0' },
  { id: '35', dueDate: '2026-07-30', itemCode: 'RST901234', itemName: 'ASSEMBLY X', planQty: 950, remainQty: 950, prodLot: 'P202607300', status: 'Approved', customerType: 'ĐỘI TÌNH ATE', finishedDate: '2026-08-05', classification: 'ISC', deliveryProgress: 'Failed', drawingNo: 'ISC-DRS', typeSmall: 'RND' },
  { id: '36', dueDate: '2026-08-02', itemCode: 'UVW567890', itemName: 'PART Y', planQty: 1100, remainQty: 550, prodLot: 'P202608020', status: 'Approved', customerType: 'Intel SLT', finishedDate: '2026-08-08', classification: 'ISC', deliveryProgress: 'In Progress', drawingNo: 'ISC-JIG', typeSmall: 'JIG-I' },
  { id: '37', dueDate: '2026-08-05', itemCode: 'XYZ123456', itemName: 'CONNECTOR Z', planQty: 300, remainQty: 300, prodLot: 'P202608050', status: 'Pending', customerType: 'KIỂU CÔNG', finishedDate: '2026-08-10', classification: '조립', deliveryProgress: 'Ready', drawingNo: 'SB-BRS-RND', typeSmall: '2A' },
  { id: '38', dueDate: '2026-08-08', itemCode: 'ABC234567', itemName: 'CIRCUIT AA', planQty: 700, remainQty: 700, prodLot: 'P202608080', status: 'Approved', customerType: 'ĐỘI TÌNH ATE', finishedDate: '2026-08-15', classification: 'ISC', deliveryProgress: 'Failed', drawingNo: 'ISC(51)', typeSmall: 'H0' },
  { id: '39', dueDate: '2026-08-10', itemCode: 'DEF678901', itemName: 'COMPONENT AB', planQty: 850, remainQty: 850, prodLot: 'P202608100', status: 'Approved', customerType: 'Intel SLT', finishedDate: '2026-08-18', classification: 'ISC', deliveryProgress: 'In Progress', drawingNo: 'ISC-DRS', typeSmall: 'RND' },
  { id: '40', dueDate: '2026-08-12', itemCode: 'GHI912345', itemName: 'MODULE AC', planQty: 500, remainQty: 500, prodLot: 'P202608120', status: 'Pending', customerType: 'KIỂU CÔNG', finishedDate: '2026-08-20', classification: 'ISC', deliveryProgress: 'Ready', drawingNo: 'ISC-JIG', typeSmall: 'JIG-I' },
  { id: '41', dueDate: '2026-08-15', itemCode: 'JKL345678', itemName: 'ASSEMBLY AD', planQty: 1300, remainQty: 650, prodLot: 'P202608150', status: 'Approved', customerType: 'ĐỘI TÌNH ATE', finishedDate: '2026-08-25', classification: '조립', deliveryProgress: 'Failed', drawingNo: 'SB-BRS-RND', typeSmall: '2A' },
  { id: '42', dueDate: '2026-08-18', itemCode: 'MNO789012', itemName: 'PART AE', planQty: 600, remainQty: 600, prodLot: 'P202608180', status: 'Approved', customerType: 'Intel SLT', finishedDate: '2026-08-28', classification: 'ISC', deliveryProgress: 'In Progress', drawingNo: 'ISC(51)', typeSmall: 'H0' },
  { id: '43', dueDate: '2026-08-20', itemCode: 'PQR123456', itemName: 'CONNECTOR AF', planQty: 400, remainQty: 400, prodLot: 'P202608200', status: 'Pending', customerType: 'KIỂU CÔNG', finishedDate: '2026-08-30', classification: 'ISC', deliveryProgress: 'Ready', drawingNo: 'ISC-DRS', typeSmall: 'RND' },
  { id: '44', dueDate: '2026-08-22', itemCode: 'STU567890', itemName: 'CIRCUIT AG', planQty: 950, remainQty: 950, prodLot: 'P202608220', status: 'Approved', customerType: 'ĐỘI TÌNH ATE', finishedDate: '2026-09-01', classification: 'ISC', deliveryProgress: 'Failed', drawingNo: 'ISC-JIG', typeSmall: 'JIG-I' },
  { id: '45', dueDate: '2026-08-25', itemCode: 'VWX901234', itemName: 'COMPONENT AH', planQty: 1100, remainQty: 550, prodLot: 'P202608250', status: 'Approved', customerType: 'Intel SLT', finishedDate: '2026-09-03', classification: '조립', deliveryProgress: 'In Progress', drawingNo: 'SB-BRS-RND', typeSmall: '2A' },
  { id: '46', dueDate: '2026-08-28', itemCode: 'YZA345678', itemName: 'MODULE AI', planQty: 300, remainQty: 300, prodLot: 'P202608280', status: 'Pending', customerType: 'KIỂU CÔNG', finishedDate: '2026-09-05', classification: 'ISC', deliveryProgress: 'Ready', drawingNo: 'ISC(51)', typeSmall: 'H0' },
  { id: '47', dueDate: '2026-08-30', itemCode: 'BCD789012', itemName: 'ASSEMBLY AJ', planQty: 700, remainQty: 700, prodLot: 'P202608300', status: 'Approved', customerType: 'ĐỘI TÌNH ATE', finishedDate: '2026-09-08', classification: 'ISC', deliveryProgress: 'Failed', drawingNo: 'ISC-DRS', typeSmall: 'RND' },
  { id: '48', dueDate: '2026-09-02', itemCode: 'EFG123456', itemName: 'PART AK', planQty: 850, remainQty: 850, prodLot: 'P202609020', status: 'Approved', customerType: 'Intel SLT', finishedDate: '2026-09-10', classification: 'ISC', deliveryProgress: 'In Progress', drawingNo: 'ISC-JIG', typeSmall: 'JIG-I' },
  { id: '49', dueDate: '2026-09-05', itemCode: 'HIJ567890', itemName: 'CONNECTOR AL', planQty: 500, remainQty: 500, prodLot: 'P202609050', status: 'Pending', customerType: 'KIỂU CÔNG', finishedDate: '2026-09-12', classification: '조립', deliveryProgress: 'Ready', drawingNo: 'SB-BRS-RND', typeSmall: '2A' },
  { id: '50', dueDate: '2026-09-08', itemCode: 'KLM901234', itemName: 'CIRCUIT AM', planQty: 1300, remainQty: 650, prodLot: 'P202609080', status: 'Approved', customerType: 'ĐỘI TÌNH ATE', finishedDate: '2026-09-15', classification: 'ISC', deliveryProgress: 'Failed', drawingNo: 'ISC(51)', typeSmall: 'H0' },
  { id: '51', dueDate: '2026-09-10', itemCode: 'NOP345678', itemName: 'COMPONENT AN', planQty: 600, remainQty: 600, prodLot: 'P202609100', status: 'Approved', customerType: 'Intel SLT', finishedDate: '2026-09-18', classification: 'ISC', deliveryProgress: 'In Progress', drawingNo: 'ISC-DRS', typeSmall: 'RND' },
  { id: '52', dueDate: '2026-09-12', itemCode: 'QRS789012', itemName: 'MODULE AO', planQty: 400, remainQty: 400, prodLot: 'P202609120', status: 'Pending', customerType: 'KIỂU CÔNG', finishedDate: '2026-09-20', classification: 'ISC', deliveryProgress: 'Ready', drawingNo: 'ISC-JIG', typeSmall: 'JIG-I' },
  { id: '53', dueDate: '2026-09-15', itemCode: 'TUV123456', itemName: 'ASSEMBLY AP', planQty: 950, remainQty: 950, prodLot: 'P202609150', status: 'Approved', customerType: 'ĐỘI TÌNH ATE', finishedDate: '2026-09-22', classification: '조립', deliveryProgress: 'Failed', drawingNo: 'SB-BRS-RND', typeSmall: '2A' },
];

export default function HQPOTable({
  filters,
  setFilters,
  selectedItem,
  onSelectItem,
  currentPage = 1,
  rowsPerPage = 20,
  onPageChange,
  onRowsPerPageChange,
}: HQPOTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'asc' | 'desc';
  }>({
    key: null,
    direction: 'asc',
  });

  const [filterPopup, setFilterPopup] = useState<{
    column: string;
    isOpen: boolean;
  }>({
    column: '',
    isOpen: false,
  });

  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    column: string;
    isOpen: boolean;
  }>({
    x: 0,
    y: 0,
    column: '',
    isOpen: false,
  });

  // Filter data based on filter inputs
  const filteredData = useMemo(() => {
    return mockData.filter((item) => {
      if (filters.dueDate && !item.dueDate.includes(filters.dueDate)) return false;
      if (filters.itemCode && !item.itemCode.includes(filters.itemCode)) return false;
      if (filters.itemName && !item.itemName.toLowerCase().includes(filters.itemName.toLowerCase())) return false;
      if (filters.planQty && item.planQty.toString() !== filters.planQty) return false;
      if (filters.remainQty && item.remainQty.toString() !== filters.remainQty) return false;
      if (filters.prodLot && !item.prodLot.includes(filters.prodLot)) return false;
      return true;
    });
  }, [filters]);

  // Sort data if needed
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  // Handle right-click on header
  const handleHeaderContextMenu = (e: React.MouseEvent, columnName: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      column: columnName,
      isOpen: true,
    });
  };

  // Get data for filter popup based on column
  const getFilterData = (column: string): string[] => {
    switch (column) {
      case 'Due Date':
        return mockData.map(d => d.dueDate);
      case 'Item Code':
        return mockData.map(d => d.itemCode);
      case 'Item Name':
        return mockData.map(d => d.itemName);
      case 'Plan Qty':
        return mockData.map(d => d.planQty.toString());
      case 'Remain Qty':
        return mockData.map(d => d.remainQty.toString());
      case 'Prod Lot':
        return mockData.map(d => d.prodLot);
      default:
        return [];
    }
  };

  return (
    <div className="flex-1 relative">
      {contextMenu.isOpen && (
        <HeaderContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          columnName={contextMenu.column}
          onClose={() => setContextMenu({ ...contextMenu, isOpen: false })}
          onSortAsc={() => {
            setSortConfig({ key: contextMenu.column, direction: 'asc' });
            console.log('[v0] Sort ascending:', contextMenu.column);
          }}
          onSortDesc={() => {
            setSortConfig({ key: contextMenu.column, direction: 'desc' });
            console.log('[v0] Sort descending:', contextMenu.column);
          }}
          onClearSort={() => {
            setSortConfig({ key: null, direction: 'asc' });
            console.log('[v0] Clear sorting');
          }}
          onCopyHeader={() => {
            navigator.clipboard.writeText(contextMenu.column);
            console.log('[v0] Copied header:', contextMenu.column);
          }}
        />
      )}
      <div className="overflow-x-auto overflow-y-auto h-full"
        onClick={(e) => {
          // Close filter if clicking outside
          if (!(e.target as HTMLElement).closest('button') && !(e.target as HTMLElement).closest('[role="dialog"]')) {
            setFilterPopup({ column: '', isOpen: false });
          }
        }}
      >
        <table className="w-full border-collapse min-w-max">
        {/* Header with filters */}
        <thead>
          {/* Column names */}
          <tr className="border-b-2 border-slate-300 bg-slate-50 sticky top-0 z-10">

            <th 
              className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-r border-slate-200 relative cursor-pointer"
              onContextMenu={(e) => handleHeaderContextMenu(e, 'Due Date')}
            >
              <div className="flex items-center justify-between gap-2">
                <span>Due Date</span>
                <button onClick={() => setFilterPopup({ column: 'Due Date', isOpen: true })} className="p-1 hover:bg-slate-200 rounded">
                  <Sliders className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </div>
              {filterPopup.isOpen && filterPopup.column === 'Due Date' && (
                <ColumnFilterPopup
                  column="Due Date"
                  data={getFilterData('Due Date')}
                  onApply={(selectedValues) => {
                    console.log('Filter Due Date:', selectedValues);
                    setFilterPopup({ column: '', isOpen: false });
                  }}
                  onClose={() => setFilterPopup({ column: '', isOpen: false })}
                />
              )}
            </th>
            <th 
              className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-r border-slate-200 relative cursor-pointer"
              onContextMenu={(e) => handleHeaderContextMenu(e, 'Item Code')}
            >
              <div className="flex items-center justify-between gap-2">
                <span>Item Code</span>
                <button onClick={() => setFilterPopup({ column: 'Item Code', isOpen: true })} className="p-1 hover:bg-slate-200 rounded">
                  <Sliders className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </div>
            </th>
            <th 
              className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-r border-slate-200 relative cursor-pointer"
              onContextMenu={(e) => handleHeaderContextMenu(e, 'Item Name')}
            >
              <div className="flex items-center justify-between gap-2">
                <span>Item Name</span>
                <button onClick={() => setFilterPopup({ column: 'Item Name', isOpen: true })} className="p-1 hover:bg-slate-200 rounded">
                  <Sliders className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </div>
            </th>
            <th 
              className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-r border-slate-200 relative cursor-pointer"
              onContextMenu={(e) => handleHeaderContextMenu(e, 'Plan Qty')}
            >
              <div className="flex items-center justify-between gap-2">
                <span>Plan Qty</span>
                <button onClick={() => setFilterPopup({ column: 'Plan Qty', isOpen: true })} className="p-1 hover:bg-slate-200 rounded">
                  <Sliders className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </div>
            </th>
            <th 
              className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-r border-slate-200 relative cursor-pointer"
              onContextMenu={(e) => handleHeaderContextMenu(e, 'Remain Qty')}
            >
              <div className="flex items-center justify-between gap-2">
                <span>Remain Qty</span>
                <button onClick={() => setFilterPopup({ column: 'Remain Qty', isOpen: true })} className="p-1 hover:bg-slate-200 rounded">
                  <Sliders className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </div>
            </th>
            <th 
              className="px-3 py-3 text-left text-xs font-semibold text-slate-700 relative cursor-pointer"
              onContextMenu={(e) => handleHeaderContextMenu(e, 'Prod Lot')}
            >
              <div className="flex items-center justify-between gap-2">
                <span>Prod Lot</span>
                <button onClick={() => setFilterPopup({ column: 'Prod Lot', isOpen: true })} className="p-1 hover:bg-slate-200 rounded">
                  <Sliders className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </div>
            </th>
          </tr>


        </thead>

        {/* Data rows */}
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                No data found
              </td>
            </tr>
          ) : (
            paginatedData.map((item, idx) => (
              <tr
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`border-b border-slate-200 hover:bg-blue-50 cursor-pointer transition-colors ${
                  selectedItem?.id === item.id
                    ? 'bg-blue-50 hover:bg-blue-100'
                    : idx % 2 === 0
                      ? 'bg-white hover:bg-slate-50'
                      : 'bg-slate-50 hover:bg-slate-100'
                }`}
              >

                <td className="px-3 py-2 text-sm text-slate-700 border-r border-slate-200 whitespace-nowrap">
                  {item.dueDate}
                </td>
                <td className="px-3 py-2 text-sm text-blue-600 border-r border-slate-200 font-medium">
                  {item.itemCode}
                </td>
                <td className="px-3 py-2 text-sm text-slate-700 border-r border-slate-200">
                  {item.itemName}
                </td>
                <td className="px-3 py-2 text-sm text-slate-700 border-r border-slate-200 text-right">
                  {item.planQty.toLocaleString()}
                </td>
                <td
                  className={`px-3 py-2 text-sm border-r border-slate-200 text-right font-medium ${
                    item.remainQty < 0
                      ? 'text-red-600'
                      : 'text-slate-700'
                  }`}
                >
                  {item.remainQty.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-sm text-slate-700">
                  {item.prodLot}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}
