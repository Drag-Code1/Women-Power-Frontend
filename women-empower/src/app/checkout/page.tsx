import CheckoutForm from "../component/ui/forms/CheckoutForm";

export default function CheckoutPage() {
  const orderSummary = [
    { name: "Acrylic Thali × 1", price: 750 },
    { name: "Acrylic frame - Blue × 1", price: 425 },
    { name: "3 Diya set - red × 1", price: 550 },
  ];

  const subtotal = orderSummary.reduce((acc, item) => acc + item.price, 0);
  const shipping = 100;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
      {/* Left: Billing form */}
      <CheckoutForm />

      {/* Right: Order Summary */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-[#6a5947]">Your order</h2>
        <div className="border-2 border-[#6a5947] bg-[#f6f0e2] p-6 rounded-lg shadow space-y-3">
          {orderSummary.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between text-gray-800 text-sm md:text-base"
            >
              <p>{item.name}</p>
              <p className="font-medium">₹{item.price}</p>
            </div>
          ))}
          <hr className="border-[#6a5947]/40" />
          <div className="flex justify-between font-medium text-gray-800">
            <p>Subtotal</p>
            <p>₹{subtotal}</p>
          </div>
          <div className="flex justify-between text-gray-700">
            <p>Shipping</p>
            <p>Flat rate: ₹{shipping}</p>
          </div>
          <div className="flex justify-between font-bold text-lg text-[#6a5947]">
            <p>Total</p>
            <p>₹{total}</p>
          </div>

          {/* Checkout Button (submits the form) */}
          <button
            type="submit"
            form="checkout-form" // 🔑 links to form
            className="w-full mt-4 bg-[#6a5947] text-[#f6f0e2] py-3 rounded-lg font-semibold hover:bg-[#5a4a3a] transition"
          >
            Place Order
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Note → If you enter wrong UPI ID by mistake, you can still pay through
          QR Code Scanner.
        </p>
      </div>
    </div>
  );
}