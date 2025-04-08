import { useDashboardAnalyticsQuery } from "../../apis/dashboard";
import DashboardCard from "../../components/dashbaord/card";

const Dashboard = () => {
  const { data: analytics, isLoading, error } = useDashboardAnalyticsQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading analytics data...</p>
          <p className="text-gray-400 text-sm">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading analytics</div>;
  }

  const dashboardData = [
    { title: 'Total Tasks', value: analytics?.total.toString(), icon: '📊' },
    { title: 'Completed Tasks', value: analytics?.completed.toString(), icon: '✅' },
    { title: 'Pending Tasks', value: analytics?.pending.toString(), icon: '⏳' }
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardData.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            value={card.value || '0'}
            icon={card.icon}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;