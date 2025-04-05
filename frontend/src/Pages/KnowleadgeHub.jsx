import React, { useState } from 'react';

const KnowledgeHub = () => {
  // State to store image, experience, posts, search query, and date/time
  const [image, setImage] = useState(null);
  const [experience, setExperience] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle image change
  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  // Handle experience input change
  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };

  // Handle name input change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submission to add the post
  const handleSubmit = (e) => {
    e.preventDefault();
    if (image && experience && name && email) {
      const currentDate = new Date().toLocaleString(); // Get current date and time
      setPosts([...posts, { image, experience, name, email, date: currentDate }]);
      setImage(null); // Reset image after submission
      setExperience(''); // Reset experience after submission
      setName(''); // Reset name after submission
      setEmail(''); // Reset email after submission
    }
  };

  // Filter posts based on search query in the experience
  const filteredPosts = posts.filter((post) =>
    post.experience.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-20"
        style={{
          backgroundImage: `url('../../src/assets/shared_bg.png')`, 
          backgroundSize: '900px',
        }}
      ></div>

      <div className="relative max-w-4xl mx-auto p-6 z-10 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">Knowledge Hub - Plant Disease Experience</h2>

        {/* Search Input */}
        <div className="w-full flex flex-col items-end">
          <div className="mb-8 flex justify-flex-start">
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={handleSearchChange}
              className=" w-[300px] h-[40px] mt-2 p-3 border border-gray-300 rounded-[30px] focus:outline-none focus:border-green-800 "
              placeholder="Search diseases"
            />
          </div>
        </div>

        {/* Display Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-lg bg-white">
                <div className="flex justify-center mb-4">
                  <img src={post.image} alt="Plant Disease" className="max-w-xs rounded-lg" />
                </div>
                <h4 className="font-semibold text-xl mb-2">{post.name}</h4>
                <p className="text-lg mb-2">{post.experience}</p>
                <p className="text-sm text-gray-600 mb-2">{post.email}</p>
                <p className="text-xs text-gray-400">Posted on: {post.date}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No posts found</p>
          )}
        </div>

        {/* Form to submit post */}
        <div className="bg-white p-6 rounded-lg shadow-md w-[60%] opacity-80">
          <h3 className="text-2xl font-semibold mb-4">Share Your Plant Disease Experience</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-lg font-semibold">Your Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-lg font-semibold">Your Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
              />
            </div>

            {/* Image Upload */}
            <div className="flex flex-col items-center">
              <label htmlFor="image-upload" className="cursor-pointer text-blue-500 font-semibold">
                Upload Plant Disease Image
              </label>
              <input
                type="file"
                id="image-upload"
                className="mt-2 p-2 border border-gray-300 rounded-lg"
                onChange={handleImageChange}
                accept="image/*"
              />
              {image && (
                <div className="mt-4">
                  <img src={image} alt="Plant Disease" className="max-w-xs mx-auto" />
                </div>
              )}
            </div>

            {/* Experience Input */}
            <div>
              <label htmlFor="experience" className="block text-lg font-semibold">Your Experience</label>
              <textarea
                id="experience"
                value={experience}
                onChange={handleExperienceChange}
                rows="4"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                placeholder="Describe your experience with this plant disease..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button type="submit" className="mt-4 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;
