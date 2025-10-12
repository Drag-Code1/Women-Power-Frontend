"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoginSignup from "@/app/LoginSignup/page";
import { useAuth } from "@/app/contexts/AuthContext";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { login, verifyOtp, sendOtp, isLoading } = useAuth();

  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [emailAddress, setEmailAddress] = useState("");
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    gender: "male" as "male" | "female",
    email: "",
    mobileNo: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async () => {
    if (!emailAddress || !emailAddress.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    try {
      setError(null);
      // Show OTP screen immediately for UI flow
      setShowOtpVerification(true);
      // Fire-and-forget stubbed login (no API)
      login(emailAddress).catch((err) => console.error("Login error:", err));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    }
  };

  const handleOtpVerification = async () => {
    const value = otp.join("");
    if (value.length !== 6) {
      setError("Please enter complete OTP");
      return;
    }
    try {
      setError(null);
      await verifyOtp(emailAddress, parseInt(value, 10)); // POST /v1/login/otp
      setShowOtpVerification(false);
      setOtp(["", "", "", "", "", ""]);
      router.push("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "OTP verification failed");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const next = [...otp];
      next[index] = value;
      setOtp(next);
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSignup = async () => {
    // The current flow focuses on email OTP login.
    // If signup is needed later, you can wire it similarly via useAuth().
    setError("Signup flow is not configured on this page.");
  };

  const handleResendOtp = async () => {
    try {
      setError(null);
      await sendOtp(emailAddress);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        <LoginSignup
          authMode={authMode}
          setAuthMode={setAuthMode}
          emailAddress={emailAddress}
          setEmailAddress={setEmailAddress}
          showOtpVerification={showOtpVerification}
          setShowOtpVerification={setShowOtpVerification}
          otp={otp}
          setOtp={setOtp}
          signupData={signupData}
          setSignupData={setSignupData}
          handleEmailLogin={handleEmailLogin}
          handleOtpVerification={handleOtpVerification}
          handleOtpChange={handleOtpChange}
          handleSignup={handleSignup}
          handleResendOtp={handleResendOtp}
        />
        {isLoading && (
          <div className="mt-4 text-center text-sm text-gray-500">Processing...</div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
