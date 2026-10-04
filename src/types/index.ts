// ─── Primitive Types ──────────────────────────────────────────────────────────

export type Gender = 'men' | 'women' | 'unisex';

export type CategoryKey =
  | 'topwear'
  | 'jackets-winterwear'
  | 'bottomwear'
  | 'footwear'
  | 'accessories';

export interface SubCategory {
  slug: string;
  label: string;
  count: number;
}

export interface Category {
  key: CategoryKey;
  label: string;
  image: string;
  subcategories: SubCategory[];
}

export interface GenderCatalog {
  gender: Gender;
  label: string;
  categories: Category[];
}

export interface BudgetTier {
  label: string;
  max: number;
}

// ─── Product Types ────────────────────────────────────────────────────────────

export type Condition = 'MINT' | 'EXCELLENT' | 'GOOD' | 'WORN-IN';

export type Rarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

export type Size =
  | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
  | '28' | '30' | '32' | '34' | '36'
  | 'UK6' | 'UK7' | 'UK8' | 'UK9' | 'UK10'
  | 'FREE';

export interface Product {
  id: string;
  title: string;
  brand: string;
  gender: Gender;
  category: CategoryKey;
  sub: string;          // subcategory slug
  price: number;
  originalPrice: number;
  images: [string, string];
  sizes: Size[];        // usually 1 size for 1-of-1
  condition: Condition;
  rarity: Rarity;
  era: string;          // '80s' | '90s' | 'Y2K' | '2010s'
  isNewDrop: boolean;
  isOneOfOne: boolean;
  curatorSlug?: string;
  createdAt: number;    // timestamp
}

// ─── Cart Types ───────────────────────────────────────────────────────────────

export interface CartItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  size: Size;
}

// ─── Shop Filter Types ────────────────────────────────────────────────────────

export interface ShopFilters {
  gender?: Gender;
  category?: CategoryKey;
  sub?: string[];
  size?: Size[];
  condition?: Condition[];
  rarity?: Rarity[];
  brand?: string[];
  era?: string[];
  minPrice?: number;
  maxPrice?: number;
  q?: string;
  curator?: string;
  filter?: string;      // 'drops'
  oneofone?: boolean;
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'rarity' | 'discount';
  page?: number;
}

// ─── Curator Types ────────────────────────────────────────────────────────────

export interface CuratorStat {
  key: 'vintage' | 'streetwear' | 'rarity' | 'value' | 'hype';
  label: string;
  value: number; // 0-100
}

export interface CuratedSet {
  id: string;
  title: string;
  cover: string;
  pieceCount: number;
  totalPrice: number;
  tags: string[];
}

export interface Curator {
  slug: string;
  alias: string;
  realNameRedacted: string;
  tagline: string;
  origin: string;
  clearance: 'ALPHA' | 'BETA' | 'GAMMA' | 'OMEGA';
  avatar: string;
  accent: 'crimson' | 'vibranium' | 'gold';
  followers: number;
  piecesCurated: number;
  drops: number;
  stats: CuratorStat[];
  signatureVault: CuratedSet[];
  bio: string;
  specialties: string[];
}

// ─── Toast Types ──────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  createdAt: number;
}

// ─── UI Types ─────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
