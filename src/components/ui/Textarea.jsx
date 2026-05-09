export default function Textarea({ label, error, className = '', rows = 4, ...props }) {
  return (
    <div className={className}>
      {label && <label className="label-base">{label}</label>}
      <textarea
        rows={rows}
        className={`input-base resize-y ${error ? 'border-danger ring-1 ring-danger' : ''}`}
        {...props}
      />
      {error && <p className="text-danger text-xs mt-1">{error}</p>}
    </div>
  );
}
