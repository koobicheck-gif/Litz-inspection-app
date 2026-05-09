import { useReport } from '../../context/ReportContext';
import Section from '../ui/Section';
import Textarea from '../ui/Textarea';
import Select from '../ui/Select';
import RadioGroup from '../ui/RadioGroup';
import { SEVERITY_RATINGS, CLAIM_RECOMMENDATIONS } from '../../utils/constants';

export default function SummarySection({ errors = {} }) {
  const { report, dispatch } = useReport();
  const { summary } = report;

  const update = (path, value) => dispatch({ type: 'UPDATE_FIELD', path, value });

  const complete = !!(summary.findings.trim() && summary.recommendedAction.trim());

  return (
    <Section title="Summary & Recommended Action" defaultOpen={true} complete={complete}>
      <div className="space-y-4">
        <Textarea
          label="Inspection Findings"
          value={summary.findings}
          onChange={e => update('summary.findings', e.target.value)}
          rows={5}
          placeholder="Describe the overall condition of the roof, damage observed, and any concerns..."
          error={errors['summary.findings']}
        />
        <Textarea
          label="Recommended Action"
          value={summary.recommendedAction}
          onChange={e => update('summary.recommendedAction', e.target.value)}
          rows={4}
          placeholder="Detail what action the homeowner should take..."
          error={errors['summary.recommendedAction']}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Severity Rating"
            value={summary.severityRating}
            onChange={e => update('summary.severityRating', e.target.value)}
            options={SEVERITY_RATINGS}
          />
          <Select
            label="Insurance Claim Recommendation"
            value={summary.insuranceClaimRecommendation}
            onChange={e => update('summary.insuranceClaimRecommendation', e.target.value)}
            options={CLAIM_RECOMMENDATIONS}
          />
        </div>
      </div>
    </Section>
  );
}
