// Post: rights of a divorced woman under the Moroccan Family Code (2004, in force).
// Usage: node elkhalfi-law/social/make-post-divorce-rights.js
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
const page = (dir, lang, title, sub, items, note) => `<!doctype html><html lang="${lang}" dir="${dir}"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@700&family=Tajawal:wght@400;500;700&family=Cormorant+Garamond:wght@600;700&family=Montserrat:wght@500;600&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:#faf7f0;color:#1c1c1c;font-family:${dir === "rtl" ? "Tajawal" : "Montserrat"},sans-serif;padding:80px 90px;display:flex;flex-direction:column;position:relative}
body::after{content:"";position:absolute;inset:32px;border:1.5px solid ${GOLD};opacity:.5;pointer-events:none}
.top{display:flex;align-items:center;gap:22px}
.bn{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:36px;line-height:1.1}
.bn small{display:block;font-family:Montserrat;font-size:16px;letter-spacing:.24em;color:${GOLD};margin-top:6px;font-weight:600}
.k{margin-top:70px;color:${GOLD};font-weight:700;font-size:28px;letter-spacing:${dir === "rtl" ? "0" : ".14em"};text-transform:uppercase}
h1{font-family:${dir === "rtl" ? "Amiri" : "'Cormorant Garamond'"},serif;font-weight:700;font-size:${dir === "rtl" ? 76 : 80}px;line-height:${dir === "rtl" ? 1.45 : 1.05};margin:18px 0 22px}
.sub{font-size:28px;color:#4a4a4a;line-height:1.5}
ol{list-style:none;counter-reset:n;margin-top:44px;display:grid;gap:22px}
li{counter-increment:n;display:flex;gap:22px;align-items:flex-start;font-size:${dir === "rtl" ? 31 : 28}px;line-height:1.45}
li::before{content:counter(n);flex:0 0 52px;height:52px;border-radius:50%;background:${GOLD};color:#fff;display:grid;place-items:center;font-weight:700;font-size:26px;margin-top:2px}
li b{font-weight:700}
.note{margin-top:auto;font-size:21px;color:#5a5a5a;line-height:1.5;border-top:1.5px solid ${GOLD};padding-top:20px}
.w{color:${GOLD};font-weight:600;margin-top:8px}
</style></head><body>
<div class="top">${mark(GOLD, 62)}<div class="bn">Elkhalfi Advocates<small>RABAT · MOROCCO</small></div></div>
<p class="k">${lang === "ar" ? "معلومة قانونية · مدونة الأسرة" : "Info juridique · Code de la famille"}</p>
<h1>${title}</h1><p class="sub">${sub}</p>
<ol>${items.map((i) => `<li><span>${i}</span></li>`).join("")}</ol>
<div class="note">${note}<div class="w">www.elkhalfiavocates.com</div></div>
</body></html>`;

const posts = {
  ar: page("rtl", "ar", "ما هي حقوق المرأة المطلقة في المغرب؟", "حسب مدونة الأسرة الجاري بها العمل (2004)",
    ["<b>الصداق</b> المؤخر إن وُجد",
     "<b>نفقة العدة</b> والسكن خلال فترة العدة",
     "<b>المتعة</b>: تعويض تقدّره المحكمة حسب مدة الزواج وحالة الزوج المادية وأسباب الطلاق",
     "<b>الحضانة</b> ونفقة الأطفال وسكنهم",
     "<b>الأموال المكتسبة</b> أثناء الزواج: حسب الاتفاق، أو حسب مساهمة كل زوج"],
    "معلومة عامة لا تغني عن استشارة قانونية. مشروع تعديل مدونة الأسرة لم يصبح قانوناً بعد."),
  fr: page("ltr", "fr", "Quels sont les droits de la femme divorcée au Maroc ?", "Selon le Code de la famille en vigueur (2004)",
    ["Le <b>reliquat de la dot</b> (sadaq), le cas échéant",
     "La <b>pension</b> et le <b>logement</b> pendant la période de viduité (idda)",
     "Le <b>don de consolation</b> (mut'a), fixé par le tribunal selon la durée du mariage, la situation du mari et les motifs du divorce",
     "La <b>garde des enfants</b>, leur pension et leur logement",
     "Les <b>biens acquis</b> pendant le mariage : selon l'accord des époux ou la contribution de chacun"],
    "Information générale, qui ne remplace pas une consultation. La réforme du Code de la famille n'est pas encore entrée en vigueur."),
};

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  for (const [l, html] of Object.entries(posts)) {
    await p.setContent(html, { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(__dirname, "posts", `divorce-rights-${l}.png`) });
  }
  await b.close();
  console.log("done");
})();
