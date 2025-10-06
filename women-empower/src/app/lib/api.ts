
export const fetchArtists = async () => {
  const res = await fetch('http://localhost:7000/v1/artist/', { cache: 'no-store' });
  const data = await res.json();
  console.log(data,'artists')
  return data;
}

export const fetchFeaturedEvents = async () => {
  const res = await fetch('http://localhost:5000/api/featured-events', { cache: 'force-cache' });
  const data = await res.json();
  return data;
}

export const fetchEvents = async () => {
  console.log("Fetching events...");
  const res = await fetch('http://localhost:5000/api/events', { cache: 'force-cache' });
  const data = await res.json();
  return data;
}

export const fetchCartItems = async () => {
  
  try {
    const response = await fetch('http://localhost:5000/api/cart');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    } 
    const data = await response.json();
    return data; 
  }
  catch (error) {
    console.error('Error fetching cart items:', error);
    return []; 
  }
};

export const fetchWishListItems = async () => {
  
  try {
    const response = await fetch('http://localhost:5000/api/wishlist');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    } 
    const data = await response.json();
    return data; 
  }
  catch (error) {
    console.error('Error fetching cart items:', error);
    return []; 
  }
};

export const clearWishlist = async () => {
  
  try {
    const response = await fetch('http://localhost:5000/api/wishlist');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    } 
    const data = await response.json();
    return data; 
  }
  catch (error) {
    console.error('Error fetching cart items:', error);
    return []; 
  }
};

export const validateOTP = async (email: string, otp: string) => {
  console.log(email,otp)
  try {
    const response = await fetch("http://localhost:7000/v1/login/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    if (!response.ok) {
      throw new Error("Failed to verify OTP");
    }

    const data = await response.json();
    console.log("✅ OTP Verified:", data);
    alert("OTP verified successfully!");
    return data;
  } catch (error: any) {
    console.error("❌ Error verifying OTP:", error);
    alert(error?.message || "Failed to verify OTP");
  }
};


export const fetchCourses = async () => {
  
  try {
    const response = await fetch('http://localhost:7000/v1/course/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    } 
    const data = await response.json();
    console.log('ourses',data)
    return data; 
  }
  catch (error) {
    console.error('Error fetching courses', error);
    return []; 
  }
};


export const fetchUserDetails = async (userID:string) => {
  
  try {
    const response = await fetch(`http://localhost:7000/v1/user/${userID}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    } 
    const data = await response.json();
    console.log('ourses',data)
    return data; 
  }
  catch (error) {
    console.error('Error fetching courses', error);
    return []; 
  }
};
interface User {
  id: string;
  firstName: string;
    lastName: string;
  email: string;
  gender:string;
  mobileNo: string;
  role:string;
  avatar: string;
  // address: {
  //   street: string;
  //   city: string;
  //   state: string;
  //   pincode: string;
  // }| null;
  joining_date: string;
}

export const updateUser = async (userID:string,document:User) => {
  // console.log(email,otp)
  try {
    const response = await fetch(`http://localhost:7000/v1/user/${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(document),
    });

    if (!response.ok) {
      throw new Error("Failed to verify OTP");
    }

    const data = await response.json();
    console.log("✅ user updated", data);
   
    return data;
  } catch (error: any) {
   
  }
};

export const getAddress = async (userID:string) => {
  // console.log(email,otp)
  try {
    const response = await fetch(`http://localhost:7000/v1/address/${userID}`);

    if (!response.ok) {
      throw new Error("Failed addresss");
    }

    const data = await response.json();
    // console.log("✅ Address fetched", data);
   
    return data;
  } catch (error: any) {
   
  }
};


interface Address {
  // id:string;
  userId: string |null;
  type:string
  // name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  // phone: string;
  landmark:string;
  mobileNo:string;
  // isDefault: boolean;
}

export const addAddress = async (userID:string,document:Address) => {
  // console.log(email,otp)
  document.userId=userID
  try {
    const response = await fetch(`http://localhost:7000/v1/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(document),
    });

    if (!response.ok) {
      throw new Error("Failed addresss");
    }

    const data = await response.json();
    // console.log("✅ Address fetched", data);
   
    return data;
  } catch (error: any) {
   
  }
};




