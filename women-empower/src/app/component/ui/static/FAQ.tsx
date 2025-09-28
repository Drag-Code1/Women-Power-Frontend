// "use client";
import React, {  } from "react";
import faqsData from "@/app/data/faqsData";
import { FaqItem } from "../../Faq/FaqItem";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  items?: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({
  title = "Frequently Asked Questions",
  items = faqsData, // default data
}) => {
 

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h1>
          <div className="w-16 h-1 bg-[#61503c] mx-auto rounded-full"></div>
        </header>

        {/* FAQs */}
        <div className="space-y-4">
          {faqsData.map((faq) => (
             <FaqItem faq={faq} />
          ))}


        </div>

        {/* Footer */}
        <footer className="text-center mt-12">
          <p className="text-gray-600 text-sm">
            Still have questions?
            <a
              href="/contactus"
              className="text-[#61503c] font-medium ml-1 underline"
            >
              Contact us
            </a>
          </p>
        </footer>
      </div>
    </section>
  );
};

export default FAQ;