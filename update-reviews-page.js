const fs = require('fs');
let file = fs.readFileSync('app/admin/reviews/page.tsx', 'utf8');

file = file.replace(
  'import ReviewStatusToggle from \'#/components/admin/review-status-toggle\';',
  "import ReviewStatusToggle from '#/components/admin/review-status-toggle';\nimport Link from 'next/link';"
);

file = file.replace(
  '<div className="admin-order-count">',
  '<Link href="/admin/reviews/new" className="admin-primary-action" style={{ alignSelf: "center", marginBottom: "16px" }}>Write Review</Link>\n        <div className="admin-order-count">'
);

// update customerName logic to fallback to reviewer_name
file = file.replace(
  'const customerName = review.customers ',
  'const customerName = review.reviewer_name || (review.customers '
);
file = file.replace(
  ': \'Guest\';',
  ': \'Guest\');'
);

fs.writeFileSync('app/admin/reviews/page.tsx', file);
console.log("Updated admin reviews page");
