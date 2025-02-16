import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/LogoutButton";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <h1>Please log in to view the dashboard.</h1>;
  }

  return (
    <div>
      <h1>Welcome to your Dashboard, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
