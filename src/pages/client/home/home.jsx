import NavBar from "../../../components/navbar/NavBar";
import './home.css';
import AboutUs from "../../../components/aboutus/AboutUs";
import ContactUs from "../../../components/ContactUs/ContactUs";
import Footer from "../../../components/footer/footer";
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="bg-gray-50">
            <NavBar />

            {/* Hero Section */}
            <div className="relative bg-cover bg-center hero-bg min-h-screen py-10">
                <div className="flex items-center justify-center bg-black bg-opacity-50 min-h-[80vh]">
                    <div className="text-center text-white px-6">
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
                            <Link to="/login">Book Now</Link>
                        </button>
                    </div>
                </div>
            </div>

            {/* Room Booking Form */}
            <div className="booking-form bg-white p-8 rounded-lg shadow-lg mx-auto my-10 max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Book a Room</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Booking Date</label>
                        <input
                            type="date"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <button
                        type="button"
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-200"
                    >
                        <Link to="/login">Book Now</Link>
                    </button>
                </form>
            </div>

            {/* About Us Section */}
            <AboutUs />

            {/* Contact Us Section */}
            <ContactUs />

            <Footer/>
        </div>
    );
}
