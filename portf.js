// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (href.length > 1) {
      e.preventDefault();
      document
        .querySelector(href)
        .scrollIntoView({ behavior: "smooth", block: "start" });
      // close mobile menu when link clicked
      mobileMenu.classList.remove("show");
    }
  });
});

// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", () => mobileMenu.classList.toggle("show"));

// Typing effect
const typingEl = document.getElementById("typing");
const words = [
  "Frontend Engineer",
  "React Developer",
  "UI/UX Enthusiast",
  "Performance Fanatic",
];
let widx = 0,
  cidx = 0,
  forward = true;
function type() {
  const word = words[widx];
  if (forward) {
    cidx++;
    typingEl.textContent = word.slice(0, cidx);
    if (cidx === word.length) {
      forward = false;
      setTimeout(type, 1200);
      return;
    }
  } else {
    cidx--;
    typingEl.textContent = word.slice(0, cidx);
    if (cidx === 0) {
      forward = true;
      widx = (widx + 1) % words.length;
    }
  }
  setTimeout(type, forward ? 80 : 40);
}
type();

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
reveals.forEach((r) => io.observe(r));

// Animate skill bars when skills section visible
const skillBars = document.querySelectorAll(".skill .bar > i");
const skillsSection = document.getElementById("skills");
const skillsObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      skillBars.forEach((b) => {
        const w = b.getAttribute("data-width");
        b.style.width = w + "%";
      });
      skillsObserver.disconnect();
    }
  },
  { threshold: 0.3 }
);
skillsObserver.observe(skillsSection);

// Contact form simple handler
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  status.textContent = "Sending...";
  setTimeout(() => {
    status.textContent = "Message sent (demo) — I will contact you soon.";
    form.reset();
  }, 800);
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Accessibility: close mobile menu when click outside
document.addEventListener("click", (ev) => {
  if (!mobileMenu.contains(ev.target) && !hamburger.contains(ev.target)) {
    mobileMenu.classList.remove("show");
  }
});
