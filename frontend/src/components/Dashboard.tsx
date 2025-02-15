import React from "react";
import Card, { CardContent } from "../components/Card";
import Button from "../components/Button";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hackronomics</h1>
        <Button className="bg-blue-500 hover:bg-blue-700">Logout</Button>
      </header>

      {/* Dashboard Content */}
      <main className="p-6 flex-1 flex">
        {/* Sidebar with Avatar */}
        <div className="w-64 bg-white shadow-md rounded-2xl p-4 flex flex-col items-center mr-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
          <h2 className="text-xl font-semibold">User Name</h2>
          <p className="text-gray-500">Placeholder Avatar</p>
        </div>

        {/* Main Dashboard Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Savings Summary Card */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className="bg-white shadow-md rounded-2xl">
              <CardContent>
                <h2 className="text-xl font-semibold">Weekly Savings</h2>
                <p className="text-gray-500">You saved $120 this week!</p>
                <p className="text-green-600 font-bold">+10 Save Points</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Expense Breakdown Card */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className="bg-white shadow-md rounded-2xl">
              <CardContent>
                <h2 className="text-xl font-semibold">Expense Breakdown</h2>
                <div className="flex flex-col space-y-2 mt-4">
                  <div className="flex justify-between">
                    <span>Groceries</span>
                    <span>$50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transport</span>
                    <span>$30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dining</span>
                    <span>$40</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Recommendations Card */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className="bg-white shadow-md rounded-2xl">
              <CardContent>
                <h2 className="text-xl font-semibold">AI Recommendations</h2>
                <ul className="list-disc list-inside mt-4">
                  <li>Switch to a cheaper grocery store nearby.</li>
                  <li>Carpool to save on transport costs.</li>
                  <li>Consider home-cooked meals for dining savings.</li>
                </ul>
              </CardContent>
            </Card>
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