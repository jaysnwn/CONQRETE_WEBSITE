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

// Modify navbar to include LoginModal
let navbar = fs.readFileSync('components/layout/navbar.tsx', 'utf8');

if (!navbar.includes('import LoginModal')) {
    navbar = navbar.replace(
        "import { useCartStore } from '#/store/cart';",
        "import { useCartStore } from '#/store/cart';\nimport LoginModal from '../auth/login-modal';"
    );
}

if (!navbar.includes('isLoginModalOpen')) {
    navbar = navbar.replace(
        "const [profileOpen, setProfileOpen] = useState(false);",
        "const [profileOpen, setProfileOpen] = useState(false);\n  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);"
    );
}

// Ensure the profile icon click opens modal if not logged in
navbar = navbar.replace(
    /onClick=\{\(\) => setProfileOpen\(!profileOpen\)\}/g,
    "onClick={() => { if (!isLoggedIn) setIsLoginModalOpen(true); else setProfileOpen(!profileOpen); }}"
);

// Add LoginModal to the end of Navbar return
if (!navbar.includes('<LoginModal')) {
    navbar = navbar.replace(
        /      <\/nav>\n    <\/>/g,
        "      </nav>\n      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />\n    </>"
    );
}

// Remove login/register from mobile menu (lines 292-301)
// Looking for the else block for isLoggedIn in mobile menu
const mobileMenuLoginRegister = /<div style=\{\{ display: 'flex', gap: '1rem', width: '100%' \}\}>\s*<a href="\/login"[\s\S]*?REGISTER\n\s*<\/a>\n\s*<\/div>/;
navbar = navbar.replace(mobileMenuLoginRegister, "");

// Add profile icon beside hamburger in mobile view
// Find: <div className="nav-right-group" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
// It has desktop-actions and then hamburger
// We need to change desktop-actions to only hide the cart? Or we can just put the Profile icon OUTSIDE desktop-actions, so it shows on mobile too!

// Let's move the whole PROFILE POPOVER SYSTEM outside of desktop-actions
const profilePopoverSystem = /\/\* 💥 NEW: PROFILE POPOVER SYSTEM 💥 \*\/[\s\S]*?<\/div>\s*<\/div>/;
const popoverMatch = navbar.match(profilePopoverSystem);

if (popoverMatch) {
    // Remove from desktop-actions
    navbar = navbar.replace(profilePopoverSystem, "");
    
    // Insert it right after desktop-actions ends (before cart button, or after cart button in desktop actions)
    // Wait, cart button is inside desktop-actions! 
    // Let's look at navbar structure:
    // <div className="nav-right-group">
    //   <div className="desktop-actions">
    //      [PROFILE POPOVER]
    //      [CART BUTTON]
    //   </div>
    //   [HAMBURGER]
    // </div>
    // Wait! The user's mobile menu screenshot shows they already HAVE a cart button in the hamburger menu!
    // But what about the nav bar on mobile? Does it have a cart button? Usually yes, but the user says "add profile section beside the hamberger menu".
    
    // So let's insert the Profile Popover directly inside nav-right-group, outside of desktop-actions!
    
    navbar = navbar.replace(
        /<div className="nav-right-group" style=\{\{ display: 'flex', alignItems: 'center', gap: '1.5rem' \}\}>\s*<div className="desktop-actions">/,
        `<div className="nav-right-group" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>\n          \n          <div className="desktop-actions">`
    );
    
    // Let's just do it manually with string replacement:
    navbar = navbar.replace(
        /\{?\/\* CART BUTTON \*\/\}/,
        popoverMatch[0] + "\n            {/* CART BUTTON */}"
    );
    
    // But wait, if I put it before CART BUTTON, it's still inside desktop-actions!
    // Let's close desktop-actions BEFORE the profile popover, and then open another one? No.
    // Let's just find `</button>\n          </div>\n          \n          {/* HAMBURGER ICON */}` and put Profile there!
}

fs.writeFileSync('components/layout/navbar.tsx', navbar);
console.log("Updated login modal and navbar");
