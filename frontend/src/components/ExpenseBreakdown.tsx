import React from "react";

const ExpenseBreakdown = () => {
  // Example expense data
  const expenses = [
    { category: "Groceries", amount: 50 },
    { category: "Transport", amount: 30 },
    { category: "Dining", amount: 40 },
    { category: "Entertainment", amount: 20 },
    { category: "Utilities", amount: 60 },
  ];

  // Get top 3 expenses
  const topExpenses = [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  // Find the maximum amount for scaling
  const maxAmount = Math.max(...expenses.map((expense) => expense.amount));

  // Define colors for each bar
  const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>

      {/* Custom Horizontal Bar Chart */}
      <div className="space-y-3">
        {expenses.map((expense, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm text-gray-700">
              <span>{expense.category}</span>
              <span>${expense.amount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full animate-grow" // Add animation class
                style={{
                  width: `${(expense.amount / maxAmount) * 100}%`,
                  backgroundColor: colors[index % colors.length], // Dynamic color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Top 3 Expenses List */}
      <div className="mt-6 space-y-2">
        <h3 className="text-lg font-semibold">Top 3 Expenses</h3>
        {topExpenses.map((expense, index) => (
          <div key={index} className="flex justify-between p-2 bg-blue-50 rounded-lg">
            <span className="text-sm text-blue-800">{expense.category}</span>
            <span className="text-sm text-blue-800 font-semibold">
              ${expense.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseBreakdown;