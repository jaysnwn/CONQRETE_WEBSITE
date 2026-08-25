const fs = require('fs');
let file = fs.readFileSync('components/layout/navbar.tsx', 'utf8');

// Fix desktop dropdown LOGIN
file = file.replace(
  /<a href="\/login"\s*\n\s*style=\{\{ padding: '14px 16px', color: '#000', fontWeight: 900, textDecoration: 'none', borderBottom: '2px solid #000'/g,
  '<button onClick={() => { setProfileOpen(false); setIsLoginModalOpen(true); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 16px", color: "#000", fontWeight: 900, textDecoration: "none", borderBottom: "2px solid #000", border: "none", background: "transparent", cursor: "pointer"'
);

// Fix desktop dropdown REGISTER
file = file.replace(
  /<a href="\/login"\s*\n\s*style=\{\{ padding: '14px 16px', color: '#000', fontWeight: 900, textDecoration: 'none', fontSize: '12px'/g,
  '<button onClick={() => { setProfileOpen(false); setIsLoginModalOpen(true); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 16px", color: "#000", fontWeight: 900, textDecoration: "none", fontSize: "12px", border: "none", background: "transparent", cursor: "pointer"'
);

fs.writeFileSync('components/layout/navbar.tsx', file);
console.log("Fixed desktop dropdown login buttons");
