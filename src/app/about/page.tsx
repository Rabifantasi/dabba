"use client"; // Make sure this is at the very top

import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 md:p-10 lg:p-12 xl:p-16 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
        About Us
      </h1>
      <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-6 text-center px-4 sm:px-6">
        Welcome to <strong>Dabbe Me Dabba</strong>! We are dedicated to providing unique and customizable gift boxes that add joy and excitement to every occasion. Our mission is to help you create unforgettable moments with thoughtful gifts that express your love and appreciation.
      </p>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-center">
        Our Mission
      </h2>
      <p className="text-gray-700 mb-6 text-center px-4 sm:px-6">
        At Dabbe Me Dabba, we believe that every gift should tell a story. Our carefully curated selection of surprise boxes and customizable gift items allows you to find the perfect present for anyone, regardless of age or preference. We aim to make gifting easy, enjoyable, and memorable.
      </p>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-center">
        Our Values
      </h2>
      <ul className="list-disc list-inside mb-6 px-4 sm:px-6 text-left">
        <li className="text-gray-700">✨ Customer Satisfaction: We prioritize our customers needs and strive to exceed their expectations.</li>
        <li className="text-gray-700">🎁 Creativity: We embrace creativity in our products and services to deliver unique gifting experiences.</li>
        <li className="text-gray-700">🌍 Sustainability: We are committed to sustainable practices and use eco-friendly materials whenever possible.</li>
      </ul>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-center">
        Get in Touch
      </h2>
      <p className="text-gray-700 mb-6 text-center px-4 sm:px-6">
        We love hearing from our customers! If you have any questions, feedback, or special requests, feel free to <strong>contact us</strong>. We are here to help you make your gifting experience as delightful as possible.
      </p>

      <div className="mt-8 text-center">
        <h2 className="text-lg sm:text-xl font-bold mb-2">Follow Us:</h2>
        <p className="text-gray-700">Stay connected with us on social media for the latest updates and special offers!</p>
        <p className="text-blue-500">Instagram | Facebook | Twitter</p>
      </div>
    </div>
  );
};

export default AboutPage;
