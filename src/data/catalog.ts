import type { BudgetTier, Category, GenderCatalog, Gender } from '@/types';

// ─── Budget Tiers ─────────────────────────────────────────────────────────────

export const BUDGET_TIERS: BudgetTier[] = [
  { label: 'UNDER ₹299', max: 299 },
  { label: 'UNDER ₹499', max: 499 },
  { label: 'UNDER ₹999', max: 999 },
  { label: 'UNDER ₹1999', max: 1999 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getCategoryTotal(cat: Category): number {
  return cat.subcategories.reduce((sum, sub) => sum + sub.count, 0);
}

export function getGenderTotal(catalog: GenderCatalog): number {
  return catalog.categories.reduce((sum, cat) => sum + getCategoryTotal(cat), 0);
}

// ─── MEN ──────────────────────────────────────────────────────────────────────

const menCategories: Category[] = [
  {
    key: 'topwear',
    label: 'Topwear',
    image: 'https://picsum.photos/seed/men-topwear/900/1100',
    subcategories: [
      { slug: 'men-tshirts', label: 'T-Shirts', count: 1175 },
      { slug: 'men-shirts', label: 'Shirts', count: 412 },
      { slug: 'men-hoodies', label: 'Hoodies', count: 168 },
      { slug: 'men-sweatshirts', label: 'Sweatshirts', count: 236 },
      { slug: 'men-polos', label: 'Polos', count: 98 },
    ],
  },
  {
    key: 'jackets-winterwear',
    label: 'Jackets & Winterwear',
    image: 'https://picsum.photos/seed/men-jackets-winterwear/900/1100',
    subcategories: [
      { slug: 'men-jackets', label: 'Jackets', count: 335 },
      { slug: 'men-sweaters', label: 'Sweaters', count: 142 },
      { slug: 'men-puffers', label: 'Puffers', count: 64 },
      { slug: 'men-varsity', label: 'Varsity', count: 51 },
      { slug: 'men-windcheaters', label: 'Windcheaters', count: 87 },
    ],
  },
  {
    key: 'bottomwear',
    label: 'Bottomwear',
    image: 'https://picsum.photos/seed/men-bottomwear/900/1100',
    subcategories: [
      { slug: 'men-jeans', label: 'Jeans', count: 520 },
      { slug: 'men-trousers', label: 'Trousers', count: 210 },
      { slug: 'men-shorts', label: 'Shorts', count: 188 },
      { slug: 'men-cargos', label: 'Cargos', count: 143 },
      { slug: 'men-joggers', label: 'Joggers', count: 176 },
    ],
  },
  {
    key: 'footwear',
    label: 'Footwear',
    image: 'https://picsum.photos/seed/men-footwear/900/1100',
    subcategories: [
      { slug: 'men-sneakers', label: 'Sneakers', count: 274 },
      { slug: 'men-boots', label: 'Boots', count: 61 },
      { slug: 'men-sandals', label: 'Sandals', count: 93 },
      { slug: 'men-formals', label: 'Formals', count: 40 },
      { slug: 'men-slides', label: 'Slides', count: 55 },
    ],
  },
  {
    key: 'accessories',
    label: 'Accessories',
    image: 'https://picsum.photos/seed/men-accessories/900/1100',
    subcategories: [
      { slug: 'men-caps', label: 'Caps', count: 130 },
      { slug: 'men-bags', label: 'Bags', count: 96 },
      { slug: 'men-belts', label: 'Belts', count: 72 },
      { slug: 'men-watches', label: 'Watches', count: 34 },
      { slug: 'men-sunglasses', label: 'Sunglasses', count: 58 },
    ],
  },
];

// ─── WOMEN ────────────────────────────────────────────────────────────────────

const womenCategories: Category[] = [
  {
    key: 'topwear',
    label: 'Topwear',
    image: 'https://picsum.photos/seed/women-topwear/900/1100',
    subcategories: [
      { slug: 'women-tops', label: 'Tops', count: 984 },
      { slug: 'women-dresses', label: 'Dresses', count: 537 },
      { slug: 'women-coords', label: 'Co-ords', count: 213 },
      { slug: 'women-crop-tops', label: 'Crop Tops', count: 348 },
      { slug: 'women-kurtis', label: 'Kurtis', count: 162 },
    ],
  },
  {
    key: 'jackets-winterwear',
    label: 'Jackets & Winterwear',
    image: 'https://picsum.photos/seed/women-jackets-winterwear/900/1100',
    subcategories: [
      { slug: 'women-jackets', label: 'Jackets', count: 278 },
      { slug: 'women-cardigans', label: 'Cardigans', count: 195 },
      { slug: 'women-puffers', label: 'Puffers', count: 48 },
      { slug: 'women-shrugs', label: 'Shrugs', count: 112 },
      { slug: 'women-coats', label: 'Coats', count: 67 },
    ],
  },
  {
    key: 'bottomwear',
    label: 'Bottomwear',
    image: 'https://picsum.photos/seed/women-bottomwear/900/1100',
    subcategories: [
      { slug: 'women-jeans', label: 'Jeans', count: 443 },
      { slug: 'women-skirts', label: 'Skirts', count: 319 },
      { slug: 'women-palazzos', label: 'Palazzos', count: 148 },
      { slug: 'women-trousers', label: 'Trousers', count: 201 },
      { slug: 'women-shorts', label: 'Shorts', count: 127 },
    ],
  },
  {
    key: 'footwear',
    label: 'Footwear',
    image: 'https://picsum.photos/seed/women-footwear/900/1100',
    subcategories: [
      { slug: 'women-heels', label: 'Heels', count: 187 },
      { slug: 'women-flats', label: 'Flats', count: 243 },
      { slug: 'women-sneakers', label: 'Sneakers', count: 198 },
      { slug: 'women-boots', label: 'Boots', count: 89 },
      { slug: 'women-sandals', label: 'Sandals', count: 156 },
    ],
  },
  {
    key: 'accessories',
    label: 'Accessories',
    image: 'https://picsum.photos/seed/women-accessories/900/1100',
    subcategories: [
      { slug: 'women-handbags', label: 'Handbags', count: 224 },
      { slug: 'women-scarves', label: 'Scarves', count: 143 },
      { slug: 'women-jewellery', label: 'Jewellery', count: 312 },
      { slug: 'women-sunglasses', label: 'Sunglasses', count: 78 },
      { slug: 'women-belts', label: 'Belts', count: 54 },
    ],
  },
];

// ─── UNISEX ───────────────────────────────────────────────────────────────────

const unisexCategories: Category[] = [
  {
    key: 'topwear',
    label: 'Topwear',
    image: 'https://picsum.photos/seed/unisex-topwear/900/1100',
    subcategories: [
      { slug: 'unisex-hoodies', label: 'Hoodies', count: 342 },
      { slug: 'unisex-sweatshirts', label: 'Sweatshirts', count: 217 },
      { slug: 'unisex-tshirts', label: 'T-Shirts', count: 489 },
      { slug: 'unisex-jerseys', label: 'Jerseys', count: 134 },
      { slug: 'unisex-turtlenecks', label: 'Turtlenecks', count: 76 },
    ],
  },
  {
    key: 'jackets-winterwear',
    label: 'Jackets & Winterwear',
    image: 'https://picsum.photos/seed/unisex-jackets-winterwear/900/1100',
    subcategories: [
      { slug: 'unisex-bombers', label: 'Bombers', count: 198 },
      { slug: 'unisex-varsity', label: 'Varsity', count: 87 },
      { slug: 'unisex-fleece', label: 'Fleece', count: 124 },
      { slug: 'unisex-puffers', label: 'Puffers', count: 56 },
      { slug: 'unisex-denim-jackets', label: 'Denim Jackets', count: 143 },
    ],
  },
  {
    key: 'bottomwear',
    label: 'Bottomwear',
    image: 'https://picsum.photos/seed/unisex-bottomwear/900/1100',
    subcategories: [
      { slug: 'unisex-joggers', label: 'Joggers', count: 267 },
      { slug: 'unisex-cargos', label: 'Cargos', count: 189 },
      { slug: 'unisex-shorts', label: 'Shorts', count: 213 },
      { slug: 'unisex-sweatpants', label: 'Sweatpants', count: 145 },
      { slug: 'unisex-jeans', label: 'Jeans', count: 98 },
    ],
  },
  {
    key: 'footwear',
    label: 'Footwear',
    image: 'https://picsum.photos/seed/unisex-footwear/900/1100',
    subcategories: [
      { slug: 'unisex-sneakers', label: 'Sneakers', count: 412 },
      { slug: 'unisex-slides', label: 'Slides', count: 156 },
      { slug: 'unisex-boots', label: 'Boots', count: 78 },
      { slug: 'unisex-sandals', label: 'Sandals', count: 103 },
      { slug: 'unisex-platforms', label: 'Platforms', count: 64 },
    ],
  },
  {
    key: 'accessories',
    label: 'Accessories',
    image: 'https://picsum.photos/seed/unisex-accessories/900/1100',
    subcategories: [
      { slug: 'unisex-caps', label: 'Caps', count: 287 },
      { slug: 'unisex-backpacks', label: 'Backpacks', count: 167 },
      { slug: 'unisex-beanies', label: 'Beanies', count: 112 },
      { slug: 'unisex-socks', label: 'Socks', count: 234 },
      { slug: 'unisex-pins-patches', label: 'Pins & Patches', count: 89 },
    ],
  },
];

// ─── Catalog Export ───────────────────────────────────────────────────────────

export const CATALOG: Record<Gender, GenderCatalog> = {
  men: {
    gender: 'men',
    label: 'Men',
    categories: menCategories,
  },
  women: {
    gender: 'women',
    label: 'Women',
    categories: womenCategories,
  },
  unisex: {
    gender: 'unisex',
    label: 'Unisex',
    categories: unisexCategories,
  },
};
