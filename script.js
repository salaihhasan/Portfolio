// Run all functions once the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupTheme();
  setupNavHighlight();
  renderSkills();
  renderProjects();
  setupValidation();
});

// 1. Mobile Menu Hamburger Toggle
function setupMobileMenu() {
  const menuBtn = document.getElementById("hamburger-menu");
  const menuIcon = document.getElementById("hamburger-icon");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
    if (navMenu.classList.contains("show-menu")) {
      menuIcon.className = "fa-solid fa-xmark";
    } else {
      menuIcon.className = "fa-solid fa-bars";
    }
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
      menuIcon.className = "fa-solid fa-bars";
    });
  });
}

// 2. Active Menu Link Highlighting on Scroll
function setupNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function highlight() {
    let current = "";
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 90;
      if (scrollY >= sectionTop) {
        current = sec.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active-link");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active-link");
      }
    });
  }

  window.addEventListener("scroll", highlight);
  highlight();
}

// 3. Theme Toggle (Light & Dark Mode) with LocalStorage
function setupTheme() {
  const toggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const savedTheme = localStorage.getItem("theme") || "light";

  // Set initial theme
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeIcon.className = "fa-solid fa-sun";
  } else {
    document.body.classList.remove("dark-theme");
    themeIcon.className = "fa-solid fa-moon";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    
    if (document.body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
      themeIcon.className = "fa-solid fa-sun";
    } else {
      localStorage.setItem("theme", "light");
      themeIcon.className = "fa-solid fa-moon";
    }
  });
}

// 4. Dynamic Skills Rendering
const skills = ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Java", "SQL", "Git", "GitHub", "VS Code"];

const skillIcons = {
  "HTML5": "fa-brands fa-html5",
  "CSS3": "fa-brands fa-css3-alt",
  "JavaScript": "fa-brands fa-js",
  "Bootstrap": "fa-brands fa-bootstrap",
  "Java": "fa-brands fa-java",
  "SQL": "fa-solid fa-database",
  "Git": "fa-brands fa-git-alt",
  "GitHub": "fa-brands fa-github",
  "VS Code": "fa-solid fa-code"
};

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;
  grid.innerHTML = "";

  skills.forEach(name => {
    const card = document.createElement("div");
    card.className = "skill-card";

    const icon = document.createElement("i");
    const iconClass = skillIcons[name] || "fa-solid fa-code";
    iconClass.split(" ").forEach(c => icon.classList.add(c));
    icon.classList.add("skill-icon");

    const span = document.createElement("span");
    span.className = "skill-name";
    span.textContent = name;

    card.appendChild(icon);
    card.appendChild(span);
    grid.appendChild(card);
  });
}

// 5. Dynamic Projects Rendering
const projects = [
  {
    title: "Amazon Inspired Ecommerce",
    description: "Responsive ecommerce frontend using HTML, CSS, JavaScript, Bootstrap and Fake Store API.",
    tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "API"]
  },
  {
    title: "Gym Dashboard",
    description: "Responsive dashboard built using HTML, CSS, JavaScript and Bootstrap.",
    tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap"]
  }
];

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  grid.innerHTML = "";

  projects.forEach(proj => {
    const card = document.createElement("div");
    card.className = "project-card";

    const info = document.createElement("div");
    info.className = "project-info";

    const title = document.createElement("h3");
    title.className = "project-title";
    title.textContent = proj.title;

    const desc = document.createElement("p");
    desc.className = "project-desc";
    desc.textContent = proj.description;

    const tags = document.createElement("div");
    tags.className = "project-tags";
    proj.tags.forEach(t => {
      const tagSpan = document.createElement("span");
      tagSpan.className = "tech-tag";
      tagSpan.textContent = t;
      tags.appendChild(tagSpan);
    });

    const links = document.createElement("div");
    links.className = "project-links";
    links.innerHTML = `
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><i class="fa-brands fa-github"></i> GitHub</a>
      <a href="https://demo.com" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a>
    `;

    info.appendChild(title);
    info.appendChild(desc);
    info.appendChild(tags);
    info.appendChild(links);
    card.appendChild(info);
    grid.appendChild(card);
  });
}

// 6. Contact Form Validation
function setupValidation() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  function validateName() {
    const val = nameInput.value.trim();
    if (!val) {
      nameError.textContent = "Name is required.";
      nameInput.classList.add("input-error");
      return false;
    }
    if (val.length < 2) {
      nameError.textContent = "Name must be at least 2 characters.";
      nameInput.classList.add("input-error");
      return false;
    }
    nameError.textContent = "";
    nameInput.classList.remove("input-error");
    return true;
  }

  function validateEmail() {
    const val = emailInput.value.trim();
    if (!val) {
      emailError.textContent = "Email address is required.";
      emailInput.classList.add("input-error");
      return false;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) {
      emailError.textContent = "Please enter a valid email address.";
      emailInput.classList.add("input-error");
      return false;
    }
    emailError.textContent = "";
    emailInput.classList.remove("input-error");
    return true;
  }

  function validateMessage() {
    const val = messageInput.value.trim();
    if (!val) {
      messageError.textContent = "Message is required.";
      messageInput.classList.add("input-error");
      return false;
    }
    if (val.length < 10) {
      messageError.textContent = "Message must be at least 10 characters.";
      messageInput.classList.add("input-error");
      return false;
    }
    messageError.textContent = "";
    messageInput.classList.remove("input-error");
    return true;
  }

  // Real-time error clearing
  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  messageInput.addEventListener("input", validateMessage);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMsgValid = validateMessage();

    if (isNameValid && isEmailValid && isMsgValid) {
      alert("Thank you, " + nameInput.value.trim() + "! Your message has been sent successfully.");
      form.reset();
    }
  });
}
