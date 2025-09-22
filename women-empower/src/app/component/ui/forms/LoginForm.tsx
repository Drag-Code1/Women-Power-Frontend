import { ArrowBack, Phone, Shield } from "@mui/icons-material";
import React, { SetStateAction, useState } from "react";
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  joinedDate: string;
}

interface loginProps{
  setIsLoggedIn_:React.Dispatch<SetStateAction<boolean>>;
}

export const LoginForm:React.FC<loginProps>=({setIsLoggedIn_})=>{
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 9876543210',
    avatar: '/images/man1.jpg',
    address: {
      street: '123 MG Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    joinedDate: 'January 2023'
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [mobileNumber, setMobileNumber] = useState('');
    //   const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [activeTab, setActiveTab] = useState('addresses');
      const [showMobileLogin, setShowMobileLogin] = useState(false);
      const [showOtpVerification, setShowOtpVerification] = useState(false);
     const handleMobileLogin = () => {
    if (mobileNumber.length === 10) {
      setShowMobileLogin(false);
      setShowOtpVerification(true);
    } else {
      alert('Please enter valid mobile number');
    }
  };

  const handleOtpVerification = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setShowOtpVerification(false);
      setIsLoggedIn_(true);
      setUser(prev => ({ ...prev, phone: `+91 ${mobileNumber}` }));
    } else {
      alert('Please enter complete OTP');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };
    return(
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
              {!showOtpVerification ? (
                <div className="bg-white rounded-2xl shadow-xl p-10">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#61503c] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
                    <p className="text-gray-600">Enter your mobile number to continue</p>
                  </div>
    
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                          <span className="text-gray-500 text-sm">+91</span>
                        </div>
                        <input
                          type="tel"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter 10-digit mobile number"
                          maxLength={10}
                        />
                      </div>
                    </div>
    
                    <button
                      onClick={handleMobileLogin}
                      disabled={mobileNumber.length !== 10}
                      className="w-full bg-[#61503c] text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      Send OTP
                    </button>
    
                    <div className="text-center">
                      <p className="text-xs text-gray-500">
                        By continuing, you agree to our Terms of Service and Privacy Policy
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-10">
                  <button
                    onClick={() => setShowOtpVerification(false)}
                    className="mb-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ArrowBack className="w-5 h-5 text-gray-600" />
                  </button>
    
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#61503c] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify OTP</h1>
                    <p className="text-gray-600">
                      We've sent a 6-digit code to +91 {mobileNumber}
                    </p>
                  </div>
    
                  <div className="space-y-6">
                    <div className="flex justify-center space-x-3">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          maxLength={1}
                        />
                      ))}
                    </div>
    
                    <button
                      onClick={handleOtpVerification}
                      disabled={otp.join('').length !== 6}
                      className="w-full bg-[#61503c] text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      Verify & Continue
                    </button>
    
                    <div className="text-center">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Resend OTP
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
)}