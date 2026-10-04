import { Link } from 'react-router-dom';
import { BUDGET_TIERS } from '@/data/catalog';
import { ArrowRight } from 'lucide-react';

export default function BudgetStrip() {
  return (
    <section className="bg-gold border-b-3 border-black py-4 lg:py-6" aria-label="Shop by budget">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar md:justify-center">
          
          <h2 className="font-display text-2xl text-ink whitespace-nowrap shrink-0 flex items-center gap-2">
            SHOP BY BUDGET <ArrowRight size={24} strokeWidth={3} />
          </h2>

          <div className="flex items-center gap-4 shrink-0">
            {BUDGET_TIERS.map((tier) => (
              <Link
                key={tier.label}
                to={`/shop?maxPrice=${tier.max}`}
                className="snap-start shrink-0 bg-ink text-gold font-display text-xl sm:text-2xl px-5 py-2.5 
                           border-3 border-black shadow-comic-sm transition-all duration-200
                           hover:bg-crimson hover:text-stark hover:-translate-y-1 hover:shadow-comic"
              >
                {tier.label}
              </Link>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
