import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import Container from '@/components/layout/Container';
import HeroBanner from '@/components/home/HeroBanner';
import BudgetStrip from '@/components/home/BudgetStrip';
import GenderTabs from '@/components/home/GenderTabs';
import CategorySection from '@/components/home/CategorySection';
import CuratorsTeaser from '@/components/curators/CuratorsTeaser';
import CategoryGridSkeleton from '@/components/home/CategoryGridSkeleton';
import { CATALOG } from '@/data/catalog';
import type { Gender } from '@/types';

function isValidGender(g: string | null): g is Gender {
  return g === 'men' || g === 'women' || g === 'unisex';
}

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlGender = searchParams.get('g');
  
  const [gender, setGender] = useState<Gender>(
    isValidGender(urlGender) ? urlGender : 'men'
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const catalogData = CATALOG[gender];
  const categories = catalogData?.categories || [];

  const handleGenderChange = (newGender: Gender) => {
    if (newGender === gender) return;
    setIsTransitioning(true);
    setGender(newGender);
    setSearchParams({ g: newGender }, { replace: true });
    
    // Simulate loading a new dataset
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  // Scroll spy for sticky jump nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible intersecting section
        const visibleSections = entries.filter(e => e.isIntersecting);
        if (visibleSections.length > 0) {
          // Simplistic scroll spy: grab the first intersecting section (often the top one due to rootMargin)
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -75% 0px' } // Triggers when element is near the top third
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, [gender]); // re-bind when categories change

  return (
    <div className="flex flex-col w-full">
      <HeroBanner />
      <BudgetStrip />
      
      <div className="relative">
        <GenderTabs 
          gender={gender} 
          setGender={handleGenderChange} 
          catalog={CATALOG} 
        />
        
        {/* Sticky Jump Nav */}
        <div className="sticky top-[60px] lg:top-16 z-30 bg-ink border-y-3 border-black py-2.5 shadow-comic-sm">
          <Container>
            <nav 
              aria-label="Category jump navigation" 
              className="flex items-center gap-3 overflow-x-auto snap-x hide-scrollbar"
            >
              <span className="font-mono text-[10px] text-vibranium uppercase tracking-widest shrink-0 mr-2">
                JUMP TO:
              </span>
              {categories.map((cat) => {
                const isActive = activeSection === cat.key;
                return (
                  <a
                    key={cat.key}
                    href={`#${cat.key}`}
                    className={clsx(
                      "snap-start shrink-0 px-3 py-1.5 font-mono text-xs font-bold uppercase border-2 border-black transition-colors rounded-full",
                      isActive 
                        ? "bg-crimson text-stark" 
                        : "bg-ink-700 text-stark-dim hover:bg-stark hover:text-ink"
                    )}
                  >
                    {cat.label}
                  </a>
                );
              })}
            </nav>
          </Container>
        </div>
      </div>

      <div 
        role="region" 
        aria-live="polite"
        className="min-h-screen"
      >
        {isTransitioning ? (
          // Flash skeletons while 'loading' new gender data
          <Container className="py-14">
            <CategoryGridSkeleton />
            <div className="section-divider my-14" />
            <CategoryGridSkeleton />
          </Container>
        ) : categories.length === 0 ? (
          // Empty state
          <Container className="py-32 flex justify-center">
            <div className="comic-card bg-gold p-12 text-center max-w-md w-full">
              <h3 className="font-display text-4xl text-ink">NO ISSUES FOUND</h3>
              <p className="font-mono text-ink mt-2">The archives are empty for this timeline.</p>
            </div>
          </Container>
        ) : (
          // Render category sections
          <div key={gender} className="animate-slide-down">
            {categories.map((category, index) => (
              <CategorySection 
                key={category.key} 
                category={category} 
                gender={gender} 
                index={index} 
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Curators Teaser */}
      <CuratorsTeaser />

    </div>
  );
}
