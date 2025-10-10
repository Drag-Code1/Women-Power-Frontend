// app/events/page.tsx (Server Component)
import EventsSectionClient from "../component/events/EventsSectionClient";

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

interface ApiResponse {
  success: boolean;
  data: Event[];
  featured: Event[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    statuses: string[];
  };
}

async function getEvents(): Promise<ApiResponse> {
  try {
    // In production, this would be your actual API endpoint
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/events?limit=1000`, {
      cache: 'no-store', // For dynamic data
      // Or use: next: { revalidate: 60 } for ISR
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch events');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    return {
      success: false,
      data: [],
      featured: [],
      pagination: {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0
      },
      filters: {
        statuses: ['All', 'upcoming', 'ongoing', 'completed']
      }
    };
  }
}

export default async function EventsPage() {
  const eventsData = await getEvents();

  return (
    <EventsSectionClient 
      initialEvents={eventsData.data}
      featuredEvents={eventsData.featured}
      statuses={eventsData.filters.statuses}
    />
  );
}

// Optional: Generate metadata
export const metadata = {
  title: 'Events & Workshops | Learning Platform',
  description: 'Discover upcoming events, workshops, and conferences',
};