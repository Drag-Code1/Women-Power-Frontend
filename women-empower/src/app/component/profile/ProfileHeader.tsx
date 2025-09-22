import { Logout } from "@mui/icons-material";
import { useState } from "react";

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
interface userProp{
    user:User
}
export const ProfileHeader:React.FC<userProp>=({user})=>{

  const [isLoggedIn, setIsLoggedIn] = useState(false);
    return  <div className="bg-white rounded-sm p-2 lg:p-2 mb-4">
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
            </div>
}