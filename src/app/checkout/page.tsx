"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface CartItem {
  name: string;
  price: number;
}

const ShipmentPage: React.FC = () => {
  const router = useRouter();
  const [cartItems] = useState<CartItem[]>(JSON.parse(localStorage.getItem("cart") || "[]"));
  const [totalAmount] = useState(
    cartItems.reduce((total, item) => total + item.price, 0)
  );

  // Shipment details state
  const [shipmentDetails, setShipmentDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    courier: "TCS",
    paymentMethod: "COD",
  });

  // Courier options
  const couriers = ["TCS", "Leopard Courier", "BlueEX", "M&P"];

  // Payment methods
  const paymentMethods = ["Cash on Delivery (COD)", "Credit/Debit Card", "Bank Transfer"];

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShipmentDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleConfirmShipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      shipmentDetails.fullName &&
      shipmentDetails.address &&
      shipmentDetails.city &&
      shipmentDetails.phone
    ) {
      alert("Shipment details confirmed! Redirecting to order summary...");
      router.push("/order-summary"); // Replace with your order summary page route
    } else {
      alert("Please fill all required fields!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Shipment Details</h1>

      <form onSubmit={handleConfirmShipment} className="grid gap-6">
        {/* User Details */}
        <div>
          <label htmlFor="fullName" className="block text-gray-700 font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={shipmentDetails.fullName}
            onChange={handleInputChange}
            required
            className="w-full border rounded p-2 mt-1"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-gray-700 font-medium">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={shipmentDetails.address}
            onChange={handleInputChange}
            required
            className="w-full border rounded p-2 mt-1"
            placeholder="Enter your address"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-gray-700 font-medium">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={shipmentDetails.city}
              onChange={handleInputChange}
              required
              className="w-full border rounded p-2 mt-1"
              placeholder="Enter your city"
            />
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-gray-700 font-medium">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={shipmentDetails.postalCode}
              onChange={handleInputChange}
              required
              className="w-full border rounded p-2 mt-1"
              placeholder="Enter postal code"
            />
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="block text-gray-700 font-medium">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={shipmentDetails.phone}
            onChange={handleInputChange}
            required
            className="w-full border rounded p-2 mt-1"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Courier Service */}
        <div>
          <label htmlFor="courier" className="block text-gray-700 font-medium">
            Courier Service
          </label>
          <select
            id="courier"
            name="courier"
            value={shipmentDetails.courier}
            onChange={handleInputChange}
            className="w-full border rounded p-2 mt-1"
          >
            {couriers.map((courier) => (
              <option key={courier} value={courier}>
                {courier}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Method */}
        <div>
          <label htmlFor="paymentMethod" className="block text-gray-700 font-medium">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={shipmentDetails.paymentMethod}
            onChange={handleInputChange}
            className="w-full border rounded p-2 mt-1"
          >
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        {/* Cart Summary */}
        <div className="border-t pt-4">
          <h2 className="text-2xl font-semibold mb-2">Cart Summary</h2>
          <ul className="space-y-2">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{item.name}</span>
                <span>PKR {item.price}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-4 font-semibold">
            <span>Total Amount:</span>
            <span>PKR {totalAmount}</span>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Confirm Shipment
        </button>
      </form>
    </div>
  );
};

export default ShipmentPage;
