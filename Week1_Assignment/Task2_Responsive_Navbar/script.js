/* Responsive Navigation Bar — behavior */

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  /* Sticky navbar shrink on scroll */
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile hamburger toggle */
  hamburger.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  /* Mobile dropdown accordion behavior (tap to expand) */
  document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      if (window.innerWidth > 860) return; // desktop uses hover
      e.preventDefault();
      const dropdown = toggle.closest(".dropdown");
      const isOpen = dropdown.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
    });
  });

  /* Keep aria-expanded accurate for desktop hover + keyboard focus too,
     so screen reader users get the real open/closed state, not just mobile taps */
  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const open = () => { if (window.innerWidth > 860) toggle.setAttribute("aria-expanded", "true"); };
    const close = () => { if (window.innerWidth > 860) toggle.setAttribute("aria-expanded", "false"); };
    dropdown.addEventListener("mouseenter", open);
    dropdown.addEventListener("mouseleave", close);
    dropdown.addEventListener("focusin", open);
    dropdown.addEventListener("focusout", (e) => {
      if (!dropdown.contains(e.relatedTarget)) close();
    });
  });

  /* This is a component showcase, not a real site — nav links intentionally
     point to "#". Without this, clicking one still jumps the page to the
     top, which reads as a bug. Swallow that default for plain placeholder
     links while leaving real in-page anchors (e.g. "#components") alone. */
  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (e) => e.preventDefault());
  });

  /* Close mobile menu when a plain link is clicked */
  document.querySelectorAll(".nav-menu > .nav-item, .dropdown-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  /* Reset dropdown state on resize back to desktop */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      document.querySelectorAll(".dropdown.open").forEach((d) => d.classList.remove("open"));
      navMenu.classList.remove("open");
      hamburger.classList.remove("open");
    }
  });
});
