// Digital replica of the office sign (same text and layout as the real plate), high resolution.
// Usage: node elkhalfi-law/brand/make-sign.js
const path = require("path");
const { chromium } = require("playwright");
const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;800&family=Montserrat:wght@600;700&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:1200px;background:radial-gradient(circle at 50% 35%,#fbf8f2,#efe7d8);display:grid;place-items:center}
.wall{position:absolute;inset:44px;border:2px solid #a8823f;opacity:.55}
.plate{position:relative;width:920px;padding:70px 60px 54px;background:linear-gradient(160deg,#1a1a1a,#050505 60%,#141414);border-radius:14px;color:#fff;text-align:center;
 box-shadow:0 30px 60px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.12)}
.plate::before{content:"";position:absolute;inset:22px;border:3px solid #fff;border-radius:6px}
.screw{position:absolute;width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff,#b9b9b9 45%,#6f6f6f);box-shadow:0 2px 4px rgba(0,0,0,.5)}
.ar{font-family:Cairo,sans-serif;font-weight:800;direction:rtl;font-size:60px;line-height:1.35}
.la{font-family:Montserrat,sans-serif;font-weight:700;font-size:46px;line-height:1.35}
.la1{margin-top:18px}
.rule{height:4px;background:#fff;margin:28px 40px 18px}
.small{font-family:Montserrat,sans-serif;font-weight:600;font-size:30px;line-height:1.5}
.small .a{font-family:Cairo,sans-serif;font-weight:700}
.shine{position:absolute;inset:0;border-radius:14px;background:linear-gradient(115deg,rgba(255,255,255,.08) 0%,rgba(255,255,255,0) 35%,rgba(255,255,255,.05) 60%,rgba(255,255,255,0) 75%);pointer-events:none}
</style></head><body><div class="wall"></div>
<div class="plate">
 <span class="screw" style="left:-14px;top:-14px"></span><span class="screw" style="right:-14px;top:-14px"></span>
 <span class="screw" style="left:-14px;bottom:-14px"></span><span class="screw" style="right:-14px;bottom:-14px"></span>
 <div class="ar">الأستاذة أمال الخلفي</div>
 <div class="ar">محامية بهيئة الرباط</div>
 <div class="ar">دكتورة في الحقوق</div>
 <div class="la la1">Maître Amal EL KHALFI</div>
 <div class="la">Avocate au Barreau de Rabat</div>
 <div class="la">Docteur en Droit</div>
 <div class="rule"></div>
 <div class="small">REZ DE CHAUSSEE - <span class="a">الطابق الأرضي</span></div>
 <div class="small">G.S.M : 06 72 80 15 83</div>
 <div class="shine"></div>
</div></body></html>`;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: 2 });
  await p.setContent(html, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(__dirname, "..", "images", "office-sign-clean.jpg"), type: "jpeg", quality: 90 });
  await b.close();
  console.log("done");
})();
