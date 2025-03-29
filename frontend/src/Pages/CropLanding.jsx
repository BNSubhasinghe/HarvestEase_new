import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import paddyField from '../assets/paddy_field.jpg';
import { FaLeaf } from 'react-icons/fa';

import naduImg from '../assets/nadu.jpg';
import sambaImg from '../assets/samba.jpg';
import redRiceImg from '../assets/redrice.jpg';
import bg352Img from '../assets/bg352.jpg';
import suwandelImg from '../assets/suwandel.jpg';
import pachchaImg from '../assets/pachcha.jpg';

const CropLanding = () => {
  const navigate = useNavigate();


  const features = [
    {
      title: "Financial Dashboard",
      description: "Track expenses, sales, and profitability",
      icon: "💰",
      path: "/finance"
    },
    {
      title: "Crop Planning",
      description: "Manage planting schedules and growth stages",
      icon: "🌱",
      path: "/crop-planning"
    },
    {
      title: "Stock Management",
      description: "Monitor inventory and supplies",
      icon: "📦",
      path: "/stock-management"
    },
    {
      title: "Disease Diagnosis",
      description: "Identify plant diseases and get solutions",
      icon: "🔍",
      path: "/disease-user"
    }
  ];

 
  const crops = [
    { name: 'Nadu', description: 'Popular for dry zones, moderate growth, high yield.', image: naduImg },
    { name: 'Samba', description: 'Fragrant, fine grain, needs longer growth period.', image: sambaImg },
    { name: 'Red Rice', description: 'Nutritious, traditional variety, low water needs.', image: redRiceImg },
    { name: 'Bg 352', description: 'High yield hybrid, short-term cultivation.', image: bg352Img },
    { name: 'Suwandel', description: 'Aromatic, organic-friendly, premium quality.', image: suwandelImg },
    { name: 'Pachchaperumal', description: 'Traditional red rice, rich in fiber and nutrients.', image: pachchaImg },
  ];

  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const cropsPerPage = 3;

 
  const filteredCrops = crops.filter(crop =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredCrops.length / cropsPerPage);
  const indexOfLastCrop = currentPage * cropsPerPage;
  const indexOfFirstCrop = indexOfLastCrop - cropsPerPage;
  const currentCrops = filteredCrops.slice(indexOfFirstCrop, indexOfLastCrop);

  
  const getCropRoute = (name) => {
    switch (name.toLowerCase()) {
      case 'nadu': return '/crop-detail/nadu';
      case 'samba': return '/crop-detail/samba';
      case 'red rice': return '/crop-detail/redrice';
      case 'bg 352': return '/crop-detail/bg352';
      case 'suwandel': return '/crop-detail/suwandel';
      case 'pachchaperumal': return '/crop-detail/pachchaperumal';
      default: return '/crop-planning';
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${paddyField})` }}
    >
      
      <div className="bg-black bg-opacity-60 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              HarvestEase Farm Management
            </h1>
            <p className="text-xl text-gray-200">
              Your complete solution from planning to profit
            </p>
          </motion.div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white bg-opacity-90 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link to={feature.path}>
                  <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition">
                    Explore
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>

          
          <div className="bg-white bg-opacity-90 rounded-xl p-8 shadow-lg">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-center mb-2 text-[#1A512E]">
                Crop Tracking
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Select a paddy type to track growth and plan your harvest
              </p>

              
              <div className="flex justify-center mb-8">
                <input
                  type="text"
                  placeholder="Search paddy type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {currentCrops.map((crop, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white shadow rounded-lg overflow-hidden transition duration-200 border border-gray-200"
                  >
                    <div className="w-full h-56 overflow-hidden">
                      <img
                        src={crop.image}
                        alt={crop.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h2 className="text-xl font-semibold text-[#1A512E]">{crop.name}</h2>
                      <p className="text-gray-600 mt-2">{crop.description}</p>
                      <button
                        onClick={() => navigate(getCropRoute(crop.name))}
                        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition flex items-center mx-auto"
                      >
                        <FaLeaf className="mr-2" /> View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-green-700 text-white' : 'bg-white border border-green-700 text-green-700 hover:bg-green-50'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 text-center"
          >
            <Link to="/signup">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full text-lg shadow-lg transform transition hover:scale-105">
                Get Started Today
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CropLanding;