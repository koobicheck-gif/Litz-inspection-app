import { useReport } from '../../context/ReportContext';
import Section from '../ui/Section';
import RadioGroup from '../ui/RadioGroup';
import Checkbox from '../ui/Checkbox';
import Textarea from '../ui/Textarea';
import Input from '../ui/Input';
import { SCOPE_ITEMS } from '../../utils/constants';

const REPAIR_REPLACE = [
  { value: 'repair', label: 'Repair' },
  { value: 'replace', label: 'Replace' },
  { value: 'monitor', label: 'Monitor' },
];

export default function RecommendationsSection() {
  const { report, dispatch } = useReport();
  const { recommendations } = report;
  const update = (path, value) => dispatch({ type: 'UPDATE_FIELD', path, value });

  const complete = !!recommendations.repairOrReplace;

  return (
    <Section title="Recommendations & Scope" complete={complete}>
      <div className="space-y-5">
        <RadioGroup
          label="Repair or Replace?"
          name="repairOrReplace"
          options={REPAIR_REPLACE}
          value={recommendations.repairOrReplace}
          onChange={v => update('recommendations.repairOrReplace', v)}
        />

        <div>
          <label className="label-base">Scope of Work</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {SCOPE_ITEMS.map(item => (
              <Checkbox
                key={item.key}
                label={item.label}
                checked={recommendations.scopeItems[item.key]}
                onChange={e => update(`recommendations.scopeItems.${item.key}`, e.target.checked)}
              />
            ))}
          </div>
        </div>

        <Textarea label="Code Upgrades" value={recommendations.codeUpgrades} onChange={e => update('recommendations.codeUpgrades', e.target.value)} rows={2} />
        <Textarea label="Customer Requested Items" value={recommendations.customerRequestedItems} onChange={e => update('recommendations.customerRequestedItems', e.target.value)} rows={2} />
        <Input label="Estimated Timeline" value={recommendations.estimatedTimeline} onChange={e => update('recommendations.estimatedTimeline', e.target.value)} placeholder="e.g. 2-3 weeks pending material availability" />
      </div>
    </Section>
  );
}
