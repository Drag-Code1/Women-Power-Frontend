'use client';
import React, { useState, useEffect } from 'react';
import {
  Person,
  Phone,
  Email,
  LocationOn,
  ShoppingBag,
  Settings,
  Logout,
  Edit,
  Save,
  Cancel,
  Visibility,
  VisibilityOff,
  ArrowBack,
  LocalShipping,
  Receipt,
  Star,
  Shield,
  Help,
  Support,
  Add,
  Delete,
  Home,
  Work,
  Business
} from '@mui/icons-material';
import {ProfileSideBar} from '../component/profile/ProfileSideBar';
import { ProfileHeader } from '../component/profile/ProfileHeader';
import { ProfileTab } from '../component/profile/ProfileTab';
import { OrderTab } from '../component/profile/OrderTab';
import { HelpTab } from '../component/profile/HelpTab';
import { AddressTab } from '../component/profile/AddressTab';
import { LoginForm } from '../component/ui/forms/LoginForm';

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

// interface Address {
//   id: string;
//   type: 'home' | 'work' | 'other';
//   name: string;
//   street: string;
//   city: string;
//   state: string;
//   pincode: string;
//   phone: string;
//   isDefault: boolean;
// }

interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  total: number;
  items: number;
  image: string;
}

const ProfileSection: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('addresses');
  const [showMobileLogin, setShowMobileLogin] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  
  // Address management states
  // const [addresses, setAddresses] = useState<Address[]>([
  //   {
  //     id: '1',
  //     type: 'home',
  //     name: 'Home',
  //     street: '123 MG Road, Andheri East',
  //     city: 'Mumbai',
  //     state: 'Maharashtra',
  //     pincode: '400001',
  //     phone: '+91 9876543210',
  //     isDefault: true
  //   },
  //   {
  //     id: '2',
  //     type: 'work',
  //     name: 'Office',
  //     street: '456 Business Park, Bandra Kurla Complex',
  //     city: 'Mumbai',
  //     state: 'Maharashtra',
  //     pincode: '400051',
  //     phone: '+91 9876543210',
  //     isDefault: false
  //   }
  // ]);
  // const [showAddAddress, setShowAddAddress] = useState(false);
  // const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  // const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
  //   type: 'home',
  //   name: '',
  //   street: '',
  //   city: '',
  //   state: '',
  //   pincode: '',
  //   phone: '',
  //   isDefault: false
  // });
  
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

  // const [editedUser, setEditedUser] = useState<User>(user);

  const orders: Order[] = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      status: 'delivered',
      total: 2499,
      items: 2,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&h=80&fit=crop'
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      status: 'shipped',
      total: 1299,
      items: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop'
    },
    {
      id: 'ORD003',
      date: '2024-01-05',
      status: 'processing',
      total: 3999,
      items: 3,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop'
    }
  ];

  // Address management functions
  // const handleAddAddress = () => {
  //   if (newAddress.name && newAddress.street && newAddress.city && newAddress.state && newAddress.pincode && newAddress.phone) {
  //     const address: Address = {
  //       ...newAddress,
  //       id: Date.now().toString()
  //     };
  //     setAddresses([...addresses, address]);
  //     setNewAddress({
  //       type: 'home',
  //       name: '',
  //       street: '',
  //       city: '',
  //       state: '',
  //       pincode: '',
  //       phone: '',
  //       isDefault: false
  //     });
  //     setShowAddAddress(false);
  //   } else {
  //     alert('Please fill all fields');
  //   }
  // };

  // const handleEditAddress = (address: Address) => {
  //   setEditingAddress(address);
  //   setNewAddress(address);
  //   setShowAddAddress(true);
  // };

  // const handleUpdateAddress = () => {
  //   if (editingAddress && newAddress.name && newAddress.street && newAddress.city && newAddress.state && newAddress.pincode && newAddress.phone) {
  //     setAddresses(addresses.map(addr => 
  //       addr.id === editingAddress.id ? { ...newAddress, id: editingAddress.id } : addr
  //     ));
  //     setEditingAddress(null);
  //     setNewAddress({
  //       type: 'home',
  //       name: '',
  //       street: '',
  //       city: '',
  //       state: '',
  //       pincode: '',
  //       phone: '',
  //       isDefault: false
  //     });
  //     setShowAddAddress(false);
  //   } else {
  //     alert('Please fill all fields');
  //   }
  // };

  // const handleDeleteAddress = (id: string) => {
  //   if (window.confirm('Are you sure you want to delete this address?')) {
  //     setAddresses(addresses.filter(addr => addr.id !== id));
  //   }
  // };

  // const setDefaultAddress = (id: string) => {
  //   setAddresses(addresses.map(addr => ({
  //     ...addr,
  //     isDefault: addr.id === id
  //   })));
  // };

  // const getAddressIcon = (type: string) => {
  //   switch (type) {
  //     case 'home': return <Home className="w-5 h-5" />;
  //     case 'work': return <Work className="w-5 h-5" />;
  //     default: return <LocationOn className="w-5 h-5" />;
  //   }
  // };

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
      setIsLoggedIn(true);
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

  // const handleSaveProfile = () => {
  //   setUser(editedUser);
  //   setIsEditing(false);
  // };

  // const handleCancelEdit = () => {
  //   setEditedUser(user);
  //   setIsEditing(false);
  // };

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case 'delivered': return 'text-green-600 bg-green-100';
  //     case 'shipped': return 'text-blue-600 bg-blue-100';
  //     case 'processing': return 'text-yellow-600 bg-yellow-100';
  //     case 'cancelled': return 'text-red-600 bg-red-100';
  //     default: return 'text-gray-600 bg-gray-100';
  //   }
  // };

  // const tabs = [
  //   { id: 'profile', label: 'Profile', icon: Person },
  //   { id: 'orders', label: 'Orders', icon: ShoppingBag },
  //   { id: 'addresses', label: 'Addresses', icon: LocationOn },
  //   { id: 'help', label: 'Help', icon: Help },
  // ];

  // Login Screen
  if (!isLoggedIn) {
    return (
      // <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      //   <div className="max-w-md w-full">
      //     {!showOtpVerification ? (
      //       <div className="bg-white rounded-2xl shadow-xl p-10">
      //         <div className="text-center mb-8">
      //           <div className="w-16 h-16 bg-[#61503c] rounded-full flex items-center justify-center mx-auto mb-4">
      //             <Phone className="w-8 h-8 text-white" />
      //           </div>
      //           <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
      //           <p className="text-gray-600">Enter your mobile number to continue</p>
      //         </div>

      //         <div className="space-y-6">
      //           <div>
      //             <label className="block text-sm font-medium text-gray-700 mb-2">
      //               Mobile Number
      //             </label>
      //             <div className="relative">
      //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
      //                 <span className="text-gray-500 text-sm">+91</span>
      //               </div>
      //               <input
      //                 type="tel"
      //                 value={mobileNumber}
      //                 onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
      //                 className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-transparent transition-all"
      //                 placeholder="Enter 10-digit mobile number"
      //                 maxLength={10}
      //               />
      //             </div>
      //           </div>

      //           <button
      //             onClick={handleMobileLogin}
      //             disabled={mobileNumber.length !== 10}
      //             className="w-full bg-[#61503c] text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      //           >
      //             Send OTP
      //           </button>

      //           <div className="text-center">
      //             <p className="text-xs text-gray-500">
      //               By continuing, you agree to our Terms of Service and Privacy Policy
      //             </p>
      //           </div>
      //         </div>
      //       </div>
      //     ) : (
      //       <div className="bg-white rounded-2xl shadow-xl p-10">
      //         <button
      //           onClick={() => setShowOtpVerification(false)}
      //           className="mb-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
      //         >
      //           <ArrowBack className="w-5 h-5 text-gray-600" />
      //         </button>

      //         <div className="text-center mb-8">
      //           <div className="w-16 h-16 bg-[#61503c] rounded-full flex items-center justify-center mx-auto mb-4">
      //             <Shield className="w-8 h-8 text-white" />
      //           </div>
      //           <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify OTP</h1>
      //           <p className="text-gray-600">
      //             We've sent a 6-digit code to +91 {mobileNumber}
      //           </p>
      //         </div>

      //         <div className="space-y-6">
      //           <div className="flex justify-center space-x-3">
      //             {otp.map((digit, index) => (
      //               <input
      //                 key={index}
      //                 id={`otp-${index}`}
      //                 type="text"
      //                 value={digit}
      //                 onChange={(e) => handleOtpChange(index, e.target.value)}
      //                 className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      //                 maxLength={1}
      //               />
      //             ))}
      //           </div>

      //           <button
      //             onClick={handleOtpVerification}
      //             disabled={otp.join('').length !== 6}
      //             className="w-full bg-[#61503c] text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      //           >
      //             Verify & Continue
      //           </button>

      //           <div className="text-center">
      //             <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
      //               Resend OTP
      //             </button>
      //           </div>
      //         </div>
      //       </div>
      //     )}
      //   </div>
      // </div>
      <LoginForm setIsLoggedIn_={setIsLoggedIn} />
    );
  }

  // Main Profile Dashboard
  return (
    <div className="min-h-screen bg-[#f1f3f6]">
      <div className="max-w-7xl mx-auto p-2 lg:p-4">
        {/* Profile Header */}
        {/* <div className="bg-white rounded-sm p-2 lg:p-2 mb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover border-4 border-blue-100"
              />
              <div>
                <h1 className="text-1xl lg:text-2xl text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">Member since {user.joinedDate}</p>
              </div>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
            >
              <Logout className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div> */}
<ProfileHeader user={user} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          {/* <div className="lg:col-span-1">
            <div className="bg-white rounded-sm p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-[#695946] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div> */}
<ProfileSideBar />
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-sm p-4 lg:p-4">
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                // <div>
                //   <div className="flex items-center justify-between mb-6">
                //     <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                //     {!isEditing ? (
                //       <button
                //         onClick={() => setIsEditing(true)}
                //         className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                //       >
                //         <Edit className="w-4 h-4" />
                //         <span>Edit</span>
                //       </button>
                //     ) : (
                //       <div className="flex space-x-3">
                //         <button
                //           onClick={handleSaveProfile}
                //           className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-colors"
                //         >
                //           <Save className="w-4 h-4" />
                //           <span>Save</span>
                //         </button>
                //         <button
                //           onClick={handleCancelEdit}
                //           className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                //         >
                //           <Cancel className="w-4 h-4" />
                //           <span>Cancel</span>
                //         </button>
                //       </div>
                //     )}
                //   </div>

                //   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                //     <div>
                //       <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                //       {isEditing ? (
                //         <input
                //           type="text"
                //           value={editedUser.name}
                //           onChange={(e) => setEditedUser(prev => ({ ...prev, name: e.target.value }))}
                //           className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                //         />
                //       ) : (
                //         <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.name}</div>
                //       )}
                //     </div>

                //     <div>
                //       <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                //       {isEditing ? (
                //         <input
                //           type="email"
                //           value={editedUser.email}
                //           onChange={(e) => setEditedUser(prev => ({ ...prev, email: e.target.value }))}
                //           className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                //         />
                //       ) : (
                //         <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.email}</div>
                //       )}
                //     </div>

                //     <div>
                //       <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                //       <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.phone}</div>
                //     </div>

                //     <div>
                //       <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                //       {isEditing ? (
                //         <input
                //           type="text"
                //           value={editedUser.address.street}
                //           onChange={(e) => setEditedUser(prev => ({ 
                //             ...prev, 
                //             address: { ...prev.address, street: e.target.value }
                //           }))}
                //           className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                //         />
                //       ) : (
                //         <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.address.street}</div>
                //       )}
                //     </div>

                //     <div>
                //       <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                //       {isEditing ? (
                //         <input
                //           type="text"
                //           value={editedUser.address.city}
                //           onChange={(e) => setEditedUser(prev => ({ 
                //             ...prev, 
                //             address: { ...prev.address, city: e.target.value }
                //           }))}
                //           className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                //         />
                //       ) : (
                //         <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.address.city}</div>
                //       )}
                //     </div>

                //     <div>
                //       <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                //       {isEditing ? (
                //         <input
                //           type="text"
                //           value={editedUser.address.pincode}
                //           onChange={(e) => setEditedUser(prev => ({ 
                //             ...prev, 
                //             address: { ...prev.address, pincode: e.target.value }
                //           }))}
                //           className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                //         />
                //       ) : (
                //         <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.address.pincode}</div>
                //       )}
                //     </div>
                //   </div>
                // </div>

                <ProfileTab user_={user}/>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                // <div>
                //   <h2 className="text-2xl text-gray-900 mb-6">Order History</h2>
                //   <div className="space-y-4">
                //     {orders.map((order) => (
                //       <div key={order.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                //         <div className="flex items-center justify-between">
                //           <div className="flex items-center space-x-4">
                //             <img
                //               src={order.image}
                //               alt="Order"
                //               className="w-16 h-16 rounded-lg object-cover"
                //             />
                //             <div>
                //               <div className="flex items-center space-x-3 mb-1">
                //                 <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                //                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                //                   {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                //                 </span>
                //               </div>
                //               <p className="text-gray-600 text-sm">{order.items} items • {order.date}</p>
                //               <p className="text-lg font-bold text-blue-600">₹{order.total}</p>
                //             </div>
                //           </div>
                //           <div className="flex items-center space-x-2">
                //             <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                //               View Details
                //             </button>
                //             {order.status === 'delivered' && (
                //               <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                //                 Rate & Review
                //               </button>
                //             )}
                //           </div>
                //         </div>
                //       </div>
                //     ))}
                //   </div>
                // </div>

                <OrderTab />
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                // <div>
                //   <div className="flex items-center justify-between mb-6">
                //     <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                //     <button
                //       onClick={() => {
                //         setEditingAddress(null);
                //         setNewAddress({
                //           type: 'home',
                //           name: '',
                //           street: '',
                //           city: '',
                //           state: '',
                //           pincode: '',
                //           phone: '',
                //           isDefault: false
                //         });
                //         setShowAddAddress(true);
                //       }}
                //       className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                //     >
                //       <Add className="w-4 h-4" />
                //       <span>Add Address</span>
                //     </button>
                //   </div>

                //   <div className="space-y-4">
                //     {addresses.map((address) => (
                //       <div key={address.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                //         <div className="flex items-start justify-between">
                //           <div className="flex items-start space-x-3">
                //             <div className="text-blue-600 mt-1">
                //               {getAddressIcon(address.type)}
                //             </div>
                //             <div className="flex-1">
                //               <div className="flex items-center space-x-2 mb-2">
                //                 <h3 className="font-semibold text-gray-900">{address.name}</h3>
                //                 {address.isDefault && (
                //                   <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
                //                     Default
                //                   </span>
                //                 )}
                //               </div>
                //               <p className="text-gray-600 mb-1">{address.street}</p>
                //               <p className="text-gray-600 mb-1">{address.city}, {address.state} - {address.pincode}</p>
                //               <p className="text-gray-500 text-sm">Phone: {address.phone}</p>
                //             </div>
                //           </div>
                //           <div className="flex items-center space-x-2">
                //             {!address.isDefault && (
                //               <button
                //                 onClick={() => setDefaultAddress(address.id)}
                //                 className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                //               >
                //                 Set Default
                //               </button>
                //             )}
                //             <button
                //               onClick={() => handleEditAddress(address)}
                //               className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                //             >
                //               <Edit className="w-4 h-4" />
                //             </button>
                //             <button
                //               onClick={() => handleDeleteAddress(address.id)}
                //               className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm"
                //             >
                //               <Delete className="w-4 h-4" />
                //             </button>
                //           </div>
                //         </div>
                //       </div>
                //     ))}

                //     {addresses.length === 0 && (
                //       <div className="text-center py-12">
                //         <LocationOn className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                //         <h3 className="text-lg font-medium text-gray-800 mb-2">No addresses saved</h3>
                //         <p className="text-gray-600">Add your first address to get started</p>
                //       </div>
                //     )}
                //   </div>

                //   {/* Add/Edit Address Modal */}
                //   {showAddAddress && (
                //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                //       <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                //         <div className="flex items-center justify-between mb-6">
                //           <h3 className="text-xl font-bold text-gray-900">
                //             {editingAddress ? 'Edit Address' : 'Add New Address'}
                //           </h3>
                //           <button
                //             onClick={() => {
                //               setShowAddAddress(false);
                //               setEditingAddress(null);
                //             }}
                //             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                //           >
                //             <Cancel className="w-5 h-5 text-gray-600" />
                //           </button>
                //         </div>

                //         <div className="space-y-4">
                //           <div>
                //             <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                //             <select
                //               value={newAddress.type}
                //               onChange={(e) => setNewAddress(prev => ({ ...prev, type: e.target.value as 'home' | 'work' | 'other' }))}
                //               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                //             >
                //               <option value="home">Home</option>
                //               <option value="work">Work</option>
                //               <option value="other">Other</option>
                //             </select>
                //           </div>

                //           <div>
                //             <label className="block text-sm font-medium text-gray-700 mb-2">Address Name</label>
                //             <input
                //               type="text"
                //               value={newAddress.name}
                //               onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                //               placeholder="e.g., Home, Office, etc."
                //               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                //             />
                //           </div>

                //           <div>
                //             <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                //             <textarea
                //               value={newAddress.street}
                //               onChange={(e) => setNewAddress(prev => ({ ...prev, street: e.target.value }))}
                //               placeholder="Enter full address"
                //               rows={3}
                //               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                //             />
                //           </div>

                //           <div className="grid grid-cols-2 gap-4">
                //             <div>
                //               <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                //               <input
                //                 type="text"
                //                 value={newAddress.city}
                //                 onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                //                 placeholder="City"
                //                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                //               />
                //             </div>
                //             <div>
                //               <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                //               <input
                //                 type="text"
                //                 value={newAddress.state}
                //                 onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                //                 placeholder="State"
                //                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                //               />
                //             </div>
                //           </div>

                //           <div>
                //             <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                //             <input
                //               type="text"
                //               value={newAddress.pincode}
                //               onChange={(e) => setNewAddress(prev => ({ ...prev, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
                //               placeholder="Pincode"
                //               maxLength={6}
                //               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                //             />
                //           </div>

                //           <div>
                //             <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                //             <input
                //               type="tel"
                //               value={newAddress.phone}
                //               onChange={(e) => setNewAddress(prev => ({ ...prev, phone: e.target.value }))}
                //               placeholder="+91 9876543210"
                //               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                //             />
                //           </div>

                //           <div className="flex items-center space-x-2">
                //             <input
                //               type="checkbox"
                //               id="isDefault"
                //               checked={newAddress.isDefault}
                //               onChange={(e) => setNewAddress(prev => ({ ...prev, isDefault: e.target.checked }))}
                //               className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                //             />
                //             <label htmlFor="isDefault" className="text-sm text-gray-700">
                //               Set as default address
                //             </label>
                //           </div>
                //         </div>

                //         <div className="flex space-x-3 mt-6">
                //           <button
                //             onClick={editingAddress ? handleUpdateAddress : handleAddAddress}
                //             className="flex-1 bg-[#61503c] text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                //           >
                //             {editingAddress ? 'Update Address' : 'Save Address'}
                //           </button>
                //           <button
                //             onClick={() => {
                //               setShowAddAddress(false);
                //               setEditingAddress(null);
                //             }}
                //             className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                //           >
                //             Cancel
                //           </button>
                //         </div>
                //       </div>
                //     </div>
                //   )}
                // </div>

                <AddressTab />
              )}

              {/* Help Tab */}
              {activeTab === 'help' && (
                // <div>
                //   <h2 className="text-2xl font-bold text-gray-900 mb-6">Help & Support</h2>
                //   <div className="space-y-4">
                //     <div className="border border-gray-200 rounded-xl p-6">
                //       <div className="flex items-center space-x-3 mb-4">
                //         <Support className="w-6 h-6 text-blue-600" />
                //         <h3 className="text-lg font-semibold text-gray-900">Customer Support</h3>
                //       </div>
                //       <p className="text-gray-600 mb-4">Get help with your orders, returns, or any other queries.</p>
                //       <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                //         Contact Support
                //       </button>
                //     </div>

                //     <div className="border border-gray-200 rounded-xl p-6">
                //       <div className="flex items-center space-x-3 mb-4">
                //         <Receipt className="w-6 h-6 text-green-600" />
                //         <h3 className="text-lg font-semibold text-gray-900">Order Help</h3>
                //       </div>
                //       <p className="text-gray-600 mb-4">Track orders, return items, or get refund information.</p>
                //       <button className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                //         Order Help
                //       </button>
                //     </div>

                //     <div className="border border-gray-200 rounded-xl p-6">
                //       <div className="flex items-center space-x-3 mb-4">
                //         <Help className="w-6 h-6 text-purple-600" />
                //         <h3 className="text-lg font-semibold text-gray-900">FAQ</h3>
                //       </div>
                //       <p className="text-gray-600 mb-4">Find answers to frequently asked questions.</p>
                //       <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors">
                //         View FAQ
                //       </button>
                //     </div>
                //   </div>
                // </div>
                <HelpTab />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;