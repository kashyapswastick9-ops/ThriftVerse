import { create } from 'zustand';
import type { Gender, Toast, ToastVariant } from '@/types';

// ─── UI Store ─────────────────────────────────────────────────────────────────

interface UIState {
  megaMenu: Gender | null;
  mobileNavOpen: boolean;
  searchOpen: boolean;
  cartOpen: boolean;
  filterDrawerOpen: boolean;

  setMegaMenu: (gender: Gender | null) => void;
  setMobileNavOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
  setFilterDrawerOpen: (open: boolean) => void;
  closeAll: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  megaMenu: null,
  mobileNavOpen: false,
  searchOpen: false,
  cartOpen: false,
  filterDrawerOpen: false,

  setMegaMenu: (gender) => set({ megaMenu: gender }),
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setCartOpen: (open) => set({ cartOpen: open }),
  setFilterDrawerOpen: (open) => set({ filterDrawerOpen: open }),
  closeAll: () =>
    set({
      megaMenu: null,
      mobileNavOpen: false,
      searchOpen: false,
      cartOpen: false,
      filterDrawerOpen: false,
    }),
}));

// ─── Toast Store ──────────────────────────────────────────────────────────────

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, variant?: ToastVariant) => void;
  removeToast: (id: string) => void;
}

function generateId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],

  addToast(message, variant = 'info') {
    const id = generateId();
    set((state) => ({
      toasts: [...state.toasts, { id, message, variant, createdAt: Date.now() }],
    }));
    // Auto-dismiss after 3s
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3000);
  },

  removeToast(id) {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));

// ─── Follow Store ─────────────────────────────────────────────────────────────

import { persist } from 'zustand/middleware';

interface FollowState {
  following: string[]; // curator slugs
  follow: (slug: string) => void;
  unfollow: (slug: string) => void;
  isFollowing: (slug: string) => boolean;
  toggle: (slug: string) => void;
}

export const useFollowStore = create<FollowState>()(
  persist(
    (set, get) => ({
      following: [],

      follow(slug) {
        if (!get().following.includes(slug)) {
          set((s) => ({ following: [...s.following, slug] }));
        }
      },

      unfollow(slug) {
        set((s) => ({ following: s.following.filter((f) => f !== slug) }));
      },

      isFollowing(slug) {
        return get().following.includes(slug);
      },

      toggle(slug) {
        get().isFollowing(slug) ? get().unfollow(slug) : get().follow(slug);
      },
    }),
    { name: 'thriftverse-following' }
  )
);

// ─── Wishlist Store ───────────────────────────────────────────────────────────

interface WishlistState {
  ids: string[]; // product ids
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],

      add(id) {
        if (!get().ids.includes(id)) {
          set((s) => ({ ids: [...s.ids, id] }));
        }
      },

      remove(id) {
        set((s) => ({ ids: s.ids.filter((i) => i !== id) }));
      },

      toggle(id) {
        get().has(id) ? get().remove(id) : get().add(id);
      },

      has(id) {
        return get().ids.includes(id);
      },
    }),
    { name: 'thriftverse-wishlist' }
  )
);
