import { useReport } from '../../context/ReportContext';
import Section from '../ui/Section';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { SLOPES, HIT_SIZES, CONDITION_LEVELS } from '../../utils/constants';
import { Plus, Trash2 } from 'lucide-react';

const GRANULE_LOSS = [
  { value: 'none', label: 'None' },
  { value: 'light', label: 'Light' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'heavy', label: 'Heavy' },
];

const SEAL_INTEGRITY = CONDITION_LEVELS.slice(0, 3);

export default function DamageSection() {
  const { report, dispatch } = useReport();
  const { damage } = report;
  const update = (path, value) => dispatch({ type: 'UPDATE_FIELD', path, value });

  return (
    <Section title="Damage Assessment">
      <div className="space-y-6">
        {/* Hail */}
        <div>
          <h3 className="text-sm font-semibold text-army-800 mb-3">Hail Damage</h3>
          <div className="space-y-3 mb-3">
            {damage.hail.testSquares.map((sq, i) => (
              <div key={i} className="bg-army-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-army-800">Test Square {i + 1}</span>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'REMOVE_TEST_SQUARE', index: i })}
                    className="text-danger hover:text-danger/80 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Select
                    label="Slope"
                    value={sq.slope}
                    onChange={e => dispatch({ type: 'UPDATE_TEST_SQUARE', index: i, field: 'slope', value: e.target.value })}
                    options={SLOPES}
                  />
                  <Input
                    label="# Hits"
                    type="number"
                    inputMode="numeric"
                    min="0"
                    value={sq.hits}
                    onChange={e => dispatch({ type: 'UPDATE_TEST_SQUARE', index: i, field: 'hits', value: parseInt(e.target.value)||0 })}
                  />
                  <Select
                    label="Hit Size"
                    value={sq.hitSize}
                    onChange={e => dispatch({ type: 'UPDATE_TEST_SQUARE', index: i, field: 'hitSize', value: e.target.value })}
                    options={HIT_SIZES}
                  />
                  <Input
                    label="Notes"
                    value={sq.notes}
                    onChange={e => dispatch({ type: 'UPDATE_TEST_SQUARE', index: i, field: 'notes', value: e.target.value })}
                    placeholder="Optional"
                  />
                </div>
              </div>
            ))}
          </div>
          {damage.hail.testSquares.length < 4 && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => dispatch({ type: 'ADD_TEST_SQUARE' })}
            >
              <Plus size={14} /> Add Test Square
            </Button>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <Select label="Granule Loss" value={damage.hail.granuleLoss} onChange={e => update('damage.hail.granuleLoss', e.target.value)} options={GRANULE_LOSS} />
            <Checkbox label="Mat Exposure" checked={damage.hail.matExposure} onChange={e => update('damage.hail.matExposure', e.target.checked)} />
          </div>
        </div>

        {/* Wind */}
        <div>
          <h3 className="text-sm font-semibold text-army-800 mb-3">Wind Damage</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Input label="Lifted Shingles" type="number" inputMode="numeric" min="0" value={damage.wind.liftedShingles} onChange={e => update('damage.wind.liftedShingles', parseInt(e.target.value)||0)} />
            <Input label="Creased Shingles" type="number" inputMode="numeric" min="0" value={damage.wind.creasedShingles} onChange={e => update('damage.wind.creasedShingles', parseInt(e.target.value)||0)} />
            <Input label="Missing Shingles" type="number" inputMode="numeric" min="0" value={damage.wind.missingShingles} onChange={e => update('damage.wind.missingShingles', parseInt(e.target.value)||0)} />
            <Select label="Seal Strip Integrity" value={damage.wind.sealStripIntegrity} onChange={e => update('damage.wind.sealStripIntegrity', e.target.value)} options={SEAL_INTEGRITY} />
          </div>
        </div>

        {/* Soft Metals */}
        <div>
          <h3 className="text-sm font-semibold text-army-800 mb-3">Soft Metals Damage</h3>
          <div className="flex flex-wrap gap-3 mb-3">
            {[['gutters','Gutters'],['vents','Vents'],['acFins','AC Fins'],['windowWraps','Window Wraps'],['garageDoor','Garage Door']].map(([key, label]) => (
              <Checkbox key={key} label={label} checked={damage.softMetals[key]} onChange={e => update(`damage.softMetals.${key}`, e.target.checked)} />
            ))}
          </div>
          <Input label="Other Soft Metals Notes" value={damage.softMetals.otherNotes} onChange={e => update('damage.softMetals.otherNotes', e.target.value)} />
        </div>

        {/* Collateral */}
        <div>
          <h3 className="text-sm font-semibold text-army-800 mb-3">Collateral Damage</h3>
          <div className="flex flex-wrap gap-3 mb-3">
            {[['siding','Siding'],['fence','Fence'],['screens','Screens'],['paint','Paint'],['deckPatio','Deck/Patio']].map(([key, label]) => (
              <Checkbox key={key} label={label} checked={damage.collateral[key]} onChange={e => update(`damage.collateral.${key}`, e.target.checked)} />
            ))}
          </div>
          <Textarea label="Collateral Damage Notes" value={damage.collateral.notes} onChange={e => update('damage.collateral.notes', e.target.value)} rows={2} />
        </div>

        {/* General */}
        <div className="grid grid-cols-1 gap-4">
          <Textarea label="Code Upgrades Needed" value={damage.codeUpgradesNeeded} onChange={e => update('damage.codeUpgradesNeeded', e.target.value)} rows={2} placeholder="Note any required code upgrades..." />
          <Textarea label="Additional Notes" value={damage.additionalNotes} onChange={e => update('damage.additionalNotes', e.target.value)} rows={3} />
        </div>
      </div>
    </Section>
  );
}
