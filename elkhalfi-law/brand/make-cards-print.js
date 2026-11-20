// Print-ready business cards for Nora: 85x55 mm + 3 mm bleed (91x61 mm), vector PDF + 600 dpi PNG.
// Two cards, each front + back: Elkhalfi Avocates (International Business Relations) and 99 Selection (Founder & Owner).
const fs=require("fs"),path=require("path");const {chromium}=require("playwright");
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
const qr=(f,color)=>fs.readFileSync(path.join(__dirname,"print",f),"utf8").replace(/<\?xml[^>]*>/,"").replace(/width="[^"]*" height="[^"]*"/,'width="100%" height="100%"').replace(/<path /,`<path fill="${color}" `);
const PHONE="+971 54 747 4404";
const G="#c9a35a", G2="#e8c77e";
const css=(bg,gold)=>`<meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Playfair+Display:wght@700&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
<style>@page{size:91mm 61mm;margin:0}*{margin:0;box-sizing:border-box}html,body{width:91mm;height:61mm}
body{font-family:Montserrat,sans-serif;color:#f4efe4;background:${bg};position:relative;overflow:hidden;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.safe{position:absolute;left:8mm;top:8mm;right:8mm;bottom:8mm}
.frame{position:absolute;left:6mm;top:6mm;right:6mm;bottom:6mm;border:0.25mm solid ${gold};opacity:.55}
.nm{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:6.2mm;line-height:1}
.ti{color:${gold};font-weight:600;font-size:2.3mm;white-space:nowrap;margin-top:1.4mm}
.sub{font-size:2.1mm;color:#bdb6a8;margin-top:.6mm}
ul{list-style:none;padding:0;margin-top:3.2mm;display:grid;gap:1.1mm;font-size:2.35mm}
li b{display:inline-block;width:3.6mm;color:${gold};font-weight:500}
.center{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
</style>`;
const ELK_BG="radial-gradient(circle at 85% 10%,#262832 0,#121317 65%)", NN_BG="linear-gradient(160deg,#16224a,#0d1530)";
const cards={
 "elkhalfi":{
  front:`<!doctype html><html><head>${css(ELK_BG,G)}</head><body><div class="frame"></div><div class="safe" style="display:flex;align-items:center;gap:6mm">
   <div style="flex:0 0 25mm;text-align:center">${mark(G,46)}<div style="font-family:'Cormorant Garamond',serif;font-weight:700;font-size:4.6mm;margin-top:1.5mm">Elkhalfi</div><div style="color:${G};font-weight:600;font-size:1.6mm;letter-spacing:.3em;margin-top:.8mm">AVOCATES · RABAT</div></div>
   <div style="flex:1;border-left:.25mm solid rgba(201,163,90,.5);padding-left:5mm"><div class="nm">Nora Elkhalfi</div><div class="ti">International Business Relations</div><div class="sub">UAE &amp; United Kingdom</div>
   <ul><li><b>✆</b>${PHONE}</li><li><b>✉</b>elkhalfiavocates@gmail.com</li><li><b>◎</b>elkhalfiavocates.com</li></ul></div></div></body></html>`,
  back:`<!doctype html><html><head>${css(ELK_BG,G)}</head><body><div class="frame"></div><div class="safe center">
   <div style="display:flex;align-items:center;gap:7mm"><div style="text-align:center">${mark(G,48)}<div style="font-family:'Cormorant Garamond',serif;font-weight:700;font-size:5mm;margin-top:1.5mm">Elkhalfi</div><div style="color:${G};font-weight:600;font-size:1.9mm;letter-spacing:.3em;margin-top:1mm">AVOCATES</div></div>
   <div style="text-align:center"><div style="width:17mm;height:17mm;background:#fff;padding:1.2mm;border-radius:1.2mm">${qr("qr-linkedin-elkhalfi.svg","#121317")}</div><div style="font-size:1.9mm;margin-top:1.4mm;color:#bdb6a8">LinkedIn</div></div></div>
   <div style="font-size:2mm;margin-top:2.6mm;display:flex;gap:4mm;justify-content:center"><span><b style="color:${G}">Instagram</b> @maitre.amal.elkhalfi</span><span><b style="color:${G}">LinkedIn</b> /elkhalfi-avocates</span></div>
   <div style="font-size:1.8mm;color:#bdb6a8;margin-top:1.4mm">Facebook: Maître Amal El Khalfi – Avocate</div></div></body></html>`},
 "99selection":{
  front:`<!doctype html><html><head>${css(NN_BG,G2)}</head><body><div class="frame"></div><div class="safe" style="display:flex;align-items:center;gap:6mm">
   <div style="flex:0 0 25mm;text-align:center"><div style="font-family:'Playfair Display',serif;font-weight:700;font-size:13mm;line-height:.9;color:${G2}">99</div><div style="letter-spacing:.4em;font-size:2.4mm;margin-top:1.2mm;padding-left:.4em">SELECTION</div></div>
   <div style="flex:1;border-left:.25mm solid rgba(232,199,126,.5);padding-left:5mm"><div class="nm">Nora Elkhalfi</div><div class="ti">Founder &amp; Owner</div><div class="sub">Hospitality Marketing &amp; PR</div>
   <ul><li><b>✆</b>${PHONE}</li><li><b>✉</b>book@99selection.com</li><li><b>◎</b>99selection.com</li><li style="font-size:2mm;color:#bdb6a8"><b>⌖</b>Emirates Towers, Dubai, UAE</li></ul></div></div></body></html>`,
  back:`<!doctype html><html><head>${css(NN_BG,G2)}</head><body><div class="frame"></div><div class="safe center">
   <div style="display:flex;align-items:center;gap:9mm"><div style="text-align:center"><div style="font-family:'Playfair Display',serif;font-weight:700;font-size:13mm;line-height:.9;color:${G2}">99</div><div style="letter-spacing:.4em;font-size:2.4mm;margin-top:1.2mm;padding-left:.4em">SELECTION</div></div>
   <div style="text-align:center"><div style="width:17mm;height:17mm;background:#fff;padding:1.2mm;border-radius:1.2mm">${qr("qr-99selection.svg","#0d1530")}</div><div style="font-size:1.9mm;margin-top:1.4mm;color:#bdb6a8">99selection.com</div></div></div>
   <div style="font-size:1.9mm;color:#bdb6a8;margin-top:3mm">Luxury resort holidays · Maldives · Seychelles · Mauritius · Bali</div></div></body></html>`}
};
(async()=>{const b=await chromium.launch();
 for(const [name,c] of Object.entries(cards)){
  const p=await b.newPage({viewport:{width:344,height:231},deviceScaleFactor:6.28}); // 91x61mm at ~600 dpi
  const pages=[];
  for(const side of ["front","back"]){await p.setContent(c[side],{waitUntil:"networkidle"});await p.evaluate(()=>document.fonts.ready);
   await p.screenshot({path:path.join(__dirname,"print",`card-${name}-${side}-600dpi.png`)});
   await p.pdf({path:path.join(__dirname,"print",`_${name}-${side}.pdf`),width:"91mm",height:"61mm",printBackground:true,pageRanges:"1"});}
  await p.close();}
 await b.close();})();
