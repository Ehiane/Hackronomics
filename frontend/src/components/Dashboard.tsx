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
import { Shirt, ShoppingBag } from "lucide-react";

interface User {
  name: string;
  email: string;
  role: string;
  DOB?: string;
  primaryLocation?: string;
  zipcode?: string;
  // Add other fields as needed
}

interface Points {
  points: number;
}

const Dashboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [savings, setSavings] = useState(1200); // You can adjust this later
  const [user, setUser] = useState<User | null>(null);
  const [points, setPoints] = useState<Points>({ points: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userID"); 

      if (!token || !userId) return;
  
      // Check if the token is expired or invalid
      try {
        // Gets the user data from the backend
        console.log("userID: " + userId);
        const userResponse = await fetch(`http://localhost:5001/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    const fetchPointsData = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userID"); // Get the user ID from local storage

      if (!token || !userId) return;
  
      try {
        const response = await fetch(`http://localhost:5001/api/points/get/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();
        console.log("Points data:", data); // Log the points data	
        
        if (response.ok) {
          
          if (typeof(data.points === "Number")) {
            setPoints(data);
          }
          else{
            console.warn("Points data is not a number:", data.points);
            setPoints({ points: 0 }); // Set to 0 or handle as needed
          }
        } else {
          console.error("Failed to fetch points data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchUserData();
    fetchPointsData();
  }, []);
  

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <HeaderDashboard showSwitchUser={false} />

      {/* Dashboard Content */}
      <main className="p-6 flex-1 flex">
        {/* Sidebar with Avatar */}
        <div className="w-[400px] bg-white shadow-md rounded-2xl p-6 flex flex-col items-center mr-6">
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
          <p className="text-gray-500">
            {points ? `Points: ${points.points}` : "Points: 0"}
          </p>

          <div className="mt-4 flex flex-col gap-2 w-full">
            <button
              onClick={() => navigate("/inventory")}
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200"
            >
              <Shirt className="inline-block mr-2" size={16} /> {/* Icon for Inventory */}
              Inventory
            </button>
            <button
              onClick={() => navigate("/store")}
              className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-green-700 transition duration-200"
            >
              <ShoppingBag className="inline-block mr-2" size={16} /> {/* Icon for Store */}
              Store
            </button>
          </div>

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
