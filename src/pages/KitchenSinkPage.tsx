import { ShoppingCart, Zap } from 'lucide-react';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/ToastContainer';

export default function KitchenSinkPage() {
  const { info, success, error, warning } = useToast();

  return (
    <Container className="py-20 space-y-24">
      
      {/* ─── TYPOGRAPHY & HEADING ────────────────────────────────────────── */}
      <section className="space-y-8">
        <SectionHeading 
          eyebrow="DESIGN SYSTEM" 
          title="TYPOGRAPHY & HEADINGS" 
        />
        <div className="comic-card p-8 space-y-6">
          <div>
            <p className="font-mono text-xs text-vibranium mb-2">Display (Anton)</p>
            <h1 className="font-display text-7xl text-stark">THE QUICK BROWN FOX</h1>
          </div>
          <div>
            <p className="font-mono text-xs text-vibranium mb-2">Sub-display (Oswald)</p>
            <h2 className="font-cond font-bold text-4xl text-stark uppercase">Jumps Over The Lazy Dog</h2>
          </div>
          <div>
            <p className="font-mono text-xs text-vibranium mb-2">Body (Inter)</p>
            <p className="font-sans text-base text-stark-dim max-w-2xl leading-relaxed">
              Thriftverse is a Marvel-inspired "Modern Comic Brutalism" e-commerce app. 
              We use stark contrasts, harsh offset shadows, and halftone dot patterns.
            </p>
          </div>
        </div>
      </section>

      {/* ─── BUTTONS ─────────────────────────────────────────────────────── */}
      <section className="space-y-8">
        <SectionHeading title="BUTTONS" align="center" />
        <div className="comic-card p-8 flex flex-wrap gap-6 items-end justify-center">
          <Button variant="gold" size="lg">Gold Large</Button>
          <Button variant="red" size="md" leftIcon={<ShoppingCart size={18}/>}>Add to Cart</Button>
          <Button variant="ghost" size="sm" rightIcon={<Zap size={16}/>}>Ghost Small</Button>
          <Button variant="gold" loading>Loading</Button>
          <Button variant="red" disabled>Disabled</Button>
        </div>
      </section>

      {/* ─── CHIPS & BADGES ────────────────────────────────────────────── */}
      <section className="space-y-8">
        <SectionHeading title="CHIPS & BADGES" />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="comic-card p-8 space-y-6 bg-ink halftone">
            <h3 className="font-cond font-bold text-xl text-stark uppercase">Chips (Interactive)</h3>
            <div className="flex flex-wrap gap-3">
              <button className="chip">Vintage</button>
              <button className="chip">Y2K</button>
              <button className="chip">Streetwear</button>
              <button className="chip bg-vibranium text-ink">Active State</button>
            </div>
          </div>
          <div className="comic-card p-8 space-y-6 halftone-fade">
            <h3 className="font-cond font-bold text-xl text-stark uppercase">Badges (Static)</h3>
            <div className="flex flex-wrap gap-3">
              <Badge variant="red">Sold Out</Badge>
              <Badge variant="gold">Rare</Badge>
              <Badge variant="cyan">New Drop</Badge>
              <Badge variant="white">Size M</Badge>
              <Badge variant="black">Archived</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMIC SHAPES ──────────────────────────────────────────────── */}
      <section className="space-y-8">
        <SectionHeading title="COMIC SHAPES" />
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="p-8 flex justify-center">
            <div className="speech-bubble max-w-xs">
              <p className="font-sans font-bold text-sm">
                "Whoa! This vintage jacket is pure heat."
              </p>
            </div>
          </div>
          <div className="p-8 flex justify-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="burst absolute inset-0 bg-gold animate-pulse-glow" />
              <span className="relative z-10 font-display text-3xl text-ink leading-none text-center pt-1">
                1 OF 1
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TOASTS ────────────────────────────────────────────────────── */}
      <section className="space-y-8">
        <SectionHeading title="TOAST NOTIFICATIONS" />
        <div className="comic-card p-8 flex flex-wrap gap-4">
          <Button variant="ghost" onClick={() => info('Item added to cart.')}>
            Trigger Info
          </Button>
          <Button variant="ghost" onClick={() => success('Checkout complete!')}>
            Trigger Success
          </Button>
          <Button variant="ghost" onClick={() => warning('Only 1 left in stock.')}>
            Trigger Warning
          </Button>
          <Button variant="ghost" onClick={() => error('Payment failed. Try again.')}>
            Trigger Error
          </Button>
        </div>
      </section>

      {/* ─── SKELETONS ─────────────────────────────────────────────────── */}
      <section className="space-y-8">
        <SectionHeading title="SKELETONS" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <div className="hidden md:block"><ProductCardSkeleton /></div>
          <div className="hidden md:block"><ProductCardSkeleton /></div>
        </div>
      </section>

    </Container>
  );
}
