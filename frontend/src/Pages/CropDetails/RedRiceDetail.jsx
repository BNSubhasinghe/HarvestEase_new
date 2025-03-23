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
            Red Rice is a traditional paddy variety known for its nutritional value and distinctive red bran layer. 
            It is rich in fiber, antioxidants, and essential nutrients, making it ideal for health-conscious consumers. 
            This variety requires less water and grows well in both wet and dry regions.
            <br /><br />
            The cooked rice has a nutty flavor and chewy texture, often used in traditional Sri Lankan meals. 
            Farmers favor Red Rice for its resilience, sustainability, and growing market demand for organic food.
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

export default RedRiceDetail;
