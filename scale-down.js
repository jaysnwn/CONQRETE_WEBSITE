const fs = require('fs');
let file = fs.readFileSync('components/auth/login-modal.tsx', 'utf8');

// Replace sizing and padding properties
file = file.replace(/maxWidth: '1000px'/g, "maxWidth: '850px'");
file = file.replace(/minHeight: '600px'/g, "minHeight: '480px'");
file = file.replace(/padding: '60px 40px'/g, "padding: '40px 32px'"); // for both left and right sides
file = file.replace(/fontSize: '64px'/g, "fontSize: '42px'"); // CONQRETE text
file = file.replace(/width: '180px'/g, "width: '120px'"); // Logo
file = file.replace(/marginBottom: '40px'/g, "marginBottom: '20px'");
file = file.replace(/marginTop: '40px'/g, "marginTop: '24px'");

// Fix the close button so it doesn't overlap on smaller height
file = file.replace(/top: '20px',/g, "top: '16px',");
file = file.replace(/right: '20px',/g, "right: '16px',");
file = file.replace(/fontSize: '28px',/g, "fontSize: '24px',");

fs.writeFileSync('components/auth/login-modal.tsx', file);
console.log("Scaled down the modal size.");
