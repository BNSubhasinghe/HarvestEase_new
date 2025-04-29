import React from 'react';
import { useNavigate } from 'react-router-dom';
import pachchaImg from '../../assets/pachcha.jpg';

const PachchaDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={pachchaImg} alt="Pachchaperumal" className="w-full h-80 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#1A512E] mb-4">Pachchaperumal Paddy</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Pachchaperumal is a traditional red rice variety rich in fiber, minerals, and antioxidants. It is a resilient crop that grows well with minimal 
            inputs, making it ideal for eco-friendly and organic farming. Its health benefits include improved digestion and reduced risk of chronic diseases.
            <br /><br />
            The rice has a distinct earthy flavor and is highly nutritious, often recommended for those seeking wholesome, unprocessed grains.
            Pachchaperumal is cherished for its cultural significance and sustainability.
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

export default PachchaDetail;
