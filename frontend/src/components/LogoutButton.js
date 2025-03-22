import { useNavigate } from "react-router-dom";

const LogoutButton = ({ color }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    sessionStorage.clear(); 

    // Redirect user to home page after logout
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className={`${color ? color : ""} text-white px-4 py-2 rounded`}
    >
      Logout
    </button>
  );
};

export default LogoutButton;

//import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";

// const LogoutButton = () => {
//   const { logout } = useAuth0();

//   return (
//     <button onClick={() => logout({ returnTo: window.location.origin })}>
//       Log Out
//     </button>
//   );
// };

// export default LogoutButton;
