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
  Business, 
  AccountCircle 
} from '@mui/icons-material';

// Import sub-components
import LoginSignup from '@/app/LoginSignup/page';
import ProfileHeader from './ProfileHeader';
import SidebarNavigation from './SidebarNavigation';
import ProfileTab from './ProfileTab';
import OrdersTab from './OrdersTab';
import AddressesTab from './AddressesTab';
import HelpTab from './HelpTab';

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
  type: 'Home' | 'Work' | 'Other';
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
  date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  total: number;
  items: number;
  image: string;
}

const ProfileSection: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [emailAddress, setEmailAddress] = useState('');
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  
  // Signup form states
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    gender: 'male' as 'male' | 'female',
    email: '',
    mobileNo: '',
    role: 'user' as 'user' | 'admin'
  });
  
  // Address management states
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1a9d8bd1-30b4-42c0-8e0b-441c581c71c1',
      type: 'Home',
      address: '123 Main Street, Building 3A',
      pincode: '560001',
      city: 'Maharashtra',
      state: 'Maharashtra',
      landmark: 'Near City Mall',
      mobileNo: '9877583210',
      userId: '4cf0865c-ae9c-4381-84ce-4ddec3582db8'
    },
    {
      id: '2a9d8bd1-30b4-42c0-8e0b-441c581c71c2',
      type: 'Work',
      address: '456 Business Park, Bandra Kurla Complex',
      pincode: '400051',
      city: 'Mumbai',
      state: 'Maharashtra',
      landmark: 'Near Metro Station',
      mobileNo: '9876543210',
      userId: '4cf0865c-ae9c-4381-84ce-4ddec3582db8'
    }
  ]);
  
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
    userId: '4cf0865c-ae9c-4381-84ce-4ddec3582db8'
  });
  
  const [user, setUser] = useState<User>({
    id: '4cf0865c-ae9c-4381-84ce-4ddec3582db8',
    firstName: 'dannyy',
    lastName: 'sharmaaa',
    gender: 'female',
    email: 'danggy@xamplee.com',
    mobileNo: '9879873212',
    joining_date: '2025-10-04 12:17:53',
    role: 'user'
  });

  const [editedUser, setEditedUser] = useState<User>(user);

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

  const tabs = [
    { id: 'profile', label: 'Profile', icon: Person },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'addresses', label: 'Addresses', icon: LocationOn },
    { id: 'help', label: 'Help', icon: Help },
  ];

  // Load users from localStorage on component mount
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        try {
          const parsedUsers = JSON.parse(storedUsers);
          // Add default user if not exists
          if (!parsedUsers.some((u: User) => u.email === 'danggy@xamplee.com')) {
            const defaultUser = {
              id: '4cf0865c-ae9c-4381-84ce-4ddec3582db8',
              firstName: 'dannyy',
              lastName: 'sharmaaa',
              gender: 'female',
              email: 'danggy@xamplee.com',
              mobileNo: '9879873212',
              joining_date: '2025-10-04 12:17:53',
              role: 'user'
            };
            localStorage.setItem('users', JSON.stringify([...parsedUsers, defaultUser]));
          }
        } catch (error) {
          console.error('Error parsing stored users:', error);
          // Initialize with default user
          localStorage.setItem('users', JSON.stringify([user]));
        }
      } else {
        // Initialize with default user
        localStorage.setItem('users', JSON.stringify([user]));
      }
    }
  }, []);

  // Address management functions
  const handleAddAddress = () => {
    if (newAddress.address && newAddress.city && newAddress.state && newAddress.pincode && newAddress.mobileNo) {
      const address: Address = {
        ...newAddress,
        id: generateId()
      };
      setAddresses([...addresses, address]);
      setNewAddress({
        type: 'Home',
        address: '',
        pincode: '',
        city: '',
        state: '',
        landmark: '',
        mobileNo: '',
        userId: user.id
      });
      setShowAddAddress(false);
    } else {
      alert('Please fill all required fields');
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setNewAddress(address);
    setShowAddAddress(true);
  };

  const handleUpdateAddress = () => {
    if (editingAddress && newAddress.address && newAddress.city && newAddress.state && newAddress.pincode && newAddress.mobileNo) {
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id ? { ...newAddress, id: editingAddress.id } : addr
      ));
      setEditingAddress(null);
      setNewAddress({
        type: 'Home',
        address: '',
        pincode: '',
        city: '',
        state: '',
        landmark: '',
        mobileNo: '',
        userId: user.id
      });
      setShowAddAddress(false);
    } else {
      alert('Please fill all required fields');
    }
  };

  const handleDeleteAddress = (id: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  const handleEmailLogin = () => {
    if (emailAddress && emailAddress.includes('@')) {
      // Check if user exists in localStorage
      if (typeof window !== 'undefined') {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          try {
            const users = JSON.parse(storedUsers);
            const existingUser = users.find((u: User) => u.email === emailAddress);
            
            if (existingUser) {
              setShowOtpVerification(true);
            } else {
              alert('User not found. Please sign up first.');
            }
          } catch (error) {
            console.error('Error checking user:', error);
            alert('An error occurred. Please try again.');
          }
        } else {
          alert('User not found. Please sign up first.');
        }
      }
    } else {
      alert('Please enter a valid email address');
    }
  };

  const handleOtpVerification = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      // Get user from localStorage
      if (typeof window !== 'undefined') {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          try {
            const users = JSON.parse(storedUsers);
            const existingUser = users.find((u: User) => u.email === emailAddress);
            
            if (existingUser) {
              setUser(existingUser);
              setEditedUser(existingUser);
              setShowOtpVerification(false);
              setIsLoggedIn(true);
            } else {
              alert('User not found. Please sign up first.');
            }
          } catch (error) {
            console.error('Error verifying user:', error);
            alert('An error occurred. Please try again.');
          }
        }
      }
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

  const handleSignup = () => {
    // Validate form
    if (!signupData.firstName || !signupData.lastName || !signupData.email || !signupData.mobileNo) {
      alert('Please fill all required fields');
      return;
    }
    
    if (!signupData.email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    
    if (signupData.mobileNo.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    
    // Check if user already exists
    if (typeof window !== 'undefined') {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        try {
          const users = JSON.parse(storedUsers);
          const existingUser = users.find((u: User) => u.email === signupData.email);
          
          if (existingUser) {
            alert('User with this email already exists. Please login.');
            return;
          }
        } catch (error) {
          console.error('Error checking existing user:', error);
        }
      }
      
      // Create new user with auto-generated ID and current date
      const newUser: User = {
        ...signupData,
        id: generateId(),
        joining_date: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      
      // Save to localStorage
      if (storedUsers) {
        try {
          const users = JSON.parse(storedUsers);
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));
        } catch (error) {
          console.error('Error saving user:', error);
          localStorage.setItem('users', JSON.stringify([newUser]));
        }
      } else {
        localStorage.setItem('users', JSON.stringify([newUser]));
      }
      
      // Show OTP verification
      setEmailAddress(signupData.email);
      setShowOtpVerification(true);
    }
  };

  const generateId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const handleSaveProfile = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  // Login/Signup Screen
  if (!isLoggedIn) {
    return (
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
      />
    );
  }

  // Main Profile Dashboard
  return (
    <div className="min-h-screen bg-[#f1f3f6]">
      <div className="max-w-7xl mx-auto p-2 lg:p-4">
        {/* Profile Header */}
        <ProfileHeader user={user} setIsLoggedIn={setIsLoggedIn} />

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
              {activeTab === 'profile' && (
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
                  handleAddAddress={handleAddAddress}
                  handleEditAddress={handleEditAddress}
                  handleUpdateAddress={handleUpdateAddress}
                  handleDeleteAddress={handleDeleteAddress}
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