import React from 'react';
import StockTable from './StockTable';

const StockHistory = ({ stocks }) => (
  <div className="p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-semibold mb-6">Stock History</h2>
    <StockTable stocks={stocks} />  {/* Reuse StockTable to show history */}
  </div>
);

export default StockHistory;
