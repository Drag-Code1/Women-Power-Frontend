import { Add, Check, Delete, Edit } from "@mui/icons-material"
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

export const DeliveryAddress:React.FC=()=>{
      const [selectedAddress, setSelectedAddress] = useState<string>('');
      const [isCheckingPincode, setIsCheckingPincode] = useState(false);
      const [pincodeServiceable, setPincodeServiceable] = useState<boolean | null>(null);
    
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
    return(
             <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">SELECT DELIVERY ADDRESS</h2>
                        
                        <div className="space-y-4 mb-6">
                          {addresses.map((address) => (
                            <div key={address.id} className="border rounded-lg p-4">
                              <div className="flex items-start space-x-3">
                                <input
                                  type="radio"
                                  name="address"
                                  value={address.id}
                                //   checked={selectedAddress === address.id}
                                  onChange={(e) => setSelectedAddress(e.target.value)}
                                  className="w-5 h-5 text-blue-600 mt-1"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded font-medium uppercase">
                                      {address.type}
                                    </span>
                                    {address.isDefault && (
                                      <span className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                                        <span>DEFAULT</span>
                                        <Check className="w-4 h-4" />
                                      </span>
                                    )}
                                  </div>
                                  <div className="font-semibold text-gray-900 mb-1">{address.name}</div>
                                  <div className="text-gray-600 text-sm mb-1">
                                    {address.street}, {address.city} {address.pincode}
                                  </div>
                                  <div className="text-gray-600 text-sm">Phone: {address.phone}</div>
                                  
                                  {selectedAddress === address.id && (
                                    <div className="mt-2">
                                      {isCheckingPincode && (
                                        <div className="text-blue-600 text-sm">Checking serviceability...</div>
                                      )}
                                      {pincodeServiceable === true && (
                                        <div className="text-green-600 text-sm">✓ Delivery available</div>
                                      )}
                                      {pincodeServiceable === false && (
                                        <div className="text-red-600 text-sm">✗ Delivery not available for this pincode</div>
                                      )}
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-700 text-sm">
                                    <Delete className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
        
                        <button
                        //   onClick={() => setShowAddAddress(true)}
                          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                        >
                          <Add className="w-5 h-5 inline mr-2" />
                          ADD NEW ADDRESS
                        </button>
                      </div>
    )
}