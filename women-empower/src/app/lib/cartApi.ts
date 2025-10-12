// Cart API functions
import { getAuthenticatedHeaders, getCurrentToken } from './authenticatedApi';

export interface CartItem {
  id: string;
  cartId?: string;
  productId: string;
  quantity: number;
  product?: {
    id: string;
    p_Name: string;
    thumbnail: string;
    price: string;
    discount: number;
  };
}

export interface AddToCartRequest {
  userId: string;
  productId: string;
  quantity: number;
}

export interface AddToCartResponse {
  success: boolean;
  message: string;
  data: CartItem;
}

// Add item to cart
export const addToCartApi = async (cartData: AddToCartRequest, token?: string) => {
  // Get token from localStorage if not provided
  const authToken = token || getCurrentToken();
  
  if (!authToken) {
    throw new Error('Authorization token missing');
  }
  
  // Debug: Log the token and cart data being used
  console.log('🔑 Token being used for cart API call:', authToken);
  console.log('🛒 Cart data:', cartData);
  
  const res = await fetch('http://localhost:5000/v1/cart/', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(cartData),
  });
  
  const contentType = res.headers.get('content-type') || '';
  let parsed: any = null;
  try {
    parsed = contentType.includes('application/json') ? await res.json() : { message: await res.text() };
  } catch {
    parsed = {};
  }
  
  if (!res.ok) {
    const msg = parsed?.message || parsed?.error || `Failed to add item to cart (status ${res.status})`;
    const error = new Error(msg);
    // @ts-ignore
    (error as any).details = parsed;
    throw error;
  }
  
  // Debug: Log the API response
  console.log('🛒 Add to Cart API Response:', parsed);
  
  return parsed as AddToCartResponse;
};

// Get cart items for a user
export const getCartItemsApi = async (userId: string, token?: string) => {
  // Get token from localStorage if not provided
  const authToken = token || getCurrentToken();
  
  if (!authToken) {
    throw new Error('Authorization token missing');
  }
  
  const res = await fetch(`http://localhost:5000/v1/cart/${userId}`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    cache: 'no-store'
  });
  
  const contentType = res.headers.get('content-type') || '';
  let parsed: any = null;
  try {
    parsed = contentType.includes('application/json') ? await res.json() : { message: await res.text() };
  } catch {
    parsed = {};
  }
  
  if (!res.ok) {
    const msg = parsed?.message || parsed?.error || `Failed to fetch cart items (status ${res.status})`;
    const error = new Error(msg);
    // @ts-ignore
    (error as any).details = parsed;
    throw error;
  }
  
  // Debug: Log the API response
  console.log('🛒 Get Cart Items API Response:', parsed);
  
  return parsed.data || [];
};

// Update cart item quantity
export const updateCartItemApi = async (cartItemId: string, quantity: number, token?: string) => {
  // Get token from localStorage if not provided
  const authToken = token || getCurrentToken();
  
  if (!authToken) {
    throw new Error('Authorization token missing');
  }
  
  const res = await fetch(`http://localhost:5000/v1/cart/${cartItemId}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({ quantity }),
  });
  
  const contentType = res.headers.get('content-type') || '';
  let parsed: any = null;
  try {
    parsed = contentType.includes('application/json') ? await res.json() : { message: await res.text() };
  } catch {
    parsed = {};
  }
  
  if (!res.ok) {
    const msg = parsed?.message || parsed?.error || `Failed to update cart item (status ${res.status})`;
    const error = new Error(msg);
    // @ts-ignore
    (error as any).details = parsed;
    throw error;
  }
  
  return parsed.data || parsed;
};

// Remove item from cart
export const removeFromCartApi = async (cartItemId: string, token?: string) => {
  // Get token from localStorage if not provided
  const authToken = token || getCurrentToken();
  
  if (!authToken) {
    throw new Error('Authorization token missing');
  }
  
  const res = await fetch(`http://localhost:5000/v1/cart/${cartItemId}`, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
  });
  
  const contentType = res.headers.get('content-type') || '';
  let parsed: any = null;
  try {
    parsed = contentType.includes('application/json') ? await res.json() : { message: await res.text() };
  } catch {
    parsed = {};
  }
  
  if (!res.ok) {
    const msg = parsed?.message || parsed?.error || `Failed to remove cart item (status ${res.status})`;
    const error = new Error(msg);
    // @ts-ignore
    (error as any).details = parsed;
    throw error;
  }
  
  return parsed.data || parsed;
};
