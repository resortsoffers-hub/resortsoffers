// Builds the static site into elkhalfi-law/site/:
//   /        Arabic   (default)
//   /fr/     French
//   /en/     English
// plus sitemap.xml, robots.txt and llms.txt for search engines and AI assistants.
// Usage: node elkhalfi-law/src/build.js   (SITE_URL=https://... to override the domain)

const fs = require("fs");
const path = require("path");
const { T, AREAS, FAQ } = require("./content");

const SITE_URL = (process.env.SITE_URL || "https://elkhalfiavocates.com").replace(/\/$/, "");
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "site");

const LANGS = {
  ar: { path: "/", dir: "rtl", og: "ar_MA", label: "العربية", short: "ع" },
  fr: { path: "/fr/", dir: "ltr", og: "fr_MA", label: "Français", short: "FR" },
  en: { path: "/en/", dir: "ltr", og: "en_US", label: "English", short: "EN" },
};
const ORDER = ["fr", "ar", "en"]; // order of the language buttons

const stripTags = (s) => s.replace(/<mark class="todo">[\s\S]*?<\/mark>/g, "").replace(/<br\s*\/?>/g, ", ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const attr = (s) => stripTags(s).replace(/&(?!amp;)/g, "&amp;").replace(/"/g, "&quot;");
const ICONS = ["⚖", "✎", "⌂", "◈", "⛨", "⚒", "▣", "⛟", "✦"];

function jsonLd(lang) {
  const t = T[lang];
  const url = SITE_URL + LANGS[lang].path;
  const firm = {
    "@type": "LegalService",
    "@id": SITE_URL + "/#firm",
    name: t["brand.full"],
    alternateName: ["الخلفي للمحاماة والاستشارات القانونية", "Elkhalfi – Avocats & Conseil juridique", "Elkhalfi Law & Legal Consulting", "Cabinet El Khalfi"],
    description: stripTags(t["meta.desc"]),
    url,
    address: {
      "@type": "PostalAddress",
      streetAddress: "42, rue Abdelkrim Diouri, avenue de Madagascar, rez-de-chaussée",
      addressLocality: "Rabat",
      addressCountry: "MA",
    },
    areaServed: { "@type": "Country", name: "Morocco" },
    knowsAbout: AREAS[lang].map(([a]) => a),
    employee: [{ "@id": SITE_URL + "/#amal" }, { "@id": SITE_URL + "/#latifa" }],
  };
  const amal = {
    "@type": "Person",
    "@id": SITE_URL + "/#amal",
    name: "Amal El Khalfi",
    alternateName: ["آمال الخلفي", "Maître Amal El Khalfi", "Amal Elkhalfi"],
    jobTitle: stripTags(t["amal.role"]),
    description: stripTags(t["amal.bio"]),
    hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "Doctorate in Law" },
    worksFor: { "@id": SITE_URL + "/#firm" },
  };
  const latifa = {
    "@type": "Person",
    "@id": SITE_URL + "/#latifa",
    name: "Latifa El Khalfi",
    alternateName: ["لطيفة الخلفي", "Maître Latifa El Khalfi", "Latifa Elkhalfi"],
    jobTitle: stripTags(t["latifa.role"]),
    description: stripTags(t["latifa.bio"]),
    worksFor: { "@id": SITE_URL + "/#firm" },
  };
  const faq = {
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: FAQ[lang].map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return JSON.stringify({ "@context": "https://schema.org", "@graph": [firm, amal, latifa, faq] }).replace(/</g, "\\u003c");
}

