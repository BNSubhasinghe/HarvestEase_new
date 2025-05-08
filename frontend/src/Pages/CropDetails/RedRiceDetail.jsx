import React from 'react';
import { useNavigate } from 'react-router-dom';
import redRiceImg from '../../assets/redrice.jpg';

const RedRiceDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={redRiceImg} alt="Red Rice" className="w-full h-80 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#1A512E] mb-4">Red Rice Paddy</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Red Rice is a traditional and nutritious paddy variety, popular for its health benefits. It grows well in moderate water conditions 
            and is often cultivated using organic farming methods. Rich in antioxidants, fiber, and iron, red rice is known for supporting 
            digestion and heart health.
            <br /><br />
            The grains have a distinct reddish-brown color and a nutty flavor, making them ideal for health-conscious meals.
            It is a resilient crop that can thrive in less fertile soils, making it valuable for sustainable agriculture.
          </p>
          <div className="flex justify-between mt-6">
            <button onClick={() => navigate(-1)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              ← Back to Crops
            </button>
            <button onClick={() => navigate('/crop-form')} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              ➕ Track Crop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedRiceDetail;
