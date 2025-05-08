import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg352Img from '../../assets/bg352.jpg';

const Bg352Detail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={bg352Img} alt="Bg 352" className="w-full h-80 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#1A512E] mb-4">Bg 352 Paddy</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Bg 352 is a hybrid paddy variety developed for short-term cultivation with high yield potential.
            It matures faster compared to traditional varieties and is ideal for farmers looking for quicker harvests.
            <br /><br />
            Its grains are long and slender, offering good cooking quality and taste. Bg 352 performs well in diverse
            soil conditions and is resistant to certain pests and diseases, making it a favorite among commercial farmers.
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

export default Bg352Detail;
