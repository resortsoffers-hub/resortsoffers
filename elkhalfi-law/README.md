# Elkhalfi – Avocats & Conseil juridique (الخلفي للمحاماة والاستشارات القانونية)

Static website for Maître Amal El Khalfi and Maître Latifa El Khalfi, Rabat.

- `src/content.js`: all text in Arabic, French and English. `todo("...")` marks details still to confirm (shown in yellow).
- `src/template.html`: page layout.
- `styles.css`, `script.js`: design and contact form.
- Build: `node src/build.js` → `site/` with `/` (Arabic), `/fr/`, `/en/`, plus `sitemap.xml`, `robots.txt`, `llms.txt`.
- Domain: set `SITE_URL` (default `https://elkhalfiavocats.com`).
