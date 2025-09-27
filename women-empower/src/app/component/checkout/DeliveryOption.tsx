import {
  LocalShipping,

  Business,

} from '@mui/icons-material';
export const DeliveryOptionContainer:React.FC=()=>{
 const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: 'Typically delivers between 3-5 days*',
      price: 0,
      icon: LocalShipping
    },
    {
      id: 'express',
      name: 'Express Delivery',
      description: 'Delivers within 1-2 days*',
      price: 99,
      icon: LocalShipping
    },
    {
      id: 'pickup',
      name: 'Express Store Pickup',
      description: 'Pickup from nearest store',
      price: 0,
      icon: Business
    }
  ];

    return(

         <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">DELIVERY OPTIONS AVAILABLE</h2>
                <div className="space-y-4">
                  {deliveryOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <label key={option.id} className="flex items-center space-x-4 cursor-pointer">
                        <input
                          type="radio"
                          name="delivery"
                          value={option.id}
                        //   checked={selectedDeliveryOption === option.id}
                        //   onChange={(e) => setSelectedDeliveryOption(e.target.value)}
                          className="w-5 h-5 text-blue-600"
                        />
                        <Icon className="w-8 h-8 text-gray-600" />
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{option.name}</div>
                          <div className="text-sm text-gray-600">{option.description}</div>
                        </div>
                        {option.price > 0 && (
                          <div className="text-green-600 font-semibold">₹{option.price}</div>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
    )
}