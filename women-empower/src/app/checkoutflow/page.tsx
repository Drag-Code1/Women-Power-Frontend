import React from "react";
import {
  LocalShipping,
  Home,
  Work,
  Business,
  Add,
  Edit,
  Delete,
  CreditCard,
  AccountBalance,
  Payment,
  AccountBalanceWallet,
  QrCode,
  Visibility,
  VisibilityOff,
  ArrowBack,
  Check,
  LocationOn,
  Phone,
  Person,
  ContactlessOutlined,
} from "@mui/icons-material";
import { PriceSummary } from "../component/checkout/PriceSummary";
import { DeliveryOptionContainer } from "../component/checkout/DeliveryOption";
import { DeliveryAddress } from "../component/checkout/DeliveryAddress";
import { AddNewAddressForm } from "../component/ui/forms/AddNewAddress";
import { PaymentStep } from "../component/checkout/PaymentStep";
import { ConfirmationStep } from "../component/checkout/ConfirmationStep";
import { DeliveryStepContainer } from "../component/checkout/DeliveryStepContainer";

interface CheckoutProps {
  searchParams: { [key: string]: string | string[] | undefined | null };
}

export default async function CheckoutFlow({ searchParams }: CheckoutProps) {
  const currentStep = searchParams.step;
  console.log("currentStep in checkoutflow", currentStep);
  const address = searchParams.address;

  return (
    <>
      {/* {currentStep===undefined && */}
      <DeliveryStepContainer>
        <DeliveryOptionContainer />
        <DeliveryAddress />
        <PriceSummary />
        <AddNewAddressForm />
      </DeliveryStepContainer>
      {/* }  */}

      <PaymentStep />
      <ConfirmationStep />
    </>
  );
}

//

// export default async function CheckoutFlow({ searchParams }: CheckoutProps) {

//   const currentStep = searchParams.step;

//   const address = searchParams.address;
//   if (currentStep === 'delivery') {
//     return (
//       <div className="min-h-screen bg-white py-4 px-4 lg:px-8">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Main Content */}
//             <div className="lg:col-span-2 space-y-6">

// <DeliveryOptionContainer />
//               {/* Address Selection */}

//               <DeliveryAddress/>

//             </div>

//             {/* Price Summary */}
//                      <PriceSummary  />
//           </div>

//           {/* Add Address Modal */}
//           {address && (
//             <AddNewAddressForm />
//           )}
//         </div>
//       </div>
//     );
//   }

//   // Payment Step
//   if (currentStep === 'payment') {
//     return (

// <PaymentStep />
//     );
//   }

//   // Confirmation Step
//   if (currentStep === 'confirmation') {
//     return (
//       <ConfirmationStep />
//     );
//   }

//   return null;
// };
