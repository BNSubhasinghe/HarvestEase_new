import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const QuantityPriceChart = ({ stocks }) => {
  // Filter stocks by crop type
  const riceStocks = stocks.filter(stock => stock.cropType === 'rice');
  const paddyStocks = stocks.filter(stock => stock.cropType === 'paddy');

  const createChartData = (data) => ({
    labels: data.map(stock => stock.variety),
    datasets: [
      {
        label: 'Price vs Quantity',
        data: data.map(stock => stock.price),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',  // Pink
          'rgba(54, 162, 235, 0.5)',  // Blue
          'rgba(255, 206, 86, 0.5)',  // Yellow
          'rgba(75, 192, 192, 0.5)',  // Green
          'rgba(153, 102, 255, 0.5)', // Purple
          'rgba(255, 159, 64, 0.5)'   // Orange
        ],
        borderColor: [
          'rgb(255, 99, 132)',  // Pink
          'rgb(54, 162, 235)',  // Blue
          'rgb(255, 206, 86)',  // Yellow
          'rgb(75, 192, 192)',  // Green
          'rgb(153, 102, 255)', // Purple
          'rgb(255, 159, 64)'   // Orange
        ],
        borderWidth: 1,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mb-8 flex flex-row justify-around items-center w-full">
      {/* Rice chart */}
      <div className="mb-8 w-1/2 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Rice: Quantity vs Price Analysis</h2>
        <div style={{ position: 'relative', width: '80%', height: '300px' }}>
          <Bar data={createChartData(riceStocks)} options={options} />
        </div>
      </div>

      {/* Paddy chart */}
      <div className="mb-8 w-1/2 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Paddy: Quantity vs Price Analysis</h2>
        <div style={{ position: 'relative', width: '80%', height: '300px' }}>
          <Bar data={createChartData(paddyStocks)} options={options} />
        </div>
      </div>
    </div>
  );
};

export default QuantityPriceChart;
