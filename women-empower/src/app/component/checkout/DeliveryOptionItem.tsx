"use client"

import { useSearchParams } from "next/navigation";

interface DeliveryOption {
  id: string;
  name: string; 
    description: string;

    price: number;
    icon: React.ElementType;


}
interface deliveryOptionProps{
  option:DeliveryOption
    Icon: React.ElementType;
}

export const DeliveryOptionItem:React.FC<deliveryOptionProps>=({option ,Icon})=>{
    const searchParam=new URLSearchParams(window.location.href);
  const urlSearchParam=useSearchParams();
  const selectedDeliveryOption = urlSearchParam.get('del-op') || 'Standard+Delivery';
    const url = new URL(window.location.href);

 return(
  <label key={option.id} className="flex items-center space-x-4 cursor-pointer">
                        <input
                          type="radio"
                          name="delivery"
                          value={option.id}
                          checked={selectedDeliveryOption === option.name}
                          onChange={(e) =>{url.searchParams.set('del-op',option.name);
history.pushState({}, "", url);
                          }}
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
 )
}