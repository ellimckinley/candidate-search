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
        Home/ Candidate Search
      </NavLink>
      <NavLink
        to="/SavedCandidates"
        style={({ isActive }) => ({
          margin: '0 1rem',
          textDecoration: isActive ? 'underline' : 'none',
          color: isActive ? '#535bf2' : '#646cff',
        })}
      >
        Saved Candidates
      </NavLink>
      
    </nav>
  );
};

export default Nav;
