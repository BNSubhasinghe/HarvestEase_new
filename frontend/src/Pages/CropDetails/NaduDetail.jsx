import React from 'react';
import { useNavigate } from 'react-router-dom';
import naduImg from '../../assets/nadu.jpg';

const NaduDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={naduImg} alt="Nadu" className="w-full h-80 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#1A512E] mb-4">Nadu Paddy</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Nadu is a widely cultivated paddy type in Sri Lanka, especially in dry zones. It is known for its moderate growth period and high yield potential.
            This paddy variety is drought-tolerant, making it suitable for large-scale farming even with limited water availability. Farmers prefer Nadu for its
            reliable harvest and adaptability to different soil types.
            <br /><br />
            The grains are medium in size, and the rice has a slightly firm texture when cooked, making it ideal for daily consumption. Due to its popularity,
            Nadu is often grown during both Yala and Maha seasons.
          </p>

          {/* 🔙 Back Button + ➡️ Track Crop Button */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate(-1)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              ← Back to Crops
            </button>

            <button
              onClick={() => navigate('/crop-form')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"

            >
              ➕ Track Crop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaduDetail;
