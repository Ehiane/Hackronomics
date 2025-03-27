const ActivityLog = () => {
    const activities = [
        {title: "New user registered", description: "John Doe (john@example.com)", time:"2 hours ago"},
        {title: "Large transaction detected", description: "$1,200 withdrawal by Sarah Johnson", time:"5 hours ago"},
        {title: "AI recommended generated", description: "15 new savings recommendations", time:"1 day ago"},
    ];

    return(
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <ul className="mt-2">
                {activities.map((activity, index)=> (
                    <li key={index} className="border-b py-2">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                        <p className="text-sm text-gray-400">{activity.time}</p>
                    </li>
                    ))}
            </ul>
        </div>
    );
};

export default ActivityLog;