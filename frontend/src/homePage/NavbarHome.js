// import React from 'react';
// import { NavLink } from 'react-router-dom'; // Use NavLink instead of Link
// import './NavbarHome.css'; // Import the CSS file for styling

// const NavbarHome = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <div className="brand-logo-container">
//           <img 
//             src="/Hackanomics_logo.png" 
//             alt="Granger Cobb Institute Logo"
//             className="logo"
//           />
//           <h1 className="brand-logo">Hackronomics</h1>
//         </div>
//       </div>

//       <div className="navbar-right">
//         <ul className="nav-links">
//           {/* <li><NavLink to="/" className="navbar-item" activeClassName="active">Home</NavLink></li>   */}
//           {/* <li><NavLink to="/contact" className="navbar-item" activeClassName="active">Contact Us</NavLink></li>
//           <li><NavLink to="/about" className="navbar-item" activeClassName="active">About</NavLink></li> */}
//           {/* <li><NavLink to="/login" className="navbar-item login-button" activeClassName="active">Log in</NavLink></li> */}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default NavbarHome;


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
            <li><NavLink to="/" className="navbar-item" activeClassName="active">Home</NavLink></li>   
          )}
          {/* <li><NavLink to="/contact" className="navbar-item" activeClassName="active">Contact Us</NavLink></li>
          <li><NavLink to="/about" className="navbar-item" activeClassName="active">About</NavLink></li> */}
          {/* <li><NavLink to="/login" className="navbar-item login-button" activeClassName="active">Log in</NavLink></li> */}
        </ul>
      </div>

    </nav>
  );
};

export default NavbarHome;
