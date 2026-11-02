// Renders the launch posts as 1080x1350 PNG images (Instagram / Facebook portrait).
// Usage: node elkhalfi-law/social/make-posts.js
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const OUT = path.join(__dirname, "posts");
const HANDLE = "@elkhalfiavocats";
const SITE = "elkhalfiavocats.com";

const css = `
* { margin: 0; padding: 0; box-sizing: border-box; }
body { width: 1080px; height: 1350px; font-family: "Tajawal", sans-serif; direction: rtl; }
.post { width: 1080px; height: 1350px; position: relative; overflow: hidden; display: flex; flex-direction: column;
  padding: 90px 90px 70px; background: linear-gradient(160deg, #1d3152 0%, #14233c 55%, #0e1a2e 100%); color: #fff; }
.post.light { background: #f8f5ef; color: #14233c; }
.post::before { content: ""; position: absolute; inset: 36px; border: 2px solid rgba(184,148,90,.55); border-radius: 6px; pointer-events: none; }
.post.light::before { border-color: rgba(184,148,90,.7); }
.glow { position: absolute; width: 700px; height: 700px; border-radius: 50%; left: -260px; bottom: -260px;
  background: radial-gradient(circle, rgba(184,148,90,.35), transparent 65%); }
.top { display: flex; align-items: center; gap: 22px; position: relative; }
.mark { width: 84px; height: 84px; border-radius: 50%; background: #b8945a; color: #14233c; display: grid; place-items: center;
  font-family: "Cormorant Garamond", serif; font-size: 52px; font-weight: 700; }
.light .mark { background: #14233c; color: #e9dcc4; }
.brand { font-family: "Amiri", serif; font-size: 46px; font-weight: 700; line-height: 1.3; }
.brand small { display: block; font-family: "Tajawal"; font-size: 26px; font-weight: 500; color: #b8945a; margin-top: 10px; }
.body { flex: 1; display: flex; flex-direction: column; justify-content: center; position: relative; }
.kicker { color: #b8945a; font-size: 34px; font-weight: 700; margin-bottom: 26px; }
h1 { font-family: "Amiri", serif; font-size: 96px; line-height: 1.35; font-weight: 700; margin-bottom: 30px; }
h1.md { font-size: 76px; }
p.lead { font-size: 38px; line-height: 1.7; color: #d6dce6; }
.light p.lead { color: #3d4757; }
ul { list-style: none; display: grid; gap: 22px; margin-top: 10px; }
li { font-size: 38px; line-height: 1.5; padding-right: 46px; position: relative; }
li::before { content: ""; position: absolute; right: 0; top: 20px; width: 18px; height: 18px; border-radius: 50%; background: #b8945a; }
ul.grid { grid-template-columns: 1fr 1fr; gap: 26px 40px; }
ul.grid li { font-size: 36px; }
ol { list-style: none; counter-reset: n; display: grid; gap: 26px; }
ol li { padding-right: 90px; }
ol li::before { counter-increment: n; content: counter(n); width: 64px; height: 64px; top: 0; background: #b8945a; color: #14233c;
  display: grid; place-items: center; font-weight: 700; font-size: 34px; }
.avatar { width: 230px; height: 280px; border-radius: 10px; background: linear-gradient(160deg, #b8945a, #8a6c3c); color: #14233c;
  display: grid; place-items: center; font-family: "Cormorant Garamond", serif; font-size: 96px; font-weight: 700; margin-bottom: 40px; }
.role { color: #b8945a; font-size: 40px; font-weight: 700; margin-bottom: 30px; }
.note { font-size: 26px; color: #9aa6b8; margin-top: 30px; }
.light .note { color: #6b7686; }
.foot { display: flex; justify-content: space-between; align-items: center; font-size: 30px; font-weight: 500; color: #e9dcc4;
  border-top: 2px solid rgba(184,148,90,.5); padding-top: 28px; position: relative; direction: ltr; }
.light .foot { color: #14233c; }
.pin { font-size: 120px; line-height: 1; margin-bottom: 20px; }
`;

const top = `<div class="top"><div class="mark">E</div><div class="brand">الخلفي<small>للمحاماة والاستشارات القانونية</small></div></div>`;
const foot = `<div class="foot"><span>${SITE}</span><span>${HANDLE}</span></div>`;
const wrap = (inner, light = false) => `<div class="post${light ? " light" : ""}">${light ? "" : '<div class="glow"></div>'}${top}<div class="body">${inner}</div>${foot}</div>`;

