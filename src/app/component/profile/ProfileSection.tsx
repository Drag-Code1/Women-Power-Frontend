'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Person from '@mui/icons-material/Person';
import Phone from '@mui/icons-material/Phone';
import Email from '@mui/icons-material/Email';
import LocationOn from '@mui/icons-material/LocationOn';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Edit from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/Save';
import Cancel from '@mui/icons-material/Cancel';
import ArrowBack from '@mui/icons-material/ArrowBack';
import LocalShipping from '@mui/icons-material/LocalShipping';
import Receipt from '@mui/icons-material/Receipt';
import Star from '@mui/icons-material/Star';
import Shield from '@mui/icons-material/Shield';
import Help from '@mui/icons-material/Help';
import Support from '@mui/icons-material/Support';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Home from '@mui/icons-material/Home';
import Work from '@mui/icons-material/Work';
import Business from '@mui/icons-material/Business';
import AccountCircle from '@mui/icons-material/AccountCircle';

// Import sub-components
import LoginSignup from '@/app/LoginSignup/page';
import ProfileHeader from './ProfileHeader';
import SidebarNavigation from './SidebarNavigation';
import ProfileTab from './ProfileTab';
import OrdersTab from './OrdersTab';
import AddressesTab from './AddressesTab';
import HelpTab from './HelpTab';

// Import AuthContext
import { useAuth } from '@/app/contexts/AuthContext';
import { useCart } from '@/app/contexts/CartContext';
import { getToken } from '@/app/lib/authApi';
import { API_BASE_URL } from '@/app/lib/config';

// Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  email: string;
  mobileNo: string;
  joining_date: string;
  role: 'user' | 'admin';
}

export interface Address {
  id: string;
  type: 'Home' | 'Office';
  address: string;
  pincode: string;
  city: string;
  state: string;
  landmark: string;
  mobileNo: string;
  userId: string;
}

export interface Order {
  id: string;
  order_date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  totalPrice: string;
  productCount: number;
  address?: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    mobileNo: string;
    type: string;
  };
}

