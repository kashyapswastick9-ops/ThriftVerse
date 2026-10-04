import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import Container from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import CategoryCard from './CategoryCard';
import type { Category, Gender } from '@/types';

interface CategorySectionProps {
  category: Category;
  gender: Gender;
  index: number;
}

export default function CategorySection({ category, gender, index }: CategorySectionProps) {
  const isEven = index % 2 === 0;
  
  return (
    <>
      {index > 0 && <div className="section-divider" />}
      
      <section 
        id={category.key} 
        aria-labelledby={`h-${category.key}`} 
        className={clsx(
          "py-14 border-b-3 border-black scroll-mt-[9rem]",
          isEven ? 'bg-ink' : 'bg-ink-800 halftone'
        )}
      >
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 relative">
            
            <div className="flex items-start gap-4">
              {/* Optional comic 'Chapter' panel for desktop flair */}
              <div 
                className="hidden lg:flex flex-col items-center justify-center shrink-0 w-16 h-16 bg-gold comic-border -rotate-3 shadow-comic-sm"
                aria-hidden="true"
              >
                <span className="font-mono text-[10px] uppercase font-bold leading-none">Ch.</span>
                <span className="font-display text-3xl leading-none">{index + 1}</span>
              </div>
              
              <SectionHeading 
                eyebrow={`CHAPTER 0${index + 1}`} 
                title={category.label} 
              />
            </div>

            <Link 
              to={`/shop/${gender}/${category.key}`} 
              className="btn-comic-ghost shrink-0 lg:mb-2 w-max"
            >
              VIEW ALL <ArrowRight size={16} strokeWidth={3} />
            </Link>
          </div>
          
          {/* Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 grid-flow-dense">
            {category.subcategories.map((sub, i) => {
              const isFirst = i === 0;
              const size = isFirst ? 'lg' : 'sm';
              const gridClass = isFirst ? 'col-span-2 lg:row-span-2' : 'col-span-1';
              
              return (
                <CategoryCard
                  key={sub.slug}
                  slug={sub.slug}
                  label={sub.label}
                  count={sub.count}
                  gender={gender}
                  size={size}
                  className={gridClass}
                  index={i}
                  priority={isFirst && index === 0} // Eager load the largest image of the first section
                />
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
