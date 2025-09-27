"use client"
import { useSearchParams } from "next/navigation";
interface deliveryFeeManagerProp{
    totalMRP:number
}
export const DeliveryFeeManager:React.FC<deliveryFeeManagerProp>=({totalMRP})=>{   
     const deliveryOptions = {
        'Standard-Delivery':{
          id: 'standard',
          price: 0,
      
        },
        'Express-Delivery':{
          id: 'express',
          price: 99,
    
        },
       'Express-Store-Pickup': {
          id: 'pickup',
          price: 0,
     
        }
     };
       const searchParams=useSearchParams();
  const selectedDeliveryOption = searchParams.get('del-op') || 'Standard-Delivery';
  
  const deliveryFee = deliveryOptions[selectedDeliveryOption as keyof typeof deliveryOptions]?.price;
    const totalAmount = totalMRP + deliveryFee;
    return(
        <>
        
        <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold">
                      {deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}
                    </span>
                  </div>
                   <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Payable Amount</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                  </>
    )
}
