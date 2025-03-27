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
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-700">🌾 Stock Management 🌾</h1>

      {/* Navigation Buttons */}
      <div className="flex justify-center mb-6 space-x-4">
        <button 
          onClick={() => handleNavigation('overview')}
          className="mr-4 p-2 bg-gray-700 text-white font-bold w-36 rounded-md"
        >
          📊 Stock Overview
        </button>
        <button 
          onClick={() => handleNavigation('addStock')}
          className="mr-4 p-2 bg-gray-700 text-white font-bold w-36 rounded-md"
        >
          ➕ Add Stock
        </button>
        <button 
          onClick={() => handleNavigation('charts')}
          className="mr-4 p-2 bg-gray-700 text-white font-bold w-36 rounded-md"
        >
          📉 Charts
        </button>
      </div>

      {/* Conditional Rendering Based on the Section */}
      {currentSection === 'overview' && (
        <StockTable stocks={stocks} />
      )}

      {currentSection === 'addStock' && (
        <StockForm setStocks={setStocks} />
      )}

      {currentSection === 'charts' && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">📊 Stock Analysis</h2>
          <StockAnalysisChart stocks={stocks} />
          <QuantityPriceChart stocks={stocks} />
        </div>
      )}
    </div>
  );
};

export default StockPage;
