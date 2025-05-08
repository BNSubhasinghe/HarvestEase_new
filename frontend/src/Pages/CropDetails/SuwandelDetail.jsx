import React from 'react';
import { useNavigate } from 'react-router-dom';
import suwandelImg from '../../assets/suwandel.jpg';

const SuwandelDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={suwandelImg} alt="Suwandel" className="w-full h-80 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#1A512E] mb-4">Suwandel Paddy</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Suwandel is a highly aromatic and premium paddy variety cultivated using organic methods. Known for its unique fragrance and soft texture,
            Suwandel rice is considered a delicacy, often reserved for special occasions and traditional dishes in Sri Lanka.
            <br /><br />
            It requires careful cultivation and thrives in well-drained soils with moderate water supply. Suwandel is valued for its health benefits 
            and is free from synthetic fertilizers or pesticides.
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

export default SuwandelDetail;
