# Gionora Holidays (gionora.com)

Static copy of the site that was built on Lovable, so it can run on our Namecheap hosting.

- `mirror.cjs` — renders every page of the live site and saves HTML + images (no app scripts, no Lovable badge).
- `fix.cjs` — makes the destination buttons work without the old app; adds `.htaccess`.
- `site/` — the website that is uploaded to `gionora.com/` on Namecheap by `.github/workflows/gionora-deploy.yml`.

Edits from now on are made directly in `site/` (or ask Claude).
