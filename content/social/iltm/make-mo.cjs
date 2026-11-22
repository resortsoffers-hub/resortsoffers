// ILTM Cannes 2026 LinkedIn post (99 Selection), 1200x1500.
const path=require("path");const {chromium}=require("playwright");
const G="#c9a35a";
const html=`<html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Playfair+Display:wght@700&family=Montserrat:wght@500;600&display=swap" rel="stylesheet"><style>
*{margin:0;box-sizing:border-box}body{width:1200px;height:1500px;background:linear-gradient(180deg,#0b3b5c 0%,#0e6b8a 38%,#121a2c 62%);color:#f4efe4;font-family:Montserrat;position:relative;overflow:hidden}
body::after{content:"";position:absolute;inset:28px;border:1.5px solid ${G};opacity:.5}
.top{position:absolute;top:90px;left:0;right:0;text-align:center}
.nn{font-family:'Playfair Display';font-size:110px;color:${G};line-height:.9}.sel{letter-spacing:.45em;font-size:26px;margin-top:10px;padding-left:.45em}
.mid{position:absolute;top:500px;left:0;right:0;text-align:center}
.k{color:${G};letter-spacing:.3em;font-weight:600;font-size:26px}
.h{font-family:'Cormorant Garamond';font-weight:700;font-size:120px;line-height:1;margin-top:20px}
.d{font-size:34px;margin-top:26px;font-weight:600}.v{font-size:26px;color:#cfc8b8;margin-top:10px}
.line{width:520px;height:1.5px;background:${G};margin:56px auto}
.t{font-family:'Cormorant Garamond';font-size:46px;line-height:1.35}
.f{position:absolute;bottom:80px;left:0;right:0;text-align:center;color:${G};font-size:26px;letter-spacing:.08em}
</style></head><body>
<div class="top"><div class="nn">99</div><div class="sel">SELECTION</div></div>
<div class="mid"><div class="k">NEW OPENING · COMING SOON</div><div class="h" style="font-size:104px">Mandarin Oriental<br>Maldives</div>
<div class="d">Bolidhuffaru Reef · South Malé Atoll</div><div class="v">The brand's first resort in the Maldives</div>
<div class="line"></div><div class="t">Around 120 overwater &amp; beach villas<br>A short boat ride from Malé</div></div>
<div class="f">99selection.com</div></body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1200,height:1500}});await p.setContent(html,{waitUntil:"networkidle"});await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:path.join(__dirname,"mandarin-oriental-maldives.png")});await b.close()})();
