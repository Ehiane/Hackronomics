import {Link, useLocation} from "react-router-dom";
import { useEffect, useState } from "react";

const AdminSidebar = () => {
    const location = useLocation();
    const [adminName, setAdminName] = useState("");

    const menuItems = [
        {name: "Dashboard", path: "/admin/dashboard"},
        {name: "Users", path: "/admin/users"},
        {name: "Transactions", path: "/admin/transactions"},
        {name: "Settings", path: "/admin/settings"},
    ];

    useEffect(() => {
        const fetchAdminData = async () => {
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("userID");
          if (!token || !userId) return;
    
          try {
            const response = await fetch(`http://localhost:5001/api/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              setAdminName(data.name);
            }
          } catch (error) {
            console.error("Failed to fetch admin data:", error);
          }
        };
    
        fetchAdminData();
      }, []);

    return (
        <div className="w-64 h-screen bg-white shadow-md p-5">
            <h1 className="text-xl font-bold text-blue-600">Hackronomics</h1>
            <p className="text-sm text-gray-500 mb-5">Admin Portal</p>
            <p className="text-sm text-gray-700 mb-5">{adminName || "Loading..."}</p>

            <nav>
                {menuItems.map((item) => (
                    <Link key={item.path} to={item.path}
                        className= {`block py-2 px-4 rounded-lg ${
                        location.pathname === item.path? "bg-blue-100 text-blue-600": "text-gray-700 hover:bg-gray-100"
                    }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default AdminSidebar;