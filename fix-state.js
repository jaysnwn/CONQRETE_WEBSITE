const fs = require('fs');
let file = fs.readFileSync('components/admin/product-form.tsx', 'utf8');

// Fix small_banners
file = file.replace(
  `onChange={(val) => {
            const newUrls = typeof val === 'function' ? val(pageContent.small_banners || []) : val;
            setPageContent({ ...pageContent, small_banners: newUrls });
          }}`,
  `onChange={(val) => {
            setPageContent((prev: any) => {
              const newUrls = typeof val === 'function' ? val(prev.small_banners || []) : val;
              return { ...prev, small_banners: newUrls };
            });
          }}`
);

// Fix large_banner
file = file.replace(
  `onChange={(val) => {
            const newUrls = typeof val === 'function' ? val(pageContent.large_banner ? [pageContent.large_banner] : []) : val;
            setPageContent({ ...pageContent, large_banner: newUrls[0] || '' });
          }}`,
  `onChange={(val) => {
            setPageContent((prev: any) => {
              const newUrls = typeof val === 'function' ? val(prev.large_banner ? [prev.large_banner] : []) : val;
              return { ...prev, large_banner: newUrls[0] || '' };
            });
          }}`
);

fs.writeFileSync('components/admin/product-form.tsx', file);
console.log("Fixed state closure bug");
