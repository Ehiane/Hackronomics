import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";

const Home = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div>
      <h1>Welcome to the Auth0 Login Example</h1>
      {!isAuthenticated ? (
        <LoginButton />
      ) : (
        <div>
          <p>Hello, {user.name}!</p>
          <a href="/dashboard">Go to Dashboard</a>
        </div>
      )}
    </div>
  );
};

export default Home;
