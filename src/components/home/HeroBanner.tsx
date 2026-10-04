import { Link } from 'react-router-dom';
import Container from '@/components/layout/Container';

export default function HeroBanner() {
  return (
    <section className="relative border-b-3 border-black overflow-hidden bg-ink halftone-red">
      {/* Decorative Background Word */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-15"
        aria-hidden="true"
      >
        <span className="font-display text-[20vw] text-stark whitespace-nowrap leading-none tracking-tighter">
          THRIFT
        </span>
      </div>

      <Container className="relative z-10 grid lg:grid-cols-12 gap-12 items-center py-16 lg:py-28">
        
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          <span className="chip bg-stark text-ink hover:bg-stark cursor-default">
            SEASON 07 · ISSUE #01
          </span>
          
          <h1 className="font-display text-6xl sm:text-7xl xl:text-[8rem] leading-[0.85] text-stark uppercase">
            WEAR THE <br />
            <span 
              className="text-crimson relative inline-block"
              style={{
                textShadow: '4px 4px 0 #000',
                WebkitTextStroke: '2px #000'
              }}
            >
              MULTIVERSE
            </span>
          </h1>
          
          <p className="font-sans text-stark-dim text-base sm:text-lg max-w-md leading-relaxed">
            One-of-one thrift drops curated by obsessives. We scour the timelines so you don't have to.
            No fast fashion. No fakes. Just heat.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Link to="/shop" className="btn-comic-red lg:!px-8 lg:!py-4 lg:!text-lg">
              SHOP THE DROP
            </Link>
            <Link to="/curators" className="btn-comic-ghost lg:!px-8 lg:!py-4 lg:!text-lg">
              MEET THE CURATORS
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 hidden sm:flex justify-center lg:justify-end relative">
          <div className="relative rotate-2 comic-border shadow-comic-lg bg-gold p-2 w-full max-w-md transition-transform hover:rotate-1 hover:scale-[1.02] duration-300">
            <img 
              src="https://picsum.photos/seed/hero-thrift/800/1000" 
              alt="Vintage streetwear jacket"
              className="w-full aspect-[4/5] object-cover mix-blend-multiply border-2 border-black"
              loading="eager"
            />
            
            {/* Burst Sticker */}
            <div 
              className="absolute -top-6 -left-6 burst bg-crimson w-28 h-28 flex items-center justify-center border-2 border-black animate-pulse-glow shadow-comic-sm"
              aria-hidden="true"
            >
              <span className="font-display text-2xl text-stark -rotate-12 mt-1">1 OF 1!</span>
            </div>

            {/* Speech Bubble */}
            <div 
              className="absolute bottom-4 -left-8 speech-bubble animate-pop-in"
              style={{ animationDelay: '500ms' }}
              aria-hidden="true"
            >
              <p className="font-cond font-bold text-sm tracking-wider uppercase">STOCK IS LIMITED!</p>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}
