const fs = require('fs');

let file = fs.readFileSync('app/(storefront)/products/productsclient.tsx', 'utf8');

// Replace the ImageCarousel div with the new pill
const searchCarousel = `          {/* Images Carousel */}
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1/1',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '16px'
          }}>
            <ImageCarousel images={product.images || []} slug={product.slug} title={product.title} />
          </div>`;

const replaceCarousel = `          {/* Images Carousel */}
          <div style={{
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
              <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#0052FF', color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px', zIndex: 10 }}>
                Save Rs. {(compareAt - price).toLocaleString('en-IN')}
              </div>
            )}
          </div>`;

file = file.replace(searchCarousel, replaceCarousel);

// Replace price colors and remove old discount text
const searchPrice = `            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              {compareAt && compareAt > price && (
                <span style={{ fontSize: '16px', color: '#9ca3af', textDecoration: 'line-through', fontWeight: 500 }}>
                  ₹{compareAt.toLocaleString('en-IN')}
                </span>
              )}
              <span style={{ fontSize: '18px', fontWeight: 600, color: '#111827' }}>
                ₹{price.toLocaleString('en-IN')}
              </span>
              {discountPercent > 0 && (
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#16a34a' }}>
                  {discountPercent}% OFF
                </span>
              )}
            </div>`;

const replacePrice = `            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#0052FF' }}>
                Rs. {price.toLocaleString('en-IN')}
              </span>
              {compareAt && compareAt > price && (
                <span style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'line-through' }}>
                  MRP: Rs. {compareAt.toLocaleString('en-IN')}
                </span>
              )}
            </div>`;

file = file.replace(searchPrice, replacePrice);

fs.writeFileSync('app/(storefront)/products/productsclient.tsx', file);
console.log("Updated productsclient.tsx");
