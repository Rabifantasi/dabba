"use client";

import { useState } from "react";

interface FiltersProps {
  categories: string[];
  priceRanges: string[];
  onFilterChange: (filters: { category: string; price: string; popularity: string }) => void;
}

const Filters: React.FC<FiltersProps> = ({
  categories = [],
  priceRanges = [],
  onFilterChange,
}) => {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [popularity, setPopularity] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    onFilterChange({ category: newCategory, price, popularity });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPrice = e.target.value;
    setPrice(newPrice);
    onFilterChange({ category, price: newPrice, popularity });
  };

  const handlePopularityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPopularity = e.target.value;
    setPopularity(newPopularity);
    onFilterChange({ category, price, popularity: newPopularity });
  };

  const resetFilters = () => {
    setCategory("");
    setPrice("");
    setPopularity("");
    onFilterChange({ category: "", price: "", popularity: "" });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4 justify-center">
      {/* Category Filter */}
      <div className="border border-gray-400 text-[0.875rem] rounded-md py-3 bg-lightbgColor flex pl-3 pr-6 items-center gap-x-2 w-full sm:w-auto">
        <p className="text-[#737373]">Category</p>
        <select onChange={handleCategoryChange} value={category} className="text-sm">
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="border border-gray-400 text-[0.875rem] rounded-md py-3 bg-lightbgColor flex pl-3 pr-6 items-center gap-x-2 w-full sm:w-auto">
        <p className="text-[#737373]">Price</p>
        <select onChange={handlePriceChange} value={price} className="text-sm">
          <option value="">Select Price Range</option>
          {priceRanges.map((range) => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
      </div>

      {/* Popularity Filter */}
      <div className="border border-gray-400 text-[0.875rem] rounded-md py-3 bg-lightbgColor flex pl-3 pr-6 items-center gap-x-2 w-full sm:w-auto">
        <p className="text-[#737373]">Popularity</p>
        <select onChange={handlePopularityChange} value={popularity} className="text-sm">
          <option value="">Select Popularity</option>
          <option value="High">High</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Reset Filters Button */}
      <button 
        onClick={resetFilters} 
        className="mt-2 text-red-500 underline w-full sm:w-auto"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
