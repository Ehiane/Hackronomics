import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "./homePage/LoginPage";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <LoginPage />;
};

export default ProtectedRoute;



// import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import LoginPage from "../pages/LoginPage"; // Ensure the correct path

// interface ProtectedRouteProps {
//   element: JSX.Element;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
//   const { isAuthenticated, isLoading } = useAuth0();

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return isAuthenticated ? element : <LoginPage />;
// };

// export default ProtectedRoute;
