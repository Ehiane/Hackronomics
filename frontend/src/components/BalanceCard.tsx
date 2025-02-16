import React from "react";
import Card, { CardContent } from "../components/Card";

const BalanceCard = () => {
  // Example data
  const accountBalance = 2500; // Current account balance
  const recentTransactions = [
    { description: "Groceries", amount: -50 },
    { description: "Paycheck", amount: 2000 },
    { description: "Dining", amount: -40 },
  ];

  return (
    <Card className="bg-white shadow-md rounded-2xl p-4">
      <CardContent>
        <h2 className="text-xl font-semibold">Account Balance</h2>
        <p className="text-2xl font-bold mt-2">${accountBalance.toLocaleString()}</p>

        {/* Recent Transactions */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <div className="space-y-2 mt-2">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex justify-between text-sm text-gray-700">
                <span>{transaction.description}</span>
                <span
                  className={transaction.amount < 0 ? "text-red-500" : "text-green-500"}
                >
                  {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Add Funds Button */}
        
      </CardContent>
    </Card>
  );
};

export default BalanceCard;