"use client";

import React, { useState } from "react";
import { PersonAdd, ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
interface signupProp{
     setShowSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SignupForm: React.FC<signupProp> = ({setShowSignUp}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    mobileNo: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple frontend validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.gender ||
      !formData.email ||
      !formData.mobileNo
    ) {
      setError("Please fill all fields correctly.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.mobileNo)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    setError("");

    // Example API call
    const data=await fetch("http://localhost:7000/v1/user/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if(data.success==true){
        
    setSuccess("✅ Signup successful! Redirecting...");
   setTimeout(() => {
      setShowSignUp(false)
    }, 1500);
    
    }
    else{
        
    setSuccess("✅ Signup failed!");
    }
  

 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10">
        <button
          onClick={() =>setShowSignUp(false)}
          className="mb-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowBack className="w-5 h-5 text-gray-600" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#61503c] rounded-full flex items-center justify-center mx-auto mb-4">
            <PersonAdd className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create an Account</h1>
          <p className="text-gray-600">Join us and start your journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="First name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Last name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center">{success}</p>}

          <button
            type="submit"
            className="w-full bg-[#61503c] text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600 mt-3">
            Already have an account?{" "}
            <span
              onClick={() =>setShowSignUp(false)}
              className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
