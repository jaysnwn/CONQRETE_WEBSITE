const fs = require('fs');
let content = fs.readFileSync('components/admin/product-form.tsx', 'utf8');
const search = '<label className="admin-field"><span>Image URL</span><input value={variant.image_url || \'\'} onChange={(event) => updateVariant(index, { image_url: event.target.value })} placeholder="https://..." /></label>';
const replaceStr = '<div className="admin-field admin-field--wide" style={{gridColumn: \'1 / -1\'}}><span>Variant Images (These will show first when the color is selected)</span><ImageUploader images={(variant.image_url || \'\').split(\',\').map(s => s.trim()).filter(Boolean)} onChange={(val) => { const current = (variant.image_url || \'\').split(\',\').map(s => s.trim()).filter(Boolean); const newUrls = typeof val === \'function\' ? val(current) : val; updateVariant(index, { image_url: newUrls.join(\',\') }); }} /></div>';
content = content.replace(search, replaceStr);
fs.writeFileSync('components/admin/product-form.tsx', content);
