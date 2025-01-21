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

const Footer: React.FC = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      const query = `*[_type == "footer"][0] {
        title,
        description,
        copyright
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
    <footer className={`bg-red-800 text-white py-8 ${footerData.padding}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">{footerData.title}</h2>
        <p className="mb-4 text-sm sm:text-base">{footerData.description}</p>
        <p className="text-sm sm:text-base">{footerData.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
