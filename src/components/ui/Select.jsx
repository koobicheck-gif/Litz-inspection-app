export default function Select({ label, error, options = [], className = '', placeholder, ...props }) {
  return (
    <div className={className}>
      {label && <label className="label-base">{label}</label>}
      <select
        className={`input-base ${error ? 'border-danger ring-1 ring-danger' : ''}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt =>
          typeof opt === 'string'
            ? <option key={opt} value={opt}>{opt}</option>
            : <option key={opt.value} value={opt.value}>{opt.label}</option>
        )}
      </select>
      {error && <p className="text-danger text-xs mt-1">{error}</p>}
    </div>
  );
}
