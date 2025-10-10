
export const fetchArtists = async (pageno:string) => {
  const res = await fetch(`http://localhost:7000/v1/artist/?page=${pageno}`, { cache: 'no-store' });
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

  try {
    const res = await fetch('http://localhost:5000/api/events', { cache: 'force-cache' });
// http://localhost:7000/v1/event/
    if (!res.ok) {
      console.error(`❌ Failed to fetch events: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();

    // Validate data type (should be an array)
    if (!Array.isArray(data)) {
      console.error("❌ Invalid data format: Expected an array.");
      return [];
    }

    return data;
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    return [];
  }
};

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

export const validateOTP = async (email: string, otp: number) => {
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
export async function fetchFilteredArtists(
  categories: string[],
  min?: string,
  max?: string
) {
  const filters = {
    categories: categories,
    experience: {
      minExp: min||null,
      maxExp: max  || null
    },
  };

  console.log("🔹 Filters to send:", filters);

  try {
    const response = await fetch(
      `http://localhost:7000/v1/artist/filter`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
        cache: "no-store", // important for SSR to always fetch fresh
      }
    );

    if (!response.ok) {
      console.error("❌ Filter API failed:", response.status);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Filter API error:", error);
    return [];
  }
}


export async function fetchFilteredArts(
  categories: string[],
  min: string,
  max: string
) {
  const filters = {
    categories: categories,
    price: {
      minPrice: min||null ,
      maxPrice: max ||null
    },
  };
 

  console.log("🔹 Filters to send:", filters);

  try {
    const response = await fetch(
      `http://localhost:7000/v1/product/filter`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
        cache: "no-store", // important for SSR to always fetch fresh
      }
    );

    if (!response.ok) {
      console.error("❌ Filter API failed:", response.status);
      // return [];
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Filter API error:", error);
    // return [];
  }
}
export async function deleteAddress(addressId: string) {
  try {
    const response = await fetch(
      `http://localhost:7000/v1/address/${addressId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("❌ Failed to delete address:", response.status);
      return false;
    }

    console.log("✅ Address deleted successfully");
    return response.json();
  } catch (error) {
    console.error("❌ Error deleting address:", error);
    return false;
  }
}


export const getArtistReview = async (artistID: string) => {
  try {
    const response = await fetch(
      `http://localhost:7000/v1/artist-review/${artistID}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch artist reviews");
    }

    const data = await response.json();
    return data; // Expecting { reviews: Review[] }
  } catch (error: any) {
    console.error(error);
    return []; // fallback
  }
};



export async function fetchAddToCart(
  cart_id: string,
  id: string,
  pQt: number|null
) {
  const cartBody = {
    cartId:cart_id,
    productId:id,
    quantity:pQt||1
  };

  console.log("🔹 cart item to send:", cartBody);

  try {
    const response = await fetch(
      `http://localhost:7000/v1/cart/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartBody),
        cache: "no-store", // important for SSR to always fetch fresh
      }
    );

    if (!response.ok) {
      console.error("❌ Filter API failed:", response.status);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Filter API error:", error);
    return [];
  }
}
export async function fetchupdateCartItemQuantity(
  cart_item_id: string,
  quantity:number
) {
  const qtBody = {
    
    quantity:quantity
  };

  console.log("🔹 cart item to send:", qtBody);

  try {
    const response = await fetch(
      `
http://localhost:7000/v1/cart/${cart_item_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(qtBody),
        cache: "no-store", // important for SSR to always fetch fresh
      }
    );

    if (!response.ok) {
      console.error("❌ Filter API failed:", response.status);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Filter API error:", error);
    return [];
  }
}

export async function fetchDeleteCartItemQuantity(
  cart_item_id: string
) {




  try {
    const response = await fetch(
      `
http://localhost:7000/v1/cart/${cart_item_id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
       // important for SSR to always fetch fresh
      }
    );

    if (!response.ok) {
      console.error("❌ Filter API failed:", response.status);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Filter API error:", error);
    return [];
  }
}

export const fetchWishlist = async (userID: string) => {
  try {
    const response = await fetch(
      `http://localhost:7000/v1/wishlist/${userID}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch artist reviews");
    }

    const data = await response.json();
    return data; // Expecting { reviews: Review[] }
  } catch (error: any) {
    console.error(error);
    // return []; // fallback
  }
};

export async function addToWishList(
  user_id:string,
    product_id:string
) {
  const wishItemBody = {
    
    user_id:user_id,
    product_id:product_id
  };

  console.log("🔹 cart item to send:", wishItemBody);

  try {
    const response = await fetch(
      `http://localhost:7000/v1/wishlist`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wishItemBody),
        cache: "no-store", // important for SSR to always fetch fresh
      }
    );

    if (!response.ok) {
      console.error("❌ Filter API failed:", response.status);
      
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Filter API error:", error);
  
  }
}


export async function fetchRemoveWishItem(
  wishItemId: string
) {




  try {
    const response = await fetch(
      `
http://localhost:7000/v1/wishlist/${wishItemId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
       // important for SSR to always fetch fresh
      }
    );

    if (!response.ok) {
      console.error("❌ Filter API failed:", response.status);
      // return [];
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Filter API error:", error);
    // return [];
  }
}
interface updateAddress {

  id: string;
  type: string;         // e.g. "Home" | "Office"
  address: string;      // Full address text
  pincode: string;      // e.g. "411028"
  city: string;         // e.g. "Pune"
  state: string;        // e.g. "Maharashtra"
  landmark: string;     // e.g. "Near City Mall"
  mobileNo: string;     // e.g. "+917350206770"
  userId: string;       // Foreign key referencing user
}
export const updateAddress = async (document:updateAddress) => {
  const addressID = document.id;

  // Prepare only required fields for API payload
  const payload = {
    type: document.type,
    address: document.address,
    pincode: document.pincode,
    city: document.city,
    state: document.state,
    landmark: document.landmark,
    mobileNo: document.mobileNo,
    userId: document.userId,
  };


  try {
    const response = await fetch(`http://localhost:7000/v1/address/${addressID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed addresss");
    }

    const data = await response.json();
    // console.log("✅ Address fetched", data);
   
    return data;
  } catch (error: any) {
   return [];
  }
};
// 5ffda320-72dc-420f-8b30-1223f807c9aa


export async function getCategories() {
  try{ const res = await fetch(`http://localhost:7000/v1/category/`, {
    cache: "force-cache",
  })
   if(!res.ok){
throw  'error occured at getProducts';
   
  }
  return res.json()
}
catch(er){
console.log(er);
 return [];
}
}
export async function getProducts() {
try{  const res = await fetch(`http://localhost:7000/v1/product/?page=1`, {
    // cache: "no-",
  })
   if(!res.ok){
throw  'error occured at getProducts';
   
  }
  return res.json()
}
catch(er){
console.log(er);
 return [];
}
}

export async function getTrendingProducts() {
 try{ const res = await fetch(`http://localhost:7000/v1/product/?page=1`, {
    // cache: "force-cache",
  })
   if(!res.ok){
throw  'error occured at getTrendingProducts';
   
  }
  return res.json()
}
catch(er){
console.log(er);
 return [];
}
}

 
export async function getTopArtists() {
 
 try{ const res = await fetch(`http://localhost:5000/api/top-artist`, {
    cache: "force-cache",
  })

  if(!res.ok){
throw  'error occured at getTopArtists';
   
  }
  return res.json()
}
catch(er){
console.log(er);
 return [];
}
}
// async function getTrendingProducts() {
//   const res = await fetch(`http://localhost:5000/api/trending-products`, {
//     cache: "force-cache",
//   })
//   return res.json()
// }