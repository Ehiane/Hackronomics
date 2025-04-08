import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS,BarElement,CategoryScale,LinearScale,Tooltip,Legend,} from "chart.js";
import "./SavingsPlan.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SavingsPlan = () => {
    const navigate = useNavigate();

    const [savings, setSavings] = useState([100, 90, 110, 80, 120]);
    const [labels, setLabels] = useState([
    "Week 1",
    "Week 2",
    "Week 3",
    "Week 4",
    "This Week",
    ]);
    const [goalInput, setGoalInput] = useState("");

    const handleAddGoal = (e) => {
    e.preventDefault();
    if (!goalInput || isNaN(goalInput)) return;

    const newAmount = parseFloat(goalInput);

    const nextIndex = savings.length - 4; // Offset after "This Week"
    const nextLabel =
        nextIndex === 1 ? "Next Week" : `Next Week +${nextIndex}`;

    setSavings([...savings, newAmount]);
    setLabels([...labels, nextLabel]);
    setGoalInput("");
    };

    const savingsData = {
    labels: labels,
    datasets: [
        {
        label: "Weekly Savings ($)",
        data: savings,
        backgroundColor: savings.map((_, i) =>
            i === savings.length - 1
            ? "rgba(59, 130, 246, 0.8)"
            : "rgba(147, 197, 253, 0.7)"
        ),
        borderRadius: 8,
        },
    ],
    };

    const options = {
    responsive: true,
    scales: {
        y: {
        beginAtZero: true,
        ticks: { color: "#6B7280" },
        grid: { color: "#E5E7EB" },
        },
        x: {
        ticks: { color: "#6B7280" },
        grid: { display: false },
        },
    },
    plugins: {
        legend: { display: false },
    },
    };

    return (
    <div className="savings-container">
        <button onClick={() => navigate("/dashboard")} className="savings-plan-back-button">
        ← Back to Dashboard
        </button>

        <div className="savings-card">
        <h2 className="savings-title">Weekly Savings Overview</h2>
        <p className="savings-subtitle">
            Your most recent savings goal is{" "}
            <span className="highlight">
            ${savings[savings.length - 1]}
            </span>
        </p>

        <div className="savings-chart">
            <Bar data={savingsData} options={options} />
        </div>

        {/* Savings Goal Form */}
        <form onSubmit={handleAddGoal} className="savings-form">
            <label htmlFor="goalInput">Set a new savings goal:</label>
            <input
            type="number"
            id="goalInput"
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
            placeholder="Enter new goal..."
            />
            <button type="submit">Add to Chart</button>
        </form>

        <div className="savings-footer">
            <span className="save-points">+10 Save Points</span>
        </div>
        </div>
    </div>
    );
};

export default SavingsPlan;
