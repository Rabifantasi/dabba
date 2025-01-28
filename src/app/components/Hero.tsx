"use client"; // Add this line to indicate that this is a client component

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Menu from "../components/Menu";
import { groq } from "next-sanity";
import { client as sanityClient } from "@/sanity/lib/client"; // Adjust the import path based on your project structure

const heroQuery = groq`
  *[_type == "heroSection"][0] {
    sliderImages[] {
      asset-> {
        url
      }
    },
    customizableGiftBoxes[] {
      title,
      price,
      image {
        asset-> {
          url
        }
      }
    },
    featuredGiftBaskets[] {
      title,
      price,
      image {
        asset-> {
          url
        }
      }
    },
    customerTestimonials[] {
      author,
      quote,
      image {
        asset-> {
          url
        }
      }
    },
    newArrivals[] {
      title,
      price,
      image {
        asset-> {
          url
        }
      }
    },
    eventHighlights[] {
      title,
      date,
      image {
        asset-> {
          url
        }
      }
    }
  }
`;

const Hero: React.FC = () => {
  interface HeroData {
    sliderImages: { asset: { url: string } }[];
    customizableGiftBoxes: { title: string; price: string; image: { asset: { url: string } } }[];
    featuredGiftBaskets: { title: string; price: string; image: { asset: { url: string } } }[];
    customerTestimonials: { author: string; quote: string; image: { asset: { url: string } } }[];
    newArrivals: { title: string; price: string; image: { asset: { url: string } } }[];
    eventHighlights: { title: string; date: string; image: { asset: { url: string } } }[];
  }

  const [data, setData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await sanityClient.fetch(heroQuery);
        setData(result);
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.sliderImages && data.sliderImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === data.sliderImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [data]);

  if (loading) return <div className="text-center"></div>; // Handle loading state
  if (error) return <div className="text-center text-red-500">{error}</div>; // Handle error state
  if (!data) return <div className="text-center">No data available</div>; // Handle no data available

  return (
    <div className="min-h-screen bg-white"> {/* Set the entire page background to white */}
      <div className="flex flex-col md:flex-row md:items-start w-full">
        {/* Menu Section */}
        <div className="md:w-1/8">
          <Menu />
        </div>

        {/* Main Content */}
        <div className="flex-1 mt-16 px-4 sm:px-6 lg:px-8">
          {/* Hero Slider */}
          <section className="bg-yellow-300 relative overflow-hidden rounded-lg shadow-lg">
            {data.sliderImages.length > 0 ? (
              <Image
                src={data.sliderImages[currentImageIndex]?.asset.url}
                alt={`Hero Image ${currentImageIndex + 1}`}
                layout="responsive"
                width={800}
                height={400}
                className="rounded-lg opacity-100 transition-opacity duration-500"
                priority // Improved performance
              />
            ) : (
              <div className="text-center">No images available</div>
            )}
          </section>

          {/* Customizable Gift Boxes Section */}
          <section className="py-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
              Customize Your Gift Box
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.customizableGiftBoxes.length > 0 ? (
                data.customizableGiftBoxes.map((box, index) => (
                  <div key={index} className="relative bg-white rounded-lg shadow-md overflow-hidden">
                    <Image
                      src={box.image.asset.url}
                      alt={`Custom Box ${index + 1}`}
                      width={300}
                      height={200}
                      className="w-full h-48 sm:h-64 object-cover"
                    />
                    <div className="p-4 text-center"> {/* Centered text */}
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{box.title}</h3>
                      <p className="text-gray-600 mb-4">{box.price} PKR</p>
                      <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
                        Customize Now
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">No customizable gift boxes available</div>
              )}
            </div>
          </section>

          {/* Featured Gift Baskets Section */}
          <section className="py-16 bg-gray-100"> {/* Added bg-gray-100 for contrast */}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
              Featured Gift Baskets
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {data.featuredGiftBaskets.length > 0 ? (
                data.featuredGiftBaskets.map((basket, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <Image
                      src={basket.image.asset.url}
                      alt={`Basket ${index + 1}`}
                      width={300}
                      height={200}
                      className="w-full h-48 sm:h-64 object-cover mb-4"
                    />
                    <div className="text-center"> {/* Centered text */}
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{basket.title}</h3>
                      <p className="text-gray-600 mb-4">{basket.price} PKR</p>
                      <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">No featured gift baskets available</div>
              )}
            </div>
          </section>

          {/* Customer Testimonials Section */}
          <section className="py-16 bg-white"> {/* Ensure background is white */}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
              What Our Customers Say
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-6 px-4 sm:px-6 lg:px-8">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/3 text-center">
                <p className="text-black text-lg italic">
                  "The gift box was a huge hit at the party! Highly recommend!"
                </p>
                <p className="text-black font-bold mt-4">- Sarah K.</p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/3 text-center">
                <p className="text-black text-lg italic">
                  "Beautifully presented and packed with care. A perfect gift!"
                </p>
                <p className="text-black font-bold mt-4">- John D.</p>
              </div>
            </div>
          </section>

          {/* New Arrivals Section */}
          <section className="py-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
              New Arrivals
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.newArrivals.length > 0 ? (
                data.newArrivals.map((arrival, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Image
                      src={arrival.image.asset.url}
                      alt={`New Arrival ${index + 1}`}
                      width={300}
                      height={200}
                      className="w-full h-48 sm:h-64 object-cover"
                    />
                    <div className="p-4 text-center"> {/* Centered text */}
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{arrival.title}</h3>
                      <p className="text-gray-600 mb-4">{arrival.price} PKR</p>
                      <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">No new arrivals available</div>
              )}
            </div>
          </section>

          {/* Event Highlights Section */}
          <section className="py-16 bg-gray-100"> {/* Added bg-gray-100 for contrast */}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {data.eventHighlights.length > 0 ? (
                data.eventHighlights.map((event, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <Image
                      src={event.image.asset.url}
                      alt={`Event ${index + 1}`}
                      width={300}
                      height={200}
                      className="w-full h-48 sm:h-64 object-cover mb-4"
                    />
                    <div className="text-center"> {/* Centered text */}
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h3>
                      <p className="text-gray-600">{event.date}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">No upcoming events available</div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Hero;