import NavBar from "../../../components/navbar/NavBar";
import './home.css';
import AboutUs from "../../../components/aboutus/AboutUs";
import ContactUs from "../../../components/ContactUs/ContactUs";
import Footer from "../../../components/footer/footer";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
    const [categories, setCategories] = useState([]);

    // Fetch categories from local storage
    useEffect(() => {
        const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
        setCategories(storedCategories);
    }, []);

    return (
        <div className="bg-gray-50">
            <NavBar />

            {/* Hero Section */}
            <div className="relative bg-cover bg-center hero-bg min-h-screen py-10">
                <div className="flex items-center justify-center bg-black bg-opacity-50 min-h-screen relative">
                    <div className="text-center text-white px-6 z-10">
                        <h1 className="text-5xl font-bold mb-4 animate-fade-in">
                            Welcome to SunShine Villa
                        </h1>
                        <p className="text-lg mb-6 max-w-lg mx-auto">
                            Experience luxury and tranquility like never before.
                        </p>
                        <p className="text-md mb-8 max-w-lg mx-auto">
                            Nestled in the heart of nature, our villa offers breathtaking views, exquisite dining, and a perfect escape from the everyday hustle.
                        </p>
                        <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-200">
                            <Link to="/login">Explore Rooms</Link>
                        </button>
                    </div>
                </div>

                {/* Booking Form positioned at the top */}
    <div className="absolute bg-white bg-opacity-80 px-6 py-4 rounded-full shadow-lg max-w-4xl mx-auto flex items-center justify-between gap-4 z-20 left-1/2 transform -translate-x-1/2" style={{ top: '70%' }}>
    {/* Check-in */}
    <div className="flex flex-col items-center">
        <label className="text-sm font-medium text-gray-700">Check-in</label>
        <input
            type="date"
            className="mt-1 w-36 p-2 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>

    {/* Check-out */}
    <div className="flex flex-col items-center">
        <label className="text-sm font-medium text-gray-700">Check-out</label>
        <input
            type="date"
            className="mt-1 w-36 p-2 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>

    {/* Category */}
    <div className="flex flex-col items-center">
        <label className="text-sm font-medium text-gray-700">Category</label>
        <select
            className="mt-1 w-36 p-2 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue=""
        >
            <option value="" disabled>Select Category</option>
            {categories.map((category, index) => (
                <option key={index} value={category}>
                    {category}
                </option>
            ))}
        </select>
    </div>

    {/* Book Now Button */}
    <button
        className="bg-blue-800 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-blue-900 transition"
        type="button"
    >
        <Link to="/login">Book Now</Link>
    </button>
</div>

            </div>

            {/* About Us Section */}
            <AboutUs />

            {/* Contact Us Section */}
            <ContactUs />

            <Footer />
        </div>
    );
}
