import { COMPANY } from '../../utils/constants';

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 text-army-700" fill="currentColor">
    <path d="M12 2C8 6 6 10 6 14c0 4 2 6 6 8 4-2 6-4 6-8 0-4-2-8-6-12zm0 4c2 2 3 4 3 6s-1 4-3 5c-2-1-3-3-3-5s1-4 3-6z"/>
  </svg>
);

export default function ReportHeader() {
  return (
    <div className="flex items-center justify-between pb-4 border-b-2 border-army-800 mb-4">
      <div className="flex items-center gap-3">
        <LeafIcon />
        <div>
          <div className="font-bold text-army-900 text-lg">{COMPANY.name}</div>
          <div className="text-army-600 text-xs">{COMPANY.tagline}</div>
        </div>
      </div>
      <div className="text-right text-xs text-army-600 space-y-0.5">
        <div>{COMPANY.phone}</div>
        <div>{COMPANY.website}</div>
        <div>{COMPANY.license}</div>
      </div>
    </div>
  );
}
