/* =========================================================
   Prem Sai J S — Portfolio
   Vanilla JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initNavbar();
  initMobileMenu();
  initTypewriter();
  initScrollReveal();
  initBackToTop();
  initActiveNavLink();
  initNetworkBackground();
});

/* Footer year */
function setYear() {
  document.getElementById("year").textContent = new Date().getFullYear();
}

/* Navbar background on scroll */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* Mobile hamburger menu */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

/* Typing animation for role titles */
function initTypewriter() {
  const el = document.getElementById("typewriter");
  const roles = [
    "Artificial Intelligence & ML Student",
    "Java Developer",
    "Python Developer",
    "Building Intelligent Software",
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 55;
  const DELETE_SPEED = 30;
  const HOLD_TIME = 1400;

  function tick() {
    const currentRole = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = currentRole.slice(0, charIndex);
      if (charIndex === currentRole.length) {
        deleting = true;
        return setTimeout(tick, HOLD_TIME);
      }
      return setTimeout(tick, TYPE_SPEED);
    }

    charIndex--;
    el.textContent = currentRole.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      return setTimeout(tick, 400);
    }
    setTimeout(tick, DELETE_SPEED);
  }

  tick();
}

/* Scroll-reveal using IntersectionObserver */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("in-view"), i * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((item) => observer.observe(item));
}

/* Back to top button */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  window.addEventListener(
    "scroll",
    () => btn.classList.toggle("visible", window.scrollY > 500),
    { passive: true }
  );
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* Highlight active nav link based on section in view */
function initActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

/* Animated neural-network background (canvas particles + connecting lines) */
function initNetworkBackground() {
  const canvas = document.getElementById("net-bg");
  const ctx = canvas.getContext("2d");
  let width, height, nodes;

  const NODE_COUNT_DIVISOR = 14000; // lower = more nodes
  const MAX_LINK_DIST = 140;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    const count = Math.min(90, Math.floor((width * height) / NODE_COUNT_DIVISOR));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    // update + draw nodes
    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(120, 170, 255, 0.55)";
      ctx.fill();
    });

    // draw links between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_LINK_DIST) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(108, 92, 231, ${0.18 * (1 - dist / MAX_LINK_DIST)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    if (!prefersReducedMotion) requestAnimationFrame(step);
  }

  resize();
  step();
  window.addEventListener("resize", () => {
    resize();
    // step() already covers the animated case; when motion is reduced the
    // rAF loop never restarts on its own, so redraw once manually here.
    if (prefersReducedMotion) step();
  });
}
