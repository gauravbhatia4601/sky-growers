export const PRODUCT_CATEGORIES = [
  'Vegetables',
  'Herbs',
  'Leafy Greens',
  'Root Vegetables',
  'Fruits',
  'Organic Produce',
] as const;

export const PRODUCT_SEASONS = [
  'Year-round',
  'Spring',
  'Summer',
  'Autumn',
  'Winter',
  'Seasonal',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
export type ProductSeason = (typeof PRODUCT_SEASONS)[number];

