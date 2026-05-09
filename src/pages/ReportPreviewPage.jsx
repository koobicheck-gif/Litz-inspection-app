import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Printer, Download, CheckCircle } from 'lucide-react';
import { storageService } from '../services/storageService';
import { pdfService } from '../services/pdfService';
import ReportPreview from '../components/report/ReportPreview';
import Button from '../components/ui/Button';

export default function ReportPreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const previewRef = useRef();

  useEffect(() => {
    storageService.getReport(id).then(r => {
      if (!r) navigate('/');
      else { setReport(r); setLoading(false); }
    });
  }, [id, navigate]);

  const handlePrint = () => window.print();

  const handleDownload = async () => {
    setGeneratingPdf(true);
    try {
      const name = report.property?.customerName?.replace(/\s+/g, '_') || 'inspection';
      const date = report.property?.inspectionDate || new Date().toISOString().split('T')[0];
      await pdfService.downloadPdf(previewRef.current, `litz_${name}_${date}.pdf`);
    } finally {
      setGeneratingPdf(false);
    }
  };

  const handleMarkFinal = async () => {
    const updated = { ...report, status: report.status === 'final' ? 'draft' : 'final' };
    const saved = await storageService.saveReport(updated);
    setReport(saved);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-army-500 text-sm">Loading report...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-army-200 shadow-sm no-print">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-3 flex-wrap">
          <Link to={`/inspection/${id}`} className="flex items-center gap-1 text-army-600 hover:text-army-900 text-sm">
            <ArrowLeft size={16} /> Back to Edit
          </Link>
          <span className="flex-1" />
          <Button
            variant={report.status === 'final' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={handleMarkFinal}
            className="flex items-center gap-1"
          >
            <CheckCircle size={14} className={report.status === 'final' ? 'text-army-700' : ''} />
            {report.status === 'final' ? 'Marked Final' : 'Mark as Final'}
          </Button>
          <Button variant="secondary" size="sm" onClick={handlePrint}>
            <Printer size={14} /> Print
          </Button>
          <Button size="sm" onClick={handleDownload} disabled={generatingPdf}>
            <Download size={14} /> {generatingPdf ? 'Generating...' : 'Download PDF'}
          </Button>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-gray-200 min-h-screen py-8 px-4 print:bg-white print:p-0 print:m-0">
        <div ref={previewRef} className="shadow-xl print:shadow-none">
          <ReportPreview report={report} />
        </div>
      </div>
    </div>
  );
}
