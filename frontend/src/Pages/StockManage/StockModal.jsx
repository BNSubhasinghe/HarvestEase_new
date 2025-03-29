import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockModal = ({ stock, isEditing, setStocks, closeModal }) => {
  const [formData, setFormData] = useState({ ...stock });

  useEffect(() => {
    if (stock) {
      setFormData({ ...stock });
    }
  }, [stock]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/update-stock/${formData._id}`, formData);
      if (response.status === 200) {
        const updatedStocks = await axios.get('http://localhost:5000/api/get-stocks');
        setStocks(updatedStocks.data); // Update the stock data after editing
        closeModal(); // Close the modal
        alert('Stock updated successfully');
      }
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-stock/${formData._id}`);
      const updatedStocks = await axios.get('http://localhost:5000/api/get-stocks');
      setStocks(updatedStocks.data); // Update the stock data after deletion
      closeModal(); // Close the modal
      alert('Stock deleted successfully');
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/2 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit Stock' : 'View Stock'}</h2>

        <form onSubmit={handleSubmit}>
          {/* Fields for stock details */}
          <div className="mb-4">
            <label className="block">Farmer Name</label>
            <input
              type="text"
              name="farmerName"
              value={formData.farmerName}
              onChange={handleChange}
              disabled={!isEditing} // Disable in view mode
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block">Farmer ID</label>
            <input
              type="text"
              name="farmerId"
              value={formData.farmerId}
              onChange={handleChange}
              disabled={!isEditing} // Disable in view mode
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block">Farmer Email</label>
            <input
              type="email"
              name="farmerEmail"
              value={formData.farmerEmail}
              onChange={handleChange}
              disabled={!isEditing} // Disable in view mode
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block">Crop Type</label>
            <input
              type="text"
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              disabled={!isEditing} // Disable in view mode
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block">Variety</label>
            <input
              type="text"
              name="variety"
              value={formData.variety}
              onChange={handleChange}
              disabled={!isEditing} // Disable in view mode
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              disabled={!isEditing} // Disable in view mode
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block">Quantity Unit</label>
            <input
              type="text"
              name="quantityUnit"
              value={formData.quantityUnit}
              onChange={handleChange}
              disabled={!isEditing} // Disable in view mode
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              disabled={!isEditing} // Disable in view mode
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block">Stock Date</label>
            <input
              type="date"
              name="stockDate"
              value={formData.stockDate}
              onChange={handleChange}
              disabled={!isEditing} // Disable in view mode
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block">Moisture Level</label>
            <input
              type="number"
              name="moistureLevel"
              value={formData.moistureLevel}
              onChange={handleChange}
              disabled={!isEditing} // Disable in view mode
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block">Harvested Date</label>
            <input
              type="date"
              name="harvestedDate"
              value={formData.harvestedDate}
              onChange={handleChange}
              disabled={!isEditing} // Disable in view mode
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block">Storage Temperature</label>
            <input
              type="number"
              name="storageTemperature"
              value={formData.storageTemperature}
              onChange={handleChange}
              disabled={!isEditing} // Disable in view mode
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block">Storage Humidity</label>
            <input
              type="number"
              name="storageHumidity"
              value={formData.storageHumidity}
              onChange={handleChange}
              disabled={!isEditing} // Disable in view mode
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Show Processing Type, Packaging Type only if crop is Rice */}
          {formData.cropType === 'rice' && (
            <>
              <div className="mb-4">
                <label className="block">Processing Type</label>
                <input
                  type="text"
                  name="processingType"
                  value={formData.processingType}
                  onChange={handleChange}
                  disabled={!isEditing} // Disable in view mode
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block">Packaging Type</label>
                <input
                  type="text"
                  name="packagingType"
                  value={formData.packagingType}
                  onChange={handleChange}
                  disabled={!isEditing} // Disable in view mode
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block">Best Before Date</label>
            <input
              type="date"
              name="bestBeforeDate"
              value={formData.bestBeforeDate}
              onChange={handleChange}
              disabled={!isEditing} // Disable in view mode
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block">Storage Location</label>
            <input
              type="text"
              name="storageLocation"
              value={formData.storageLocation}
              onChange={handleChange}
              disabled={!isEditing} // Disable in view mode
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block">Quality Grade</label>
            <input
              type="text"
              name="qualityGrade"
              value={formData.qualityGrade}
              onChange={handleChange}
              disabled={!isEditing} // Disable in view mode
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={!isEditing} // Disable in view mode
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={!isEditing} // Disable in view mode
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Show Edit and Delete buttons only if editing */}
          {isEditing && (
            <div className="flex justify-between mt-4">
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                Save Changes
              </button>
              <button type="button" onClick={handleDelete} className="bg-red-500 text-white p-2 rounded-md">
                Delete Stock
              </button>
            </div>
          )}

          <div className="mt-4 text-right">
            <button type="button" onClick={closeModal} className="bg-gray-500 text-white p-2 rounded-md">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockModal;
