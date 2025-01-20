"use client"; // Make sure this is at the very top

import React from "react";
import { useSearchParams } from "next/navigation"; // Use 'next/navigation' to get search parameters

const OrderConfirmationPage: React.FC = () => {
  const searchParams = useSearchParams(); // Use useSearchParams to get URL parameters

  // Get the parameters from searchParams
  const orderId = searchParams.get("orderId") || "Unknown Order ID"; // Fallback value
  const totalAmount = searchParams.get("totalAmount") || "0"; // Fallback value
  const items = searchParams.get("items") ? JSON.parse(searchParams.get("items") as string) : [];

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Order Confirmation</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Thank you for your order!</h2>
        <p className="text-gray-700 mb-4">
          Your order has been successfully placed. Below are the details:
        </p>

        <div className="mb-4">
          <h3 className="text-lg font-bold">Order ID: {orderId}</h3>
          <p className="text-gray-600">Total Amount: PKR {totalAmount}</p>
        </div>

        <h3 className="text-lg font-bold mb-2">Ordered Items:</h3>
        <ul className="list-disc list-inside mb-4">
          {items.map((item: any) => (
            <li key={item.id}>
              {item.name} - PKR {item.price}
            </li>
          ))}
        </ul>

        <p className="text-gray-700 mb-4">
          A confirmation email has been sent to your registered email address.
        </p>
        <p className="text-gray-700 mb-4">
          If you have any questions, feel free to contact our support team.
        </p>

        <button
          onClick={() => window.location.href = "/"} // Change to window.location.href for redirect
          className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
