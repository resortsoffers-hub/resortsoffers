// After mirror.cjs: make the home-page destination buttons work without the old app.
// Buttons go to /offers/?d=<Destination>; a tiny script on /offers/ shows only matching offer cards.
const fs=require("fs"),path=require("path");const S=path.join(__dirname,"site");
const home=path.join(S,"index.html");let h=fs.readFileSync(home,"utf8");
h=h.replace(/<button([^>]*)>([\s\S]*?)<\/button>/g,(m,attrs,inner)=>{const t=inner.replace(/<[^>]+>/g,"").trim();
  return /^(Maldives|Seychelles|Mauritius|Bali|Malaysia & Singapore|Malaysia &amp; Singapore|China|Europe|London|Dubai|Abu Dhabi)$/.test(t)
    ? `<a${attrs.replace(/type="[^"]*"/,"")} href="/offers/?d=${encodeURIComponent(t.replace("&amp;","&"))}" style="display:block">${inner}</a>` : m;});
fs.writeFileSync(home,h);
const off=path.join(S,"offers","index.html");let o=fs.readFileSync(off,"utf8");
const js=`<script>(function(){var d=new URLSearchParams(location.search).get("d");if(!d)return;var w=d.split(" ")[0].toLowerCase();
document.querySelectorAll('a[href^="/offers/"]').forEach(function(a){var c=a.closest("article,li")||a;if(c.textContent.toLowerCase().indexOf(w)<0)c.style.display="none";});})();</script>`;
if(!o.includes('get("d")')) o=o.replace("</body>",js+"</body>");fs.writeFileSync(off,o);
// Apache: clean URLs and caching
fs.writeFileSync(path.join(S,".htaccess"),`DirectoryIndex index.html\nErrorDocument 404 /index.html\n<IfModule mod_expires.c>\nExpiresActive On\nExpiresByType image/jpeg "access plus 30 days"\nExpiresByType image/png "access plus 30 days"\nExpiresByType image/webp "access plus 30 days"\nExpiresByType text/css "access plus 7 days"\n</IfModule>\n`);
console.log("fixed");
