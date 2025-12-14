// lib/services/dashboardService.ts

import { getLatestEvents } from '../lib/api';

export interface DashboardStats {
  title: string;
  value: string;
  change: string;
  changeColor: string;
}

export interface RecentOrder {
  orderId: string;
  customer: string;
  amount: string;
}

export interface UpcomingEvent {
  name: string;
  date: string;
  time: string;
}

export interface QuickAction {
  action: string;
  description: string;
}

export interface DashboardData {
  stats: DashboardStats[];
  recentOrders: RecentOrder[];
  upcomingEvents: UpcomingEvent[];
  quickActions: QuickAction[];
}

// Server-side data fetching function
export async function getDashboardData(): Promise<DashboardData> {
  // Fetch latest events from API
  const upcomingEvents = await getLatestEvents();
  
  return {
    stats: [],
    recentOrders: [],
    upcomingEvents,
    quickActions: [],
  };
}





















