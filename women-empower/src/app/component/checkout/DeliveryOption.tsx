
import {
  LocalShipping,
  Business,
} from '@mui/icons-material';
import { DeliveryOptionItem } from './DeliveryOptionItem';
export const DeliveryOptionContainer:React.FC=()=>{
 const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard-Delivery',
      description: 'Typically delivers between 3-5 days*',
      price: 0,
      icon: LocalShipping
    },
    {
      id: 'express',
      name: 'Express-Delivery',
      description: 'Delivers within 1-2 days*',
      price: 99,
      icon: LocalShipping
    },
    {
      id: 'pickup',
      name: 'Express-Store-Pickup',
      description: 'Pickup from nearest store',
      price: 0,
      icon: Business
    }
  ];
    return(
         <div className={`bg-white rounded-lg shadow-sm p-6 `}>
                <h2 className="text-xl font-bold text-gray-900 mb-6">DELIVERY OPTIONS AVAILABLE</h2>
                <div className="space-y-4">
                  {deliveryOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <DeliveryOptionItem key={option.id} option={option} Icon={Icon} />
                    );
                  })}
                </div>
              </div>
    )
}