import { Cancel, Save } from "@mui/icons-material";
import { Edit } from "lucide-react";
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
    user_:User
}

export const ProfileTab:React.FC<userProp>=({user_})=>{
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
  const [isEditing, setIsEditing] = useState(false);
  
  
    const [editedUser, setEditedUser] = useState<User>(user);
  const handleSaveProfile = () => {
    setUser(editedUser);
    setIsEditing(false);
  };
   const handleCancelEdit = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

    return <div>
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
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editedUser.name}
                              onChange={(e) => setEditedUser(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.name}</div>
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
                            <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user_.email}</div>
                          )}
                        </div>
    
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user_.phone}</div>
                        </div>
    
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editedUser.address.street}
                              onChange={(e) => setEditedUser(prev => ({ 
                                ...prev, 
                                address: { ...prev.address, street: e.target.value }
                              }))}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user_.address.street}</div>
                          )}
                        </div>
    
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editedUser.address.city}
                              onChange={(e) => setEditedUser(prev => ({ 
                                ...prev, 
                                address: { ...prev.address, city: e.target.value }
                              }))}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user_.address.city}</div>
                          )}
                        </div>
    
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editedUser.address.pincode}
                              onChange={(e) => setEditedUser(prev => ({ 
                                ...prev, 
                                address: { ...prev.address, pincode: e.target.value }
                              }))}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user_.address.pincode}</div>
                          )}
                        </div>
                      </div>
                    </div>
}