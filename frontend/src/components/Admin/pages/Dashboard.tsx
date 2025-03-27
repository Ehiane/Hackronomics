import DashboardCard from "../components/DashboardCard";
import ActivityLog from "../components/ActivityLog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleSwitchView = (view: string) => {
        if (view === "user") {
            navigate("/dashboard"); 
        } else {
            navigate("/admin/dashboard");
        }
    };

    return (
        <div className="p-6">
            {/* Header with Switch View Dropdown */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>

                {/* Dropdown Button */}
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                        Switch View ▼
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                            <button
                                onClick={() => handleSwitchView("user")}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                            >
                                User Dashboard
                            </button>
                            <button
                                onClick={() => handleSwitchView("admin")}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                            >
                                Admin Dashboard
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Dashboard Overview Cards */}
            <h1 className="text-2xl font-bold"> Dashboard Overview</h1>
            <div className="grid grid-cols-3 gap-4 mt-4">
                <DashboardCard title="Total Users" value="1,254" change="+12% from last month"/>
                <DashboardCard title="Total Savings" value="$45,672" change="+8% from last month"/>
                <DashboardCard title="Total Users" value="876" change="-3% from last month"/>
            </div>
            <ActivityLog/>
        </div>
    );
};

export default Dashboard;