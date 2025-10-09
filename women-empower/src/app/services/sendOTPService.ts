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


  return { success: true, message: "OTP sent successfully" };
}

// export const validateOTP = async (email: string, otp: number) => {
//   console.log(email,otp)
//   const body={
//         email:email,
//         otp: otp
// }
// console.log(body,'body')
//   try {
//     const response = await fetch("http://localhost:7000/v1/login/otp", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({body}),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to verify OTP");
//       return;
//     }
//      const data = await response.json();
     

//     console.log("✅ OTP Verified:", data);
//     if(response.ok){

//     console.log("✅ OTP Verified:", data);

//       const cookieStore = cookies();
//         const data_ = {
//     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
//     userId: "user_" + email,
//   };
//   cookieStore.set("auth_token", data_.token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     path: "/",
//     maxAge: 60 * 60 * 24 * 7, // 7 days
//   });
//   cookieStore.set("user_id", data_.userId, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     path: "/",
//     maxAge: 60 * 60 * 24 * 7,
//   });
//     cookieStore.set("loggedIn",true, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     path: "/",
//     maxAge: 60 * 60 * 24 * 7,
//   });
//     alert("OTP verified successfully!");
//     return data;

//     }

   
//   } catch (error: any) {
//     console.error("❌ Error verifying OTP:", error);
//     // alert(error?.message || "Failed to verify OTP");
//   }
// };



// export async function validateOTP(email: string, otp: number) {
//   const res = await fetch("/api/validate-otp", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, otp }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     alert(data.error || "OTP verification failed");
//     return;
//   }

//   alert("OTP verified successfully!");
// }