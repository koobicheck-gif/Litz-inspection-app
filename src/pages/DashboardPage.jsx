import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { storageService } from '../services/storageService';
import ReportList from '../components/dashboard/ReportList';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import PageContainer from '../components/layout/PageContainer';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = () => storageService.listReports().then(setReports);

  useEffect(() => { load(); }, []);

  const handleDelete = (id) => setDeleteTarget(id);

  const confirmDelete = async () => {
    await storageService.deleteReport(deleteTarget);
    setDeleteTarget(null);
    load();
  };

  const handleDuplicate = async (id) => {
    await storageService.duplicateReport(id);
    load();
  };

  const filtered = reports.filter(r => {
    if (filter === 'draft' && r.status !== 'draft') return false;
    if (filter === 'final' && r.status !== 'final') return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        r.property?.customerName?.toLowerCase().includes(q) ||
        r.property?.addressStreet?.toLowerCase().includes(q) ||
        r.property?.addressCity?.toLowerCase().includes(q) ||
        r.insurance?.claimNumber?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-army-900">Inspections</h1>
        <Button onClick={() => navigate('/inspection/new')}>
          <Plus size={16} /> New Inspection
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-army-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, address, claim #..."
            className="input-base pl-9"
          />
        </div>
        <div className="flex gap-2">
          {['all','draft','final'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-md text-sm font-medium min-h-[44px] transition-colors ${filter === f ? 'bg-army-800 text-white' : 'bg-army-100 text-army-700 hover:bg-army-200'}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <ReportList reports={filtered} onDelete={handleDelete} onDuplicate={handleDuplicate} />
      ) : (
        <div className="bg-army-50 rounded-xl p-12 text-center">
          <div className="text-4xl mb-4">🏠</div>
          <h2 className="text-lg font-semibold text-army-800 mb-2">
            {search || filter !== 'all' ? 'No matching inspections' : 'No inspections yet'}
          </h2>
          <p className="text-army-600 text-sm mb-6">
            {search || filter !== 'all' ? 'Try adjusting your search or filter.' : 'Start your first inspection report.'}
          </p>
          {!search && filter === 'all' && (
            <Button onClick={() => navigate('/inspection/new')}>
              <Plus size={16} /> Start First Inspection
            </Button>
          )}
        </div>
      )}

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Inspection?">
        <p className="text-sm text-gray-600 mb-4">This action cannot be undone. The report will be permanently deleted.</p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </PageContainer>
  );
}
