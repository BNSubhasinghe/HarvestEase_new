import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import sharedBg from '../assets/shared_bg.png';  

const CropTable = () => {
  const [crops, setCrops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const response = await axios.get('http://localhost:5000/crops');
      setCrops(response.data.crops);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to fetch crops");
    }
  };

  const filteredCrops = crops.filter(crop =>
    crop.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.paddyType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/crops/delete/${id}`);
      toast.success("✅ Crop deleted!");
      fetchCrops();
    } catch (err) {
      console.error(err);
      toast.error("❌ Delete failed");
    }
  };

  const generatePDF = (crops) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Crop Records Report', 14, 22);

    const columns = [
      "Farmer", "Paddy Type", "Planted Date", "Area (ha)",
      "Phone", "Fertilize Date", "Harvest Date",
    ];

    const rows = crops.map(crop => [
      crop.farmerName,
      crop.paddyType,
      crop.plantedDate,
      crop.landArea,
      crop.phoneNumber,
      crop.fertilizationDate,
      crop.harvestDate,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 30,
    });

    doc.save('crop-records.pdf');
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-start p-6 relative"
      style={{
        backgroundImage: `url(${sharedBg})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white opacity-10 z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-6 text-[#1A512E] text-center bg-white bg-opacity-90 px-4 py-2 rounded shadow">
          Crop Records Table
        </h2>

        {/* Buttons Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          {/* Left: New + Charts */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/crop-form')}
              className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-800 transition"
            >
              ➕ New
            </button>

            <Link to="/crop-chart">
              <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition">
                View Crop Charts
              </button>
            </Link>
          </div>

          {/* Right: PDF + Search */}
          <div className="flex gap-4">
            <button
              onClick={() => generatePDF(crops)}
              className="bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-800 transition"
            >
              PDF
            </button>

            <input
              type="text"
              placeholder="Search Farmer or Paddy Type"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded w-64"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white bg-opacity-90 p-4 rounded-lg shadow-md overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-green-800">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="border p-2">Farmer</th>
                <th className="border p-2">Paddy Type</th>
                <th className="border p-2">Planted</th>
                <th className="border p-2">Area (ha)</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Fertilize</th>
                <th className="border p-2">Harvest</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCrops.map((crop) => (
                <tr key={crop._id} className="text-center">
                  <td className="border p-2">{crop.farmerName}</td>
                  <td className="border p-2">{crop.paddyType}</td>
                  <td className="border p-2">{crop.plantedDate}</td>
                  <td className="border p-2">{crop.landArea}</td>
                  <td className="border p-2">{crop.phoneNumber}</td>
                  <td className="border p-2">{crop.fertilizationDate}</td>
                  <td className="border p-2">{crop.harvestDate}</td>
                  <td className="border p-2">
                    <Link to={`/crop-update/${crop._id}`}>
                      <button className="bg-green-600 text-white px-2 py-1 rounded mr-2 hover:bg-green-800">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(crop._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ToastContainer position="top-center" />
      </div>
    </motion.div>
  );
};

export default CropTable;
