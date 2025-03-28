import React, { useState } from 'react';
import { FaTimes, FaUpload, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

function DiseasesOverlay({ onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiResults, setApiResults] = useState(null);
  const [error, setError] = useState(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      // First, upload the image to your backend
      const uploadResponse = await axios.post('http://localhost:5000/api/diseases/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Then, use the uploaded image URL to get disease detection results
      const apiResponse = await axios.post('https://crop.kindwise.com/api/v1', {
        image: uploadResponse.data.imageUrl,
        api_key: process.env.REACT_APP_PLANT_API_KEY
      });

      setApiResults(apiResponse.data);
    } catch (err) {
      setError('Error processing image. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Disease Detection from Image</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Image Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-48 rounded-lg mb-4"
                />
              ) : (
                <FaUpload size={48} className="text-gray-400 mb-4" />
              )}
              <span className="text-gray-600">
                {selectedImage ? 'Change Image' : 'Click to upload image'}
              </span>
            </label>
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!selectedImage || loading}
            className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 ${
              loading || !selectedImage
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            } text-white transition-colors`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" /> Processing...
              </>
            ) : (
              <>
                <FaUpload /> Upload and Detect
              </>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-center">{error}</div>
          )}

          {/* API Results */}
          {apiResults && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Detection Results</h3>
              <div className="space-y-4">
                {apiResults.diseases?.map((disease, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">{disease.name}</h4>
                    <p className="text-sm text-gray-600">
                      Confidence: {(disease.confidence * 100).toFixed(2)}%
                    </p>
                    <p className="text-sm text-gray-600">
                      Description: {disease.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DiseasesOverlay;
