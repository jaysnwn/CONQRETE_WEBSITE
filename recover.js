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
               foundDetail = content;
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
  // If it's a node script, extract the content
  if (foundDetail.includes('$code = @\'')) {
    const start = foundDetail.indexOf('$code = @\'') + 10;
    let end = foundDetail.indexOf('\'@', start);
    if (end > -1) {
       let jsCode = foundDetail.substring(start, end);
       // Now inside jsCode we might have fs.writeFileSync('...', `...`)
       const fileStart = jsCode.indexOf('`');
       const fileEnd = jsCode.lastIndexOf('`');
       if (fileStart > -1 && fileEnd > -1) {
          foundDetail = jsCode.substring(fileStart + 1, fileEnd);
       } else {
          foundDetail = jsCode; // just dump the script to look at it
       }
    }
  }
  fs.writeFileSync('found_productdetailclient.tsx', foundDetail, 'utf8');
  console.log("Recovered product detail client");
} else {
  console.log("Could not find product detail client with FAQ in transcript");
}
