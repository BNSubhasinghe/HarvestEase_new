import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-[#1A512E] text-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center">
          <span className="bg-[#E4C241] px-4 py-2 font-bold text-[#1A512E] rounded">🌱 HarvestEase</span>
        </div>
        <nav className="space-x-6 font-medium">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/crop-form" className="hover:text-yellow-300">Crop Form</Link>  {/* ✅ Updated navigation */}
          <Link to="/crop-table" className="hover:text-yellow-300">Crop Table</Link> {/* ✅ CRUD Table route */}
          <Link to="/service" className="hover:text-yellow-300">Service</Link>
          <Link to="/about" className="hover:text-yellow-300">About</Link>
          <Link to="/crops" className="hover:text-yellow-300">Crops</Link>
          <Link to="/stock" className="hover:text-yellow-300">Stock</Link>
          <Link to="/finance" className="hover:text-yellow-300">Finance</Link>
          <Link to="/plantcare" className="hover:text-yellow-300">Plant Care</Link>
          <Link to="/contact" className="bg-yellow-400 text-[#1A512E] px-3 py-1 rounded hover:bg-yellow-500">Contact Us</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
