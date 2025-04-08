import React, { useEffect, useState } from "react";
import axios from "axios";
import Card, { CardContent } from "./Card";
import BalanceCardSkeleton from "./BalanceCardSkeleton";
import { motion } from "framer-motion";

const BalanceCard = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userID = localStorage.getItem("userID");
        const res = await axios.get(`http://localhost:5001/api/transactions/user/${userID}`);
        const data = res.data;

        setTransactions(data);

        const total = data.reduce((acc, tx) => acc + tx.amountSpent, 0);
        setBalance(total);

        // Force skeleton to display for at least 800ms (I worked hard on this feature, you're going to see it 😂)
        setTimeout(() => {
          setLoading(false);
        }, 800);

      } catch (error) {
        console.error("Failed to fetch transactions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const recent = [...transactions]
    .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate))
    .slice(0, 3);

  if (loading) return <BalanceCardSkeleton />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Card className="bg-white shadow-md rounded-2xl p-4">
        <CardContent>
          <h2 className="text-xl font-semibold">Account Balance</h2>
          <p className="text-2xl font-bold mt-2">${balance.toLocaleString()}</p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <div className="space-y-2 mt-2">
              {recent.map((tx) => (
                <div key={tx._id} className="flex justify-between text-sm text-gray-700">
                  <span>{tx.category}</span>
                  <span className={tx.amountSpent < 0 ? "text-red-500" : "text-green-500"}>
                    {tx.amountSpent < 0 ? "-" : "+"}${Math.abs(tx.amountSpent)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BalanceCard;
