"use server"
import { cookies } from "next/headers";

export async function sendOtp(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString() || "";

  // validation ...
  const res = await fetch(`http://localhost:7000/v1/login/`, {
    
  // const res = await fetch(`${process.env.BACKEND_URL}/auth/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    cache: "no-store",
  });

  const data = await res.json();
console.log(data)
  // if (data?.token && data?.userId) {
  //   // ❌ Wrong: const cookieStore = await cookies();  (cookies is not async)
  //   // ✅ Correct:
  //   const cookieStore = cookies();

  //   cookieStore.set("auth_token", data.token, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === "production",
  //     path: "/",
  //     maxAge: 60 * 60 * 24 * 7,
  //   });

  //   cookieStore.set("user_id", data.userId, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === "production",
  //     path: "/",
  //     maxAge: 60 * 60 * 24 * 7,
  //   });
  // }
  const data_ = {
    token: "mocked_token_123456",
    userId: "user_" + email,
  };

  // Store in cookies
  const cookieStore = cookies();
  cookieStore.set("auth_token", data_.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  cookieStore.set("user_id", data_.userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { success: true, message: "OTP sent successfully" };
}
