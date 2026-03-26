import React from 'react';
import { Order } from './ProfileSection';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DateRangeIcon from '@mui/icons-material/DateRange';

interface OrdersTabProps {
  orders: Order[];
}

const OrdersTab: React.FC<OrdersTabProps> = ({ orders }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div>
      <h2 className="text-2xl text-gray-900 mb-6">Order History</h2>
      {orders.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-xl">
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-white">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Order #{order.id.slice(0, 8)}...</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                    <div className="flex items-center text-gray-600">
                      <DateRangeIcon className="w-4 h-4 mr-2" />
                      <span>Placed on: <span className="text-gray-900 font-medium">{formatDate(order.order_date)}</span></span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium text-blue-600">{order.productCount} Product{order.productCount !== 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  {order.address && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4">
                      <div className="flex items-center text-gray-800 font-semibold mb-2">
                        <LocalShippingIcon className="w-4 h-4 mr-2 text-[#61503c]" />
                        <span>Delivery Address</span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>{order.address.address}</p>
                        <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
                        <p className="text-xs mt-1">Mobile: {order.address.mobileNo} ({order.address.type})</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold mb-1">Total Amount</p>
                      <p className="text-2xl font-black text-[#61503c]">₹{order.totalPrice}</p>
                    </div>
                    <button
                      onClick={() => window.location.href = `/orderdetails?id=${order.id}`}
                      className="px-6 py-2.5 bg-[#61503c] text-white rounded-lg hover:bg-[#4d3f2f] transition-colors text-sm font-semibold shadow-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersTab;
