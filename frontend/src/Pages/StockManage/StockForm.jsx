// src/Pages/StockManage/StockForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const StockForm = ({ setStocks }) => {
  const [formData, setFormData] = useState({
    farmerId: '',
    farmerName: '',
    farmerEmail: '',
    cropType: 'paddy',
    variety: '',
    quantity: '',
    quantityUnit: 'kg',
    price: '',
    stockDate: new Date().toISOString().slice(0, 10),  // default to today
    moistureLevel: '',
    harvestedDate: '',
    storageTemperature: '',
    storageHumidity: '',
    processingType: '',
    packagingType: '',
    bestBeforeDate: '',
    storageLocation: '',
    qualityGrade: 'A',
    status: 'Available',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/add-stock', formData);
      if (response.status === 200) {
        setStocks((prevStocks) => [...prevStocks, response.data]);
        alert('Stock added successfully');
        setFormData({ // Reset form after successful submission
          farmerId: '',
          farmerName: '',
          farmerEmail: '',
          cropType: 'paddy',
          variety: '',
          quantity: '',
          quantityUnit: 'kg',
          price: '',
          stockDate: new Date().toISOString().slice(0, 10),
          moistureLevel: '',
          harvestedDate: '',
          storageTemperature: '',
          storageHumidity: '',
          processingType: '',
          packagingType: '',
          bestBeforeDate: '',
          storageLocation: '',
          qualityGrade: 'A',
          status: 'Available',
          description: '',
        });
      }
    } catch (error) {
      console.error('Error adding stock:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mb-8 p-6 bg-white shadow-md rounded-lg">
      {/* General Info */}
      <div>
        <label className="block">Farmer Name</label>
        <input
          type="text"
          name="farmerName"
          value={formData.farmerName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter farmer's name"
          required
        />
      </div>

      <div>
        <label className="block">Farmer ID</label>
        <input
          type="text"
          name="farmerId"
          value={formData.farmerId}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter farmer's ID"
          required
        />
      </div>

      <div>
        <label className="block">Farmer Email</label>
        <input
          type="email"
          name="farmerEmail"
          value={formData.farmerEmail}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter farmer's email"
          required
        />
      </div>

      <div>
        <label className="block">Item Type</label>
        <select
          name="cropType"
          value={formData.cropType}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="paddy">Paddy</option>
          <option value="rice">Rice</option>
        </select>
      </div>

      {/* Variety Name */}
      <div>
        <label className="block">Variety Name</label>
        <input
          type="text"
          name="variety"
          value={formData.variety}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter variety name (e.g., Samba, Nadu)"
        />
      </div>

      {/* Quantity */}
      <div>
        <label className="block">Quantity</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter quantity"
          />
          <select
            name="quantityUnit"
            value={formData.quantityUnit}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="kg">kg</option>
            <option value="MT">MT</option>
          </select>
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="block">Price per Unit</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter price per unit"
          />
          <span className="p-2 border border-gray-300 rounded-md">Rs. per kg</span>
        </div>
      </div>

      {/* Stock Added Date */}
      <div>
        <label className="block">Stock Added Date</label>
        <input
          type="date"
          name="stockDate"
          value={formData.stockDate}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Specific Info for Paddy */}
      {formData.cropType === 'paddy' && (
        <>
          <div>
            <label className="block">Moisture Level (%)</label>
            <input
              type="number"
              name="moistureLevel"
              value={formData.moistureLevel}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter moisture level"
            />
          </div>

          <div>
            <label className="block">Harvested Date</label>
            <input
              type="date"
              name="harvestedDate"
              value={formData.harvestedDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block">Storage Temperature (°C)</label>
            <input
              type="number"
              name="storageTemperature"
              value={formData.storageTemperature}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter storage temperature"
            />
          </div>

          <div>
            <label className="block">Storage Humidity (%)</label>
            <input
              type="number"
              name="storageHumidity"
              value={formData.storageHumidity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter storage humidity"
            />
          </div>
        </>
      )}

      {/* Specific Info for Rice */}
      {formData.cropType === 'rice' && (
        <>
          <div>
            <label className="block">Processing Type</label>
            <select
              name="processingType"
              value={formData.processingType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="raw">Raw</option>
              <option value="parboiled">Parboiled</option>
              <option value="polished">Polished</option>
            </select>
          </div>

          <div>
            <label className="block">Packaging Type</label>
            <select
              name="packagingType"
              value={formData.packagingType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="sack">Sack</option>
              <option value="box">Box</option>
              <option value="loose">Loose</option>
            </select>
          </div>

          <div>
            <label className="block">Best Before Date (optional)</label>
            <input
              type="date"
              name="bestBeforeDate"
              value={formData.bestBeforeDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </>
      )}

      {/* Inventory Details */}
      <div>
        <label className="block">Storage Location</label>
        <input
          type="text"
          name="storageLocation"
          value={formData.storageLocation}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter storage location"
        />
      </div>

      <div>
        <label className="block">Quality Grade</label>
        <select
          name="qualityGrade"
          value={formData.qualityGrade}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="premium">Premium</option>
          <option value="standard">Standard</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div>
        <label className="block">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="available">Available</option>
          <option value="soldOut">Sold Out</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div>
        <label className="block">Description / Notes</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter any description or notes"
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded-md">
        Add Stock
      </button>
    </form>
  );
};

export default StockForm;
