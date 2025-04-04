import AdminDashboardCard from "./AdminDashboardCard";
import ActivityLog from "./ActivityLog";

const AdminDashboard = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
              {/* <HeaderDashboard/> */}
        <div className="p-6">
            {/* Dashboard Overview Cards */}
            <h1 className="text-2xl font-bold"> Dashboard Overview</h1>
            <div className="grid grid-cols-3 gap-4 mt-4">
                <AdminDashboardCard title="Total Users" value="1,254" change="+12% from last month"/>
                <AdminDashboardCard title="Total Savings" value="$45,672" change="+8% from last month"/>
                <AdminDashboardCard title="Total Users" value="876" change="-3% from last month"/>
            </div>
            <ActivityLog/>
        </div>
       </div>
    );
};

export default AdminDashboard;