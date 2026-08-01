// Header.jsx
// A reusable Header component. Accepts a `title` prop and a `links` array prop.

function Header({ title, links }) {
  return (
    <header className="app-header">
      <span className="logo">{title}</span>
      <nav>
        {links.map((link) => (
          <a href={link.href} key={link.label}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
