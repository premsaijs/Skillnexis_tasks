// Profile.jsx
// A reusable Profile component that renders a person's initials, name, role, and tags.

function Profile({ name, role, tags }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="profile-card">
      <div className="profile-avatar">{initials}</div>
      <div className="profile-info">
        <h3>{name}</h3>
        <p>{role}</p>
        <div className="profile-tags">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
