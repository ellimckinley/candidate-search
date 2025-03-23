import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          margin: '0 1rem',
          textDecoration: isActive ? 'underline' : 'none',
          color: isActive ? '#535bf2' : '#646cff',
        })}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        style={({ isActive }) => ({
          margin: '0 1rem',
          textDecoration: isActive ? 'underline' : 'none',
          color: isActive ? '#535bf2' : '#646cff',
        })}
      >
        About
      </NavLink>
      <NavLink
        to="/contact"
        style={({ isActive }) => ({
          margin: '0 1rem',
          textDecoration: isActive ? 'underline' : 'none',
          color: isActive ? '#535bf2' : '#646cff',
        })}
      >
        Contact
      </NavLink>
    </nav>
  );
};

export default Nav;
