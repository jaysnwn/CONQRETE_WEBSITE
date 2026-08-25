const fs = require('fs');
let file = fs.readFileSync('components/admin/product-form.tsx', 'utf8');

const interfaceProduct = 'interface Product {';
const interfaceProductReplace = 'interface Product { page_content?: any; ';
file = file.replace(interfaceProduct, interfaceProductReplace);

const stateInit = 'const [variants, setVariants] = useState<VariantInput[]>(product?.variants?.length ? product.variants : [blankVariant()]);';
const stateInitReplace = stateInit + '\n  const [pageContent, setPageContent] = useState<any>(product?.page_content || { faqs: [], banners: [], tech_section: { title: "", content: "" } });';
file = file.replace(stateInit, stateInitReplace);

const payloadDef = 'seo_description: seoDescription,';
const payloadDefReplace = 'seo_description: seoDescription, page_content: pageContent,';
file = file.replace(payloadDef, payloadDefReplace);

const newSection = `
    <section className="admin-form-card">
      <div className="admin-form-card-heading">
        <span className="admin-form-step">04</span>
        <div><h2>Page Builder</h2><p>Customise dynamic sections like FAQs and Banners.</p></div>
      </div>
      
      <div style={{marginTop: '24px', padding: '16px', border: '1px solid var(--admin-border)', borderRadius: '8px'}}>
        <h3>FAQs</h3>
        {(pageContent.faqs || []).map((faq: any, i: number) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px', paddingBottom: '12px', borderBottom: '1px solid #f3f4f6' }}>
            <input value={faq.q} onChange={e => setPageContent({ ...pageContent, faqs: pageContent.faqs.map((f: any, j: number) => i === j ? { ...f, q: e.target.value } : f) })} placeholder="Question" style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--admin-border)' }} />
            <textarea value={faq.a} onChange={e => setPageContent({ ...pageContent, faqs: pageContent.faqs.map((f: any, j: number) => i === j ? { ...f, a: e.target.value } : f) })} placeholder="Answer" rows={2} style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--admin-border)' }} />
            <button type="button" onClick={() => setPageContent({ ...pageContent, faqs: pageContent.faqs.filter((_: any, j: number) => i !== j) })} style={{ alignSelf: 'flex-start', color: '#ff4d4f', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px' }}>Remove FAQ</button>
          </div>
        ))}
        <button type="button" onClick={() => setPageContent({ ...pageContent, faqs: [...(pageContent.faqs || []), { q: '', a: '' }] })} className="admin-secondary-action" style={{ marginTop: '12px' }}>+ Add FAQ</button>
      </div>

      <div style={{marginTop: '24px', padding: '16px', border: '1px solid var(--admin-border)', borderRadius: '8px'}}>
        <h3>About the Tech Section</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
          <input value={pageContent.tech_section?.title || ''} onChange={e => setPageContent({ ...pageContent, tech_section: { ...pageContent.tech_section, title: e.target.value } })} placeholder="Title (e.g. AVS Fast Charging)" style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--admin-border)' }} />
          <textarea value={pageContent.tech_section?.content || ''} onChange={e => setPageContent({ ...pageContent, tech_section: { ...pageContent.tech_section, content: e.target.value } })} placeholder="Paragraph content" rows={4} style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--admin-border)' }} />
        </div>
      </div>

      <div style={{marginTop: '24px', padding: '16px', border: '1px solid var(--admin-border)', borderRadius: '8px'}}>
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
      </div>
    </section>
`;

const target = '{error && <div className="admin-notice admin-notice--error">{error}</div>}';
file = file.replace(target, newSection + '\n    ' + target);

fs.writeFileSync('components/admin/product-form.tsx', file);
console.log('Updated Form');
