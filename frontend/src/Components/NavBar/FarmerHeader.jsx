import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FarmerHeader = () => {
  const [cropDropdown, setCropDropdown] = useState(false);
  const [stockDropdown, setStockDropdown] = useState(false);

  // Refs to manage dropdowns
  const cropDropdownRef = useRef(null);
  const stockDropdownRef = useRef(null);

  // Toggle Dropdowns with closing other dropdown
  const handleCropDropdown = () => {
    setCropDropdown(!cropDropdown);
    if (stockDropdown) setStockDropdown(false);  // Close Stock dropdown
  };

  const handleStockDropdown = () => {
    setStockDropdown(!stockDropdown);
    if (cropDropdown) setCropDropdown(false);  // Close Crop dropdown
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cropDropdownRef.current && !cropDropdownRef.current.contains(event.target) &&
        stockDropdownRef.current && !stockDropdownRef.current.contains(event.target)
      ) {
        setCropDropdown(false);
        setStockDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-green-800 p-4 flex justify-between items-center relative z-[99]">
      <div className="flex items-center space-x-2">
        <img src="\public\Yellow Vintage Wheat Rice Oats logo.png" alt="HarvestEase" className="w-10 h-10" />
        <h1 className="text-yellow-500 font-semibold text-xl">HarvestEase</h1>
      </div>
      <div className="space-x-6 text-white">
        <nav className="space-x-6 font-medium">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/service" className="hover:text-yellow-300">Service</Link>
          <Link to="/about" className="hover:text-yellow-300">About</Link>
          <Link to="/crop-landing" className="hover:text-yellow-300">Crop</Link>
          <Link to="/finance" className="hover:text-yellow-300">Finance</Link>
          

          {/* Stock Dropdown */}
          <div className="relative inline-block" ref={stockDropdownRef}>
            <button
              onClick={handleStockDropdown}
              className="hover:text-yellow-300"
            >
              Stock
            </button>
            {stockDropdown && (
              <div className="absolute top-[-10px] bg-white text-green-800 rounded-md shadow-lg mt-[58px] w-[140px]">
                <div className="mb-[5px] mt-[5px] flex flex-col items-start content-start">
                  <button className="mb-[5px] mt-[5px] m-[5px]">
                    <Link to="/stock-management" className="hover:text-yellow-300 p-2 text-center w-full text-left">Inventory</Link>
                  </button>
                  <button className="mt-[5px] mb-[5px] m-[5px]">
                    <Link to="/shop" className="hover:text-yellow-300 p-2 text-center w-full text-left">Shop</Link>
                  </button>
                </div>
              </div>
            )}
          </div>

          <Link to="/disease-user" className="hover:text-yellow-300">Plant Care</Link>
          <Link to="/login" className="bg-yellow-500 text-green-800 py-2 px-4 rounded-md hover:bg-yellow-400">
  Log In
</Link>
<Link to="/register" className="bg-yellow-500 text-green-800 py-2 px-4 rounded-md hover:bg-yellow-400">
  Sign Up
</Link>

        </nav>
      </div>
    </header>
  );
};

export default FarmerHeader;
