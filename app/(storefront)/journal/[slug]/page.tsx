import { Metadata } from 'next';
import { Breadcrumbs } from '#/components/ui/breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `${resolvedParams.slug.replace(/-/g, ' ').toUpperCase()} | CONQRETE Journal`,
    description: `Read the latest CONQRETE journal article on ${resolvedParams.slug.replace(/-/g, ' ')}.`,
    alternates: { canonical: `https://conqrete.in/journal/${resolvedParams.slug}` }
  };
}

export default async function JournalArticle({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${resolvedParams.slug.replace(/-/g, ' ').toUpperCase()}`,
    "publisher": { "@type": "Organization", "name": "CONQRETE" }
  };
  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumbs items={[
        { name: 'Home', href: '/' }, 
        { name: 'Journal', href: '/journal' },
        { name: resolvedParams.slug, href: `/journal/${resolvedParams.slug}` }
      ]} />
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '24px 0' }}>{resolvedParams.slug.replace(/-/g, ' ').toUpperCase()}</h1>
      <div style={{ color: '#4b5563', lineHeight: 1.6 }}><p>Journal article template.</p></div>
    </article>
  );
}
