// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom'; 
import NavBarLogged from "../../components/navbarLogged/NavBarLogged";
import Slider from "../../components/sliderImage/Slider";
import Footer from '../../components/footer/footer';
import Feedback from '../../components/feedback/Feedback';
import './logged.css'
export default function Logged() {
    // Retrieve the user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
        <div className="min-h-screen bg-gray-50">
            <NavBarLogged user={user} />

            {/* Hero Section */}
            <div className="relative bg-cover bg-center h-screen flex flex-col items-center text-center mt-2 pb-20">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60 z-0"></div>
                
                {/* Welcome Message Section */}
                <div className="z-10 flex flex-col items-center mt-20 px-6 text-white space-y-2">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B192C]">
                        Welcome SunShine Villa
                    </h1>
                    <p className="max-w-xl text-lg md:text-xl lg:text-2xl font-medium text-gray-200">
                        Explore our offerings and book a session today!
                    </p>
                </div>

                {/* Slider Component */}
                <div className="z-10 w-full mt-6">
                    <Slider className="w-full h-1/2" />
                </div>

                {/* Call to Action */}
                <div className="z-10 mt-4">
                    <button 
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg transform hover:scale-105"
                    >
                        <Link to='/rooms'>
                            Book Now
                        </Link>
                    </button>
                </div>
            </div>

            {/* Feedback Section */}
            <div className="flex flex-col lg:flex-row bg-white py-10 px-6 lg:px-20 space-y-10 lg:space-y-0 lg:space-x-10">
                {/* Feedback Form */}
                <div className="flex-1">
                    <div className="p-6 bg-gray-100 shadow-md rounded-lg animate-slide-left">
                        <h2 className="text-2xl font-bold mb-4">Submit Your Feedback</h2>
                         <Feedback /> 
                    </div>
                </div>

                {/* Display User Feedback */}
                <div className="flex-1">
                    <div className="p-6 bg-gray-100 shadow-md rounded-lg animate-slide-right">
                        <h2 className="text-2xl font-bold mb-4">User Feedback</h2>
                        <p className="text-gray-700">
                            {/* Example feedback items */}
                            &quot;Amazing experience, will definitely visit again!&quot; - John
                        </p>
                        <p className="text-gray-700 mt-4">
                            &quot;The best villa I have ever stayed in!&quot; - Emily
                        </p>
                        {/* You can replace this with dynamic user feedback */}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
        </>
    );
}
