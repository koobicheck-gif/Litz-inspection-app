import { useReport } from '../../context/ReportContext';
import Section from '../ui/Section';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';
import { ROOF_TYPES, DECKING_TYPES, CONDITION_LEVELS } from '../../utils/constants';

const ADEQUACY = [
  { value: 'inadequate', label: 'Inadequate' },
  { value: 'adequate', label: 'Adequate' },
  { value: 'good', label: 'Good' },
];

const STORIES = [
  { value: '1', label: '1 Story' },
  { value: '1.5', label: '1.5 Stories' },
  { value: '2', label: '2 Stories' },
  { value: '3', label: '3 Stories' },
];

const FLASHING_AREAS = ['chimney', 'wall', 'valley', 'ventPipe'];
const FLASHING_LABELS = { chimney: 'Chimney', wall: 'Wall', valley: 'Valley', ventPipe: 'Vent Pipe' };

export default function RoofSpecsSection() {
  const { report, dispatch } = useReport();
  const { roofSpecs } = report;
  const update = (path, value) => dispatch({ type: 'UPDATE_FIELD', path, value });

  const complete = !!(roofSpecs.roofType && roofSpecs.ageYears && roofSpecs.squaresEstimated);

  return (
    <Section title="Roof Specifications" complete={complete}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Select label="Roof Type" value={roofSpecs.roofType} onChange={e => update('roofSpecs.roofType', e.target.value)} options={ROOF_TYPES} placeholder="Select..." className="col-span-2 sm:col-span-1" />
          <Input label="Age (years)" inputMode="numeric" value={roofSpecs.ageYears} onChange={e => update('roofSpecs.ageYears', e.target.value)} placeholder="e.g. 12" />
          <Input label="Layers" inputMode="numeric" value={roofSpecs.layers} onChange={e => update('roofSpecs.layers', e.target.value)} />
          <Input label="Est. Squares" inputMode="numeric" value={roofSpecs.squaresEstimated} onChange={e => update('roofSpecs.squaresEstimated', e.target.value)} placeholder="e.g. 28" />
          <Input label="Pitch" value={roofSpecs.pitch} onChange={e => update('roofSpecs.pitch', e.target.value)} placeholder="6/12" />
          <Select label="Stories" value={roofSpecs.stories} onChange={e => update('roofSpecs.stories', e.target.value)} options={STORIES} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="Manufacturer" value={roofSpecs.manufacturer} onChange={e => update('roofSpecs.manufacturer', e.target.value)} />
          <Input label="Shingle Line" value={roofSpecs.shingleLine} onChange={e => update('roofSpecs.shingleLine', e.target.value)} />
          <Input label="Color" value={roofSpecs.color} onChange={e => update('roofSpecs.color', e.target.value)} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-army-800 mb-3">Decking & Underlayment</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Select label="Decking Type" value={roofSpecs.deckingType} onChange={e => update('roofSpecs.deckingType', e.target.value)} options={DECKING_TYPES} placeholder="Select..." />
            <Select label="Decking Condition" value={roofSpecs.deckingCondition} onChange={e => update('roofSpecs.deckingCondition', e.target.value)} options={CONDITION_LEVELS.slice(0,3)} />
            <Input label="Underlayment Type" value={roofSpecs.underlaymentType} onChange={e => update('roofSpecs.underlaymentType', e.target.value)} placeholder="Synthetic, felt..." />
          </div>
          <div className="flex flex-wrap gap-4 mt-3">
            <Checkbox label="Drip Edge Present" checked={roofSpecs.dripEdgePresent} onChange={e => update('roofSpecs.dripEdgePresent', e.target.checked)} />
            {roofSpecs.dripEdgePresent && (
              <Select label="Drip Edge Condition" value={roofSpecs.dripEdgeCondition} onChange={e => update('roofSpecs.dripEdgeCondition', e.target.value)} options={CONDITION_LEVELS.slice(0,4)} className="min-w-[140px]" />
            )}
            <Checkbox label="Ice & Water Shield Present" checked={roofSpecs.iceWaterShieldPresent} onChange={e => update('roofSpecs.iceWaterShieldPresent', e.target.checked)} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-army-800 mb-3">Ventilation</h3>
          <div className="flex flex-wrap gap-4 mb-3">
            {['ridgeVent','boxVents','turbines','powerVent','soffit'].map(v => (
              <Checkbox key={v} label={v === 'ridgeVent' ? 'Ridge Vent' : v === 'boxVents' ? 'Box Vents' : v === 'turbines' ? 'Turbines' : v === 'powerVent' ? 'Power Vent' : 'Soffit'} checked={roofSpecs.ventilation[v]} onChange={e => update(`roofSpecs.ventilation.${v}`, e.target.checked)} />
            ))}
          </div>
          <Select label="Overall Ventilation Adequacy" value={roofSpecs.ventilation.adequacy} onChange={e => update('roofSpecs.ventilation.adequacy', e.target.value)} options={ADEQUACY} className="max-w-xs" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-army-800 mb-3">Flashing Conditions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FLASHING_AREAS.map(area => (
              <Select key={area} label={FLASHING_LABELS[area]} value={roofSpecs.flashing[area]} onChange={e => update(`roofSpecs.flashing.${area}`, e.target.value)} options={CONDITION_LEVELS} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-army-800 mb-3">Gutters / Skylights / Chimneys</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="Gutter Type" value={roofSpecs.gutters.type} onChange={e => update('roofSpecs.gutters.type', e.target.value)} placeholder={'5" K-style, 6" box...'} />
            <Select label="Gutter Condition" value={roofSpecs.gutters.condition} onChange={e => update('roofSpecs.gutters.condition', e.target.value)} options={CONDITION_LEVELS} />
            <Input label="Gutter Damage Notes" value={roofSpecs.gutters.damageNotes} onChange={e => update('roofSpecs.gutters.damageNotes', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
            <Input label="Skylight Count" inputMode="numeric" type="number" min="0" value={roofSpecs.skylights.count} onChange={e => update('roofSpecs.skylights.count', parseInt(e.target.value)||0)} />
            <Select label="Skylight Condition" value={roofSpecs.skylights.condition} onChange={e => update('roofSpecs.skylights.condition', e.target.value)} options={CONDITION_LEVELS} />
            <Input label="Chimney Count" inputMode="numeric" type="number" min="0" value={roofSpecs.chimneys.count} onChange={e => update('roofSpecs.chimneys.count', parseInt(e.target.value)||0)} />
            <Select label="Chimney Condition" value={roofSpecs.chimneys.condition} onChange={e => update('roofSpecs.chimneys.condition', e.target.value)} options={CONDITION_LEVELS} />
          </div>
        </div>
      </div>
    </Section>
  );
}
