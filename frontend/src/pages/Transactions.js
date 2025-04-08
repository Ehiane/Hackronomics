import React from "react";
import { useNavigate } from "react-router-dom";
import "./TransactionsPage.css";

const dummyTransactions = [
    { id: 1, category: "Groceries", amount: -50, date: "2025-04-01" },
    { id: 2, category: "Paycheck", amount: 2000, date: "2025-03-29" },
    { id: 3, category: "Dining", amount: -40, date: "2025-03-28" },
    { id: 4, category: "Utilities", amount: -100, date: "2025-03-26" },
    { id: 5, category: "Entertainment", amount: -75, date: "2025-03-25" },
];

const TransactionsPage = () => {
    const navigate = useNavigate();

    return (
    <div className="transactions-page">
        <div className="transactions-header">
        <button className="transactions-back-btn" onClick={() => navigate("/dashboard")}>
            ← Back to Dashboard
        </button>
        <h1>All Transactions</h1>
        <p>View and track your transaction history in real-time.</p>
        </div>

        <div className="transactions-table">
        <div className="transactions-table-header">
            <span>Date</span>
            <span>Category</span>
            <span>Amount</span>
        </div>

        {dummyTransactions.map((tx) => (
            <div className="transaction-row" key={tx.id}>
            <span>{tx.date}</span>
            <span>{tx.category}</span>
            <span className={tx.amount < 0 ? "expense" : "income"}>
                {tx.amount < 0 ? `-$${Math.abs(tx.amount)}` : `+$${tx.amount}`}
            </span>
            </div>
        ))}
        </div>
    </div>
    );
};

export default TransactionsPage;
