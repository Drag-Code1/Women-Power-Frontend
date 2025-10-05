// lib/services/dashboardService.ts

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
  // Yahan aap real API calls kar sakte hain
  // const response = await fetch('your-api-url');
  // const data = await response.json();
  
  return {
    stats: [
      {
        title: "Total Products",
        value: "1,234",
        change: "+12%",
        changeColor: "text-green-600",
      },
      {
        title: "Active Artists",
        value: "89",
        change: "+5%",
        changeColor: "text-green-600",
      },
      {
        title: "Courses",
        value: "45",
        change: "+8%",
        changeColor: "text-green-600",
      },
      {
        title: "Events",
        value: "23",
        change: "+3%",
        changeColor: "text-green-600",
      },
    ],
    recentOrders: [
      {
        orderId: "#ORD-1234",
        customer: "Sarah Johnson",
        amount: "₹2,490",
      },
      {
        orderId: "#ORD-1235",
        customer: "Mike Chen",
        amount: "₹1,450",
      },
      {
        orderId: "#ORD-1236",
        customer: "Emma Davis",
        amount: "₹3,890",
      },
      {
        orderId: "#ORD-1237",
        customer: "John Smith",
        amount: "₹1,120",
      },
    ],
    upcomingEvents: [
      {
        name: "Art Workshop",
        date: "Oct 15, 2025",
        time: "10:00 AM",
      },
      {
        name: "Digital Art Course",
        date: "Oct 20, 2025",
        time: "2:30 PM",
      },
      {
        name: "Gallery Opening",
        date: "Oct 25, 2025",
        time: "6:00 PM",
      },
      {
        name: "Painting Masterclass",
        date: "Oct 30, 2025",
        time: "11:00 AM",
      },
    ],
    quickActions: [
      {
        action: "Add New Product",
        description: "Create a new product listing",
      },
      {
        action: "Schedule Event",
        description: "Plan upcoming workshops",
      },
      {
        action: "Manage Artists",
        description: "Update artist profiles",
      },
    ],
  };
}





















