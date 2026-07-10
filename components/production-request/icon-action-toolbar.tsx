'use client';

import { useState } from 'react';
import { 
  AlertCircle, CheckCircle, FileText, Box, Database, AlertTriangle, 
  XCircle, Settings, MoreHorizontal, Package, Truck, Zap, Trash2,
  Save, Lock, Unlock, Copy, Download, Upload, RefreshCw
} from 'lucide-react';

interface ActionButton {
  label: string;
  icon: React.ReactNode;
  color?: 'blue' | 'red' | 'yellow' | 'purple' | 'orange' | 'gray' | 'green';
  onClick?: () => void;
}

interface IconActionToolbarProps {
  actions: ActionButton[];
}

const getColorClasses = (color?: string) => {
  const baseClasses = 'hover:bg-slate-100 transition-colors rounded p-2';
  const colorMap: Record<string, string> = {
    blue: 'text-blue-600 hover:text-blue-700',
    red: 'text-red-600 hover:text-red-700',
    yellow: 'text-yellow-600 hover:text-yellow-700',
    purple: 'text-purple-600 hover:text-purple-700',
    orange: 'text-orange-600 hover:text-orange-700',
    gray: 'text-slate-600 hover:text-slate-700',
    green: 'text-green-600 hover:text-green-700',
  };
  
  return `${baseClasses} ${colorMap[color || 'gray']}`;
};

export default function IconActionToolbar({ actions }: IconActionToolbarProps) {
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-0.5">
      {actions.map((action, idx) => (
        <div key={idx} className="relative group">
          <button
            onClick={action.onClick}
            className={getColorClasses(action.color)}
            title={action.label}
            onMouseEnter={() => setTooltipVisible(action.label)}
            onMouseLeave={() => setTooltipVisible(null)}
          >
            {action.icon}
          </button>
          {/* Tooltip */}
          {tooltipVisible === action.label && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-slate-900 text-white text-xs rounded whitespace-nowrap z-50 pointer-events-none">
              {action.label}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-slate-900" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
