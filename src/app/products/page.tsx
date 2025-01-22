"use client"; // Ensure this component runs on the client side
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client"; // Adjust the path based on your project structure
import Filters from "@/app/components/Filter"; // Adjust the path based on your project structure
import Link from "next/link"; // Import Link from Next.js
import Image from "next/image";

// Define interfaces for product
interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  popularity: string;
  image: {
    asset: {
      url: string;
    };
  };
}

const query = `*[_type == "product"]{
  _id,
  name,
  price,
  category,
  popularity,
  image {
    asset -> {
      _id,
      url
    }
  }
}`;

const Product: React.FC<Product & { onAddToCart: () => void }> = ({
  name,
  price,
  image,
  category,
  popularity,
  _id,
  onAddToCart,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <Image
        src={image.asset.url}
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg"
        height={192}
        width={320}
      />
      <div className="p-2">
        <h2 className="text-xl font-semibold text-gray-800 truncate">{name}</h2>
        <p className="text-green-600 font-medium mt-1">Price: PKR {price}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded">
            {category}
          </span>
          <span
            className={`px-3 py-1 text-sm font-medium rounded ${
              popularity === "High"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            Popularity: {popularity}
          </span>
        </div>
        <button
          onClick={onAddToCart}
          className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add to Cart
        </button>
        <Link href={`/products/${_id}`}>
          <span className="mt-2 block text-center text-blue-500 underline cursor-pointer">
            View Details
          </span>
        </Link>
      </div>
    </div>
  );
};

// Main Products Page component
const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts: Product[] = await client.fetch(query);
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts); // Initially, display all products
      } catch (_error) {
        console.error("Error fetching products:", _error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  function handleAddToCart(product: Product): void {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product); // Add product to cart
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
    setShowMessage(true); // Show message
    setTimeout(() => setShowMessage(false), 2000); // Hide message after 2 seconds
  }

  function handleFilterChange(filters: {
    category: string;
    price: string;
    popularity: string;
  }): void {
    const { category, price, popularity } = filters;

    // Filter products based on selected filters
    const filtered = products.filter((product) => {
      const matchesCategory = category ? product.category === category : true;
      const matchesPrice = price
        ? (price === "1000-2000" && product.price >= 1000 && product.price <= 2000) ||
          (price === "2000-3000" && product.price > 2000 && product.price <= 3000) ||
          (price === "3000-4000" && product.price > 3000 && product.price <= 4000) ||
          (price === "4000-5000" && product.price > 4000 && product.price <= 5000)
        : true;
      const matchesPopularity = popularity ? product.popularity === popularity : true;

      return matchesCategory && matchesPrice && matchesPopularity;
    });

    setFilteredProducts(filtered); // Update filtered products
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {showMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-700 px-4 py-2 rounded shadow-lg">
          Item added to cart successfully!
        </div>
      )}

      {/* Cart Link with Item Count */}
      <Link href="/cart" className="mb-4 inline-block text-blue-600">
        Cart ({JSON.parse(localStorage.getItem("cart") || "[]").length} items)
      </Link>

      <Filters
        categories={Array.from(new Set(products.map((product) => product.category)))} // Dynamically get unique categories
        priceRanges={["1000-2000", "2000-3000", "3000-4000", "4000-5000"]}
        onFilterChange={handleFilterChange}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {filteredProducts.map((product) => (
          <Product
            key={product._id}
            {...product}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
