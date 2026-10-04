import { useParams } from 'react-router-dom';
import Container from '@/components/layout/Container';

export default function CuratorDossierPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <Container className="py-20">
      <h1 className="font-display text-5xl md:text-7xl text-stark mb-6">
        DOSSIER: {slug} <br/> <span className="text-gold">PROMPT 4 STUB</span>
      </h1>
      <p className="font-sans text-stark-dim text-lg max-w-2xl">
        This is a placeholder for the individual curator dossier. It will be built out in Prompt 4.
      </p>
    </Container>
  );
}
