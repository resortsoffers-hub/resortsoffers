// Static mirror of gionora.com (leaving Lovable): renders each page, saves HTML without app scripts or Lovable badge,
// and downloads CSS, fonts and images so the site runs on any normal hosting.
// Usage: NODE_PATH=$(npm root -g) node gionora/mirror.cjs
const fs=require("fs"),path=require("path");const {chromium}=require("playwright");
const ORIGIN="https://gionora.com", OUT=path.join(__dirname,"site");
const assets=new Set();
async function save(url){ // download one asset keeping its path
  const u=new URL(url,ORIGIN); if(u.origin!==ORIGIN) return; const dest=path.join(OUT,decodeURIComponent(u.pathname));
  if(fs.existsSync(dest)) return; const r=await fetch(u.href); if(!r.ok) return;
  fs.mkdirSync(path.dirname(dest),{recursive:true}); fs.writeFileSync(dest,Buffer.from(await r.arrayBuffer()));
}
(async()=>{
  fs.rmSync(OUT,{recursive:true,force:true}); fs.mkdirSync(OUT,{recursive:true});
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1280,height:900}});
  p.on("response",r=>{const u=r.url(); if(u.startsWith(ORIGIN)&&/\.(css|woff2?|ttf|jpe?g|png|webp|svg|ico|avif|gif)(\?|$)/i.test(u)) assets.add(u.split("?")[0]);});
  const queue=["/"], seen=new Set();
  while(queue.length){
    const route=queue.shift(); if(seen.has(route)) continue; seen.add(route);
    await p.goto(ORIGIN+route,{waitUntil:"networkidle",timeout:60000});
    await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}});
    await p.waitForTimeout(800);
    const links=await p.evaluate(()=>[...document.querySelectorAll("a[href^='/']")].map(a=>a.getAttribute("href").split("#")[0]));
    for(const l of links) if(l && !seen.has(l) && !/\.\w+$/.test(l)) queue.push(l);
    const html=await p.evaluate(()=>{
      document.querySelectorAll("script, link[rel=modulepreload], link[as=script]").forEach(e=>e.remove());
      document.querySelectorAll('a[href*="lovable.dev"], [id*=lovable i], [class*=lovable i], style:not([data-keep])').forEach(e=>{if(e.tagName!=="STYLE"||/lovable/i.test(e.textContent))e.remove();});document.querySelectorAll("x").forEach(e=>e.remove());
      document.querySelectorAll("img").forEach(i=>{i.removeAttribute("loading");if(i.currentSrc){const u=new URL(i.currentSrc);i.src=u.origin===location.origin?u.pathname:u.href;}i.removeAttribute("srcset");});
      document.querySelectorAll('meta[content*="lovable"]').forEach(m=>m.remove());
      return "<!DOCTYPE html>\n"+document.documentElement.outerHTML;
    });
    const file=route==="/"?"index.html":path.join(route.replace(/^\//,""),"index.html");
    fs.mkdirSync(path.dirname(path.join(OUT,file)),{recursive:true}); fs.writeFileSync(path.join(OUT,file),html);
    console.log("page",route);
  }
  await b.close();
  for(const a of assets) await save(a);
  // fonts referenced from CSS files
  for(const f of fs.readdirSync(path.join(OUT,"assets")).filter(f=>f.endsWith(".css"))){
    const css=fs.readFileSync(path.join(OUT,"assets",f),"utf8");
    for(const m of css.matchAll(/url\((['"]?)(\/[^)'"]+)\1\)/g)) await save(m[2]);
  }
  for(const f of ["/favicon.ico","/robots.txt"]) await save(f);
  console.log("pages",seen.size,"assets",assets.size);
})();