const ProfileSection: React.FC = () => {
  const { user, isAuthenticated, isLoading, signup, sendOtp, verifyOtp, logout } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const returnUrl = searchParams?.get('returnUrl');
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [emailAddress, setEmailAddress] = useState('');
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Signup form states
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    gender: 'male' as 'male' | 'female',
    email: '',
    mobileNo: ''
  });

  // Address management states
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);

  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    type: 'Home',
    address: '',
    pincode: '',
    city: '',
    state: '',
    landmark: '',
    mobileNo: '',
    userId: user?.id || ''
  });

  const [editedUser, setEditedUser] = useState<User | null>(user);

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: Person },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'addresses', label: 'Addresses', icon: LocationOn },
    { id: 'help', label: 'Help', icon: Help },
  ];

  // Update editedUser when user changes
  useEffect(() => {
    if (user) {
      setEditedUser(user);
      setNewAddress(prev => ({ ...prev, userId: user.id }));
    }
  }, [user]);

  const loadAddresses = async () => {
    if (!user) {
      console.log('[Profile] No user, skipping address load');
      setAddresses([]);
      setSelectedAddressState();
      return;
    }
    const token = getToken();
    if (!token) {
      console.warn('[Profile] Missing token, cannot load addresses');
      setAddressError('Please login to view addresses.');
      setAddresses([]);
      setSelectedAddressState();
      return;
    }

    console.log('[Profile] Loading addresses for user', user.id);
    setAddressLoading(true);
    setAddressError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/address/${user.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      });
      console.log('[Profile] Address fetch status', res.status);
      if (!res.ok) {
        setAddressError(`Failed to load addresses (status ${res.status})`);
        setAddresses([]);
        setSelectedAddressState();
        return;
      }
      const data = await res.json();
      console.log('[Profile] Address response body', data);
      if (Array.isArray(data?.data)) {
        setAddresses(data.data);
      } else {
        setAddresses([]);
      }
      setSelectedAddressState();
    } catch (err) {
      console.error('Failed to load addresses', err);
      setAddressError('Could not load saved addresses. Please try again.');
      setAddresses([]);
      setSelectedAddressState();
    } finally {
      setAddressLoading(false);
    }
  };

  const setSelectedAddressState = () => {
    // ensure controlled fields downstream pick first available
    setNewAddress(prev => ({ ...prev, userId: user?.id || '' }));
  };

  useEffect(() => {
    loadAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Redirect already logged-in admin users to dashboard
  useEffect(() => {
    if (user && !isLoading && user.role === 'admin') {
      console.log('🔄 Admin user detected on profile page, redirecting to dashboard');
      console.log('👤 User role:', user.role);
      console.log('📧 User email:', user.email);

      // Add a small delay to ensure component is fully loaded
      setTimeout(() => {
        console.log('🚀 Redirecting admin to dashboard...');
        window.location.href = "/dashboardmaintab";
      }, 100);
    }
  }, [user, isLoading]);


  const loadOrders = async () => {
    if (!user) return;
    const token = getToken();
    if (!token) return;

    setOrdersLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/order/${user.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setOrders(data.data);
        }
      }
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Address management functions
  const handleAddAddress = async () => {
    if (!user) {
      alert('Please login to add an address');
      return;
    }
    if (!(newAddress.address && newAddress.city && newAddress.state && newAddress.pincode && newAddress.mobileNo)) {
      alert('Please fill all required fields');
      return;
    }

    const token = getToken();
    if (!token) {
      alert('Authorization token missing');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/address`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...newAddress, userId: user.id }),
      });
      console.log('[Profile] Add address status', res.status);
      const body = await res.json().catch(() => ({}));
      console.log('[Profile] Add address response', body);
      if (!res.ok) {
        throw new Error(body?.message || `Failed to add address (status ${res.status})`);
      }
      await loadAddresses();
      setNewAddress({
        type: 'Home',
        address: '',
        pincode: '',
        city: '',
        state: '',
        landmark: '',
        mobileNo: '',
        userId: user?.id || ''
      });
      setShowAddAddress(false);
    } catch (err: any) {
      console.error('Error adding address', err);
      alert(err?.message || 'Failed to add address');
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setNewAddress(address);
    setShowAddAddress(true);
  };

  const handleUpdateAddress = async () => {
    if (!editingAddress) return;
    if (!(newAddress.address && newAddress.city && newAddress.state && newAddress.pincode && newAddress.mobileNo)) {
      alert('Please fill all required fields');
      return;
    }
    const token = getToken();
    if (!token) {
      alert('Authorization token missing');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/address/${editingAddress.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAddress),
      });
      console.log('[Profile] Update address status', res.status);
      const body = await res.json().catch(() => ({}));
      console.log('[Profile] Update address response', body);
      if (!res.ok) {
        throw new Error(body?.message || `Failed to update address (status ${res.status})`);
      }
      await loadAddresses();
      setEditingAddress(null);
      setNewAddress({
        type: 'Home',
        address: '',
        pincode: '',
        city: '',
        state: '',
        landmark: '',
        mobileNo: '',
        userId: user?.id || ''
      });
      setShowAddAddress(false);
    } catch (err: any) {
      console.error('Error updating address', err);
      alert(err?.message || 'Failed to update address');
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;

    const token = getToken();
    if (!token) {
      alert('Authorization token missing');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/address/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('[Profile] Delete address status', res.status);
      const body = await res.json().catch(() => ({}));
      console.log('[Profile] Delete address response', body);
      if (!res.ok) {
        throw new Error(body?.message || `Failed to delete address (status ${res.status})`);
      }
      await loadAddresses();
    } catch (err: any) {
      console.error('Error deleting address', err);
      alert(err?.message || 'Failed to delete address');
    }
  };

  const handleEmailLogin = async () => {
    if (emailAddress && emailAddress.includes('@')) {
      setError(null);
      setSuccess(null);
      try {
        console.log('Sending OTP to:', emailAddress);
        await sendOtp(emailAddress);
        console.log('OTP sent successfully, showing verification screen');
        setShowOtpVerification(true);
        setSuccess('OTP sent successfully to your email!');
      } catch (error: any) {
        console.error('Error sending OTP:', error);
        setError(error.message || 'Failed to send OTP. Please try again.');
      }
    } else {
      setError('Please enter a valid email address');
    }
  };

  const handleOtpVerification = async () => {
    const otpValue = otp.join('');
    console.log('Verifying OTP:', otpValue, 'for email:', emailAddress);
    if (otpValue.length === 6) {
      setError(null);
      setSuccess(null);
      try {
        console.log('Calling verifyOtp API...');
        const loggedInUser = await verifyOtp(emailAddress, parseInt(otpValue));
        console.log('OTP verification successful');
        console.log('👤 User data from OTP verification:', loggedInUser);
        console.log('🎯 User role:', loggedInUser?.role);

        setShowOtpVerification(false);
        setSuccess('Login successful!');
        // Reset form
        setEmailAddress('');
        setOtp(['', '', '', '', '', '']);

        // Role-based routing after successful OTP verification
        console.log('🔄 Starting role-based redirect...');

        if (loggedInUser?.role === 'admin') {
          console.log('🔐 Admin user detected, redirecting to admin dashboard');
          setTimeout(() => {
            window.location.href = "/dashboardmaintab";
          }, 100);
        } else {
          const target = returnUrl && returnUrl.startsWith('/') ? returnUrl : '/';
          console.log('👤 Regular user detected, refreshing site and redirecting to:', target);
          setTimeout(() => {
            window.location.href = target;
          }, 100);
        }
      } catch (error: any) {
        console.error('OTP verification error:', error);
        setError(error.message || 'Invalid OTP. Please try again.');
      }
    } else {
      setError('Please enter complete OTP');
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

  const handleSignup = async () => {
    // Validate form
    if (!signupData.firstName || !signupData.lastName || !signupData.email || !signupData.mobileNo) {
      setError('Please fill all required fields');
      return;
    }

    if (!signupData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (signupData.mobileNo.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      await signup(signupData);
      setSuccess('Account created successfully! Please login with your email.');
      setAuthMode('login');
      setEmailAddress(signupData.email);
      // Reset signup form
      setSignupData({
        firstName: '',
        lastName: '',
        gender: 'male',
        email: '',
        mobileNo: ''
      });
    } catch (error: any) {
      setError(error.message || 'Registration failed. Please try again.');
    }
  };

  const generateId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const handleSaveProfile = () => {
    if (editedUser) {
      setEditedUser(editedUser);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      setEditedUser(user);
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    logout();
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    setEmailAddress('');
    setOtp(['', '', '', '', '', '']);
    setShowOtpVerification(false);
    setAuthMode('login');
    setSignupData({
      firstName: '',
      lastName: '',
      gender: 'male',
      email: '',
      mobileNo: ''
    });
    setError(null);
    setSuccess(null);
  };

  // Show loading state
  if (isLoading) {
    console.log('Auth is loading...');
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#61503c] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Login/Signup Screen
  if (!isAuthenticated || !user) {
    console.log('User not authenticated. isAuthenticated:', isAuthenticated, 'user:', user, 'showOtpVerification:', showOtpVerification);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <LoginSignup
            authMode={authMode}
            setAuthMode={setAuthMode}
            emailAddress={emailAddress}
            setEmailAddress={setEmailAddress}
            showOtpVerification={showOtpVerification}
            setShowOtpVerification={setShowOtpVerification}
            otp={otp}
            setOtp={setOtp}
            signupData={signupData}
            setSignupData={setSignupData}
            handleEmailLogin={handleEmailLogin}
            handleOtpVerification={handleOtpVerification}
            handleOtpChange={handleOtpChange}
            handleSignup={handleSignup}
            handleResendOtp={() => {
              // Reset OTP and resend
              setOtp(['', '', '', '', '', '']);
              handleEmailLogin();
            }}
          />
        </div>
      </div>
    );
  }

  // Main Profile Dashboard
  return (
    <div className="min-h-screen bg-[#f1f3f6]">
      <div className="max-w-7xl mx-auto p-2 lg:p-4">
        {/* Profile Header */}
        <ProfileHeader user={user} onLogout={handleLogout} />


        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <SidebarNavigation
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-sm p-4 lg:p-4">

              {/* Profile Tab */}
              {activeTab === 'profile' && editedUser && (
                <ProfileTab
                  user={user}
                  editedUser={editedUser}
                  setEditedUser={setEditedUser}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  handleSaveProfile={handleSaveProfile}
                  handleCancelEdit={handleCancelEdit}
                />
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <OrdersTab orders={orders} />
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <AddressesTab
                  addresses={addresses}
                  showAddAddress={showAddAddress}
                  setShowAddAddress={setShowAddAddress}
                  editingAddress={editingAddress}
                  setEditingAddress={setEditingAddress}
                  newAddress={newAddress}
                  setNewAddress={setNewAddress}
                  reloadAddresses={loadAddresses}
                  user={user}
                />
              )}

              {/* Help Tab */}
              {activeTab === 'help' && <HelpTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
