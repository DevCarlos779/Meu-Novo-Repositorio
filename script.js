const menu = document.getElementById("mobile-menu");
const navbar = document.getElementById("nav-bar");
const nav_links = document.getElementsByClassName("item-nav");
const focusFlow = document.getElementById("focus-flow");

menu.addEventListener("click", () => {
  const isOpen = navbar.classList.toggle("active");
  menu.setAttribute("aria-expanded", isOpen);
});

Array.from(nav_links).forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    Array.from(nav_links).forEach((l) => l.classList.remove("active-link"));
    link.classList.add("active-link");
  });
});

if (focusFlow) {
  focusFlow.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    window.open("https://focus-flow-mocha.vercel.app", "_blank");
  });
}

// Highlight the nav tab matching the section currently in view
const sections = document.querySelectorAll("main section[id], header + main section, section[id]");
const sectionEls = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        Array.from(nav_links).forEach((link) => {
          link.classList.toggle("active-link", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);

sectionEls.forEach((section) => observer.observe(section));
