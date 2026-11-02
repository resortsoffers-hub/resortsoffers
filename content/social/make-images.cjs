// Renders the five 2–6 Nov 2026 post images (1080x1350) into content/social/images/.
// Usage: node content/social/make-images.cjs
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const OUT = path.join(__dirname, "images");

const css = `
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1080px; height:1350px; font-family: Inter, sans-serif; }
.p { width:1080px; height:1350px; position:relative; overflow:hidden; padding:100px 90px; display:flex; flex-direction:column; justify-content:center; color:#fff; }
.p::after { content:""; position:absolute; inset:34px; border:1.5px solid rgba(255,255,255,.35); pointer-events:none; }
.ocean { background: linear-gradient(165deg, #0b3d4f 0%, #0e5a6b 45%, #1f8a8a 100%); }
.night { background: linear-gradient(160deg, #0f1b3d 0%, #1d2f66 55%, #3a2f5c 100%); }
.sand  { background: linear-gradient(170deg, #f6efe3 0%, #efe2cc 100%); color:#1d2a33; }
.sand::after { border-color: rgba(29,42,51,.25); }
.deep  { background: linear-gradient(160deg, #062b3a 0%, #0a4a5c 60%, #0f6f78 100%); }
.glow { position:absolute; border-radius:50%; filter: blur(10px); }
.k { font-size:28px; letter-spacing:.32em; text-transform:uppercase; font-weight:600; color:#e8c98e; }
.sand .k { color:#a07a3c; }
h1 { font-family:'Playfair Display', serif; font-weight:700; line-height:1.05; margin:28px 0 26px; }
.sub { font-size:34px; line-height:1.5; opacity:.92; max-width:860px; }
.rule { width:120px; height:3px; background:#e8c98e; margin:40px 0; }
.sand .rule { background:#a07a3c; }
.list { list-style:none; display:grid; gap:22px; font-size:36px; }
.list li { display:flex; gap:22px; align-items:baseline; }
.list b { font-family:'Playfair Display', serif; color:#e8c98e; font-size:40px; min-width:62px; }
.sand .list b { color:#a07a3c; }
.grid { display:grid; grid-template-columns:1fr 1fr; gap:26px 40px; font-size:33px; }
.grid div { padding-left:28px; position:relative; }
.grid div::before { content:""; position:absolute; left:0; top:15px; width:12px; height:12px; border-radius:50%; background:#e8c98e; }
.foot { position:absolute; left:90px; bottom:80px; font-size:26px; letter-spacing:.12em; opacity:.8; z-index:1; }
.big { font-size:150px; }
.mid { font-size:104px; }
.sm  { font-size:86px; }
.chips { display:flex; flex-wrap:wrap; gap:18px; margin-top:20px; }
.chips span { border:1.5px solid rgba(255,255,255,.55); border-radius:999px; padding:14px 28px; font-size:30px; }
`;

