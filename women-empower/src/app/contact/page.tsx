'use client';

import React from 'react';
import { FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Contact = () => {
  
  const formik = useFormik({
    initialValues: {
      fullName: '',
      mobile: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required'),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit mobile number')
        .required('Mobile number is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      message: Yup.string().required('Message is required'),
    }),
    onSubmit: (values) => {
      alert('Form submitted: ' + JSON.stringify(values, null, 2));
      
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 mt-20 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-xl overflow-hidden max-w-5xl w-full bg-white border border-gray-200">

        {/* Left: Contact Details */}
        <div className="bg-[#f7f7f7] text-[#5C452B] p-8 rounded-l-xl">
          {/* Visit Us */}
          <div className="mb-6">
            <h2 className="flex items-center text-2xl font-bold mb-4">
              <FaMapMarkerAlt className="mr-2 text-black" />
              Visit Us
            </h2>
            <p>
              <strong>Sonali Ratilal Thakkar</strong><br />
              Jalaram Trading Company<br />
              Opp Hanuman Mandir<br />
              Main Mondha Golai Market<br />
              Parli Vaijnath 431515<br />
              Dist. Beed, Maharashtra
            </p>

            {/* Google Map */}
            <div className="mt-4 rounded overflow-hidden shadow-md">
              <iframe
                title="Jalaram Trading Company Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.098302673689!2d75.73620421501842!3d18.86083348789082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2f4d6f69ae4c7%3A0x7ea9474d5a7b789d!2sJalaram%20Trading%20Company!5e0!3m2!1sen!2sin!4v1694716150117!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Call Us */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Call Us</h2>
            <p>+91-0000000000</p>
          </div>

          {/* Email Us */}
          <div>
            <h2 className="flex items-center text-2xl font-bold mb-2">
              <FaEnvelope className="mr-2 text-black" />
              Email Us
            </h2>
            <p className="mb-2">
              <a href="mailto:womanempoweringjourney@gmail.com" className="underline text-blue-600">
                womanempoweringjourney@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="p-8 bg-white rounded-r-xl">
          <h2 className="text-2xl font-bold text-[#5C452B] mb-6">Get in Touch</h2>

          <form onSubmit={formik.handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                name="fullName"
                type="text"
                placeholder="Your full name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none "
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.fullName}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number <span className="text-red-600">*</span>
              </label>
              <input
                name="mobile"
                type="tel"
                placeholder="Your mobile number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobile}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none "
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.mobile}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none "
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message <span className="text-red-600">*</span>
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder="Your message..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none "
              />
              {formik.touched.message && formik.errors.message && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#5C452B] text-white font-semibold py-2 rounded-md shadow-md hover:bg-[#4a361f] transition duration-300"
              style={{ boxShadow: '0 2px 6px #f7f7f7' }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
