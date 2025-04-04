import { useState, useEffect } from "react";

interface User {
    //id: string;
    _id: string; // What I changed: from id to _id
    name: string;
    email: string;
    isActive: boolean;
    balance: number;
}


const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
          const token = localStorage.getItem("token");
    
          try {
            const response = await fetch("http://localhost:5001/api/admin/users", {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              const formattedUsers = data.map((u: any) => ({
                ...u,
                isActive: true, // We can improve this later with real active/inactive logic
                balance: 0,     // Or fetch this from a related model
              }));
              setUsers(formattedUsers);
            } else {
              console.error("Failed to fetch users");
            }
          } catch (err) {
            console.error("Error:", err);
          }
        };
    
        fetchUsers();
      }, []);

    const toggleUsersStatus = (id: string) => {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, isActive: !user.isActive } : user
          )
        );
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">User Management</h1>
            <table className="w-full mt-4 border-collapse bg-white rounded-lg shadow-md">
                <thead>
                    <tr className="border-b">
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Status</th>
                        <th className="p-2 text-left">Balance</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-b">
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">
                                <span className = {`px-2 py-1 text-xs rounded ${
                                    user.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                }`}>
                                    {user.isActive ? "Active" : "Inactive"}
                                </span>
                            </td>
                            <td className="p-2">${user.balance.toFixed(2)}</td>
                            <td className="p-2">
                                <button
                                    onClick={() => toggleUsersStatus(user._id)}
                                    className={`px-3 py-1 text-white rounded ${
                                        user.isActive ? "bg-red-500" : "bg-green-500"
                                    }`}
                                >
                                    {user.isActive ? "Deactivate": "Activate"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;