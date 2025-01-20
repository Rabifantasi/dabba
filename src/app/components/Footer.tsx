import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client"; // Adjust the path to your configured Sanity client

interface FooterData {
  title: string;
  description: string;
  copyright: string;
  backgroundColor: string;
  textColor: string;
  padding: string;
}

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      const query = `*[_type == "footer"][0] {
        title,
        description,
        copyright,

      }`;
      try {
        const data = await client.fetch(query);
        setFooterData(data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchFooterData();
  }, []);

  if (!footerData) return null;

  return (
    
    <footer className="bg-red-800 text-white py-8">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">{footerData.title}</h2>
        <p className="mb-4">{footerData.description}</p>
        <p>{footerData.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
