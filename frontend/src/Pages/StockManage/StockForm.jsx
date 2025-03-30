import axios from 'axios';
import React, { useState, useEffect } from 'react';
import sharedBg from '../../assets/shared_bg.png';

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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    if (!formData.farmerName) newErrors.farmerName = "Farmer Name is required";
    if (!formData.farmerId) newErrors.farmerId = "Farmer ID is required";
    if (!formData.farmerEmail) newErrors.farmerEmail = "Farmer Email is required";
    if (!formData.variety) newErrors.variety = "Variety Name is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (!formData.price) newErrors.price = "Price per Unit is required";
    if (!formData.stockDate) newErrors.stockDate = "Stock Date is required";
    if (!formData.storageLocation) newErrors.storageLocation = "Storage Location is required";
    if (!formData.qualityGrade) newErrors.qualityGrade = "Quality Grade is required";

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.farmerEmail && !emailRegex.test(formData.farmerEmail)) {
      newErrors.farmerEmail = "Please enter a valid email address";
    }

    // Numeric validation
    if (formData.quantity && isNaN(formData.quantity)) {
      newErrors.quantity = "Quantity must be a number";
    }
    if (formData.price && isNaN(formData.price)) {
      newErrors.price = "Price must be a number";
    }
    if (formData.storageTemperature && isNaN(formData.storageTemperature)) {
      newErrors.storageTemperature = "Storage Temperature must be a number";
    }
    if (formData.storageHumidity && isNaN(formData.storageHumidity)) {
      newErrors.storageHumidity = "Storage Humidity must be a number";
    }

    // Date validation
    const currentDate = new Date().toISOString().slice(0, 10);
    if (formData.stockDate && formData.stockDate > currentDate) {
      newErrors.stockDate = "Stock date cannot be in the future";
    }
    if (formData.harvestedDate && formData.harvestedDate > currentDate) {
      newErrors.harvestedDate = "Harvested date cannot be in the future";
    }
    if (formData.bestBeforeDate && formData.bestBeforeDate > currentDate) {
      newErrors.bestBeforeDate = "Best before date cannot be in the future";
    }

    // Validate rice-specific fields
    if (formData.cropType === 'rice') {
      if (!formData.processingType) newErrors.processingType = "Processing Type is required for rice";
      if (!formData.packagingType) newErrors.packagingType = "Packaging Type is required for rice";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Show an alert for each error as a popup message
      Object.values(validationErrors).forEach(error => alert(error));
      return;
    }

    // Prepare data for submission
    const dataToSubmit = { ...formData };

    // Conditionally omit processingType and packagingType if cropType is 'paddy'
    if (formData.cropType === 'paddy') {
      delete dataToSubmit.processingType;
      delete dataToSubmit.packagingType;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/add-stock', dataToSubmit);
      if (response.status === 200) {
        setStocks((prevStocks) => [...prevStocks, response.data]);
        alert('Stock added successfully');

        // Reset form after successful submission
        setFormData({
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
      alert('Failed to add stock. Please try again.');
    }

  };

  useEffect(() => {
    // Dynamically set background image for the body when component mounts
    document.body.style.backgroundImage = `url(${sharedBg})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';

    // Clean up when the component unmounts to reset background
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <form onSubmit={handleSubmit} className="space-y-6 mb-8 mt-8 p-6 bg-white opacity-85 shadow-md rounded-lg max-w-[700px] min-w-[500px]">
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
          />
          {errors.farmerName && <p className="text-red-500">{errors.farmerName}</p>}
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
          />
          {errors.farmerId && <p className="text-red-500">{errors.farmerId}</p>}
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
          />
          {errors.farmerEmail && <p className="text-red-500">{errors.farmerEmail}</p>}
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
          {errors.variety && <p className="text-red-500">{errors.variety}</p>}
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
          {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
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
              min="0"  
            />
            <span className="p-2 border border-gray-300 rounded-md">Rs. per kg</span>
          </div>
          {errors.price && <p className="text-red-500">{errors.price}</p>}
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
            max={new Date().toISOString().split("T")[0]} 
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
                max={new Date().toISOString().split("T")[0]} // Restrict future dates
                />
                {errors.harvestedDate && <p className="text-red-500">{errors.harvestedDate}</p>}
              
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
    </div>
  );
};

export default StockForm;
