"use client";

// Static placeholder Instagram-style UGC grid
// Replace image URLs with real CDN links or use next/image with actual photos

const posts = [
  { id: 1, emoji: '🔋', caption: 'Powered up for the weekend. The Titan 20K never lets me down.', user: '@arjun_travels', likes: 847 },
  { id: 2, emoji: '⚡', caption: 'Clean desk, cleaner cables. CONQRETE setup is elite.', user: '@techdesk.in', likes: 1203 },
  { id: 3, emoji: '🔌', caption: 'One adapter to rule them all. Laptop + phone + watch. Done.', user: '@priya_creates', likes: 623 },
  { id: 4, emoji: '🎒', caption: 'Trek essentials: boots, water, CONQRETE power bank. Essential kit.', user: '@vikram.outdoors', likes: 2104 },
  { id: 5, emoji: '💻', caption: 'WFH setup ft. the 65W GaN. No more bulky charger on my desk.', user: '@sneha.designs', likes: 912 },
  { id: 6, emoji: '📱', caption: '0 to 100 in 40 minutes. This power bank is insane value.', user: '@rohan_codes', likes: 756 },
];

export default function InstagramFeed() {
  return (
    <section style={{
      padding: '64px 24px',
      backgroundColor: '#ffffff',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px' }}>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px 0' }}>
              #ConqreteLife
            </p>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: 0 }}>
              Real customers. Real use.
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: '#111827', textDecoration: 'none' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Follow @CONQRETE
          </a>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                aspectRatio: '1/1',
                backgroundColor: '#111827',
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const overlay = e.currentTarget.querySelector('.ig-overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                const overlay = e.currentTarget.querySelector('.ig-overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = '0';
              }}
            >
              {/* Background */}
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
              }}>
                {post.emoji}
              </div>

              {/* Hover overlay */}
              <div
                className="ig-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.75)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px',
                  opacity: 0,
                  transition: 'opacity 0.25s ease',
                }}
              >
                <p style={{ fontSize: '11px', color: '#ffffff', textAlign: 'center', lineHeight: 1.4, margin: '0 0 8px 0' }}>
                  {post.caption}
                </p>
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600 }}>
                  {post.user}
                </div>
                <div style={{ fontSize: '11px', color: '#f59e0b', marginTop: '4px' }}>
                  ♥ {post.likes.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Tag us <strong style={{ color: '#111827' }}>@CONQRETE</strong> for a chance to be featured
          </p>
        </div>
      </div>
    </section>
  );
}
