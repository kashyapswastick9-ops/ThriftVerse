// server/seed.js — Seed the products table from the in-memory catalog
// Run once: node server/seed.js
import 'dotenv/config';
import { query } from './db.js';

// ─── Inline the same deterministic product generator from src/data/products.ts ─
function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CATALOG_GENDERS = ['men', 'women', 'unisex'];
const CATALOG_CATEGORIES = {
  men:    ['tops', 'bottoms', 'outerwear', 'footwear', 'accessories'],
  women:  ['tops', 'bottoms', 'outerwear', 'footwear', 'accessories'],
  unisex: ['tops', 'bottoms', 'outerwear', 'footwear', 'accessories'],
};
const CATALOG_SUBS = {
  tops:        ['shirts', 't-shirts', 'hoodies', 'sweaters', 'tanks'],
  bottoms:     ['jeans', 'trousers', 'shorts', 'skirts', 'joggers'],
  outerwear:   ['jackets', 'coats', 'blazers', 'windbreakers', 'vests'],
  footwear:    ['sneakers', 'boots', 'loafers', 'sandals', 'heels'],
  accessories: ['bags', 'hats', 'belts', 'scarves', 'sunglasses'],
};
const BRANDS = ['Nike','Adidas','Levi\'s','Carhartt','Champion','Ralph Lauren','Tommy Hilfiger','Dickies','Wrangler','Converse','New Balance','Reebok','Puma','Fila','Ellesse'];
const CONDITIONS = ['MINT','MINT','MINT','EXCELLENT','EXCELLENT','EXCELLENT','EXCELLENT','GOOD','GOOD','GOOD','WORN-IN'];
const RARITIES = ['COMMON','COMMON','COMMON','COMMON','UNCOMMON','UNCOMMON','UNCOMMON','RARE','RARE','EPIC','LEGENDARY'];
const ERAS = ['80s','80s','90s','90s','90s','Y2K','Y2K','Y2K','2010s','2010s'];
const APPAREL_SIZES = ['XS','S','M','L','XL','XXL'];
const WAIST_SIZES = ['28','30','32','34','36'];
const SHOE_SIZES = ['UK6','UK7','UK8','UK9','UK10'];
const CURATOR_SLUGS = ['neon-shrike','iron-thread','velvet-eclipse','captain-cargo','the-archivist','static-queen'];

const TITLE_TEMPLATES = {
  tops:        ['Vintage {b} Graphic Tee','Retro {b} Hoodie','{b} Oxford Button-Up','{b} Crewneck Sweatshirt','{b} Tank Top'],
  bottoms:     ['{b} 501 Stonewash','Vintage {b} Cargo Pants','{b} Slim Chinos','{b} Work Shorts','{b} Jogger Pants'],
  outerwear:   ['{b} Detroit Jacket','{b} Field Coat','Vintage {b} Windcheater','{b} Blazer Jacket','{b} Puffer Vest'],
  footwear:    ['Vintage {b} Sneakers','{b} Leather Boots','{b} Low-Top Canvas','{b} Running Trainer','{b} High-Top'],
  accessories: ['{b} Baseball Cap','{b} Leather Belt','{b} Canvas Tote','{b} Wool Scarf','{b} Aviator Shades'],
};

function sizesFor(cat) {
  if (cat === 'bottoms') return WAIST_SIZES;
  if (cat === 'footwear') return SHOE_SIZES;
  if (cat === 'accessories') return ['FREE'];
  return APPAREL_SIZES;
}

function generateProducts() {
  const rand = mulberry32(0xdeadbeef);
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];
  const products = [];

  for (let i = 0; i < 96; i++) {
    const gender = CATALOG_GENDERS[i % 3];
    const cats = CATALOG_CATEGORIES[gender];
    const cat = cats[i % 5];
    const subs = CATALOG_SUBS[cat];
    const sub = pick(subs);
    const brand = pick(BRANDS);
    const id = `prod-${String(i).padStart(3, '0')}`;
    const tmpl = pick(TITLE_TEMPLATES[cat]);
    const title = tmpl.replace('{b}', brand);
    const price = (Math.floor(rand() * 47) + 3) * 50; // 150–2500 steps of 50
    const originalPrice = Math.round(price * (1.6 + rand() * 1.6));
    const image = `https://picsum.photos/seed/${id}-a/700/900`;
    const sizePool = sizesFor(cat);
    const sizeCount = cat === 'accessories' ? 1 : (rand() > 0.5 ? 1 : 2);
    const sizes = [];
    for (let j = 0; j < sizeCount; j++) {
      const s = pick(sizePool);
      if (!sizes.includes(s)) sizes.push(s);
    }
    const condition = pick(CONDITIONS);
    const rarity = pick(RARITIES);
    const era = pick(ERAS);
    const isLegendary = rarity === 'LEGENDARY';
    const isEpic = rarity === 'EPIC';
    const isRare = rarity === 'RARE';
    const isOneOfOne = isLegendary || (isEpic && rand() > 0.4) || (isRare && rand() > 0.8);
    const isNewDrop = i < 12 || rand() > 0.9;
    const curatorSlug = rand() > 0.8 ? pick(CURATOR_SLUGS) : null;
    const createdAt = Date.now() - i * 86400000;

    products.push({ id, title, brand, gender, category: cat, sub, price, originalPrice, image, sizes, condition, rarity, era, isNewDrop, isOneOfOne, curatorSlug, createdAt });
  }
  return products;
}

async function seed() {
  console.log('[seed] Generating 96 products…');
  const products = generateProducts();

  let inserted = 0;
  let skipped = 0;

  for (const p of products) {
    try {
      await query(
        `INSERT INTO products
          (id, title, brand, gender, category, sub, price, original_price, image, sizes,
           condition, rarity, era, is_new_drop, is_one_of_one, curator_slug, available, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,TRUE,$17)
         ON CONFLICT (id) DO NOTHING`,
        [p.id, p.title, p.brand, p.gender, p.category, p.sub, p.price, p.originalPrice,
         p.image, p.sizes, p.condition, p.rarity, p.era, p.isNewDrop, p.isOneOfOne,
         p.curatorSlug, p.createdAt]
      );
      inserted++;
    } catch (err) {
      console.warn(`[seed] Skipped ${p.id}: ${err.message}`);
      skipped++;
    }
  }

  console.log(`[seed] ✅ Done — ${inserted} inserted, ${skipped} skipped.`);
  process.exit(0);
}

seed();
