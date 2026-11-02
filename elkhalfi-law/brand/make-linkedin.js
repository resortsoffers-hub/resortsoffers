// LinkedIn cover images (1584 x 396) for each lawyer and the firm page.
// Usage: node elkhalfi-law/brand/make-linkedin.js
const path = require("path");
const { chromium } = require("playwright");

const NAVY = "#14233c", GOLD = "#b8945a";
const mark = (c, s) => `<svg viewBox="0 0 120 150" width="${s}" height="${s * 1.25}" fill="none" stroke="${c}" stroke-linecap="round" stroke-linejoin="round">
  <path d="M10 146 V60 A50 50 0 0 1 110 60 V146" stroke-width="5"/><path d="M22 146 V62 A38 38 0 0 1 98 62 V146" stroke-width="2"/>
  <line x1="60" y1="44" x2="60" y2="122" stroke-width="4"/><circle cx="60" cy="40" r="4" fill="${c}" stroke="none"/>
  <line x1="34" y1="58" x2="86" y2="58" stroke-width="4"/><line x1="34" y1="58" x2="26" y2="84" stroke-width="2"/><line x1="34" y1="58" x2="42" y2="84" stroke-width="2"/>
  <path d="M22 84 Q34 98 46 84 Z" fill="${c}" stroke-width="2"/><line x1="86" y1="58" x2="78" y2="84" stroke-width="2"/><line x1="86" y1="58" x2="94" y2="84" stroke-width="2"/>
  <path d="M74 84 Q86 98 98 84 Z" fill="${c}" stroke-width="2"/><path d="M46 122 H74" stroke-width="4"/><path d="M40 130 H80" stroke-width="4"/></svg>`;

// The profile photo covers the lower-left of the cover, so the text sits on the right.
const banner = (fr, ar, sub) => `
<div style="width:1584px;height:396px;background:linear-gradient(120deg,#1d3152,${NAVY} 55%,#0e1a2e);position:relative;overflow:hidden;font-family:Tajawal,sans-serif">
  <div style="position:absolute;left:-120px;top:-180px;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,rgba(184,148,90,.28),transparent 65%)"></div>
  <div style="position:absolute;right:90px;top:0;bottom:0;display:flex;align-items:center;gap:44px">
    <div style="text-align:right">
      <div style="font-family:Amiri,serif;font-weight:700;font-size:54px;color:#fff;line-height:1.5">${ar}</div>
      <div style="font-family:'Cormorant Garamond',serif;font-weight:700;font-size:44px;color:#e9dcc4;line-height:1.1">${fr}</div>
      <div style="width:520px;height:2px;background:${GOLD};margin:20px 0 18px auto"></div>
      <div style="font-size:24px;color:${GOLD};font-weight:500">${sub}</div>
      <div style="font-size:22px;color:#c9d1dc;margin-top:10px;letter-spacing:.04em">elkhalfiavocates.com · Rabat</div>
    </div>
    ${mark(GOLD, 150)}
  </div>
</div>`;

const AREAS = "Famille · Civil · Immobilier · Commercial · Pénal · Travail · Administratif";
const items = [
  ["linkedin-latifa", banner("Maître Latifa El Khalfi · Avocate au Barreau de Rabat", "الأستاذة لطيفة الخلفي · محامية", AREAS)],
  ["linkedin-amal", banner("Maître Amal El Khalfi · Avocate, Docteure en droit", "الأستاذة آمال الخلفي · محامية · دكتورة في القانون", AREAS)],
  ["linkedin-firm", banner("Elkhalfi – Avocates & Conseil juridique", "الخلفي للمحاماة والاستشارات القانونية", AREAS)],
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1584, height: 396 } });
  for (const [name, html] of items) {
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@700&family=Cormorant+Garamond:wght@700&family=Tajawal:wght@400;500&display=swap" rel="stylesheet">
      <style>*{margin:0;padding:0;box-sizing:border-box}</style></head><body>${html}</body></html>`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(__dirname, `${name}.png`) });
    console.log("wrote", name);
  }
  await browser.close();
})();
