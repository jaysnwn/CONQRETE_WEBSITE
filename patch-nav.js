const fs = require('fs');

let navbar = fs.readFileSync('components/layout/navbar.tsx', 'utf8');

// 1. Add LoginModal import
if (!navbar.includes('import LoginModal')) {
    navbar = navbar.replace(
        "import { useCartStore } from '#/store/cart';",
        "import { useCartStore } from '#/store/cart';\nimport LoginModal from '../auth/login-modal';"
    );
}

// 2. Add isLoginModalOpen state
if (!navbar.includes('isLoginModalOpen')) {
    navbar = navbar.replace(
        "const [profileOpen, setProfileOpen] = useState(false); // NEW: State for the popup window",
        "const [profileOpen, setProfileOpen] = useState(false);\n  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);"
    );
}

// 3. Render LoginModal at the end
if (!navbar.includes('<LoginModal')) {
    navbar = navbar.replace(
        /      <\/nav>\n    <\/>/g,
        "      </nav>\n      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />\n    </>"
    );
}

// 4. On desktop profile icon, trigger modal if not logged in
navbar = navbar.replace(
    /onClick=\{\(\) => setProfileOpen\(!profileOpen\)\}/g,
    "onClick={() => { if (!isLoggedIn) setIsLoginModalOpen(true); else setProfileOpen(!profileOpen); }}"
);

// 5. Remove Login/Register from mobile menu
const mobileMenuLoginRegister = /<div style=\{\{ display: 'flex', gap: '1rem', width: '100%' \}\}>\s*<a href="\/login"[\s\S]*?REGISTER\s*<\/a>\s*<\/div>/;
navbar = navbar.replace(mobileMenuLoginRegister, "");

// 6. Add Profile icon beside hamburger menu
// Find the hamburger icon and insert the mobile profile icon before it.
// The hamburger icon is:
//           {/* HAMBURGER ICON */}
//           <button 
//             className={`hamburger-wrapper ${menuOpen ? 'open' : ''}`}

const hamburgerRegex = /\s*\{\/\* HAMBURGER ICON \*\/\}\s*<button\s*className=\{\`hamburger-wrapper \$\{menuOpen \? 'open' : ''\}\`\}/;

const mobileProfileIcon = `
          {/* MOBILE PROFILE ICON */}
          <button 
            className="mobile-profile-btn"
            onClick={() => { if (!isLoggedIn) setIsLoginModalOpen(true); else window.location.href = '/account'; }}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', display: 'none' }}
          >
            <ProfileIcon />
          </button>
`;

navbar = navbar.replace(hamburgerRegex, (match) => mobileProfileIcon + match);

// 7. Make mobile-profile-btn visible on mobile using CSS
navbar = navbar.replace(
    /\.hamburger-wrapper \{ display: flex !important; \}/g,
    ".hamburger-wrapper { display: flex !important; }\n          .mobile-profile-btn { display: flex !important; }"
);

fs.writeFileSync('components/layout/navbar.tsx', navbar);
console.log("Navbar updated!");
