const fs = require('fs');
let file = fs.readFileSync('components/auth/login-modal.tsx', 'utf8');

// Container sizing
file = file.replace(/maxWidth: '950px'/g, "maxWidth: '750px'");
file = file.replace(/minHeight: '520px'/g, "minHeight: '400px'");

// Paddings
file = file.replace(/padding: '40px'/g, "padding: '32px 24px'");
file = file.replace(/padding: '40px 32px'/g, "padding: '32px 24px'"); // fallback
file = file.replace(/padding: '60px 40px'/g, "padding: '32px 24px'"); // fallback

// Left side scaling
file = file.replace(/width: '120px'/g, "width: '90px'"); // logo
file = file.replace(/width: '180px'/g, "width: '90px'"); // fallback logo
file = file.replace(/fontSize: '42px'/g, "fontSize: '32px'"); // CONQRETE
file = file.replace(/fontSize: '64px'/g, "fontSize: '32px'"); // fallback CONQRETE
file = file.replace(/fontSize: '12px'/g, "fontSize: '10px'"); // Tagline, checkbox, etc
file = file.replace(/marginTop: '24px'/g, "marginTop: '16px'");
file = file.replace(/marginTop: '40px'/g, "marginTop: '16px'"); // fallback
file = file.replace(/marginBottom: '20px'/g, "marginBottom: '12px'"); // logo bottom margin

// Icons scaling
file = file.replace(/width="32" height="32"/g, 'width="24" height="24"');
file = file.replace(/marginBottom: '12px'/g, "marginBottom: '8px'");
file = file.replace(/fontSize: '10px'/g, "fontSize: '9px'");

// Right side scaling
file = file.replace(/fontSize: '32px'/g, "fontSize: '24px'"); // Get Started
file = file.replace(/fontSize: '13px'/g, "fontSize: '11px'"); // Subtitle
file = file.replace(/margin: '0 0 32px 0'/g, "margin: '0 0 20px 0'");
file = file.replace(/padding: '12px 16px'/g, "padding: '10px 12px'"); // input padding
file = file.replace(/padding: '16px'/g, "padding: '12px'"); // button padding
file = file.replace(/fontSize: '14px'/g, "fontSize: '12px'"); // Button/Input text
file = file.replace(/gap: '20px'/g, "gap: '16px'"); // form gap
file = file.replace(/margin: '32px 0'/g, "margin: '20px 0'"); // OR separator

// Flex split - let's make it 50/50 so both sides have ample room at this small size
file = file.replace(/flex: '0 0 55%', boxSizing: 'border-box',/g, "flex: '0 0 50%', boxSizing: 'border-box',");
file = file.replace(/flex: '0 0 45%', boxSizing: 'border-box',/g, "flex: '0 0 50%', boxSizing: 'border-box',");

fs.writeFileSync('components/auth/login-modal.tsx', file);
console.log("Scaled down EVERYTHING");
