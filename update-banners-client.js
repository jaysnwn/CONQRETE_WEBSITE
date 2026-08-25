const fs = require('fs');
let file = fs.readFileSync('app/(storefront)/products/[slug]/productdetailclient.tsx', 'utf8');

// Update destructuring
file = file.replace(
  'const { faqs = [], banners = [], tech_section } = product.page_content || {};',
  'const { faqs = [], small_banners = [], large_banner, tech_section } = product.page_content || {};'
);

const oldBannersStr = `{/* Promotional Banners */}
        {banners.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px' }}>
             {banners.map((banner: any, i: number) => (
               <div key={i} style={{ backgroundColor: banner.bg_color || '#111827', color: banner.text_color || '#ffffff', borderRadius: '16px', padding: '40px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                 <h3 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 8px 0' }}>{banner.title}</h3>
                 <p style={{ fontSize: '14px', margin: 0, opacity: 0.8 }}>{banner.subtitle}</p>
               </div>
             ))}
          </div>
        )}`;

const newBannersStr = `{/* Small Banners */}
        {small_banners && small_banners.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px' }}>
             {small_banners.map((imgUrl: string, i: number) => (
               <div key={i} style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden' }}>
                 <Image src={imgUrl} alt={\`Banner \${i+1}\`} fill style={{ objectFit: 'cover' }} />
               </div>
             ))}
          </div>
        )}

        {/* Large Banner */}
        {large_banner && (
          <div style={{ position: 'relative', width: '100%', aspectRatio: '21/9', borderRadius: '16px', overflow: 'hidden', marginBottom: '60px' }}>
            <Image src={large_banner} alt="Large Promotional Banner" fill style={{ objectFit: 'cover' }} />
          </div>
        )}`;

if (file.includes(oldBannersStr)) {
  file = file.replace(oldBannersStr, newBannersStr);
  fs.writeFileSync('app/(storefront)/products/[slug]/productdetailclient.tsx', file);
  console.log("Replaced banners with image components");
} else {
  console.log("Could not find old banners string to replace.");
}
