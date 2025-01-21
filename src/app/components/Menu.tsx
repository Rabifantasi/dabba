'use client'; // Ensure this component runs on the client side
import React, { useState } from 'react';
import Link from 'next/link';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative">
      {/* Hamburger Button */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
        <button onClick={toggleMenu} className="text-black focus:outline-none">
          {isOpen ? (
            <span className="block w-6 h-1 bg-black mb-1 transform rotate-45 transition-all duration-300"></span>
          ) : (
            <span className="block w-6 h-1 bg-black mb-1 transition-all duration-300"></span>
          )}
          <span className="block w-6 h-1 bg-black mb-1 transition-all duration-300"></span>
          <span className="block w-6 h-1 bg-black transition-all duration-300"></span>
        </button>
      </div>

      {/* Menu Links */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:block w-full max-w-lg md:max-w-xl lg:max-w-2xl p-4 bg-white rounded-lg shadow-md mt-2`} // Increased max-width classes
      >
        <ul className="flex flex-col space-y-2">
          <li>
            <Link
              href="/"
              className="text-black bg-yellow-300 hover:bg-yellow-400 px-4 py-2 rounded transition duration-300 block w-200 text-left"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="text-black bg-green-300 hover:bg-green-400 px-4 py-2 rounded transition duration-300 block w-full text-left"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-black bg-blue-300 hover:bg-blue-400 px-4 py-2 rounded transition duration-300 block w-full text-left"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-black bg-purple-300 hover:bg-purple-400 px-4 py-2 rounded transition duration-300 block w-full text-left"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/faq"
              className="text-black bg-red-300 hover:bg-red-400 px-4 py-2 rounded transition duration-300 block w-full text-left"
            >
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
