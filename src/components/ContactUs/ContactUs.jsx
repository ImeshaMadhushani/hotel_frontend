// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
//import { useNavigate } from "react-router-dom";
//import heroImage from "/hero1.jpg"; // Adjust the path based on your file structure

export default function ContactUs() {
  //const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission
    // For example, send data to a backend service
    console.log('Form submitted:', formData);
    
    // Optional: Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });

    // Optional: Show a success message or redirect
    // navigate('/thank-you');
  };

  return (
    <div 
      className="relative min-h-screen bg-cover bg-center bg-fixed flex items-center" 
      /* style={{ backgroundImage: `url(${heroImage})` }}
   */ > 
      {/* Dark overlay for emphasis */}
      <div className="absolute inset-0 "></div>
      
      {/* Contact Us Card */}
      <div className="relative z-10 w-full max-w-md mx-auto text-center bg-white bg-opacity-95 shadow-2xl rounded-lg overflow-hidden p-10 backdrop-blur-lg">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-6">
          Contact Us
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          We value your feedback and inquiries. Reach out to us anytime!
        </p>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Name Field */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-200"
              required
            />
          </div>
          
          {/* Email Field */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-200"
              required
            />
          </div>
          
          {/* Message Field */}
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-200"
              rows="5"
              required
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}