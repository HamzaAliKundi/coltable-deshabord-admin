interface DashboardCardProps {
    title: string;
    value: string;
    icon: string;
}

const DashboardCard = ({ title, value, icon }: DashboardCardProps) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm">{title}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
                </div>
                <div className="text-3xl">{icon}</div>
            </div>
        </div>
    );
};

export default DashboardCard;