const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git') walk(dirPath, callback);
    } else {
      if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.css')) {
        callback(dirPath);
      }
    }
  });
}

walk('.', function(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Revert acid green
  if (content.includes('#84a800')) {
    content = content.replace(/#84a800/gi, '#c8ff00');
    changed = true;
  }
  
  // Revert hardcoded white backgrounds
  if (content.includes("backgroundColor: '#fafafa'")) {
    content = content.replace(/backgroundColor: '#fafafa'/g, "backgroundColor: '#ffffff'");
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

// Restore globals.css specifically
let css = fs.readFileSync('app/globals.css', 'utf8');
css = css.replace('--bg: #fafafa;', '--bg: #f4f4f5;');
css = css.replace('--bg2: #f3f4f6;', '--bg2: #ffffff;');

// Add grid line variable if missing
if (!css.includes('--grid-line')) {
  css = css.replace('--muted: #888;', '--muted: #888;\n  --grid-line: rgba(0,0,0,0.05);');
}

// Add body::after if missing
if (!css.includes('body::after')) {
  css = css + `\n\n  body::after {
    content:''; position:fixed; inset:0; pointer-events:none; z-index:-1;
    background-image: linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
    background-size: 40px 40px;
  }\n`;
}

fs.writeFileSync('app/globals.css', css, 'utf8');

console.log("Reverted global color changes");
