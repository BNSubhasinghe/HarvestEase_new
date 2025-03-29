import React, { useState } from 'react';
import StockModal from './StockModal'; // The modal to display all data for viewing or editing
import axios from 'axios';

const StockTable = ({ stocks, setStocks }) => {
  const [selectedStock, setSelectedStock] = useState(null); // For storing the selected row
  const [showModal, setShowModal] = useState(false); // For controlling modal visibility
  const [isEditing, setIsEditing] = useState(false); // For controlling if it's in Edit mode

  // Handle deleting the stock
  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to the backend to delete the stock by its ID
      const response = await axios.delete(`http://localhost:5000/api/delete-stock/${id}`);
      
      if (response.status === 200) {
        const updatedStocks = await axios.get('http://localhost:5000/api/get-stocks');
        setStocks(updatedStocks.data); // Update the stock data after deletion
      }
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  };
  

  // Handle editing the stock
  const handleEdit = (stock) => {
    setSelectedStock(stock);
    setIsEditing(true); // Set edit mode true
    setShowModal(true); // Open modal for editing
  };

  // Handle viewing the stock details
  const handleView = (stock) => {
    setSelectedStock(stock);
    setIsEditing(false); // Set edit mode false for view
    setShowModal(true); // Open modal for viewing
  };

  return (
    <>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Farmer Name</th>
            <th className="px-4 py-2">Crop Type</th>
            <th className="px-4 py-2">Variety</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th> {/* Action column */}
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock._id} className="border-b">
              <td className="px-4 py-2">{stock.farmerName}</td>
              <td className="px-4 py-2">{stock.cropType}</td>
              <td className="px-4 py-2">{stock.variety}</td>
              <td className="px-4 py-2">{stock.quantity} {stock.quantityUnit}</td>
              <td className="px-4 py-2">Rs. {stock.price}</td>
              <td className="px-4 py-2 flex space-x-2">
                {/* Action Buttons */}
                <button 
                  onClick={() => handleView(stock)} 
                  className="text-blue-500 hover:text-blue-700"
                >
                  View
                </button>
                <button 
                  onClick={() => handleEdit(stock)} 
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(stock._id)} 
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for viewing or editing */}
      {showModal && (
        <StockModal
          stock={selectedStock}
          isEditing={isEditing}
          setStocks={setStocks}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default StockTable;
