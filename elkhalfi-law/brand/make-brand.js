// Generates the logo files and the two business cards (print PDF + PNG previews).
// Usage: node elkhalfi-law/brand/make-brand.js
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const OUT = __dirname;
const DOMAIN = "elkhalfiavocates.com";
const EMAIL = `contact@${DOMAIN}`;
const PHONE = "+212 ⋯"; // TODO: office phone number

const NAVY = "#14233c", GOLD = "#b8945a", CREAM = "#f8f5ef", LIGHT = "#e9dcc4";

// Logo mark: a Moroccan arch framing the scales of justice. Pure shapes, no fonts.
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

const fonts = `<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:wght@500;600;700&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">`;
const base = `* { margin:0; padding:0; box-sizing:border-box; } body { background: transparent; }`;

// Full logo: mark + Arabic name + Latin name + tagline
const logo = (fg, accent) => `
<div style="display:flex;flex-direction:column;align-items:center;gap:18px;padding:40px;">
  ${mark(accent, 150)}
  <div style="font-family:Amiri,serif;font-weight:700;font-size:92px;color:${fg};line-height:1.6;margin-bottom:-6px">الخلفي</div>
  <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:52px;letter-spacing:.32em;color:${fg};margin-right:-.32em">EL KHALFI</div>
  <div style="width:340px;height:2px;background:${accent}"></div>
  <div style="font-family:Tajawal,sans-serif;font-size:30px;color:${accent};font-weight:500">محاماة واستشارات قانونية</div>
  <div style="font-family:'Cormorant Garamond',serif;font-size:26px;letter-spacing:.28em;color:${accent};text-transform:uppercase;margin-right:-.28em">Avocates · Conseil juridique</div>
</div>`;

// Business cards: 85 x 55 mm
const cardCss = `
@page { size: 85mm 55mm; margin: 0; }
html, body { width: 85mm; height: 55mm; }
.card { width: 85mm; height: 55mm; overflow: hidden; position: relative; page-break-after: always; }
.front { background: linear-gradient(150deg, #1d3152, ${NAVY} 60%, #0e1a2e); display:flex; align-items:center; justify-content:center; gap: 5mm; }
.front .ar { font-family: Amiri, serif; font-weight: 700; font-size: 22pt; color: #fff; line-height: 1.55; text-align:center; }
.front .la { font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: 11pt; letter-spacing: .3em; color: ${LIGHT}; text-align:center; margin-top: 1mm; }
.front .tag { font-family: Tajawal, sans-serif; font-size: 7pt; color: ${GOLD}; text-align:center; margin-top: 1.6mm; }
.front .tagl { font-family: 'Cormorant Garamond', serif; font-size: 6.4pt; letter-spacing: .22em; color: ${GOLD}; text-align:center; text-transform: uppercase; }
.front::after { content:""; position:absolute; inset: 3mm; border: .3mm solid rgba(184,148,90,.6); }
.back { background: ${CREAM}; color: ${NAVY}; padding: 5mm 5.5mm 4.5mm; display:flex; flex-direction:column; justify-content:space-between; }
.names { display:flex; justify-content:space-between; gap: 3mm; } .names > div { flex: 1 1 50%; min-width: 0; }
.fr { font-family: 'Cormorant Garamond', serif; direction:ltr; text-align:left; }
.arb { font-family: Tajawal, sans-serif; direction:rtl; text-align:right; }
.fr .n { font-size: 11pt; font-weight: 700; line-height:1.15; }
.arb .n { font-family: Amiri, serif; font-size: 12pt; white-space: nowrap; font-weight: 700; line-height:1.2; }
.t { color: ${GOLD}; font-weight: 700; margin-top: .8mm; }
.fr .t { font-size: 8pt; } .arb .t { font-size: 7.4pt; }
.u { font-size: 6.6pt; color: #4a5568; margin-top: .6mm; line-height:1.3; }
.fr .u { font-family: Tajawal, sans-serif; }
.rule { height: .3mm; background: ${GOLD}; margin: 2mm 0; opacity:.8; }
.contact { display:grid; grid-template-columns: 1fr 1fr; gap: 1mm 4mm; font-family: Tajawal, sans-serif; font-size: 6.6pt; line-height: 1.35; }
.contact .l { direction:ltr; text-align:left; } .contact .r { direction:rtl; text-align:right; }
.contact b { color: ${GOLD}; font-weight:700; }
.mini { position:absolute; left: 50%; bottom: 3.2mm; transform: translateX(-50%); opacity: .9; }
`;

