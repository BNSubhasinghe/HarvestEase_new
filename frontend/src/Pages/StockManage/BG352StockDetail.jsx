import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaShoppingCart, FaLeaf, FaInfo, FaTimes, 
  FaStar, FaChevronRight, FaMapMarkerAlt,
  FaRulerHorizontal, FaTint, FaTemperatureHigh 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BG352StockDetail = () => {
  const [stocks, setStocks] = useState([]);
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [filter, setFilter] = useState("Rice"); // Filter for Rice or Paddy
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  
  const modalRef = useRef();
  const navigate = useNavigate();
  const currentVariety = "BG352"; // Set the current variety

  // Fetch stock data from backend
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/get-stocks");
        setStocks(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
    
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('harvestEaseCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing saved cart:", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('harvestEaseCart', JSON.stringify(cart));
  }, [cart]);

  // Add click outside modal to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    
    if (modalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalOpen]);

  // Filter stocks based on selected filter and variety
  const filteredStocks = stocks.filter(
    (stock) => stock.variety === currentVariety && stock.cropType.toLowerCase() === filter.toLowerCase()
  );

  // Get product image based on variety
  const getProductImage = (variety) => {
    const varietyMap = {
      'Nadu': '/shopImg/nadu.jpg',
      'Samba': '/shopImg/samba.jpg',
      'BG352': '/shopImg/bg352.jpg',
      'Pachcha': '/shopImg/pachcha.jpg',
      'Red Rice': '/shopImg/redrice.jpg',
      'Suwandel': '/shopImg/suwandel.jpg'
    };
    
    return varietyMap[variety] || '/shopImg/bg352.jpg'; // Default image if variety not found
  };

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

  // Handle quantity selection for adding to cart
  const handleSelectedQuantityChange = (change) => {
    setSelectedQuantity(prev => Math.max(1, Math.min(prev + change, selectedStock?.quantity || 10)));
  };

  const handleViewDetails = (stock) => {
    setSelectedStock(stock);
    setSelectedQuantity(1);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddToCart = (stock) => {
    const quantity = selectedQuantity || 1;
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item._id === stock._id);
    
    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].purchaseQuantity += quantity;
      setCart(updatedCart);
    } else {
      // Add new item
      const itemToAdd = { ...stock, purchaseQuantity: quantity };
      setCart((prevCart) => [...prevCart, itemToAdd]);
    }
    
    // Show notification
    setNotification({
      message: `${quantity} ${stock.quantityUnit} of ${stock.variety} added to cart!`,
      type: 'success'
    });
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
    
    if (modalOpen) {
      closeModal();
    }
  };

  // Get variety description based on name
  const getVarietyDescription = () => {
    return 'Hybrid rice variety with high yield and adaptability to various climates. Developed for maximum productivity and resilience to environmental challenges.';
  };

  // Determine dynamic background color based on variety
  const getBackgroundGradient = () => {
    return 'from-green-50 via-white to-green-100';
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar 
            key={star}
            className={star <= Math.floor(rating || 4.5) ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  // Features based on crop type
  const getCropTypeFeatures = (type) => {
    if (type.toLowerCase() === 'rice') {
      return [
        { icon: <FaTint className="text-blue-500" />, text: 'Ready to Cook' },
        { icon: <FaLeaf className="text-green-500" />, text: 'High Yield' },
        { icon: <FaStar className="text-yellow-500" />, text: 'Versatile' }
      ];
    } else {
      return [
        { icon: <FaRulerHorizontal className="text-amber-500" />, text: 'Unprocessed' },
        { icon: <FaTemperatureHigh className="text-red-500" />, text: 'Raw Form' },
        { icon: <FaMapMarkerAlt className="text-green-500" />, text: 'Farm Direct' }
      ];
    }
  };

  const navigateToVariety = (variety) => {
    navigate(`/${variety.toLowerCase().replace(' ', '-')}-stock-detail`);
  };

  return (
    <div className={`bg-gradient-to-br ${getBackgroundGradient()} min-h-screen font-sans`}>
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center text-sm text-gray-600">
          <a href="/shop" className="hover:text-green-600 transition">Shop</a>
          <FaChevronRight className="mx-2 text-xs" />
          <a href="#" className="hover:text-green-600 transition">Rice Varieties</a>
          <FaChevronRight className="mx-2 text-xs" />
          <span className="text-gray-800 font-medium">{currentVariety}</span>
        </div>
        
        {/* Hero Section */}
        <section className="relative mb-16 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
          <img src="/shopImg/hero.jpg" alt="Hero" className="w-full h-[400px] object-cover" />
          <div className="absolute top-1/2 transform -translate-y-1/2 left-12 z-20 text-white max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg">{currentVariety}</h1>
              <p className="text-lg sm:text-xl font-light mb-8">{getVarietyDescription()}</p>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => setFilter("Rice")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition flex items-center ${filter === "Rice" ? "bg-green-600 text-white" : "bg-white/30 text-white hover:bg-white/40"}`}
                >
                  Rice
                </button>
                <button 
                  onClick={() => setFilter("Paddy")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition flex items-center ${filter === "Paddy" ? "bg-green-600 text-white" : "bg-white/30 text-white hover:bg-white/40"}`}
                >
                  Paddy
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mb-20">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 border-opacity-50"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : filteredStocks.length === 0 ? (
            <div className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <FaLeaf className="text-4xl text-green-300" />
              </div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">No {currentVariety} {filter.toLowerCase()} available</h2>
              <p className="text-gray-600 mb-8">We're currently out of stock of this variety. Check back soon!</p>
              <button
                onClick={() => setFilter(filter === "Rice" ? "Paddy" : "Rice")}
                className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
              >
                Check {filter === "Rice" ? "Paddy" : "Rice"} Availability
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Available {currentVariety} {filter}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStocks.map((stock) => (
                  <motion.div
                    key={stock._id}
                    whileHover={{ y: -5 }}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg border border-gray-100"
                  >
                    {/* Product Image */}
                    <div className="relative overflow-hidden h-64">
                      <img 
                        src={getProductImage(stock.variety)} 
                        alt={stock.variety} 
                        className="w-full h-full object-cover transition duration-700 hover:scale-110" 
                      />
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-green-700 flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          {stock.status || 'In Stock'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          {stock.cropType}
                        </span>
                        <div className="flex items-center">
                          {renderStars(4.5)}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">{stock.variety}</h3>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-green-700 font-bold text-xl">
                          Rs. {stock.price}
                          <span className="text-xs text-gray-500 font-normal">/{stock.quantityUnit}</span>
                        </div>
                        <div className="text-gray-500 text-sm">
                          Stock: {stock.quantity} {stock.quantityUnit}
                        </div>
                      </div>
                      
                      {/* Features */}
                      <div className="flex justify-between mb-6">
                        {getCropTypeFeatures(stock.cropType).map((feature, idx) => (
                          <div key={idx} className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                              {feature.icon}
                            </div>
                            <span className="text-xs text-gray-600">{feature.text}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-3 mt-4">
                        <button
                          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-4 rounded-xl font-medium transition shadow-sm hover:shadow flex items-center justify-center"
                          onClick={() => handleAddToCart(stock)}
                          disabled={stock.quantity <= 0}
                        >
                          <FaShoppingCart className="mr-2" />
                          Add to Cart
                        </button>
                        <button
                          className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-xl font-medium transition shadow-sm hover:shadow flex items-center justify-center"
                          onClick={() => handleViewDetails(stock)}
                        >
                          <FaInfo className="mr-2" />
                          Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Related Products Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">You Might Also Like</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Nadu', 'Samba', 'Red Rice', 'Pachcha'].map((relatedVariety, idx) => (
              <div 
                key={idx}
                onClick={() => navigateToVariety(relatedVariety)}
                className="group cursor-pointer"
              >
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md"
                >
                  <div className="overflow-hidden h-40">
                    <img 
                      src={getProductImage(relatedVariety)} 
                      alt={relatedVariety} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{relatedVariety}</h3>
                    <div className="flex items-center text-yellow-500 mb-2">
                      {renderStars(4)}
                    </div>
                    <div className="text-green-700 font-medium">
                      View Details
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {modalOpen && selectedStock && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              ref={modalRef}
              className="bg-white rounded-2xl overflow-hidden shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row"
            >
              {/* Close button */}
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
              >
                <FaTimes size={24} />
              </button>

              {/* Product image */}
              <div className="md:w-1/2 h-72 md:h-auto relative">
                <img 
                  src={getProductImage(selectedStock.variety)} 
                  alt={selectedStock.variety}
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Product details */}
              <div className="md:w-1/2 p-6 overflow-y-auto">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {selectedStock.cropType}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedStock.variety}</h2>
                <div className="flex items-center mb-4">
                  {renderStars(4.5)}
                  <span className="ml-2 text-gray-600 text-sm">(4.5/5)</span>
                </div>

                <div className="border-t border-gray-100 my-4 pt-4">
                  <div className="text-green-700 font-bold text-2xl mb-2">
                    Rs. {selectedStock.price}
                    <span className="text-sm text-gray-500 font-normal">/{selectedStock.quantityUnit}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    Premium quality {selectedStock.variety} {selectedStock.cropType.toLowerCase()} sourced directly from local farmers.
                    Carefully processed and packaged to ensure the highest quality.
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-2">Available Stock</h4>
                    <p className="text-gray-600">{selectedStock.quantity} {selectedStock.quantityUnit}</p>
                  </div>
                  
                  {/* Quantity selector */}
                  <div className="flex items-center mb-6">
                    <span className="mr-4 text-gray-700">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button 
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        onClick={() => handleSelectedQuantityChange(-1)}
                      >
                        -
                      </button>
                      <span className="px-4 py-1">{selectedQuantity}</span>
                      <button 
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        onClick={() => handleSelectedQuantityChange(1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <button
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-4 rounded-xl font-medium transition shadow-sm hover:shadow flex items-center justify-center"
                    onClick={() => handleAddToCart(selectedStock)}
                    disabled={selectedStock.quantity <= 0}
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BG352StockDetail;