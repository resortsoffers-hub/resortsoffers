// Gionora Holidays – logo with symbol. 3 marks: A) sun over horizon in arch, B) G monogram with horizon, C) seal.
const path=require("path");const {chromium}=require("playwright");
const SAND="#b8915a", INK="#1f2a33", SEA="#2f7f95", IVORY="#faf7f0";
const markA=(c,s=200)=>`<svg width="${s}" height="${s}" viewBox="0 0 100 100" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round">
 <path d="M22 92 V48 A28 28 0 0 1 78 48 V92"/><circle cx="50" cy="56" r="10"/><line x1="22" y1="70" x2="78" y2="70"/>
 <path d="M30 78 Q36 74 42 78 T54 78 T66 78 T72 78" stroke-width="1.8"/><path d="M34 86 Q40 82 46 86 T58 86 T66 86" stroke-width="1.8"/></svg>`;
const markB=(c,s=200)=>`<svg width="${s}" height="${s}" viewBox="0 0 100 100" fill="none" stroke="${c}" stroke-linecap="round">
 <circle cx="50" cy="50" r="44" stroke-width="1.6"/><path d="M70 34 A26 26 0 1 0 74 58 H52" stroke-width="5"/>
 <path d="M28 66 Q35 62 42 66 T56 66 T70 66" stroke-width="1.8"/></svg>`;
const markC=(c,s=200)=>`<svg width="${s}" height="${s}" viewBox="0 0 100 100" fill="none" stroke="${c}" stroke-linecap="round">
 <circle cx="50" cy="50" r="46" stroke-width="1.4"/><circle cx="50" cy="50" r="40" stroke-width="0.8"/>
 <circle cx="50" cy="44" r="11" stroke-width="2.2"/><line x1="24" y1="58" x2="76" y2="58" stroke-width="2.2"/>
 <path d="M30 66 Q36 62 42 66 T54 66 T66 66 T70 66" stroke-width="1.6"/><path d="M36 73 Q42 69 48 73 T60 73 T64 73" stroke-width="1.6"/></svg>`;
const word=(fg,sub,size)=>`<div style="font-family:'Cormorant Garamond';font-weight:500;font-size:${size}px;color:${fg};line-height:1">Gionora</div><div style="font-family:'Instrument Sans';font-weight:600;font-size:${size*0.19}px;letter-spacing:.34em;color:${sub};margin-top:${size*0.13}px;padding-left:.34em">HOLIDAYS</div>`;
const head=`<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&family=Instrument+Sans:wght@600&display=swap" rel="stylesheet"><style>*{margin:0}body{display:flex;align-items:center;justify-content:center;flex-direction:column}</style>`;
const files=[
 ["options.png",1800,700,IVORY,`<div style="display:flex;gap:120px;align-items:center">${[markA,markB,markC].map((m,i)=>`<div style="text-align:center">${m(i===1?INK:SAND,220)}<div style="margin-top:20px">${word(INK,"#6b6660",64)}</div><div style="font-family:'Instrument Sans';margin-top:22px;color:${SEA};font-weight:600">${"ABC"[i]}</div></div>`).join("")}</div>`],
 ["gionora-logo-A-light.png",2000,1200,IVORY,`${markA(SAND,360)}<div style="margin-top:40px;text-align:center">${word(INK,"#6b6660",220)}</div>`],
 ["gionora-logo-A-dark.png",2000,1200,INK,`${markA(SAND,360)}<div style="margin-top:40px;text-align:center">${word(IVORY,"#d8cfbf",220)}</div>`],
 ["gionora-logo-A-horizontal.png",2400,700,IVORY,`<div style="display:flex;align-items:center;gap:70px">${markA(SAND,380)}<div>${word(INK,"#6b6660",230)}</div></div>`],
 ["gionora-profile-A.png",1080,1080,INK,`${markA(SAND,560)}`],
];
(async()=>{const b=await chromium.launch();for(const [f,w,h,bg,body] of files){const p=await b.newPage({viewport:{width:w,height:h}});await p.setContent(`<html><head>${head}</head><body style="width:${w}px;height:${h}px;background:${bg}">${body}</body></html>`,{waitUntil:"networkidle"});await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:path.join(__dirname,f)});await p.close();}
 require("fs").writeFileSync(path.join(__dirname,"gionora-mark-A.svg"),markA(SAND,512).replace("<svg ",'<svg xmlns="http://www.w3.org/2000/svg" '));await b.close()})();
