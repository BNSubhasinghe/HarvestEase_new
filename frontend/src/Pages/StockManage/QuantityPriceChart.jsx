// src/Pages/StockManage/QuantityPriceChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const QuantityPriceChart = ({ stocks }) => {
  const data = {
    labels: stocks.map(stock => stock.variety),
    datasets: [
      {
        label: 'Price vs Quantity',
        data: stocks.map(stock => stock.price),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Quantity vs Price Analysis</h2>
      <Bar data={data} />
    </div>
  );
};

export default QuantityPriceChart;
