import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, Legend,
  Cell, ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import sharedBg from '../assets/shared_bg.png'; // ✅ Background

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CF6', '#FF6FCF'];

const CropChart = () => {
  const [cropData, setCropData] = useState([]);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const response = await axios.get('http://localhost:5000/crops');
      setCropData(response.data.crops);
    } catch (err) {
      console.error(err);
    }
  };

  const landAreaData = cropData.reduce((acc, crop) => {
    const existing = acc.find(item => item.paddyType === crop.paddyType);
    if (existing) {
      existing.landArea += parseFloat(crop.landArea);
    } else {
      acc.push({ paddyType: crop.paddyType, landArea: parseFloat(crop.landArea) });
    }
    return acc;
  }, []);

  const cropCountData = cropData.reduce((acc, crop) => {
    const existing = acc.find(item => item.paddyType === crop.paddyType);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ paddyType: crop.paddyType, count: 1 });
    }
    return acc;
  }, []);

  return (
    <motion.div
      className="min-h-screen p-6 flex flex-col items-center relative"
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

      {/* Chart Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6 text-white bg-black bg-opacity-60 px-4 py-2 rounded shadow">
          Crop Data Charts
        </h2>

        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md max-w-6xl w-full flex flex-col md:flex-row gap-6">
          {/* Bar Chart - Left */}
          <div className="w-full md:w-1/2 h-96">
            <h3 className="text-xl font-semibold text-center mb-4 text-green-800">Land Area by Paddy Type</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={landAreaData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <XAxis
                  dataKey="paddyType"
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                  height={80}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar dataKey="landArea" fill="#1A512E" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Right */}
          <div className="w-full md:w-1/2 h-96">
            <h3 className="text-xl font-semibold text-center mb-4 text-green-800">Crop Count by Paddy Type</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cropCountData}
                  dataKey="count"
                  nameKey="paddyType"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                  labelLine={false}
                >
                  {cropCountData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CropChart;
