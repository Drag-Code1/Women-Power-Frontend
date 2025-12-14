"use client";

import React, { useEffect, useMemo, useState } from "react";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Delete from "@mui/icons-material/Delete";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";

import { useCart } from "@/app/contexts/CartContext";
import { useAuth } from "@/app/contexts/AuthContext";
import R2Image from "../component/dashboard/dashboardallproductstab/R2Image";
import { DEFAULT_THUMBNAIL } from "@/app/data/dashboardproductdata";
import { loadRazorpayScript } from "../lib/razorpayLoader";
import { createPaymentOrder, verifyPayment } from "../lib/paymentApi";
import { API_BASE_URL } from "../lib/config";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Address {
  id: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  mobileNo: string;
  type?: string;
}

const CartPage: React.FC = () => {
  const router = useRouter();
  const { cartItems, updateCartItem, removeFromCart, loading } = useCart();
  const { user, token } = useAuth();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);

  // Compute totals from real cart data
  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.product?.price || "0");
      const discountAmount = (price * (item.product?.discount || 0)) / 100;
      const finalPrice = price - discountAmount;
      return total + finalPrice * item.quantity;
    }, 0);
  }, [cartItems]);

  const shipping = 0;
  const discount = 0;
  const finalTotal = Math.max(0, subtotal + shipping - discount);

  const loadAddresses = async () => {
    if (!user || !token) {
      console.log("[Cart] Skipping address load, no user/token");
      setAddresses([]);
      setSelectedAddress("");
      setAddressError(null);
      return;
    }

    console.log("[Cart] Loading addresses for user", user.id);
    setAddressLoading(true);
    setAddressError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/address/${user.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("[Cart] Address fetch status", res.status);
      if (!res.ok) {
        setAddressError(`Failed to load addresses (status ${res.status})`);
        setAddresses([]);
        setSelectedAddress("");
        return;
      }
      const data = await res.json();
      console.log("[Cart] Address response", data);
      if (Array.isArray(data?.data)) {
        setAddresses(data.data);
        if (data.data.length > 0) {
          setSelectedAddress((prev) => prev || data.data[0].id);
        } else {
          setSelectedAddress("");
        }
      } else {
        setAddresses([]);
        setSelectedAddress("");
      }
    } catch (err) {
      console.error("Failed to load addresses", err);
      setAddressError("Could not load saved addresses. Please try again.");
      setAddresses([]);
      setSelectedAddress("");
    } finally {
      setAddressLoading(false);
    }
  };

  // Load addresses on mount / auth change
  useEffect(() => {
    loadAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, token]);

  const handleUpdateQuantity = async (cartItemId: string, change: number) => {
    const item = cartItems.find((it) => it.id === cartItemId);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + change);
    try {
      await updateCartItem(cartItemId, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity");
    }
  };

  const handleRemoveItem = async (cartItemId: string) => {
    try {
      await removeFromCart(cartItemId);
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item");
    }
  };

  const handleCheckout = async () => {
    if (!user || !token) {
      router.push("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    setPaymentLoading(true);

    const sdkReady = await loadRazorpayScript();
    if (!sdkReady || !window.Razorpay) {
      alert("Unable to load Razorpay. Please check your network and try again.");
      setPaymentLoading(false);
      return;
    }

    try {
      console.log("🧾 Creating Razorpay order...");
      const createRes = await createPaymentOrder(
        selectedAddress,
        cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        token || undefined
      );

      const { orderId, amount, currency, keyId, paymentIntentId } = createRes.data;
      const razorpayKey = keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";

      const rzp = new window.Razorpay({
        key: razorpayKey,
        amount: amount.toString(),
        currency,
        name: "Women Empower",
        description: "Complete your purchase",
        order_id: orderId,
        notes: { paymentIntentId },
        handler: async (response: any) => {
          console.log("✅ Razorpay success handler", response);
          try {
            await verifyPayment(response, token || undefined);
            alert("Payment successful! Your order has been placed.");
            router.push("/orderdetails");
          } catch (err: any) {
            console.error("Payment verification failed", err);
            alert(err?.message || "Payment verification failed");
          } finally {
            setPaymentLoading(false);
          }
        },
        prefill: {
          email: user?.email,
          contact: user?.mobileNo,
          name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
        },
        method: {
          card: true,
          upi: true,
        },
        config: {
          display: {
            blocks: {
              upi: {
                name: "UPI / QR",
                instruments: [{ method: "upi" }],
              },
              card: {
                name: "Cards",
                instruments: [{ method: "card" }],
              },
            },
            sequence: ["block.upi", "block.card"],
            preferences: {
              show_default_blocks: true,
            },
          },
        },
        theme: { color: "#61503c" },
        modal: { ondismiss: () => setPaymentLoading(false) },
      });

      rzp.on("payment.failed", (resp: any) => {
        console.error("❌ Payment failed", resp?.error);
        alert(resp?.error?.description || "Payment failed. Please try again.");
        setPaymentLoading(false);
      });

      rzp.open();
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert(error?.message || "Unable to start payment. Please try again.");
      setPaymentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#61503c]/10 rounded-full">
                  <ShoppingCartOutlined className="w-6 h-6 text-[#61503c]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                  <p className="text-sm text-gray-500">
                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#61503c] mb-4"></div>
                    <p className="text-gray-600">Loading cart...</p>
                  </div>
                ) : cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="p-6 bg-gray-100 rounded-full mb-6">
                      <ShoppingCartOutlined className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-500 mb-6 max-w-sm">
                      Discover amazing art pieces and add them to your cart to see them here
                    </p>
                    <button
                      onClick={() => router.push("/")}
                      className="px-6 py-3 bg-[#61503c] text-white rounded-lg hover:bg-[#61503c]/90 font-medium transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => {
                      const price = parseFloat(item.product?.price || "0");
                      const discountAmount = (price * (item.product?.discount || 0)) / 100;
                      const finalPrice = price - discountAmount;
                      const originalPrice = price;

                      return (
                        <div
                          key={item.id}
                          className="group bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="relative flex-shrink-0">
                              {item.product?.thumbnail ? (
                                <R2Image
                                  src={item.product.thumbnail}
                                  fallbackSrc={DEFAULT_THUMBNAIL}
                                  alt={item.product.p_Name}
                                  className="w-20 h-20 rounded-lg object-cover shadow-inner"
                                />
                              ) : (
                                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shadow-inner">
                                  <span className="text-sm font-medium text-gray-600">ART</span>
                                </div>
                              )}
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 text-black text-xs rounded-full flex items-center justify-center font-bold">
                                {item.quantity}
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 text-lg mb-1">
                                {item.product?.p_Name || "Unknown Product"}
                              </h3>
                              <p className="text-sm text-gray-500 mb-2">Category: Digital Art</p>
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-[#61503c]">
                                  ₹{finalPrice.toFixed(2)}
                                </span>
                                {item.product?.discount && item.product.discount > 0 && (
                                  <span className="text-sm text-gray-400 line-through">
                                    ₹{originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col items-end space-y-2">
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Delete className="w-5 h-5" />
                              </button>

                              <div className="flex items-center bg-gray-100 rounded-lg">
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, -1)}
                                  className="px-3 py-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                                >
                                  <Remove className="w-4 h-4 text-gray-600" />
                                </button>
                                <span className="w-12 text-center font-medium text-gray-800 text-sm py-2">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, 1)}
                                  className="px-3 py-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                                >
                                  <Add className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border sticky top-4">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 space-y-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>₹{shipping}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-[#61503c]">
                          ₹{finalTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-800">Delivery Address</span>
                        <span className="text-xs text-gray-500">{addresses.length || 0} saved</span>
                      </div>
                      {addressLoading ? (
                        <p className="text-xs text-gray-500">Loading addresses…</p>
                      ) : addressError ? (
                        <div className="text-xs text-red-600">{addressError}</div>
                      ) : (
                        <>
                          <select
                            value={selectedAddress}
                            onChange={(e) => setSelectedAddress(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#61503c]"
                          >
                            <option value="" disabled>
                              {addresses.length === 0 ? "No address found" : "Choose address"}
                            </option>
                            {addresses.map((addr) => (
                              <option key={addr.id} value={addr.id}>
                                {addr.address} {addr.city && `- ${addr.city}`}
                              </option>
                            ))}
                          </select>
                          {addresses.length === 0 && (
                            <p className="text-xs text-gray-500">You have no saved addresses yet.</p>
                          )}
                        </>
                      )}
                      <div className="flex justify-between items-center pt-1">
                        <button
                          type="button"
                          onClick={loadAddresses}
                          className="text-xs text-gray-600 hover:underline"
                          disabled={addressLoading}
                        >
                          {addressLoading ? "Refreshing…" : "Refresh"}
                        </button>
                        <button
                          type="button"
                          onClick={() => router.push("/profile")}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Add / Manage addresses
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={paymentLoading || cartItems.length === 0}
                      className="w-full bg-gradient-to-r from-[#61503c] to-[#61503c]/90 text-white py-4 rounded-lg font-semibold text-lg hover:from-[#61503c]/90 hover:to-[#61503c] transition-all shadow-lg flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span>
                        {paymentLoading ? "Processing..." : "Pay with Razorpay (Card / UPI / QR)"}
                      </span>
                      {!paymentLoading && <ArrowForward className="w-5 h-5 ml-2" />}
                    </button>

                    <button
                      onClick={() => router.push("/")}
                      className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                      Secure checkout • Cards • UPI with QR scanner • 24/7 support
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
