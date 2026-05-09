import { useReport } from '../../context/ReportContext';
import Section from '../ui/Section';
import Input from '../ui/Input';

export default function PropertyDetailsSection({ errors = {} }) {
  const { report, dispatch } = useReport();
  const { property } = report;
  const update = (path, value) => dispatch({ type: 'UPDATE_FIELD', path, value });

  const complete = !!(property.customerName && property.addressStreet && property.addressCity && property.addressZip && property.inspectionDate && property.inspectorName);

  return (
    <Section title="Property Details" defaultOpen={true} complete={complete}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Customer Name" value={property.customerName} onChange={e => update('property.customerName', e.target.value)} error={errors['property.customerName']} placeholder="Full name" />
          <Input label="Customer Phone" type="tel" inputMode="tel" value={property.customerPhone} onChange={e => update('property.customerPhone', e.target.value)} placeholder="(405) 555-0000" />
        </div>
        <Input label="Customer Email" type="email" value={property.customerEmail} onChange={e => update('property.customerEmail', e.target.value)} placeholder="email@example.com" />
        <Input label="Street Address" value={property.addressStreet} onChange={e => update('property.addressStreet', e.target.value)} error={errors['property.addressStreet']} placeholder="123 Main St" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Input label="City" value={property.addressCity} onChange={e => update('property.addressCity', e.target.value)} error={errors['property.addressCity']} className="col-span-2" />
          <Input label="State" value={property.addressState} onChange={e => update('property.addressState', e.target.value)} placeholder="OK" />
          <Input label="ZIP" inputMode="numeric" value={property.addressZip} onChange={e => update('property.addressZip', e.target.value)} error={errors['property.addressZip']} placeholder="73101" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Inspection Date" type="date" value={property.inspectionDate} onChange={e => update('property.inspectionDate', e.target.value)} error={errors['property.inspectionDate']} />
          <Input label="Inspection Time" type="time" value={property.inspectionTime} onChange={e => update('property.inspectionTime', e.target.value)} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Inspector Name" value={property.inspectorName} onChange={e => update('property.inspectorName', e.target.value)} error={errors['property.inspectorName']} placeholder="Full name" />
          <Input label="Inspector Signature (typed)" value={property.inspectorSignature} onChange={e => update('property.inspectorSignature', e.target.value)} placeholder="Type name to sign" />
        </div>
      </div>
    </Section>
  );
}
