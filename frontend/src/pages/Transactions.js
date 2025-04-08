import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TransactionsPage.css";
import API from "../utils/api";
import AddTransactionDropdown from "../components/AddTransactionButton";
import TransactionForm from "../components/TransactionForm";
import { parseCSV } from "../utils/parseCSV";

const TransactionsPage = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const userID = localStorage.getItem("userID");
    const [mode, setMode] = useState("");

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await API.get(`/transactions/user/${userID}`);
                console.log(res.data);
                setTransactions(res.data);
            } catch (error) {
                console.error("Failed to fetch transactions", error);
            }
        };
        fetchTransactions();
    }, [userID]);

    const handleAdd = (method) => {
        setMode(method);
    };

    const handleFormSubmit = async (tx) => {
        try {
            const response = await API.post("/transactions", { ...tx, userID });
            setTransactions((prev) => [...prev, response.data]);
            setMode("");
        } catch (err) {
            console.error("Form submission failed", err);
        }
    };

    const handleCsvUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        parseCSV(file, async (parsedData) => {
            try {
                const response = await API.post("/transactions/bulk", { transactions: parsedData, userID });
                setTransactions((prev) => [...prev, ...response.data]);
                setMode("");
            } catch (err) {
                console.error("CSV upload failed", err);
            }
        });
    };

    return (
        <div className="transactions-page">
            <div className="transactions-header">
                <button className="transactions-back-btn" onClick={() => navigate("/dashboard")}>← Back to Dashboard</button>
                <h1>All Transactions</h1>
                <p>Track all your financial activity, categorized and detailed for better insight.</p>
                <AddTransactionDropdown onFormClick={() => handleAdd("form")} onCsvClick={() => handleAdd("csv")} />
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
            
            {/* Form input */}
            {mode === "form" && (
                <form className="transaction-form" onSubmit={handleFormSubmit}>
                    <h2>Add New Transaction</h2>
                    <div className="form-grid">
                        <input name="transactionID" placeholder="Transaction ID" required />
                        <input name="amountSpent" type="number" placeholder="Amount" required />
                        <select name="transactionType" required>
                            <option value="">Payment Method</option>
                            <option value="Card">Card</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                        <input name="transactionDate" type="date" required />

                        <input name="category" placeholder="Category" required />
                        <input name="description" placeholder="Description" required />
                        <input name="merchantName" placeholder="Merchant Name" required />
                        <input name="merchantType" placeholder="Merchant Type" required />
                        <input name="Location.city" placeholder="City" required />
                        <input name="Location.state" placeholder="State" required />
                        <input name="Location.zipcode" placeholder="Zipcode" required />
                    </div>
                    <button type="submit" className="submit-btn">Add Transaction</button>
                </form>
            )}

            {/* CSV file upload  */}
            {mode === "csv" && (
                <div className="csv-upload-container">
                    <h2>Upload Transactions via CSV</h2>
                    <input
                    type="file"
                    accept=".csv"
                    onChange={handleCsvUpload}
                    className="csv-input"
                    />
                    <p className="csv-hint">Accepted format: transactionID, amountSpent, transactionType, transactionDate, category, description, merchantName, merchantType, Location.city, Location.state, Location.zipcode</p>
                </div>
            )}
        </div>
    );
};

export default TransactionsPage;
