// Bold dark/gold posts: one idea, big title, max 3 short points (≈25 words).
// Usage: NODE_PATH=$(npm root -g) node elkhalfi-law/social/make-post-dark.js
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
const page = (p) => {
  const rtl = p.dir === "rtl";
  return `<!doctype html><html dir="${p.dir || "ltr"}"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@700&family=Tajawal:wght@500;700;800&family=Cormorant+Garamond:wght@700&family=Montserrat:wght@500;700&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:radial-gradient(circle at ${rtl ? "15%" : "85%"} 8%,#262832 0,#121317 62%);color:#f4efe4;font-family:${rtl ? "Tajawal" : "Montserrat"},sans-serif;padding:90px 92px;display:flex;flex-direction:column;position:relative}
body::after{content:"";position:absolute;inset:30px;border:1.5px solid ${G};opacity:.55}
.top{display:flex;align-items:center;gap:20px}
.bn{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:34px;direction:ltr}
.bn small{display:block;font-family:Montserrat;font-size:15px;letter-spacing:.26em;color:${G};margin-top:4px;font-weight:700}
.k{margin-top:auto;color:${G};font-weight:700;font-size:${rtl ? 34 : 26}px;letter-spacing:${rtl ? 0 : ".16em"};text-transform:uppercase}
h1{font-family:${rtl ? "Amiri" : "'Cormorant Garamond'"},serif;font-weight:700;font-size:${rtl ? 118 : 108}px;line-height:${rtl ? 1.35 : 1.02};margin-top:20px}
h1 span{color:${G}}
ul{list-style:none;margin-top:80px;display:grid;gap:34px}
li{display:flex;gap:26px;align-items:center;font-size:${rtl ? 48 : 40}px;font-weight:${rtl ? 700 : 600};line-height:1.3}
li::before{content:"";flex:0 0 18px;height:18px;border-radius:50%;background:${G}}
.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:center;font-size:24px;color:#a9a296}
.foot .w{color:${G};font-weight:700;direction:ltr}
</style></head><body>
<div class="top">${mark(G, 58)}<div class="bn">Elkhalfi Advocates<small>RABAT · MOROCCO</small></div></div>
<p class="k">${p.k}</p>
<h1>${p.title}</h1>
<ul>${p.points.map((x) => `<li>${x}</li>`).join("")}</ul>
<div class="foot"><span>${p.foot || ""}</span><span class="w">elkhalfiavocates.com</span></div>
</body></html>`;
};
const POSTS = {
  "constitution-ar": { dir: "rtl", k: "مستجدات قانونية", title: "الدفع بعدم<br><span>دستورية القوانين</span>",
    points: ["يبدأ العمل به في 1 يوليوز 2028", "يحق لأطراف الدعوى إثارته أمام المحكمة", "الفصل 133 من الدستور"] },
  "moudawana-ar": { dir: "rtl", k: "مستجدات قانونية", title: "تعديل مدونة الأسرة<br><span>أين وصل؟</span>",
    points: ["المشروع لم يُعرض بعد على البرلمان", "المطبَّق اليوم: مدونة 2004", "ملفاتكم تُعالَج بالقانون الحالي"] },
  "copyright-ar": { dir: "rtl", k: "مستجدات قانونية", title: "القرصنة الرقمية<br><span>قانون جديد</span>",
    points: ["حماية أقوى لحقوق المؤلف", "عقوبات على البث غير القانوني", "المبدعون والشركات: احموا أعمالكم"] },
};
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  const only = process.argv.slice(2);
  for (const [name, p] of Object.entries(POSTS)) {
    if (only.length && !only.includes(name)) continue;
    await pg.setContent(page(p), { waitUntil: "networkidle" });
    await pg.evaluate(() => document.fonts.ready);
    await pg.screenshot({ path: path.join(__dirname, "posts", `dark-${name}.png`) });
  }
  await b.close();
  console.log("done");
})();
