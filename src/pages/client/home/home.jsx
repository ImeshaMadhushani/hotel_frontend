import NavBar from "../../../components/navbar/NavBar";
import './home.css'
export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            
            {/* Hero Section */}
            <div className="relative bg-cover bg-center h-screen hero-bg">
                <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                    <div className="text-center text-white px-6">
                        <h1 className="text-5xl font-bold mb-4">Welcome to SunShine Villa</h1>
                        <p className="text-lg mb-6 max-w-lg mx-auto">
                            "Experience luxury and tranquility like never before."
                        </p>
                        <p className="text-md mb-8 max-w-lg mx-auto">
                            Nestled in the heart of nature, our villa offers breathtaking views, exquisite dining, and a perfect escape from the everyday hustle.
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
