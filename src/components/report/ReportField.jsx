export default function ReportField({ label, value, mono = false }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex py-1.5 border-b border-gray-100 last:border-0">
      <span className="text-xs text-gray-500 w-40 shrink-0">{label}</span>
      <span className={`text-sm text-gray-900 flex-1 ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  );
}
