const fs = require('fs');
const logFile = 'C:\\Users\\Jay Sonawane\\.gemini\\antigravity\\brain\\ea38b158-c04f-43f3-b77e-c7b39bbca077\\.system_generated\\logs\\transcript_full.jsonl';
const lines = fs.readFileSync(logFile, 'utf8').split('\n').filter(Boolean);

let foundDetail = null;

for (let i = lines.length - 1; i >= 0; i--) {
  const line = lines[i];
  if (line.includes('export default function ProductDetailClient')) {
    try {
      const entry = JSON.parse(line);
      if (entry.tool_calls) {
        for (const tc of entry.tool_calls) {
          if (tc.name === 'write_to_file' || tc.name === 'run_command') {
            const content = tc.args.CodeContent || tc.args.CommandLine;
            if (content && content.includes('export default function ProductDetailClient') && content.includes('FAQ') && !content.includes('const logFile =')) {
               
               if (tc.name === 'run_command') {
                  // extract from $code = @' ... '@
                  const startMarker = "$code = @'";
                  const endMarker = "'@";
                  const startIdx = content.indexOf(startMarker);
                  const endIdx = content.lastIndexOf(endMarker);
                  if (startIdx > -1 && endIdx > -1) {
                     foundDetail = content.substring(startIdx + startMarker.length, endIdx).trim();
                  } else {
                     foundDetail = content;
                  }
               } else {
                  foundDetail = content;
               }
               break;
            }
          }
        }
      }
    } catch(e) {}
    if (foundDetail) break;
  }
}

if (foundDetail) {
  fs.writeFileSync('app/(storefront)/products/[slug]/productdetailclient.tsx', foundDetail, 'utf8');
  console.log("Restored product detail client!");
} else {
  console.log("Could not find product detail client");
}
