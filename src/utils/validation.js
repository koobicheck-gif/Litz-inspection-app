export const REQUIRED_FIELDS = [
  { path: 'property.customerName', label: 'Customer Name' },
  { path: 'property.addressStreet', label: 'Street Address' },
  { path: 'property.addressCity', label: 'City' },
  { path: 'property.addressZip', label: 'ZIP Code' },
  { path: 'property.inspectionDate', label: 'Inspection Date' },
  { path: 'property.inspectorName', label: 'Inspector Name' },
  { path: 'summary.findings', label: 'Findings' },
  { path: 'summary.recommendedAction', label: 'Recommended Action' },
];

const getByPath = (obj, path) => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

export const getMissingFields = (report) => {
  return REQUIRED_FIELDS.filter(f => !getByPath(report, f.path)?.toString().trim());
};
