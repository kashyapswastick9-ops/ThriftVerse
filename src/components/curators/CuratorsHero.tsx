import Container from '@/components/layout/Container';

export default function CuratorsHero() {
  return (
    <div className="py-14 border-b-3 border-black bg-ink halftone-red relative overflow-hidden">
      <Container className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        
        <div>
          <h1 className="font-display text-6xl md:text-9xl text-stark leading-none tracking-tight">
            MEET THE <br/>
            <span className="text-crimson" style={{ textShadow: '4px 4px 0 #000', WebkitTextStroke: '2px #000' }}>
              CURATORS
            </span>
          </h1>
          <p className="font-mono text-xs text-stark-dim mt-4 tracking-widest uppercase">
            VAULT INTELLIGENCE INDEX // 06 OPERATIVES ACTIVE
          </p>
        </div>

        {/* Burst badge */}
        <div className="hidden sm:flex shrink-0 items-center justify-center w-24 h-24 bg-gold burst animate-pulse-glow shadow-comic-sm -rotate-6">
          <span className="font-display text-3xl text-ink leading-none mt-1">NEW</span>
        </div>
        
      </Container>
    </div>
  );
}
