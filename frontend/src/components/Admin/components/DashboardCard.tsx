interface Props {
    title: string;
    value: string;
    change: string;
}

const DashboardCard = ({title, value, change}: Props) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-sm text-gray-500">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-green-600">{change}</p>
        </div>
    );
};

export default DashboardCard;