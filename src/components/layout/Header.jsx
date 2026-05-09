import { Link } from 'react-router-dom';
import { COMPANY } from '../../utils/constants';

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-army-700" fill="currentColor">
    <path d="M12 2C8 6 6 10 6 14c0 4 2 6 6 8 4-2 6-4 6-8 0-4-2-8-6-12zm0 4c2 2 3 4 3 6s-1 4-3 5c-2-1-3-3-3-5s1-4 3-6z"/>
  </svg>
);

export default function Header() {
  return (
    <header className="bg-army-900 text-white no-print">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <LeafIcon />
          <div>
            <div className="font-bold text-base leading-tight">{COMPANY.name}</div>
            <div className="text-army-300 text-xs">{COMPANY.tagline}</div>
          </div>
        </Link>
        <div className="hidden sm:flex flex-col items-end text-xs text-army-300">
          <span>{COMPANY.phone}</span>
          <span>{COMPANY.website}</span>
        </div>
      </div>
    </header>
  );
}
