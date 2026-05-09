import { useReport } from '../../context/ReportContext';
import Section from '../ui/Section';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { CAUSE_OF_LOSS } from '../../utils/constants';

export default function InsuranceSection() {
  const { report, dispatch } = useReport();
  const { insurance } = report;
  const update = (path, value) => dispatch({ type: 'UPDATE_FIELD', path, value });

  const complete = !!(insurance.carrier && insurance.policyNumber);

  return (
    <Section title="Insurance Information" complete={complete}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Insurance Carrier" value={insurance.carrier} onChange={e => update('insurance.carrier', e.target.value)} placeholder="State Farm, Allstate..." />
          <Input label="Policy Number" value={insurance.policyNumber} onChange={e => update('insurance.policyNumber', e.target.value)} className="font-mono" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Claim Number" value={insurance.claimNumber} onChange={e => update('insurance.claimNumber', e.target.value)} />
          <Input label="Date of Loss" type="date" value={insurance.dateOfLoss} onChange={e => update('insurance.dateOfLoss', e.target.value)} />
        </div>
        <Select
          label="Cause of Loss"
          value={insurance.causeOfLoss}
          onChange={e => update('insurance.causeOfLoss', e.target.value)}
          options={CAUSE_OF_LOSS}
          placeholder="Select cause..."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Adjuster Name" value={insurance.adjusterName} onChange={e => update('insurance.adjusterName', e.target.value)} />
          <Input label="Adjuster Phone" type="tel" inputMode="tel" value={insurance.adjusterPhone} onChange={e => update('insurance.adjusterPhone', e.target.value)} />
        </div>
        <Input label="Mortgage Company" value={insurance.mortgageCompany} onChange={e => update('insurance.mortgageCompany', e.target.value)} />
      </div>
    </Section>
  );
}
