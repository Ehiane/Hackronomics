import React from "react";

const Expenses = () => {
return (
    <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Expenses</h1>
        <p className="text-gray-600 mb-6">
            This is your expense summary. You’ll soon be able to filter, view trends, and analyze your spending here.
        </p>

        <div className="border border-dashed border-gray-300 rounded-md p-6 text-center text-gray-500">
            🚧 Feature under construction. Stay tuned!
        </div>
        </div>
    </div>
    );
};

export default Expenses;
