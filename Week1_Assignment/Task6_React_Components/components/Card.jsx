// Card.jsx
// A reusable Card component driven entirely by props (icon, title, description).

function Card({ icon, title, description }) {
  return (
    <div className="card">
      <span className="card-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
