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
import Transactions from "./pages/Transactions";
import SavingsPlan from "./pages/SavingsPlan";
import AIInsights from "./pages/Insights";
import Expenses from "./pages/Expenses";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* User dashboard (protected) */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} allowedRoles={["user"]} />}
        />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/savings-plan" element={<SavingsPlan />} />
        <Route path="/insights" element={<AIInsights />} />
        <Route path="/expenses" element={<Expenses />} />

        {/* Admin section (protected) */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
              element={
                <div className="bg-gray-100 min-h-screen flex flex-col">
                  <HeaderDashboard showSwitchUser={false} />
                  <div className="flex flex-1">
                    <AdminSidebar />
                    <div className="flex-1 p-6">
                      <Routes>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="users" element={<UserList />} />
                        <Route path="transactions" element={<AdminTransactions />} />
                        <Route path="settings" element={<AdminSettings />} />
                      </Routes>
                    </div>
                  </div>
                </div>
              }
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;