import React, { useState, useEffect } from "react";
import axios from "axios";

const ShopPage = () => {
  const [stocks, setStocks] = useState([]);
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [filter, setFilter] = useState("Rice"); // Filter for Rice or Paddy

  // Fetch stock data from backend
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get-stocks");
        setStocks(response.data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStocks();
  }, []);

  // Filter stocks based on selected filter (Rice or Paddy)
  const filteredStocks = stocks.filter(
    (stock) => stock.variety === "Nadu" && stock.cropType.toLowerCase() === filter.toLowerCase()
  );

  // Handle quantity change (increase/decrease)
  const handleQuantityChange = (stockId, change) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock._id === stockId
          ? { ...stock, quantity: Math.max(0, stock.quantity + change) }
          : stock
      )
    );
  };

  const handleViewDetails = (stock) => {
    setSelectedStock(stock);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddToCart = (stock) => {
    setCart((prevCart) => [...prevCart, stock]);
    alert(`${stock.variety} added to the cart!`);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen p-6 font-sans">
      {/* Hero Section */}
      <section className="relative mb-20 rounded-xl overflow-hidden shadow-xl">
        <img src="/shopImg/hero.jpg" alt="Hero" className="w-full h-[500px] object-cover" />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-6">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg">HarvestEase Market</h1>
          <p className="text-lg sm:text-xl font-light max-w-2xl">Where freshness meets tradition. Hand-picked crops from the heart of nature.</p>
        </div>
      </section>

      {/* Filter for Rice or Paddy */}
      <div className="mb-8 flex justify-center gap-6">
        <button
          onClick={() => setFilter("Rice")}
          className={`px-6 py-2 rounded-full ${filter === "Rice" ? "bg-green-600 text-white" : "bg-gray-300"}`}
        >
          Nadu Rice
        </button>
        <button
          onClick={() => setFilter("Paddy")}
          className={`px-6 py-2 rounded-full ${filter === "Paddy" ? "bg-green-600 text-white" : "bg-gray-300"}`}
        >
          Nadu Paddy
        </button>
      </div>

      {/* Product Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredStocks.map((stock) => (
          <div
            key={stock._id}
            className="bg-white/60 backdrop-blur-xl shadow-xl border border-gray-200 rounded-3xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl duration-300 relative"
          >
            <div className="overflow-hidden h-56">
              <img src="/shopImg/nadu.jpg" alt={stock.variety} className="w-full h-full object-cover scale-100 hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full mb-2">
                {stock.cropType}
              </span>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stock.variety}</h3>
              <p className="text-gray-600 text-sm mb-3">Only ${stock.price} / {stock.quantityUnit}</p>
              <p className="text-gray-500 text-xs mb-4">Stock: {stock.quantity} {stock.quantityUnit}</p>

              <div className="flex items-center gap-2 mb-4">
                <button
                  className="bg-green-600 text-white w-8 h-8 rounded-full hover:bg-green-700 transition"
                  onClick={() => handleQuantityChange(stock._id, -1)}
                >
                  −
                </button>
                <span className="px-2 text-md font-semibold">{stock.quantity}</span>
                <button
                  className="bg-green-600 text-white w-8 h-8 rounded-full hover:bg-green-700 transition"
                  onClick={() => handleQuantityChange(stock._id, 1)}
                >
                  +
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-full font-medium transition"
                  onClick={() => handleAddToCart(stock)}
                >
                  Add to Cart
                </button>
                <button
                  className="flex-1 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-full font-medium transition"
                  onClick={() => handleViewDetails(stock)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Fancy Modal */}
      {modalOpen && selectedStock && (
   <div className="fixed inset-0 bg-black/60 z-50 flex justify-end items-center">
    <div className="bg-white w-full sm:w-[450px] md:w-[500px] h-full sm:h-[90vh] sm:rounded-l-3xl p-8 shadow-lg overflow-y-auto transition-all duration-500 animate-slideInRight">
      <h2 className="text-3xl font-bold text-green-700 mb-4">{selectedStock.variety}</h2>
      <img
        src="/shopImg/nadu.jpg"
        alt={selectedStock.variety}
        className="w-full h-56 object-cover rounded-lg mb-4"
      />
      
      <div className="space-y-2 text-gray-700 text-sm">
        <p><b>👨‍🌾 Farmer:</b> {selectedStock.farmerName} ({selectedStock.farmerEmail})</p>
        <p><b>🌾 Crop Type:</b> {selectedStock.cropType}</p>
        <p><b>📦 Quantity:</b> {selectedStock.quantity} {selectedStock.quantityUnit}</p>
        <p><b>💰 Price:</b> ${selectedStock.price} / {selectedStock.quantityUnit}</p>
        <p><b>📅 Stock Date:</b> {new Date(selectedStock.stockDate).toLocaleDateString()}</p>
        {selectedStock.harvestedDate && (
          <p><b>🌿 Harvested Date:</b> {new Date(selectedStock.harvestedDate).toLocaleDateString()}</p>
        )}
        {selectedStock.moistureLevel !== undefined && (
          <p><b>💧 Moisture Level:</b> {selectedStock.moistureLevel}%</p>
        )}
        {selectedStock.storageTemperature !== undefined && (
          <p><b>🌡 Storage Temp:</b> {selectedStock.storageTemperature}°C</p>
        )}
        {selectedStock.storageHumidity !== undefined && (
          <p><b>💦 Storage Humidity:</b> {selectedStock.storageHumidity}%</p>
        )}
        {selectedStock.processingType && (
          <p><b>⚙️ Processing Type:</b> {selectedStock.processingType}</p>
        )}
        {selectedStock.packagingType && (
          <p><b>📦 Packaging:</b> {selectedStock.packagingType}</p>
        )}
        {selectedStock.bestBeforeDate && (
          <p><b>⏳ Best Before:</b> {new Date(selectedStock.bestBeforeDate).toLocaleDateString()}</p>
        )}
        <p><b>📍 Storage Location:</b> {selectedStock.storageLocation}</p>
        <p><b>🧪 Quality Grade:</b> {selectedStock.qualityGrade}</p>
        <p><b>✅ Status:</b> {selectedStock.status}</p>
        <p><b>📝 Description:</b> {selectedStock.description || "N/A"}</p>
      </div>

      <button
        className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition"
        onClick={closeModal}
      >
        Close
      </button>
    </div>
  </div>
)}


      {/* Custom animation class */}
      <style jsx>{`
        .animate-slideInRight {
          animation: slideIn 0.4s ease-out forwards;
        }

        @keyframes slideIn {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
};

export default ShopPage;
