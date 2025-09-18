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
      phone: "",
      email: "",
      notes: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      street: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      pin: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
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
      className="space-y-4 p-6 rounded-lg shadow-md bg-white"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
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

      {/* City, State, Pin */}
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

      {/* Phone & Email */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Phone *</label>
        <input
          type="text"
          name="phone"
          onChange={formik.handleChange}
          value={formik.values.phone}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none"
        />
      </div>
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