import React, { useState } from 'react';
import StockModal from './StockModal';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion'; // Install using: npm install framer-motion
import { FaSearch, FaEye, FaEdit, FaTrash, FaFilePdf, FaFilter, FaSortAmountDown } from 'react-icons/fa'; // Install using: npm install react-icons

const StockTable = ({ stocks, setStocks }) => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('farmerName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [cropTypeFilter, setCropTypeFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, id: null });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const initiateDelete = (id) => {
    setDeleteConfirmation({ show: true, id });
  };

  const confirmDelete = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`http://localhost:5000/api/delete-stock/${deleteConfirmation.id}`);

      if (response.status === 200) {
        const updatedStocks = await axios.get('http://localhost:5000/api/get-stocks');
        setStocks(updatedStocks.data);
      }
    } catch (error) {
      console.error('Error deleting stock:', error);
    } finally {
      setIsLoading(false);
      setDeleteConfirmation({ show: false, id: null });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ show: false, id: null });
  };

  const handleEdit = (stock) => {
    setSelectedStock(stock);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleView = (stock) => {
    setSelectedStock(stock);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleStockUpdate = async (updatedStock) => {
    try {
      // Start loading state
      setIsLoading(true);
      
      console.log("Sending update request with data:", updatedStock);
      
      // Make API call to update the stock
      const response = await axios.put(
        `http://localhost:5000/api/update-stock/${updatedStock._id}`, 
        updatedStock
      );
      
      if (response.status === 200) {
        // Refresh stocks after successful update
        const refreshResponse = await axios.get('http://localhost:5000/api/get-stocks');
        setStocks(refreshResponse.data);
        
        // Show success notification if you have one
        // setNotification({ type: 'success', message: 'Stock updated successfully' });
        
        // Close the modal
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error updating stock:", error);
      // Show error notification if you have one
      // setNotification({ type: 'error', message: 'Failed to update stock' });
    } finally {
      // End loading state
      setIsLoading(false);
    }
  };

  const getFilteredAndSortedStocks = () => {
    let result = stocks.filter((stock) => {
      const matchesSearch = 
        stock.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.cropType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.quantity.toString().includes(searchQuery) ||
        stock.price.toString().includes(searchQuery);
      
      const matchesCropType = cropTypeFilter === 'all' || stock.cropType === cropTypeFilter;
      
      return matchesSearch && matchesCropType;
    });

    result.sort((a, b) => {
      if (['quantity', 'price'].includes(sortField)) {
        return sortDirection === 'asc' 
          ? a[sortField] - b[sortField]
          : b[sortField] - a[sortField];
      }
      
      return sortDirection === 'asc'
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField]);
    });

    return result;
  };

  const filteredStocks = getFilteredAndSortedStocks();

  const generatePDF = () => {
    setIsLoading(true);
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    doc.setFontSize(20);
    doc.setTextColor(39, 103, 73);
    doc.text('HarvestEase Stock Report', pageWidth/2, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    const today = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    doc.text(`Generated on: ${today}`, pageWidth/2, 30, { align: 'center' });

    doc.setDrawColor(39, 103, 73);
    doc.line(14, 35, pageWidth - 14, 35);

    let yPosition = 45;
    
    doc.setFillColor(39, 103, 73);
    doc.setDrawColor(255, 255, 255);
    doc.rect(14, yPosition-5, pageWidth-28, 10, 'FD');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.text('Farmer Name', 20, yPosition);
    doc.text('Crop Type', 65, yPosition);
    doc.text('Variety', 100, yPosition);
    doc.text('Quantity', 135, yPosition);
    doc.text('Price (Rs)', 170, yPosition);
    
    yPosition += 10;
    
    doc.setTextColor(60, 60, 60);
    
    let alternate = false;
    filteredStocks.forEach((stock) => {
      if (alternate) {
        doc.setFillColor(240, 240, 240);
        doc.rect(14, yPosition-5, pageWidth-28, 8, 'F');
      }
      alternate = !alternate;
      
      doc.text(stock.farmerName.substring(0, 15), 20, yPosition);
      doc.text(stock.cropType, 65, yPosition);
      doc.text(stock.variety.substring(0, 12), 100, yPosition);
      doc.text(`${stock.quantity} ${stock.quantityUnit}`, 135, yPosition);
      doc.text(`${stock.price}`, 170, yPosition);
      yPosition += 8;
      
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
        alternate = false;
      }
    });
    
    const lastPage = doc.internal.getNumberOfPages();
    doc.setPage(lastPage);
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(`Total Items: ${filteredStocks.length}`, pageWidth/2, 280, { align: 'center' });
    doc.text('HarvestEase © 2025', pageWidth/2, 287, { align: 'center' });

    doc.save('HarvestEase-Stock-Report.pdf');
    setIsLoading(false);
  };

  const cropTypes = ['all', ...new Set(stocks.map(stock => stock.cropType))];

  const renderSortArrow = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <motion.div 
      className="p-6 max-w-[1200px] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Stock Inventory</h2>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-lg shadow-md">
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stocks..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition duration-200"
            >
              <FaFilter className="text-green-600" />
              <span>Filter by Crop Type</span>
            </button>
            
            {showFilterDropdown && (
              <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                {cropTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => {
                      setCropTypeFilter(type);
                      setShowFilterDropdown(false);
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      cropTypeFilter === type ? 'bg-green-100 font-medium' : ''
                    }`}
                  >
                    {type === 'all' ? 'All Crops' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={generatePDF}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 disabled:bg-gray-400"
          >
            <FaFilePdf />
            <span>{isLoading ? 'Generating...' : 'Export to PDF'}</span>
          </button>
        </div>
      </div>
      
      <div className="mb-4 text-sm">
        <span className="font-medium">{filteredStocks.length}</span> 
        <span className="text-gray-600"> stocks found</span>
        {cropTypeFilter !== 'all' && (
          <span className="text-gray-600"> filtered by <span className="font-medium">{cropTypeFilter}</span></span>
        )}
        {searchQuery && (
          <span className="text-gray-600"> matching "<span className="font-medium">{searchQuery}</span>"</span>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredStocks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th 
                    onClick={() => handleSort('farmerName')}
                    className="px-6 py-4 text-left text-sm font-medium cursor-pointer hover:bg-green-600 transition duration-200"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Farmer Name</span>
                      <span>{renderSortArrow('farmerName')}</span>
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('cropType')}
                    className="px-6 py-4 text-left text-sm font-medium cursor-pointer hover:bg-green-600 transition duration-200"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Crop Type</span>
                      <span>{renderSortArrow('cropType')}</span>
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('variety')}
                    className="px-6 py-4 text-left text-sm font-medium cursor-pointer hover:bg-green-600 transition duration-200"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Variety</span>
                      <span>{renderSortArrow('variety')}</span>
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('quantity')}
                    className="px-6 py-4 text-left text-sm font-medium cursor-pointer hover:bg-green-600 transition duration-200"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Quantity</span>
                      <span>{renderSortArrow('quantity')}</span>
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('price')}
                    className="px-6 py-4 text-left text-sm font-medium cursor-pointer hover:bg-green-600 transition duration-200"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Price (Rs)</span>
                      <span>{renderSortArrow('price')}</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStocks.map((stock, index) => (
                  <motion.tr
                    key={stock._id}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ backgroundColor: 'rgba(243, 244, 246, 1)' }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stock.farmerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{stock.cropType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{stock.variety}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span className="font-medium">{stock.quantity}</span> {stock.quantityUnit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span className="font-medium">Rs. {stock.price}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 space-x-1">
                      <button
                        onClick={() => handleView(stock)}
                        className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-200 inline-flex items-center"
                        title="View details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleEdit(stock)}
                        className="bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition duration-200 inline-flex items-center"
                        title="Edit stock"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => initiateDelete(stock._id)}
                        className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition duration-200 inline-flex items-center"
                        title="Delete stock"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="text-gray-500 mb-4">No stocks found</div>
            <div className="text-sm text-gray-500">
              {searchQuery || cropTypeFilter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Add some stocks to get started'}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <StockModal
            stock={selectedStock}
            isEditing={isEditing}
            setStocks={setStocks}
            closeModal={() => setShowModal(false)}
            onSave={handleStockUpdate}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirmation.show && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this stock item? This action cannot be undone.</p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-200"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200 flex items-center space-x-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <FaTrash size={14} />
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StockTable;