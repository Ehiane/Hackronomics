import "./Expenses.css";
import { useNavigate } from "react-router-dom";

const dummyData = [
  { category: "Groceries", amount: 50, color: "#4285F4" },
  { category: "Transport", amount: 30, color: "#EA4335" },
  { category: "Dining", amount: 40, color: "#34A853" },
  { category: "Entertainment", amount: 20, color: "#FBBC05" },
  { category: "Utilities", amount: 60, color: "#9B51E0" },
];

const Expenses = () => {

    const navigate = useNavigate();
    const total = dummyData.reduce((sum, item) => sum + item.amount, 0);
    const top3 = [...dummyData].sort((a, b) => b.amount - a.amount).slice(0, 3);

    return (
        <div className="expenses-container">
        <button className="expenses-back-button" onClick={() => navigate("/dashboard")}>
            ⬅ Back to Dashboard
        </button>
        <div className="expenses-header">
            <h1>Expense Breakdown</h1>
            <p>This month’s spending across all categories</p>
            <span className="total-spent">Total: ${total}</span>
        </div>

        <div className="expenses-list">
            {dummyData.map((item, idx) => (
            <div className="expense-item" key={idx}>
                <span className="category-label">{item.category}</span>
                <div className="progress-bar-wrapper">
                <div
                    className="progress-bar"
                    style={{ width: `${(item.amount / total) * 100}%`, backgroundColor: item.color }}
                ></div>
                <span className="amount">${item.amount}</span>
                </div>
            </div>
            ))}
        </div>

        <div className="top-expenses">
            <h2>Top 3 Expenses</h2>
            <ul>
            {top3.map((item, idx) => (
                <li key={idx}>
                <span style={{ color: item.color }}>{item.category}</span>
                <span className="bold-amount">${item.amount}</span>
                </li>
            ))}
            </ul>
        </div>
        </div>
    );
};

export default Expenses;
