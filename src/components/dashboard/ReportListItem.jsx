import { useNavigate } from 'react-router-dom';
import { MoreVertical, Eye, Edit, Copy, Trash2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Badge from '../ui/Badge';
import { SEVERITY_RATINGS } from '../../utils/constants';
import { formatDate } from '../../utils/date';

const getSeverityLabel = (v) => SEVERITY_RATINGS.find(r => r.value === v)?.label || v;

export default function ReportListItem({ report, onDelete, onDuplicate }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => { if (!menuRef.current?.contains(e.target)) setMenuOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  const { property, summary, status, updatedAt, id } = report;
  const address = [property.addressStreet, property.addressCity].filter(Boolean).join(', ');

  return (
    <div className="card p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-army-900 truncate">{property.customerName || 'Untitled Inspection'}</span>
          <Badge type="severity" value={summary.severityRating} label={getSeverityLabel(summary.severityRating)} />
          <Badge type="status" value={status} label={status === 'final' ? 'Final' : 'Draft'} />
        </div>
        {address && <p className="text-sm text-army-600 mt-0.5 truncate">{address}</p>}
        <div className="flex gap-3 mt-1 text-xs text-army-400">
          {property.inspectionDate && <span>Inspected {formatDate(property.inspectionDate)}</span>}
          {updatedAt && <span>Updated {formatDate(updatedAt)}</span>}
        </div>
      </div>
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen(o => !o)}
          className="p-2 rounded-md hover:bg-army-50 text-army-500 min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <MoreVertical size={18} />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-full mt-1 bg-white border border-army-100 rounded-lg shadow-lg py-1 z-20 min-w-[140px]">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-army-800 hover:bg-army-50" onClick={() => { navigate(`/report/${id}`); setMenuOpen(false); }}>
              <Eye size={14} /> View Report
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-army-800 hover:bg-army-50" onClick={() => { navigate(`/inspection/${id}`); setMenuOpen(false); }}>
              <Edit size={14} /> Edit
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-army-800 hover:bg-army-50" onClick={() => { onDuplicate(id); setMenuOpen(false); }}>
              <Copy size={14} /> Duplicate
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-danger hover:bg-red-50" onClick={() => { onDelete(id); setMenuOpen(false); }}>
              <Trash2 size={14} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
