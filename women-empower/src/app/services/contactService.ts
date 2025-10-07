"use server";

export async function contactAction(prevState: any, formData: FormData) {
  const firstName = formData.get("firstName")?.toString().trim();
  const lastName = formData.get("lastName")?.toString().trim();
  const mobile = formData.get("mobile")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  // ✅ Validation
  if (!firstName || !lastName || !mobile || !email || !message) {
    return { success: false, message: "All fields are required." };
  }

  if (!/^[0-9]{10}$/.test(mobile)) {
    return { success: false, message: "Please enter a valid 10-digit mobile number." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Invalid email address." };
  }

  // ✅ Data to be sent to external API
  const payload = {
    first_name: firstName,
    last_name: lastName,
    mobileNo: mobile,
    mail: email,
    msg: message,
  };

  console.log("📩 New Contact Submission:", payload);

  try {
    // ✅ Example POST API call (replace with your backend API endpoint)
    const res = await fetch("http://localhost:7000/v1/contact-details/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store", // optional: ensure fresh call
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ API Error:", errorText);
      return { success: false, message: "Failed to send data to server." };
    }

    const data = await res.json();
    console.log("✅ API Response:", data);

    return { success: true, message: "Your message has been sent successfully!" };
  } catch (error: any) {
    console.error("🚨 Error posting contact data:", error);
    return { success: false, message: "An error occurred while submitting the form." };
  }
}
