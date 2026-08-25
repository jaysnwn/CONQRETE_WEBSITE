const fs = require('fs');

const logFile = 'C:\\Users\\Jay Sonawane\\.gemini\\antigravity\\brain\\ea38b158-c04f-43f3-b77e-c7b39bbca077\\.system_generated\\logs\\transcript_full.jsonl';
const lines = fs.readFileSync(logFile, 'utf8').split('\n').filter(Boolean);

let productClientMatch = null;
let productDetailMatch = null;

for (let i = lines.length - 1; i >= 0; i--) {
  const line = lines[i];
  
  if (line.includes('write_to_file') || line.includes('run_command')) {
    try {
      const entry = JSON.parse(line);
      if (entry.tool_calls) {
        for (const tc of entry.tool_calls) {
          if (tc.name === 'write_to_file') {
            if (tc.args.TargetFile && tc.args.TargetFile.includes('productdetailclient.tsx')) {
               if (!productDetailMatch) productDetailMatch = tc.args.CodeContent;
            }
            if (tc.args.TargetFile && tc.args.TargetFile.includes('productsclient.tsx')) {
               if (!productClientMatch) productClientMatch = tc.args.CodeContent;
            }
          }
          if (tc.name === 'run_command' && tc.args.CommandLine) {
             const cmd = tc.args.CommandLine;
             if (cmd.includes('fs.writeFileSync') && cmd.includes('productdetailclient.tsx') && cmd.includes('export default function')) {
                if (!productDetailMatch) productDetailMatch = cmd;
             }
          }
        }
      }
    } catch(e) {}
  }
}

if (productDetailMatch) {
  fs.writeFileSync('found_productdetailclient.txt', productDetailMatch, 'utf8');
  console.log("Found productdetailclient in transcript!");
}
if (productClientMatch) {
  fs.writeFileSync('found_productsclient.txt', productClientMatch, 'utf8');
  console.log("Found productsclient in transcript!");
}
