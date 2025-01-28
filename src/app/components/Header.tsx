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
    <header className="bg-red-600 text-white relative">
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
            src="/Capture.PNG"
            alt="Dabbe Me Dabba"
            width={50}
            height={50}
            className="rounded-full shadow-lg"
          />
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-bold whitespace-nowrap"
            style={{ fontFamily: "Dancing Script, cursive" }}
          >
            {headerData.siteTitle}
          </h1>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="text-white focus:outline-none"
          >
            {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4 items-center">
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
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
              className="p-2 rounded-l bg-white text-black"
            />
            <button
              type="submit"
              className="p-2 bg-yellow-400 text-black rounded-r"
            >
              Search
            </button>
          </form>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } absolute top-0 left-0 w-full h-screen bg-red-600 transition-transform duration-300 ease-in-out z-20 md:hidden`}
      >
        <div className="p-5 flex justify-end">
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close Menu"
            className="text-white"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>
        <nav className="flex flex-col items-center space-y-4 mt-10">
          <Link href="/" passHref>
            <button className="hover:underline text-xl">Home</button>
          </Link>
          {headerData.navigationLinks
            .filter((link) => link.label.toLowerCase() !== "home")
            .map((link) => (
              <Link key={link.label} href={`/${link.label.toLowerCase()}`} passHref>
                <button className="hover:underline text-xl">{link.label}</button>
              </Link>
            ))}
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col items-center space-y-2"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
              className="p-2 rounded bg-white text-black w-3/4"
            />
            <button
              type="submit"
              className="p-2 bg-yellow-400 text-black rounded"
            >
              Search
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
};

export default Header;
