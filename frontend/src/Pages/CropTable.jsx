import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import { FaEdit, FaTrashAlt, FaDownload } from 'react-icons/fa';

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
      toast.error('❌ Failed to fetch crops');
    }
  };

  const filteredCrops = crops.filter(
    (crop) =>
      crop.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.paddyType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this crop record?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/crops/delete/${id}`);
      toast.success('✅ Crop deleted successfully!');
      fetchCrops();
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to delete crop');
    }
  };

  const generateSinglePDF = (crop, index = 0) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(34, 34, 34);
    doc.setFont('helvetica', 'bold');
    doc.text('CROP TRACKING REPORT', 105, 20, { align: 'center' });
    doc.setDrawColor(34, 102, 34);
    doc.line(20, 25, 190, 25);

    doc.setFontSize(14);
    doc.setTextColor(0, 100, 0);
    doc.text('Farmer Information', 20, 35);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Farmer Name: ${crop.farmerName}`, 20, 45);
    doc.text(`Phone Number: ${crop.phoneNumber}`, 20, 52);
    doc.text(`Land Area: ${crop.landArea} ha`, 20, 59);
    doc.text(`Paddy Type: ${crop.paddyType}`, 20, 66);

    doc.setFontSize(14);
    doc.setTextColor(0, 100, 0);
    doc.text('Crop Tracking Details', 20, 80);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Planted Date: ${crop.plantedDate}`, 20, 90);
    doc.text(`Fertilization Date: ${crop.fertilizationDate}`, 20, 97);
    doc.text(`Harvest Date: ${crop.harvestDate}`, 20, 104);
    doc.text(`Tracking ID: ${crop._id}`, 20, 111);
    doc.text(`Generated On: ${new Date().toLocaleDateString()}`, 20, 118);

    const fileName = `Crop_Tracking_${crop.farmerName?.replace(/\s+/g, '_') || `Record_${index + 1}`}.pdf`;
    doc.save(fileName);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-start p-6 bg-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl font-bold mb-6 text-green-800 text-center px-4 py-2 rounded shadow">
          Crop Records Table
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/crop-form')}
              className="bg-green-700 text-white font-semibold px-4 py-2 rounded hover:bg-green-800 transition"
            >
              Add New
            </button>
            <Link to="/crop-chart">
              <button className="bg-yellow-500 text-green-900 font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition">
                View Charts
              </button>
            </Link>
          </div>

          <input
            type="text"
            placeholder="Search Farmer or Paddy Type"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-green-400 p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-green-300">
            <thead className="bg-green-800 text-yellow-300">
              <tr>
                <th className="border p-2 text-left">Farmer</th>
                <th className="border p-2 text-left">Paddy Type</th>
                <th className="border p-2 text-left">Planted</th>
                <th className="border p-2 text-left">Area (ha)</th>
                <th className="border p-2 text-left">Phone</th>
                <th className="border p-2 text-left">Fertilize</th>
                <th className="border p-2 text-left">Harvest</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCrops.map((crop, index) => (
                <tr key={crop._id} className="bg-white text-left">
                  <td className="border p-2">{crop.farmerName}</td>
                  <td className="border p-2">{crop.paddyType}</td>
                  <td className="border p-2">{crop.plantedDate}</td>
                  <td className="border p-2">{crop.landArea}</td>
                  <td className="border p-2">{crop.phoneNumber}</td>
                  <td className="border p-2">{crop.fertilizationDate}</td>
                  <td className="border p-2">{crop.harvestDate}</td>
                  <td className="border p-2">
                    <div className="flex gap-1 justify-center items-center flex-wrap">
                      <Link to={`/crop-update/${crop._id}`}>
                        <button className="flex items-center gap-1 bg-green-600 hover:bg-green-500 text-white text-sm px-2 py-1 rounded-full shadow-sm transition">
                          <FaEdit size={12} /> Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(crop._id)}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-400 text-white text-sm px-2 py-1 rounded-full shadow-sm transition"
                      >
                        <FaTrashAlt size={12} /> Delete
                      </button>
                      <button
                        onClick={() => generateSinglePDF(crop, index)}
                        className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-300 text-green-900 text-sm px-2 py-1 rounded-full shadow-sm transition"
                      >
                        <FaDownload size={12} /> PDF
                      </button>
                    </div>
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
