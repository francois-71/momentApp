// Import React and CSS
import React from 'react';
import './header.css'; // Import your custom CSS file
import { Link } from 'react-router-dom';

interface HeaderProps {
    isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  return (
    <header className="custom-header">
      <div className="container">
        <Link className="logo" to="/home"><img className="moment-logo" src="/images/moment_solutions_logo.jpg" alt="Moment Solutions Logo" /></Link>
        <nav className="nav-links">
          {isLoggedIn ? (
            <>
              <Link to="/home" className="link">Home</Link>
              <Link to="/logout" className="link">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="link">Login</Link>
              <Link to="/register" className="link">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
