import Link from "next/link";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Image from "next/image";

interface NavigationLink {
  label: string;
}

interface HeaderData {
  siteTitle: string;
  promotionalMessage: string;
  navigationLinks: NavigationLink[];
}

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchHeaderData = async () => {
      const query = `*[_type == "header"][0]{
        siteTitle,
        promotionalMessage,
        navigationLinks[] {
          label
        }
      }`;
      const data: HeaderData = await client.fetch(query);
      setHeaderData(data);
    };

    fetchHeaderData();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm) {
      window.location.href = `/search?query=${encodeURIComponent(searchTerm)}`;
    }
  };

  if (!headerData) {
    return null;
  }

  return (
    <header className="bg-red-600 text-white">
      {/* Top Header */}
      <div className="py-1 bg-red-700">
        <div className="container mx-auto flex justify-center items-center">
          <p className="text-xs">{headerData.promotionalMessage}</p>
        </div>
      </div>
      {/* Main Header */}
      <div className="container mx-auto flex justify-between items-center py-5 px-4 md:px-8">
      {/* Logo and Site Title */}
        <div className="flex items-center space-x-3">
          <Image
            src="/Capture.PNG" // Replace with your image path
            alt="Dabbe Me Dabba"
            width={80}
            height={80}
            className="rounded-full shadow-lg"
          />
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "Dancing Script, cursive" }}
          >
            {headerData.siteTitle}
          </h1>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>

        {/* Navigation Links and Search Bar */}
        <div
          className={`flex flex-col md:flex-row md:items-center md:space-x-4 ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          <nav className="flex flex-col md:flex-row md:space-x-4">
            <Link href="/" passHref>
              <button className="hover:underline">Home</button>
            </Link>
            {headerData.navigationLinks
              .filter((link) => link.label.toLowerCase() !== "home")
              .map((link) => (
                <Link key={link.label} href={`/${link.label.toLowerCase()}`} passHref>
                  <button className="hover:underline">{link.label}</button>
                </Link>
              ))}
          </nav>
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex mt-2 md:mt-0">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
              className="p-1 rounded-l bg-white text-black"
            />
            <button type="submit" className="p-1 bg-yellow-400 text-black rounded-r">
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
