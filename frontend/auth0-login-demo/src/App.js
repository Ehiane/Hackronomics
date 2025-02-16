import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

const App = () => {
  return (
    <Auth0Provider
      domain="dev-r57jcdn70df60sdr.us.auth0.com"
      clientId="0IqSRp9ml1ijCPEvgzwxxA6AAojM2at9"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
};

export default App;
