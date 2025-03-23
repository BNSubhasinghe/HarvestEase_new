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
            Pachchaperumal is a heritage red rice variety, known for its rich color, fiber, and nutrient content. 
            It is grown organically and revered in Sri Lankan culture for its health benefits and historical significance.
            <br /><br />
            The rice has a firm texture and earthy flavor, often used in traditional cuisine and wellness diets. 
            Pachchaperumal cultivation promotes biodiversity and supports sustainable agriculture practices.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            ← Back to Crops
          </button>
        </div>
      </div>
    </div>
  );
};

export default PachchaDetail;
