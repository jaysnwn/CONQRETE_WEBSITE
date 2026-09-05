import { Metadata } from 'next';
import { Breadcrumbs } from '#/components/ui/breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `${resolvedParams.slug.replace(/-/g, ' ').toUpperCase()} | CONQRETE Technology`,
    description: `Learn everything about ${resolvedParams.slug.replace(/-/g, ' ')} and how CONQRETE implements it.`,
    alternates: { canonical: `https://conqrete.in/technology/${resolvedParams.slug}` }
  };
}

export default async function TechnologyArticle({ params }: { params: Promise<{ slug: string }> }) {
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
        { name: 'Technology', href: '/technology' },
        { name: resolvedParams.slug, href: `/technology/${resolvedParams.slug}` }
      ]} />
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '24px 0' }}>{resolvedParams.slug.replace(/-/g, ' ').toUpperCase()}</h1>
      <div style={{ color: '#4b5563', lineHeight: 1.6 }}><p>Technology template.</p></div>
    </article>
  );
}
