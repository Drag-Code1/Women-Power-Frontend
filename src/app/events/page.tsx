// app/events/page.tsx (Server Component)

import EventsSectionClient from "../component/events/EventsSectionClient";
import { API_BASE_URL } from "../lib/config";

interface Event {
  id: string;
  e_image: string;
  category_id: string;
  title: string;
  description: string;
  date_time: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  keywords: string;
  banner: string;
}

interface EventApiResponse {
  success: boolean;
  message: string;
  data: Event[];
}

export default function EventsPage() {
  return (
    <EventsSectionClient 
      initialEvents={[]}
      featuredEvents={[]}
      statuses={['All', 'upcoming', 'ongoing', 'completed']}
    />
  );
}

// Optional: Generate metadata
export const metadata = {
  title: 'Events & Workshops | Learning Platform',
  description: 'Discover upcoming events, workshops, and conferences',
};
