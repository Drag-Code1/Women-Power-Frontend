// app/events/page.tsx (Server Component)
import { EventDashboardClient } from '../component/dashboard/dashboardeventstab/EventDashboardClient';
import { INITIAL_EVENTS } from '@/app/data/dashboardeventsdata';

// This is a Server Component by default in Next.js App Router
export default async function EventsPage() {
  // In a real application, you would fetch data here from your API/Database
  // Example:
  // const events = await fetchEventsFromAPI();
  
  // For now, we're using the initial mock data
  const events = INITIAL_EVENTS;

  return <EventDashboardClient initialEvents={events} />;
}

// Optional: Add metadata
export const metadata = {
  title: 'Event Dashboard',
  description: 'Manage your events efficiently',
};