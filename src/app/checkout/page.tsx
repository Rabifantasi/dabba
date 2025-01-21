"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CartItem {
  name: string;
  price: number;
}

const ShipmentPage: React.FC = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shipmentDetails, setShipmentDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    courier: "TCS",
    paymentMethod: "COD",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Define courier and payment method options
  const couriers = ["TCS", "Leopard Courier", "BlueEX", "M&P"];
  const paymentMethods = ["Cash on Delivery (COD)", "Credit/Debit Card", "Bank Transfer"];

  useEffect(() => {
    // Check if window is defined to access localStorage
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart) as CartItem[];
        setCartItems(parsedCart);
        setTotalAmount(parsedCart.reduce((total, item) => total + item.price, 0));
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShipmentDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    if (!shipmentDetails.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!shipmentDetails.address.trim()) newErrors.address = "Address is required.";
    if (!shipmentDetails.city.trim()) newErrors.city = "City is required.";
    if (!/^\d{4,6}$/.test(shipmentDetails.postalCode)) newErrors.postalCode = "Invalid postal code.";
    if (!/^\d{10,12}$/.test(shipmentDetails.phone)) newErrors.phone = "Invalid phone number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmShipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      alert("Shipment details confirmed! Redirecting to order summary...");
      // Store shipment details in localStorage if window is defined
      if (typeof window !== 'undefined') {
        localStorage.setItem("shipmentDetails", JSON.stringify(shipmentDetails));
      }
      router.push("/order-summary");
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-12 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Shipment Details</h1>

      {/* Cart Items Display */}
      <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
      {cartItems.length > 0 ? (
        <ul className="mb-6">
          {cartItems.map((item, index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span>{item.name}</span>
              <span>{item.price.toFixed(2)} PKR</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}

      {/* Total Amount Display */}
      {cartItems.length > 0 && (
        <div className="flex justify-between font-semibold text-lg mb-4">
          <span>Total Amount:</span>
          <span>{totalAmount.toFixed(2)} PKR</span>
        </div>
      )}

      <form onSubmit={handleConfirmShipment} className="grid gap-4 md:gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm md:text-base text-gray-700 font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={shipmentDetails.fullName}
            onChange={handleInputChange}
            className={`w-full border rounded p-2 mt-1 text-sm md:text-base ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-red-500 text-xs md:text-sm">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm md:text-base text-gray-700 font-medium">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={shipmentDetails.address}
            onChange={handleInputChange}
            className={`w-full border rounded p-2 mt-1 text-sm md:text-base ${errors.address ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your address"
          />
          {errors.address && <p className="text-red-500 text-xs md:text-sm">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm md:text-base text-gray-700 font-medium">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={shipmentDetails.city}
              onChange={handleInputChange}
              className={`w-full border rounded p-2 mt-1 text-sm md:text-base ${errors.city ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter your city"
            />
            {errors.city && <p className="text-red-500 text-xs md:text-sm">{errors.city}</p>}
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm md:text-base text-gray-700 font-medium">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={shipmentDetails.postalCode}
              onChange={handleInputChange}
              className={`w-full border rounded p-2 mt-1 text-sm md:text-base ${errors.postalCode ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter postal code"
            />
            {errors.postalCode && <p className="text-red-500 text-xs md:text-sm">{errors.postalCode}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm md:text-base text-gray-700 font-medium">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={shipmentDetails.phone}
            onChange={handleInputChange}
            className={`w-full border rounded p-2 mt-1 text-sm md:text-base ${errors.phone ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-500 text-xs md:text-sm">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="courier" className="block text-sm md:text-base text-gray-700 font-medium">
            Courier
          </label>
          <select
            id="courier"
            name="courier"
            value={shipmentDetails.courier}
            onChange={handleInputChange}
            className="w-full border rounded p-2 mt-1 text-sm md:text-base"
          >
            {couriers.map((courier) => (
              <option key={courier} value={courier}>{courier}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-sm md:text-base text-gray-700 font-medium">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={shipmentDetails.paymentMethod}
            onChange={handleInputChange}
            className="w-full border rounded p-2 mt-1 text-sm md:text-base"
          >
            {paymentMethods.map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>

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
