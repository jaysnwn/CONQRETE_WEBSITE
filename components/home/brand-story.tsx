import Image from 'next/image';
import Link from 'next/link';

export default function BrandStory() {
  return (
    <section style={{
      backgroundColor: '#ffffff',
      padding: '60px 24px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div className="brand-story-grid" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gap: '80px',
        alignItems: 'center',
      }}>
        {/* Left: Image */}
        <div style={{
          position: 'relative',
          aspectRatio: '1/1',
          maxHeight: '500px',
          borderRadius: '24px',
          overflow: 'hidden',
          backgroundColor: '#c8ff00',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Image
            src="/brand_story.jpg"
            alt="Built For The Relentless"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Right: Story */}
        <div>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 16px 0' }}>
            Our Story
          </p>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 40px)', fontWeight: 800, color: '#111827', lineHeight: 1.15, margin: '0 0 24px 0', letterSpacing: '-0.02em' }}>
            We were tired of cables that break in two weeks.
          </h2>
          <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: 1.7, margin: '0 0 20px 0' }}>
            CONQRETE was born from a simple frustration — tech accessories that look cheap, fail fast, and cost too much for what they deliver. We set out to build something different.
          </p>
          <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: 1.7, margin: '0 0 32px 0' }}>
            Every product in our lineup is engineered to outlast the alternatives. We obsess over the materials, the connectors, the firmware — the details that most brands skip because they assume you won't notice.
          </p>
          <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: 1.7, margin: '0 0 40px 0' }}>
            You will notice. That's the point.
          </p>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: '#e5e7eb', marginBottom: '32px' }} />

          {/* Mini stats row */}
          <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#111827' }}>2024</div>
              <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>Founded</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#111827' }}>100%</div>
              <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>BIS Certified</div>
            </div>

          </div>

          <Link href="/about" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#111827',
            color: '#ffffff',
            padding: '14px 28px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '15px',
            textDecoration: 'none',
            transition: 'background 0.2s ease',
          }}>
            Our story →
          </Link>
        </div>
      </div>
      <style>{`
        .brand-story-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 900px) {
          .brand-story-grid { grid-template-columns: 1fr; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
