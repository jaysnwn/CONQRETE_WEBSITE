const fs = require('fs');

let file = fs.readFileSync('components/layout/navbar.tsx', 'utf8');

// The file ends with:
//      </nav>
//    </>
//  );
//}
// We want to insert the LoginModal right before the closing fragment </>

file = file.replace(
  /<\/nav>\s*<\/>/,
  '</nav>\n      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />\n    </>'
);

fs.writeFileSync('components/layout/navbar.tsx', file);
console.log("Added LoginModal to navbar output.");
