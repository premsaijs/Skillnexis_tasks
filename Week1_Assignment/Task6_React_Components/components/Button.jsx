// Button.jsx
// A reusable Button component demonstrating props for label, variant, and onClick.

function Button({ label, variant = "primary", onClick }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  );
}
