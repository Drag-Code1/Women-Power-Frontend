import { ArrowBack } from "@mui/icons-material";
import { useState } from "react";
interface DeliveryAddress {
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

export const AddNewAddressForm:React.FC=()=>{
      const [showAddAddress, setShowAddAddress] = useState(false);
        const [isCheckingPincode, setIsCheckingPincode] = useState(false);
        const [pincodeServiceable, setPincodeServiceable] = useState<boolean | null>(null);
          const [selectedAddress, setSelectedAddress] = useState<string>('');
        
        const [addresses, setAddresses] = useState<DeliveryAddress[]>([
          {
            id: '1',
            type: 'home',
            name: 'Samarth Suhas',
            street: 'majaleshaha shaharataki shevgaon ahamadnaar',
            city: 'Shevgaon',
            state: 'Maharashtra',
            pincode: '414502',
            phone: '+91 9921576550',
            isDefault: true
          }
        ]);
      
      const [newAddress, setNewAddress] = useState({
        type: 'home' as 'home' | 'work' | 'other',
        name: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        isDefault: false
      });
       const checkPincode = async (pincode: string) => {
    if (pincode.length === 6) {
      setIsCheckingPincode(true);
      // Simulate API call
      setTimeout(() => {
        // Mock validation - consider most pincodes serviceable
        const serviceable = Math.random() > 0.1; // 90% chance of being serviceable
        setPincodeServiceable(serviceable);
        setIsCheckingPincode(false);
      }, 1000);
    }
  };
 const handleAddAddress = () => {
    if (newAddress.name && newAddress.street && newAddress.city && newAddress.state && newAddress.pincode && newAddress.phone) {
      const address: DeliveryAddress = {
        ...newAddress,
        id: Date.now().toString()
      };
      
      // If this is set as default, update existing addresses
      if (newAddress.isDefault) {
        setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: false })));
      }
      
      setAddresses(prev => [...prev, address]);
      setSelectedAddress(address.id);
      checkPincode(address.pincode);
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
      alert('Please fill all required fields');
    }
  };
    return(  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Add New Address</h3>
                      <button
                        onClick={() => setShowAddAddress(false)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <ArrowBack className="w-5 h-5" />
                      </button>
                    </div>
    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                        <select
                          value={newAddress.type}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, type: e.target.value as any }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="home">Home</option>
                          <option value="work">Work</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
    
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          value={newAddress.name}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter full name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
    
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                        <textarea
                          value={newAddress.street}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, street: e.target.value }))}
                          placeholder="House no, Building, Street, Area"
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                      </div>
    
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                          <input
                            type="text"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                            placeholder="City"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                          <input
                            type="text"
                            value={newAddress.state}
                            onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                            placeholder="State"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
    
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                        <input
                          type="text"
                          value={newAddress.pincode}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                            setNewAddress(prev => ({ ...prev, pincode: value }));
                            if (value.length === 6) {
                              checkPincode(value);
                            }
                          }}
                          placeholder="6-digit pincode"
                          maxLength={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
    
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+91 9876543210"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
    
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isDefault"
                          checked={newAddress.isDefault}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, isDefault: e.target.checked }))}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <label htmlFor="isDefault" className="text-sm text-gray-700">
                          Make this my default address
                        </label>
                      </div>
                    </div>
    
                    <div className="flex space-x-3 mt-6">
                      <button
                        onClick={handleAddAddress}
                        className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Save Address
                      </button>
                      <button
                        onClick={() => setShowAddAddress(false)}
                        className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>)
}