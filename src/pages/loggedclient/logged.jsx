// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import NavBarLogged from "../../components/navbarLogged/NavBarLogged";
import AboutUs from "../../components/aboutus/AboutUs";
import ContactUs from "../../components/ContactUs/ContactUs";
import Slider from "../../components/sliderImage/Slider"; // Assuming you create a Slider component
// You may need to import your image assets for the slider here

export default function Logged() {
    // Retrieve the user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const goToProfile = () => {
        navigate("/profile");
    };

    const bookNow = () => {
        navigate("/booking"); // Adjust the path as needed
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBarLogged user={user} />

            {/* Hero Section */}
            <div className="relative bg-cover bg-center h-screen ">
                <div className="flex items-start justify-between p-6">
                    <div className="text-white">
                        <h1 className="text-3xl font-bold">Welcome Back, {user?.name || "Guest"}!</h1>
                    </div>
                    <div className="flex space-x-4">
                        <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                            onClick={goToProfile}
                        >
                            Profile
                        </button>
                        <button 
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                        <button 
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                            onClick={bookNow}
                        >
                            Book Now
                        </button>
                    </div>
                </div>
                <Slider /> {/* Image Slider with welcoming messages */}
            </div>

            {/* About Us Section */}
            <AboutUs />

            {/* Why Choose Us Section */}
            <section className="py-10 px-6 bg-gray-100">
                <h2 className="text-2xl font-bold text-center mb-6">Why Choose Us?</h2>
                <p className="text-lg text-center max-w-2xl mx-auto">
                    Here are a few reasons why we stand out among others...
                </p>
                {/* Add content here explaining why users should choose your services */}
            </section>

            {/* Our Packages Section */}
            <section className="py-10 px-6">
                <h2 className="text-2xl font-bold text-center mb-6">Our Packages</h2>
                {/* Add content here showcasing different packages */}
            </section>

            {/* Contact Us Section */}
            <ContactUs />
        </div>
    );
}
