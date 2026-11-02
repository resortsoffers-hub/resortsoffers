// Firm email for the contact form. Update once the domain and mailbox exist.
const FIRM_EMAIL = "contact@elkhalfiavocates.com";

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
// Text for each language comes from data- attributes on the form.
const form = document.getElementById("contact-form");
const status = form.querySelector(".form-status");
const t = form.dataset;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll("[required]").forEach((el) => {
    const ok = el.type === "checkbox" ? el.checked : el.value.trim() !== "" && el.checkValidity();
    el.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    status.textContent = t.err;
    status.className = "form-status err";
    return;
  }
  const d = Object.fromEntries(new FormData(form));
  const body = `${t.lName}: ${d.name}\n${t.lEmail}: ${d.email}\n${t.lPhone}: ${d.phone || "-"}\n${t.lTopic}: ${d.topic}\n\n${d.message}`;
  window.location.href = `mailto:${FIRM_EMAIL}?subject=${encodeURIComponent(t.subject + " – " + d.topic)}&body=${encodeURIComponent(body)}`;
  status.textContent = t.ok;
  status.className = "form-status ok";
});
