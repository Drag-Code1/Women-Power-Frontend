import { Add, Cancel, Delete, Edit, Home, LocationOn, Work } from "@mui/icons-material";
import { useState } from "react";
interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}
export const AddressTab:React.FC=()=>{
      const [addresses, setAddresses] = useState<Address[]>([
        {
          id: '1',
          type: 'home',
          name: 'Home',
          street: '123 MG Road, Andheri East',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
          phone: '+91 9876543210',
          isDefault: true
        },
        {
          id: '2',
          type: 'work',
          name: 'Office',
          street: '456 Business Park, Bandra Kurla Complex',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400051',
          phone: '+91 9876543210',
          isDefault: false
        }
      ]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    type: 'home',
    name: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    isDefault: false
  });
    const getAddressIcon = (type: string) => {
      switch (type) {
        case 'home': return <Home className="w-5 h-5" />;
        case 'work': return <Work className="w-5 h-5" />;
        default: return <LocationOn className="w-5 h-5" />;
      }
    };
      const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setNewAddress(address);
    setShowAddAddress(true);
  };

    const handleDeleteAddress = (id: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };
    const setDefaultAddress = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };
  const handleUpdateAddress = () => {
    if (editingAddress && newAddress.name && newAddress.street && newAddress.city && newAddress.state && newAddress.pincode && newAddress.phone) {
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id ? { ...newAddress, id: editingAddress.id } : addr
      ));
    }
}
  const handleAddAddress = () => {
    if (newAddress.name && newAddress.street && newAddress.city && newAddress.state && newAddress.pincode && newAddress.phone) {
      const address: Address = {
        ...newAddress,
        id: Date.now().toString()
      };
      setAddresses([...addresses, address]);
      setNewAddress({
        type: 'home',
        name: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        isDefault: false
      });
      setShowAddAddress(false);
    } else {
      alert('Please fill all fields');
    }
  };

    return   <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                        <button
                          onClick={() => {
                            setEditingAddress(null);
                            setNewAddress({
                              type: 'home',
                              name: '',
                              street: '',
                              city: '',
                              state: '',
                              pincode: '',
                              phone: '',
                              isDefault: false
                            });
                            setShowAddAddress(true);
                          }}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                        >
                          <Add className="w-4 h-4" />
                          <span>Add Address</span>
                        </button>
                      </div>
    
                      <div className="space-y-4">
                        {addresses.map((address) => (
                          <div key={address.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <div className="text-blue-600 mt-1">
                                  {getAddressIcon(address.type)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <h3 className="font-semibold text-gray-900">{address.name}</h3>
                                    {address.isDefault && (
                                      <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
                                        Default
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-gray-600 mb-1">{address.street}</p>
                                  <p className="text-gray-600 mb-1">{address.city}, {address.state} - {address.pincode}</p>
                                  <p className="text-gray-500 text-sm">Phone: {address.phone}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {!address.isDefault && (
                                  <button
                                    onClick={() => setDefaultAddress(address.id)}
                                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                                  >
                                    Set Default
                                  </button>
                                )}
                                <button
                                  onClick={() => handleEditAddress(address)}
                                  className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteAddress(address.id)}
                                  className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm"
                                >
                                  <Delete className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
    
                        {addresses.length === 0 && (
                          <div className="text-center py-12">
                            <LocationOn className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-800 mb-2">No addresses saved</h3>
                            <p className="text-gray-600">Add your first address to get started</p>
                          </div>
                        )}
                      </div>
    
                      {/* Add/Edit Address Modal */}
                      {showAddAddress && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-xl font-bold text-gray-900">
                                {editingAddress ? 'Edit Address' : 'Add New Address'}
                              </h3>
                              <button
                                onClick={() => {
                                  setShowAddAddress(false);
                                  setEditingAddress(null);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                              >
                                <Cancel className="w-5 h-5 text-gray-600" />
                              </button>
                            </div>
    
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                                <select
                                  value={newAddress.type}
                                  onChange={(e) => setNewAddress(prev => ({ ...prev, type: e.target.value as 'home' | 'work' | 'other' }))}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                >
                                  <option value="home">Home</option>
                                  <option value="work">Work</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
    
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address Name</label>
                                <input
                                  type="text"
                                  value={newAddress.name}
                                  onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                                  placeholder="e.g., Home, Office, etc."
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                              </div>
    
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                                <textarea
                                  value={newAddress.street}
                                  onChange={(e) => setNewAddress(prev => ({ ...prev, street: e.target.value }))}
                                  placeholder="Enter full address"
                                  rows={3}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                />
                              </div>
    
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                  <input
                                    type="text"
                                    value={newAddress.city}
                                    onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                                    placeholder="City"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                                  <input
                                    type="text"
                                    value={newAddress.state}
                                    onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                                    placeholder="State"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                  />
                                </div>
                              </div>
    
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                                <input
                                  type="text"
                                  value={newAddress.pincode}
                                  onChange={(e) => setNewAddress(prev => ({ ...prev, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
                                  placeholder="Pincode"
                                  maxLength={6}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                              </div>
    
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input
                                  type="tel"
                                  value={newAddress.phone}
                                  onChange={(e) => setNewAddress(prev => ({ ...prev, phone: e.target.value }))}
                                  placeholder="+91 9876543210"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                              </div>
    
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="isDefault"
                                  checked={newAddress.isDefault}
                                  onChange={(e) => setNewAddress(prev => ({ ...prev, isDefault: e.target.checked }))}
                                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="isDefault" className="text-sm text-gray-700">
                                  Set as default address
                                </label>
                              </div>
                            </div>
    
                            <div className="flex space-x-3 mt-6">
                              <button
                                onClick={editingAddress ? handleUpdateAddress : handleAddAddress}
                                className="flex-1 bg-[#61503c] text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                              >
                                {editingAddress ? 'Update Address' : 'Save Address'}
                              </button>
                              <button
                                onClick={() => {
                                  setShowAddAddress(false);
                                  setEditingAddress(null);
                                }}
                                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
}