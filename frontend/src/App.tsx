import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Dashboard from "./components/Dashboard";
import Home from "./homePage/Home";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute"; // Import new component

const App = () => {
  return (
    <Auth0Provider
      domain="dev-r57jcdn70df60sdr.us.auth0.com"
      clientId="0IqSRp9ml1ijCPEvgzwxxA6AAojM2at9"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
};

export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from './components/Dashboard';
// import LoginPage from './pages/LoginPage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Home route, can be used to redirect to login page */}
//         <Route path="/" element={<Navigate to="/login" />} />
        
//         {/* Login page route */}
//         <Route path="/login" element={<LoginPage />} />
        
//         {/* Dashboard page route */}
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
