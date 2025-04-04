import React from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import "./SavingsPlan.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SavingsPlan = () => {

    const navigate = useNavigate();
    const savingsData = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "This Week"],
        datasets: [
            {
            label: "Weekly Savings ($)",
            data: [100, 90, 110, 80, 120],
            backgroundColor: [
                "rgba(147, 197, 253, 0.7)",
                "rgba(147, 197, 253, 0.7)",
                "rgba(147, 197, 253, 0.7)",
                "rgba(147, 197, 253, 0.7)",
                "rgba(59, 130, 246, 0.8)",
            ],
            borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
            beginAtZero: true,
            ticks: {
                color: "#6B7280",
            },
            grid: {
                color: "#E5E7EB",
            },
            },
            x: {
            ticks: {
                color: "#6B7280",
            },
            grid: {
                display: false,
            },
            },
        },
        plugins: {
            legend: {
            display: false,
            },
        },
    };

    return (
        
            <div className="savings-container">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="back-button"
                >
                    ← Back to Dashboard
                </button>
                <div className="savings-card">
                    <h2 className="savings-title">Weekly Savings Overview</h2>
                    <p className="savings-subtitle">You saved <span className="highlight">$120</span> this week!</p>
                <div className="savings-chart">
                    <Bar data={savingsData} options={options} />
                </div>
                <div className="savings-footer">
                    <span className="save-points">+10 Save Points</span>
                </div>
                </div>
            </div>
        );
    };

export default SavingsPlan;
