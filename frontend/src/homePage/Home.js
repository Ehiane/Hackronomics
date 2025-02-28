import React from 'react';
import './Home.css';
import NavbarHome from './NavbarHome'; // Ensure correct path
import Footer from '../homePage/Footer'; // Ensure correct path

const Home = () => {
  return (
    <>
      <NavbarHome />
      <section className="hero">
        {/* Left Side: Text and Get Started Box */}
        <div className="hero-text">
          <h1>Finance Tracking System</h1>
          {/* Welcome to the Auth0 Login Example */}
          <h3>
            Monitor expenses, manage budgets, and discover cost-effective 
            alternatives 
          </h3>
          <div className="getstartedsquare">
            <h3>Get Started</h3>
            <a href="/signup">
              <button className="signup-button">Sign Up</button>
            </a>
            <a href="/login">
              <button className="login-button">Log In</button>
            </a>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="hero-image">
          <img src="/loginpic.jpeg" alt="Researcher at Work" />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;


// import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import LoginButton from "../components/LoginButton";

// const Home = () => {
//   const { isAuthenticated, user } = useAuth0();

//   return (
//     <div>
//       <h1>Welcome to the Auth0 Login Example</h1>
//       {!isAuthenticated ? 
//         ( <LoginButton />) : 
//         ( <div>
//             <p>Hello, {user.name}!</p>
//                <a href="/dashboard">Go to Dashboard</a>
//             </div>
//         )}
//     </div>
//   );
// };

// export default Home;
