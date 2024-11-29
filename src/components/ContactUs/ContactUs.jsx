// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
//import NavBar from "../navbar/NavBar";
import Footer from "../footer/footer";
export default function ContactUs() {
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
    console.log('Form submitted:', formData);

    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <>
      {/* <NavBar/> */}
    <div className="relative min-h-screen bg-cover bg-center bg-fixed flex items-center"
      style={{ backgroundImage: `url('/hero1.jpg')` }} >
      
      {/* Dark overlay for emphasis */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Contact Us Card */}
      <div className="relative z-10 w-full max-w-lg mx-auto text-center bg-white bg-opacity-95 shadow-xl rounded-lg overflow-hidden p-8 backdrop-blur-lg">
        
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-6">
          Get in Touch
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          We’d love to hear from you! Whether you have questions or feedback, feel free to contact us.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-200"
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
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-200"
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
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-200"
              rows="6"
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
      <Footer/> 
      </>
  );
}
