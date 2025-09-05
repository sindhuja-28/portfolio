// ========== Scroll Features ==========
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + window.innerHeight - 100;
  let fromTop = window.scrollY + 150;

  // Section Fade-in Animation
  sections.forEach(sec => {
    if (sec.offsetTop < scrollPos) sec.classList.add("visible");
  });

  // Highlight Active Nav Link
  navLinks.forEach(link => {
    let section = document.querySelector(link.getAttribute("href"));
    if (
      section &&
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }
  });

  // Show/Hide Scroll-to-Top Button
  topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

// Scroll-to-Top Smooth
topBtn.addEventListener("click", () => 
  window.scrollTo({ top: 0, behavior: "smooth" })
);

// ========== Dark Mode Toggle with Persistence ==========
const darkToggle = document.getElementById("darkModeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  darkToggle.textContent = "☀️";
}

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  let theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
  darkToggle.textContent = theme === "dark" ? "☀️" : "🌙";
});

// ========== Typing Animation ==========
const typingText = document.getElementById("typing-text");
const roles = ["Aspiring Software Developer", "AI & ML Enthusiast", "Problem Solver"];
let roleIndex = 0, charIndex = 0;
let typingForward = true;

function typeAnimation() {
  if (typingForward) {
    typingText.textContent = roles[roleIndex].substring(0, charIndex++);
    if (charIndex > roles[roleIndex].length) {
      typingForward = false;
      setTimeout(typeAnimation, 1200); // pause before deleting
      return;
    }
  } else {
    typingText.textContent = roles[roleIndex].substring(0, charIndex--);
    if (charIndex < 0) {
      typingForward = true;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  // Variable speed: typing slower, deleting faster
  let speed = typingForward ? 100 + Math.random() * 50 : 50 + Math.random() * 30;
  setTimeout(typeAnimation, speed);
}
typeAnimation();
