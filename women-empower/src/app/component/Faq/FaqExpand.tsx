"use client";
import { useSearchParams, useRouter } from "next/navigation";
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FaqProp{
faq:FAQItem
}
export const FaqExpand: React.FC<FaqProp> = ({faq}) => {
       const router = useRouter();
const searchParams = useSearchParams();
const params = new URLSearchParams(searchParams.toString());
    return    <button
                onClick={() => {

const url= new URL(window.location.href);
url.searchParams.set('faqid', faq.id.toString());
history.pushState(null, '', url.toString());

// params.set('faqid', faq.id.toString());
// router.replace(`?${params.toString()}`, { scroll: false }); 
       }}
                className="w-full px-6 py-5 text-left flex items-center justify-between bg-gray-50 focus:outline-none"
                // aria-expanded={isOpen(faq.id)}
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
  }