import React, { useState } from 'react';
import StockModal from './StockModal'; // The modal to display all data for viewing or editing
import axios from 'axios';
import { jsPDF } from 'jspdf'; // Import jsPDF library

const StockTable = ({ stocks, setStocks }) => {
  const [selectedStock, setSelectedStock] = useState(null); // For storing the selected row
  const [showModal, setShowModal] = useState(false); // For controlling modal visibility
  const [isEditing, setIsEditing] = useState(false); // For controlling if it's in Edit mode
  const [searchQuery, setSearchQuery] = useState(''); // For storing the search query

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

  // Filter stocks based on search query
  const filteredStocks = stocks.filter((stock) => {
    return (
      stock.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.cropType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.quantity.toString().includes(searchQuery) ||
      stock.price.toString().includes(searchQuery)
    );
  });

  // Generate PDF function
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Stock List', 14, 16);

    let yPosition = 30; // Start from 30 on Y axis

    // Add table header
    doc.setFontSize(12);
    doc.text('Farmer Name', 14, yPosition);
    doc.text('Crop Type', 50, yPosition);
    doc.text('Variety', 90, yPosition);
    doc.text('Quantity', 130, yPosition);
    doc.text('Price', 170, yPosition);
    yPosition += 10;

    // Add each stock entry to the PDF
    filteredStocks.forEach((stock) => {
      doc.text(stock.farmerName, 14, yPosition);
      doc.text(stock.cropType, 50, yPosition);
      doc.text(stock.variety, 90, yPosition);
      doc.text(`${stock.quantity} ${stock.quantityUnit}`, 130, yPosition);
      doc.text(`Rs. ${stock.price}`, 170, yPosition);
      yPosition += 8;
    });

    // Save PDF to the user
    doc.save('stock-list.pdf');
  };

  return (
    <>
      <div className="w-[100%] flex  mt-[20px] justify-end">
        <div className="mb-4 w-[300px] relative top-[-65px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <table className="table-auto text-left text-indent-0 border border-[#eee] rounded-[12px] border-separate overflow-hidden rounded-t-[12px] ">
          <thead className="bg-green-700 text-white">
            <tr className="rounded-t-[12px] overflow-hidden">
              <th className="px-4 py-2 rounded-tl-[12px] pt-0"><p className="pt-2">Farmer Name</p></th>
              <th className="px-4 py-2">Crop Type</th>
              <th className="px-4 py-2">Variety</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2 rounded-tr-[12px] pt-0"><p className="pt-2">Actions</p></th> {/* Action column */}
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map((stock) => (
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
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(stock)}
                    className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(stock._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to generate and download PDF */}
      <div className="flex justify-end mt-4">
        <button
          onClick={generatePDF}
          className="bg-green-500 text-white p-2 rounded-md"
        >
          Download PDF
        </button>
      </div>

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
