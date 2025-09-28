"use client";
import React from "react";

  
  interface FAQItem {
  id: number;
  question: string;
  answer: string;
}
interface FaqItemProp {
    faq: FAQItem;   
      searchParams: { [key: string]: string };
}

  export const FaqItem: React.FC<FaqItemProp> = ({ faq }) => {
const[isOpen, setIsOpen]=React.useState<boolean>();
    return (
  <article
              key={faq.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
            >
    <button
                onClick={() => {
setIsOpen(()=>!isOpen);

       }}
                className="w-full px-6 py-5 text-left flex items-center justify-between bg-gray-50 focus:outline-none"
                aria-expanded={isOpen }
                aria-controls={`faq-answer-${faq.id}`}
              >
                <h2 className="text-lg font-semibold text-gray-800 pr-4">
                  {faq.question}
                </h2>
                <div className="flex-shrink-0">
                  <div
                    className={`w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center transition-transform duration-300 ${
                     true? "rotate-45" : ""
                    }`}
                  >
                    <span className="text-[#61503c] font-bold text-xl">+</span>
                  </div>
                </div>
              </button>
              <div
                id={`faq-answer-${faq.id}`}
                className={`overflow-hidden transition-all duration-300 ${
                 isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 pt-0">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </article>
    );
  };




  
//   interface FAQItem {
//   id: number;
//   question: string;
//   answer: string;
// }

//   export const FaqItem: React.FC<FAQItem> = ({faq}) => {
   

//     return (
//   <article
//               key={faq.id}
//               className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
//             >
//               <button
//                 onClick={() => {

// const searchParams = useSearchParams();
//  const params = new URLSearchParams(searchParams.toString());
//   params.set('faq-id', faq.id.toString());

//                 }}
//                 className="w-full px-6 py-5 text-left flex items-center justify-between bg-gray-50 focus:outline-none"
//                 aria-expanded={isOpen(faq.id)}
//                 aria-controls={`faq-answer-${faq.id}`}
//               >
//                 <h2 className="text-lg font-semibold text-gray-800 pr-4">
//                   {faq.question}
//                 </h2>
//                 <div className="flex-shrink-0">
//                   <div
//                     className={`w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center transition-transform duration-300 ${
//                       isOpen(faq.id) ? "rotate-45" : ""
//                     }`}
//                   >
//                     <span className="text-[#61503c] font-bold text-xl">+</span>
//                   </div>
//                 </div>
//               </button>

//               <div
//                 id={`faq-answer-${faq.id}`}
//                 className={`overflow-hidden transition-all duration-300 ${
//                   isOpen(faq.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//                 }`}
//               >
//                 <div className="px-6 pb-5 pt-0">
//                   <div className="border-t border-gray-200 pt-4">
//                     <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
//                   </div>
//                 </div>
//               </div>
//             </article>
//     );
//   };