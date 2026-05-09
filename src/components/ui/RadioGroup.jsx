export default function RadioGroup({ label, name, options, value, onChange, className = '' }) {
  return (
    <div className={className}>
      {label && <label className="label-base">{label}</label>}
      <div className="flex flex-wrap gap-3">
        {options.map(opt => (
          <label key={opt.value} className="flex items-center gap-2 cursor-pointer min-h-[44px]">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="text-army-700 focus:ring-army-500"
            />
            <span className="text-sm text-army-900">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
