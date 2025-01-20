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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await sanityClient.fetch(heroQuery);
        setData(result);
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
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

  if (loading) return <div>Loading...</div>; // Handle loading state
  if (!data) return <div>No data available</div>; // Handle no data available

  return (
    <div className="flex flex-col md:flex-row md:items-start w-full">
      <div className="md:w-1/8">
        <Menu />
      </div>
      <div className="flex-1 mt-16">
        <section className="bg-yellow-300 relative overflow-hidden rounded-lg shadow-lg">
          {data.sliderImages.length > 0 ? (
            <Image
              src={data.sliderImages[currentImageIndex]?.asset.url}
              alt={`Hero Image ${currentImageIndex + 1}`}
              layout="responsive"
              width={800}
              height={400}
              className="rounded-lg opacity-100 transition-opacity duration-500"
            />
          ) : (
            <div className="text-center">No images available</div>
          )}
        </section>

        {/* Customizable Gift Boxes Section */}
        <section className="py-16">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
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
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 text-center">
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
        <section className="py-16 bg-gray-100">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
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
                    className="w-full h-64 object-cover mb-4"
                  />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{basket.title}</h3>
                  <p className="text-gray-600 mb-4">{basket.price} PKR</p>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center">No featured gift baskets available</div>
            )}
          </div>
        </section>

        {/* Customer Testimonials Section */}
        <section className="py-16 bg-yellow-100">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">
            What Our Customers Say
          </h2>
          <div className="flex flex-col md:flex-row justify-center">
            {data.customerTestimonials.length > 0 ? (
              data.customerTestimonials.map((testimonial, index) => (
                <blockquote key={index} className="bg-white shadow-lg rounded-lg p-6 mx-2 mb-4 flex flex-col items-center">
                  <Image
                    src={testimonial.image.asset.url}
                    alt={testimonial.author}
                    width={100}
                    height={100}
                    className="rounded-full mb-4"
                  />
                  <p className="italic">{testimonial.quote}</p>
                  <p className="font-bold">{testimonial.author}</p>
                </blockquote>
              ))
            ) : (
              <div className="text-center">No testimonials available</div>
            )}
          </div>
        </section>

        {/* New Arrivals Section */}
        <section className="py-16">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.newArrivals.length > 0 ? (
              data.newArrivals.map((arrival, index) => (
                <div key={index} className="relative bg-white rounded-lg shadow-md overflow-hidden">
                  <Image
                    src={arrival.image.asset.url}
                    alt={arrival.title}
                    width={400}
                    height={400}
                    className="object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{arrival.title}</h3>
                    <p className="text-xl font-bold">{arrival.price} PKR</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">No new arrivals available</div>
            )}
          </div>
        </section>

        {/* Event Highlights Section */}
        <section className="py-16">
  <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">Event Highlights</h2>
  <div className="max-w-full px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {data.eventHighlights.length > 0 ? (
        data.eventHighlights.map((event, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-200 w-full">
            <Image
              src={event.image.asset.url}
              alt={event.title}
              width={600}
              height={400}
              className="object-cover w-full h-64"
            />
            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h3>
              <p className="text-gray-600">{event.date}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">No event highlights available</div>
      )}
    </div>
  </div>
</section>



      </div>
    </div>
  );
};

export default Hero;
