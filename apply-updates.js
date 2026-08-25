const fs = require('fs');

// 1. UPDATE ABOUT PAGE
let about = fs.readFileSync('app/(storefront)/about/page.tsx', 'utf8');

// Remove lightning useEffect and Canvas
about = about.replace(/useEffect\(\(\) => \{.*?\}, \[isDark\]\);/s, '');
about = about.replace('{/* STORM CANVAS */}', '');
about = about.replace('<canvas id="stormCanvas"></canvas>', '');
about = about.replace('<div id="lightningFlash"></div>', '');

// Remove stats section
const statsStart = "{/* STATS SECTION */}";
const founderStart = "{/* FOUNDER SECTION */}";
if (about.includes(statsStart) && about.includes(founderStart)) {
  const beforeStats = about.substring(0, about.indexOf(statsStart));
  const afterStats = about.substring(about.indexOf(founderStart));
  about = beforeStats + afterStats;
}

// Update CTA strip
about = about.replace("See what we're<br /><span>building.</span>", "See what we have<br /><span>built.</span>");

// Add Rhino Logo branding section before CTA strip
const ctaStart = "{/* CTA STRIP */}";
const brandSection = `      {/* BRANDING SECTION */}
      <section style={{ padding: '100px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '40px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#fafafa' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <img src="/rhino-logo.png" alt="Rhino Icon" style={{ height: '100px', objectFit: 'contain' }} />
          <div style={{ width: '4px', height: '80px', backgroundColor: '#84a800' }}></div>
          <img src="/logo.png?v=2" alt="CONQRETE Logo" style={{ height: '70px', objectFit: 'contain' }} />
        </div>
        <h2 style={{ fontFamily: '"Share Tech Mono", monospace', fontSize: 'clamp(18px, 4vw, 32px)', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#111827', margin: 0, textAlign: 'center', fontWeight: 900 }}>
          Built for your daily abuse
        </h2>
      </section>\n\n      `;

if (about.includes(ctaStart)) {
  about = about.replace(ctaStart, brandSection + ctaStart);
}

fs.writeFileSync('app/(storefront)/about/page.tsx', about, 'utf8');

// 2. UPDATE GLOBALS.CSS
let css = fs.readFileSync('app/globals.css', 'utf8');

// Remove checkered background (checks)
css = css.replace(/body::after \{.*?\}/s, '');
css = css.replace(/--grid-line:.*?;/g, '');

// Apply Off-White Background and Darker Acid Green globally
css = css.replace(/--bg: #f4f4f5;/g, '--bg: #fafafa;');
css = css.replace(/--bg2: #ffffff;/g, '--bg2: #f3f4f6;');
css = css.replace(/--acid: #c8ff00;/g, '--acid: #84a800;');
css = css.replace(/--acid: #d8ff3e;/g, '--acid: #84a800;');

// Update CTA strip styles
css = css.replace(/\.cta-strip \{ background:#111;.*?\.cta-btn:hover \{ background:#fff; \}/s, 
`.cta-strip { background:var(--acid); padding:80px 40px; display:flex; justify-content:space-between; align-items:center; gap:32px; flex-wrap:wrap; }
  .cta-text { font-family:'Black Han Sans',sans-serif; font-size:clamp(28px,5vw,64px); color:#111827; text-transform:uppercase; letter-spacing:-0.01em; }
  .cta-text span { color:#ffffff; -webkit-text-stroke: 1px #111827; }
  .cta-btn { font-family:'Black Han Sans',sans-serif; font-size:14px; letter-spacing:0.25em; text-transform:uppercase; padding:18px 40px; background:#111827; color:var(--acid); border:none; cursor:pointer; text-decoration:none; display:inline-block; font-weight:900; }
  .cta-btn:hover { background:#ffffff; color:#111827; border: 2px solid #111827; padding:16px 38px; }`);

fs.writeFileSync('app/globals.css', css, 'utf8');

console.log("Updated About page and Globals CSS");
