export default function Checkbox({ label, checked, onChange, className = '' }) {
  return (
    <label className={`flex items-center gap-2 cursor-pointer min-h-[44px] ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-army-300 text-army-700 focus:ring-army-500"
      />
      <span className="text-sm text-army-900">{label}</span>
    </label>
  );
}
