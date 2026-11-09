// Square logo with both lawyers' names (profile picture for Gmail, Google Business, social).
// Usage: node elkhalfi-law/brand/make-logo-names.js
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

const GOLD = "#b8945a";
const html = (bg, fg) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@700&family=Cormorant+Garamond:wght@600;700&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;background:${bg};display:flex;flex-direction:column;align-items:center;justify-content:center;color:${fg};text-align:center}
.ar{font-family:Amiri,serif;font-size:116px;line-height:1.6;margin:0 0 22px}
.la{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:52px;letter-spacing:.3em;margin-right:-.3em}
.rule{width:300px;height:2px;background:${GOLD};margin:34px 0 30px}
.nm{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:46px;line-height:1.35;color:${GOLD}}
</style></head><body>
${mark(GOLD, 210)}
<div class="ar">الخلفي</div><div class="la">EL KHALFI</div>
<div class="rule"></div>
<div class="nm">Dr. Amal Elkhalfi<br>&amp; Maître Latifa Elkhalfi</div>
</body></html>`;

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1080 } });
  for (const [name, bg, fg] of [["logo-names-dark", "#14233c", "#ffffff"], ["logo-names-light", "#ffffff", "#14233c"]]) {
    await p.setContent(html(bg, fg), { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(__dirname, `${name}.png`) });
  }
  await b.close();
  console.log("done");
})();
