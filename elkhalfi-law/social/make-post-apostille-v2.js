// Post v2 (dark, bold): foreign marriage certificate in Morocco (EN).
// Usage: node elkhalfi-law/social/make-post-apostille-v2.js
const path = require("path");
const { chromium } = require("playwright");
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
const G = "#c9a35a";
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:radial-gradient(circle at 85% 10%,#24262e 0,#121317 60%);color:#f4efe4;font-family:Montserrat,sans-serif;padding:84px 88px;display:flex;flex-direction:column;position:relative}
body::after{content:"";position:absolute;inset:30px;border:1.5px solid ${G};opacity:.55}
.top{display:flex;align-items:center;gap:20px}
.bn{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:34px}
.bn small{display:block;font-family:Montserrat;font-size:15px;letter-spacing:.26em;color:${G};margin-top:4px;font-weight:600}
.ring{margin-top:64px;font-size:96px;line-height:1}
h1{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:96px;line-height:1;margin-top:18px}
h1 span{color:${G}}
.sub{margin-top:22px;font-size:30px;color:#cfc8b8}
.steps{margin-top:54px;display:grid;gap:20px}
.s{display:flex;gap:26px;align-items:center;background:rgba(255,255,255,.05);border:1.5px solid rgba(201,163,90,.45);border-radius:18px;padding:26px 30px}
.n{flex:0 0 64px;height:64px;border-radius:50%;background:${G};color:#121317;display:grid;place-items:center;font-weight:700;font-size:30px}
.s b{display:block;font-size:33px;color:#fff}
.s p{font-size:24px;color:#cfc8b8;margin-top:6px}
.tip{margin-top:30px;font-size:24px;line-height:1.45;color:#e9e2d2;border-left:5px solid ${G};padding-left:22px}
.tip b{color:${G}}
.foot{margin-top:auto;display:flex;justify-content:space-between;font-size:19px;color:#a9a296}
.foot .w{color:${G};font-weight:600}
</style></head><body>
<div class="top">${mark(G, 58)}<div class="bn">Elkhalfi Advocates<small>RABAT · MOROCCO</small></div></div>
<h1>Married abroad?<br><span>Make it valid in Morocco.</span></h1>
<p class="sub">Your foreign marriage certificate in 3 steps</p>
<div class="steps">
 <div class="s"><div class="n">1</div><div><b>Apostille</b><p>In the issuing country, if it is a Hague Convention member</p></div></div>
 <div class="s"><div class="n">2</div><div><b>Or consular legalisation</b><p>If the country is not a member</p></div></div>
 <div class="s"><div class="n">3</div><div><b>Sworn Arabic translation</b><p>By a sworn translator in Morocco</p></div></div>
</div>
<p class="tip"><b>Moroccan citizen?</b> File your certificate with the consulate within 3 months (Family Code, art. 15).</p>
<div class="foot"><span>General information, not legal advice.</span><span class="w">elkhalfiavocates.com</span></div>
</body></html>`;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  await p.setContent(html, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(__dirname, "posts", "intl-apostille-en-v2.png") });
  await b.close();
  console.log("done");
})();
