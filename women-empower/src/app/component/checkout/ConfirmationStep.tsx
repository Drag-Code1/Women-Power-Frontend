"use client"
import { Check } from "@mui/icons-material"
import { useSearchParams } from "next/navigation";
import { useState } from "react";
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const ConfirmationStep:React.FC = () => {
    const searchParams=useSearchParams();
    const currentStep=searchParams.get('step');
    const cartItems: CartItem[] = [
    {
      id: '1',
      name: 'Premium Headphones',
      price: 3999,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
    }
  ];
    // const [currentStep, setCurrentStep] = useState<'delivery' | 'payment' | 'confirmation'>('delivery');
  
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('standard');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  const totalMRP = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = selectedDeliveryOption === 'express' ? 99 : 0;
  const totalAmount = totalMRP + deliveryFee;

  return    <div className={`min-h-screen bg-white py-4 px-4 lg:px-8 ${currentStep === 'confirmation' ? 'block' : 'hidden'}`}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
              <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been successfully placed.</p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>
                <div className="text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-semibold">#ORD{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-semibold">₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-semibold capitalize">{selectedPaymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-semibold">
                      {selectedDeliveryOption === 'standard' ? '3-5 days' : 
                       selectedDeliveryOption === 'express' ? '1-2 days' : 'Available for pickup'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Track Order
                </button>
                <button 
                  // onClick={() =>}
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
}