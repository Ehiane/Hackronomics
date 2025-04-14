import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AIRecommendations from "./AIRecommendations";
import ExpenseBreakdown from "./ExpenseBreakdown";
import WeeklySavings from "./WeeklySavings";
import BalanceCard from "./BalanceCard";
import Avatar3D from "./Avatar3D";
import { Canvas } from "@react-three/fiber";
import HeaderDashboard from "../pages/HeaderDashboard";

interface User {
  name: string;
  email: string;
  role: string;
  DOB?: string;
  primaryLocation?: string;
  zipcode?: string;
  // Add other fields as needed
}

const Dashboard = () => {
  const [savings, setSavings] = useState(1200); // You can adjust this later
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userID"); 
  
      if (!token || !userId) return;
  
      try {
        const response = await fetch(`http://localhost:5001/api/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchUserData();
  }, []);
  

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <HeaderDashboard showSwitchUser={false} />

      {/* Dashboard Content */}
      <main className="p-6 flex-1 flex">

        {/* Sidebar with Avatar */}
        {/* <div className="w-[400px] bg-white shadow-md rounded-2xl p-6 flex flex-col items-center mr-6">
          <div className="w-full h-64">
            <Canvas>
              <Avatar3D savings={savings} />
            </Canvas>
          </div>
          <h2 className="text-xl font-semibold mt-4">
            {user ? user.name : "Loading..."}
          </h2>
          <p className="text-gray-500">
            {user ? `Role: ${user.role}` : "Placeholder Avatar"}
          </p>
        </div> */}

        <div  className="w-[400px] bg-white shadow-md rounded-2xl p-6 flex flex-col items-center mr-6 cursor-pointer hover:shadow-lg transition" 
         onClick={() => navigate("/bio")}>
          <div className="w-full h-64">
            <Canvas>
              <Avatar3D savings={savings} />
            </Canvas>
          </div>
          <h2 className="text-xl font-semibold mt-4">
            {user ? user.name : "Loading..."}
          </h2>
          <p className="text-gray-500">
            {user ? `Role: ${user.role}` : "Placeholder Avatar"}
          </p>
        </div>



        {/* Main Dashboard Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.009 }} onClick={() => navigate("/transactions")} className="cursor-pointer">
            <BalanceCard />
          </motion.div>
          <motion.div whileHover={{ scale: 1.009 }} onClick={() => navigate("/savings-plan")} className="cursor-pointer">
            <WeeklySavings />
          </motion.div>
          <motion.div whileHover={{ scale: 1.009 }} onClick={() => navigate("/expenses")} className="cursor-pointer">
            <ExpenseBreakdown />
          </motion.div>
          <motion.div whileHover={{ scale: 1.009 }} onClick={() => navigate("/insights")} className="cursor-pointer">
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
