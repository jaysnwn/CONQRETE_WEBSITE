const fs = require('fs');
let modal = fs.readFileSync('components/auth/login-modal.tsx', 'utf8');

const newStyle = `
              /* Responsive modal */
              @media (max-width: 768px) {
                .login-modal-content {
                  flex-direction: column !important;
                  max-width: 92% !important;
                  height: auto !important;
                  max-height: 90vh !important;
                  min-height: auto !important;
                  border-radius: 16px !important;
                  overflow-y: auto !important;
                }
                .login-modal-left {
                  display: flex !important;
                  flex: none !important;
                  padding: 40px 20px 20px 20px !important;
                  border-right: none !important;
                  border-bottom: 1px solid #e5e7eb;
                }
                .login-modal-right {
                  flex: none !important;
                  padding: 20px !important;
                }
              }
`;

modal = modal.replace(/\/\*\s*Responsive modal\s*\*\/[\s\S]*?\}\s*\}/, newStyle.trim());

// We also need to add 'login-modal-right' class to the right div
modal = modal.replace(/<div style=\{\{\s*flex: '0 0 50%', boxSizing: 'border-box',\s*padding: '32px 24px',\s*display: 'flex',\s*flexDirection: 'column',\s*backgroundColor: '#ffffff'\s*\}\}>/g, 
  "<div className=\"login-modal-right\" style={{ flex: '0 0 50%', boxSizing: 'border-box', padding: '32px 24px', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>");

fs.writeFileSync('components/auth/login-modal.tsx', modal);
console.log("Updated mobile modal CSS");
