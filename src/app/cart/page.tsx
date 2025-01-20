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
    return <div>Loading...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
        <p className="mt-4 text-gray-500">Browse products and add them to your cart!</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cartItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between border-b pb-4 mb-4">
            <div className="flex items-center">
              <Image
                src={item.image.asset.url}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
                width={64}
                height={64}
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-green-600">PKR {item.price}</p>
              </div>
            </div>
            <button
              className="text-red-600 hover:text-red-800"
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

      <div className="flex justify-between items-center mt-6 border-t pt-4">
        <h2 className="text-xl font-bold">Total Amount: PKR {totalAmount}</h2>
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
