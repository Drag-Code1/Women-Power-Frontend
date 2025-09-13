"use client";
import React, { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  faqs?: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({
  title = "Frequently Asked Questions",
  faqs = [
    {
      id: 1,
      question: "Can I get a refund for workshops or products?",
      answer:
        "No, we do not offer refunds. Workshops/competitions are non-refundable, and for products we only provide exchange in case of damage.",
    },
    {
      id: 2,
      question: "What if I receive a damaged product?",
      answer:
        "Please share clear photos/videos of the damaged item within 48 hours of delivery. After returning it, we will send you a replacement of the same design/product.",
    },
    {
      id: 3,
      question: "Do you allow returns if I change my mind?",
      answer:
        "No, we don't accept returns for reasons like change of mind, dislike of color, or design variations (since all products are handmade).",
    },
    {
      id: 4,
      question: "Are customized products exchangeable?",
      answer: "No, customized or made-to-order items are not eligible for exchange.",
    },
    {
      id: 5,
      question: "How long does delivery take?",
      answer:
        "Orders are usually shipped within 5–7 business days, and delivery time may vary depending on your location.",
    },
    {
      id: 6,
      question: "How can I contact for support?",
      answer:
        "You can reach us via our Contact Us page or WhatsApp number mentioned on the website.",
    },
  ],
}) => {
  const [openItem, setOpenItem] = useState<number>(faqs[0]?.id || 0);

  const toggleItem = (id: number) => {
    setOpenItem((prev) => (prev === id ? 0 : id));
  };

  const isOpen = (id: number) => openItem === id;

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h1>
          <div className="w-16 h-1 bg-[#61503c] mx-auto rounded-full"></div>
        </header>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <article
              key={faq.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between bg-gray-50 focus:outline-none"
                aria-expanded={isOpen(faq.id)}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <h2 className="text-lg font-semibold text-gray-800 pr-4">
                  {faq.question}
                </h2>
                <div className="flex-shrink-0">
                  <div
                    className={`w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      isOpen(faq.id) ? "rotate-45" : ""
                    }`}
                  >
                    <span className="text-[#61503c] font-bold text-xl">+</span>
                  </div>
                </div>
              </button>

              <div
                id={`faq-answer-${faq.id}`}
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen(faq.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 pt-0">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <footer className="text-center mt-12">
          <p className="text-gray-600 text-sm">
            Still have questions?
            <a
              href="/contact"
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
