import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sharedBg from '../assets/shared_bg.png';  // ✅ Latest uploaded image

const CropUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    farmerName: '',
    paddyType: '',
    plantedDate: '',
    landArea: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({
    phoneNumber: '',
    landArea: '',
  });

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/crops/${id}`);
        setFormData(response.data.crop);
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to load crop data");
      }
    };

    fetchCrop();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: digits }));
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
      await axios.put(`http://localhost:5000/crops/update/${id}`, formData);
      toast.success("🌾 Crop updated successfully!");

      setTimeout(() => {
        navigate('/crop-table');
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error("❌ Update failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${sharedBg})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for dimming */}
      <div className="absolute inset-0 bg-white opacity-10 z-0"></div>

      {/* Form on top of overlay */}
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-md relative z-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#1A512E]">
          Update Crop Details
        </h2>

        <label className="block mb-2 font-semibold">Farmer Name</label>
        <input
          type="text"
          name="farmerName"
          value={formData.farmerName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
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
          required
        />
        {errors.phoneNumber && <p className="text-red-600 text-sm mb-3">{errors.phoneNumber}</p>}

        <button
          type="submit"
          className="bg-[#1A512E] hover:bg-green-800 text-white font-bold py-2 px-4 rounded w-full mt-4"
        >
          Update Crop
        </button>

        <ToastContainer position="top-center" />
      </form>
    </div>
  );
};

export default CropUpdate;
