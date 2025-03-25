// src/Pages/StockManage/StockPage.jsx
import React, { useState, useEffect } from 'react';
import StockForm from './StockForm';
import StockTable from './StockTable';
import StockHistory from './StockHistory'; 
import StockAnalysisChart from './StockAnalysisChart';
import QuantityPriceChart from './QuantityPriceChart';
import axios from 'axios';

const StockPage = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Stock Management</h1>

      <StockForm setStocks={setStocks} />
      <StockHistory stocks={stocks} />
      <StockTable stocks={stocks} />
      <StockAnalysisChart stocks={stocks} />
      <QuantityPriceChart stocks={stocks} />
    </div>
  );
};

export default StockPage;
