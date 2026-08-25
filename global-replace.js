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

  if (content.includes('#c8ff00')) {
    content = content.replace(/#c8ff00/gi, '#84a800');
    changed = true;
  }
  
  if (content.includes("backgroundColor: '#ffffff'")) {
    content = content.replace(/backgroundColor: '#ffffff'/g, "backgroundColor: '#fafafa'");
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log("Global replacements done");
