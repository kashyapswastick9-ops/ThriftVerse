import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import ShopToolbar from '@/components/shop/ShopToolbar';
import FilterSidebar from '@/components/shop/FilterSidebar';
import ActiveFilterChips from '@/components/shop/ActiveFilterChips';
import ProductGrid from '@/components/shop/ProductGrid';
import { useProductFilters } from '@/hooks/useProductFilters';
import { useProducts } from '@/hooks/useProducts';
import { CATALOG } from '@/data/catalog';
import type { Gender, CategoryKey } from '@/types';

export default function ShopPage() {
  const { gender, category } = useParams<{ gender?: string; category?: string }>();
  const { filters, setFilter, toggleInArray, clearAll, activeCount } = useProductFilters();
  
  const [density, setDensity] = useState<2 | 3>(3);

  // Sync route params into the filter object passed to useProducts
  const activeFilters = {
    ...filters,
    gender: (gender as Gender) || filters.gender,
    category: (category as CategoryKey) || filters.category,
  };

  const { items, total, loading, error, hasMore } = useProducts(activeFilters);

  // Derive page heading
  let title = 'ALL ISSUES';
  if (category && gender) {
    const cat = CATALOG[gender as Gender]?.categories.find(c => c.key === category);
    title = cat ? cat.label : category;
  } else if (gender) {
    title = `${gender}S COLLECTION`;
  } else if (filters.q) {
    title = `SEARCH: ${filters.q}`;
  } else if (filters.curator) {
    title = `CURATOR PICKS`;
  }

  // Breadcrumbs
  const breadcrumbs = [];
  breadcrumbs.push({ label: 'HOME', to: '/' });
  if (gender) {
    breadcrumbs.push({ label: gender.toUpperCase(), to: `/shop/${gender}` });
  }
  if (gender && category) {
    breadcrumbs.push({ label: title.toUpperCase(), to: `/shop/${gender}/${category}` });
  }

  const loadMore = () => {
    setFilter('page', (filters.page || 1) + 1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-ink">
      
      {/* Page Header */}
      <div className="relative bg-ink halftone-red border-b-[3px] border-black overflow-hidden pt-8 sm:pt-12 pb-6">
        {/* Giant faded text background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none overflow-hidden">
          <span className="font-display text-[15rem] leading-none whitespace-nowrap">
            {gender ? gender.toUpperCase() : 'THRIFTVERSE'}
          </span>
        </div>
        
        <Container className="relative z-10">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 font-mono text-[10px] text-stark-dim">
              {breadcrumbs.map((crumb, idx) => (
                <li key={crumb.to} className="flex items-center gap-2">
                  {idx > 0 && <span>/</span>}
                  {idx === breadcrumbs.length - 1 ? (
                    <span className="text-crimson font-bold">{crumb.label}</span>
                  ) : (
                    <Link to={crumb.to} className="hover:text-stark transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <SectionHeading 
            eyebrow={`${total} PIECES`} 
            title={title} 
          />
        </Container>
      </div>

      <Container className="py-6">
        <ShopToolbar 
          total={total}
          activeCount={activeCount}
          sort={filters.sort || 'newest'}
          onSortChange={(s) => setFilter('sort', s)}
          density={density}
          onDensityChange={setDensity}
        />

        <div className="mt-6 lg:grid lg:grid-cols-[280px_1fr] lg:gap-8 xl:gap-10 items-start">
          
          <FilterSidebar 
            filters={filters}
            gender={(gender as Gender) || 'unisex'}
            category={category as CategoryKey}
            products={items}
            onSetFilter={setFilter}
            onToggle={toggleInArray}
            onClear={clearAll}
            activeCount={activeCount}
            totalProducts={total}
            className="hidden lg:flex sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto hide-scrollbar"
          />
          
          <div className="min-w-0">
            <ActiveFilterChips 
              filters={filters}
              onRemove={toggleInArray as (key: string, val?: string) => void}
              onClearAll={clearAll}
              total={total}
            />
            
            {error ? (
              <div className="p-10 bg-ink-800 border-[3px] border-black text-center">
                <p className="font-display text-2xl text-crimson mb-2">ERROR</p>
                <p className="font-mono text-sm text-stark-dim">{error}</p>
              </div>
            ) : (
              <ProductGrid 
                products={items}
                loading={loading}
                total={total}
                loadMore={loadMore}
                hasMore={hasMore}
                density={density}
              />
            )}
          </div>
          
        </div>
      </Container>
    </div>
  );
}
