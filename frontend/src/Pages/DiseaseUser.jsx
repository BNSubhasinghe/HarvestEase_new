import React, { useState, useEffect } from 'react';
import { FaSearch, FaBook, FaUpload } from 'react-icons/fa';
import DiseasesOverlay from './DiseasesOverlay';
import axios from 'axios';
import sharedBg from '../assets/shared_bg.png';

function DiseaseUser() {
  const [searchData, setSearchData] = useState({
    affectedParts: '',
    symptoms: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('DiseaseUser component mounted');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Searching with data:', searchData);
      const response = await axios.post('http://localhost:5000/api/diseases/search', searchData);
      console.log('Search response:', response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching diseases:', error);
      alert('Error searching for diseases. Please try again.');
    }
    setLoading(false);
  };

  const handleImageUpload = () => {
    console.log('Opening overlay');
    setShowOverlay(true);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-center opacity-20"
        style={{ 
          backgroundImage: `url(${sharedBg})`,
          backgroundSize: '950px',
          backgroundPosition: 'center'
        }}
      ></div>

      {/* Knowledge Hub Button */}
      <button 
        className="fixed bottom-8 right-8 bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-colors z-50"
        onClick={() => window.location.href = '/knowledge-hub'}
      >
        <FaBook size={24} />
      </button>

      <div className="container mx-auto px-4 py-8 relative">
        <h1 className="text-3xl font-bold mb-8 text-center text-green-800">Disease Detection</h1>

        {/* Search Form with Background Image */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative p-8 bg-white rounded-lg shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Affected Parts
                </label>
                <input
                  type="text"
                  name="affectedParts"
                  value={searchData.affectedParts}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500 focus:border-transparent bg-white/90"
                  placeholder="Enter affected parts of the plant"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symptoms
                </label>
                <input
                  type="text"
                  name="symptoms"
                  value={searchData.symptoms}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500 focus:border-transparent bg-white/90"
                  placeholder="Enter symptoms observed"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaSearch /> Search
                </button>
                <button
                  type="button"
                  onClick={handleImageUpload}
                  className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaUpload /> Upload Image
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">Search Results</h2>
            <div className="grid gap-6">
              {searchResults.map((disease, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2 text-green-800">{disease.diseaseName}</h3>
                  <div className="space-y-2">
                    <p><strong>Affected Parts:</strong> {disease.affectedParts.join(', ')}</p>
                    <p><strong>Symptoms:</strong> {disease.symptoms.join(', ')}</p>
                    <p><strong>Favorable Conditions:</strong> {disease.favorableConditions.join(', ')}</p>
                    <p><strong>Treatments:</strong> {disease.treatments.join(', ')}</p>
                    <p><strong>Next Season Management:</strong> {disease.nextSeasonManagement.join(', ')}</p>
                  </div>
                  {disease.imageUrl && (
                    <img 
                      src={`http://localhost:5000${disease.imageUrl}`} 
                      alt={disease.diseaseName}
                      className="mt-4 rounded-lg w-full h-[400px] object-contain"
                      onError={(e) => {
                        console.error('Error loading image:', disease.imageUrl);
                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Overlay */}
      {showOverlay && (
        <DiseasesOverlay onClose={() => setShowOverlay(false)} />
      )}
    </div>
  );
}

export default DiseaseUser;
