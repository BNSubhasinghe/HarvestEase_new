// src/Pages/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChartLine, FaSeedling, FaLeaf, FaWarehouse } from 'react-icons/fa';

// Import images
import cropImg from '../assets/crop-new.jpg';
import paddyStorageImg from '../assets/paddy-storage.jpg';
import salesImg from '../assets/sales-new.jpg';
import paddyImg from '../assets/paddy.jpg';
import paddyFieldImg from '../assets/plant-new.jpg';

const Home = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={cropImg} 
            alt="Paddy Field" 
            className="w-full h-full object-cover filter brightness-[0.65]"
          />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Welcome to <span className="text-green-400">HarvestEase</span>
          </motion.h1>
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-2xl mx-auto text-xl text-gray-200 mb-10"
          >
            Simplifying paddy farming management with smart solutions
          </motion.p>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/dashboard" className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-lg">
              Get Started
            </Link>
            <Link to="/features" className="bg-white hover:bg-gray-100 text-green-800 font-medium py-3 px-6 rounded-lg transition duration-300 shadow-lg">
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Key Features</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            HarvestEase provides comprehensive tools to optimize every aspect of your paddy farming operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <motion.div 
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
          >
            <div className="bg-green-100 p-4 rounded-full mb-6">
              <FaChartLine className="text-green-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Financial Management</h3>
            <p className="text-gray-600">Track expenses, analyze profits, and manage your farm's finances efficiently.</p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
          >
            <div className="bg-green-100 p-4 rounded-full mb-6">
              <FaSeedling className="text-green-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Crop Planning</h3>
            <p className="text-gray-600">Plan your crop cycles, track growth stages, and optimize planting schedules.</p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
          >
            <div className="bg-green-100 p-4 rounded-full mb-6">
              <FaLeaf className="text-green-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Smart Plant Care</h3>
            <p className="text-gray-600">Get recommendations for optimal plant health and pest management solutions.</p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div 
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
          >
            <div className="bg-green-100 p-4 rounded-full mb-6">
              <FaWarehouse className="text-green-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Stock Management</h3>
            <p className="text-gray-600">Track inventory, manage storage, and optimize your supply chain efficiently.</p>
          </motion.div>
        </div>
      </section>

      {/* Crop Tracking Section */}
      <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pl-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Advanced Crop Tracking</h2>
              <p className="text-gray-600 mb-6">
                Keep detailed records of your crop's entire lifecycle from planting to harvest. Our tracking system 
                allows you to monitor growth stages, applied treatments, and expected yields with ease.
              </p>
              <p className="text-gray-600 mb-6">
                Generate comprehensive reports to analyze performance across seasons, identify patterns, and 
                continuously improve your farming practices for maximum efficiency and yield.
              </p>
              <Link to="/crop-landing" className="inline-flex items-center text-green-600 font-medium hover:text-green-800">
                Learn more about crop tracking
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            <div className="md:w-1/2">
              <img 
                src={paddyFieldImg}
                alt="Crop Tracking" 
                className="rounded-lg shadow-lg w-full h-auto object-cover" 
                style={{maxHeight: '450px'}} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stock Management Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Optimize Your Paddy Storage</h3>
              <p className="text-gray-600 mb-6">
                Our intelligent storage management system helps maintain optimal conditions for your paddy, 
                reducing waste and ensuring maximum crop quality from harvest to market.
              </p>
              <Link to="/stock-management" className="inline-flex items-center text-green-600 font-medium hover:text-green-800">
                Learn more about storage solutions
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            <div className="md:w-1/2">
              <img src={paddyStorageImg} alt="Paddy Storage" className="rounded-lg shadow-lg w-full h-auto object-cover" style={{maxHeight: '450px'}} />
            </div>
          </div>
        </div>
      </section>

      {/* Financial Management Section */}
      <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pl-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Maximize Your Sales Potential</h3>
              <p className="text-gray-600 mb-6">
                Track market trends, manage customer relationships, and optimize your pricing strategy 
                to ensure you get the best returns for your quality paddy products.
              </p>
              <Link to="/finance" className="inline-flex items-center text-green-600 font-medium hover:text-green-800">
                Explore sales features
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            <div className="md:w-1/2">
              <img src={salesImg} alt="Sales Management" className="rounded-lg shadow-lg w-full h-auto object-cover" style={{maxHeight: '450px'}} />
            </div>
          </div>
        </div>
      </section>

      {/* Smart Plant Care Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Smart Plant Care</h2>
              <p className="text-gray-600 mb-6">
                Our intelligent plant care system helps you monitor and maintain optimal health for your paddy crops.
                Get timely alerts about potential diseases, pest infestations, and nutritional deficiencies before they
                become serious problems.
              </p>
              <p className="text-gray-600 mb-6">
                With HarvestEase's data-driven recommendations, you can make informed decisions about 
                fertilization, irrigation, and pest control tailored specifically to your paddy fields.
              </p>
              <Link to="/disease-user" className="inline-flex items-center text-green-600 font-medium hover:text-green-800">
                Explore smart plant care features
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            <div className="md:w-1/2">
              <img 
                src={paddyImg} 
                alt="Smart Plant Care" 
                className="rounded-lg shadow-lg w-full h-auto object-cover" 
                style={{maxHeight: '450px'}} 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
