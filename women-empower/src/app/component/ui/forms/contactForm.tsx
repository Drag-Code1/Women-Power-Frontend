"use client";

import { useFormState } from "react-dom";
import { contactAction } from "@/app/services/contactService";

export default function ContactPage() {
  const [state, formAction] = useFormState(contactAction, {
    success: false,
    message: "",
  });

  return (
    <div className="max-w-xl mx-auto p-8 flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

      <form action={formAction} className="space-y-5">
        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First name *
            </label>
            <input
              name="firstName"
              type="text"
              required
              placeholder="First name"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-[#5C452B] focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last name *
            </label>
            <input
              name="lastName"
              type="text"
              required
              placeholder="Last name"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-[#5C452B] focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Mobile */}
        <div>
          <input
            name="mobile"
            type="tel"
            required
            pattern="[0-9]{10}"
            placeholder="Mobile Number *"
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-[#5C452B] focus:outline-none text-sm"
          />
        </div>

        {/* Email */}
        <div>
          <input
            name="email"
            type="email"
            required
            placeholder="Email *"
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-[#5C452B] focus:outline-none text-sm"
          />
        </div>

        {/* Message */}
        <div>
          <textarea
            name="message"
            rows={4}
            required
            placeholder="Your Message *"
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-[#5C452B] focus:outline-none text-sm resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#5C452B] text-white text-sm font-semibold py-3 rounded-md hover:bg-[#4a361f] transition duration-300 cursor-pointer"
        >
          Submit
        </button>
      </form>

      {/* ✅ Feedback message */}
      {state.message && (
        <p
          className={`mt-4 text-sm ${
            state.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </div>
  );
}
