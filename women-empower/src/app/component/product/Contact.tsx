'use client';

import React from 'react';
import { MapPin, Mail, Clock } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  type FormFields = {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    message: string;
  };

  type Errors = {
    [K in keyof FormFields]: string;
  };

  type Touched = {
    [K in keyof FormFields]: boolean;
  };

  const [formData, setFormData] = useState<FormFields>({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<Errors>({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    message: ''
  });
  const [touched, setTouched] = useState<Touched>({
    firstName: false,
    lastName: false,
    mobile: false,
    email: false,
    message: false
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'firstName':
        return !value ? 'First name is required' : '';
      case 'lastName':
        return !value ? 'Last name is required' : '';
      case 'mobile':
        return !value
          ? 'Mobile number is required'
          : !/^[0-9]{10}$/.test(value)
          ? 'Enter a valid 10-digit mobile number'
          : '';
      case 'email':
        return !value
          ? 'Email is required'
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? 'Invalid email address'
          : '';
      case 'message':
        return !value ? 'Message is required' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name as keyof FormFields]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  interface SubmitEvent extends React.MouseEvent<HTMLButtonElement> {}

  interface NewErrors {
    [key: string]: string;
  }

  interface NewTouched {
    [key: string]: boolean;
  }

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const newErrors: NewErrors = {};
    Object.keys(formData).forEach(key => {
      newErrors[key] = validateField(key, formData[key as keyof typeof formData]);
    });

    setErrors(newErrors as Errors);
    setTouched(
      Object.keys(formData).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as NewTouched
      ) as Touched
    );

    const isValid = Object.values(newErrors).every(error => !error);

    if (isValid) {
      alert('Form submitted: ' + JSON.stringify(formData, null, 2));
    }
  };

  return (
    <section className="py-12 px-4 md:px-10 bg-[#f7f7f7] text-[#5C452B]">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto rounded-xl shadow-md overflow-hidden bg-white border border-gray-200 items-stretch">
        
        {/* Left: Contact Info */}
        <div className="p-8 bg-[#f7f7f7] space-y-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Contact Info</h2>

          <div>
            <h3 className="flex items-center font-semibold mb-1">
              <MapPin className="mr-2 text-black w-4 h-4" /> Address
            </h3>
            <p className="text-sm leading-relaxed">
              Jalaram Trading Company <br />
              Opp Hanuman Mandir, Main Mondha Golai Market <br />
              Parli Vaijnath 431515, Dist. Beed, Maharashtra
            </p>
          </div>

          <div>
            <h3 className="flex items-center font-semibold mb-1">
              <Mail className="mr-2 text-black w-4 h-4" /> Email
            </h3>
            <a
              href="mailto:womanempoweringjourney@gmail.com"
              className="text-sm text-blue-600 hover:underline"
            >
              womanempoweringjourney@gmail.com
            </a>
          </div>

          <div>
            <h3 className="flex items-center font-semibold mb-1">
              <Clock className="mr-2 text-black w-4 h-4" /> Hours
            </h3>
            <p className="text-sm">Mon - Sat: 9 AM – 7 PM</p>
            <p className="text-sm">Sunday: Closed</p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <div className="space-y-5">
            
            {/* First Name and Last Name - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First name *
                </label>
                <input
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.firstName}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-[#5C452B] focus:outline-none text-sm"
                />
                {touched.firstName && errors.firstName && (
                  <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last name *
                </label>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.lastName}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-[#5C452B] focus:outline-none text-sm"
                />
                {touched.lastName && errors.lastName && (
                  <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Mobile */}
            <div>
              <input
                name="mobile"
                type="tel"
                placeholder="Mobile Number *"
                onChange={handleChange}
                onBlur={handleBlur}
                value={formData.mobile}
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-[#5C452B] focus:outline-none text-sm"
              />
              {touched.mobile && errors.mobile && (
                <p className="text-red-600 text-xs mt-1">{errors.mobile}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email *"
                onChange={handleChange}
                onBlur={handleBlur}
                value={formData.email}
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-[#5C452B] focus:outline-none text-sm"
              />
              {touched.email && errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <textarea
                name="message"
                rows={4}
                placeholder="Your Message *"
                onChange={handleChange}
                onBlur={handleBlur}
                value={formData.message}
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-[#5C452B] focus:outline-none text-sm resize-none"
              />
              {touched.message && errors.message && (
                <p className="text-red-600 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#5C452B] text-white text-sm font-semibold py-3 rounded-md hover:bg-[#4a361f] transition duration-300 cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;