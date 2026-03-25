"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Eye, X, Package, Calendar, ShoppingBag, Hash } from "lucide-react";
import "@/app/globals.css";
import { useAuth } from "@/app/contexts/AuthContext";
import { getToken } from "@/app/lib/authApi";
import { API_BASE_URL } from "@/app/lib/config";
import R2Image from "@/app/component/common/R2Image";
import { DEFAULT_THUMBNAIL } from "@/app/data/dashboardproductdata";

interface OrderItem {
  quantity: number;
  price: string;
  Product: {
    p_Name: string;
    thumbnail: string;
    price: string;
  };
}

interface Order {
  id: string;
  order_date: string;
  firstName: string;
  lastName: string;
  productCount: number;
  totalPrice: string;
  address_id?: string;
  address?: {
    city: string;
    state: string;
    pincode: string;
    address: string;
    mobileNo: string;
    type: string;
  };
  OrderItems?: OrderItem[];
}

const OrderDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [fetchedAddress, setFetchedAddress] = useState<Order["address"] | null>(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = async () => {
    const token = getToken();
    if (!token) {
      setError("Missing auth token");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/order`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || `Failed to load orders (status ${res.status})`);
      }
      const body = await res.json();
      console.log("[Admin Orders] Response", body);
      if (Array.isArray(body?.data)) {
        setOrders(body.data);
      } else {
        setOrders([]);
      }
    } catch (err: any) {
      console.error("Failed to load orders", err);
      setError(err?.message || "Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role !== "admin") {
      setError("Access denied: admin only");
      return;
    }
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleViewOrder = async (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
    setLoading(true);

    const token = getToken();
    try {
      const res = await fetch(`${API_BASE_URL}/order/details/${order.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const body = await res.json();
        if (body.success && body.data) {
          setSelectedOrder({
            ...body.data,
            firstName: order.firstName || body.data.firstName,
            lastName: order.lastName || body.data.lastName,
            productCount: order.productCount || body.data.productCount,
            totalPrice: order.totalPrice || body.data.totalPrice,
          });
          if (body.data.Address) {
            setFetchedAddress(body.data.Address);
          }
        }
      }
    } catch (err) {
      console.error("Failed to fetch full order details", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      if (!selectedOrder?.address_id) {
        setFetchedAddress(selectedOrder?.address || null);
        return;
      }

      // If address is already available in the order object, use it
      if (selectedOrder.address) {
        setFetchedAddress(selectedOrder.address);
        return;
      }

      setAddressLoading(true);
      const token = getToken();
      try {
        const res = await fetch(`${API_BASE_URL}/address/details/${selectedOrder.address_id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const body = await res.json();
          if (body.success && body.data) {
            setFetchedAddress(body.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch address details", error);
      } finally {
        setAddressLoading(false);
      }
    };

    if (isModalOpen && selectedOrder) {
      fetchAddress();
    } else {
      setFetchedAddress(null);
    }
  }, [isModalOpen, selectedOrder]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(orders.length / itemsPerPage));

  const totalRevenue = useMemo(
    () => orders.reduce((sum, order) => sum + parseFloat(order.totalPrice || "0"), 0),
    [orders]
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Order Management</h1>
              <p className="text-gray-500 text-sm">View and manage all customer orders</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500 font-medium">Total Orders</p>
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              ₹{totalRevenue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500 font-medium">Products Sold</p>
              <ShoppingBag className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {orders.reduce((sum, o) => sum + (o.productCount || 0), 0)}
            </p>
          </div>
        </div>

        <div className="hidden lg:block bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-6 text-center text-sm text-gray-500">
                      Loading orders...
                    </td>
                  </tr>
                ) : currentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-6 text-center text-sm text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  currentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Hash className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{order.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {new Date(order.order_date).toLocaleDateString("en-IN")}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.firstName} {order.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <ShoppingBag className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {order.productCount} item{order.productCount !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">
                          ₹{parseFloat(order.totalPrice || "0").toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, orders.length)} of {orders.length} orders
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                Previous
              </button>
              <div className="flex space-x-1">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="lg:hidden space-y-4">
          {loading ? (
            <div className="bg-white rounded-xl shadow-lg p-5 text-center text-sm text-gray-500">Loading orders...</div>
          ) : currentOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-5 text-center text-sm text-gray-500">No orders found.</div>
          ) : (
            currentOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Hash className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-bold text-gray-900">{order.id}</span>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(order.order_date).toLocaleDateString("en-IN")}</span>
                  </div>
                  <div className="text-sm text-gray-800 font-medium">
                    {order.firstName} {order.lastName}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {order.productCount} item{order.productCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Amount:</span>
                    <span className="text-lg font-bold text-gray-900">
                      ₹{parseFloat(order.totalPrice || "0").toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleViewOrder(order)}
                  className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide">
            <div className="sticky top-0 bg-blue-500 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Order Details</h2>
                  <p className="text-blue-100 text-sm mt-1">{selectedOrder.id}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Customer</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {selectedOrder.firstName} {selectedOrder.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Order Date</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {new Date(selectedOrder.order_date).toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Products</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {selectedOrder.productCount} item{selectedOrder.productCount !== 1 ? "s" : ""}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Total Amount</p>
                  <p className="text-xl font-bold text-blue-600">
                    ₹{parseFloat(selectedOrder.totalPrice || "0").toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>

                {/* Products Section */}
                <div className="md:col-span-2 space-y-3">
                  <p className="text-xs text-gray-500 uppercase flex items-center gap-2">
                    <ShoppingBag className="w-3 h-3" /> Ordered Products
                  </p>
                  <div className="bg-gray-50 rounded-xl border border-gray-100 divide-y divide-gray-200">
                    {selectedOrder.OrderItems && selectedOrder.OrderItems.length > 0 ? (
                      selectedOrder.OrderItems.map((item, idx) => (
                        <div key={idx} className="p-4 flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-gray-200 flex-shrink-0">
                            <R2Image 
                              src={item.Product?.thumbnail} 
                              fallbackSrc={DEFAULT_THUMBNAIL}
                              alt={item.Product?.p_Name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">
                              {item.Product?.p_Name || "Unknown Product"}
                            </p>
                            <p className="text-xs text-gray-500">
                              Qty: <span className="font-semibold text-gray-700">{item.quantity}</span> × ₹{parseFloat(item.price).toLocaleString("en-IN")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-gray-900">
                              ₹{(item.quantity * parseFloat(item.price)).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center bg-white rounded-xl">
                        {loading ? (
                           <div className="flex flex-col items-center gap-2">
                             <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                             <p className="text-xs text-gray-500 tracking-tight">Loading products...</p>
                           </div>
                        ) : (
                          <p className="text-sm text-gray-400 italic">No products listed</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Address Section */}
                {(fetchedAddress || addressLoading) && (
                  <div className="md:col-span-2 bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
                    <div className="flex items-center gap-2 mb-4">
                      <Package className="w-4 h-4 text-blue-600" />
                      <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">Shipping Address</p>
                    </div>
                    {addressLoading ? (
                      <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-blue-100 rounded w-3/4"></div>
                        <div className="h-4 bg-blue-100 rounded w-1/2"></div>
                      </div>
                    ) : fetchedAddress ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-gray-900 leading-relaxed">
                            {fetchedAddress.address}
                          </p>
                          <p className="text-sm text-gray-600">
                            {fetchedAddress.city}, {fetchedAddress.state} - {fetchedAddress.pincode}
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-[10px] font-bold text-blue-600/60 uppercase mb-1">Contact Details</p>
                            <p className="text-sm font-bold text-gray-900">{fetchedAddress.mobileNo}</p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-1 bg-white border border-blue-200 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-tight">
                            {fetchedAddress.type}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Address not available</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 p-4 rounded-b-2xl border-t border-gray-200">
              <button
                onClick={closeModal}
                className="w-full py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDashboard;
