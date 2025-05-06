import React from 'react';
import { Link } from 'react-router-dom';
import paddyField from '../assets/paddy_field.jpg';
import { FaCalendarAlt, FaFileAlt, FaChartLine, FaSms } from 'react-icons/fa';

const CropLanding = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${paddyField})` }}
      >
        <div className="text-center px-4 z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Crop Tracking</h1>
          <p className="text-xl md:text-2xl text-white mb-8">Plan Smart. Harvest Better.</p>
          <Link to="/crop-planning">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg transition text-lg shadow-lg">
              Explore Crops
            </button>
          </Link>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-12">
              {/* Automated Calculations */}
              <div className="flex items-start">
                <div className="bg-green-100 p-4 rounded-full mr-6">
                  <FaCalendarAlt className="text-green-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">Automated Calculations</h3>
                  <p className="text-gray-600">
                    Accurate fertilization and harvest dates based on paddy type with intelligent algorithms
                  </p>
                </div>
              </div>

              {/* Comprehensive Reports */}
              <div className="flex items-start">
                <div className="bg-green-100 p-4 rounded-full mr-6">
                  <FaFileAlt className="text-green-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">Comprehensive Reports</h3>
                  <p className="text-gray-600">
                    Generate detailed PDF reports on crop growth, schedules, and yield predictions
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-12">
              {/* Data Analytics */}
              <div className="flex items-start">
                <div className="bg-green-100 p-4 rounded-full mr-6">
                  <FaChartLine className="text-green-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">Data Analytics</h3>
                  <p className="text-gray-600">
                    Track and analyze your crop performance over multiple seasons with visual dashboards
                  </p>
                </div>
              </div>

              {/* SMS Alerts */}
              <div className="flex items-start">
                <div className="bg-green-100 p-4 rounded-full mr-6">
                  <FaSms className="text-green-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">SMS Alerts</h3>
                  <p className="text-gray-600">
                    Receive timely notifications for important farming activities and weather changes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Qualities Section */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Our System</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { 
                title: "High Performance", 
                desc: "Handles large datasets efficiently",
                bg: "bg-blue-50",
                text: "text-blue-600"
              },
              { 
                title: "Scalable", 
                desc: "Grows with your farming operations",
                bg: "bg-purple-50",
                text: "text-purple-600"
              },
              { 
                title: "Reliable", 
                desc: "99.9% uptime guarantee",
                bg: "bg-green-50",
                text: "text-green-600"
              },
              { 
                title: "User-Friendly", 
                desc: "Simple interface for all farmers",
                bg: "bg-yellow-50",
                text: "text-yellow-600"
              },
              { 
                title: "Secure", 
                desc: "Bank-level data encryption",
                bg: "bg-red-50",
                text: "text-red-600"
              }
            ].map((item, index) => (
              <div key={index} className={`${item.bg} p-6 rounded-xl shadow-sm hover:shadow-md transition`}>
                <h3 className={`${item.text} text-lg font-semibold mb-2`}>{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Weather Widget - Simple Implementation */}
          <div className="mt-16 bg-white p-6 rounded-xl shadow-sm max-w-xs mx-auto text-center">
            <div className="text-gray-800 font-medium mb-2">Current Weather</div>
            <div className="text-3xl font-bold text-gray-700">30°C</div>
            <div className="text-gray-600">Partly sunny</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropLanding;