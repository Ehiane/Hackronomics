import React, { useState } from "react";
import { motion } from "framer-motion";
import AIRecommendations from "./AIRecommendations";
import ExpenseBreakdown from "./ExpenseBreakdown";
import WeeklySavings from "./WeeklySavings";
import BalanceCard from "./BalanceCard";
import Avatar3D from "./Avatar3D";
import { Canvas } from "@react-three/fiber";
import HeaderDashboard from "../pages/HeaderDashboard";

const Dashboard = () => {
  // Initial savings value
  const [savings, setSavings] = useState(1200);
  
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
     {/* <HeaderDashboard/> */}

     <HeaderDashboard showSwitchUser={false}/> {/* ***!Important*** to enable admin user view, change this to false  */}
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