"use client";

import React from "react";
import WarningAmber from "@mui/icons-material/WarningAmber";
import VideoLibrary from "@mui/icons-material/VideoLibrary";
import CheckCircle from "@mui/icons-material/CheckCircle";
import CreditCard from "@mui/icons-material/CreditCard";
import Business from "@mui/icons-material/Business";
import LocationOn from "@mui/icons-material/LocationOn";
import Language from "@mui/icons-material/Language";
import Security from "@mui/icons-material/Security";
import Gavel from "@mui/icons-material/Gavel";
import PrivacyTip from "@mui/icons-material/PrivacyTip";
import Update from "@mui/icons-material/Update";
import ContactMail from "@mui/icons-material/ContactMail";

const TermsConditionsPage: React.FC = () => {
  const vendorInfo = {
    name: "Woman Empowering Journey",
    address: "Opp Hanuman Mandir, Main Mondha Golai Market, Parli Vaijnath 431515, Dist. Beed, Maharashtra, 413716",
    website: "www.womanej.com",
    email: "team@womanej.com"
  };

  const terms = [
    {
      id: 1,
      icon: <Business fontSize="large" className="text-blue-500" />,
      title: "Vendor Information",
      description: "Woman Empowering Journey",
      details: "We are a registered enterprise operating from Maharashtra, India. All services and products are provided under this business entity."
    },
    {
      id: 2,
      icon: <LocationOn fontSize="large" className="text-red-500" />,
      title: "Business Address",
      description: "Opp Hanuman Mandir, Main Mondha Golai Market, Parli Vaijnath 431515, Dist. Beed, Maharashtra, 413716",
      details: "Our registered office is located at the above address. All official correspondence should be directed to this location."
    },
    {
      id: 3,
      icon: <Language fontSize="large" className="text-green-500" />,
      title: "Website Usage",
      description: "Our website and its content are intended for your personal, non-commercial use.",
      details: "Unauthorized use, modification, or distribution of the content on our website is prohibited. By accessing our website at www.vaibhavdhus.com, you agree to comply with these terms."
    },
    {
      id: 4,
      icon: <Security fontSize="large" className="text-purple-500" />,
      title: "Intellectual Property",
      description: "All content on this website is the property of Woman Empowering Journey.",
      details: "All content, including text, graphics, logos, and images, is protected by applicable copyright laws. Any reproduction or redistribution without permission is strictly prohibited."
    },
    {
      id: 5,
      icon: <Gavel fontSize="large" className="text-orange-500" />,
      title: "User Conduct",
      description: "You agree not to post or transmit any harmful, threatening, or inappropriate content.",
      details: "Any misuse of the website that violates these terms may result in termination of your access to the website. We reserve the right to take appropriate legal action against violators."
    },
    {
      id: 6,
      icon: <PrivacyTip fontSize="large" className="teal-500" />,
      title: "Privacy Policy",
      description: "Your privacy is important to us.",
      details: "Please refer to our Privacy Policy for information on how we collect, use, and protect your personal information. We are committed to safeguarding your data."
    },
    {
      id: 7,
      icon: <WarningAmber fontSize="large" className="text-yellow-500" />,
      title: "Product Information",
      description: "We make every effort to display accurate information on our website.",
      details: "However, we do not warrant that product descriptions or other content on this site are error-free, complete, or current. All products are provided 'as is'."
    },
    {
      id: 8,
      icon: <CheckCircle fontSize="large" className="text-green-500" />,
      title: "Handcrafted Art Products",
      description: "All art products are handcrafted with care, so variations in color and design are natural.",
      details: "Each piece is unique due to the handmade nature. Minor variations in color, texture, or design elements are not considered defects but rather characteristics that make each item special."
    },
    {
      id: 9,
      icon: <CreditCard fontSize="large" className="text-purple-500" />,
      title: "Order Processing & Fees",
      description: "Orders are processed only after full payment confirmation is received.",
      details: "All workshop and competition fees are non-refundable. Once payment is processed, no refunds will be issued under any circumstances. Processing begins within 1-2 business days after payment verification."
    },
    {
      id: 10,
      icon: <VideoLibrary fontSize="large" className="text-blue-500" />,
      title: "Recordings Access",
      description: "Recordings (if provided) will have limited-time access and are for personal use only.",
      details: "Recording access typically expires 30 days after the event. Sharing, distributing, or commercial use of recordings is strictly prohibited and may result in legal action."
    },
    {
      id: 11,
      icon: <Gavel fontSize="large" className="text-indigo-500" />,
      title: "Limitation of Liability",
      description: "We will not be liable for any direct, indirect, incidental, or consequential damages.",
      details: "Your use of our website is at your own risk. We shall not be responsible for any loss or damage of any kind arising from your use of our services or website."
    },
    {
      id: 12,
      icon: <Security fontSize="large" className="text-blue-600" />,
      title: "Governing Law",
      description: "These Terms and Conditions are governed by the laws of India.",
      details: "Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Maharashtra."
    },
    {
      id: 13,
      icon: <Update fontSize="large" className="text-gray-500" />,
      title: "Changes to Terms",
      description: "We reserve the right to update or modify these Terms and Conditions at any time.",
      details: "Changes may be made without prior notice. Your continued use of the website following any changes signifies your acceptance of the updated terms."
    },
    {
      id: 14,
      icon: <ContactMail fontSize="large" className="text-red-500" />,
      title: "Contact Us",
      description: "If you have any questions regarding these Terms and Conditions, please contact us.",
      details: "Email: vaibhavdhus@gmail.com. We value your feedback and are here to assist with any concerns you may have regarding our terms and services."
    }
  ];

  return (
    <div className="min-h-screen text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Terms & Conditions
            </h1>
            <p className="text-sm text-gray-600">
              Please read carefully before proceeding
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Vendor Information Section */}
        <section className="mb-12 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
          <h2 className="text-xl font-bold mb-4 text-center text-blue-800">Vendor Information</h2>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Business className="text-blue-600 mb-2" fontSize="large" />
              <h3 className="font-semibold mb-1">Vendor</h3>
              <p className="text-gray-700">{vendorInfo.name}</p>
            </div>
            <div className="flex flex-col items-center">
              <LocationOn className="text-red-600 mb-2" fontSize="large" />
              <h3 className="font-semibold mb-1">Address</h3>
              <p className="text-gray-700">{vendorInfo.address}</p>
            </div>
            <div className="flex flex-col items-center">
              <Language className="text-green-600 mb-2" fontSize="large" />
              <h3 className="font-semibold mb-1">Website</h3>
              <p className="text-gray-700">{vendorInfo.website}</p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="mb-12 p-6 rounded-xl bg-gray-50 border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to our website. By accessing or using our services, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully before using our website.
          </p>
        </section>

        {/* Terms Grid */}
        <section className="grid gap-6 md:grid-cols-2">
          {terms.map((term) => (
            <article
              key={term.id}
              className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-shadow flex flex-col items-center text-center"
            >
              {/* Icon center top */}
              <div className="p-3 rounded-full bg-gray-100 mb-4 flex items-center justify-center">
                {term.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-semibold mb-2">{term.title}</h3>
              <p className="text-gray-700 mb-3">{term.description}</p>
              <div className="text-sm text-gray-600">{term.details}</div>
            </article>
          ))}
        </section>

        {/* Contact Information */}
        <section className="mt-12">
          <div className="p-6 rounded-xl bg-[#f3f3f3] text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Questions or Concerns?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these terms and conditions or need
              clarification on any policy, please don't hesitate to contact our
              support team before making any commitments or purchases.
            </p>
            <div className="mt-4">
              <button className="px-6 py-2 rounded-lg font-medium bg-[#817363] hover:bg-[#61503c] text-white transition-colors">
                <a href="/contact">Contact Support</a>
              </button>
            </div>
          </div>
        </section>

        {/* Last Updated */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </footer>
      </main>
    </div>
  );
};

export default TermsConditionsPage;
