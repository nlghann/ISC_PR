'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface ActionToolbarProps {
  primaryActions: Array<{
    label: string;
    color: 'blue' | 'red' | 'orange' | 'green' | 'gray' | 'yellow' | 'purple';
    onClick?: () => void;
  }>;
  secondaryActions?: Array<{
    label: string;
    color?: 'blue' | 'red' | 'orange' | 'green' | 'gray' | 'yellow' | 'purple';
    onClick?: () => void;
  }>;
}

const colorClasses = {
  blue: 'bg-blue-600 hover:bg-blue-700 text-white',
  red: 'bg-red-600 hover:bg-red-700 text-white',
  orange: 'bg-orange-500 hover:bg-orange-600 text-white',
  green: 'bg-green-600 hover:bg-green-700 text-white',
  gray: 'bg-slate-400 hover:bg-slate-500 text-white',
  yellow: 'bg-yellow-400 hover:bg-yellow-500 text-slate-800',
  purple: 'bg-purple-400 hover:bg-purple-500 text-white',
};

export default function ActionToolbar({ primaryActions, secondaryActions = [] }: ActionToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="px-3 py-2 border-b border-slate-200 flex items-center gap-2">
      {/* Primary Actions */}
      {primaryActions.map((action, idx) => (
        <button
          key={idx}
          onClick={action.onClick}
          className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${colorClasses[action.color]}`}
        >
          {action.label}
        </button>
      ))}

      {/* More Actions Dropdown */}
      {secondaryActions.length > 0 && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-2 py-1.5 text-xs font-medium rounded bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors flex items-center gap-1"
          >
            More
            <ChevronDown className="w-3 h-3" />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-slate-300 rounded shadow-lg z-50 min-w-max">
              {secondaryActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    action.onClick?.();
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                    action.color ? colorClasses[action.color] : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
