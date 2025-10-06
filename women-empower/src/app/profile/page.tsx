// 'use client';
import React, {  } from 'react';
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
import { fetchUserDetails } from '../lib/api';





interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  total: number;
  items: number;
  image: string;
}

const ProfileSection: React.FC = async() => {
  const userID='a55a6087-3c15-415f-a4c3-f1d1d7825846'
const data=await fetchUserDetails(userID);
console.log(data)
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

  return (
    <div className="min-h-screen bg-[#f1f3f6]">
      <div className="max-w-7xl mx-auto p-2 lg:p-4">
       
<ProfileHeader user={data.data} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         
<ProfileSideBar />
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-sm p-4 lg:p-4">
              
              {/* Profile Tab */}
             

                <ProfileTab user_={data.data} />

              {/* Orders Tab */}
             

                <OrderTab />
              

              {/* Addresses Tab */}
             
              

                <AddressTab />
        

              {/* Help Tab */}
              
              
                <HelpTab />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;