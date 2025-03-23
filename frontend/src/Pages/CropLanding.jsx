import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import paddyField from '../assets/paddy_field.jpg'; // ✅ Make sure this image exists

const CropLanding = () => {
  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${paddyField})`,
      }}
    >
      <div className="bg-black bg-opacity-50 p-10 rounded-lg text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-white mb-6"
        >
          Crop Tracking
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl italic text-white mb-8"
        >
          Plan Smart. Harvest Better.
        </motion.p>

        {/* 🧺 Only Explore Crops Button */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/crop-planning">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out"
            >
               Explore Crops
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CropLanding;
