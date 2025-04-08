import React from "react";
import { motion } from "framer-motion";

const AIRecommendations = () => {
  // Example AI recommendations
  const recommendations = [
    "Money Saver 101",
    "Cutting the Costs",
    "Are these subscriptions still active? Cut them!",
    "Invest in low-risk funds",
    "Save 10% of your income this month",
  ];

  return (
    <motion.div
      className="bg-white shadow-md rounded-2xl p-6"
      whileHover={{ scale: 1.0001 }}
    >
      <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
      <div className="space-y-2">
        {recommendations.map((recommendation, index) => (
          <motion.div
            key={index}
            className="p-2 bg-blue-50 rounded-lg text-sm text-blue-800 cursor-pointer hover:bg-blue-100 transition-colors"
            whileHover={{ scale: 1.020 }}
          >
            {recommendation}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AIRecommendations;