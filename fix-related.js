const fs = require('fs');

let file = fs.readFileSync('app/(storefront)/products/[slug]/productdetailclient.tsx', 'utf8');

// Add ImageCarousel and useRouter if missing
if (!file.includes('ImageCarousel')) {
  file = file.replace('import { useCartStore } from \'#/store/cart\';', 'import { useCartStore } from \'#/store/cart\';\nimport ImageCarousel from \'#/components/ui/image-carousel\';');
}
if (!file.includes('useRouter')) {
  file = file.replace('import { useState } from \'react\';', 'import { useState } from \'react\';\nimport { useRouter } from \'next/navigation\';');
}

// Add router to component
if (!file.includes('const router = useRouter();')) {
  file = file.replace('const [activeTab, setActiveTab] = useState(\'tech-specs\');', 'const [activeTab, setActiveTab] = useState(\'tech-specs\');\n  const router = useRouter();');
}

// Replace the relatedProducts mapping logic with the new ProductCard logic
const oldMappingStart = file.indexOf('<Link key={relProduct.id}');
const oldMappingEnd = file.indexOf('</Link>', oldMappingStart) + 7;

if (oldMappingStart > -1 && oldMappingEnd > -1) {
   const newMapping = `
                  <div 
                    key={relProduct.id} 
                    onClick={() => router.push(\`/products/\${relProduct.slug}\`)}
                    style={{ 
                      cursor: 'pointer',
                      display: 'flex', 
                      flexDirection: 'column', 
                      minWidth: '280px', 
                      flexShrink: 0,
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      padding: '12px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                      border: '1px solid #f3f4f6',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
                    }}
                  >
                    {/* Images Carousel */}
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '1/1',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      marginBottom: '16px'
                    }}>
                      <ImageCarousel images={relProduct.images || []} slug={relProduct.slug} title={relProduct.title} />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', padding: '0 4px' }}>
                      
                      {/* Mock Stars */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', color: '#f59e0b', fontSize: '14px' }}>
                          ★★★★★
                        </div>
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>(5)</span>
                      </div>
            
                      <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '0 0 8px 0', lineHeight: 1.2 }}>
                        {relProduct.title}
                      </h3>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        {relProduct.compare_at_price && relProduct.compare_at_price > relProduct.price && (
                          <span style={{ fontSize: '16px', color: '#9ca3af', textDecoration: 'line-through', fontWeight: 500 }}>
                            ₹{relProduct.compare_at_price.toLocaleString('en-IN')}
                          </span>
                        )}
                        <span style={{ fontSize: '18px', fontWeight: 600, color: '#111827' }}>
                          ₹{relProduct.price.toLocaleString('en-IN')}
                        </span>
                        {relProduct.compare_at_price && relProduct.compare_at_price > relProduct.price && (
                          <span style={{ fontSize: '14px', fontWeight: 600, color: '#16a34a' }}>
                            {Math.round(((relProduct.compare_at_price - relProduct.price) / relProduct.compare_at_price) * 100)}% OFF
                          </span>
                        )}
                      </div>
            
                      {Array.isArray(relProduct.tags) && relProduct.tags.length > 0 && (
                        <div style={{ fontSize: '13px', color: '#4b5563', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {relProduct.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              {tag}
                              {index === 0 && relProduct.tags.length > 1 && <span style={{ color: '#000', fontWeight: 600 }}>|</span>}
                            </span>
                          ))}
                        </div>
                      )}
            
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const mainVariant = relProduct.variants?.[0];
                          const isOutOfStock = !mainVariant || (mainVariant.stock_quantity ?? 0) <= 0;
                          if (isOutOfStock) return;
                          
                          useCartStore.getState().addItem({
                            variantId: mainVariant.id,
                            productId: relProduct.id,
                            title: relProduct.title,
                            price: mainVariant.price,
                            image: mainVariant.image_url || relProduct.images?.[0] || null,
                            color: mainVariant.color,
                            capacity: mainVariant.capacity,
                            quantity: 1
                          });
                        }}
                        disabled={!relProduct.variants?.[0] || (relProduct.variants[0].stock_quantity ?? 0) <= 0}
                        style={{
                          marginTop: '16px',
                          width: '100%',
                          backgroundColor: (!relProduct.variants?.[0] || (relProduct.variants[0].stock_quantity ?? 0) <= 0) ? '#f3f4f6' : '#111827',
                          color: (!relProduct.variants?.[0] || (relProduct.variants[0].stock_quantity ?? 0) <= 0) ? '#9ca3af' : '#ffffff',
                          border: 'none',
                          padding: '12px',
                          borderRadius: '8px',
                          fontWeight: 600,
                          fontSize: '14px',
                          cursor: (!relProduct.variants?.[0] || (relProduct.variants[0].stock_quantity ?? 0) <= 0) ? 'not-allowed' : 'pointer',
                          transition: 'background-color 0.2s ease',
                          textAlign: 'center'
                        }}
                        onMouseEnter={(e) => {
                          if (relProduct.variants?.[0] && (relProduct.variants[0].stock_quantity ?? 0) > 0) {
                            e.currentTarget.style.backgroundColor = '#000000';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (relProduct.variants?.[0] && (relProduct.variants[0].stock_quantity ?? 0) > 0) {
                            e.currentTarget.style.backgroundColor = '#111827';
                          }
                        }}
                      >
                        {(!relProduct.variants?.[0] || (relProduct.variants[0].stock_quantity ?? 0) <= 0) ? 'Sold out' : 'Add to cart'}
                      </button>
                    </div>
                  </div>
   `;
   
   file = file.substring(0, oldMappingStart) + newMapping.trim() + file.substring(oldMappingEnd);
}

fs.writeFileSync('app/(storefront)/products/[slug]/productdetailclient.tsx', file, 'utf8');
console.log('Done');
