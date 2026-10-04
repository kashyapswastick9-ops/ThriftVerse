import { CATALOG } from './catalog';
import type { Product, Gender, CategoryKey, Size, Condition, Rarity } from '@/types';

export interface FetchParams {
  gender?: string;
  category?: string;
  sub?: string[];
  size?: string[];
  condition?: string[];
  rarity?: string[];
  brand?: string[];
  era?: string[];
  minPrice?: number;
  maxPrice?: number;
  q?: string;
  curator?: string;
  filter?: string;
  oneofone?: boolean;
  sort?: string;
  page?: number;
  pageSize?: number;
}

// Deterministic PRNG
function mulberry32(a: number) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

const seed = 12345;
const random = mulberry32(seed);

const getRandomInt = (min: number, max: number) => Math.floor(random() * (max - min + 1)) + min;
const getRandomItem = <T>(arr: T[]) => arr[getRandomInt(0, arr.length - 1)];

const TITLES: Record<string, string[]> = {
  'topwear': ["Vintage Graphic Tee", "Oversized Hoodie", "Retro Windbreaker", "Classic Denim Jacket", "Flannel Shirt"],
  'jackets-winterwear': ["Puffer Jacket", "Varsity Jacket", "Trench Coat", "Leather Moto Jacket", "Fleece Zip-Up"],
  'bottomwear': ["Straight Leg Jeans", "Cargo Pants", "Corduroy Trousers", "Track Pants", "Bermuda Shorts"],
  'footwear': ["Chunky Sneakers", "Leather Boots", "Canvas Slip-Ons", "Retro High-Tops", "Suede Loafers"],
  'accessories': ["Dad Cap", "Crossbody Bag", "Chain Necklace", "Bucket Hat", "Retro Sunglasses"],
};

const BRANDS_LIST = ["Nike", "Adidas", "Levi's", "Carhartt", "Champion", "Ralph Lauren", "Tommy Hilfiger", "Dickies", "Wrangler", "Converse", "New Balance", "Reebok", "Puma", "Fila", "Ellesse"];

const SIZES: Record<string, Size[]> = {
  'topwear': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  'jackets-winterwear': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  'bottomwear': ['28', '30', '32', '34', '36'],
  'footwear': ['UK6', 'UK7', 'UK8', 'UK9', 'UK10'],
  'accessories': ['FREE'],
};

const CONDITIONS: { val: Condition, w: number }[] = [
  { val: 'MINT', w: 30 },
  { val: 'EXCELLENT', w: 35 },
  { val: 'GOOD', w: 25 },
  { val: 'WORN-IN', w: 10 }
];

const RARITIES: { val: Rarity, w: number }[] = [
  { val: 'COMMON', w: 45 },
  { val: 'UNCOMMON', w: 25 },
  { val: 'RARE', w: 15 },
  { val: 'EPIC', w: 10 },
  { val: 'LEGENDARY', w: 5 }
];

const ERAS_LIST: { val: string, w: number }[] = [
  { val: '80s', w: 20 },
  { val: '90s', w: 35 },
  { val: 'Y2K', w: 30 },
  { val: '2010s', w: 15 }
];

const CURATORS = ['neon-shrike','iron-thread','velvet-eclipse','captain-cargo','the-archivist','static-queen'];

