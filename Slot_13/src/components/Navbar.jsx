import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <span className="navbar-logo">Logo</span>
      <div className="navbar-links">
        <NavLink to="/" className="navbar-link">
          Home
        </NavLink>
        <NavLink to="/posts" className="navbar-link">
          Posts
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
