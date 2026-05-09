import ReportHeader from './ReportHeader';
import ReportFooter from './ReportFooter';
import ReportField from './ReportField';
import ReportPhotoGrid from './ReportPhotoGrid';
import Badge from '../ui/Badge';
import { SEVERITY_RATINGS, CLAIM_RECOMMENDATIONS, PHOTO_CATEGORIES, SCOPE_ITEMS } from '../../utils/constants';
import { formatDate } from '../../utils/date';

const getSeverityLabel = (v) => SEVERITY_RATINGS.find(r => r.value === v)?.label || v;
const getClaimLabel = (v) => CLAIM_RECOMMENDATIONS.find(r => r.value === v)?.label || v;

const ConditionBadge = ({ value }) => {
  const colors = { good: 'text-green-700', fair: 'text-yellow-700', poor: 'text-orange-700', damaged: 'text-red-700', na: 'text-gray-500' };
  return <span className={`text-sm font-medium ${colors[value] || 'text-gray-700'}`}>{value?.toUpperCase()}</span>;
};

export default function ReportPreview({ report }) {
  const { summary, property, insurance, roofSpecs, damage, photos, recommendations } = report;

  const fullAddress = [property.addressStreet, property.addressCity, property.addressState, property.addressZip].filter(Boolean).join(', ');
  const checkedSoftMetals = Object.entries(damage.softMetals).filter(([k,v]) => v === true && k !== 'otherNotes').map(([k]) => k);
  const checkedCollateral = Object.entries(damage.collateral).filter(([k,v]) => v === true && k !== 'notes').map(([k]) => k);
  const checkedScope = SCOPE_ITEMS.filter(item => recommendations.scopeItems[item.key]);
  const photoCategories = PHOTO_CATEGORIES.filter(cat => photos[cat.key]?.length > 0);

  const SOFT_LABELS = { gutters:'Gutters', vents:'Vents', acFins:'AC Fins', windowWraps:'Window Wraps', garageDoor:'Garage Door' };
  const COLLATERAL_LABELS = { siding:'Siding', fence:'Fence', screens:'Screens', paint:'Paint', deckPatio:'Deck/Patio' };

  return (
    <div className="bg-white text-gray-900 font-sans text-sm leading-relaxed" style={{maxWidth:'720px', margin:'0 auto', padding:'32px'}}>
      <ReportHeader />

      {/* Cover */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-army-900 tracking-wide uppercase mb-2">Roof Inspection Report</h1>
        <p className="text-lg text-army-700 font-medium">{property.customerName || 'Customer'}</p>
        <p className="text-gray-600">{fullAddress}</p>
        <p className="text-gray-500 text-xs mt-1">Inspection Date: {formatDate(property.inspectionDate)} · Inspector: {property.inspectorName}</p>
        <div className="flex justify-center gap-4 mt-4">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Severity Rating</div>
            <Badge type="severity" value={summary.severityRating} label={getSeverityLabel(summary.severityRating)} />
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Insurance Claim</div>
            <Badge type="claim" value={summary.insuranceClaimRecommendation} label={getClaimLabel(summary.insuranceClaimRecommendation)} />
          </div>
        </div>
      </div>

      {/* Findings */}
      {summary.findings && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-army-800 mb-2 pb-1 border-b border-army-200">Inspection Findings</h2>
          <p className="text-sm text-gray-800 whitespace-pre-wrap">{summary.findings}</p>
        </div>
      )}
      {summary.recommendedAction && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-army-800 mb-2 pb-1 border-b border-army-200">Recommended Action</h2>
          <p className="text-sm text-gray-800 whitespace-pre-wrap">{summary.recommendedAction}</p>
        </div>
      )}

      <div className="page-break" />

      {/* Property & Insurance */}
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div>
          <h2 className="text-base font-semibold text-army-800 mb-2 pb-1 border-b border-army-200">Property Details</h2>
          <ReportField label="Customer" value={property.customerName} />
          <ReportField label="Phone" value={property.customerPhone} />
          <ReportField label="Email" value={property.customerEmail} />
          <ReportField label="Address" value={fullAddress} />
          <ReportField label="Inspection Date" value={formatDate(property.inspectionDate)} />
          <ReportField label="Inspector" value={property.inspectorName} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-army-800 mb-2 pb-1 border-b border-army-200">Insurance Information</h2>
          <ReportField label="Carrier" value={insurance.carrier} />
          <ReportField label="Policy #" value={insurance.policyNumber} mono />
          <ReportField label="Claim #" value={insurance.claimNumber} mono />
          <ReportField label="Date of Loss" value={formatDate(insurance.dateOfLoss)} />
          <ReportField label="Cause of Loss" value={insurance.causeOfLoss} />
          <ReportField label="Adjuster" value={insurance.adjusterName} />
          <ReportField label="Adj. Phone" value={insurance.adjusterPhone} />
          <ReportField label="Mortgage Co." value={insurance.mortgageCompany} />
        </div>
      </div>

      <div className="page-break" />

      {/* Roof Specs */}
      <div className="mb-6">
        <h2 className="text-base font-semibold text-army-800 mb-2 pb-1 border-b border-army-200">Roof Specifications</h2>
        <div className="grid grid-cols-2 gap-x-8">
          <div>
            <ReportField label="Roof Type" value={roofSpecs.roofType} />
            <ReportField label="Age" value={roofSpecs.ageYears ? `${roofSpecs.ageYears} years` : null} />
            <ReportField label="Layers" value={roofSpecs.layers} />
            <ReportField label="Squares" value={roofSpecs.squaresEstimated} />
            <ReportField label="Pitch" value={roofSpecs.pitch} />
            <ReportField label="Stories" value={roofSpecs.stories} />
            <ReportField label="Manufacturer" value={roofSpecs.manufacturer} />
            <ReportField label="Shingle Line" value={roofSpecs.shingleLine} />
            <ReportField label="Color" value={roofSpecs.color} />
          </div>
          <div>
            <ReportField label="Decking Type" value={roofSpecs.deckingType} />
            <ReportField label="Decking Condition" value={roofSpecs.deckingCondition} />
            <ReportField label="Underlayment" value={roofSpecs.underlaymentType} />
            <ReportField label="Drip Edge" value={roofSpecs.dripEdgePresent ? `Yes — ${roofSpecs.dripEdgeCondition}` : 'No'} />
            <ReportField label="Ice/Water Shield" value={roofSpecs.iceWaterShieldPresent ? 'Yes' : 'No'} />
            <ReportField label="Ventilation" value={roofSpecs.ventilation.adequacy} />
            <ReportField label="Gutters" value={roofSpecs.gutters.type ? `${roofSpecs.gutters.type} — ${roofSpecs.gutters.condition}` : null} />
          </div>
        </div>

        <h3 className="text-sm font-semibold text-army-700 mt-4 mb-2">Flashing Conditions</h3>
        <div className="grid grid-cols-4 gap-4 text-center">
          {[['chimney','Chimney'],['wall','Wall'],['valley','Valley'],['ventPipe','Vent Pipe']].map(([k,l]) => (
            <div key={k} className="bg-gray-50 rounded p-2">
              <div className="text-xs text-gray-500 mb-1">{l}</div>
              <ConditionBadge value={roofSpecs.flashing[k]} />
            </div>
          ))}
        </div>
      </div>

      <div className="page-break" />

      {/* Damage Assessment */}
      <div className="mb-6">
        <h2 className="text-base font-semibold text-army-800 mb-3 pb-1 border-b border-army-200">Damage Assessment</h2>

        {damage.hail.testSquares.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-army-700 mb-2">Hail — Test Squares</h3>
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-army-50">
                  <th className="text-left p-2 border border-gray-200">Slope</th>
                  <th className="text-left p-2 border border-gray-200">Hits</th>
                  <th className="text-left p-2 border border-gray-200">Size</th>
                  <th className="text-left p-2 border border-gray-200">Notes</th>
                </tr>
              </thead>
              <tbody>
                {damage.hail.testSquares.map((sq, i) => (
                  <tr key={i} className="even:bg-gray-50">
                    <td className="p-2 border border-gray-200 capitalize">{sq.slope}</td>
                    <td className="p-2 border border-gray-200">{sq.hits}</td>
                    <td className="p-2 border border-gray-200">{sq.hitSize}</td>
                    <td className="p-2 border border-gray-200">{sq.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-4 mt-2 text-xs text-gray-600">
              <span>Granule Loss: <strong>{damage.hail.granuleLoss}</strong></span>
              {damage.hail.matExposure && <span className="text-red-700 font-medium">Mat Exposure: YES</span>}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-8 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-army-700 mb-2">Wind Damage</h3>
            <ReportField label="Lifted Shingles" value={damage.wind.liftedShingles || null} />
            <ReportField label="Creased Shingles" value={damage.wind.creasedShingles || null} />
            <ReportField label="Missing Shingles" value={damage.wind.missingShingles || null} />
            <ReportField label="Seal Strip" value={damage.wind.sealStripIntegrity} />
          </div>
          <div>
            {checkedSoftMetals.length > 0 && (
              <>
                <h3 className="text-sm font-semibold text-army-700 mb-2">Soft Metals Damage</h3>
                <ul className="text-sm text-gray-800 space-y-0.5">
                  {checkedSoftMetals.map(k => <li key={k}>✓ {SOFT_LABELS[k]}</li>)}
                </ul>
                {damage.softMetals.otherNotes && <p className="text-xs text-gray-600 mt-1">{damage.softMetals.otherNotes}</p>}
              </>
            )}
          </div>
        </div>

        {checkedCollateral.length > 0 && (
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-army-700 mb-2">Collateral Damage</h3>
            <div className="flex flex-wrap gap-2">
              {checkedCollateral.map(k => (
                <span key={k} className="bg-orange-50 text-orange-800 text-xs px-2 py-1 rounded">{COLLATERAL_LABELS[k]}</span>
              ))}
            </div>
            {damage.collateral.notes && <p className="text-xs text-gray-600 mt-1">{damage.collateral.notes}</p>}
          </div>
        )}

        {damage.codeUpgradesNeeded && <ReportField label="Code Upgrades" value={damage.codeUpgradesNeeded} />}
        {damage.additionalNotes && (
          <div className="mt-2">
            <span className="text-xs text-gray-500">Additional Notes</span>
            <p className="text-sm text-gray-800 mt-1 whitespace-pre-wrap">{damage.additionalNotes}</p>
          </div>
        )}
      </div>

      {/* Photos */}
      {photoCategories.length > 0 && (
        <>
          <div className="page-break" />
          <h2 className="text-base font-semibold text-army-800 mb-4 pb-1 border-b border-army-200">Photo Documentation</h2>
          {photoCategories.map(cat => (
            <ReportPhotoGrid key={cat.key} photos={photos[cat.key]} label={cat.label} />
          ))}
        </>
      )}

      {/* Recommendations */}
      <div className="page-break" />
      <div className="mb-6">
        <h2 className="text-base font-semibold text-army-800 mb-3 pb-1 border-b border-army-200">Recommendations & Scope</h2>
        {recommendations.repairOrReplace && (
          <div className="mb-3 p-3 bg-army-50 rounded-lg">
            <span className="text-sm text-army-700 font-medium">Recommendation: </span>
            <span className="text-sm text-army-900 font-bold capitalize">{recommendations.repairOrReplace}</span>
          </div>
        )}
        {checkedScope.length > 0 && (
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-army-700 mb-2">Scope of Work</h3>
            <ul className="text-sm text-gray-800 space-y-1">
              {checkedScope.map(item => <li key={item.key}>• {item.label}</li>)}
            </ul>
          </div>
        )}
        {recommendations.codeUpgrades && <ReportField label="Code Upgrades" value={recommendations.codeUpgrades} />}
        {recommendations.customerRequestedItems && <ReportField label="Customer Requests" value={recommendations.customerRequestedItems} />}
        {recommendations.estimatedTimeline && <ReportField label="Est. Timeline" value={recommendations.estimatedTimeline} />}
      </div>

      {/* Signature */}
      <div className="mt-8 pt-4 border-t border-gray-300">
        <div className="grid grid-cols-3 gap-6 text-sm">
          <div>
            <div className="text-xs text-gray-500 mb-1">Inspector</div>
            <div className="font-medium">{property.inspectorSignature || property.inspectorName}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Date</div>
            <div className="font-medium">{formatDate(property.inspectionDate)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">License</div>
            <div className="font-mono text-xs">{'OK License # PLACEHOLDER'}</div>
          </div>
        </div>
      </div>

      <ReportFooter />
    </div>
  );
}
