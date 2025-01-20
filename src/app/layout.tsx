// src/app/layout.tsx
"use client"

// src/app/layout.tsx
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { client } from '../sanity/lib/client'; // Adjust the import according to your project structure
import { groq } from 'next-sanity';
import Link from "next/link";

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

const productQuery = groq`*[_type == "product"] { _id, name, price, slug }`;
const blogQuery = groq`*[_type == "post"] { _id, title, slug }`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  interface ContentItem {
    _id: string;
    name?: string;
    price?: number;
    slug: { current: string } | string | null; // Allow slug to be null
    title?: string;
  }

  const [filteredResults, setFilteredResults] = useState<ContentItem[]>([]);
  const [allContent, setAllContent] = useState<ContentItem[]>([]);

  const fetchData = async () => {
    const products = await client.fetch(productQuery);
    const blogs = await client.fetch(blogQuery);
    setAllContent([...products, ...blogs]); // Combine products and blog posts
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredResults(allContent); // Reset if search term is empty
      return;
    }

    const filtered = allContent.filter((item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header onSearch={handleSearch} />
        <main>
          {children}
          {filteredResults.length > 0 && (
            <div className="my-4">
              <h2 className="text-2xl font-bold my-4">Search Results</h2>
              {filteredResults.map((item) => (
                <div key={item._id} className="mb-4">
                  {/* Check if slug is defined before trying to access it */}
                  <Link href={`/products/${typeof item.slug === 'string' ? item.slug : item.slug?.current}`}>
                    <h3 className="text-lg font-semibold">{item.name || item.title}</h3>
                  </Link>
                  {item.price && <p>PKR {item.price}</p>}
                </div>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </body>
    </html>
  );
}
