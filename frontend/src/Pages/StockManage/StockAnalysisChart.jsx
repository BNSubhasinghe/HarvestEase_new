import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockAnalysisChart = ({ stocks }) => {
  // Filter stocks by crop type (Rice and Paddy)
  const riceStocks = stocks.filter(stock => stock.cropType === 'rice');
  const paddyStocks = stocks.filter(stock => stock.cropType === 'paddy');

  const createChartData = (data) => ({
    labels: data.map(stock => stock.variety),
    datasets: [
      {
        label: 'Quantity',
        data: data.map(stock => stock.quantity),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  });

  return (
    <div className="mb-8 flex flex-row justify-around items-center w-full">
      {/* Rice chart */}
      <div className="mb-8 w-1/2 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Rice: Stock Quantity Analysis</h2>
        <div style={{ position: 'relative', width: '80%', height: '300px' }}>
          <Line data={createChartData(riceStocks)} />
        </div>
      </div>

      {/* Paddy chart */}
      <div className="mb-8 w-1/2 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Paddy: Stock Quantity Analysis</h2>
        <div style={{ position: 'relative', width: '80%', height: '300px' }}>
          <Line data={createChartData(paddyStocks)} />
        </div>
      </div>
    </div>
  );
};

export default StockAnalysisChart;
