import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Share2 } from 'lucide-react';
import clsx from 'clsx';
import type { Curator } from '@/types';
import { formatCompact } from '@/data/curators';
import ClearanceStamp from './ClearanceStamp';
import FollowButton from './FollowButton';
import StatBars from './StatBars';
import VaultCollectionCard from './VaultCollectionCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

interface CuratorDossierProps {
  curator: Curator;
  index: number;
}

const ACCENT_COLORS = {
  crimson: 'text-crimson',
  vibranium: 'text-vibranium',
  gold: 'text-gold',
};

function useCountUp(end: number) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      setCount(end);
      return;
    }

    let startTime = performance.now();
    const duration = 800; // ms

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutExpo for dramatic slowdown at the end
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * end));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  }, [end]);

  return count;
}

export default function CuratorDossier({ curator, index }: CuratorDossierProps) {
  // Key off the slug to force re-mount animations when changing curators
  return <DossierContent key={curator.slug} curator={curator} index={index} />;
}

function DossierContent({ curator, index }: CuratorDossierProps) {
  const [optimisticFollowers, setOptimisticFollowers] = useState(curator.followers);
  
  const displayFollowers = useCountUp(optimisticFollowers);
  const displayPieces = useCountUp(curator.piecesCurated);
  const displayDrops = useCountUp(curator.drops);

  const handleFollowChange = (isFollowing: boolean) => {
    // If they just followed, bump the number by 1 locally
    if (isFollowing && optimisticFollowers === curator.followers) {
      setOptimisticFollowers(f => f + 1);
    } else if (!isFollowing && optimisticFollowers > curator.followers) {
      setOptimisticFollowers(curator.followers);
    }
  };

  return (
    <div className="comic-border shadow-comic-lg bg-ink-800 relative animate-pop-in">
      
      {/* File Tab */}
      <div className="absolute -top-5 left-6 bg-gold text-ink font-mono text-xs font-bold px-3 py-1 border-3 border-black z-10">
        FILE #{String(index + 1).padStart(3, '0')} // {curator.clearance}
      </div>

      <div className="p-6 md:p-8 space-y-12">
        
        {/* A. HEADER BAND */}
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          
          {/* Avatar (Polaroid style) */}
          <div className="relative mx-auto md:mx-0 max-w-[280px] w-full shrink-0">
            <div className="p-2 pb-6 bg-stark border-3 border-black rotate-[-2deg] shadow-comic relative">
              <img 
                src={curator.avatar} 
                alt={curator.alias}
                className="w-full aspect-[3/4] object-cover border-2 border-black grayscale contrast-125"
              />
              {/* Redacted Bar */}
              <div 
                className="absolute top-[35%] left-2 right-2 h-8 bg-black z-10 skew-y-1"
                aria-hidden="true"
              />
              <ClearanceStamp 
                clearance={curator.clearance} 
                className="absolute -top-4 -right-6 scale-75"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h2 
              className={clsx(
                "font-display text-6xl md:text-7xl leading-none uppercase",
                ACCENT_COLORS[curator.accent]
              )}
              style={{ textShadow: '3px 3px 0 #000' }}
            >
              {curator.alias}
            </h2>
            <p className="font-mono text-sm text-stark-dim mt-2 bg-black/50 inline-block px-2 py-0.5 w-max">
              REAL NAME: {curator.realNameRedacted} [REDACTED]
            </p>
            <p className="font-cond text-2xl text-stark italic mt-4">"{curator.tagline}"</p>
            
            <p className="font-sans text-sm text-stark-dim mt-3 flex items-center gap-1.5">
              <MapPin size={16} /> {curator.origin}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {curator.specialties.map(spec => (
                <span key={spec} className="badge bg-ink text-stark border-stark-dim text-xs py-1 px-2">{spec}</span>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-6 lg:mt-auto pt-6">
              <FollowButton slug={curator.slug} onFollowChange={handleFollowChange} />
              <Button variant="ghost" className="!px-3" aria-label="Share Dossier">
                <Share2 size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* STAT TILES */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'FOLLOWERS', val: formatCompact(displayFollowers) },
            { label: 'PIECES CURATED', val: displayPieces.toLocaleString('en-IN') },
            { label: 'DROPS', val: displayDrops.toLocaleString('en-IN') }
          ].map(stat => (
            <div key={stat.label} className="bg-ink border-3 border-black p-3 md:p-4 text-center shadow-comic-sm">
              <div className="font-display text-3xl md:text-5xl text-gold leading-none mb-1">{stat.val}</div>
              <div className="font-mono text-[9px] md:text-[11px] text-stark-dim uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* B. POWER GRID */}
        <StatBars stats={curator.stats} accent={curator.accent} />

        {/* C. ORIGIN STORY */}
        <div className="relative pt-3">
          <div className="absolute top-0 left-4 bg-gold border-2 border-black font-mono text-[10px] font-bold px-2 z-10 shadow-comic-sm">
            CASE NOTES
          </div>
          <div className="speech-bubble bg-stark text-ink p-5 md:p-6 font-sans text-sm md:text-base leading-relaxed font-medium">
            {curator.bio}
          </div>
        </div>

        {/* D. SIGNATURE VAULT */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <SectionHeading title="SIGNATURE VAULT" />
            <span className="chip pointer-events-none">3 SETS</span>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {curator.signatureVault.map((set, i) => (
              <VaultCollectionCard key={set.id} set={set} accent={curator.accent} index={i} />
            ))}
          </div>
        </div>

        {/* E. CTA */}
        <div className="pt-4 border-t-3 border-black">
          <Button as={Link} to={`/shop?curator=${curator.slug}`} variant="red" size="lg" className="w-full sm:w-auto">
            SHOP {curator.alias}'S PICKS
          </Button>
        </div>

      </div>
    </div>
  );
}
