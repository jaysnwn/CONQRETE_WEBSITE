const fs = require('fs');

let pdc = fs.readFileSync('app/(storefront)/products/[slug]/productdetailclient.tsx', 'utf8');

// The star rating and write review button were changed to #111827 in my previous bad script.
// Let's change them back to blue.

// The Write Review button:
pdc = pdc.replace(
  /backgroundColor: '#111827', color: 'white', padding: '12px 32px', borderRadius: '4px', border: 'none', fontWeight: 600, fontSize: '14px', cursor: 'pointer'/g,
  "backgroundColor: '#0052FF', color: 'white', padding: '12px 32px', borderRadius: '4px', border: 'none', fontWeight: 600, fontSize: '14px', cursor: 'pointer'"
);

// The StarRating component
pdc = pdc.replace(
  /color: '#111827', fontSize: '18px', letterSpacing: '2px'/g,
  "color: '#0052FF', fontSize: '18px', letterSpacing: '2px'"
);

// The stars progress bars in the Customer Reviews
pdc = pdc.replace(
  /color: '#111827', width: '50px'/g,
  "color: '#0052FF', width: '50px'"
);
pdc = pdc.replace(
  /backgroundColor: '#111827' } }/g,
  "backgroundColor: '#0052FF' } }"
);

// Verified Badge
pdc = pdc.replace(
  /backgroundColor: '#111827', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }>\s*Verified\s*<\/span>/g,
  "backgroundColor: '#0052FF', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }>Verified</span>"
);

// Add to Cart Button - change to blue
pdc = pdc.replace(
  /backgroundColor: isOutOfStock \? '#e5e7eb' : '#111827'/g,
  "backgroundColor: isOutOfStock ? '#e5e7eb' : '#0052FF'"
);

// Main Price - change to blue
pdc = pdc.replace(
  /span style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}/g,
  "span style={{ fontSize: '24px', fontWeight: 700, color: '#0052FF' }}"
);

// Main Save Tag - change to blue
pdc = pdc.replace(
  /backgroundColor: '#111827', color: '#ffffff', padding: '4px 10px', borderRadius: '999px'/g,
  "backgroundColor: '#0052FF', color: '#ffffff', padding: '4px 10px', borderRadius: '999px'"
);

// Tabs active border and color
pdc = pdc.replace(
  /borderBottom: activeTab === 'tech-specs' \? '2px solid #111827' : '2px solid transparent',\s*color: activeTab === 'tech-specs' \? '#111827' : '#6b7280'/g,
  "borderBottom: activeTab === 'tech-specs' ? '2px solid #0052FF' : '2px solid transparent',\n                  color: activeTab === 'tech-specs' ? '#0052FF' : '#6b7280'"
);
pdc = pdc.replace(
  /borderBottom: activeTab === 'made-in-india' \? '2px solid #111827' : '2px solid transparent',\s*color: activeTab === 'made-in-india' \? '#111827' : '#6b7280'/g,
  "borderBottom: activeTab === 'made-in-india' ? '2px solid #0052FF' : '2px solid transparent',\n                  color: activeTab === 'made-in-india' ? '#0052FF' : '#6b7280'"
);

// Variant selection border
pdc = pdc.replace(
  /border: isActive \? '2px solid #111827' : '1px solid #e5e7eb'/g,
  "border: isActive ? '2px solid #0052FF' : '1px solid #e5e7eb'"
);

// Thumbnail active border
pdc = pdc.replace(
  /border: activeImageIdx === idx \? '2px solid #111827' : '2px solid transparent'/g,
  "border: activeImageIdx === idx ? '2px solid #0052FF' : '2px solid transparent'"
);


fs.writeFileSync('app/(storefront)/products/[slug]/productdetailclient.tsx', pdc);
console.log("Fixed productdetailclient.tsx colors to #0052FF");