function getWeightedItem<T>(items: { val: T, w: number }[]) {
  const totalWeight = items.reduce((sum, i) => sum + i.w, 0);
  let r = random() * totalWeight;
  for (const item of items) {
    if (r < item.w) return item.val;
    r -= item.w;
  }
  return items[items.length - 1].val;
}

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  const totalProducts = 96;

  // Flatten catalog to guarantee at least one per subcategory
  const subcategories: { gender: Gender, cat: CategoryKey, sub: string }[] = [];
  Object.keys(CATALOG).forEach((g) => {
      const gender = g as Gender;
      CATALOG[gender].categories.forEach((cat) => {
          cat.subcategories.forEach((sub) => {
              subcategories.push({ gender, cat: cat.key as CategoryKey, sub: sub.slug });
          });
      });
  });

  for (let i = 0; i < totalProducts; i++) {
    const isGuaranteePass = i < subcategories.length;
    const { gender, cat, sub } = isGuaranteePass ? subcategories[i] : getRandomItem(subcategories);

    const id = `prod-${(i + 1).toString().padStart(3, '0')}`;
    const brand = getRandomItem(BRANDS_LIST);
    const titleBase = getRandomItem(TITLES[cat]);
    const title = `${brand} ${titleBase}`;

    // price: 149–2499 (integer, steps of 50)
    let priceSteps = Math.floor((2499 - 149) / 50);
    const price = 149 + getRandomInt(0, priceSteps) * 50;
    
    // originalPrice = Math.round(price * (1.6 + seeded * 1.6)) clamped so it's always > price
    const originalPrice = Math.max(price + 50, Math.round(price * (1.6 + random() * 1.6)));
    
    const sizes = SIZES[cat];
    const sizeCount = cat === 'accessories' ? 1 : getRandomInt(1, 2);
    const selectedSizes: Size[] = [];
    for(let j=0; j<sizeCount; j++) {
        let size = getRandomItem(sizes);
        if(!selectedSizes.includes(size)) selectedSizes.push(size);
    }
    if(selectedSizes.length === 0) selectedSizes.push(sizes[0]);

    const condition = getWeightedItem(CONDITIONS);
    const rarity = getWeightedItem(RARITIES);
    const era = getWeightedItem(ERAS_LIST);

    let isOneOfOne = false;
    if (rarity === 'LEGENDARY') isOneOfOne = true;
    else if (rarity === 'EPIC') isOneOfOne = random() < 0.6;
    else if (rarity === 'RARE') isOneOfOne = random() < 0.2;

    const isNewDrop = i < 12 || random() < 0.1;
    
    let curatorSlug = undefined;
    if (random() < 0.2) {
        curatorSlug = getRandomItem(CURATORS);
    }

    products.push({
      id,
      title,
      brand,
      gender,
      category: cat,
      sub,
      price,
      originalPrice,
      images: [`https://picsum.photos/seed/${id}-a/700/900`, `https://picsum.photos/seed/${id}-b/700/900`],
      sizes: selectedSizes,
      condition,
      rarity,
      era,
      isNewDrop,
      isOneOfOne,
      curatorSlug,
      createdAt: Date.now() - i * 86400000
    });
  }
  return products;
};

const PRODUCTS = generateProducts();

export const BRANDS = Array.from(new Set(PRODUCTS.map(p => p.brand))).sort();
export const ERAS = ['80s', '90s', 'Y2K', '2010s'];

const RARITY_ORDER: Record<Rarity, number> = { LEGENDARY: 0, EPIC: 1, RARE: 2, UNCOMMON: 3, COMMON: 4 };

export async function fetchProducts(params: FetchParams): Promise<{ items: Product[]; total: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...PRODUCTS];

      if (params.gender) filtered = filtered.filter(p => p.gender === params.gender);
      if (params.category) filtered = filtered.filter(p => p.category === params.category);
      if (params.sub && params.sub.length > 0) filtered = filtered.filter(p => params.sub!.includes(p.sub));
      if (params.size && params.size.length > 0) filtered = filtered.filter(p => p.sizes.some(s => params.size!.includes(s)));
      if (params.condition && params.condition.length > 0) filtered = filtered.filter(p => params.condition!.includes(p.condition));
      if (params.rarity && params.rarity.length > 0) filtered = filtered.filter(p => params.rarity!.includes(p.rarity));
      if (params.brand && params.brand.length > 0) filtered = filtered.filter(p => params.brand!.includes(p.brand));
      if (params.era && params.era.length > 0) filtered = filtered.filter(p => params.era!.includes(p.era));
      if (params.minPrice !== undefined) filtered = filtered.filter(p => p.price >= params.minPrice!);
      if (params.maxPrice !== undefined) filtered = filtered.filter(p => p.price <= params.maxPrice!);
      if (params.curator) filtered = filtered.filter(p => p.curatorSlug === params.curator);
      if (params.oneofone) filtered = filtered.filter(p => p.isOneOfOne);
      if (params.filter === 'drops') filtered = filtered.filter(p => p.isNewDrop);
      if (params.q) {
          const q = params.q.toLowerCase();
          filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
      }

      if (params.sort) {
          filtered.sort((a, b) => {
              switch (params.sort) {
                  case 'price-asc': return a.price - b.price;
                  case 'price-desc': return b.price - a.price;
                  case 'rarity': return RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity];
                  case 'discount': {
                      const d1 = Math.round((1 - a.price / a.originalPrice) * 100);
                      const d2 = Math.round((1 - b.price / b.originalPrice) * 100);
                      return d2 - d1;
                  }
                  case 'newest':
                  default:
                      return b.createdAt - a.createdAt;
              }
          });
      } else {
           filtered.sort((a, b) => b.createdAt - a.createdAt);
      }

      const total = filtered.length;
      const page = params.page || 1;
      const pageSize = params.pageSize || 24;
      const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

      resolve({ items: paginated, total });
    }, 350);
  });
}
