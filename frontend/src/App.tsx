import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Dashboard from "./components/Dashboard";
import Home from "./homePage/Home";
import LoginPage from "./homePage/LoginPage";
import Register from "./homePage/Register";
import ProtectedRoute from "./ProtectedRoute"; // Import new component
import Footer from "./homePage/Footer";
import AdminSidebar from "./Admin/AdminSidebar";
import UserList from "./Admin/UserList";
import AdminTransactions from "./Admin/AdminTransactions";
import AdminSettings from "./Admin/AdminSettings";
import AdminDashboard from "./Admin/AdminDashboard";
import HeaderDashboard from "./pages/HeaderDashboard";

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
          <Route path="/signup" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}  />
          

          {/* <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} /> */}
          {/* Admin Portal routes - Wrapped with sidebar */}
        <Route
          path='/admin/*'
          element = {
            <div className="bg-gray-100 min-h-screen flex flex-col">
              <HeaderDashboard showSwitchUser={false} /> 
               <div className="flex flex-1">
                  <AdminSidebar />
              <div className='flex-1 p-6'>
                <Routes>
                  <Route path='/dashboard' element={<AdminDashboard />}/>
                  <Route path='/users' element={<UserList />}/>
                  <Route path='/transactions' element={<AdminTransactions />}/>
                  <Route path='/settings' element={<AdminSettings />}/>
                </Routes>
              </div>
            </div>
          </div>
          }
        />
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
