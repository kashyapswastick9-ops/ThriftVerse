import { Link } from 'react-router-dom';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <Container className="py-32 flex flex-col items-center justify-center text-center min-h-[70vh]">
      <div className="relative mb-12">
        <div className="burst bg-crimson w-64 h-64 absolute -top-8 -left-8 -z-10 animate-pulse-glow" />
        <h1 className="font-display text-[120px] leading-none text-stark comic-border bg-ink p-8 shadow-comic-lg">
          404
        </h1>
      </div>
      
      <h2 className="font-cond font-bold text-3xl md:text-4xl text-stark mb-6 uppercase tracking-widest">
        Page Not Found In This Universe
      </h2>
      
      <p className="font-sans text-stark-dim text-lg max-w-md mb-10">
        The drop you're looking for has either sold out, moved to a different timeline, or never existed at all.
      </p>
      
      <Button as={Link} to="/" variant="gold" size="lg">
        Return to Home Base
      </Button>
    </Container>
  );
}
