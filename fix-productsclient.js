const fs = require('fs');
let file = fs.readFileSync('app/(storefront)/products/productsclient.tsx', 'utf8');

file = file.replace(
  /<div style={{[\s\S]*?position: 'relative',[\s\S]*?aspectRatio: '1\/1',[\s\S]*?borderRadius: '12px',[\s\S]*?overflow: 'hidden',[\s\S]*?marginBottom: '16px'\s*}}>\s*<ImageCarousel images={product.images \|\| \[\]} slug={product.slug} title={product.title} \/>\s*<\/div>/g,
  `<div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1/1',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '16px',
            backgroundColor: '#f9fafb'
          }}>
            <ImageCarousel images={product.images || []} slug={product.slug} title={product.title} />
            {compareAt && compareAt > price && (
              <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#c8ff00', color: '#111827', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px', zIndex: 10 }}>
                Save Rs. {(compareAt - price).toLocaleString('en-IN')}
              </div>
            )}
          </div>`
);

fs.writeFileSync('app/(storefront)/products/productsclient.tsx', file);
console.log("Updated productsclient.tsx with acid yellow pill");
