import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, X, Menu, ChevronRight, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import Container from './Container';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { CATALOG, BUDGET_TIERS } from '@/data/catalog';
import type { Gender } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────

type MegaGender = Gender;

// ─── Lookup objects (no dynamic class construction) ──────────────────────────

const NAV_LINK_BASE =
  'font-display text-2xl tracking-wider uppercase text-stark transition-colors duration-150 hover:text-gold';

const MEGA_ACCENT_BG: Record<MegaGender, string> = {
  men: 'border-vibranium',
  women: 'border-crimson',
  unisex: 'border-gold',
};


// ─── Mega Menu Panel ──────────────────────────────────────────────────────────

interface MegaMenuProps {
  gender: MegaGender;
  onClose: () => void;
}

function MegaMenu({ gender, onClose }: MegaMenuProps) {
  const catalog = CATALOG[gender];

  return (
    <div
      role="dialog"
      aria-label={`${catalog.label} categories`}
      className={clsx(
        'absolute top-full left-0 w-full z-40 bg-ink border-y-[3px] border-black shadow-[0_8px_0_#000]',
        'animate-slide-down border-t-4 rounded-b-comic-xl',
        MEGA_ACCENT_BG[gender]
      )}
      onMouseLeave={onClose}
    >
      <Container className="py-8">
        <div className="grid grid-cols-[1fr_auto] gap-8">
          {/* Category columns */}
          <div className="grid grid-cols-5 gap-6">
            {catalog.categories.map((cat) => (
              <div key={cat.key}>
                <Link
                  to={`/shop/${gender}/${cat.key}`}
                  onClick={onClose}
                  className="font-display text-xl text-stark mb-3 block border-b-2 border-black pb-1 hover:text-gold transition-colors"
                >
                  {cat.label}
                </Link>
                <ul className="space-y-1.5">
                  {cat.subcategories.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        to={`/shop/${gender}/${sub.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between group"
                      >
                        <span className="font-sans text-sm text-stark-dim group-hover:text-stark transition-colors">
                          {sub.label}
                        </span>
                        <span className="font-mono text-[9px] text-stark-dim opacity-60 group-hover:opacity-100">
                          {sub.count.toLocaleString('en-IN')}
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      to={`/shop/${gender}/${cat.key}`}
                      onClick={onClose}
                      className="font-mono text-[10px] text-vibranium hover:underline flex items-center gap-1 mt-2"
                    >
                      ALL {cat.label} <ChevronRight size={12} />
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          {/* Sidebar: Budget chips + promo */}
          <div className="w-44 shrink-0 flex flex-col gap-4 border-l-[3px] border-black pl-6">
            <h3 className="font-display text-lg text-stark">SHOP BY BUDGET</h3>
            <div className="flex flex-col gap-2">
              {BUDGET_TIERS.map((tier) => (
                <Link
                  key={tier.label}
                  to={`/shop?g=${gender}&maxPrice=${tier.max}`}
                  onClick={onClose}
                  className="font-mono text-xs bg-ink-700 text-gold border-2 border-black px-3 py-2 rounded-full hover:bg-gold hover:text-ink transition-colors"
                >
                  {tier.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto bg-crimson border-[3px] border-black p-3 shadow-comic-sm rounded-comic-lg">
              <p className="font-display text-2xl text-stark leading-tight">NEW SEASON</p>
              <p className="font-mono text-[10px] text-stark mt-1">SEASON 07 DROPS</p>
              <Link
                to={`/shop/${gender}?isNew=true`}
                onClick={onClose}
                className="mt-3 flex items-center gap-1 font-cond font-bold text-sm text-stark hover:text-gold transition-colors"
              >
                EXPLORE <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

// ─── Search Overlay ───────────────────────────────────────────────────────────

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-label="Search"
      aria-modal="true"
      className="fixed inset-0 z-[200] flex flex-col"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/90 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 bg-ink border-b-[3px] border-black">
        <Container className="py-6">
          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <Search size={28} className="text-gold shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search drops, brands, styles…"
              className="flex-1 bg-transparent font-display text-4xl sm:text-5xl text-stark placeholder:text-stark-dim/40 outline-none tracking-wide caret-crimson"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="text-stark-dim hover:text-stark transition-colors"
            >
              <X size={28} />
            </button>
          </form>

          <p className="font-mono text-xs text-stark-dim mt-4">
            HIT ENTER TO SEARCH · ESC TO CLOSE
          </p>
        </Container>
      </div>
    </div>
  );
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────

const GENDERS: MegaGender[] = ['men', 'women', 'unisex'];

function MobileDrawer({ onClose }: { onClose: () => void }) {
  const [openGender, setOpenGender] = useState<MegaGender | null>(null);

  // Trap focus and close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-label="Mobile navigation"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/80"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <nav className="relative z-10 w-[min(85vw,360px)] bg-ink border-r-[3px] border-black flex flex-col overflow-y-auto animate-slide-down">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b-[3px] border-black">
          <Link to="/" onClick={onClose} className="font-display text-3xl text-stark">
            THRIFTVERSE
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-stark-dim hover:text-stark transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* Gender accordion */}
        {GENDERS.map((g) => {
          const cat = CATALOG[g];
          const isOpen = openGender === g;
          return (
            <div key={g} className="border-b-[3px] border-black">
              <button
                onClick={() => setOpenGender(isOpen ? null : g)}
                aria-expanded={isOpen}
                className={clsx(
                  'w-full flex items-center justify-between px-4 py-4',
                  'font-display text-3xl text-stark hover:text-gold transition-colors'
                )}
              >
                <span>{cat.label}</span>
                <span className={clsx('transition-transform duration-200', isOpen && 'rotate-90')}>
                  <ChevronRight size={20} />
                </span>
              </button>

              {isOpen && (
                <div className="bg-ink-800 border-t-[3px] border-black pb-4">
                  {cat.categories.map((category) => (
                    <div key={category.key}>
                      <Link
                        to={`/shop/${g}/${category.key}`}
                        onClick={onClose}
                        className="flex items-center px-6 py-2 font-cond font-bold text-sm text-vibranium uppercase tracking-wider hover:text-stark"
                      >
                        {category.label}
                      </Link>
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          to={`/shop/${g}/${sub.slug}`}
                          onClick={onClose}
                          className="flex items-center justify-between px-8 py-1.5 font-sans text-sm text-stark-dim hover:text-stark transition-colors"
                        >
                          <span>{sub.label}</span>
                          <span className="font-mono text-[9px] opacity-50">
                            {sub.count.toLocaleString('en-IN')}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Static links */}
        <div className="flex flex-col gap-0 mt-auto border-t-[3px] border-black">
          {[
            { label: 'CURATORS', to: '/curators' },
            { label: 'ABOUT', to: '/about' },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  'px-4 py-4 font-display text-2xl border-b-[3px] border-black transition-colors',
                  isActive ? 'text-gold' : 'text-stark hover:text-gold'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export default function Header() {
  const [activeGender, setActiveGender] = useState<MegaGender | null>(null);
  const searchOpen = useUIStore((s) => s.searchOpen);
  const setSearchOpen = useUIStore((s) => s.setSearchOpen);
  const cartOpen = useUIStore((s) => s.cartOpen);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCartStore((s) => s.count);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega = useCallback((g: MegaGender) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setActiveGender(g);
  }, []);

  const closeMega = useCallback(() => {
    hoverTimerRef.current = setTimeout(() => setActiveGender(null), 120);
  }, []);

  const keepMegaOpen = useCallback(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  }, []);

  // Close mega on route change
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-ink border-b-[3px] border-black">
        <Container className="h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link
            to="/"
            className="font-display text-2xl sm:text-3xl text-stark tracking-wider hover:text-gold transition-colors shrink-0"
            onClick={() => setActiveGender(null)}
          >
            THRIFT<span className="text-crimson">VERSE</span>
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-8"
          >
            {GENDERS.map((g) => (
              <button
                key={g}
                onMouseEnter={() => openMega(g)}
                onMouseLeave={closeMega}
                onFocus={() => openMega(g)}
                aria-haspopup="true"
                aria-expanded={activeGender === g}
                className={clsx(
                  NAV_LINK_BASE,
                  activeGender === g && 'text-gold'
                )}
              >
                {CATALOG[g].label}
              </button>
            ))}

            <NavLink
              to="/curators"
              className={({ isActive }) =>
                clsx(NAV_LINK_BASE, isActive && 'text-gold')
              }
            >
              Curators
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* DROPS pill */}
            <Link
              to="/shop?isNew=true"
              className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase bg-crimson text-stark border-[3px] border-black px-3 py-1.5 rounded-full shadow-comic-sm hover:-translate-y-0.5 hover:shadow-comic transition-all"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-stark animate-pulse" />
              DROPS
            </Link>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="p-2 text-stark-dim hover:text-stark transition-colors rounded-full"
            >
              <Search size={22} />
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(!cartOpen)}
              aria-label={`Open cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
              className="relative p-2 text-stark-dim hover:text-stark transition-colors rounded-full"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-crimson text-stark font-mono text-[9px] font-bold w-4 h-4 flex items-center justify-center border border-black rounded-full">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2 text-stark-dim hover:text-stark transition-colors rounded-full"
            >
              <Menu size={22} />
            </button>
          </div>
        </Container>

        {/* Mega Menu — positioned relative to the header */}
        {activeGender && (
          <div
            onMouseEnter={keepMegaOpen}
            onMouseLeave={closeMega}
          >
            <MegaMenu gender={activeGender} onClose={() => setActiveGender(null)} />
          </div>
        )}
      </header>

      {/* Search Overlay — portal-level */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}

      {/* Mobile Drawer */}
      {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}
    </>
  );
}
