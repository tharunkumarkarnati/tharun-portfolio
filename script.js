const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");

const saved = localStorage.getItem("theme");
if (saved === "dark") root.classList.add("dark");

toggle.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav a")];

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
  });
}, {rootMargin: "-35% 0px -55% 0px", threshold: 0});

sections.forEach(section => observer.observe(section));
