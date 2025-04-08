import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TransactionsPage.css";
import API from "../utils/api";



const TransactionsPage = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const userID = localStorage.getItem("userID");
    console.log(userID)


    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await API.get(`/transactions/user/${userID}`);
                console.log(res.data)
                setTransactions(res.data);
            } catch (error) {
                console.error("Failed to fetch transactions", error)
            }
        };
        fetchTransactions();
    }, [userID]);

    return (
    <div className="transactions-page">
        <div className="transactions-header">
            <button className="transactions-back-btn" onClick={() => navigate("/dashboard")}>
                ← Back to Dashboard
            </button>
            <h1>All Transactions</h1>
            <p>Track all your financial activity, categorized and detailed for better insight.</p>
        </div>

        <div className="transactions-grid">
            {transactions.map((tx) => (

                <div key={tx._id} className="transaction-card">
                    <div className="card-top">
                        <span className="tx-category">{tx.category}</span>
                        <span className={`tx-amount ${tx.amountSpent < 0 ? "expense" : "income"}`}>
                            {tx.amountSpent < 0 ? `-$${Math.abs(tx.amountSpent)}` : `+$${tx.amountSpent}`}
                        </span>
                    </div>

                    <div className="card-body">
                    <p><strong>Merchant:</strong> {tx.merchantName} ({tx.merchantType})</p>
                    <p><strong>Description:</strong> {tx.description}</p>
                    <p><strong>Payment Method:</strong> {tx.transactionType}</p>
                    <p><strong>Date:</strong> {new Date(tx.transactionDate).toLocaleDateString()}</p>
                    <p><strong>Location:</strong> {tx.Location.city}, {tx.Location.state} ({tx.Location.zipcode})</p>
                    </div>
                </div>
            ))}
        </div>        
    </div>
    );
};

export default TransactionsPage;
