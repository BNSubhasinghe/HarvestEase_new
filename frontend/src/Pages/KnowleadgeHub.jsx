import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KnowledgeHub = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [experience, setExperience] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  // Fetch existing posts on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const validateName = (name) => /^[A-Za-z ]+$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (!validateName(value)) {
      setNameError('Name should contain only letters and spaces.');
    } else {
      setNameError('');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    setNameError('');
    setEmailError('');

    if (!validateName(name)) {
      setNameError('Name should contain only letters and spaces.');
      valid = false;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }
    if (!valid) return;

    if (imageFile && experience && name && email) {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('experience', experience);
      formData.append('name', name);
      formData.append('email', email);

      try {
        const response = await axios.post('http://localhost:5000/api/posts', formData);
        setPosts([response.data, ...posts]); // Add new post on top
        // Reset form
        setImageFile(null);
        setPreviewImage(null);
        setExperience('');
        setName('');
        setEmail('');
      } catch (error) {
        console.error('Error submitting post:', error);
      }
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.experience.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-20"
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[300px] h-[40px] mt-2 p-3 border border-gray-300 rounded-[30px] focus:outline-none focus:border-green-800"
              placeholder="Search diseases"
            />
          </div>
        </div>

        {/* Display Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-lg bg-white flex flex-col items-center">
                <div className="flex justify-center mb-4 w-full">
                  <img 
                    src={`http://localhost:5000${post.imagePath}`} 
                    alt="Plant Disease" 
                    className="w-[250px] h-[250px] object-cover rounded-lg mx-auto" 
                  />
                </div>
                <p className="text-lg font-bold text-green-900 mb-2 text-center">{post.experience}</p>
                <h4 className="font-semibold text-base mb-1 text-gray-800 text-center">{post.name}</h4>
                <p className="text-sm text-gray-600 mb-1 text-center">{post.email}</p>
                <p className="text-xs text-gray-400 text-center">Posted on: {post.createdAt ? new Date(post.createdAt).toLocaleString() : ''}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No posts found</p>
          )}
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow-md w-[60%] opacity-80">
          <h3 className="text-2xl font-semibold mb-4">Share Your Plant Disease Experience</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold">Your Name</label>
              <input type="text" value={name} onChange={handleNameChange} className="w-full mt-2 p-3 border border-gray-300 rounded-lg" placeholder="Enter your name" />
              {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
            </div>
            <div>
              <label className="block text-lg font-semibold">Your Email</label>
              <input type="email" value={email} onChange={handleEmailChange} className="w-full mt-2 p-3 border border-gray-300 rounded-lg" placeholder="Enter your email" />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
            <div className="flex flex-col items-center">
              <label className="cursor-pointer text-blue-500 font-semibold">Upload Plant Disease Image</label>
              <input type="file" onChange={handleImageChange} accept="image/*" className="mt-2 p-2 border border-gray-300 rounded-lg" />
              {previewImage && (
                <div className="mt-4">
                  <img src={previewImage} alt="Preview" className="max-w-xs mx-auto" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-lg font-semibold">Your Experience</label>
              <textarea value={experience} onChange={(e) => setExperience(e.target.value)} rows="4" className="w-full mt-2 p-3 border border-gray-300 rounded-lg" placeholder="Describe your experience with this plant disease..."></textarea>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="mt-4 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;
