// src/Pages/StockManage/StockTable.jsx
import React from 'react';

const StockTable = ({ stocks }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Stock Overview</h2>
    <table className="table-auto w-full text-sm">
      <thead>
        <tr>
          <th className="px-4 py-2">Crop Type</th>
          <th className="px-4 py-2">Variety</th>
          <th className="px-4 py-2">Quantity</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Storage Location</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock, index) => (
          <tr key={index}>
            <td className="px-4 py-2">{stock.cropType}</td>
            <td className="px-4 py-2">{stock.variety}</td>
            <td className="px-4 py-2">{stock.quantity}</td>
            <td className="px-4 py-2">{stock.price}</td>
            <td className="px-4 py-2">{stock.storageLocation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default StockTable;
