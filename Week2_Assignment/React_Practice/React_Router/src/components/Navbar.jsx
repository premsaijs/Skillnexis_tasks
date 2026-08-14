import { NavLink } from 'react-router-dom';

function Navbar() {
  const linkClass = ({ isActive }) => 'navbar__link' + (isActive ? ' navbar__link--active' : '');

  return (
    <nav className="navbar">
      <NavLink to="/" end className={linkClass}>Home</NavLink>
      <NavLink to="/about" className={linkClass}>About</NavLink>
      <NavLink to="/contact" className={linkClass}>Contact</NavLink>
    </nav>
  );
}

export default Navbar;