const front = `
<div class="card front">
  <div>${mark(GOLD, 40)}</div>
  <div>
    <div class="ar">الخلفي</div>
    <div class="la">EL KHALFI</div>
    <div class="tag">محاماة واستشارات قانونية</div>
    <div class="tagl">Avocates · Conseil juridique</div>
  </div>
</div>`;

const back = (p) => `
<div class="card back">
  <div class="names">
    <div class="fr"><div class="n">${p.fr}</div><div class="t">${p.frRole}</div><div class="u">${p.frUni}</div></div>
    <div class="arb"><div class="n">${p.ar}</div><div class="t">${p.arRole}</div><div class="u">${p.arUni}</div></div>
  </div>
  <div class="rule"></div>
  <div class="contact">
    <div class="l"><b>T</b> ${PHONE}<br><b>@</b> ${EMAIL}<br><b>W</b> ${DOMAIN}</div>
    <div class="r">42، زنقة عبد الكريم الديوري<br>شارع مدغشقر، الطابق الأرضي<br>الرباط</div>
    <div class="l" style="grid-column:1/3;font-size:6pt;color:#5f6b7a">42, rue Abdelkrim Diouri, avenue de Madagascar, rez-de-chaussée – Rabat</div>
  </div>
</div>`;

const PEOPLE = {
  amal: {
    fr: "Maître Amal El Khalfi", frRole: "Avocate · Docteure en droit",
    frUni: "Doctorat en droit – Université de Perpignan (France)",
    ar: "الأستاذة آمال الخلفي", arRole: "محامية · دكتورة في القانون",
    arUni: "دكتوراه في القانون – جامعة بربينيان (فرنسا)",
  },
  latifa: {
    fr: "Maître Latifa El Khalfi", frRole: "Avocate",
    frUni: "Lauréate de l'Université Mohammed V – Rabat",
    ar: "الأستاذة لطيفة الخلفي", arRole: "محامية",
    arUni: "خريجة جامعة محمد الخامس – الرباط",
  },
};

const doc = (body, extraCss = "") => `<!doctype html><html><head><meta charset="utf-8">${fonts}<style>${base}${extraCss}</style></head><body>${body}</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  const ready = async () => { await page.waitForLoadState("networkidle"); await page.evaluate(() => document.fonts.ready); };

  // Logo mark as standalone SVG (no fonts needed)
  fs.writeFileSync(path.join(OUT, "logo-mark-gold.svg"), mark(GOLD).trim());
  fs.writeFileSync(path.join(OUT, "logo-mark-navy.svg"), mark(NAVY).trim());

  // Full logos (transparent PNG)
  for (const [name, fg, accent, bg] of [["logo-on-light", NAVY, GOLD, null], ["logo-on-dark", "#ffffff", GOLD, NAVY]]) {
    await page.setViewportSize({ width: 900, height: 900 });
    await page.setContent(doc(`<div id="l" style="display:inline-block;${bg ? `background:${bg};` : ""}">${logo(fg, accent)}</div>`));
    await ready();
    await page.locator("#l").screenshot({ path: path.join(OUT, `${name}.png`), omitBackground: !bg });
  }

  // Square profile picture for social media
  await page.setViewportSize({ width: 1080, height: 1080 });
  await page.setContent(doc(`<div style="width:1080px;height:1080px;background:radial-gradient(circle at 50% 40%, #1d3152, ${NAVY} 70%);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px">
    ${mark(GOLD, 300)}
    <div style="font-family:Amiri,serif;font-weight:700;font-size:120px;color:#fff;line-height:1">الخلفي</div></div>`));
  await ready();
  await page.screenshot({ path: path.join(OUT, "profile-picture.png") });

  // Business cards: print PDF (front + back) and PNG previews
  for (const [key, p] of Object.entries(PEOPLE)) {
    await page.setViewportSize({ width: 322, height: 208 });
    await page.setContent(doc(front + back(p), cardCss));
    await ready();
    await page.pdf({ path: path.join(OUT, `card-${key}.pdf`), width: "85mm", height: "55mm", printBackground: true });
    const cards = page.locator(".card");
    await page.setViewportSize({ width: 322, height: 420 });
    await cards.nth(0).screenshot({ path: path.join(OUT, `card-${key}-front.png`), scale: "device" });
    await cards.nth(1).screenshot({ path: path.join(OUT, `card-${key}-back.png`), scale: "device" });
  }
  await browser.close();
  console.log("done");
})();
