"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";

import { useCart } from "@/app/contexts/CartContext";
import { useAuth } from "@/app/contexts/AuthContext";
import { API_BASE_URL } from "@/app/lib/config";
import R2Image from "@/app/component/dashboard/dashboardallproductstab/R2Image";
import { DEFAULT_THUMBNAIL } from "@/app/data/dashboardproductdata";
import { loadRazorpayScript } from "../lib/razorpayLoader";
import { createPaymentOrder, verifyPayment } from "../lib/paymentApi";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Address {
  id: string;
  type: "Home" | "Office" | string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  mobileNo: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems, loading, updateCartItem, removeFromCart } = useCart();
  const { user, token } = useAuth();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<"card" | "upi" | "netbanking">("card");
  const [paymentLoading, setPaymentLoading] = useState(false);

  // New Address inline states
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    type: "Home",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    mobileNo: "",
  });

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.product?.price || "0");
      const discountAmount = (price * (item.product?.discount || 0)) / 100;
      const finalPrice = price - discountAmount;
      return sum + finalPrice * item.quantity;
    }, 0);
  }, [cartItems]);

  const shipping = 0;
  const discount = 0;
  const total = Math.max(0, subtotal + shipping - discount);

  const iconForType = (type: string) => {
    if (type === "Home") return <HomeIcon className="w-5 h-5" />;
    if (type === "Office") return <WorkIcon className="w-5 h-5" />;
    return <LocationOnIcon className="w-5 h-5" />;
  };

  const loadAddresses = async () => {
    if (!user || !token) {
      console.log("[Checkout] Skipping address load, no user/token");
      setAddresses([]);
      setSelectedAddress("");
      setAddressError(null);
      return;
    }
    console.log("[Checkout] Loading addresses for user", user.id);
    setAddressLoading(true);
    setAddressError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/address/${user.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });
      console.log("[Checkout] Address fetch status", res.status);
      if (!res.ok) {
        setAddressError(`Failed to load addresses (status ${res.status})`);
        setAddresses([]);
        setSelectedAddress("");
        return;
      }
      const data = await res.json();
      console.log("[Checkout] Address response", data);
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

  const handleAddAddress = async () => {
    if (!(newAddress.address && newAddress.city && newAddress.state && newAddress.pincode && newAddress.mobileNo)) {
      alert("Please fill all required fields");
      return;
    }
    if (!token || !user) return;
    
    setAddressLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...newAddress, userId: user.id }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to add address");
      }
      
      const body = await res.json().catch(() => ({}));
      await loadAddresses();
      
      if (body?.data?.id) {
         setSelectedAddress(body.data.id);
      }
      
      setIsAddingAddress(false);
      setNewAddress({ type: "Home", address: "", city: "", state: "", pincode: "", landmark: "", mobileNo: "" });
    } catch (err: any) {
      console.error("Add address error:", err);
      alert("Failed to add address. Please try again.");
    } finally {
      setAddressLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, token]);

  const handlePlaceOrder = async () => {
    if (!user || !token) {
      router.push("/login");
      return;
    }
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
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
        notes: { paymentIntentId, selectedPayment },
        handler: async (response: any) => {
          try {
            const verifyRes = await verifyPayment(response, token || undefined);
            alert("Payment successful! Your order has been placed.");
            router.push(`/orderdetails?id=${verifyRes.data.orderId}`);
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
        modal: {
          ondismiss: () => setPaymentLoading(false),
        },
      });

      rzp.on("payment.failed", (resp: any) => {
        console.error("Payment failed", resp?.error);
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
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Back"
            >
              <ArrowBackIcon className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-[#61503c]/10">
                <ShoppingCartOutlined className="w-6 h-6 text-[#61503c]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
                <p className="text-sm text-gray-500">
                  Review your items, select an address, and choose payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: address + payment */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border rounded-xl shadow-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <div>
                  <p className="text-sm text-gray-500">Step 1</p>
                  <h2 className="text-lg font-semibold text-gray-900">Delivery Address</h2>
                </div>
                {!isAddingAddress && (
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="text-sm font-semibold text-[#61503c] bg-[#61503c]/10 px-3 py-1 rounded-md hover:bg-[#61503c]/20 transition-colors"
                  >
                    + Add New Address
                  </button>
                )}
              </div>
              <div className="p-6 space-y-4">
                {addressLoading ? (
                  <p className="text-sm text-gray-500">Loading addresses…</p>
                ) : addressError ? (
                  <p className="text-sm text-red-600">{addressError}</p>
                ) : (
                  <div className="space-y-3">
                    {addresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={`flex items-start gap-3 border rounded-lg p-4 cursor-pointer transition ${selectedAddress === addr.id
                            ? "border-[#61503c] bg-[#61503c]/5"
                            : "border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <input
                          type="radio"
                          className="mt-1"
                          checked={selectedAddress === addr.id}
                          onChange={() => setSelectedAddress(addr.id)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[#61503c]">{iconForType(addr.type)}</span>
                            <span className="text-sm font-semibold text-gray-900">{addr.type}</span>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{addr.address}</p>
                          <p className="text-sm text-gray-700">
                            {addr.city}, {addr.state} - {addr.pincode}
                          </p>
                          {addr.landmark && (
                            <p className="text-xs text-gray-500">Landmark: {addr.landmark}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">Mobile: {addr.mobileNo}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                {isAddingAddress && (
                  <div className="border border-[#61503c]/30 rounded-lg p-4 bg-[#61503c]/5 mt-4 space-y-4">
                    <h3 className="text-md font-semibold text-gray-900 mb-2">Add New Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                        <select
                          className="w-full text-sm p-2 border rounded-md"
                          value={newAddress.type}
                          onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                        >
                          <option value="Home">Home</option>
                          <option value="Office">Office</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Mobile No</label>
                        <input
                          type="tel"
                          placeholder="Phone number"
                          className="w-full text-sm p-2 border rounded-md"
                          value={newAddress.mobileNo}
                          onChange={(e) => setNewAddress({ ...newAddress, mobileNo: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Full Address</label>
                      <textarea
                        rows={2}
                        placeholder="Flat, House no., Building, Company, Apartment"
                        className="w-full text-sm p-2 border rounded-md"
                        value={newAddress.address}
                        onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="col-span-2 md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          placeholder="City/Town/District"
                          className="w-full text-sm p-2 border rounded-md"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        />
                      </div>
                      <div className="col-span-1 border-gray-300">
                        <label className="block text-xs font-medium text-gray-700 mb-1">State</label>
                        <input
                          type="text"
                          placeholder="State"
                          className="w-full text-sm p-2 border rounded-md"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        />
                      </div>
                      <div className="col-span-1 border-gray-300">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Pincode</label>
                        <input
                          type="text"
                          placeholder="6-digit"
                          className="w-full text-sm p-2 border rounded-md"
                          value={newAddress.pincode}
                          onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Landmark (Optional)</label>
                      <input
                        type="text"
                        placeholder="E.g. Near Apollo Hospital"
                        className="w-full text-sm p-2 border rounded-md"
                        value={newAddress.landmark}
                        onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-3 justify-end mt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleAddAddress}
                        disabled={addressLoading}
                        className="px-4 py-2 text-sm text-white bg-[#61503c] rounded-md hover:bg-[#504030] disabled:opacity-50"
                      >
                        {addressLoading ? "Saving..." : "Save Address"}
                      </button>
                    </div>
                  </div>
                )}

                {!isAddingAddress && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={loadAddresses}
                      className="text-xs text-gray-600 hover:underline"
                      disabled={addressLoading}
                    >
                      {addressLoading ? "Refreshing…" : "Refresh Addresses"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white border rounded-xl shadow-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <div>
                  <p className="text-sm text-gray-500">Step 2</p>
                  <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
                </div>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { id: "card" as const, label: "Card (Credit/Debit)", icon: <CreditCardIcon className="w-5 h-5" /> },
                  { id: "upi" as const, label: "UPI / QR", icon: <PaymentIcon className="w-5 h-5" /> },
                  { id: "netbanking" as const, label: "Netbanking", icon: <AccountBalanceIcon className="w-5 h-5" /> },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition ${selectedPayment === method.id
                        ? "border-[#61503c] bg-[#61503c]/5"
                        : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <input
                      type="radio"
                      className="mt-1"
                      checked={selectedPayment === method.id}
                      onChange={() => setSelectedPayment(method.id)}
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-[#61503c]">{method.icon}</span>
                      <span className="text-sm font-semibold text-gray-900">{method.label}</span>
                    </div>
                  </label>
                ))}
                <p className="text-xs text-gray-500">
                  Note: This page is for review; integrate your gateway call here if needed.
                </p>
              </div>
            </div>
          </div>

          {/* Right: order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-xl shadow-sm sticky top-4">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-700">
                    <span>Items ({cartItems.length})</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-semibold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-[#61503c]">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading || cartItems.length === 0 || paymentLoading}
                    className="w-full bg-gradient-to-r from-[#61503c] to-[#61503c]/90 text-white py-3 rounded-lg font-semibold hover:from-[#61503c]/90 hover:to-[#61503c] transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {paymentLoading ? "Processing..." : "Pay & Place Order"}
                  </button>
                  <button
                    onClick={() => router.push("/cart")}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    Back to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white border rounded-xl shadow-sm">
              <div className="p-6 border-b">
                <h4 className="text-sm font-semibold text-gray-800">Items in your order</h4>
              </div>
              <div className="divide-y">
                {loading ? (
                  <div className="p-4 text-sm text-gray-500">Loading cart…</div>
                ) : cartItems.length === 0 ? (
                  <div className="p-4 text-sm text-gray-500">Your cart is empty.</div>
                ) : (
                  cartItems.map((item) => {
                    const price = parseFloat(item.product?.price || "0");
                    const discountAmount = (price * (item.product?.discount || 0)) / 100;
                    const finalPrice = price - discountAmount;
                    return (
                      <div key={item.id} className="p-4 flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden border bg-gray-50">
                          <R2Image
                            src={item.product?.thumbnail || ""}
                            fallbackSrc={DEFAULT_THUMBNAIL}
                            alt={item.product?.p_Name || "Product"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {item.product?.p_Name || "Product"}
                          </p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          <p className="text-sm text-[#61503c] font-semibold">₹{finalPrice.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCartItem(item.id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-1 border rounded-lg text-sm hover:bg-gray-50"
                          >
                            -
                          </button>
                          <button
                            onClick={() => updateCartItem(item.id, item.quantity + 1)}
                            className="px-2 py-1 border rounded-lg text-sm hover:bg-gray-50"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="px-2 py-1 border rounded-lg text-sm text-red-600 hover:bg-red-50"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
