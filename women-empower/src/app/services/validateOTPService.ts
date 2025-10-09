"use client";

export async function validateOTP(email: string, otp: number) {
  const res = await fetch("/api/validate-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error || "OTP verification failed");
    return;
  }

  alert("OTP verified successfully!");
}
