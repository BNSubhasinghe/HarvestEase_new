import React from 'react';
import { useNavigate } from 'react-router-dom';
import sambaImg from '../../assets/samba.jpg';

const SambaDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={sambaImg} alt="Samba" className="w-full h-80 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#1A512E] mb-4">Samba Paddy</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Samba is a fragrant paddy type with fine grains that require a longer growth period compared to other varieties. 
            This paddy is well-known for its aroma, soft texture, and premium quality rice. Due to its longer cultivation time, 
            Samba is best suited for regions with consistent rainfall or access to irrigation.
            <br /><br />
            The cooked rice is soft, aromatic, and sticky, making it a favorite for festive occasions and traditional dishes in Sri Lanka.
            It is primarily grown during the Maha season for optimal yield and quality.
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

export default SambaDetail;
