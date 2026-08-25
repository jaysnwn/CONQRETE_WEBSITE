const fs = require('fs');

// 1. Fix actions.ts redirect
let actions = fs.readFileSync('features/auth/actions.ts', 'utf8');
actions = actions.replace(/redirect\('\/login'\);/g, "redirect('/');");
fs.writeFileSync('features/auth/actions.ts', actions);
console.log("Updated actions.ts");

// 2. Update navbar.tsx for client-side robust logout
let navbar = fs.readFileSync('components/layout/navbar.tsx', 'utf8');

if (!navbar.includes('createClient')) {
  navbar = navbar.replace(
    /import \{ signOut \} from '#\/features\/auth\/actions';/,
    "import { createClient } from '#/utils/supabase/client';"
  );
}

const logoutHandler = `
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  };
`;

if (!navbar.includes('handleLogout')) {
  navbar = navbar.replace(
    /export default function Navbar\(\{ isLoggedIn = false \}: \{ isLoggedIn\?: boolean \}\) \{/,
    "export default function Navbar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {\n" + logoutHandler
  );
}

// Replace forms with the handler
navbar = navbar.replace(
  /<form action=\{signOut\} style=\{\{ margin: 0 \}\}>/g,
  '<form onSubmit={handleLogout} style={{ margin: 0 }}>'
);
navbar = navbar.replace(
  /<form action=\{signOut\} style=\{\{ margin: 0, width: "100%" \}\}>/g,
  '<form onSubmit={handleLogout} style={{ margin: 0, width: "100%" }}>'
);

fs.writeFileSync('components/layout/navbar.tsx', navbar);
console.log("Updated navbar.tsx");
