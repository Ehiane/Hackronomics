import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from '../components/LogoutButton'; // Import the logout button

const HeaderDashboard = ({ showSwitchUser = true }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const logo = "/Hackanomics_logo.png";

  // Switching between admin and regular view
  const handleSwitchView = (view) => {
    if (view === "admin") {
      navigate("/admin/dashboard"); // Redirect to Admin Dashboard
    } else {
      navigate("/dashboard"); // Redirect to User Dashboard
    }
  };

  return (
    <header className="bg-blue-600 text-white py-4 px-8 flex justify-between items-center">
      {/* Logo and Title */}
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Hackronomics Logo" className="h-12 w-auto" />
        <h1 className="text-2xl font-bold">Hackronomics</h1>
      </div>

      {/* Switch View Dropdown (Only Show If Enabled) */}
      {showSwitchUser && (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Switch View ▼
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <button
                onClick={() => handleSwitchView("user")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                User Dashboard
              </button>
              <button
                onClick={() => handleSwitchView("admin")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Admin Dashboard
              </button>
            </div>
          )}
        </div>
      )}

      {/* Logout Button */}
      <LogoutButton color="bg-blue-500 hover:bg-blue-700" />
    </header>
  );
};

export default HeaderDashboard;