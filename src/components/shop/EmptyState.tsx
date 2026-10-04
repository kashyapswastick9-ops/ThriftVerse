import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  onClear: () => void;
  type?: 'noResults' | 'error';
}

export default function EmptyState({ onClear, type = 'noResults' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="relative mb-8 w-40 h-40 flex items-center justify-center">
        <div className="absolute inset-0 bg-gold burst animate-pulse-glow border-[3px] border-black shadow-comic-sm -rotate-12" />
        <span className="relative z-10 font-comic tracking-wide text-5xl text-ink leading-none mt-2 -rotate-12">
          {type === 'error' ? 'BAM!' : 'POW!'}
        </span>
      </div>
      
      <h3 className="font-display text-4xl text-stark mb-2 uppercase">
        {type === 'error' ? 'VILLAIN INTERFERENCE!' : 'NO PIECES MATCH YOUR FILTERS'}
      </h3>
      <p className="font-mono text-sm text-stark-dim mb-8">
        {type === 'error' 
          ? 'The grid went down. We are fixing the timeline.' 
          : 'Try removing some filters to see more drops.'}
      </p>
      
      <Button variant="gold" onClick={onClear}>
        {type === 'error' ? 'TRY AGAIN' : 'CLEAR ALL FILTERS'}
      </Button>
    </div>
  );
}
