// Builds the static site into elkhalfi-law/site/:
//   /        Arabic   (default)
//   /fr/     French
//   /en/     English
// plus sitemap.xml, robots.txt and llms.txt for search engines and AI assistants.
// Usage: node elkhalfi-law/src/build.js   (SITE_URL=https://... to override the domain)

const fs = require("fs");
const path = require("path");
const { T, AREAS, FAQ } = require("./content");
const PAGES = require("./areas");

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
    ...(photoFile("amal") ? { image: `${SITE_URL}/${photoFile("amal")}` } : {}),
    description: stripTags(t["amal.bio"]),
    worksFor: { "@id": SITE_URL + "/#firm" },
  };
  const latifa = {
    "@type": "Person",
    "@id": SITE_URL + "/#latifa",
    name: "Latifa El Khalfi",
    alternateName: ["لطيفة الخلفي", "Maître Latifa El Khalfi", "Latifa Elkhalfi"],
    jobTitle: stripTags(t["latifa.role"]),
    ...(photoFile("latifa") ? { image: `${SITE_URL}/${photoFile("latifa")}` } : {}),
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

// Lawyer photo: drop images/amal.jpg or images/latifa.jpg into elkhalfi-law/ and it is used automatically.
const photoFile = (key) => ["jpg", "jpeg", "png", "webp"].map((e) => `images/${key}.${e}`).find((f) => fs.existsSync(path.join(ROOT, f)));
function photo(key, name, initials) {
  const f = photoFile(key);
  return f
    ? `<img class="avatar avatar-photo" src="/${f}" alt="${stripTags(name)}" width="240" height="300" loading="lazy" />`
    : `<div class="avatar" aria-hidden="true">${initials}</div>`;
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
      .map(([title, desc], i) => {
        const inner = `<div class="icon" aria-hidden="true">${ICONS[i]}</div><h3>${title}</h3><p>${desc}</p>`;
        return PAGES[i] && PAGES[i][lang]
          ? `          <a class="card card-link" href="${areaPath(lang, PAGES[i].slug)}">${inner}<span class="more">${MORE[lang]}</span></a>`
          : `          <article class="card">${inner}</article>`;
      })
      .join("\n"),
    topicOptions: AREAS[lang].map(([title]) => `              <option>${title}</option>`)
      .concat(`              <option>${t["form.other"]}</option>`).join("\n"),
    faqItems: FAQ[lang]
      .map(([q, a]) => `        <details>\n          <summary><h3>${q}</h3></summary>\n          <p>${a}</p>\n        </details>`)
      .join("\n"),
    jsonld: jsonLd(lang),
    amalPhoto: photo("amal", t["amal.name"], "AE"),
    latifaPhoto: photo("latifa", t["latifa.name"], "LE"),
  };
  return fill("template.html", t, vars, lang);
}

function fill(file, t, vars, lang) {
  let html = fs.readFileSync(path.join(__dirname, file), "utf8");
  // Values inside HTML attributes get tags stripped and quotes escaped.
  html = html.replace(/(="[^"]*?)\{\{([\w.]+)\}\}/g, (m, pre, key) =>
    key in vars ? m : pre + attr(t[key] ?? ""));
  html = html.replace(/\{\{([\w.]+)\}\}/g, (m, key) => {
    if (key in vars) return vars[key];
    if (key in t) return t[key];
    throw new Error(`Missing text for {{${key}}} in ${lang} (${file})`);
  });
  return html;
}

// ---------- Practice area pages (Arabic and French) ----------
const AREA_LANGS = ["ar", "fr"];
const MORE = { ar: "اقرأ المزيد ←", fr: "En savoir plus →", en: "" };
const areaPath = (lang, slug) => `${LANGS[lang].path}${slug}/`;
const LABELS = {
  ar: {
    services: "خدماتنا", servicesTitle: "ما نقوم به في هذا المجال", lawyers: "المحاميتان",
    lawyersText: "الأستاذة آمال الخلفي والأستاذة لطيفة الخلفي، محاميتان.",
    faqTitle: "أسئلة شائعة", others: "مجالات أخرى",
    note: "المعلومات الواردة في هذه الصفحة عامة ولا تغني عن استشارة قانونية تراعي وضعيتكم الخاصة.",
  },
  fr: {
    services: "Nos services", servicesTitle: "Ce que nous faisons dans ce domaine", lawyers: "Les avocates",
    lawyersText: "Maître Amal El Khalfi et Maître Latifa El Khalfi, avocates.",
    faqTitle: "Questions fréquentes", others: "Autres domaines",
    note: "Les informations de cette page sont générales et ne remplacent pas une consultation adaptée à votre situation.",
  },
};

