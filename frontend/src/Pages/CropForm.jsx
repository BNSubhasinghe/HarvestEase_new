import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import sharedBg from '../assets/shared_bg.png';  // Or your new file: '../assets/image.png'

const CropForm = () => {
  const [formData, setFormData] = useState({
    farmerName: '',
    paddyType: '',
    plantedDate: '',
    landArea: '',
    phoneNumber: '',
  });

  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({
    phoneNumber: '',
    landArea: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      const digitOnly = value.replace(/\D/g, '');
      if (digitOnly.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: digitOnly }));
        setErrors(prev => ({ ...prev, phoneNumber: '' }));
      }
      return;
    }

    if (name === 'landArea') {
      const parsed = parseFloat(value);
      if (value === '' || parsed > 0) {
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, landArea: '' }));
      } else {
        setErrors(prev => ({ ...prev, landArea: 'Land Area must be greater than 0' }));
      }
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { phoneNumber: '', landArea: '' };

    if (formData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
      valid = false;
    }

    const landValue = parseFloat(formData.landArea);
    if (isNaN(landValue) || landValue <= 0) {
      newErrors.landArea = 'Land Area must be greater than 0';
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      const response = await axios.post('http://localhost:5000/crops/add', formData);
      setResult(response.data.crops);
      toast.success("🌾 Crop data submitted successfully!");

      setFormData({
        farmerName: '',
        paddyType: '',
        plantedDate: '',
        landArea: '',
        phoneNumber: '',
      });
      setErrors({ phoneNumber: '', landArea: '' });

      setTimeout(() => {
        navigate('/crop-table');
      }, 1500);
    } catch (err) {
      console.error('Error:', err);
      toast.error("❌ Submission failed. Try again.");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${sharedBg})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Overlay for dimming effect */}
      <div className="absolute inset-0 bg-white opacity-10 z-0"></div>

      {/* Form container above overlay */}
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-md relative z-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#1A512E]">
          Crop Tracking Form
        </h2>

        <label className="block mb-2 font-semibold">Farmer Name</label>
        <input
          type="text"
          name="farmerName"
          value={formData.farmerName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="Enter your name"
          required
        />

        <label className="block mb-2 font-semibold">Paddy Type</label>
        <select
          name="paddyType"
          value={formData.paddyType}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          required
        >
          <option value="">Select Paddy Type</option>
          <option value="Nadu">Nadu</option>
          <option value="Samba">Samba</option>
          <option value="Red Rice">Red Rice</option>
          <option value="Bg 352">Bg 352</option>
          <option value="Suwandel">Suwandel</option>
          <option value="Pachchaperumal">Pachchaperumal</option>
        </select>

        <label className="block mb-2 font-semibold">Planted Date</label>
        <input
          type="date"
          name="plantedDate"
          value={formData.plantedDate}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          required
        />

        <label className="block mb-2 font-semibold">Land Area (Hectares)</label>
        <input
          type="number"
          name="landArea"
          value={formData.landArea}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 mb-1 ${errors.landArea ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter positive number"
          step="0.01"
          required
        />
        {errors.landArea && <p className="text-red-600 text-sm mb-3">{errors.landArea}</p>}

        <label className="block mb-2 font-semibold">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 mb-1 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="e.g. 0712345678"
          required
        />
        {errors.phoneNumber && <p className="text-red-600 text-sm mb-3">{errors.phoneNumber}</p>}

        <button
          type="submit"
          className="bg-[#1A512E] hover:bg-green-800 text-white font-bold py-2 px-4 rounded w-full"
        >
          Submit
        </button>

        {result && (
          <div className="mt-6 p-4 bg-green-50 rounded text-green-800">
            <p><strong>Fertilization Date:</strong> {result.fertilizationDate}</p>
            <p><strong>Harvest Date:</strong> {result.harvestDate}</p>
          </div>
        )}

        <ToastContainer position="top-center" />
      </form>
    </motion.div>
  );
};

export default CropForm;
