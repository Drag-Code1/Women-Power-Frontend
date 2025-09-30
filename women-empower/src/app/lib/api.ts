
export const fetchArtists = async () => {
  const res = await fetch('http://localhost:5000/api/artist', { cache: 'no-store' });
  const data = await res.json();
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