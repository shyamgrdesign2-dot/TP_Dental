// A4 Dimensions at approx 96 DPI for screen rendering baseline
// A4 is 210mm x 297mm. 
// Aspect Ratio: 1.414
export const A4_BASE_WIDTH = 794; 
export const A4_BASE_HEIGHT = 1123; 

export const ZOOM_CONSTRAINTS = {
  MIN: 0.5,
  MAX: 4.0, // Increased max zoom for detailed work
  WARN: 1.5
};

export const CLINICAL_COLORS = [
  { name: 'Black',      hex: '#000000' },
  { name: 'Blue',       hex: '#2563EB' }, // Brighter standard blue
  { name: 'Red',        hex: '#DC2626' },
  { name: 'Green',      hex: '#16A34A' },
  { name: 'Primary',    hex: '#4B4AD5' }, // Updated to New Primary
  { name: 'Pink',       hex: '#DB2777' }, // Brand Pink
];

export const HIGHLIGHTER_COLORS = [
  { name: 'Yellow', hex: '#FCD34D' }, // More pastel
  { name: 'Green', hex: '#86EFAC' },
  { name: 'Blue', hex: '#93C5FD' },
  { name: 'Pink', hex: '#F9A8D4' }
];

export const THICKNESS_LEVELS = [1, 2, 4, 8, 14, 24];
