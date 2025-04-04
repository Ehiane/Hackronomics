import React from "react";
import { NavLink } from "react-router-dom"; // Use NavLink instead of Link
import "./NavbarHome.css"; // Import the CSS file for styling

const NavbarHome = ({ showHomeLink }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="brand-logo-container">
          <img
            src="/Hackanomics_logo.png"
            alt="Hackronomics Logo"
            className="logo"
          />
          <h1 className="brand-logo">Hackronomics</h1>
        </div>
      </div>

      <div className="navbar-right">
        <ul className="nav-links">
          {showHomeLink && (
            <li><NavLink to="/" className={({ isActive }) => isActive ? "navbar-item active" : "navbar-item"}>
                Home
               </NavLink>
            </li>

          )}
        </ul>
      </div>

    </nav>
  );
};

export default NavbarHome;
