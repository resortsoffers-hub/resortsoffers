// LinkedIn personal banner for Nora (1584x396).
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
const html=`<html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Playfair+Display:wght@700&family=Montserrat:wght@500;600&display=swap" rel="stylesheet"><style>
*{margin:0;box-sizing:border-box}body{width:1584px;height:396px;background:radial-gradient(circle at 85% 0%,#273149,#121a2c 60%);color:#f4efe4;font-family:Montserrat;position:relative;overflow:hidden}
body::after{content:"";position:absolute;inset:16px;border:1.5px solid ${G};opacity:.45}
.w{position:absolute;left:560px;right:90px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center}
.n{font-family:'Cormorant Garamond';font-weight:700;font-size:64px;line-height:1}
.t{color:${G};font-weight:600;font-size:24px;margin-top:12px;letter-spacing:.02em}
.g{font-size:19px;color:#cfc8b8;margin-top:10px}
.b{display:flex;gap:44px;align-items:center;margin-top:30px}
.b div{display:flex;align-items:center;gap:12px;font-size:17px}
.b .e{font-family:'Cormorant Garamond';font-weight:700;font-size:26px}
.b .nn{font-family:'Playfair Display';font-weight:700;font-size:30px;color:${G}}
.sep{width:1.5px;height:40px;background:${G};opacity:.6}
.u{font-size:16px;color:${G};margin-top:22px;letter-spacing:.04em}
</style></head><body><div class="w">
<div class="n">Nora Nana Elkhalfi</div>
<div class="t">Entrepreneur · Luxury Travel &amp; Hospitality Expert</div>
<div class="g">Arabic · English · French · Spanish &nbsp;|&nbsp; Dubai, UAE</div>
<div class="b"><div>${mark(G,34)}<span class="e">Elkhalfi Avocates</span></div><span class="sep"></span><div><span class="nn">99</span><span style="letter-spacing:.35em">SELECTION</span></div></div>
<div class="u">elkhalfiavocates.com/nora &nbsp;·&nbsp; 99selection.com</div>
</div></body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1584,height:396},deviceScaleFactor:2});
await p.setContent(html,{waitUntil:"networkidle"});await p.evaluate(()=>document.fonts.ready);
await p.screenshot({path:path.join(__dirname,"linkedin-nora-banner.png")});await b.close()})();
