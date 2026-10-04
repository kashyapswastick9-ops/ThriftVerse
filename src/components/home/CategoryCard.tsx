import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import type { Gender } from '@/types';

interface CategoryCardProps {
  label: string;
  count: number;
  slug: string;
  gender: Gender;
  size?: 'sm' | 'md' | 'lg';
  priority?: boolean;
  className?: string;
  index: number;
}

export default function CategoryCard({ 
  label, 
  count, 
  slug, 
  gender, 
  size = 'sm', 
  priority = false, 
  className,
  index
}: CategoryCardProps) {
  const { ref, inView } = useInView<HTMLAnchorElement>({ threshold: 0.15, once: true });
  
  // Use a predictable picsum seed based on gender and subcategory slug
  const imageSrc = `https://picsum.photos/seed/${gender}-${slug}/800/1000`;
  const href = `/shop/${gender}/${slug}`;
  const accessibleName = `${label}, ${count.toLocaleString('en-IN')} pieces`;

  return (
    <Link
      ref={ref}
      to={href}
      aria-label={accessibleName}
      className={clsx(
        "group relative block overflow-hidden comic-border shadow-comic bg-ink-700 transition-all duration-500 ease-out",
        "hover:-translate-x-1 hover:-translate-y-1 hover:shadow-comic-red focus-visible:shadow-comic-cyan focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-vibranium",
        // Aspect ratio handling based on bento size
        size === 'lg' ? "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]" : "aspect-[4/5]",
        // Scroll reveal animation classes
        inView 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0",
        className
      )}
      style={{ 
        // Staggered reveal delay based on grid index
        transitionDelay: inView ? `${index * 70}ms` : '0ms' 
      }}
    >
      <img
        src={imageSrc}
        alt=""
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1 grayscale-[0.3] group-hover:grayscale-0"
        onError={(e) => {
          // Fallback if image fails to load
          e.currentTarget.style.display = 'none';
        }}
      />
      
      {/* Gradients and Halftone Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 halftone-fade opacity-60" />
      
      {/* Count Badge */}
      <span className="badge bg-gold text-ink absolute top-3 left-3 z-10">
        {count.toLocaleString('en-IN')} PIECES
      </span>
      
      {/* Bottom Content Area */}
      <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between z-10">
        <h3 className={clsx(
          "font-display text-stark leading-none drop-shadow-[2px_2px_0_#000] transition-colors duration-200 group-hover:text-gold",
          size === 'lg' ? "text-5xl sm:text-6xl lg:text-7xl" : "text-3xl sm:text-4xl"
        )}>
          {label}
        </h3>
        <span 
          aria-hidden="true"
          className="grid place-items-center shrink-0 h-11 w-11 bg-crimson text-stark border-3 border-black shadow-comic-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-gold group-hover:text-ink"
        >
          <ArrowRight strokeWidth={3} size={20} />
        </span>
      </div>
    </Link>
  );
}
