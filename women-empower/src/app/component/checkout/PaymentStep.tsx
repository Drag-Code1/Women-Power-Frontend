"use client"
import { useState } from "react";
import {
  LocalShipping,
  Home,
  Work,
  Business,
  Add,
  Edit,
  Delete,
  CreditCard,
  AccountBalance,
  Payment,
  AccountBalanceWallet,
  QrCode,
  Visibility,
  VisibilityOff,
  ArrowBack,
  Check,
  LocationOn,
  Phone,
  Person
} from '@mui/icons-material';
import { useSearchParams } from "next/navigation";
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const PaymentStep:React.FC=()=>{
  const searchParams=useSearchParams();
  const currentStep=searchParams.get('step');
  console.log("currentStep in payment",currentStep);
    const cartItems: CartItem[] = [
    {
      id: '1',
      name: 'Premium Headphones',
      price: 3999,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
    }
  ];
    const validateUPI = () => {
    return upiDetails.upiId.includes('@') && upiDetails.upiId.length > 5;
  };
    const proceedToPay = () => {
  const url = new URL(window.location.href);
                    url.searchParams.set('step', 'confirmation');
                    history.pushState({}, "", url);
  };

  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('standard');

  const totalMRP = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = selectedDeliveryOption === 'express' ? 99 : 0;
  const totalAmount = totalMRP + deliveryFee;
  const paymentMethods = [
    { id: 'card', name: 'Credit / Debit Card', icon: CreditCard },
    { id: 'netbanking', name: 'Netbanking', icon: AccountBalance },
    { id: 'upi', name: 'UPI', icon: Payment },
    { id: 'wallet', name: 'Wallets', icon: AccountBalanceWallet }
  ];

    // const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('standard');
    const [selectedAddress, setSelectedAddress] = useState<string>('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [showCardForm, setShowCardForm] = useState(false);
    const [showUpiForm, setShowUpiForm] = useState(false);
    const [pincodeServiceable, setPincodeServiceable] = useState<boolean | null>(null);
    const [isCheckingPincode, setIsCheckingPincode] = useState(false);
      const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
      });
    
      const [upiDetails, setUpiDetails] = useState({
        upiId: '',
        showQr: false
      });
    
  const generateQRCode = () => {
    setUpiDetails(prev => ({ ...prev, showQr: true }));
  };

  const handleExpiryChange = (value: string) => {
    // Remove non-digits and limit to 4
    let cleaned = value.replace(/\D/g, '').slice(0, 4);
    // Add slash after 2 digits
    if (cleaned.length >= 2) {
      cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    setCardDetails(prev => ({ ...prev, expiry: cleaned }));
  };

  const validateCard = () => {
    const { number, name, expiry, cvv } = cardDetails;
    return number.replace(/\s/g, '').length === 16 && 
           name.trim().length > 0 && 
           expiry.length === 5 && 
           cvv.length === 3;
  };

  const handleCardNumberChange = (value: string) => {
    // Remove non-digits and limit to 16
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    // Add spaces every 4 digits
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    setCardDetails(prev => ({ ...prev, number: formatted }));
  };
    return(

         <div className={`min-h-screen bg-white py-4 px-4 lg:px-8 ${currentStep === 'payment' ? 'block' : 'hidden'}`}>
                <div className="max-w-6xl mx-auto">
                  <div className="mb-4">
                    <button
                      onClick={() =>{
                        const url = new URL(window.location.href);
                        url.searchParams.set('step', 'delivery');
                        history.pushState({}, "", url);
                      }}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                    >
                      <ArrowBack className="w-5 h-5" />
                      <span>Back to Delivery</span>
                    </button>
                  </div>
        
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Payment Methods */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="bg-white rounded-lg shadow-sm">
                        {/* Payment Method Selection */}
                        <div className="p-6 border-b">
                          <h2 className="text-xl font-bold text-gray-900 mb-4">Other Payments</h2>
                          <p className="text-gray-600 text-sm mb-6">Pay using cards, Net Banking, Wallets</p>
                          
                          <div className="space-y-1">
                            {paymentMethods.map((method) => {
                              const Icon = method.icon;
                              return (
                                <button
                                  key={method.id}
                                  onClick={() => {
                                    setSelectedPaymentMethod(method.id);
                                    setShowCardForm(method.id === 'card');
                                    setShowUpiForm(method.id === 'upi');
                                  }}
                                  className={`w-full flex items-center space-x-4 p-4 rounded-lg border-2 transition-colors ${
                                    selectedPaymentMethod === method.id
                                      ? 'border-blue-500 bg-blue-50'
                                      : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                >
                                  <Icon className="w-6 h-6 text-gray-600" />
                                  <span className="font-medium text-gray-900">{method.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
        
                        {/* Payment Forms */}
                        {showCardForm && (
                          <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Enter Debit / Credit Card Details</h3>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={cardDetails.number}
                                    onChange={(e) => handleCardNumberChange(e.target.value)}
                                    placeholder="Enter card number here"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-10"
                                  />
                                  <CreditCard className="absolute right-3 top-3 w-6 h-6 text-gray-400" />
                                </div>
                              </div>
        
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                                <input
                                  type="text"
                                  value={cardDetails.name}
                                  onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value.toUpperCase() }))}
                                  placeholder="Enter name on card"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
        
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry</label>
                                  <input
                                    type="text"
                                    value={cardDetails.expiry}
                                    onChange={(e) => handleExpiryChange(e.target.value)}
                                    placeholder="MM / YY"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                                  <input
                                    type="text"
                                    value={cardDetails.cvv}
                                    onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) }))}
                                    placeholder="CVV"
                                    maxLength={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                  />
                                </div>
                              </div>
        
                              <button
                                onClick={proceedToPay}
                                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                              >
                                Proceed to pay
                              </button>
                            </div>
                          </div>
                        )}
        
                        {showUpiForm && (
                          <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pay by any UPI app</h3>
                            <p className="text-gray-600 text-sm mb-6">
                              Scan the QR using any UPI app on your mobile phone like PhonePe, Paytm, GooglePay, BHIM, etc
                            </p>
        
                            <div className="flex justify-center space-x-4 mb-6">
                              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">Ph</div>
                              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">GP</div>
                              <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center text-white text-sm font-bold">PT</div>
                              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">BH</div>
                              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold">PY</div>
                              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white text-sm font-bold">AM</div>
                            </div>
        
                            {!upiDetails.showQr ? (
                              <div className="text-center mb-6">
                                <button
                                  onClick={generateQRCode}
                                  className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                                >
                                  Generate QR Code
                                </button>
                              </div>
                            ) : (
                              <div className="text-center mb-6">
                                <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto flex items-center justify-center mb-4">
                                  <QrCode className="w-32 h-32 text-gray-600" />
                                </div>
                                <p className="text-sm text-gray-600">Scan this QR code with any UPI app</p>
                              </div>
                            )}
        
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID / VPA</label>
                                <input
                                  type="text"
                                  value={upiDetails.upiId}
                                  onChange={(e) => setUpiDetails(prev => ({ ...prev, upiId: e.target.value }))}
                                  placeholder="e.g rakesh@upi"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-sm text-gray-500 mt-2">A collect request will be sent to this UPI ID</p>
                              </div>
        
                              <div className="text-center text-xs text-gray-400 flex items-center justify-center space-x-2">
                                <span>secured by</span>
                                <span className="font-bold text-blue-600">JUSPAY</span>
                              </div>
        
                              <button
                                onClick={proceedToPay}
                                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                              >
                                Proceed to pay
                              </button>
                            </div>
                          </div>
                        )}
        
                        {selectedPaymentMethod === 'netbanking' && (
                          <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Bank</h3>
                            <div className="grid grid-cols-2 gap-3 mb-6">
                              {['SBI', 'HDFC', 'ICICI', 'Axis Bank', 'Kotak', 'PNB'].map(bank => (
                                <button
                                  key={bank}
                                  className="p-3 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-center font-medium"
                                >
                                  {bank}
                                </button>
                              ))}
                            </div>
                            <button
                              onClick={proceedToPay}
                              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                            >
                              Proceed to pay
                            </button>
                          </div>
                        )}
        
                        {selectedPaymentMethod === 'wallet' && (
                          <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Wallet</h3>
                            <div className="space-y-3 mb-6">
                              {['Paytm Wallet', 'PhonePe Wallet', 'Amazon Pay', 'Mobikwik'].map(wallet => (
                                <button
                                  key={wallet}
                                  className="w-full p-3 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-left font-medium"
                                >
                                  {wallet}
                                </button>
                              ))}
                            </div>
                            <button
                              onClick={proceedToPay}
                              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                            >
                              Proceed to pay
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
        
                    {/* Price Summary */}
                    <div className="lg:col-span-1">
                      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-gray-900">PRICE DETAILS</h3>
                          <button className="text-blue-600 text-sm hover:underline">
                            View {cartItems.length} Item
                          </button>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    )
}