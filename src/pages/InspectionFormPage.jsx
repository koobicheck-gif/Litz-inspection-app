import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, FileText, Trash2, Clock } from 'lucide-react';
import { ReportProvider, useReport } from '../context/ReportContext';
import { storageService } from '../services/storageService';
import { useAutosave } from '../hooks/useAutosave';
import { getMissingFields } from '../utils/validation';
import { createBlankReport } from '../data/defaultReport';
import { formatTime } from '../utils/date';
import { PHOTO_CATEGORIES } from '../utils/constants';

import SummarySection from '../components/form/SummarySection';
import PropertyDetailsSection from '../components/form/PropertyDetailsSection';
import InsuranceSection from '../components/form/InsuranceSection';
import RoofSpecsSection from '../components/form/RoofSpecsSection';
import DamageSection from '../components/form/DamageSection';
import PhotoSection from '../components/form/PhotoSection';
import RecommendationsSection from '../components/form/RecommendationsSection';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import PageContainer from '../components/layout/PageContainer';

function FormInner({ reportId }) {
  const navigate = useNavigate();
  const { report, dispatch, save } = useReport();
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [errors, setErrors] = useState({});
  const [showValidation, setShowValidation] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const doSave = useCallback(async () => {
    const saved = await save();
    if (!report.id) dispatch({ type: 'LOAD', payload: saved });
    setLastSavedAt(new Date());
    return saved;
  }, [save, report.id, dispatch]);

  useAutosave(report, doSave);

  const handleGenerate = async () => {
    const missing = getMissingFields(report);
    if (missing.length) {
      const fieldErrors = {};
      missing.forEach(f => { fieldErrors[f.path] = 'Recommended field'; });
      setErrors(fieldErrors);
      setShowValidation(true);
      return;
    }
    const saved = await doSave();
    navigate(`/report/${saved.id}`);
  };

  const handleGenerateAnyway = async () => {
    setShowValidation(false);
    const saved = await doSave();
    navigate(`/report/${saved.id}`);
  };

  const handleDelete = async () => {
    if (report.id) await storageService.deleteReport(report.id);
    navigate('/');
  };

  const missing = getMissingFields(report);
  const title = report.property?.customerName || 'Untitled Inspection';

  const hasElevationPhotos = ['frontElevation','rearElevation','leftElevation','rightElevation'].some(
    k => report.photos[k]?.length > 0
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-army-200 shadow-sm no-print">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-3 flex-wrap">
          <Link to="/" className="flex items-center gap-1 text-army-600 hover:text-army-900 text-sm">
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <span className="text-army-300">|</span>
          <span className="font-medium text-army-900 text-sm truncate flex-1">{title}</span>
          <div className="flex items-center gap-2 ml-auto">
            {lastSavedAt && (
              <span className="text-xs text-army-400 flex items-center gap-1">
                <Clock size={12} /> Saved {formatTime(lastSavedAt.toISOString())}
              </span>
            )}
            <Button variant="secondary" size="sm" onClick={doSave}>
              <Save size={14} /> Save Draft
            </Button>
            <Button size="sm" onClick={handleGenerate}>
              <FileText size={14} /> Generate Report
            </Button>
          </div>
        </div>
      </div>

      <PageContainer>
        <div className="space-y-4 pb-24">
          <SummarySection errors={errors} />
          <PropertyDetailsSection errors={errors} />
          <InsuranceSection />
          <RoofSpecsSection />
          <DamageSection />

          <Section title="Photo Documentation" subtitle="All 15 photo categories" complete={hasElevationPhotos}>
            <div className="space-y-3">
              {PHOTO_CATEGORIES.map(cat => (
                <PhotoSection key={cat.key} category={cat.key} label={cat.label} description={cat.description} />
              ))}
            </div>
          </Section>

          <RecommendationsSection />
        </div>

        {/* Bottom action bar (mobile) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-army-200 p-3 flex gap-2 justify-between sm:hidden no-print z-30">
          <Button variant="ghost" size="sm" onClick={() => setShowDelete(true)} className="text-danger">
            <Trash2 size={14} />
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={doSave}><Save size={14} /> Save</Button>
            <Button size="sm" onClick={handleGenerate}><FileText size={14} /> Generate</Button>
          </div>
        </div>

        {/* Desktop delete */}
        <div className="hidden sm:flex justify-center mt-4 no-print">
          <Button variant="ghost" onClick={() => setShowDelete(true)} className="text-danger text-sm">
            <Trash2 size={14} /> Delete Inspection
          </Button>
        </div>
      </PageContainer>

      {/* Validation modal */}
      <Modal open={showValidation} onClose={() => setShowValidation(false)} title="Incomplete Fields">
        <p className="text-sm text-gray-600 mb-3">
          {missing.length} recommended field{missing.length !== 1 ? 's' : ''} {missing.length !== 1 ? 'are' : 'is'} empty for a complete report:
        </p>
        <ul className="text-sm text-army-800 mb-4 space-y-1">
          {missing.map(f => <li key={f.path} className="flex items-center gap-2">· {f.label}</li>)}
        </ul>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setShowValidation(false)}>Go Back</Button>
          <Button onClick={handleGenerateAnyway}>Generate Anyway</Button>
        </div>
      </Modal>

      {/* Delete modal */}
      <Modal open={showDelete} onClose={() => setShowDelete(false)} title="Delete Inspection?">
        <p className="text-sm text-gray-600 mb-4">This will permanently delete the inspection and cannot be undone.</p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setShowDelete(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}

export default function InspectionFormPage() {
  const { id } = useParams();
  const [initialReport, setInitialReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (id && id !== 'new') {
        const report = await storageService.getReport(id);
        setInitialReport(report || createBlankReport());
      } else {
        setInitialReport(createBlankReport());
      }
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-army-500 text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <ReportProvider initialReport={initialReport}>
      <FormInner reportId={id} />
    </ReportProvider>
  );
}
