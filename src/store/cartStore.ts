import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  count: number;
  subtotal: number;

  add: (item: CartItem) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

function computeDerived(items: CartItem[]): Pick<CartState, 'count' | 'subtotal'> {
  return {
    count: items.length,
    subtotal: items.reduce((sum, item) => sum + item.price, 0),
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      count: 0,
      subtotal: 0,

      add(item) {
        const { items } = get();
        // 1-of-1 rule: reject duplicates by product id
        if (items.some((i) => i.productId === item.productId)) {
          return;
        }
        const next = [...items, item];
        set({ items: next, ...computeDerived(next) });
      },

      remove(productId) {
        const next = get().items.filter((item) => item.productId !== productId);
        set({ items: next, ...computeDerived(next) });
      },

      clear() {
        set({ items: [], count: 0, subtotal: 0 });
      },
    }),
    {
      name: 'thriftverse-cart',
      // Only persist the items array; count/subtotal are derived and recomputed on rehydration
      partialize: (state) => ({ items: state.items }),
      // Rehydrate derived values after loading from storage
      onRehydrateStorage: () => (state) => {
        if (state) {
          const derived = computeDerived(state.items);
          state.count = derived.count;
          state.subtotal = derived.subtotal;
        }
      },
    }
  )
);
