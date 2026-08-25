const fs = require('fs');
const logFile = 'C:\\Users\\Jay Sonawane\\.gemini\\antigravity\\brain\\ea38b158-c04f-43f3-b77e-c7b39bbca077\\.system_generated\\logs\\transcript_full.jsonl';
const lines = fs.readFileSync(logFile, 'utf8').split('\n').filter(Boolean);

const targetFiles = [
  'app/(storefront)/account/page.tsx',
  'app/(storefront)/login/page.tsx',
  'app/(storefront)/orders/page.tsx',
  'app/(storefront)/products/productsclient.tsx',
  'app/admin/admin.css',
  'app/globals.css',
  'components/home/brand-story.tsx',
  'components/home/featured-products.tsx',
  'components/home/lightning-canvas.tsx',
  'components/home/notify-form.tsx',
  'components/layout/footer.tsx',
  'components/layout/navbar.tsx',
  'app/(storefront)/about/page.tsx'
];

let recovered = {};

// Parse backwards
for (let i = lines.length - 1; i >= 0; i--) {
  if (Object.keys(recovered).length === targetFiles.length) break;
  
  const line = lines[i];
  if (line.includes('write_to_file') || line.includes('run_command')) {
    try {
      const entry = JSON.parse(line);
      if (entry.tool_calls) {
        for (const tc of entry.tool_calls) {
           for (const tFile of targetFiles) {
              if (recovered[tFile]) continue;
              
              if (tc.name === 'write_to_file' && tc.args.TargetFile && tc.args.TargetFile.endsWith(tFile)) {
                 recovered[tFile] = tc.args.CodeContent;
              } else if (tc.name === 'run_command' && tc.args.CommandLine && tc.args.CommandLine.includes(tFile) && tc.args.CommandLine.includes('fs.writeFileSync')) {
                 const content = tc.args.CommandLine;
                 // ONLY if it's the full file replacement (meaning it defines the whole file in a variable like $code)
                 if (content.includes('$code = @\'')) {
                    const startMarker = "$code = @'";
                    const endMarker = "'@";
                    const startIdx = content.indexOf(startMarker);
                    const endIdx = content.lastIndexOf(endMarker);
                    if (startIdx > -1 && endIdx > -1) {
                       let extracted = content.substring(startIdx + startMarker.length, endIdx).trim();
                       // if it's node script doing replace, it's not the full file. 
                       // but if it's creating a new file, it might be.
                       if (!content.includes('.replace(')) {
                           // it's a full file write? Wait, what if it's just a fix script?
                           // Let's only trust write_to_file for the other files to be safe, 
                           // OR if we know they were written fully.
                       }
                    }
                 }
              }
           }
        }
      }
    } catch(e) {}
  }
}

for (const tFile of Object.keys(recovered)) {
   if (recovered[tFile] && recovered[tFile].length > 50) {
      fs.writeFileSync(tFile, recovered[tFile], 'utf8');
      console.log("Restored", tFile);
   }
}