const posts = [
  ["01-launch", wrap(`
    <p class="kicker">محاماة واستشارات قانونية · الرباط</p>
    <h1>استشارة ودفاع،<br>بدقة وإنصات.</h1>
    <p class="lead">الأستاذة أمل الخلفي والأستاذة لطيفة الخلفي، محاميتان بالرباط، في خدمة الأفراد والأسر والمقاولات في جميع أنواع القضايا.</p>`)],
  ["02-amal", wrap(`
    <div class="avatar">AE</div>
    <h1 class="md">الأستاذة أمل الخلفي</h1>
    <p class="role">محامية · دكتورة في القانون</p>
    <ul>
      <li>دكتوراه في القانون: «التضامن في الالتزامات في القانون المغربي»</li>
      <li>أكثر من عشر سنوات من الخبرة القانونية</li>
      <li>جميع أنواع القضايا: الأسرة، المدني، العقاري، التجاري، الجنائي</li>
    </ul>`)],
  ["03-latifa", wrap(`
    <div class="avatar">LE</div>
    <h1 class="md">الأستاذة لطيفة الخلفي</h1>
    <p class="role">محامية</p>
    <ul>
      <li>محامية بالرباط</li>
      <li>جميع أنواع القضايا: الأسرة، المدني، العقاري، التجاري، الجنائي، الشغل</li>
      <li>إنصات، وضوح، ومتابعة دقيقة لكل ملف</li>
    </ul>`)],
  ["04-areas", wrap(`
    <p class="kicker">مجالات الممارسة</p>
    <h1 class="md">مكتب محاماة في الرباط<br>لجميع أنواع القضايا</h1>
    <ul class="grid">
      <li>قضايا الأسرة</li><li>القضايا المدنية</li>
      <li>القضايا العقارية</li><li>القضايا التجارية</li>
      <li>القضايا الجنائية</li><li>قضايا الشغل</li>
      <li>القضايا الإدارية</li><li>حوادث السير والتأمين</li>
      <li>الاستشارة القانونية</li>
    </ul>`, true)],
  ["05-custody", wrap(`
    <p class="kicker">معلومة قانونية · مدونة الأسرة</p>
    <h1 class="md">لمن تُسند حضانة الأطفال بعد الطلاق؟</h1>
    <ol>
      <li>للأم</li>
      <li>ثم للأب</li>
      <li>ثم لأم الأم</li>
    </ol>
    <p class="lead" style="margin-top:34px">مع مراعاة مصلحة الطفل دائماً. وعند بلوغ <b>15 سنة</b> يحق للطفل أن يختار من يحضنه.</p>
    <p class="note">معلومة عامة، لا تغني عن استشارة قانونية في وضعيتكم الخاصة.</p>`)],
  ["06-divorce", wrap(`
    <p class="kicker">معلومة قانونية · مدونة الأسرة</p>
    <h1 class="md">طرق إنهاء العلاقة الزوجية في المغرب</h1>
    <ol>
      <li>الطلاق تحت مراقبة القضاء</li>
      <li>الطلاق الاتفاقي</li>
      <li>الطلاق بالخلع</li>
      <li>التطليق للشقاق</li>
      <li>التطليق لأسباب أخرى (الضرر، عدم الإنفاق، الغيبة…)</li>
    </ol>
    <p class="note">معلومة عامة، لا تغني عن استشارة قانونية في وضعيتكم الخاصة.</p>`, true)],
  ["07-address", wrap(`
    <div class="pin">📍</div>
    <p class="kicker">عنوان المكتب</p>
    <h1 class="md">الرباط</h1>
    <p class="lead">شارع مدغشقر، زنقة عبد الكريم الديوري<br>رقم 42، الطابق الأرضي</p>
    <p class="lead" style="margin-top:30px;color:#e9dcc4">لحجز موعد: ${SITE}</p>`)],
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [name, body] of posts) {
    await page.setContent(`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:wght@700&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
      <style>${css}</style></head><body>${body}</body></html>`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, `${name}.png`) });
    console.log("wrote", name);
  }
  await browser.close();
})();
