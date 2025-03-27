import {Link, useLocation} from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        {name: "Dashboard", path: "/admin/dashboard"},
        {name: "Users", path: "/admin/users"},
        {name: "Transactions", path: "/admin/transactions"},
        {name: "Settings", path: "/admin/settings"},
    ];

    return (
        <div className="w-64 h-screen bg-white shadow-md p-5">
            <h1 className="text-xl font-bold text-blue-600">Hackronomics</h1>
            <p className="text-sm text-gray-500 mb-5">Admin Portal</p>

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

export default Sidebar;