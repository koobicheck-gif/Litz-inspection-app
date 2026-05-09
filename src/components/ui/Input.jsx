export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <label className="label-base">{label}</label>}
      <input
        className={`input-base ${error ? 'border-danger ring-1 ring-danger' : ''}`}
        {...props}
      />
      {error && <p className="text-danger text-xs mt-1">{error}</p>}
    </div>
  );
}
