"use client"; // Mark this file as a Client Component

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Use next/navigation for routing
import { client } from '@/sanity/lib/client'; // Adjust the import according to your project structure
import { groq } from 'next-sanity';
import Link from "next/link"; // Ensure you import Link

interface Product {
  _id: string;
  _type: "product";
  name: string;
  description: string;
  price: number;
  image: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
}

interface Page {
  _id: string;
  _type: "page";
  title: string;
  slug: string;
}

type SearchResult = Product | Page; // A union type for both product and page

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || ""; // Get the search query from the URL, default to empty string
  const [results, setResults] = useState<SearchResult[]>([]); // State for search results
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        const queryString = groq`
          *[_type == "product" && (name match $searchTerm || description match $searchTerm)] {
            _id,
            name,
            description,
            price,
            image,
            slug
          }
        `;

        const pageQueryString = `
          *[_type == "page" && (title match $searchTerm || description match $searchTerm)] {
            _id,
            title,
            slug
          }
        `;

        try {
          const productData = await client.fetch<Product[]>(queryString, { searchTerm: query });
          const pageData = await client.fetch<Page[]>(pageQueryString, { searchTerm: query });

          const combinedResults: SearchResult[] = [...productData, ...pageData];
          setResults(combinedResults);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // Stop loading if there's no query
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for: {query}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div>
          {results.map((item) => (
            <div key={item._id} className="mb-4">
              {item._type === "product" ? (
                <>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p>PKR {item.price}</p>
                  <Link href={`/products/${item.slug.current}`}>
                    <button className="bg-red-600 text-white p-2 rounded">View Product</button>
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <Link href={`/${item.slug}`}>
                    <button className="bg-blue-600 text-white p-2 rounded">View Page</button>
                  </Link>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
