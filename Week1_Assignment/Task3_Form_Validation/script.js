/* =========================================================
   Task 3 — JavaScript Form Validation
   Real-time validation with regex, error + success states
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");

  const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    password: document.getElementById("password"),
    confirmPassword: document.getElementById("confirmPassword"),
  };

  const errors = {
    name: document.getElementById("nameError"),
    email: document.getElementById("emailError"),
    phone: document.getElementById("phoneError"),
    password: document.getElementById("passwordError"),
    confirmPassword: document.getElementById("confirmPasswordError"),
  };

  const strengthFill = document.getElementById("strengthFill");
  const successBanner = document.getElementById("successBanner");

  /* ---------- Regex patterns ---------- */
  const PATTERNS = {
    name: /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/, // letters, spaces, hyphens, apostrophes
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[6-9]\d{9}$/, // 10-digit mobile number
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
  };

  /* ---------- Individual field validators ---------- */
  function validateName() {
    const value = fields.name.value.trim();
    if (value === "") return setState("name", false, "Name is required.");
    if (value.length < 2) return setState("name", false, "Name is too short.");
    if (!PATTERNS.name.test(value)) return setState("name", false, "Use letters only (no numbers or symbols).");
    return setState("name", true, "");
  }

  function validateEmail() {
    const value = fields.email.value.trim();
    if (value === "") return setState("email", false, "Email is required.");
    if (!PATTERNS.email.test(value)) return setState("email", false, "Enter a valid email address.");
    return setState("email", true, "");
  }

  function validatePhone() {
    const value = fields.phone.value.trim();
    if (value === "") return setState("phone", false, "Phone number is required.");
    if (!PATTERNS.phone.test(value)) return setState("phone", false, "Enter a valid 10-digit mobile number.");
    return setState("phone", true, "");
  }

  function validatePassword() {
    const value = fields.password.value;
    updateStrengthMeter(value);

    if (value === "") return setState("password", false, "Password is required.");
    if (value.length < 8) return setState("password", false, "Must be at least 8 characters.");
    if (!PATTERNS.password.test(value)) {
      return setState(
        "password",
        false,
        "Include uppercase, lowercase, a number, and a symbol."
      );
    }
    return setState("password", true, "");
  }

  function validateConfirmPassword() {
    const value = fields.confirmPassword.value;
    if (value === "") return setState("confirmPassword", false, "Please confirm your password.");
    if (value !== fields.password.value) return setState("confirmPassword", false, "Passwords do not match.");
    return setState("confirmPassword", true, "");
  }

  /* ---------- Helpers ---------- */
  function setState(key, isValid, message) {
    const wrapper = fields[key].closest(".field");
    errors[key].textContent = message;
    wrapper.classList.toggle("valid", isValid);
    wrapper.classList.toggle("invalid", !isValid && fields[key].value !== "");
    fields[key].setAttribute("aria-invalid", fields[key].value !== "" && !isValid ? "true" : "false");
    return isValid;
  }

  function updateStrengthMeter(value) {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    const percent = (score / 5) * 100;
    strengthFill.style.width = `${percent}%`;

    if (score <= 2) strengthFill.style.background = "#ff6b6b";
    else if (score <= 3) strengthFill.style.background = "#ffb347";
    else strengthFill.style.background = "#23d5ab";
  }

  /* ---------- Real-time listeners ---------- */
  fields.name.addEventListener("input", validateName);
  fields.email.addEventListener("input", validateEmail);
  fields.phone.addEventListener("input", () => {
    fields.phone.value = fields.phone.value.replace(/\D/g, "").slice(0, 10);
    validatePhone();
  });
  fields.password.addEventListener("input", () => {
    validatePassword();
    if (fields.confirmPassword.value) validateConfirmPassword();
  });
  fields.confirmPassword.addEventListener("input", validateConfirmPassword);

  /* ---------- Password visibility toggle ---------- */
  document.querySelectorAll(".toggle-visibility").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      const isPassword = target.type === "password";
      target.type = isPassword ? "text" : "password";
      btn.style.opacity = isPassword ? "1" : "0.6";
      btn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
      btn.setAttribute("aria-pressed", isPassword ? "true" : "false");
    });
  });

  /* ---------- Submit ---------- */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    successBanner.classList.remove("show");

    const validName = validateName();
    const validEmail = validateEmail();
    const validPhone = validatePhone();
    const validPassword = validatePassword();
    const validConfirm = validateConfirmPassword();

    if (validName && validEmail && validPhone && validPassword && validConfirm) {
      successBanner.classList.add("show");
      form.reset();
      Object.values(fields).forEach((f) => {
        f.closest(".field").classList.remove("valid", "invalid");
        f.setAttribute("aria-invalid", "false");
      });
      strengthFill.style.width = "0%";
    } else {
      successBanner.classList.remove("show");
    }
  });
});
