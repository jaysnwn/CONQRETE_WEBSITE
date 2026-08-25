const fs = require('fs');

let about = fs.readFileSync('app/(storefront)/about/page.tsx', 'utf8');

// 1. Remove lightning useEffect and Canvas
about = about.replace(/useEffect\(\(\) => \{.*?\}, \[isDark\]\);/s, '');
about = about.replace('{/* STORM CANVAS */}', '');
about = about.replace('<canvas id="stormCanvas"></canvas>', '');
about = about.replace('<div id="lightningFlash"></div>', '');

// 2. Remove stats section
const statsStart = "{/* STATS SECTION */}";
const founderStart = "{/* FOUNDER SECTION */}";
if (about.includes(statsStart) && about.includes(founderStart)) {
  const beforeStats = about.substring(0, about.indexOf(statsStart));
  const afterStats = about.substring(about.indexOf(founderStart));
  about = beforeStats + afterStats;
}

// 3. Update CTA strip text
about = about.replace("See what we're<br /><span>building.</span>", "See what we have<br /><span>built.</span>");

// 4. Add Rhino Logo branding section before CTA strip
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

// 5. Wrap everything in a scoped style that hides the grid, sets off-white bg, and defines local acid green
about = about.replace('<>', '<div style={{ backgroundColor: \'#fafafa\', minHeight: \'100vh\', position: \'relative\', zIndex: 1, ...{ \'--acid\': \'#84a800\' } } as React.CSSProperties}>');
about = about.replace('</>', '</div>');

fs.writeFileSync('app/(storefront)/about/page.tsx', about, 'utf8');
console.log("Updated about page locally");