function renderArea(lang, page) {
  const t = T[lang], L = LANGS[lang], a = page[lang], url = SITE_URL + areaPath(lang, page.slug);
  const labels = Object.fromEntries(Object.entries(LABELS[lang]).map(([k, v]) => ["L." + k, v]));
  const jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", name: a.name, serviceType: a.name, description: a.desc, url,
        areaServed: { "@type": "City", name: "Rabat" }, provider: { "@id": SITE_URL + "/#firm" } },
      { "@type": "FAQPage", inLanguage: lang, mainEntity: a.faq.map(([q, ans]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: ans } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: t["brand.full"], item: SITE_URL + L.path },
        { "@type": "ListItem", position: 2, name: a.name, item: url } ] },
    ],
  }).replace(/</g, "\\u003c");
  const vars = {
    ...labels, lang, dir: L.dir, ogLocale: L.og, canonical: url, home: L.path, year: String(new Date().getFullYear()),
    pageTitle: attr(a.title), pageDesc: attr(a.desc), h1: a.h1, intro: a.intro, areaName: a.name, jsonld,
    hreflang: AREA_LANGS.map((l) => `  <link rel="alternate" hreflang="${l}" href="${SITE_URL}${areaPath(l, page.slug)}" />`).join("\n"),
    langLinks: ORDER.map((l) => {
      const href = AREA_LANGS.includes(l) ? areaPath(l, page.slug) : LANGS[l].path;
      return `<a href="${href}" hreflang="${l}" lang="${l}" title="${LANGS[l].label}"${l === lang ? ' class="active" aria-current="page"' : ""}>${LANGS[l].short}</a>`;
    }).join(""),
    items: a.items.map((i) => `            <li>${i}</li>`).join("\n"),
    faqItems: a.faq.map(([q, ans]) => `        <details>\n          <summary><h3>${q}</h3></summary>\n          <p>${ans}</p>\n        </details>`).join("\n"),
    others: PAGES.filter((p) => p !== page).map((p) => `          <a href="${areaPath(lang, p.slug)}">${p[lang].name}</a>`).join("\n"),
  };
  return fill("area.html", t, vars, lang);
}

function llmsTxt() {
  const fr = T.fr, ar = T.ar, en = T.en;
  const list = (lang) => AREAS[lang].map(([a, d]) => `- ${a}: ${d}`).join("\n");
  const faq = (lang) => FAQ[lang].map(([q, a]) => `### ${q}\n${a}`).join("\n\n");
  return `# ${fr["brand.full"]} / ${ar["brand.full"]} / ${en["brand.full"]}

> ${stripTags(en["meta.desc"])}

- Website: ${SITE_URL}/ (Arabic), ${SITE_URL}/fr/ (French), ${SITE_URL}/en/ (English)
- Address: 42, rue Abdelkrim Diouri, avenue de Madagascar, ground floor, Rabat, Morocco
- Lawyers: Maître Amal El Khalfi (آمال الخلفي); Maître Latifa El Khalfi (لطيفة الخلفي)

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

## Practice area pages
${PAGES.map((p) => `- ${p.fr.name} / ${p.ar.name}: ${SITE_URL}${areaPath("fr", p.slug)} , ${SITE_URL}${areaPath("ar", p.slug)}\n  ${p.fr.intro}`).join("\n")}

## FAQ
${faq("en")}

${PAGES.map((p) => p.fr.faq.concat(p.ar.faq).map(([q, a]) => `### ${q}\n${a}`).join("\n\n")).join("\n\n")}

${faq("fr")}

${faq("ar")}
`;
}

function sitemap() {
  const alts = Object.entries(LANGS)
    .map(([l, v]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${v.path}"/>`).join("\n");
  const today = new Date().toISOString().slice(0, 10);
  const areaUrls = PAGES.flatMap((p) => {
    const a = AREA_LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${areaPath(l, p.slug)}"/>`).join("\n");
    return AREA_LANGS.map((l) => `  <url>\n    <loc>${SITE_URL}${areaPath(l, p.slug)}</loc>\n    <lastmod>${today}</lastmod>\n${a}\n  </url>`);
  });
  const urls = Object.values(LANGS)
    .map((v) => `  <url>\n    <loc>${SITE_URL}${v.path}</loc>\n    <lastmod>${today}</lastmod>\n${alts}\n  </url>`).concat(areaUrls).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

// Public build hides any line that still holds an unconfirmed detail; DRAFT=1 shows them highlighted.
const DRAFT = process.env.DRAFT === "1";
const publish = (html) => (DRAFT ? html : html.split("\n").filter((l) => !l.includes('mark class="todo"')).join("\n")).replace(/\n\s*<li><\/li>/g, "");
const _write = fs.writeFileSync;
const writePage = (file, html) => _write(file, publish(html));

fs.rmSync(OUT, { recursive: true, force: true });
for (const lang of Object.keys(LANGS)) {
  const dir = path.join(OUT, LANGS[lang].path);
  fs.mkdirSync(dir, { recursive: true });
  writePage(path.join(dir, "index.html"), render(lang));
}
for (const page of PAGES) for (const lang of AREA_LANGS) {
  const dir = path.join(OUT, areaPath(lang, page.slug));
  fs.mkdirSync(dir, { recursive: true });
  writePage(path.join(dir, "index.html"), renderArea(lang, page));
}
for (const f of ["styles.css", "script.js"]) fs.copyFileSync(path.join(ROOT, f), path.join(OUT, f));
if (fs.existsSync(path.join(ROOT, "images"))) fs.cpSync(path.join(ROOT, "images"), path.join(OUT, "images"), { recursive: true });
fs.writeFileSync(path.join(OUT, "sitemap.xml"), sitemap());
fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, "llms.txt"), llmsTxt());
console.log(`Built ${Object.keys(LANGS).length + PAGES.length * AREA_LANGS.length} pages into ${path.relative(process.cwd(), OUT) || OUT} for ${SITE_URL}`);
