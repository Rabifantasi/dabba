"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import useParams from next/navigation
import { client } from "@/sanity/lib/client"; // Adjust the path based on your project structure
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  availableSizes?: string[];
  availableColors?: string[];
  image: {
    asset: {
      url: string;
    };
  };
}

const SingleProductPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const productQuery = `*[_type == "product" && _id == $id][0]{
            _id,
            name,
            price,
            description,
            availableSizes,
            availableColors,
            image {
              asset -> {
                _id,
                url
              }
            }
          }`;
          
          const fetchedProduct = await client.fetch(productQuery, { id });
          setProduct(fetchedProduct);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center p-4">Product not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row">
        <Image
          src={product.image.asset.url}
          alt={product.name}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg"
          width={320}
          height={320}
        />
        <div className="md:ml-6 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-lg font-medium text-green-600 mb-4">Price: PKR {product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>

          {product.availableSizes && product.availableSizes.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Available Sizes:</h3>
              <ul className="list-disc ml-5 mt-1 text-gray-600">
                {product.availableSizes.map((size: string, index: number) => (
                  <li key={index}>{size}</li>
                ))}
              </ul>
            </div>
          )}

          {product.availableColors && product.availableColors.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Available Colors:</h3>
              <ul className="list-disc ml-5 mt-1 text-gray-600">
                {product.availableColors.map((color: string, index: number) => (
                  <li key={index}>{color}</li>
                ))}
              </ul>
            </div>
          )}

          <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
