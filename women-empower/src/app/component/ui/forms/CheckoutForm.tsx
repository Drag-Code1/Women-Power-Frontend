"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

export default function CheckoutForm() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      country: "India",
      street: "",
      city: "",
      state: "",
      pin: "",
      mobile: "",
      email: "",
      notes: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "First name must contain only letters (no numbers)")
        .min(2, "First name must be at least 2 characters")
        .max(30, "First name must be at most 30 characters")
        .required("Required"),
      lastName: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Last name must contain only letters (no numbers)")
        .min(2, "Last name must be at least 2 characters")
        .max(30, "Last name must be at most 30 characters")
        .required("Required"),
      street: Yup.string().required("Required"),
      city: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "City must contain only letters (no numbers)")
        .required("Required"),
      state: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "State must contain only letters (no numbers)")
        .required("Required"),
      pin: Yup.string()
        .matches(/^[1-9][0-9]{5}$/, "PIN must be a valid 6-digit number")
        .required("Required"),
      mobile: Yup.string()
        .matches(/^\d{10}$/, "Mobile must be 10 digits")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: async (values) => {
      console.log("Submitting order:", values);
      // Payment integration here
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-3 px-4 pb-4 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4 text-[#6a5947]">
        Billing details
      </h2>

      {/* First & Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            First name *
          </label>
          <input
            type="text"
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none"
          />
          {formik.errors.firstName && (
            <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Last name *
          </label>
          <input
            type="text"
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none"
          />
          {formik.errors.lastName && (
            <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Street */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Street address *
        </label>
        <input
          type="text"
          name="street"
          onChange={formik.handleChange}
          value={formik.values.street}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none"
        />
      </div>

      {/* City, State */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">City *</label>
          <input
            type="text"
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">State *</label>
          <input
            type="text"
            name="state"
            onChange={formik.handleChange}
            value={formik.values.state}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none"
          />
        </div>
      </div>
      {/* PIN, Mobile */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            PIN Code *
          </label>
          <input
            type="text"
            name="pin"
            onChange={formik.handleChange}
            value={formik.values.pin}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Mobile *</label>
          <input
            type="text"
            name="mobile"
            onChange={formik.handleChange}
            value={formik.values.mobile}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none"
          />
        </div>
      </div>
      {/* Email */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Email address *
        </label>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none"
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Order notes
        </label>
        <textarea
          name="notes"
          onChange={formik.handleChange}
          value={formik.values.notes}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none"
        ></textarea>
      </div>
    </form>
  );
}