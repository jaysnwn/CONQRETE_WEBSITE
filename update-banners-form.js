const fs = require('fs');
let file = fs.readFileSync('components/admin/product-form.tsx', 'utf8');

// Replace the Promotional Banners text section with Image Uploaders
const oldBannersStr = `<div style={{marginTop: '24px', padding: '16px', border: '1px solid var(--admin-border)', borderRadius: '8px'}}>
        <h3>Promotional Banners</h3>
        {(pageContent.banners || []).map((banner: any, i: number) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px', paddingBottom: '12px', borderBottom: '1px solid #f3f4f6' }}>
            <input value={banner.title} onChange={e => setPageContent({ ...pageContent, banners: pageContent.banners.map((b: any, j: number) => i === j ? { ...b, title: e.target.value } : b) })} placeholder="Banner Title (e.g. Smallest 65W)" style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--admin-border)' }} />
            <input value={banner.subtitle} onChange={e => setPageContent({ ...pageContent, banners: pageContent.banners.map((b: any, j: number) => i === j ? { ...b, subtitle: e.target.value } : b) })} placeholder="Subtitle (e.g. Fast GaN Charger)" style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--admin-border)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px' }}>Background:</span>
              <input type="color" value={banner.bg_color || '#111827'} onChange={e => setPageContent({ ...pageContent, banners: pageContent.banners.map((b: any, j: number) => i === j ? { ...b, bg_color: e.target.value } : b) })} style={{ height: '32px' }} title="Background Color" />
              <span style={{ fontSize: '13px', marginLeft: '16px' }}>Text:</span>
              <input type="color" value={banner.text_color || '#ffffff'} onChange={e => setPageContent({ ...pageContent, banners: pageContent.banners.map((b: any, j: number) => i === j ? { ...b, text_color: e.target.value } : b) })} style={{ height: '32px' }} title="Text Color" />
            </div>
            <button type="button" onClick={() => setPageContent({ ...pageContent, banners: pageContent.banners.filter((_: any, j: number) => i !== j) })} style={{ alignSelf: 'flex-start', color: '#ff4d4f', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px' }}>Remove Banner</button>
          </div>
        ))}
        <button type="button" onClick={() => setPageContent({ ...pageContent, banners: [...(pageContent.banners || []), { title: '', subtitle: '', bg_color: '#111827', text_color: '#ffffff' }] })} className="admin-secondary-action" style={{ marginTop: '12px' }}>+ Add Banner</button>
      </div>`;

const newBannersStr = `<div style={{marginTop: '24px', padding: '16px', border: '1px solid var(--admin-border)', borderRadius: '8px'}}>
        <h3>Small Banners (Grid)</h3>
        <p style={{fontSize: '13px', color: '#6b7280', marginBottom: '12px'}}>Upload images to display in a 2-column grid.</p>
        <ImageUploader 
          images={pageContent.small_banners || []} 
          onChange={(val) => {
            const newUrls = typeof val === 'function' ? val(pageContent.small_banners || []) : val;
            setPageContent({ ...pageContent, small_banners: newUrls });
          }} 
        />
      </div>

      <div style={{marginTop: '24px', padding: '16px', border: '1px solid var(--admin-border)', borderRadius: '8px'}}>
        <h3>Large Full-Width Banner</h3>
        <p style={{fontSize: '13px', color: '#6b7280', marginBottom: '12px'}}>Upload a single wide image.</p>
        <ImageUploader 
          images={pageContent.large_banner ? [pageContent.large_banner] : []} 
          onChange={(val) => {
            const newUrls = typeof val === 'function' ? val(pageContent.large_banner ? [pageContent.large_banner] : []) : val;
            setPageContent({ ...pageContent, large_banner: newUrls[0] || '' });
          }} 
        />
      </div>`;

if (file.includes(oldBannersStr)) {
  file = file.replace(oldBannersStr, newBannersStr);
  fs.writeFileSync('components/admin/product-form.tsx', file);
  console.log("Replaced banners with image uploaders");
} else {
  console.log("Could not find old banners string to replace.");
}