const posts = [
  ["1-wtm-london-2026", `<div class="p night">
    <div class="glow" style="width:700px;height:700px;right:-250px;top:-200px;background:radial-gradient(circle,rgba(232,201,142,.35),transparent 65%)"></div>
    <p class="k">World Travel Market</p>
    <h1 class="big">WTM<br>London<br>2026</h1>
    <div class="rule"></div>
    <p class="sub" style="font-size:44px;font-weight:600">3 – 5 November</p>
    <p class="sub">ExCeL London</p>
    <p class="sub" style="margin-top:50px">Where the global travel industry meets ✈️</p>
    <p class="foot">#WTMLondon2026</p></div>`],
  ["2-four-seasons-2027", `<div class="p ocean">
    <div class="glow" style="width:640px;height:640px;left:-260px;bottom:-240px;background:radial-gradient(circle,rgba(232,201,142,.3),transparent 65%)"></div>
    <p class="k">Four Seasons · New openings</p>
    <h1 class="mid">13 Destinations<br>to Watch in 2027</h1>
    <div class="rule"></div>
    <div class="grid">
      <div>Madinah, Saudi Arabia</div><div>Jeddah, Saudi Arabia</div>
      <div>Zanzibar, Tanzania</div><div>Luxor, Egypt</div>
      <div>Cairo, Egypt</div><div>Beirut, Lebanon</div>
      <div>Berlin, Germany</div><div>Gstaad, Switzerland</div>
      <div>Okinawa, Japan</div><div>Dominican Republic</div>
      <div>Belize</div><div>Jacksonville, Florida</div>
      <div>Santa Barbara, California</div>
    </div>
    <p class="foot">The future of luxury travel</p></div>`],
  ["3-top-20-indian-ocean", `<div class="p sand">
    <p class="k">Readers' Choice Awards 2026</p>
    <h1 class="mid">Top 20 Resorts<br>in the Indian Ocean</h1>
    <p class="sub" style="font-size:30px;opacity:.75">As voted by Condé Nast Traveler readers</p>
    <div class="rule"></div>
    <ul class="list">
      <li><b>01</b>Cheval Blanc Seychelles</li>
      <li><b>02</b>The St. Regis Maldives Vommuli</li>
      <li><b>03</b>Waldorf Astoria Seychelles Platte Island</li>
      <li><b>04</b>Fushifaru Maldives</li>
      <li><b>05</b>The Ritz-Carlton Maldives, Fari Islands</li>
    </ul>
    <p class="foot">Congratulations to every team on the list 👏</p></div>`],
  ["4-maldives-shines", `<div class="p deep">
    <div class="glow" style="width:760px;height:760px;right:-300px;bottom:-300px;background:radial-gradient(circle,rgba(110,220,220,.28),transparent 65%)"></div>
    <p class="k">Indian Ocean Top 20 · 2026</p>
    <h1 class="big" style="font-size:132px">The Maldives<br>Shines</h1>
    <p class="sub">12 Maldives resorts among the Indian Ocean's Top 20</p>
    <div class="chips">
      <span>The St. Regis Vommuli</span><span>Fushifaru</span><span>The Ritz-Carlton Fari Islands</span>
      <span>Niyama</span><span>Velaa Private Island</span><span>Milaidhoo</span><span>Patina Fari Islands</span><span>COMO Cocoa Island</span>
      <span>JOALI</span><span>Anantara Kihavah</span><span>LUX* South Ari Atoll</span><span>.Here Baa Atoll</span>
    </div>
    <p class="foot">One destination · twelve award-winning experiences</p></div>`],
  ["5-wtm-day-1", `<div class="p night" style="background:linear-gradient(160deg,#1a1033 0%,#2b2466 50%,#0f5a6b 100%)">
    <div class="glow" style="width:620px;height:620px;left:-220px;top:-220px;background:radial-gradient(circle,rgba(232,201,142,.32),transparent 65%)"></div>
    <p class="k">WTM London 2026</p>
    <h1 class="big">Day 1</h1>
    <div class="rule"></div>
    <ul class="list" style="font-size:44px;gap:30px">
      <li><b>→</b>New partnerships</li>
      <li><b>→</b>New destinations</li>
      <li><b>→</b>New ideas shaping 2027</li>
    </ul>
    <p class="foot">#WTMLondon2026 · #Networking</p></div>`],
  ["6-meet-nora-wtm", `<div class="p night">
    <div class="glow" style="width:720px;height:720px;right:-260px;top:-220px;background:radial-gradient(circle,rgba(232,201,142,.35),transparent 65%)"></div>
    <p class="k">WTM London 2026 · 3 – 5 November</p>
    <h1 class="mid" style="margin-bottom:10px">Meet us at<br>WTM London</h1>
    <div class="rule"></div>
    <p style="font-family:'Playfair Display',serif;font-size:76px;font-weight:700">Nora El</p>
    <p class="sub" style="font-size:42px;font-weight:600;color:#e8c98e;margin-top:8px">99 Selection</p>
    <p class="sub" style="margin-top:6px">Buyer · United Arab Emirates</p>
    <p class="sub" style="margin-top:46px;font-size:30px;opacity:.85">ExCeL London</p>
    <p class="foot">#WTMLondon2026 · Let's connect</p></div>`],
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [name, body] of posts) {
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
      <style>${css}</style></head><body>${body}</body></html>`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, `${name}.png`) });
    console.log("wrote", name);
  }
  await browser.close();
})();
