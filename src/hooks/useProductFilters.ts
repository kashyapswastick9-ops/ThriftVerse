import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { ShopFilters } from '@/types';

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: ShopFilters = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    
    return {
      gender: params.gender as ShopFilters['gender'],
      category: params.category as ShopFilters['category'],
      sub: params.sub ? params.sub.split(',') : undefined,
      size: params.size ? params.size.split(',') as ShopFilters['size'] : undefined,
      condition: params.condition ? params.condition.split(',') as ShopFilters['condition'] : undefined,
      rarity: params.rarity ? params.rarity.split(',') as ShopFilters['rarity'] : undefined,
      brand: params.brand ? params.brand.split(',') : undefined,
      era: params.era ? params.era.split(',') : undefined,
      minPrice: params.minPrice ? parseInt(params.minPrice, 10) : undefined,
      maxPrice: params.maxPrice ? parseInt(params.maxPrice, 10) : undefined,
      q: params.q,
      curator: params.curator,
      filter: params.filter,
      oneofone: params.oneofone === 'true',
      sort: (params.sort as ShopFilters['sort']) || 'newest',
      page: params.page ? parseInt(params.page, 10) : 1,
    };
  }, [searchParams]);

  const setFilter = useCallback((key: keyof ShopFilters, value: any) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value === undefined || value === null || value === '' || value === false || (Array.isArray(value) && value.length === 0)) {
        next.delete(key);
      } else {
        next.set(key, Array.isArray(value) ? value.join(',') : String(value));
      }
      if (key !== 'page') {
        next.set('page', '1');
      }
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const toggleInArray = useCallback((key: keyof ShopFilters, value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const current = prev.get(key);
      const arr = current ? current.split(',') : [];
      const newArr = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
      
      if (newArr.length === 0) {
        next.delete(key);
      } else {
        next.set(key, newArr.join(','));
      }
      next.set('page', '1');
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const clearAll = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams();
      // preserve gender and category if they are part of the path logically, 
      // but in this implementation they might be search params or path params.
      // Usually gender/category are path params in the router, but if they are in searchParams, we keep them? 
      // Actually, spec says gender (path), category (path). So they won't be in searchParams if handled properly by useParams.
      // BUT if they are in searchParams, let's clear them except maybe page/sort? 
      // Spec: "clears all filter params"
      if (prev.has('sort')) next.set('sort', prev.get('sort')!);
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const activeCount = useMemo(() => {
    let count = 0;
    if (filters.sub) count += filters.sub.length;
    if (filters.size) count += filters.size.length;
    if (filters.condition) count += filters.condition.length;
    if (filters.rarity) count += filters.rarity.length;
    if (filters.brand) count += filters.brand.length;
    if (filters.era) count += filters.era.length;
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) count += 1;
    if (filters.q) count += 1;
    if (filters.curator) count += 1;
    if (filters.filter) count += 1;
    if (filters.oneofone) count += 1;
    return count;
  }, [filters]);

  return { filters, setFilter, toggleInArray, clearAll, activeCount };
}
