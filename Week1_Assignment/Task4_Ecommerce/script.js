/* Aurora — E-Commerce Landing Page behavior */

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  /* Mobile menu (simple show/hide by re-using nav-links as a dropdown) */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("mobile-open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  /* Footer/category links are placeholders in this demo — prevent the
     jarring "jump to top of page" default that href="#" otherwise triggers */
  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (e) => e.preventDefault());
  });

  /* Cart count increments on "Add to Cart" */
  let cartCount = 3;
  const cartCountEl = document.querySelector(".cart-count");
  document.querySelectorAll(".btn-add").forEach((btn) => {
    btn.addEventListener("click", () => {
      cartCount++;
      cartCountEl.textContent = cartCount;
      btn.textContent = "Added ✓";
      btn.style.background = "#23d5ab";
      btn.style.color = "#060810";
      setTimeout(() => {
        btn.textContent = "Add to Cart";
        btn.style.background = "";
        btn.style.color = "";
      }, 1200);
    });
  });

  /* Newsletter form */
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterNote = document.getElementById("newsletterNote");
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletterEmail").value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (isValid) {
      newsletterNote.textContent = `✓ Subscribed! Check ${email} for your 10% off code.`;
      newsletterNote.style.color = "#23d5ab";
      newsletterForm.reset();
    } else {
      newsletterNote.textContent = "Please enter a valid email address.";
      newsletterNote.style.color = "#ff6b6b";
    }
  });
});
