'use client';
import React, { useState } from 'react';

// Types
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  netPrice: number;
  offerPrice: number;
  currency: string;
  image: string;
  category: string;
  stock: boolean;
  rating: number;
  isTrending: boolean;
  isPopular: boolean;
}

interface OrderItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

interface Order {
  orderId: string;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  subtotal: number;
  shippingCharges: number;
  tax: number;
  discount: number;
  total: number;
  estimatedDelivery: string;
}

const OrderDetailsPage: React.FC = () => {
  const [order] = useState<Order>({
    orderId: 'ORD-2025-001234',
    orderDate: '2025-09-20',
    status: 'confirmed',
    items: [
      {
        product: {
          id: 15,
          title: "Gold Beaded Shubh Labh",
          description: "Golden Finish Hanging",
          price: 500,
          netPrice: 550,
          offerPrice: 500,
          currency: "INR",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
          category: "Shubh Labh",
          stock: true,
          rating: 4.3,
          isTrending: false,
          isPopular: true
        },
        quantity: 2,
        selectedColor: 'Golden',
        selectedSize: 'Medium'
      },
    ],
    shippingAddress: {
      fullName: 'Rahul Sharma',
      phone: '+91 9876543210',
      email: 'rahul.sharma@email.com',
      addressLine1: '123, Krishna Apartment',
      addressLine2: 'Near Temple, Sector 15',
      city: 'Jalna',
      state: 'Maharashtra',
      pincode: '431203',
      landmark: 'Near HDFC Bank'
    },
    paymentMethod: 'UPI Payment',
    paymentStatus: 'paid',
    subtotal: 1750,
    shippingCharges: 50,
    tax: 175,
    discount: 100,
    total: 1875,
    estimatedDelivery: '2025-09-25'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'confirmed': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'processing': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'shipped': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'delivered': return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-2xl  text-gray-900 mb-1">
                Order Details
              </h1>
              <div className="space-y-1">
                <p className="text-gray-600">
                  Order ID: <span className="font-semibold text-gray-900">{order.orderId}</span>
                </p>
                <p className="text-gray-600">
                  Placed on: <span className="font-medium text-gray-900">{formatDate(order.orderDate)}</span>
                </p>
                <p className="text-gray-600">
                  Expected Delivery: <span className="font-medium text-gray-900">{formatDate(order.estimatedDelivery)}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-2">
              <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(order.status)}`}>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
              <p className="text-sm text-gray-600 flex items-center">
                Payment: 
                <span className={`font-semibold ml-1 flex items-center ${getPaymentStatusColor(order.paymentStatus)}`}>
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"/>
                  </svg>
                  {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl  text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                </svg>
                Order Items 
                <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                  {order.items.length}
                </span>
              </h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
                    <div className="flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.title}
                        className="w-full sm:w-24 h-24 object-cover rounded-lg shadow-sm"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                        <div className="flex-grow">
                          <h3 className="font-semibold text-gray-900 mb-1 text-lg">
                            {item.product.title}
                          </h3>
                          <p className="text-gray-600 mb-3">{item.product.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                              </svg>
                              {item.product.category}
                            </span>
                            {item.selectedColor && (
                              <span className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                                </svg>
                                {item.selectedColor}
                              </span>
                            )}
                            {item.selectedSize && (
                              <span className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"/>
                                </svg>
                                {item.selectedSize}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                              <span className="text-sm font-medium text-gray-700">{item.product.rating}</span>
                            </div>
                            {item.product.isPopular && (
                              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
                                </svg>
                                Popular
                              </span>
                            )}
                            {item.product.isTrending && (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                                </svg>
                                Trending
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-left sm:text-right flex-shrink-0">
                          <div className="bg-white p-3 rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-600 mb-1">Quantity: <span className="font-semibold">{item.quantity}</span></p>
                            <div className="mb-2">
                              {item.product.netPrice > item.product.offerPrice && (
                                <span className="text-sm text-gray-400 line-through mr-2">
                                  ₹{item.product.netPrice}
                                </span>
                              )}
                              <span className="text-lg font-bold text-gray-900">
                                ₹{item.product.offerPrice}
                              </span>
                            </div>
                            <p className="text-sm font-semibold text-blue-600">
                              Total: ₹{item.product.offerPrice * item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary & Details */}
          <div className="space-y-6">
            {/* Price Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl  text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
                </svg>
                Price Details
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({order.items.length} items)</span>
                  <span className="font-medium">₹{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Charges</span>
                  <span className="font-medium">₹{order.shippingCharges}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (GST)</span>
                  <span className="font-medium">₹{order.tax}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount Applied</span>
                    <span className="font-medium">-₹{order.discount}</span>
                  </div>
                )}
                <hr className="border-gray-200 my-3" />
                <div className="flex justify-between text-lg font-bold text-gray-900 bg-blue-50 p-3 rounded-lg">
                  <span>Total Amount</span>
                  <span>₹{order.total}</span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl  text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"/>
                </svg>
                Payment Info
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Method</span>
                  <span className="font-semibold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg">
                    {order.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-semibold px-3 py-1 rounded-lg ${
                    order.paymentStatus === 'paid' 
                      ? 'bg-green-50 text-green-700' 
                      : order.paymentStatus === 'pending'
                      ? 'bg-yellow-50 text-yellow-700'
                      : 'bg-red-50 text-red-700'
                  }`}>
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                Delivery Address
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900 text-lg">{order.shippingAddress.fullName}</p>
                  <div className="text-gray-700 space-y-1">
                    <p>{order.shippingAddress.addressLine1}</p>
                    {order.shippingAddress.addressLine2 && (
                      <p>{order.shippingAddress.addressLine2}</p>
                    )}
                    <p className="font-medium">
                      {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                    </p>
                    {order.shippingAddress.landmark && (
                      <p className="text-sm text-gray-600 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                        </svg>
                        Landmark: {order.shippingAddress.landmark}
                      </p>
                    )}
                  </div>
                  <div className="pt-2 mt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                      {order.shippingAddress.phone}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      {order.shippingAddress.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OrderDetailsPage;