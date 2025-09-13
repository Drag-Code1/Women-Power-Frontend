"use client";
 
import React from "react";
import {
  Close,
  ShoppingCartOutlined,
  Add,
  Remove,
  Delete,
} from "@mui/icons-material";
 
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
 
interface CartDrawerProps {
  isCartOpen: boolean;
  toggleCart: () => void;
  cartItems: CartItem[];
  updateQuantity: (id: number, change: number) => void;
  removeItem: (id: number) => void;
  getTotalPrice: () => number;
}
 
const CartDrawer: React.FC<CartDrawerProps> = ({
  isCartOpen,
  toggleCart,
  cartItems,
  updateQuantity,
  removeItem,
  getTotalPrice,
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 backdrop-blur-sm bg-black/20 z-40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleCart}
      />
 
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Close className="w-6 h-6 text-gray-600" />
            </button>
          </div>
 
          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingCartOutlined className="w-16 h-16 mb-4" />
                <p className="text-lg">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-gray-500">IMG</span>
                    </div>
 
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">₹{item.price}</p>
                    </div>
 
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Remove className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Add className="w-4 h-4" />
                      </button>
                    </div>
 
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Delete className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
 
          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span>₹{getTotalPrice()}</span>
              </div>
              <button className="w-full bg-[#61503c] text-white py-3 rounded-lg hover:bg-[#61503c]/90 transition-colors">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
 
export default CartDrawer;