import { Link } from 'react-router-dom';

const CropSidebar = () => {
  return (
    <div className="w-64 h-screen bg-green-50 text-green-900 p-6 shadow-md border-r border-green-200 rounded-tr-3xl rounded-br-3xl flex flex-col items-center">
      <h2 className="text-2xl font-extrabold mb-8 text-center">Crop Tracking</h2>

      <nav className="w-full flex flex-col gap-4">
        <Link
          to="/crop-form"
          className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow text-center font-medium transition"
        >
          Crop Form
        </Link>
        <Link
          to="/crop-table"
          className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow text-center font-medium transition"
        >
          Crop Records
        </Link>
        <Link
          to="/crop-chart"
          className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow text-center font-medium transition"
        >
          Crop Chart
        </Link>
      </nav>
    </div>
  );
};

export default CropSidebar;
