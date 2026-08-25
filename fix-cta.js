const fs = require('fs');

let css = fs.readFileSync('app/globals.css', 'utf8');

css = css.replace(/\.cta-strip \{ background:#111;.*?\.cta-btn:hover \{ background:#fff; \}/s, 
`.cta-strip { background:var(--acid); padding:80px 40px; display:flex; justify-content:space-between; align-items:center; gap:32px; flex-wrap:wrap; }
.cta-text { font-family:'Black Han Sans',sans-serif; font-size:clamp(28px,5vw,64px); color:#111827; text-transform:uppercase; letter-spacing:-0.01em; }
.cta-text span { color:#ffffff; -webkit-text-stroke: 1px #111827; }
.cta-btn { font-family:'Black Han Sans',sans-serif; font-size:14px; letter-spacing:0.25em; text-transform:uppercase; padding:18px 40px; background:#111827; color:var(--acid); border:none; cursor:pointer; text-decoration:none; display:inline-block; font-weight:900; }
.cta-btn:hover { background:#ffffff; color:#111827; border: 2px solid #111827; padding:16px 38px; }`);

fs.writeFileSync('app/globals.css', css, 'utf8');
