const path=require("path");const {chromium}=require("playwright");
const mark = (color, size = 120) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 150" width="${size}" height="${size * 1.25}" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round">
  <path d="M10 146 V60 A50 50 0 0 1 110 60 V146" stroke-width="5"/>
  <path d="M22 146 V62 A38 38 0 0 1 98 62 V146" stroke-width="2"/>
  <line x1="60" y1="44" x2="60" y2="122" stroke-width="4"/>
  <circle cx="60" cy="40" r="4" fill="${color}" stroke="none"/>
  <line x1="34" y1="58" x2="86" y2="58" stroke-width="4"/>
  <line x1="34" y1="58" x2="26" y2="84" stroke-width="2"/><line x1="34" y1="58" x2="42" y2="84" stroke-width="2"/>
  <path d="M22 84 Q34 98 46 84 Z" fill="${color}" stroke-width="2"/>
  <line x1="86" y1="58" x2="78" y2="84" stroke-width="2"/><line x1="86" y1="58" x2="94" y2="84" stroke-width="2"/>
  <path d="M74 84 Q86 98 98 84 Z" fill="${color}" stroke-width="2"/>
  <path d="M46 122 H74" stroke-width="4"/><path d="M40 130 H80" stroke-width="4"/>
</svg>`;
const G="#c9a35a";
const html=`<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Montserrat:wght@600&display=swap" rel="stylesheet">
<style>*{margin:0}body{width:800px;height:800px;background:#121317;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#f4efe4}
.n{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:118px;line-height:1;margin-top:36px}
.s{font-family:Montserrat;font-weight:600;font-size:34px;letter-spacing:.32em;color:${G};margin-top:18px;padding-left:.32em}</style></head>
<body>${mark(G,230)}<div class="n">Elkhalfi</div><div class="s">ADVOCATES</div></body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:800,height:800},deviceScaleFactor:1.5});
await p.setContent(html,{waitUntil:"networkidle"});await p.evaluate(()=>document.fonts.ready);
await p.screenshot({path:path.join(__dirname,"logo-square-linkedin.png")});await b.close();})();
