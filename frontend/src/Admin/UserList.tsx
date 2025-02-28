import { useState } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
    balance: number;
}


const dummyUsers: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com", isActive: true, balance: 2450 },
    { id: "2", name: "Sarah Johnson", email: "sarah@example.com", isActive: true, balance: 3200 },
    { id: "3", name: "Michael Brown", email: "michael@example.com", isActive: false, balance: 120 },
    { id: "4", name: "Emily Davis", email: "emily@example.com", isActive: true, balance: 1850 },
    { id: "5", name: "Robert Wilson", email: "robert@example.com", isActive: true, balance: 4100 },
];


const UserList = () => {
    const [users, setUsers] = useState<User[]>(dummyUsers);

    const toggleUsersStatus = (id: string) => {
        setUsers(users.map(user => 
            user.id === id ? {...user, isActive: !user.isActive} : user
        )); 
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
                        <tr key={user.id} className="border-b">
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
                                    onClick={() => toggleUsersStatus(user.id)}
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