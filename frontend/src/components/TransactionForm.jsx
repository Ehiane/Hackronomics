// components/TransactionForm.jsx
import { useState } from "react";

const TransactionForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        transactionID: "",
        amountSpent: 0,
        transactionType: "",
        transactionDate: "",
        category: "",
        description: "",
        merchantName: "",
        merchantType: "",
        city: "",
        state: "",
        zipcode: "",
    });

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
};

return (
        <form onSubmit={handleSubmit} className="transaction-form">
            <input name="transactionID" placeholder="Transaction ID" onChange={handleChange} required />
            <input name="amountSpent" placeholder="Amount" type="number" onChange={handleChange} required />
            <input name="transactionType" placeholder="Payment Method" onChange={handleChange} required />
            <input name="transactionDate" type="date" onChange={handleChange} required />
            <input name="category" placeholder="Category" onChange={handleChange} />
            <input name="description" placeholder="Description" onChange={handleChange} />
            <input name="merchantName" placeholder="Merchant Name" onChange={handleChange} />
            <input name="merchantType" placeholder="Merchant Type" onChange={handleChange} />
            <input name="city" placeholder="City" onChange={handleChange} />
            <input name="state" placeholder="State" onChange={handleChange} />
            <input name="zipcode" placeholder="Zipcode" onChange={handleChange} />
            <button type="submit">Add Transaction</button>
        </form>
    );
};

export default TransactionForm;
