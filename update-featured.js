const fs = require('fs');
let file = fs.readFileSync('components/home/featured-products.tsx', 'utf8');

const searchCarousel = `                {/* Images Carousel */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1/1',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                }}>
                  <ImageCarousel images={product.images || []} slug={product.slug} title={product.title} />
                </div>`;

const replaceCarousel = `                {/* Images Carousel */}
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

const searchPrice = `                  {/* Price Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    {compareAt && compareAt > price && (
                      <span style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'line-through' }}>
                        ₹{compareAt.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span style={{ fontSize: '17px', fontWeight: 700, color: '#111827' }}>
                      ₹{price.toLocaleString('en-IN')}
                    </span>
                    {discountPct > 0 && (
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#16a34a' }}>
                        {discountPct}% OFF
                      </span>
                    )}
                  </div>`;

const replacePrice = `                  {/* Price Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '17px', fontWeight: 700, color: '#0052FF' }}>
                      Rs. {price.toLocaleString('en-IN')}
                    </span>
                    {compareAt && compareAt > price && (
                      <span style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'line-through' }}>
                        MRP: Rs. {compareAt.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>`;

file = file.replace(searchPrice, replacePrice);

// Update Shop Now button
file = file.replace(/backgroundColor: '#111827'/g, "backgroundColor: '#0052FF'");

fs.writeFileSync('components/home/featured-products.tsx', file);
console.log("Updated featured-products.tsx");
