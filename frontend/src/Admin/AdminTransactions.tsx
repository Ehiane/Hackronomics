import { useState } from "react";

interface Transaction {
    id: string;
    user: string;
    category: string;
    amount: number;
    date: string;
    status: "Completed" | "Pending";
}

const dummyTransactions: Transaction[] = [
    { id: "1", user: "John Doe", category: "Groceries", amount: 120.50, date: "2025-01-15", status: "Completed" },
    { id: "2", user: "Sarah Johnson", category: "Dining", amount: 45.75, date: "2025-01-14", status: "Completed" },
    { id: "3", user: "Michael Brown", category: "Entertainment", amount: 89.99, date: "2025-01-13", status: "Pending" },
    { id: "4", user: "Emily Davis", category: "Utilities", amount: 135.20, date: "2025-01-12", status: "Completed" },
    { id: "5", user: "Robert Wilson", category: "Groceries", amount: 78.30, date: "2025-01-11", status: "Completed" },
];

const AdminTransactions = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredTransactions = dummyTransactions.filter((transaction) =>
    (selectedCategory === "All" || transaction.category === selectedCategory) &&
    transaction.user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Transaction History</h1>

            {/* Filters */}
            <div className="flex items-center space-x-4 mt-4">
            <select
                className="p-2 border border-gray-300 rounded"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="All">All Categories</option>
                <option value="Groceries">Groceries</option>
                <option value="Dining">Dining</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Utilities">Utilities</option>
            </select>

            <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            />
            </div>

            {/* Transaction Table */}
            <table className="w-full mt-4 border-collapse bg-white rounded-lg shadow-md">
            <thead>
                <tr className="border-b">
                <th className="p-2 text-left">User</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Status</th>
                </tr>
            </thead>
            <tbody>
                {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                    <td className="p-2">{transaction.user}</td>
                    <td className="p-2">{transaction.category}</td>
                    <td className="p-2">${transaction.amount.toFixed(2)}</td>
                    <td className="p-2">{transaction.date}</td>
                    <td className="p-2">
                    <span
                        className={`px-2 py-1 text-xs rounded ${
                        transaction.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                    >
                        {transaction.status}
                    </span>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
};

export default AdminTransactions;