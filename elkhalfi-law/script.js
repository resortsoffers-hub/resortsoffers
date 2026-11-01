// Firm email for the contact form. Update once the domain and mailbox exist.
const FIRM_EMAIL = "contact@elkhalfiavocats.com";

const html = document.documentElement;
const form = document.getElementById("contact-form");
const status = form.querySelector(".form-status");
let lang = "fr";

function setLang(l) {
  lang = T[l] ? l : "fr";
  const t = T[lang];
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = t[el.dataset.i18n];
    if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll(".lang button").forEach((b) =>
    b.classList.toggle("active", b.dataset.lang === lang)
  );

  // Practice area cards and form options
  const icons = ["⚖", "✎", "◈", "⌂", "⛨", "⚒", "▣", "✦"];
  document.getElementById("area-cards").innerHTML = AREAS[lang]
    .map(([title, desc], i) =>
      `<article class="card"><div class="icon" aria-hidden="true">${icons[i]}</div><h3>${title}</h3><p>${desc}</p></article>`)
    .join("");
  document.getElementById("topic").innerHTML = AREAS[lang]
    .map(([title]) => `<option>${title}</option>`)
    .concat(`<option>${t["form.other"]}</option>`)
    .join("");

  status.textContent = "";
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

document.querySelectorAll(".lang button").forEach((b) =>
  b.addEventListener("click", () => setLang(b.dataset.lang))
);

let initial = "fr";
try { initial = localStorage.getItem("lang") || ""; } catch (e) {}
if (!initial) {
  const nav = (navigator.language || "fr").slice(0, 2);
  initial = ["fr", "ar", "en"].includes(nav) ? nav : "fr";
}
setLang(initial);

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

document.getElementById("year").textContent = new Date().getFullYear();

// Contact form: validates, then opens the visitor's email app with the message filled in.
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const t = T[lang];
  let valid = true;
  form.querySelectorAll("[required]").forEach((el) => {
    const ok = el.type === "checkbox" ? el.checked : el.value.trim() !== "" && el.checkValidity();
    el.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    status.textContent = t["form.err"];
    status.className = "form-status err";
    return;
  }
  const d = Object.fromEntries(new FormData(form));
  const body = `${t["form.name"]}: ${d.name}\n${t["form.email"]}: ${d.email}\n${t["form.phone"]}: ${d.phone || "-"}\n${t["form.topic"]}: ${d.topic}\n\n${d.message}`;
  window.location.href = `mailto:${FIRM_EMAIL}?subject=${encodeURIComponent(t["form.subject"] + " – " + d.topic)}&body=${encodeURIComponent(body)}`;
  status.textContent = t["form.ok"];
  status.className = "form-status ok";
});
