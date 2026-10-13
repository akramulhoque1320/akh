const GITHUB = "https://github.com/akramulhoque1320";

const projects = [
  {
    title: "Frontend Portfolio",
    description: "This responsive portfolio site, with dark mode, project filters and form validation, built in vanilla JS.",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "web",
    repo: "frontend-portfolio",
  },
  {
    title: "Python Expense Tracker",
    description: "Command-line expense tracker with categories, monthly summaries, CSV export and unit tests.",
    tags: ["Python", "CLI", "JSON"],
    category: "python",
    repo: "python-expense-tracker",
  },
  {
    title: "Flask E-commerce Shop",
    description: "Online shop with product catalogue, search, session cart and checkout backed by SQLite.",
    tags: ["Python", "Flask", "SQLite"],
    category: "python web",
    repo: "flask-ecommerce",
  },
  {
    title: "Java Library Management",
    description: "Console library system to manage books and members, borrow and return books, and save data to a file.",
    tags: ["Java", "OOP", "Collections"],
    category: "java",
    repo: "java-library-management",
  },
  {
    title: "Django Blog",
    description: "Blog with posts, categories, comments, pagination and the Django admin for content management.",
    tags: ["Python", "Django", "SQLite"],
    category: "python web",
    repo: "django-blog",
  },
];

// Theme toggle (remembers the choice)
const root = document.documentElement;
const themeBtn = document.querySelector(".theme-toggle");

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
}

let savedTheme = null;
try { savedTheme = localStorage.getItem("theme"); } catch (e) { /* storage unavailable */ }
applyTheme(savedTheme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));

themeBtn.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
});

// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") navLinks.classList.remove("open");
});

// Typing effect
const phrases = ["Software Engineer", "Full Stack Developer", "Python · Java · JavaScript"];
const typingEl = document.querySelector(".typing");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const phrase = phrases[phraseIndex];
  charIndex += deleting ? -1 : 1;
  typingEl.textContent = phrase.slice(0, charIndex);

  let delay = deleting ? 45 : 90;
  if (!deleting && charIndex === phrase.length) {
    deleting = true;
    delay = 1400;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 300;
  }
  setTimeout(type, delay);
}
type();

// Projects grid with filters
const grid = document.getElementById("project-grid");

function renderProjects(filter) {
  grid.innerHTML = "";
  projects
    .filter((p) => filter === "all" || p.category.split(" ").includes(filter))
    .forEach((p) => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <h3></h3>
        <p></p>
        <div class="tags">${p.tags.map(() => "<span></span>").join("")}</div>
        <a target="_blank" rel="noopener">View on GitHub →</a>`;
      card.querySelector("h3").textContent = p.title;
      card.querySelector("p").textContent = p.description;
      card.querySelectorAll(".tags span").forEach((el, i) => (el.textContent = p.tags[i]));
      card.querySelector("a").href = `${GITHUB}/${p.repo}`;
      grid.appendChild(card);
    });
}

document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
});
renderProjects("all");

// Reveal sections on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Contact form: validate, then open the visitor's mail app
const form = document.querySelector(".contact-form");
const formMsg = document.querySelector(".form-msg");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { name, email, message } = form.elements;
  const fields = [
    [name, name.value.trim().length >= 2],
    [email, emailPattern.test(email.value.trim())],
    [message, message.value.trim().length >= 10],
  ];

  let valid = true;
  fields.forEach(([field, ok]) => {
    field.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    formMsg.className = "form-msg error";
    formMsg.textContent = "Please enter your name, a valid email and a message of at least 10 characters.";
    return;
  }

  const subject = encodeURIComponent(`Portfolio message from ${name.value.trim()}`);
  const body = encodeURIComponent(`${message.value.trim()}\n\nFrom: ${name.value.trim()} <${email.value.trim()}>`);
  window.location.href = `mailto:ekramul1320@gmail.com?subject=${subject}&body=${body}`;
  formMsg.className = "form-msg ok";
  formMsg.textContent = "Thanks! Your email app should open now.";
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
