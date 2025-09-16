"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { X } from "lucide-react"; // close icon
import bannerImage from "../../../../../public/images/demo6.jpg";

// Validation Schemas
const PhoneSchema = Yup.object().shape({
    phone: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Enter a valid 10 digit mobile number")
        .required("Phone number is required"),
});

const OtpSchema = Yup.object().shape({
    otp: Yup.string()
        .matches(/^\d{6}$/, "Enter a valid 6 digit OTP")
        .required("OTP is required"),
});

interface SignUpProps {
    onClose: () => void; // close modal handler
}

const SignUp: React.FC<SignUpProps> = ({ onClose }) => {
    const [step, setStep] = useState<"phone" | "otp">("phone");
    const [phone, setPhone] = useState("");

    // Mock send OTP
    const sendOtp = async (phone: string) => {
        console.log("Sending OTP to:", phone);
        return true;
    };

    // Mock verify OTP
    const verifyOtp = async (otp: string) => {
        console.log("Verifying OTP:", otp);
        return otp === "123456"; // demo
    };

    return (
        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/50 backdrop-blur-sm">
             
            <section className="w-full max-w-sm bg-white rounded-xl shadow-xl overflow-hidden border border-yellow-200 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-yellow-100 hover:text-yellow-400"
                >
                    <X size={24} />
                </button>

                {/* Banner Image */}
                <Image
                    src={bannerImage}
                    alt="Banner"
                    className="w-full h-40 object-cover"
                    priority
                />

                {/* Step 1: Enter Phone */}
                {step === "phone" && (
                    <Formik
                        initialValues={{ phone: "" }}
                        validationSchema={PhoneSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            const ok = await sendOtp(values.phone);
                            setSubmitting(false);
                            if (ok) {
                                setPhone(values.phone);
                                setStep("otp");
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="p-6 space-y-6">
                                <h3 className="text-yellow-900 font-semibold text-lg text-center">
                                    Sign Up to view your profile
                                </h3>

                                {/* Phone Input */}
                                <div>
                                    <div className="flex items-center border-b-2 border-yellow-300 pb-2">
                                        <span className="font-semibold text-yellow-700 mr-2">IN</span>
                                        <span className="text-yellow-700 mr-2">+91</span>
                                        <Field
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone Number"
                                            className="flex-1 outline-none bg-transparent text-yellow-900 placeholder-yellow-400"
                                        />
                                    </div>
                                    <ErrorMessage
                                        name="phone"
                                        component="div"
                                        className="text-red-700 text-xs mt-1"
                                    />
                                </div>

                                {/* Continue Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-200 text-yellow-900 py-3 rounded-lg font-semibold transition shadow"
                                >
                                    {isSubmitting ? "Sending OTP..." : "Continue"}
                                </button>

                                {/* Terms */}
                                <p className="text-center text-xs text-yellow-700">
                                    By continuing, you agree to Crafted’s{" "}
                                    <a href="#" className="text-yellow-600 underline">
                                        Terms & Conditions
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="text-yellow-600 underline">
                                        Privacy Policy
                                    </a>
                                </p>
                            </Form>
                        )}
                    </Formik>
                )}

                {/* Step 2: Enter OTP */}
                {step === "otp" && (
                    <Formik
                        initialValues={{ otp: "" }}
                        validationSchema={OtpSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            const ok = await verifyOtp(values.otp);
                            setSubmitting(false);
                            if (ok) {
                                alert("🎉 Sign Up Successful!");
                                onClose();
                            } else {
                                alert("❌ Invalid OTP, try again.");
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="p-6 space-y-6">
                                <h3 className="text-yellow-900 font-semibold text-lg text-center">
                                    Enter OTP sent to{" "}
                                    <span className="text-yellow-700">+91 {phone}</span>
                                </h3>

                                {/* OTP Input */}
                                <div>
                                    <div className="flex items-center border-b-2 border-yellow-300 pb-2">
                                        <Field
                                            type="text"
                                            name="otp"
                                            placeholder="6-digit OTP"
                                            className="flex-1 outline-none bg-transparent text-yellow-900 placeholder-yellow-400 tracking-widest"
                                        />
                                    </div>
                                    <ErrorMessage
                                        name="otp"
                                        component="div"
                                        className="text-red-500 text-xs mt-1"
                                    />
                                </div>

                                {/* Verify Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-200 text-yellow-900 py-3 rounded-lg font-semibold transition shadow"
                                >
                                    {isSubmitting ? "Verifying..." : "Verify OTP"}
                                </button>

                                {/* Back button */}
                                <button
                                    type="button"
                                    onClick={() => setStep("phone")}
                                    className="w-full text-yellow-700 font-medium text-sm underline"
                                >
                                    Change Phone Number
                                </button>
                            </Form>
                        )}
                    </Formik>
                )}
            </section>
            
        </div>
    );
};

export default SignUp;