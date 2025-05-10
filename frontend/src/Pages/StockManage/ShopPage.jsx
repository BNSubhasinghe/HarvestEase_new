import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ShopPage = () => {
  const crops = [
    {
      name: "Nadu",
      description: "Popular for dry zones, moderate growth, high yield.",
      image: "/shopImg/nadu.jpg",
      link: "/nadu-stock-detail",
      tags: ["High Yield", "Fast Growth"],
      ribbon: "Best Seller"
    },
    {
      name: "Samba",
      description: "Fragrant, fine grain, needs longer growth period.",
      image: "/shopImg/samba.jpg",
      link: "/samba-detail",
      tags: ["Aromatic", "Premium"]
    },
    {
      name: "Red Rice",
      description: "Nutritious, traditional variety, low water needs.",
      image: "/shopImg/redrice.jpg",
      link: "/redrice-detail",
      tags: ["Traditional", "Organic"],
      ribbon: "Hot"
    },
    {
      name: "BG352",
      description: "Hybrid rice, high yield, adaptable to many climates.",
      image: "/shopImg/bg352.jpg",
      link: "/bg352-detail",
      tags: ["Hybrid", "Adaptable"]
    },
    {
      name: "Suwandel",
      description: "Fragrant and soft, a premium traditional rice.",
      image: "/shopImg/suwandel.jpg",
      link: "/suwandel-detail",
      tags: ["Fragrant", "Premium"]
    },
    {
      name: "Pachcha",
      description: "A nutritious, traditional variety with low water needs.",
      image: "/shopImg/pachcha.jpg",
      link: "/pachcha-detail",
      tags: ["Traditional", "Low Water"]
    },
  ];

  const reviews = [
    {
      title: "Excellent Quality!",
      text: "Super fresh rice, great packaging. Will definitely buy again.",
      stars: 5
    },
    {
      title: "Tasty & Aromatic",
      text: "Loved the samba rice. Flavorful and authentic.",
      stars: 4
    }
  ];

  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="bg-[#f9fafb] text-gray-800">
      {/* Offer Banner */}
      <div className="bg-gradient-to-r from-green-600 to-lime-500 text-white text-center py-3 text-lg font-semibold animate-pulse">
        🌾 Spring Sale! Get up to 20% off on select rice varieties!
      </div>

      {/* Countdown Timer */}
      <div className="text-center bg-white py-3 text-green-700 text-sm font-medium shadow-sm">
        ⏰ Limited Time Deal Ends In: <span className="font-bold">{formatTime(timeLeft)}</span>
      </div>

      {/* Hero Section */}
      <section className="relative h-[400px] mb-12">
        <img src="/shopImg/hero.jpg" alt="Hero" className="w-full h-full object-cover rounded-b-3xl" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Fresh Crops, From Field to You</h1>
          <p className="mt-4 text-lg">Taste the freshness of homegrown rice varieties.</p>
          <Link to="/shop" className="mt-6 bg-gradient-to-r from-green-500 to-lime-500 px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition">Shop Now</Link>
        </div>
      </section>

      {/* Search */}
      <div className="max-w-5xl mx-auto px-4 mb-10">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <input type="text" placeholder="Search crops..." className="flex-1 p-3 border rounded-md" />
          <select className="p-3 border rounded-md">
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest Arrivals</option>
          </select>
        </div>
      </div>

      {/* ✨ Crop Cards */}
      <section className="max-w-6xl mx-auto px-4 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {crops.map((crop) => (
          <div key={crop.name} className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition overflow-hidden group">
            {crop.ribbon && (
              <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-br-xl z-10">
                {crop.ribbon}
              </div>
            )}
            <img src={crop.image} alt={crop.name} className="w-full h-56 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <Link to={crop.link} className="px-5 py-2 bg-white text-green-700 font-semibold rounded-full shadow-md hover:scale-105 transition">
                Buy Now
              </Link>
            </div>
            <div className="p-5">
              <h3 className="text-2xl font-bold text-green-700">{crop.name}</h3>
              <p className="text-gray-600 mt-2">{crop.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {crop.tags?.map((tag, i) => (
                  <span key={i} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              {/* <Link to={crop.link} className="inline-block mt-4 px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition text-sm">
                Buy Now
              </Link> */}
            </div>
          </div>
        ))}
      </section>

      {/* Section Divider */}
      <div className="my-16 text-center">
        <div className="text-4xl font-extrabold text-green-700 mb-2 animate-bounce">🌟</div>
        <h2 className="text-2xl font-bold text-gray-700">Our Happy Customers</h2>
      </div>

      {/* Reviews */}
      <section className="max-w-5xl mx-auto px-4 mb-16 grid gap-6 sm:grid-cols-2">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h4 className="text-xl font-semibold">{review.title}</h4>
            <p className="mt-2 text-gray-600">{review.text}</p>
            <div className="mt-3 text-yellow-400 text-lg">
              {"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ShopPage;
