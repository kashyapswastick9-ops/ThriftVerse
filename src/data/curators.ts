import type { Curator, CuratorStat, CuratedSet } from '@/types';

export function formatCompact(n: number): string {
  // Use en-US to ensure 'K'/'M' suffix format (e.g. 128.4K) instead of Indian 'L'/'Cr'
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n);
}

function baseStats(v: number, s: number, r: number, va: number, h: number): CuratorStat[] {
  return [
    { key: 'vintage', label: 'Vintage Eye', value: v },
    { key: 'streetwear', label: 'Streetwear IQ', value: s },
    { key: 'rarity', label: 'Rarity Sense', value: r },
    { key: 'value', label: 'Value Hunter', value: va },
    { key: 'hype', label: 'Hype Radar', value: h },
  ];
}

const setsGenerator = (alias: string): CuratedSet[] => [
  {
    id: `set-${alias}-1`,
    title: 'Y2K Cyber Denim Set',
    cover: `https://picsum.photos/seed/set-${alias}-1/600/800`,
    pieceCount: 3,
    totalPrice: 2499,
    tags: ['Y2K', 'Denim', 'Rare'],
  },
  {
    id: `set-${alias}-2`,
    title: 'Varsity Legends Pack',
    cover: `https://picsum.photos/seed/set-${alias}-2/600/800`,
    pieceCount: 2,
    totalPrice: 3899,
    tags: ['Varsity', 'Archive', 'Heavyweight'],
  },
  {
    id: `set-${alias}-3`,
    title: 'Neon Nights Kit',
    cover: `https://picsum.photos/seed/set-${alias}-3/600/800`,
    pieceCount: 4,
    totalPrice: 4299,
    tags: ['Techwear', 'Neon', 'Street'],
  },
];

export const CURATORS: Curator[] = [
  {
    slug: 'neon-shrike',
    alias: 'NEON SHRIKE',
    realNameRedacted: '██████ M.',
    tagline: 'The Cyber-Street Samurai',
    origin: 'Neo-Tokyo Archive, Sector 4',
    clearance: 'ALPHA',
    avatar: 'https://picsum.photos/seed/curator-neon-shrike/600/700',
    accent: 'vibranium',
    followers: 128400,
    piecesCurated: 3410,
    drops: 142,
    stats: baseStats(40, 95, 80, 60, 100),
    signatureVault: setsGenerator('shrike'),
    bio: "Raised on late 90s anime and early 2000s hacking forums, Neon Shrike curates the digital underground. Specializing in techwear, reflective fabrics, and pieces that look like they belong in a dystopian motorcycle chase. If it's chrome, neon, or strapped with excessive buckles, Shrike found it first.",
    specialties: ['Techwear', 'Y2K', 'Cyberpunk'],
  },
  {
    slug: 'iron-thread',
    alias: 'IRON THREAD',
    realNameRedacted: 'T. █████████',
    tagline: 'The Workwear Warden',
    origin: 'Detroit Ruins, Factory 9',
    clearance: 'OMEGA',
    avatar: 'https://picsum.photos/seed/curator-iron-thread/600/700',
    accent: 'gold',
    followers: 89200,
    piecesCurated: 1845,
    drops: 64,
    stats: baseStats(85, 70, 75, 90, 40),
    signatureVault: setsGenerator('iron'),
    bio: "Iron Thread doesn't care about hype. He cares about denim weight, triple-stitching, and brass rivets. He sources from abandoned factories and surplus auctions. His drops are indestructible workwear and heritage pieces meant to outlast the wearer.",
    specialties: ['Heavy Denim', 'Workwear', 'Heritage'],
  },
  {
    slug: 'velvet-eclipse',
    alias: 'VELVET ECLIPSE',
    realNameRedacted: '████ V. █████',
    tagline: 'The Midnight Aristocrat',
    origin: 'Unknown (Signal Traced to Milan)',
    clearance: 'GAMMA',
    avatar: 'https://picsum.photos/seed/curator-velvet-eclipse/600/700',
    accent: 'crimson',
    followers: 215000,
    piecesCurated: 920,
    drops: 38,
    stats: baseStats(95, 40, 100, 30, 85),
    signatureVault: setsGenerator('velvet'),
    bio: "Nobody knows how Velvet Eclipse gets her inventory. One week it's an 80s runway couture piece, the next it's a forgotten gothic velvet cloak from a private European estate. Her drops are small, viciously fought over, and entirely composed of quiet, dark luxury.",
    specialties: ['Dark Academia', 'Archive Couture', 'Gothic'],
  },
  {
    slug: 'captain-cargo',
    alias: 'CAPTAIN CARGO',
    realNameRedacted: '█████ C. ███',
    tagline: 'The Utility Mercenary',
    origin: 'Tactical Base Alpha',
    clearance: 'BETA',
    avatar: 'https://picsum.photos/seed/curator-captain-cargo/600/700',
    accent: 'gold',
    followers: 145000,
    piecesCurated: 2890,
    drops: 112,
    stats: baseStats(50, 85, 60, 80, 75),
    signatureVault: setsGenerator('cargo'),
    bio: "If it doesn't have at least four pockets, Captain Cargo isn't interested. Specializing in military surplus, tactical gear, and the exact pair of parachute pants you've been looking for since 2004.",
    specialties: ['Gorpcore', 'Tactical', 'Utility'],
  },
  {
    slug: 'the-archivist',
    alias: 'THE ARCHIVIST',
    realNameRedacted: 'CLASSIFIED',
    tagline: 'The Keeper of Timelines',
    origin: 'The Vault Core',
    clearance: 'ALPHA',
    avatar: 'https://picsum.photos/seed/curator-the-archivist/600/700',
    accent: 'stark' as any, // Using stark as a fallback if needed, but type restricts to crimson/vibranium/gold. Let's use vibranium.
    followers: 402000,
    piecesCurated: 5400,
    drops: 210,
    stats: baseStats(100, 100, 100, 70, 95),
    signatureVault: setsGenerator('archivist'),
    bio: "The mysterious founder of the Vault. The Archivist holds the keys to the most pristine 70s rock tees, 90s hip-hop merchandise, and untouched vintage sports gear in existence. A drop from The Archivist is a historical event.",
    specialties: ['True Vintage', 'Band Tees', 'Grails'],
  },
  {
    slug: 'static-queen',
    alias: 'STATIC QUEEN',
    realNameRedacted: 'E. ██████',
    tagline: 'The Glitch Aesthetic',
    origin: 'Pirate Radio Station 9',
    clearance: 'GAMMA',
    avatar: 'https://picsum.photos/seed/curator-static-queen/600/700',
    accent: 'crimson',
    followers: 98500,
    piecesCurated: 1100,
    drops: 89,
    stats: baseStats(60, 90, 85, 65, 80),
    signatureVault: setsGenerator('static'),
    bio: "Static Queen finds beauty in the worn out and the washed up. Distressed knits, faded graphics, and oversized silhouettes. She curates the perfect lazy-day armor for the modern anti-hero.",
    specialties: ['Grunge', 'Distressed', 'Oversized'],
  },
];

// Fix the typings error above by enforcing the valid accent on The Archivist
CURATORS[4].accent = 'vibranium';
