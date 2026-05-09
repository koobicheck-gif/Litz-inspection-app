import ReportListItem from './ReportListItem';

export default function ReportList({ reports, onDelete, onDuplicate }) {
  return (
    <div className="space-y-3">
      {reports.map(r => (
        <ReportListItem key={r.id} report={r} onDelete={onDelete} onDuplicate={onDuplicate} />
      ))}
    </div>
  );
}
