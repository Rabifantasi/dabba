"use client";

import React, { useState, useEffect } from "react";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Image from "next/image"; // Import Next.js Image component

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
    // Simulate a loading delay (e.g., for fetching resources or loading fonts)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the duration as needed

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {isLoading ? (
          // Loading Animation Section
          <div className="fixed inset-0 bg-red-500 bg-opacity-80 flex items-center justify-center z-50">
            <div className="flex space-x-4">
              <Image
                src="/gf3.png"
                alt="gf1"
                width={150}
                height={150}
                className="animate-dance"
              />
              <Image
                src="/gb2.png"
                alt="gf2"
                width={150}
                height={150}
                className="animate-dance delay-150"
              />
              <Image
                src="/gb1.png"
                alt="Gift 3"
                width={150}
                height={150}
                className="animate-dance delay-300"
              />
            </div>
          </div>
        ) : (
          // Main Layout Content
          <>
            <Header />
            <main>{children}</main>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
