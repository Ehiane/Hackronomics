import DashboardCard from "../components/DashboardCard";
import ActivityLog from "../components/ActivityLog";

const Dashboard = () => {
    return (
        <div className="p-6">
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