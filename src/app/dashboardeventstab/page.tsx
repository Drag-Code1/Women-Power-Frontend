'use client';
import { useState, useEffect } from 'react';
import { EventDashboardClient } from '../component/dashboard/dashboardeventstab/EventDashboardClient';
import { getEventsV1, getCategoriesApi } from '@/app/lib/api';

// This page now uses client-side fetching to support Next.js static export
export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [eventsRaw, categories] = await Promise.all([
          getEventsV1(),
          getCategoriesApi()
        ]);

        const categoryIdToName: Record<string, string> = {};
        (categories || []).forEach((c: { id: string; name: string }) => {
          categoryIdToName[c.id] = c.name;
        });

        const mappedEvents = (eventsRaw || []).map((e: any) => ({
          ...e,
          category: categoryIdToName[e.category] || e.category
        }));

        setEvents(mappedEvents);
      } catch (err) {
        console.error('Failed to load events:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <EventDashboardClient initialEvents={events} />;
}
