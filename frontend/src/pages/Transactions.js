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
    const [csvMessage, setCsvMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await API.get(`/transactions/user/${userID}`);
                const cleaned = res.data.map(tx => ({
                    ...tx,
                    Location: {
                        city: tx.Location?.city || "",
                        state: tx.Location?.state || "",
                        zipcode: tx.Location?.zipcode || ""
                    }
                }));
                setTransactions(cleaned);
            } catch (error) {
                console.error("Failed to fetch transactions", error);
            }
        };
        fetchTransactions();
    }, [userID]);
    

    const handleAdd = (method) => {
        setMode(method);
    };

    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
            
            const formData = e.target;
            const tx = {
                transactionID: formData.transactionID.value,
                amountSpent: parseFloat(formData.amountSpent.value),
                transactionType: formData.transactionType.value,
                transactionDate: formData.transactionDate.value,
                category: formData.category.value,
                description: formData.description.value,
                merchantName: formData.merchantName.value,
                merchantType: formData.merchantType.value,
                Location: {
                    city: formData["Location.city"].value,
                    state: formData["Location.state"].value,
                    zipcode: formData["Location.zipcode"].value,
                },

                city: Location.city,
                state: Location.state,
                zipcode: Location.zipcode
            }



            const response = await API.post("http://localhost:5001/api/transactions/", {...tx, userID});
            console.log(response.data);
            setTransactions((prev) => [...prev, response.data]);
            setMode("");

            if (response.status === 201) {
                // alert("Transaction added successfully!");
                e.reset(); // Reset the form after successful submission

            }
        } catch (err) {

            console.error("Form submission failed", err);
        }
    };

    const handleCsvUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        parseCSV(file, async (parsedData) => {
            try {
                console.log("Csv File accepted", parsedData); // Check final result before sending
                
                const cleanedData = parsedData.map((tx) => ({
                    transactionID: tx.transactionID,
                    amountSpent: parseFloat(tx.amountSpent), // <-- Convert to number
                    transactionType: tx.transactionType,
                    transactionDate: tx.transactionDate,
                    category: tx.category,
                    description: tx.description,
                    merchantName: tx.merchantName,
                    merchantType: tx.merchantType,
                    userID: userID,
                    Location: {
                        city: tx.Location.city || "",
                        state: tx.Location.state || "",
                        zipcode: tx.Location.zipcode || ""
                    }
                }));
                
                const response = await API.post("http://localhost:5001/api/transactions/bulk", {
                    transactions: cleanedData,
                    userID
                });
                setTransactions((prev) => [...prev, ...response.data.transactions]);

                alert("CSV uploaded successfully!");
                
                setTimeout(() => {
                    setMode("");
                    setCsvMessage({ text: "CSV uploaded successfully!", type: "success" });
                }, 2000); // Show success message for 2 seconds


                event.target.value = null; // Reset the file input after upload
            } catch (err) {
                
                if (err.response?.data?.error) {
                    setCsvMessage({ text: ` ${err.response.data.error}`, type: "error" });
                } else {
                    setCsvMessage({ text: " An unexpected error occurred while uploading the CSV.", type: "error" });
                }
                console.error("CSV upload failed", err);
            }
        });
    };

    const handleDelete = async (transactionID) => {
        try {
            const response = await API.delete(`http://localhost:5001/api/transactions/${transactionID}`);
            if (response.status === 200) {
                setTransactions((prev) => prev.filter(tx => tx.transactionID !== transactionID));
            }
        } catch (error) {
            console.error("Failed to delete transaction", error);
        }
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
                {transactions.map((tx, index) => (
                    <div key={index} className="transaction-card">
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
                            <p><strong>Location:</strong> {tx.Location.city || "Null"}, {tx.Location.state || "Null"} ({tx.Location.zipcode || "Null"})</p>
                            <button className="delete-btn" onClick={() => handleDelete(tx.transactionID)}>Delete</button>
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

                        <input name="category" placeholder="Category" />
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
                    {csvMessage.text && (
                        <p className={`csv-message ${csvMessage.type}`}>
                            {csvMessage.text}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default TransactionsPage;
