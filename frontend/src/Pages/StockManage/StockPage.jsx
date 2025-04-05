import React, { useState, useEffect } from 'react';
import StockForm from './StockForm';
import StockTable from './StockTable';
import StockAnalysisChart from './StockAnalysisChart';
import QuantityPriceChart from './QuantityPriceChart';
import axios from 'axios';

const StockPage = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSection, setCurrentSection] = useState('overview'); // Default to Stock Overview

  // Fetching stock data
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get-stocks');
        setStocks(response.data);
      } catch (error) {
        setError('Failed to fetch stock data');
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Function to switch sections
  const handleNavigation = (section) => {
    setCurrentSection(section);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-7xl mx-auto bg-center bg-contain bg-no-repeat" style={{ backgroundImage: 'url(/src/assets/shared_bg.png)' }}>
      <div className="bg-white bg-opacity-90">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-700">🌾 Stock Management 🌾</h1>

        <div>
          {/* Navigation Buttons */}
          <div className="flex flex-start mb-6 space-x-4 items-center">
            <button
              onClick={() => handleNavigation('overview')}
              className="mr-4 p-2 bg-[#166534] text-white font-bold w-[160px] rounded-md transform transition-all duration-300 hover:scale-105 hover:bg-[#EAB308] hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#166534] focus:ring-opacity-50"
            >
              📊 Stock Overview
            </button>
            <button
              onClick={() => handleNavigation('addStock')}
              className="mr-4 p-2 bg-[#166534] text-white font-bold w-[160px] rounded-md transform transition-all duration-300 hover:scale-105 hover:bg-[#EAB308] hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#166534] focus:ring-opacity-50"
            >
              ➕ Add Stock
            </button>
            <button
              onClick={() => handleNavigation('charts')}
              className="mr-4 p-2 bg-[#166534] text-white font-bold w-[160px] rounded-md transform transition-all duration-300 hover:scale-105 hover:bg-[#EAB308] hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#166534] focus:ring-opacity-50"
            >
              📉 Charts
            </button>
          </div>
        </div>

        {/* Conditional Rendering Based on the Section */}
        {currentSection === 'overview' && (
          <StockTable stocks={stocks} setStocks={setStocks} />
        )}
        
        {currentSection === 'addStock' && (
          <StockForm setStocks={setStocks} />
        )}

        {currentSection === 'charts' && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">📊 Stock Analysis</h2>
            <StockAnalysisChart stocks={stocks} />
            <QuantityPriceChart stocks={stocks} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StockPage;
