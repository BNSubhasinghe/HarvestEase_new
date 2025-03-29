import React from 'react';

const StockTable = ({ stocks }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Stock Overview</h2>
    <table className="table-auto w-full text-sm border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 border border-gray-300">Farmer ID</th>
          <th className="px-4 py-2 border border-gray-300">Farmer Name</th>
          <th className="px-4 py-2 border border-gray-300">Farmer Email</th>
          <th className="px-4 py-2 border border-gray-300">Crop Type</th>
          <th className="px-4 py-2 border border-gray-300">Variety</th>
          <th className="px-4 py-2 border border-gray-300">Quantity</th>
          <th className="px-4 py-2 border border-gray-300">Price</th>
          <th className="px-4 py-2 border border-gray-300">Storage Location</th>
          <th className="px-4 py-2 border border-gray-300">Stock Date</th>
          <th className="px-4 py-2 border border-gray-300">Quality Grade</th>
          <th className="px-4 py-2 border border-gray-300">Status</th>
          <th className="px-4 py-2 border border-gray-300">Description</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock, index) => (
          <tr key={index} className="border border-gray-300">
            <td className="px-4 py-2 border border-gray-300">{stock.farmerId}</td>
            <td className="px-4 py-2 border border-gray-300">{stock.farmerName}</td>
            <td className="px-4 py-2 border border-gray-300">{stock.farmerEmail}</td>
            <td className="px-4 py-2 border border-gray-300">{stock.cropType}</td>
            <td className="px-4 py-2 border border-gray-300">{stock.variety}</td>
            <td className="px-4 py-2 border border-gray-300">{stock.quantity} {stock.quantityUnit}</td>
            <td className="px-4 py-2 border border-gray-300">{stock.price} Rs</td>
            <td className="px-4 py-2 border border-gray-300">{stock.storageLocation}</td>
            <td className="px-4 py-2 border border-gray-300">{stock.stockDate}</td>
            <td className="px-4 py-2 border border-gray-300">{stock.qualityGrade}</td>
            <td className="px-4 py-2 border border-gray-300">{stock.status}</td>
            <td className="px-4 py-2 border border-gray-300">{stock.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default StockTable;
