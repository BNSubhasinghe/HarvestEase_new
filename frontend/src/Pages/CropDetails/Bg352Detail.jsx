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
            Bg 352 is a high-yield hybrid paddy variety developed for short-term cultivation. It matures quickly, 
            making it ideal for areas with limited growing seasons or farmers seeking faster harvest cycles. 
            This variety is resistant to common pests and diseases.
            <br /><br />
            The grains are slender and white, with good cooking quality and texture. Due to its efficiency and productivity, 
            Bg 352 is widely adopted by commercial farmers across Sri Lanka.
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

export default Bg352Detail;
