import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Section({ title, subtitle, defaultOpen = false, complete, children, className = '' }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`card overflow-hidden ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-army-50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold text-army-900">{title}</h2>
            {complete !== undefined && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${complete ? 'bg-army-100 text-army-700' : 'bg-gray-100 text-gray-500'}`}>
                {complete ? 'Complete' : 'Incomplete'}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-army-600 mt-0.5">{subtitle}</p>}
        </div>
        <ChevronDown
          size={18}
          className={`text-army-500 shrink-0 transition-transform ml-3 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-2 border-t border-army-100">
          {children}
        </div>
      )}
    </div>
  );
}
