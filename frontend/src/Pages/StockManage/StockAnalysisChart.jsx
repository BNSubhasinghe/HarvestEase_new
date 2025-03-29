// src/Pages/StockManage/StockAnalysisChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockAnalysisChart = ({ stocks }) => {
  const data = {
    labels: stocks.map(stock => stock.variety),
    datasets: [
      {
        label: 'Quantity',
        data: stocks.map(stock => stock.quantity),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Stock Quantity Analysis</h2>
      <Line data={data} />
    </div>
  );
};

export default StockAnalysisChart;
