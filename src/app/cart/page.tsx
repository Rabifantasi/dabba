"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Define a type for the cart item
interface CartItem {
  _id: string;
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
      setIsLoading(false);
    }
  }, []);

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  const handleProceedToShipment = () => {
    router.push("/checkout");
  };

  const handleRemoveFromCart = (index: number) => {
    const updatedCart = cartItems.filter((_, idx) => idx !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map((item, index) => (
          <div
            key={item._id}
            className="flex items-center border p-4 rounded-lg shadow-md transition hover:shadow-lg"
          >
            <Image
              src={item.image.asset.url}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
              height={64}
              width={64}
            />
            <div className="flex flex-col ml-4">
              <h2 className="font-semibold text-gray-800">{item.name}</h2>
              <p className="text-green-600 font-medium">PKR {item.price}</p>
            </div>
            <button
              onClick={() => handleRemoveFromCart(index)}
              className="ml-auto bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-lg sm:text-xl font-bold text-right">
        Total Amount: PKR {totalAmount}
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={handleProceedToShipment}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition"
        >
          Proceed to Shipment
        </button>
      </div>
    </div>
  );
};

export default CartPage;
