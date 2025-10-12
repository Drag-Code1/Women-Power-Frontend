"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { addToCartApi, getCartItemsApi, updateCartItemApi, removeFromCartApi, CartItem } from "../lib/cartApi";
import { getCurrentUser, getCurrentToken } from "../lib/authenticatedApi";

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateCartItem: (cartItemId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
  getCartItemCount: () => number;
  isInCart: (productId: string) => boolean;
  getCartItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { user, token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart items when user changes
  useEffect(() => {
    const fetchCartItems = async () => {
      const currentUser = user || getCurrentUser();
      const currentToken = token || getCurrentToken();

      if (!currentUser || !currentToken) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const items = await getCartItemsApi(currentUser.id, currentToken);
        setCartItems(items);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch cart items";

        // Handle specific error cases
        if (errorMessage.includes("Forbidden") || errorMessage.includes("Access denied")) {
          setError(null);
        } else {
          setError(errorMessage);
        }

        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user, token]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    const currentUser = user || getCurrentUser();
    const currentToken = token || getCurrentToken();

    if (!currentUser || !currentToken) {
      throw new Error("Please login to add items to cart");
    }

    try {
      setError(null);
      const cartData = {
        userId: currentUser.id,
        productId,
        quantity,
      };

      await addToCartApi(cartData, currentToken);

      // Refresh cart items from API to get updated data
      await refreshCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
      throw err;
    }
  };

  const updateCartItem = async (cartItemId: string, quantity: number) => {
    const currentToken = token || getCurrentToken();

    if (!currentToken) {
      throw new Error("Please login to update cart");
    }

    try {
      setError(null);
      await updateCartItemApi(cartItemId, quantity, currentToken);

      // Refresh cart items from API to get updated data
      await refreshCart();
    } catch (err) {
      console.error("Error updating cart item:", err);
      throw err;
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    const currentToken = token || getCurrentToken();

    if (!currentToken) {
      throw new Error("Please login to remove items from cart");
    }

    try {
      setError(null);
      await removeFromCartApi(cartItemId, currentToken);

      // Refresh cart items from API to get updated data
      await refreshCart();
    } catch (err) {
      console.error("Error removing from cart:", err);
      throw err;
    }
  };

  const refreshCart = async () => {
    const currentUser = user || getCurrentUser();
    const currentToken = token || getCurrentToken();

    if (!currentUser || !currentToken) {
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const items = await getCartItemsApi(currentUser.id, currentToken);
      setCartItems(items);
    } catch (err) {
      console.error("Error refreshing cart:", err);
      setError(err instanceof Error ? err.message : "Failed to refresh cart");
    } finally {
      setLoading(false);
    }
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const isInCart = (productId: string) => {
    return cartItems.some((item) => item.productId === productId);
  };

  const getCartItemQuantity = (productId: string) => {
    const item = cartItems.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const value: CartContextType = {
    cartItems,
    loading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
    refreshCart,
    getCartItemCount,
    isInCart,
    getCartItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

