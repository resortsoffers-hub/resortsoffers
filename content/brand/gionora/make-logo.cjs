// Gionora Holidays logo, recreated from gionora.com (Cormorant Garamond 500 + Instrument Sans 600).
const path=require("path");const {chromium}=require("playwright");
const page=(bg,fg,sub,w,h,size)=>`<html><head><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&family=Instrument+Sans:wght@600&display=swap" rel="stylesheet"><style>
*{margin:0}body{width:${w}px;height:${h}px;background:${bg};display:flex;flex-direction:column;align-items:center;justify-content:center}
.n{font-family:'Cormorant Garamond';font-weight:500;font-size:${size}px;color:${fg};line-height:1}
.s{font-family:'Instrument Sans';font-weight:600;font-size:${size*0.19}px;letter-spacing:.32em;color:${sub};margin-top:${size*0.12}px;padding-left:.32em}</style></head>
<body><div class="n">Gionora</div><div class="s">HOLIDAYS</div></body></html>`;
const out=[["gionora-logo-light.png","#faf9f6","#2a2621","#6b6660",2000,1000,300],["gionora-logo-dark.png","#1a1815","#faf9f6","#c9c2b6",2000,1000,300],
["gionora-logo-transparent.png","transparent","#2a2621","#6b6660",2000,1000,300],["gionora-profile-1080.png","#faf9f6","#2a2621","#6b6660",1080,1080,230]];
(async()=>{const b=await chromium.launch();for(const [f,bg,fg,sub,w,h,s] of out){const p=await b.newPage({viewport:{width:w,height:h}});await p.setContent(page(bg,fg,sub,w,h,s),{waitUntil:"networkidle"});await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:path.join(__dirname,f),omitBackground:bg==="transparent"});await p.close();}await b.close()})();
