"use client"; // Make sure this is at the very top

import React, { useState } from "react";

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would typically send the data to your backend or API
    console.log({ name, email, message });
    setSubmitted(true);

    // Reset the form after submission
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
        Contact Us
      </h1>

      {submitted ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xs sm:max-w-md text-center">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">
            Thank you for your message!
          </h2>
          <p className="text-gray-700">We will get back to you shortly.</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-md"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </form>
      )}

      <div className="mt-8 text-center max-w-xs sm:max-w-md">
        <h2 className="text-lg sm:text-xl font-bold mb-2">
          Other Ways to Contact Us:
        </h2>
        <p className="text-sm sm:text-base">Email: support@example.com</p>
        <p className="text-sm sm:text-base">Phone: +123 456 7890</p>
      </div>
    </div>
  );
};

export default ContactPage;
