// app/dashboard/page.tsx (Server Component)

import { getDashboardData } from '@/app/data/dashboardmaintabdata';
import { getDashboardCounts } from '@/app/lib/api';
import { StatsCard } from '../component/dashboard/dashboardmaintab/StatsCard';
import { RecentOrdersCard } from '../component/dashboard/dashboardmaintab/RecentOrdersCard';
import { UpcomingEventsCard } from '../component/dashboard/dashboardmaintab/UpcomingEventsCard';
import { QuickActionsCard } from '../component/dashboard/dashboardmaintab/QuickActionsCard';

export default async function DashboardPage() {
  const [dashboardData, counts] = await Promise.all([
    getDashboardData(),
    getDashboardCounts().catch(() => ({ productCount: 0, artistCount: 0, courseCount: 0, eventCount: 0 }))
  ]);

  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard stat={{ title: 'Total Products', value: String(counts.productCount), change: '', changeColor: '' }} />
          <StatsCard stat={{ title: 'Active Artists', value: String(counts.artistCount), change: '', changeColor: '' }} />
          <StatsCard stat={{ title: 'Courses', value: String(counts.courseCount), change: '', changeColor: '' }} />
          <StatsCard stat={{ title: 'Events', value: String(counts.eventCount), change: '', changeColor: '' }} />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentOrdersCard orders={dashboardData.recentOrders} />
          <UpcomingEventsCard events={dashboardData.upcomingEvents} />
        </div>

        {/* Quick Actions Section */}
        <div className="mt-8">
          <QuickActionsCard actions={dashboardData.quickActions} />
        </div>
      </div>
    </main>
  );
}

export const revalidate = 60;