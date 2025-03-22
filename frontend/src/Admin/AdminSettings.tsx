import { useState } from "react";

const AdminSettings = () => {
    const [systemName, setSystemName] = useState("Hackronomics");
    const [adminEmail, setAdminEmail] = useState("admin@hackronomics.com");
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [aiRecommendations, setAIRecommendations] = useState(true);

    const handleSaveChanges = () => {
    alert("Settings saved successfully!");
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">System Settings</h1>
            <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">System Name</label>
                <input
                type="text"
                value={systemName}
                onChange={(e) => setSystemName(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Admin Email</label>
                <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                    className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Enable Email Notifications</span>
                </label>
            </div>

            <div className="mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={aiRecommendations}
                    onChange={() => setAIRecommendations(!aiRecommendations)}
                    className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Enable AI Recommendations</span>
                </label>
            </div>

            <button
                onClick={handleSaveChanges}
                className="px-4 py-2 mt-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
                Save Changes
            </button>
            </div>
        </div>
    );
};

export default AdminSettings;