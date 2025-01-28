"use client";

import React, { useState, useEffect } from "react";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Image from "next/image";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust duration as needed

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {isLoading ? (
          // Responsive Loading Animation
          <div className="fixed inset-0 bg-red-700 bg-opacity-80 flex items-center justify-center z-50">
            <div className="flex flex-wrap justify-center gap-4">
              <Image
                src="/gf3.PNG"
                alt="Loading animation 1"
                width={100}
                height={100}
                className="animate-dance sm:w-36 sm:h-36"
              />
              <Image
                src="/gb2.PNG"
                alt="Loading animation 2"
                width={100}
                height={100}
                className="animate-dance delay-150 sm:w-36 sm:h-36"
              />
              <Image
                src="/gb1.PNG"
                alt="Loading animation 3"
                width={100}
                height={100}
                className="animate-dance delay-300 sm:w-36 sm:h-36"
              />
            </div>
          </div>
        ) : (
          // Responsive Main Layout
          <>
            <Header />
            <main className="min-h-screen px-4 sm:px-8 lg:px-16">{children}</main>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
