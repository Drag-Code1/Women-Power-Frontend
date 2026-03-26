'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import { API_BASE_URL } from '@/app/lib/config';
import R2Image from '@/app/component/common/R2Image';
import { DEFAULT_THUMBNAIL } from '@/app/data/dashboardproductdata';

// Types
interface Product {
  p_Name: string;
  price: string;
  thumbnail: string;
  discount: number;
}

interface OrderItem {
  Product: Product;
  quantity: number;
  price: string;
}

interface Address {
  fullName?: string;
  mobileNo: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  type: string;
}

interface OrderDetail {
  id: string;
  order_date: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  User: {
    firstName: string;
    lastName: string;
    email: string;
    mobileNo: string;
  };
  OrderItems: OrderItem[];
  Address: Address;
  payment_status: 'paid' | 'unpaid';
}

const OrderDetailsContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('id');
  const { user, token } = useAuth();
  const router = useRouter();

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      if (!orderId || !token) {
        if (!orderId) setError("Order ID is missing");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/order/details/${orderId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error("Failed to fetch order details");
        const data = await res.json();
        if (data.success) {
          console.log("Fetched order details:", data.data);
          setOrder(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch order details");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId, token]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'shipped': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'delivered': return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f2f4]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#61503c] border-t-transparent"></div>
    </div>
  );

  if (error || !order) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f2f4] p-4 text-center">
      <div>
        <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
        <p className="text-gray-600 mb-4">{error || "Order not found"}</p>
        <button onClick={() => router.push('/')} className="bg-[#61503c] text-white px-6 py-2 rounded-lg">Go to Home</button>
      </div>
    </div>
  );

  const subtotal = order.OrderItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const total = subtotal; // Shipping/Tax can be added here if backend provides

  return (
    <div className="bg-[#f1f2f4] py-6 px-2 sm:px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Details</h1>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">Order ID: <span className="font-semibold text-[#61503c]">{order.id}</span></p>
                <p className="text-gray-600">Placed on: <span className="font-medium text-gray-900">{formatDate(order.order_date)}</span></p>
              </div>
            </div>
            <div className="flex flex-col lg:items-end gap-2">
              <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold border ${getStatusColor(order.status)} uppercase tracking-wide`}>
                {order.status}
              </span>
              <p className="text-sm font-medium text-gray-600">
                Payment Status: <span className={order.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'}>
                  {order.payment_status.toUpperCase()}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Items Ordered</h2>
              <div className="divide-y divide-gray-100">
                {order.OrderItems.map((item, index) => (
                  <div key={index} className="py-4 flex gap-4">
                    <R2Image 
                      src={item.Product?.thumbnail} 
                      fallbackSrc={DEFAULT_THUMBNAIL}
                      alt={item.Product?.p_Name} 
                      className="w-20 h-20 object-cover rounded-lg border" 
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{item.Product.p_Name}</h3>
                      <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                      <p className="text-[#61503c] font-bold mt-1">₹{item.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery Address</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-900 text-lg mb-1">{order.User.firstName} {order.User.lastName}</p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{order.Address.address}</p>
                  <p>{order.Address.city}, {order.Address.state} - {order.Address.pincode}</p>
                  {order.Address.landmark && <p className="text-xs italic mt-2">Landmark: {order.Address.landmark}</p>}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-900">Contact: {order.Address.mobileNo}</p>
                  <p className="text-xs text-gray-500">{order.User.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase text-xs">Free</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between text-xl font-black text-[#61503c] bg-[#61503c]/5 p-3 rounded-lg">
                  <span>Grand Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button onClick={() => router.push('/profile?tab=orders')} className="w-full py-3 border-2 border-[#61503c] text-[#61503c] font-bold rounded-xl hover:bg-[#61503c] hover:text-white transition-all capitalize">
              Back to orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderDetailsPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-[#61503c] border-t-transparent"></div></div>}>
      <OrderDetailsContent />
    </Suspense>
  );
};

export default OrderDetailsPage;
