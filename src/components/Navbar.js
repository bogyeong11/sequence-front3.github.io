import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const Navbar = () => {
  return (
    <header>
      <div className="nav-container">
        <div className="logo-button">
          <img src="/images/sequence.png" alt="Logo" />
        </div>
        <nav>
          <ul>
            <li><Link to="#">Project</Link></li>
            <li><Link to="#">Announcement</Link></li>
            <li><Link to="#">Archive</Link></li>
          </ul>
        </nav>
        <Link to="/login" className="login-button1">Log In</Link>
      </div>
    </header>
  );
};

export default Navbar;
