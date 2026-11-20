// Nora's double-sided business card: front Elkhalfi Avocates, back 99 Selection. 3.5x2 in at 300 dpi.
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
const head=`<meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Playfair+Display:wght@700&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
<style>*{margin:0;box-sizing:border-box}body{width:1050px;height:600px;font-family:Montserrat,sans-serif;color:#f4efe4;position:relative;overflow:hidden}
body::after{content:"";position:absolute;inset:22px;border:1.5px solid ${G};opacity:.55}
.wrap{position:absolute;inset:0;display:flex;padding:70px 80px;gap:60px;align-items:center}
.l{flex:0 0 300px;display:flex;flex-direction:column;align-items:center;text-align:center}
.r{flex:1;border-left:1.5px solid rgba(201,163,90,.5);padding-left:56px}
.nm{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:58px;line-height:1}
.ti{color:${G};font-weight:600;font-size:21px;margin-top:12px;letter-spacing:.02em}
.sub{font-size:17px;color:#bdb6a8;margin-top:6px}
ul{list-style:none;padding:0;margin-top:30px;display:grid;gap:11px;font-size:19px}
li span{display:inline-block;width:30px;color:${G}}
</style>`;
const front=`<!doctype html><html><head>${head}</head><body style="background:radial-gradient(circle at 85% 10%,#262832 0,#121317 65%)">
<div class="wrap"><div class="l">${mark(G,120)}<div style="font-family:'Cormorant Garamond',serif;font-weight:700;font-size:44px;margin-top:20px">Elkhalfi</div><div style="color:${G};font-weight:600;font-size:15px;letter-spacing:.32em;margin-top:8px">AVOCATES · RABAT</div></div>
<div class="r"><div class="nm">Nora Elkhalfi</div><div class="ti">International Relations Manager</div><div class="sub">UAE &amp; United Kingdom</div>
<ul><li><span>✆</span>+971 54 747 4404</li><li><span>✉</span>elkhalfiavocates@gmail.com</li><li><span>◎</span>elkhalfiavocates.com</li></ul></div></div></body></html>`;
const back=`<!doctype html><html><head>${head}</head><body style="background:linear-gradient(160deg,#16224a,#0d1530)">
<div class="wrap"><div class="l"><div style="font-family:'Playfair Display',serif;font-weight:700;font-size:120px;line-height:.9;color:#e8c77e">99</div><div style="letter-spacing:.42em;font-size:22px;margin-top:10px;padding-left:.42em">SELECTION</div><div style="color:#bdb6a8;font-size:14px;margin-top:14px">Luxury resort holidays</div></div>
<div class="r" style="border-color:rgba(232,199,126,.5)"><div class="nm">Nora Elkhalfi</div><div class="ti" style="color:#e8c77e">Founder &amp; Owner</div><div class="sub">Hospitality Marketing &amp; PR</div>
<ul><li><span style="color:#e8c77e">✆</span>+971 54 747 4404</li><li><span style="color:#e8c77e">✉</span>book@99selection.com</li><li><span style="color:#e8c77e">◎</span>99selection.com</li><li style="font-size:16px;color:#bdb6a8"><span style="color:#e8c77e">⌖</span>Emirates Towers, Dubai, UAE</li></ul></div></div></body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1050,height:600},deviceScaleFactor:2});
for(const [n,h] of [["front",front],["back",back]]){await p.setContent(h,{waitUntil:"networkidle"});await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:path.join(__dirname,`card-nora-${n}.png`)});}
await b.close();})();
