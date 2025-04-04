// src/pages/AIInsights.js
import React from "react";
import "./AIInsights.css";
// import glowingStar from "../assets/glowing-star.png"; // Add your star image in assets

const insights = [
  {
    title: "Cut Down on Food Delivery",
    description:
      "You’ve spent $300 on food delivery this month. Try cooking at home 3x/week."
  },
  {
    title: "Cancel Unused Subscriptions",
    description:
      "You’re subscribed to 4 streaming services. Consider keeping just 1 or 2."
  },
  {
    title: "Boost Your Emergency Fund",
    description:
      "Based on your expenses, you could allocate $100/month to emergency savings."
  },
  {
    title: "Cheaper Grocery Options Nearby",
    description:
      "Local store ‘BudgetMart’ has cheaper produce. Save $20/week."
  }
];

const AIInsights = () => {
  return (
    <div className="insights-container">
      {/* Hero Section */}
        <div className="insights-hero">
            <img
        src="/icons8-ai-stars.gif"
        alt="Glowing AI Star"
        className="glow-star"
        />

        <h1>Personalized AI Insights</h1>
        <p>
          Let AI guide your financial journey with tailored advice based on your
          habits.
        </p>
      </div>

      {/* Insights Grid */}
      <div className="insights-grid">
        {insights.map((tip, index) => (
          <div key={index} className="insight-card">
            <h2>{tip.title}</h2>
            <p>{tip.description}</p>
          </div>
        ))}
      </div>

      {/* Back Button */}
      {/* <button
        className="back-button"
        onClick={() => (window.location.href = "/dashboard")}
      >
        ← Back to Dashboard
      </button> */}
    </div>
  );
};

export default AIInsights;
