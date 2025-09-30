import React from "react";

const MainContent = () => {
  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
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
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <span
                  className={`text-sm font-semibold ${stat.changeColor} bg-green-50 px-2 py-1 rounded-full`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-150">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {[
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
              ].map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-900">
                        {order.orderId}
                      </p>
                      <p className="font-bold text-gray-900">{order.amount}</p>
                    </div>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Upcoming Events
              </h2>
              <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-150">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {[
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
              ].map((event, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{event.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{event.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {event.time}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Time
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mt-8">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
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
              ].map((item, index) => (
                <button
                  key={index}
                  className="text-left p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-150 border border-gray-100"
                >
                  <p className="font-semibold text-gray-900 mb-2">
                    {item.action}
                  </p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
