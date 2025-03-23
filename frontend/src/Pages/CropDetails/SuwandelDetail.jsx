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
            Suwandel is a premium aromatic paddy variety, traditionally grown with organic methods. 
            It is prized for its rich aroma, soft texture, and nutritional benefits. 
            The grains are long, slender, and slightly sticky when cooked.
            <br /><br />
            Suwandel requires fertile soil and careful cultivation, making it a choice for small-scale specialty farming. 
            Its rice is highly sought after for festive meals and export markets due to its unique taste and fragrance.
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

export default SuwandelDetail;
