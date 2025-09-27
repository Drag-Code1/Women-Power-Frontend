"use client"

import { useSearchParams } from "next/navigation";
import React from "react";

interface DeliveryStepContainerProps{
    children:React.ReactNode
}
export const DeliveryStepContainer:React.FC<DeliveryStepContainerProps>=({children})=>{
    const searchParams=useSearchParams();
    const selectedStep = searchParams.get('step')||null;
    const address = searchParams.get('address');
     const childArray = React.Children.toArray(children);
    return(
        <div className={`min-h-screen bg-white py-4 px-4 lg:px-8 ${selectedStep === 'delivery' || selectedStep==undefined ? 'block' : 'hidden'}`}>
                <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                    
                        {childArray[0]}
                      {/* Address Selection */}
                            {childArray[1]}
                    </div>
                            {/* Price Summary */}
                        {childArray[2]}
                             {/* <PriceSummary  /> */}
                  </div>
                          {/* Add Address Modal */}
                  {address && (
                    // <AddNewAddressForm />
                    childArray[3]
                  )}
                </div>
              </div>
                )
            
            
            }