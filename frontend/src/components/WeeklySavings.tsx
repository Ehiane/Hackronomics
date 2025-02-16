import React from "react";
import Card, { CardContent } from "../components/Card";

const WeeklySavings = () => {
  // Example data
  const currentWeekSavings = 120; // Current week's savings
  const previousWeeksSavings = [100, 90, 110, 80, 120]; // Last 5 weeks of savings

  return (
    <Card className="bg-white shadow-md rounded-2xl p-4">
      <CardContent>
        <h2 className="text-xl font-semibold">Weekly Savings</h2>

        <p className="text-gray-500">You saved ${currentWeekSavings} this week!</p>
 
        {/* Comparison to Previous Weeks */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Comparison to Previous Weeks</h3>
          <div className="flex items-end h-24 gap-2 mt-2">
            {previousWeeksSavings.map((amount, index) => (
              <div
                key={index}
                className="flex-1 bg-blue-200 rounded-t-lg"
                style={{ height: `${(amount / 150) * 100}%` }} // Adjust 150 to your max savings value
              ></div>
            ))}
            <div
              className="flex-1 bg-blue-500 rounded-t-lg"
              style={{ height: `${(currentWeekSavings / 150) * 100}%` }} // Current week's bar
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>Previous Weeks</span>
            <span>This Week</span>
          </div>
        </div>

        {/* Save Points */}
        <p className="text-green-600 font-bold mt-4">+10 Save Points</p>
      </CardContent>
    </Card>
  );
};

export default WeeklySavings;