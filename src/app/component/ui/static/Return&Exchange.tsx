"use client";
import React from "react";

interface PolicySection {
  title: string;
  content: string;
}

interface ContactInfo {
  email: string;
  phone: string;
}

interface ReturnExchangePolicyProps {
  title?: string;
  subtitle?: string;
  policySections?: PolicySection[];
  contactInfo?: ContactInfo;
}

const ReturnExchangePolicy: React.FC<ReturnExchangePolicyProps> = ({
  title = "Cancellation, Return & Refund Policy",
  subtitle = "",
  policySections = [
    {
      title: "Cancellation Policy",
      content: "We understand that there may be times when you need to cancel your order. Cancellations are permitted if the request is made within 24 hours of placing the order and before the order has been dispatched. Once an order is shipped, it cannot be canceled.\n\nTo request a cancellation, please contact us at Sonalithakkar1112@gmail.com or call 9309100122."
    },
    {
      title: "Return Policy",
      content: "Our policy allows returns within 7 days of receiving the product, provided the item is unused, in its original packaging, and in a resellable condition. Please note that certain items may not be eligible for return, including items that have been customized or used.\n\nTo initiate a return, please contact our support team to receive return instructions. The return shipping cost will be borne by the customer unless the product was damaged or defective upon delivery."
    },
    {
      title: "Refund Policy",
      content: "Refunds will be processed upon successful receipt and inspection of the returned item. Once the return is approved, the refund will be issued to the original payment method within 7-10 business days.\n\nPlease note that original shipping fees are non-refundable, and certain items may not be eligible for a refund. If the item was marked as a final sale, it cannot be returned or refunded."
    },
    {
      title: "Non-Refundable Items",
      content: "Services, digital products, and any items marked as \"Final Sale\" are not eligible for return or refund. Please read the product descriptions carefully before making a purchase."
    },
    {
      title: "Contact Us",
      content: "If you have any questions about our Cancellation, Return & Refund Policy, please contact us at Sonalithakkar1112@gmail.com or call 9309100122. We are here to help and address any concerns you may have."
    }
  ],
  contactInfo = {
    email: "Sonalithakkar1112@gmail.com",
    phone: "9309100122"
  }
}) => {
  return (
    <main className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            {title}
          </h1>
          <div className="w-16 h-1 bg-[#61503c] mx-auto rounded-full mb-4"></div>
          {subtitle && (
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </header>

        {/* Card */}
        <article className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Policy Sections */}
          <section className="p-8">
            {policySections.map((section: PolicySection, index: number) => (
              <div key={index} className="mb-8 last:mb-0">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {section.title}
                </h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
                {index < policySections.length - 1 && (
                  <div className="mt-6 border-t border-gray-200"></div>
                )}
              </div>
            ))}
          </section>
        </article>

        {/* Contact */}
        <footer className="text-center mt-10">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Need Help?
            </h4>
            <p className="text-gray-600 mb-4">
              Have questions about our policies?
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-center gap-3">
              <a
                href={`mailto:${contactInfo.email}`}
                className="bg-[#817363] hover:bg-[#61503c] text-white transition-colors font-medium px-6 py-3 rounded-lg shadow-sm"
              >
                Email Us
              </a>
              <a
                href={`tel:${contactInfo.phone}`}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded-lg transition-colors shadow-sm"
              >
                Call Us
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default ReturnExchangePolicy;
