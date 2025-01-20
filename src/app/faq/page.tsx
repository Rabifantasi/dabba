"use client"; // Make sure this is at the very top

import React from "react";

const FAQs: React.FC = () => {
  const faqList = [
    {
      question: "What types of products do you offer?",
      answer:
        "We offer a variety of customizable gift boxes, surprise boxes, and personalized gifts suitable for any occasion.",
    },
    {
      question: "How can I place an order?",
      answer:
        "You can browse our products and add them to your cart. Once you're ready, proceed to checkout to complete your order.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods, including credit/debit cards, PayPal, and other secure payment gateways.",
    },
    {
      question: "Can I customize my gift box?",
      answer:
        "Yes! We offer customization options for our gift boxes, allowing you to choose items that best fit the recipient's preferences.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping times may vary based on your location. Typically, orders are processed within 1-3 business days and delivered within 5-7 business days.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We strive for customer satisfaction. If you're not happy with your order, please contact us within 30 days for assistance with returns or exchanges.",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions (FAQ)</h1>
      <div className="space-y-4">
        {faqList.map((faq, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">{faq.question}</h2>
            <p className="text-gray-700 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
