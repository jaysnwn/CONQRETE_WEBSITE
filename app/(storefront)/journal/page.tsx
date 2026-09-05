import { Metadata } from 'next';
import { Breadcrumbs } from '#/components/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Journal | CONQRETE',
  description: 'The official CONQRETE journal: Buying guides, charging tutorials, and consumer electronics news.',
  alternates: { canonical: 'https://conqrete.in/journal' }
};

export default function JournalHub() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Journal', href: '/journal' }]} />
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '24px 0' }}>The CONQRETE Journal</h1>
    </div>
  );
}
