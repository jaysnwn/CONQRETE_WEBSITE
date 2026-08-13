const testimonials = [
  {
    name: 'Arjun Mehta',
    location: 'Mumbai',
    rating: 5,
    text: "The CONQRETE power bank is an absolute beast. My phone went from 0 to 100% in under 45 minutes. Build quality feels premium, no cheap plastic.",
    product: 'Titan 20000mAh Power Bank',
    verified: true,
  },
  {
    name: 'Priya Sharma',
    location: 'Bangalore',
    rating: 5,
    text: "Finally a cable that doesn't break after 2 weeks! The braided nylon sleeve feels so solid and the charging speed is noticeably faster than my old one.",
    product: 'Pro Type-C Cable 240W',
    verified: true,
  },
  {
    name: 'Rohan Patel',
    location: 'Ahmedabad',
    rating: 5,
    text: "Got the GaN 65W adapter — it replaced 3 chargers on my desk. Powers my laptop, phone and earbuds simultaneously. Total game changer.",
    product: '65W GaN Pro Adapter',
    verified: true,
  },
  {
    name: 'Sneha Kapoor',
    location: 'Delhi',
    rating: 5,
    text: "Super fast delivery and very well packaged. The adapter looks really clean and sleek. I was worried about quality but it is genuinely impressive.",
    product: '45W Compact Adapter',
    verified: true,
  },
  {
    name: 'Vikram Nair',
    location: 'Hyderabad',
    rating: 5,
    text: "Ordered the power bank for a trek and it saved us. Three people charged their phones twice. Zero overheating issues in the sun. Highly recommend!",
    product: 'Titan 20000mAh Power Bank',
    verified: true,
  },
];

export default function Testimonials() {
  return (
    <section style={{
      padding: '64px 24px',
      backgroundColor: '#ffffff',
      fontFamily: 'system-ui, sans-serif',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px 0' }}>
            What customers say
          </p>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: '0 0 8px 0' }}>
            Trusted by thousands
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#f59e0b', fontSize: '15px' }}>
            ★★★★★ <span style={{ color: '#4b5563', fontSize: '14px' }}>4.9 average across 500+ reviews</span>
          </div>
        </div>

        {/* Scrollable row */}
        <div style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          paddingBottom: '16px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: '24px',
        }}>
          {testimonials.map((review) => (
            <div
              key={review.name}
              style={{
                minWidth: '300px',
                maxWidth: '300px',
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                flexShrink: 0,
                scrollSnapAlign: 'start',
              }}
            >
              {/* Stars */}
              <div style={{ color: '#f59e0b', fontSize: '16px' }}>
                {'★'.repeat(review.rating)}
              </div>

              {/* Quote */}
              <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.6, margin: 0, flex: 1 }}>
                "{review.text}"
              </p>

              {/* Product tag */}
              <div style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#6b7280',
                backgroundColor: '#e5e7eb',
                padding: '4px 8px',
                borderRadius: '4px',
                display: 'inline-block',
                alignSelf: 'flex-start',
              }}>
                {review.product}
              </div>

              {/* Author */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>{review.name}</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>{review.location}</div>
                </div>
                {review.verified && (
                  <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                    ✓ Verified
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        section div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
