import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import ClearanceStamp from './ClearanceStamp';
import { CURATORS } from '@/data/curators';

export default function CuratorsTeaser() {
  return (
    <section className="bg-ink-800 border-y-3 border-black halftone py-16 overflow-hidden">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <SectionHeading eyebrow="CLASSIFIED FILES" title="VAULT CURATORS" />
          <Link to="/curators" className="btn-comic shrink-0">
            VIEW ALL DOSSIERS <ArrowRight size={16} strokeWidth={3} className="ml-2" />
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 lg:grid lg:grid-cols-4 lg:overflow-visible lg:snap-none lg:mx-0 lg:px-0 hide-scrollbar">
          {CURATORS.slice(0, 4).map((curator) => (
            <Link
              key={curator.slug}
              to={`/curators/${curator.slug}`}
              className="comic-card group p-0 relative min-w-[260px] snap-start border-3 border-black overflow-hidden flex flex-col bg-ink transition-transform hover:-translate-y-2 focus-visible:ring-4 focus-visible:ring-vibranium"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-black">
                <img 
                  src={curator.avatar} 
                  alt={curator.alias}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                />
                
                <ClearanceStamp 
                  clearance={curator.clearance} 
                  className="absolute top-3 right-3 scale-75 origin-top-right shadow-sm"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-0 inset-x-0 bg-black/80 p-4 border-t-3 border-black translate-y-1 group-hover:translate-y-0 transition-transform">
                  <h3 className="font-display text-3xl text-stark leading-none truncate">
                    {curator.alias}
                  </h3>
                  <div className={`h-1 w-12 mt-2 bg-${curator.accent}`} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
