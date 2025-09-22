import React from "react";
interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  total: number;
  items: number;
  image: string;
}
export const OrderTab:React.FC=()=>{
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  const orders: Order[] = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      status: 'delivered',
      total: 2499,
      items: 2,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&h=80&fit=crop'
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      status: 'shipped',
      total: 1299,
      items: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop'
    },
    {
      id: 'ORD003',
      date: '2024-01-05',
      status: 'processing',
      total: 3999,
      items: 3,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop'
    }
  ];

    return  <div>
                  <h2 className="text-2xl text-gray-900 mb-6">Order History</h2>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={order.image}
                              alt="Order"
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                              <div className="flex items-center space-x-3 mb-1">
                                <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm">{order.items} items • {order.date}</p>
                              <p className="text-lg font-bold text-blue-600">₹{order.total}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                              View Details
                            </button>
                            {order.status === 'delivered' && (
                              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                                Rate & Review
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
}