import axios from 'axios';
import React, { useState, useEffect } from 'react';

const StockModal = ({ stock, isEditing, setStocks, closeModal }) => {
  const [formData, setFormData] = useState({ ...stock });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("Stock Data Received:", stock);
    if (stock) {
      setFormData({ ...stock });
    }
  }, [stock]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
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
      const response = await axios.put(`http://localhost:5000/api/update-stock/${formData._id}`, dataToSubmit);
      if (response.status === 200) {
        const updatedStocks = await axios.get('http://localhost:5000/api/get-stocks');
        setStocks(updatedStocks.data);
        closeModal();
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
      setStocks(updatedStocks.data);
      closeModal();
      alert('Stock deleted successfully');
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 mt-16">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl overflow-y-auto max-h-[80vh]">
        <h2 className="text-3xl font-semibold mb-6 text-center">View or Edit Stock Details</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold">Farmer Name:</p>
              <input
                type="text"
                name="farmerName"
                value={formData.farmerName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter farmer's name"
                disabled={!isEditing}
              />
              {errors.farmerName && <p className="text-red-500">{errors.farmerName}</p>}
            </div>

            <div>
              <p className="font-bold">Farmer Email:</p>
              <input
                type="email"
                name="farmerEmail"
                value={formData.farmerEmail}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter farmer's email"
                disabled={!isEditing}
              />
              {errors.farmerEmail && <p className="text-red-500">{errors.farmerEmail}</p>}
            </div>

            <div>
              <p className="font-bold">Crop Type:</p>
              <input
                type="text"
                name="cropType"
                value={formData.cropType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled={!isEditing}
              />
            </div>

            <div>
              <p className="font-bold">Variety:</p>
              <input
                type="text"
                name="variety"
                value={formData.variety}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled={!isEditing}
              />
              {errors.variety && <p className="text-red-500">{errors.variety}</p>}
            </div>

            <div>
  <p className="font-bold">Quantity:</p>
  <input
    type="number"
    name="quantity"
    value={formData.quantity}
    onChange={(e) => {
      const value = e.target.value;
      // Prevent setting a negative quantity
      if (value >= 0 || value === '') {
        handleChange(e);
      }
    }}
    className="w-full p-2 border border-gray-300 rounded-md"
    disabled={!isEditing}
  />
  {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
</div>


            <div>
  <p className="font-bold">Price:</p>
  <input
    type="number"
    name="price"
    value={formData.price}
    onChange={(e) => {
      const value = e.target.value;
      // Prevent setting a negative price
      if (value >= 0 || value === '') {
        handleChange(e);
      }
    }}
    className="w-full p-2 border border-gray-300 rounded-md"
    disabled={!isEditing}
  />
  {errors.price && <p className="text-red-500">{errors.price}</p>}
</div>


            <div>
              <p className="font-bold">Stock Date:</p>
              <input
                type="date"
                name="stockDate"
                value={formatDate(formData.stockDate)}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled={!isEditing}
              />
              {errors.stockDate && <p className="text-red-500">{errors.stockDate}</p>}
            </div>

            {/* Additional fields for Paddy and Rice */}
            {formData.cropType === 'paddy' && (
              <>
                <div>
                  <p className="font-bold">Moisture Level:</p>
                  <input
                    type="number"
                    name="moistureLevel"
                    value={formData.moistureLevel}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <p className="font-bold">Harvested Date:</p>
                  <input
                    type="date"
                    name="harvestedDate"
                    value={formatDate(formData.harvestedDate)}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <p className="font-bold">Storage Temperature:</p>
                  <input
                    type="number"
                    name="storageTemperature"
                    value={formData.storageTemperature}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <p className="font-bold">Storage Humidity:</p>
                  <input
                    type="number"
                    name="storageHumidity"
                    value={formData.storageHumidity}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    disabled={!isEditing}
                  />
                </div>
              </>
            )}

            {formData.cropType === 'rice' && (
              <>
                <div>
                  <p className="font-bold">Processing Type:</p>
                  <input
                    type="text"
                    name="processingType"
                    value={formData.processingType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <p className="font-bold">Packaging Type:</p>
                  <input
                    type="text"
                    name="packagingType"
                    value={formData.packagingType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    disabled={!isEditing}
                  />
                </div>
              </>
            )}

            <div>
              <p className="font-bold">Storage Location:</p>
              <input
                type="text"
                name="storageLocation"
                value={formData.storageLocation}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled={!isEditing}
              />
            </div>

            <div>
              <p className="font-bold">Quality Grade:</p>
              <input
                type="text"
                name="qualityGrade"
                value={formData.qualityGrade}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled={!isEditing}
              />
            </div>

            <div>
              <p className="font-bold">Status:</p>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled={!isEditing}
              />
            </div>

            <div className="col-span-2">
              <p className="font-bold">Description:</p>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md w-full mr-2"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white p-2 rounded-md w-full ml-2"
              >
                Delete Stock
              </button>
            </div>
          )}

          {/* Close Button */}
          <div className="mt-4 text-right">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white p-2 rounded-md"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockModal;
