const SEVERITY_COLORS = {
  minor: 'bg-army-100 text-army-800',
  moderate: 'bg-yellow-100 text-yellow-800',
  severe: 'bg-orange-100 text-orange-800',
  total_loss: 'bg-red-100 text-red-800',
};

const STATUS_COLORS = {
  draft: 'bg-gray-100 text-gray-700',
  final: 'bg-army-100 text-army-800',
};

const CLAIM_COLORS = {
  yes: 'bg-green-100 text-green-800',
  possible: 'bg-yellow-100 text-yellow-800',
  no: 'bg-gray-100 text-gray-700',
};

export default function Badge({ type = 'default', value, label, className = '' }) {
  let colorClass = 'bg-army-100 text-army-800';
  if (type === 'severity') colorClass = SEVERITY_COLORS[value] || colorClass;
  if (type === 'status') colorClass = STATUS_COLORS[value] || colorClass;
  if (type === 'claim') colorClass = CLAIM_COLORS[value] || colorClass;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass} ${className}`}>
      {label}
    </span>
  );
}
