// Illustrated building entrance with the office sign mounted beside the door (for website/social, not for Google verification).
// Usage: node elkhalfi-law/brand/make-entrance.js
const path = require("path");
const { chromium } = require("playwright");
const sign = `
<div class="plate">
 <span class="screw" style="left:-7px;top:-7px"></span><span class="screw" style="right:-7px;top:-7px"></span>
 <span class="screw" style="left:-7px;bottom:-7px"></span><span class="screw" style="right:-7px;bottom:-7px"></span>
 <div class="ar">الأستاذة أمال الخلفي</div><div class="ar">محامية بهيئة الرباط</div><div class="ar">دكتورة في الحقوق</div>
 <div class="la la1">Maître Amal EL KHALFI</div><div class="la">Avocate au Barreau de Rabat</div><div class="la">Docteur en Droit</div>
 <div class="rule"></div>
 <div class="small">REZ DE CHAUSSEE - <span class="a">الطابق الأرضي</span></div>
 <div class="small">G.S.M : 06 72 80 15 83</div><div class="shine"></div>
</div>`;
const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;800&family=Montserrat:wght@600;700&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:1200px;position:relative;overflow:hidden;
 background:
  repeating-linear-gradient(0deg,rgba(0,0,0,.018) 0 2px,transparent 2px 7px),
  repeating-linear-gradient(90deg,rgba(0,0,0,.012) 0 3px,transparent 3px 11px),
  linear-gradient(180deg,#f7f3ec 0%,#efe8dc 70%,#e4dccd 100%)}
.light{position:absolute;inset:0;background:radial-gradient(ellipse at 70% 20%,rgba(255,250,235,.7),transparent 60%)}
/* door */
.frame{position:absolute;left:110px;top:150px;width:470px;height:960px;background:#d8cdb8;border-radius:235px 235px 0 0;box-shadow:inset 0 0 0 14px #cbbd a4}
.frame{box-shadow:inset 0 0 0 16px #c9bba1,0 0 0 2px rgba(0,0,0,.05)}
.door{position:absolute;left:142px;top:182px;width:406px;height:928px;border-radius:203px 203px 0 0;
 background:linear-gradient(90deg,#3b2414,#5a3720 20%,#4a2d1a 50%,#5a3720 80%,#3b2414);overflow:hidden;box-shadow:inset 0 0 40px rgba(0,0,0,.6)}
.door::before{content:"";position:absolute;left:50%;top:0;bottom:0;width:4px;margin-left:-2px;background:#24150b}
.panel{position:absolute;border:4px solid rgba(0,0,0,.35);box-shadow:inset 0 0 0 2px rgba(255,220,170,.08)}
.knob{position:absolute;top:560px;width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#f4d58a,#b08a3e 60%,#6e5420);box-shadow:0 2px 4px rgba(0,0,0,.6)}
.studs{position:absolute;inset:0;background-image:radial-gradient(circle,#c9a35a 0 4px,transparent 5px);background-size:52px 52px;background-position:12px 30px;opacity:.55;
 -webkit-mask:linear-gradient(#000 0 0);}
.num{position:absolute;left:300px;top:96px;width:90px;height:56px;background:#1d4f8a;color:#fff;border:4px solid #fff;border-radius:8px;display:grid;place-items:center;font:700 34px Montserrat,sans-serif;box-shadow:0 4px 10px rgba(0,0,0,.25)}
.step{position:absolute;left:80px;top:1110px;width:530px;height:90px;background:linear-gradient(#cfc6b6,#b5ab98);box-shadow:0 -4px 10px rgba(0,0,0,.1)}
.ground{position:absolute;left:0;right:0;top:1150px;bottom:0;background:linear-gradient(#bfb5a3,#a99f8c)}
.lamp{position:absolute;left:720px;top:150px;width:70px;height:110px;background:linear-gradient(#2b2b2b,#111);clip-path:polygon(15% 0,85% 0,100% 100%,0 100%);}
.lamp::after{content:"";position:absolute;left:12px;right:12px;top:28px;bottom:12px;background:radial-gradient(#fff3c4,#e2b95a);opacity:.85}
.arm{position:absolute;left:745px;top:118px;width:20px;height:40px;background:#111}
.glow{position:absolute;left:600px;top:150px;width:320px;height:320px;border-radius:50%;background:radial-gradient(rgba(255,226,150,.35),transparent 70%)}
/* sign */
.signwrap{position:absolute;left:660px;top:390px;width:470px;filter:drop-shadow(0 18px 22px rgba(0,0,0,.35))}
.plate{position:relative;padding:34px 26px 26px;background:linear-gradient(160deg,#1a1a1a,#050505 60%,#141414);border-radius:7px;color:#fff;text-align:center}
.plate::before{content:"";position:absolute;inset:11px;border:2px solid #fff;border-radius:3px}
.screw{position:absolute;width:16px;height:16px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff,#b9b9b9 45%,#6f6f6f)}
.ar{font-family:Cairo,sans-serif;font-weight:800;direction:rtl;font-size:30px;line-height:1.35}
.la{font-family:Montserrat,sans-serif;font-weight:700;font-size:21.5px;line-height:1.4}.la1{margin-top:8px}
.rule{height:2px;background:#fff;margin:13px 18px 9px}
.small{font-family:Montserrat,sans-serif;font-weight:600;font-size:14.5px;line-height:1.5}.small .a{font-family:Cairo,sans-serif;font-weight:700}
.shine{position:absolute;inset:0;border-radius:7px;background:linear-gradient(115deg,rgba(255,255,255,.1),rgba(255,255,255,0) 35%,rgba(255,255,255,.05) 60%,rgba(255,255,255,0) 75%)}
.plant{position:absolute;left:640px;top:960px;width:150px;height:170px}
.pot{position:absolute;left:30px;bottom:0;width:90px;height:80px;background:linear-gradient(#a0522d,#7a3e22);border-radius:0 0 18px 18px}
.leaf{position:absolute;width:44px;height:110px;background:linear-gradient(#5f8a4a,#3e6b31);border-radius:50% 50% 50% 50%/80% 80% 20% 20%;transform-origin:bottom center;bottom:70px;left:53px}
</style></head><body><div class="light"></div>
<div class="ground"></div><div class="step"></div>
<div class="frame"></div>
<div class="door">
 <div class="studs"></div>
 <div class="panel" style="left:34px;top:300px;width:150px;height:240px"></div><div class="panel" style="right:34px;top:300px;width:150px;height:240px"></div>
 <div class="panel" style="left:34px;top:600px;width:150px;height:260px"></div><div class="panel" style="right:34px;top:600px;width:150px;height:260px"></div>
 <div class="knob" style="left:168px"></div><div class="knob" style="left:216px"></div>
</div>
<div class="num">42</div>
<div class="glow"></div><div class="arm"></div><div class="lamp"></div>
<div class="signwrap">${sign}</div>
<div class="plant"><div class="pot"></div>
 <div class="leaf" style="transform:rotate(-35deg)"></div><div class="leaf" style="transform:rotate(-12deg)"></div><div class="leaf" style="transform:rotate(12deg)"></div><div class="leaf" style="transform:rotate(35deg)"></div></div>
</body></html>`;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: 2 });
  await p.setContent(html, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(__dirname, "..", "images", "office-entrance.jpg"), type: "jpeg", quality: 90 });
  await b.close(); console.log("done");
})();
