import React, { useState } from "react";
import Card, { CardContent } from "./Card";
import Button from "./Button";
import { motion } from "framer-motion";
import AIRecommendations from "./AIRecommendations";
import ExpenseBreakdown from "./ExpenseBreakdown";
import WeeklySavings from "./WeeklySavings";
import BalanceCard from "./BalanceCard";
import Avatar3D from "./Avatar3D";
import { Canvas } from "@react-three/fiber";

// Import the logo (if using src/assets)
import logo from "../Hackanomics_logo.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Initial savings value
  const [savings, setSavings] = useState(1200);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const  Navigate = useNavigate();

  // switching between admin and regular view
  const handleSwitchView  = (view: string) => {
    if (view === "admin") {
      Navigate("/admin/dashboard"); // Redirect to Admin Dashboard
    }else {
      Navigate("/dashboard");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-8 flex justify-between items-center">
        {/* Add the logo */}
        <div className="flex items-center space-x-4">
          <img
            src={logo} // Reference logo file
            alt="Hackronomics Logo"
            className="h-12 w-auto"
          />
          <h1 className="text-2xl font-bold">Hackronomics</h1>
        </div>

        {/* dropdown button */}
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

        <Button className="bg-blue-500 hover:bg-blue-700">Logout</Button>
      </header>

      {/* Dashboard Content */}
      <main className="p-6 flex-1 flex">
        {/* Sidebar with Avatar */}
        <div className="w-[400px] bg-white shadow-md rounded-2xl p-6 flex flex-col items-center mr-6">
          <div className="w-full h-64">
            <Canvas>
              <Avatar3D savings={savings} />
            </Canvas>
          </div>
          <h2 className="text-xl font-semibold mt-4">User Name</h2>
          <p className="text-gray-500">Placeholder Avatar</p>
        </div>

        {/* Main Dashboard Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.05 }}>
            <BalanceCard />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <WeeklySavings />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <ExpenseBreakdown />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <AIRecommendations />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 px-6 text-center">
        <p>Hackronomics © 2025. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
