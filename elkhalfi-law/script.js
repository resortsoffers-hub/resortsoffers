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

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form: validates, then opens the visitor's email app with the message filled in.
// To receive submissions directly instead, connect a form service (e.g. Formspree) and POST to it here.
const FIRM_EMAIL = "contact@elkhalfi-law.com";
const form = document.getElementById("contact-form");
const status = form.querySelector(".form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll("[required]").forEach((el) => {
    const ok = el.type === "checkbox" ? el.checked : el.value.trim() !== "" && el.checkValidity();
    el.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    status.textContent = "Please complete the required fields.";
    status.className = "form-status err";
    return;
  }
  const d = Object.fromEntries(new FormData(form));
  const body = `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone || "-"}\nMatter: ${d.topic}\n\n${d.message}`;
  window.location.href = `mailto:${FIRM_EMAIL}?subject=${encodeURIComponent("Consultation request: " + d.topic)}&body=${encodeURIComponent(body)}`;
  status.textContent = "Thank you. Your email app should open to send your message.";
  status.className = "form-status ok";
});
