// Official logo (high resolution, 3240x3240): ivory and black versions, gold accents.
// Usage: node elkhalfi-law/brand/make-logo-official.js
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

const GOLD = "#a8823f";
const FR = `<svg viewBox="0 0 3 2" width="42" height="28"><rect width="1" height="2" fill="#002395"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#ED2939"/></svg>`;
const star = Array.from({ length: 5 }, (_, i) => { const a = -Math.PI / 2 + i * 4 * Math.PI / 5; return `${45 + 18 * Math.cos(a)},${30 + 18 * Math.sin(a)}`; }).join(" ");
const MA = `<svg viewBox="0 0 90 60" width="42" height="28"><rect width="90" height="60" fill="#C1272D"/><polygon points="${star}" fill="none" stroke="#006233" stroke-width="3.2"/></svg>`;

const html = (bg, fg, sub) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Montserrat:wght@500;600&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;background:${bg};display:flex;flex-direction:column;align-items:center;justify-content:center;color:${fg};text-align:center}
.t{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:64px;letter-spacing:.04em;margin-top:34px;line-height:1.05}
.t2{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:46px;color:${GOLD};margin-top:6px}
.k{font-family:Montserrat,sans-serif;font-weight:600;font-size:23px;letter-spacing:.32em;text-transform:uppercase;color:${sub};margin-top:26px;padding-left:.32em}
.r{font-family:Montserrat,sans-serif;font-weight:500;font-size:21px;letter-spacing:.38em;text-transform:uppercase;color:${GOLD};margin-top:14px;padding-left:.38em}
.rule{width:230px;height:2px;background:${GOLD};margin:40px 0 34px}
.nm{display:flex;align-items:center;gap:20px;justify-content:center}
.n{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:44px}
.amp{font-family:'Cormorant Garamond',serif;font-size:40px;color:${GOLD}}
.w{font-family:Montserrat,sans-serif;font-weight:500;font-size:24px;letter-spacing:.14em;color:${GOLD};margin-top:34px}
.nm svg{border-radius:3px;box-shadow:0 0 0 1px rgba(0,0,0,.15)}
</style></head><body>
${mark(GOLD, 230)}
<div class="t" style="font-size:96px;margin-top:40px">Elkhalfi</div>
<div class="k" style="font-size:30px;margin-top:22px">Advocates · Avocates</div>
<div class="r" style="font-size:26px;margin-top:16px">Rabat</div>
</body></html>`;

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 3 });
  for (const [name, bg, fg, sub] of [["logo-whatsapp-ivory", "#faf7f0", "#1c1c1c", "#4a4a4a"]]) {
    await p.setContent(html(bg, fg, sub), { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(__dirname, `${name}.png`) });
  }
  await b.close();
  console.log("done");
})();