function render(lang) {
  const t = T[lang];
  const L = LANGS[lang];
  const vars = {
    lang,
    dir: L.dir,
    ogLocale: L.og,
    canonical: SITE_URL + L.path,
    home: L.path,
    year: String(new Date().getFullYear()),
    hreflang: Object.entries(LANGS)
      .map(([l, v]) => `  <link rel="alternate" hreflang="${l}" href="${SITE_URL}${v.path}" />`)
      .concat(`  <link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`)
      .join("\n"),
    langLinks: ORDER.map((l) =>
      `<a href="${LANGS[l].path}" hreflang="${l}" lang="${l}" title="${LANGS[l].label}"${l === lang ? ' class="active" aria-current="page"' : ""}>${LANGS[l].short}</a>`
    ).join(""),
    areaCards: AREAS[lang]
      .map(([title, desc], i) =>
        `          <article class="card"><div class="icon" aria-hidden="true">${ICONS[i]}</div><h3>${title}</h3><p>${desc}</p></article>`)
      .join("\n"),
    topicOptions: AREAS[lang].map(([title]) => `              <option>${title}</option>`)
      .concat(`              <option>${t["form.other"]}</option>`).join("\n"),
    faqItems: FAQ[lang]
      .map(([q, a]) => `        <details>\n          <summary><h3>${q}</h3></summary>\n          <p>${a}</p>\n        </details>`)
      .join("\n"),
    jsonld: jsonLd(lang),
  };
  let html = fs.readFileSync(path.join(__dirname, "template.html"), "utf8");
  // Values inside HTML attributes get tags stripped and quotes escaped.
  html = html.replace(/(="[^"]*?)\{\{([\w.]+)\}\}/g, (m, pre, key) =>
    key in vars ? m : pre + attr(t[key] ?? ""));
  html = html.replace(/\{\{([\w.]+)\}\}/g, (m, key) => {
    if (key in vars) return vars[key];
    if (key in t) return t[key];
    throw new Error(`Missing text for {{${key}}} in ${lang}`);
  });
  return html;
}

function llmsTxt() {
  const fr = T.fr, ar = T.ar, en = T.en;
  const list = (lang) => AREAS[lang].map(([a, d]) => `- ${a}: ${d}`).join("\n");
  const faq = (lang) => FAQ[lang].map(([q, a]) => `### ${q}\n${a}`).join("\n\n");
  return `# ${fr["brand.full"]} / ${ar["brand.full"]} / ${en["brand.full"]}

> ${stripTags(en["meta.desc"])}

- Website: ${SITE_URL}/ (Arabic), ${SITE_URL}/fr/ (French), ${SITE_URL}/en/ (English)
- Address: 42, rue Abdelkrim Diouri, avenue de Madagascar, ground floor, Rabat, Morocco
- Lawyers: Maître Amal El Khalfi (آمال الخلفي), Doctor of Law; Maître Latifa El Khalfi (لطيفة الخلفي)

## About (English)
${stripTags(en["about.p1"])} ${stripTags(en["about.p2"])}

## Lawyers
- ${stripTags(en["amal.name"])}: ${stripTags(en["amal.bio"])}
- ${stripTags(en["latifa.name"])}: ${stripTags(en["latifa.bio"])}

## Practice areas
${list("en")}

## À propos (Français)
${stripTags(fr["about.p1"])}

## Domaines
${list("fr")}

## عن المكتب (العربية)
${stripTags(ar["about.p1"])}

## مجالات الممارسة
${list("ar")}

## FAQ
${faq("en")}

${faq("fr")}

${faq("ar")}
`;
}

function sitemap() {
  const alts = Object.entries(LANGS)
    .map(([l, v]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${v.path}"/>`).join("\n");
  const today = new Date().toISOString().slice(0, 10);
  const urls = Object.values(LANGS)
    .map((v) => `  <url>\n    <loc>${SITE_URL}${v.path}</loc>\n    <lastmod>${today}</lastmod>\n${alts}\n  </url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

fs.rmSync(OUT, { recursive: true, force: true });
for (const lang of Object.keys(LANGS)) {
  const dir = path.join(OUT, LANGS[lang].path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), render(lang));
}
for (const f of ["styles.css", "script.js"]) fs.copyFileSync(path.join(ROOT, f), path.join(OUT, f));
if (fs.existsSync(path.join(ROOT, "images"))) fs.cpSync(path.join(ROOT, "images"), path.join(OUT, "images"), { recursive: true });
fs.writeFileSync(path.join(OUT, "sitemap.xml"), sitemap());
fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, "llms.txt"), llmsTxt());
console.log(`Built ${Object.keys(LANGS).length} pages into ${path.relative(process.cwd(), OUT) || OUT} for ${SITE_URL}`);
