"use client"
import { updateUser } from "@/app/lib/api";
import { Cancel, Save } from "@mui/icons-material";
import { Edit } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

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

export const 
ProfileTab:React.FC<userProp>=({user_})=>{
const params=useSearchParams();
const url=new URLSearchParams(params.toString());



      const [user, setUser] = useState<User>(user_);
  const [isEditing, setIsEditing] = useState(false);
  
  
    const [editedUser, setEditedUser] = useState<User>(user_);
  const handleSaveProfile = async() => {
    
    console.log("editedUser",editedUser)
    const data =await updateUser(user_.id,editedUser);

    setUser(data);
    setIsEditing(false);
  };
   const handleCancelEdit = () => {
    console.log("editedUser",editedUser)
    setEditedUser(user);
    setIsEditing(false);
  };

    return(
    params.get('active-tab')=='profile' &&
    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                        {!isEditing ? (
                          <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                        ) : (
                          <div className="flex space-x-3">
                            <button
                              onClick={handleSaveProfile}
                              className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-colors"
                            >
                              <Save className="w-4 h-4" />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                            >
                              <Cancel className="w-4 h-4" />
                              <span>Cancel</span>
                            </button>
                          </div>
                        )}
                      </div>
    
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editedUser.firstName}
                              onChange={(e) => setEditedUser(prev => ({ ...prev, firstName: e.target.value }))}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.firstName}</div>
                          )}
                        </div>
    <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editedUser.lastName}
                              onChange={(e) => setEditedUser(prev => ({ ...prev, lastName: e.target.value }))}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.lastName}</div>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          {isEditing ? (
                            <input
                              type="email"
                              value={editedUser.email}
                              onChange={(e) => setEditedUser(prev => ({ ...prev, email: e.target.value }))}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.email}</div>
                          )}
                        </div>
    
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">mobile Number</label>
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.mobileNo}</div>
                        </div>
    
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                          {isEditing ? (
                            <input
                              type="text"
                              // value={editedUser?.address?.street}
                              // onChange={(e) => setEditedUser(prev => ({ 
                              //   ...prev, 
                              //   address: { ...prev?.address, street: e.target.value }
                              // }))}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">dummy address</div>
                          )}
                        </div>
    
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                          {isEditing ? (
                            <input
                              type="text"
                              // value={editedUser.address.city}
                              // onChange={(e) => setEditedUser(prev => ({ 
                              //   ...prev, 
                              //   address: { ...prev.address, city: e.target.value }
                              // }))}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900"> dummy city</div>
                          )}
                        </div>
    
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2"> Pincode</label>
                          {isEditing ? (
                            <input
                              type="text"
                              // value={editedUser.address.pincode}
                              // onChange={(e) => setEditedUser(prev => ({ 
                              //   ...prev, 
                              //   address: { ...prev.address, pincode: e.target.value }
                              // }))}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">dummy pincode</div>
                          )}
                        </div>
                      </div>
                    </div>
    )
}