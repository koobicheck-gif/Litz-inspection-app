import { COMPANY } from '../../utils/constants';

export default function ReportFooter() {
  return (
    <div className="mt-8 pt-4 border-t border-gray-300 text-xs text-gray-500 text-center">
      {COMPANY.name} · {COMPANY.phone} · {COMPANY.email} · {COMPANY.website} · {COMPANY.license}
    </div>
  );
}
