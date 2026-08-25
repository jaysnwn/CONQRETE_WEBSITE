const fs = require('fs');

let file = fs.readFileSync('components/layout/navbar.tsx', 'utf8');

// Import LoginModal
if (!file.includes('import LoginModal')) {
  file = file.replace(
    /import Link from 'next\/link';/,
    "import Link from 'next/link';\nimport LoginModal from '#/components/auth/login-modal';"
  );
}

// Add state for login modal
if (!file.includes('isLoginModalOpen')) {
  file = file.replace(
    /const \[profileOpen, setProfileOpen\] = useState\(false\);/,
    "const [profileOpen, setProfileOpen] = useState(false);\n  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);"
  );
}

// Render LoginModal at the end of Navbar
if (!file.includes('<LoginModal')) {
  file = file.replace(
    /<\/nav>\n\s*<\/>/,
    "</nav>\n      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />\n    </>"
  );
}

// Fix desktop Profile Icon Click
// We need to change the onClick of the profile icon to open modal if not logged in.
file = file.replace(
  /onClick=\{\(\) => setProfileOpen\(!profileOpen\)\}/g,
  "onClick={() => { if (isLoggedIn) { setProfileOpen(!profileOpen); } else { setIsLoginModalOpen(true); } }}"
);

// Fix the desktop dropdown to only show if logged in, since unauthenticated users see the modal now.
// Before: {profileOpen && ( ... {isLoggedIn ? (...) : (...)} ... )}
// We can just remove the !isLoggedIn branch in the desktop dropdown, or just let it be since profileOpen will only be true if isLoggedIn.

// Let's remove the <form action="/api/auth/logout"> and use signOut server action directly, or just fetch /api/auth/logout and refresh.
// Actually, using a regular button with onClick that calls router.refresh() after fetching is easiest.
// Wait, we can just change the logout button in both desktop and mobile menus to use a simple form submit but prevent default if we want, or just leave it as form. 
// Why was it not working? 
// Because the form action doesn't automatically refresh the client-side router cache if it redirects. 
// A better way: import { signOut } from '#/features/auth/actions' and use it.
if (!file.includes('signOut')) {
    file = file.replace(
      /import Link from 'next\/link';/,
      "import Link from 'next/link';\nimport { signOut } from '#/features/auth/actions';"
    );
}

// Replace the desktop logout form
file = file.replace(
  /<form action="\/api\/auth\/logout" method="POST" style=\{\{ margin: 0 \}\}>/g,
  '<form action={signOut} style={{ margin: 0 }}>'
);

// Replace the mobile logout form
file = file.replace(
  /<form action="\/api\/auth\/logout" method="POST" style=\{\{ margin: 0, width: '100%' \}\}>/g,
  '<form action={signOut} style={{ margin: 0, width: "100%" }}>'
);


fs.writeFileSync('components/layout/navbar.tsx', file);
console.log("Navbar updated with LoginModal and fixed Logout action");
