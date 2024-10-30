// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import NavBarLogged from "../../components/navbarLogged/NavBarLogged";
import Slider from "../../components/sliderImage/Slider"; // Assuming you create a Slider component

export default function Logged() {
    // Retrieve the user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const bookNow = () => {
        navigate("/booking"); // Adjust the path as needed
    };

    return (
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

                {/* Slider Component Positioned Below Welcome Message */}
                <div className="z-10 w-full mt-6">
                    <Slider className="w-full h-1/2" />
                </div>

                {/* Call to Action - Positioned Slightly Above Bottom */}
                <div className="z-10 mt-4">
                    <button 
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg transform hover:scale-105"
                        onClick={bookNow}
                    ><Link to='/booking'>
                        Book Now</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
