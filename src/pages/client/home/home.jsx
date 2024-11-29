import NavBar from "../../../components/navbar/NavBar";
import './home.css';
//import AboutUs from "../../../components/aboutus/AboutUs";
//import ContactUs from "../../../components/ContactUs/ContactUs";
import Footer from "../../../components/footer/footer";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SpecialOffers from "../../../components/offers/SpecialOffers";
import Gallery from "../../../components/Gallery/Gallery";

export default function Home() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
        setCategories(storedCategories);
    }, []);

    return (
        <div className="bg-gray-50 font-sans text-gray-800">
            <NavBar />

            {/* Hero Section */}
            <div className="relative bg-cover bg-center hero-bg min-h-screen flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900 opacity-70"></div>
                <div className="relative text-center text-white z-10 px-8 space-y-6">
                    <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight animate-fade-in">
                        Welcome to <span className="text-blue-400">SunShine Villa</span>
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Experience luxury and tranquility in the heart of nature, where breathtaking views and exquisite dining await.
                    </p>
                    <Link
                        to="/login"
                        className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg font-medium py-3 px-8 rounded-full shadow-lg transition duration-300"
                    >
                        Explore Rooms
                    </Link>
                </div>
                {/* Booking Form */}
                <div className="absolute bg-white bg-opacity-90 backdrop-blur-md px-8 py-6 rounded-xl shadow-2xl max-w-4xl mx-auto flex items-center justify-between gap-6 z-20 left-1/2 transform -translate-x-1/2"
                    style={{ top: '70%' }}
                >
                    <div className="flex flex-col items-center">
                        <label className="text-sm font-semibold text-gray-700">Check-in</label>
                        <input
                            type="date"
                            className="mt-1 w-36 p-3 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <label className="text-sm font-semibold text-gray-700">Check-out</label>
                        <input
                            type="date"
                            className="mt-1 w-36 p-3 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <label className="text-sm font-semibold text-gray-700">Category</label>
                        <select
                            className="mt-1 w-40 p-3 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    <Link
                        to="/login"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-full shadow-lg transition duration-300"
                    >
                        Book Now
                    </Link>
                </div>
            </div>

            {/* About Us Section */}
           {/*  <AboutUs /> */}

            {/* Gallery Section */}
            <Gallery />

            {/* Special Offers */}
            <SpecialOffers />

            {/* Contact Us Section */}
            {/* <ContactUs /> */}

            {/* Footer */}
            <Footer />
        </div>
    );
}
