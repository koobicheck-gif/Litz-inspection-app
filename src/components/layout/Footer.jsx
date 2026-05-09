import { COMPANY } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className="bg-army-950 text-army-400 text-xs py-4 mt-auto no-print">
      <div className="max-w-5xl mx-auto px-4 flex flex-wrap gap-2 items-center justify-between">
        <span>{COMPANY.name} · {COMPANY.license}</span>
        <span>{COMPANY.phone} · {COMPANY.website}</span>
      </div>
    </footer>
  );
}
