export const COMPANY = {
  name: 'Litz Roofing & Construction',
  tagline: 'Trusted Oklahoma Roofing & Remodeling',
  phone: '(405) PLACEHOLDER',
  email: 'info@litzconstructionok.com',
  website: 'litzconstructionok.com',
  license: 'OK License # PLACEHOLDER',
  address: 'Oklahoma',
};

export const SEVERITY_RATINGS = [
  { value: 'minor', label: 'Minor' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'severe', label: 'Severe' },
  { value: 'total_loss', label: 'Total Loss' },
];

export const CLAIM_RECOMMENDATIONS = [
  { value: 'yes', label: 'Yes — file claim' },
  { value: 'possible', label: 'Possible — discuss with customer' },
  { value: 'no', label: 'No — repair only' },
];

export const CAUSE_OF_LOSS = [
  'Hail',
  'Wind',
  'Wind & Hail',
  'Tree / Impact',
  'Fire',
  'Wear & Tear',
  'Improper Installation',
  'Other',
];

export const ROOF_TYPES = [
  'Asphalt 3-Tab',
  'Asphalt Architectural',
  'Impact-Resistant (Class 4)',
  'Wood Shake',
  'Metal Standing Seam',
  'Metal Stone-Coated',
  'Concrete Tile',
  'Clay Tile',
  'Slate',
  'TPO',
  'EPDM',
  'Modified Bitumen',
  'Built-Up Roof',
  'Other',
];

export const DECKING_TYPES = ['OSB', 'Plywood', 'Plank/Board', '1x6 T&G', 'Other'];

export const CONDITION_LEVELS = [
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' },
  { value: 'damaged', label: 'Damaged' },
  { value: 'na', label: 'N/A' },
];

export const HIT_SIZES = ['1/4"', '1/2"', '3/4"', '1"', '1-1/4"', '1-1/2"+'];

export const SLOPES = [
  { value: 'front', label: 'Front' },
  { value: 'rear', label: 'Rear' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
];

export const PHOTO_CATEGORIES = [
  { key: 'frontElevation',    label: 'Front Elevation',     description: 'Wide shot of front of home' },
  { key: 'rearElevation',     label: 'Rear Elevation',      description: 'Wide shot of rear of home' },
  { key: 'leftElevation',     label: 'Left Elevation',      description: 'Wide shot of left side' },
  { key: 'rightElevation',    label: 'Right Elevation',     description: 'Wide shot of right side' },
  { key: 'testSquareFront',   label: 'Test Square — Front', description: '10x10 test square, front slope' },
  { key: 'testSquareRear',    label: 'Test Square — Rear',  description: '10x10 test square, rear slope' },
  { key: 'testSquareLeft',    label: 'Test Square — Left',  description: '10x10 test square, left slope' },
  { key: 'testSquareRight',   label: 'Test Square — Right', description: '10x10 test square, right slope' },
  { key: 'hailDamage',        label: 'Hail Damage',         description: 'Close-ups of hail hits' },
  { key: 'windDamage',        label: 'Wind Damage',         description: 'Lifted, creased, or missing shingles' },
  { key: 'softMetalsDamage',  label: 'Soft Metals Damage',  description: 'Gutters, vents, AC fins, window wraps' },
  { key: 'flashing',          label: 'Flashing',            description: 'Chimney, wall, valley, vent pipe' },
  { key: 'decking',           label: 'Decking',             description: 'If visible — interior or tear-off areas' },
  { key: 'collateralDamage',  label: 'Collateral Damage',   description: 'Siding, fence, screens, paint, etc.' },
  { key: 'other',             label: 'Other',               description: 'Anything else relevant' },
];

export const SCOPE_ITEMS = [
  { key: 'tearOff',         label: 'Tear-off existing roof' },
  { key: 'redeck',          label: 'Replace decking (as needed)' },
  { key: 'underlayment',    label: 'Synthetic underlayment' },
  { key: 'dripEdge',        label: 'Drip edge (all eaves & rakes)' },
  { key: 'iceWaterShield',  label: 'Ice & water shield (eaves, valleys, penetrations)' },
  { key: 'shingles',        label: 'Architectural shingles' },
  { key: 'ridgeVent',       label: 'Ridge vent' },
  { key: 'flashing',        label: 'Flashing replacement' },
  { key: 'pipeBoots',       label: 'New pipe boots' },
  { key: 'gutters',         label: 'Gutter replacement' },
  { key: 'detachReset',     label: 'Detach & reset (solar, satellite, etc.)' },
];
