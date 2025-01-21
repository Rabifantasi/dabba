"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Define a type for the cart item
interface CartItem {
  name: string;
  price: number;
  image: {
    asset: {
      url: string;
    };
  };
}

const CartPage: React.FC = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Use the CartItem type
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cart data from localStorage after the component mounts
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      setCartItems(savedCart ? JSON.parse(savedCart) : []); // Parse and set cart items
      setIsLoading(false); // Mark loading as false after data is loaded
    }
  }, []);

  // Calculate total amount
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  const handleProceedToShipment = () => {
    router.push("/shipment");
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Your Cart is Empty</h1>
        <p className="mt-4 text-gray-500 text-sm sm:text-base">
          Browse products and add them to your cart!
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold mb-6 text-center lg:text-left">
        Your Cart
      </h1>

      {/* Cart Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center justify-between border rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center">
              <Image
                src={item.image.asset.url}
                alt={item.name}
                className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded"
                width={80}
                height={80}
              />
              <div className="ml-4">
                <h2 className="text-base sm:text-lg font-semibold">{item.name}</h2>
                <p className="text-green-600 text-sm sm:text-base">PKR {item.price}</p>
              </div>
            </div>
            <button
              className="mt-4 sm:mt-0 text-red-600 hover:text-red-800 text-sm sm:text-base"
              onClick={() =>
                setCartItems((prevCart) =>
                  prevCart.filter((_, idx) => idx !== index)
                )
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total Amount & Proceed Button */}
      <div className="flex flex-col lg:flex-row justify-between items-center mt-8 border-t pt-4">
        <h2 className="text-lg sm:text-xl font-bold mb-4 lg:mb-0 text-center lg:text-left">
          Total Amount: PKR {totalAmount}
        </h2>
        <button
          onClick={handleProceedToShipment}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Proceed to Shipment
        </button>
      </div>
    </div>
  );
};

export default CartPage;
