import { useParams, Navigate } from 'react-router-dom';
import Container from '@/components/layout/Container';
import CuratorsHero from '@/components/curators/CuratorsHero';
import CuratorRail from '@/components/curators/CuratorRail';
import CuratorDossier from '@/components/curators/CuratorDossier';
import { CURATORS } from '@/data/curators';

export default function CuratorsPage() {
  const { slug } = useParams<{ slug?: string }>();
  
  // If no slug or invalid slug, default to first curator
  const activeCurator = slug 
    ? CURATORS.find(c => c.slug === slug) 
    : CURATORS[0];

  if (!slug || !activeCurator) {
    return <Navigate to={`/curators/${CURATORS[0].slug}`} replace />;
  }

  const activeIndex = CURATORS.findIndex(c => c.slug === activeCurator.slug);

  return (
    <div className="flex flex-col min-h-screen bg-ink">
      <CuratorsHero />

      <Container className="py-8 lg:py-14 relative">
        <div className="flex flex-col lg:grid lg:grid-cols-[320px_1fr] gap-8 items-start">
          
          {/* Mobile/Tablet: Sticky top strip. Desktop: Sticky side rail. */}
          <div className="sticky top-[60px] lg:top-28 z-20 w-full bg-ink lg:bg-transparent -mx-4 px-4 sm:mx-0 sm:px-0 pt-2 lg:pt-0 lg:border-none border-b-3 border-black pb-2 lg:pb-0 shadow-comic-sm lg:shadow-none">
            <CuratorRail activeSlug={activeCurator.slug} />
          </div>

          <div className="w-full min-w-0">
            <CuratorDossier curator={activeCurator} index={activeIndex} />
          </div>
          
        </div>
      </Container>
    </div>
  );
}
