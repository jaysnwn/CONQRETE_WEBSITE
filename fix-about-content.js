const fs = require('fs');

let page = fs.readFileSync('app/(storefront)/about/page.tsx', 'utf8');

// 1. Remove the dark-theme-override wrapper
page = page.replace('<div className="dark-theme-override">', '<>');
page = page.replace(/<\/div>\s*$/i, '</>');

// 2. Change lightning colors to black/dark grey for white background
page = page.replace(/const c1 = 'rgba\(200,255,0,\.5\)';/g, "const c1 = 'rgba(0,0,0,0.4)';");
page = page.replace(/const c2 = 'rgba\(200,255,0,\.8\)';/g, "const c2 = 'rgba(0,0,0,0.8)';");
page = page.replace(/const fc = 'rgba\(200,255,0,0\.08\)';/g, "const fc = 'rgba(0,0,0,0.05)';");

// 3. Remove stats section
const statsStart = "{/* STATS SECTION */}";
const founderStart = "{/* FOUNDER SECTION */}";
if (page.includes(statsStart) && page.includes(founderStart)) {
  const beforeStats = page.substring(0, page.indexOf(statsStart));
  const afterStats = page.substring(page.indexOf(founderStart));
  page = beforeStats + afterStats;
}

// 4. Change "See what we're building" to "See what we have built"
page = page.replace("See what we're<br /><span>building.</span>", "See what we have<br /><span>built.</span>");

// 5. Add Logo and Rhino Icon section before CTA strip
const ctaStart = "{/* CTA STRIP */}";
const brandSection = `      {/* BRANDING SECTION */}
      <section style={{ padding: '100px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '40px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#fafafa' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <img src="/rhino-logo.png" alt="Rhino Icon" style={{ height: '100px', objectFit: 'contain' }} />
          <div style={{ width: '4px', height: '80px', backgroundColor: '#c8ff00' }}></div>
          <img src="/logo.png?v=2" alt="CONQRETE Logo" style={{ height: '70px', objectFit: 'contain' }} />
        </div>
        <h2 style={{ fontFamily: '"Share Tech Mono", monospace', fontSize: 'clamp(18px, 4vw, 32px)', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#111827', margin: 0, textAlign: 'center', fontWeight: 900 }}>
          Built for your daily abuse
        </h2>
      </section>\n\n      `;

if (page.includes(ctaStart)) {
  page = page.replace(ctaStart, brandSection + ctaStart);
}

fs.writeFileSync('app/(storefront)/about/page.tsx', page);
console.log("Updated about page content");
