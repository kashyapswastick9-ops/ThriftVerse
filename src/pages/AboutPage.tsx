import Container from '@/components/layout/Container';

export default function AboutPage() {
  return (
    <Container className="py-20">
      <h1 className="font-display text-5xl md:text-7xl text-stark mb-6">
        ABOUT THRIFTVERSE
      </h1>
      <p className="font-sans text-stark-dim text-lg max-w-2xl">
        One-of-one thrift drops curated by obsessives. No fast fashion. No fakes. Just heat.
      </p>
    </Container>
  );
}
