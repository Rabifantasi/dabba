"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  name: string;
  price: number;
}

const ShipmentPage: React.FC = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart) as CartItem[];
        setCartItems(parsedCart);
        const total = parsedCart.reduce((total, item) => total + item.price, 0);
        setTotalAmount(total);
      }
    }
  }, [isClient]);

  const handleConfirmShipment = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Shipment details confirmed! Redirecting to order summary...");
    router.push("/order-summary");
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="p-4 md:p-6 lg:p-12 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Shipment Details</h1>

      <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
      {cartItems.length > 0 ? (
        <ul className="mb-6">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between border-b py-2">
              <span>{item.name}</span>
              <span>{item.price.toFixed(2)} PKR</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}

      {cartItems.length > 0 && (
        <div className="flex justify-between font-semibold text-lg mb-4">
          <span>Total Amount:</span>
          <span>{totalAmount.toFixed(2)} PKR</span>
        </div>
      )}

      <form onSubmit={handleConfirmShipment} className="grid gap-4 md:gap-6">
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded mt-4 hover:bg-green-700 transition"
        >
          Confirm Shipment
        </button>
      </form>
    </div>
  );
};

export default ShipmentPage;
