import { useState, useEffect } from 'react';
import type { Product, ShopFilters } from '@/types';
import { fetchProducts } from '@/data/products';

export function useProducts(filters: ShopFilters & { gender?: string, category?: string }) {
  const [items, setItems] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const page = filters.page || 1;
  const pageSize = 24;

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    
    // Convert ShopFilters to FetchParams
    const fetchParams = {
      ...filters,
      pageSize,
    };

    fetchProducts(fetchParams).then(res => {
      if (!isCancelled) {
        if (page === 1) {
          setItems(res.items);
        } else {
          setItems(prev => {
            // Avoid duplicates on strict-mode double mount
            const newItems = res.items.filter(newItem => !prev.some(p => p.id === newItem.id));
            return [...prev, ...newItems];
          });
        }
        setTotal(res.total);
        setLoading(false);
        setError(null);
      }
    }).catch(err => {
      if (!isCancelled) {
        setError(err.message || 'Failed to fetch products');
        setLoading(false);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [
    // We intentionally stringify array dependencies to avoid infinite loops
    filters.gender, filters.category, 
    filters.sub?.join(','), filters.size?.join(','), 
    filters.condition?.join(','), filters.rarity?.join(','), 
    filters.brand?.join(','), filters.era?.join(','), 
    filters.minPrice, filters.maxPrice, filters.q, 
    filters.curator, filters.filter, filters.oneofone, 
    filters.sort, filters.page
  ]);

  const hasMore = items.length < total;

  return { items, total, loading, error, hasMore };
}
