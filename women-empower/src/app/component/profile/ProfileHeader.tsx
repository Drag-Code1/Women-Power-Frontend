"use client"
import { Logout } from "@mui/icons-material";
import { useState } from "react";
import { LogOut } from "../ui/button/LogOut";

interface User {
  id: string;
  firstName: string;
    lastName: string;
  email: string;
  gender:string;
  mobileNo: string;
  role:string;
  avatar: string;
  // address: {
  //   street: string;
  //   city: string;
  //   state: string;
  //   pincode: string;
  // }| null;
  joining_date: string;
}
interface userProp{
    user:User
}
export const ProfileHeader:React.FC<userProp>=({user})=>{
// const [user, setUser] = useState<User>({
//         id: '1',
//         name: 'Rahul Sharma',
//         email: 'rahul.sharma@email.com',
//         phone: '+91 9876543210',
//         avatar: '/images/man1.jpg',
//         address: {
//           street: '123 MG Road',
//           city: 'Mumbai',
//           state: 'Maharashtra',
//           pincode: '400001'
//         },
//         joinedDate: 'January 2023'
//       });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    return  <div className="bg-white rounded-sm p-2 lg:p-2 mb-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                  <img
                    src={user.avatar}
                    alt={user.firstName}
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover border-4 border-blue-100"
                  />
                  <div>
                    <h1 className="text-1xl lg:text-2xl text-gray-900">{user.firstName} {user.lastName}</h1>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500">Member since {user.joining_date}</p>
                  </div>
                </div>
           
                <LogOut />
              </div>
            </div>
}