const fs = require('fs');
let loginModal = fs.readFileSync('components/auth/login-modal.tsx', 'utf8');

// Replace flex-direction row with responsive class
loginModal = loginModal.replace(
  /flexDirection: 'row',/g,
  ""
);

// Add a style block for responsive layout
loginModal = loginModal.replace(
  /return \(\n    <div style=\{\{/g,
  "return (\n    <>\n    <style>{`\n      .login-modal-content {\n        flex-direction: row;\n      }\n      @media (max-width: 768px) {\n        .login-modal-content {\n          flex-direction: column !important;\n          min-height: auto !important;\n          height: 90vh !important;\n          overflow-y: auto !important;\n        }\n        .login-modal-left {\n          flex: 0 0 auto !important;\n          border-right: none !important;\n          border-bottom: 1px solid #e5e7eb !important;\n          padding: 24px 16px !important;\n        }\n        .login-modal-right {\n          flex: 0 0 auto !important;\n          padding: 24px 16px !important;\n        }\n      }\n    `}</style>\n    <div style={{"
);

// Close the fragment at the end
loginModal = loginModal.replace(
  /    <\/div>\n  \);\n\}/g,
  "    </div>\n    </>\n  );\n}"
);

fs.writeFileSync('components/auth/login-modal.tsx', loginModal);
console.log("Login Modal made responsive!");
