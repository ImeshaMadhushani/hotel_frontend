// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
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
        <div className="min-h-screen bg-gray-50 scroll-smooth">
            <NavBarLogged user={user} />

            {/* Hero Section */}
            <div className="relative bg-cover bg-center h-screen">
                <div className="flex items-start justify-between p-6">
                    <div className="text-white">
                        <h1 className="text-3xl font-bold text-[#0B192C]">Welcome Back, {user?.name || "Guest"}!</h1>
                    </div>
                  
                </div>
                <Slider /> {/* Image Slider with welcoming messages */}

                     <div className="flex space-x-4 justify-center mt-10">
                        <button 
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                            onClick={bookNow}
                        >
                            Book Now
                        </button>
                    </div>
            </div>
         

         </div>
    );
}
