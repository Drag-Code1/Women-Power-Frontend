import { ViewItems } from "../ui/button/ViewItems"

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
interface productAmount{
    totalAmount:number
}
interface priceSummaryProps{
    totalAmount:number
}
export const PriceSummary:React.FC<priceSummaryProps>=({totalAmount})=>{
  const deliveryFee = 'express' === 'express' ? 99 : 0;
    const cartItems: CartItem[] = [
    {
      id: '1',
      name: 'Premium Headphones',
      price: 3999,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
    }
  ];
  const totalMRP = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return(
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">PRICE DETAILS</h3>
              <ViewItems />
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total MRP</span>
                    <span className="font-semibold">₹{totalMRP.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold">
                      {deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Payable Amount</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
                  <button
                //   onClick={proceedToPayment}
                  className="w-full bg-[#695946] text-white py-3 rounded-lg font-semibold mt-6 hover:bg-[#695946] transition-colors"
                >
                  CONTINUE
                </button>
              </div>
            </div>
    )
}
