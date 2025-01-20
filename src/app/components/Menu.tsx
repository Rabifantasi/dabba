'use client'; // Ensure this component runs on the client side
import React from 'react';
import Link from 'next/link';

const Menu = () => {
  return (
    <nav className="w-60 p-4 bg-white rounded-lg shadow-md h-[3400px] mt-10">
      
      <ul className="flex flex-col space-y-2">
        <li>
          <Link href="/" className="text-black bg-yellow-300 hover:bg-yellow-400 px-4 py-2 rounded transition duration-300 block w-full text-left">
            Home
          </Link>
        </li>
        <li>
          <Link href="/products" className="text-black bg-green-300 hover:bg-green-400 px-4 py-2 rounded transition duration-300 block w-full text-left">
            Products
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-black bg-blue-300 hover:bg-blue-400 px-4 py-2 rounded transition duration-300 block w-full text-left">
            About Us
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-black bg-purple-300 hover:bg-purple-400 px-4 py-2 rounded transition duration-300 block w-full text-left">
            Contact
          </Link>
        </li>
        <li>
          <Link href="/faq" className="text-black bg-red-300 hover:bg-red-400 px-4 py-2 rounded transition duration-300 block w-full text-left">
            FAQ
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
