const fs = require('fs');
let file = fs.readFileSync('components/layout/navbar.tsx', 'utf8');

// Find the profile popover logic
const popoverMatch = file.match(/<\!\-\- \ud83d\udca5 NEW: PROFILE POPOVER SYSTEM \ud83d\udca5 \-\->([\s\S]*?)<\/div>/i);
if (popoverMatch) {
    console.log("PROFILE POPOVER:\n", popoverMatch[1]);
} else {
    console.log("Could not find profile popover.");
}
