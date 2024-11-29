// import heroImage from "/hero1.jpg"; // Uncomment and adjust path if using an image
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[50vh] flex items-center justify-center bg-blue-800 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Welcome to SunShine Villa
          </h1>
          <p className="mt-3 text-md md:text-lg max-w-2xl mx-auto leading-relaxed">
            Experience unparalleled luxury and comfort in a serene, picturesque environment. 
            At SunShine Villa, every moment is designed to inspire relaxation and rejuvenation.
          </p>
        </div>
        <img
          src="/hero1.jpg" // Replace with your actual image path
          alt="SunShine Villa Hero Image"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      </div>

      {/* About Us Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 text-center mb-6">
              Why Choose SunShine Villa?
            </h2>
            <p className="text-md text-gray-800 mb-6 leading-relaxed">
              At SunShine Villa, we redefine luxury living. Nestled amidst nature’s beauty, 
              our villa offers an oasis of comfort and elegance. Whether you&apos;re here to relax 
              or explore, our world-class amenities and personalized services ensure a memorable experience.
            </p>
            <ul className="space-y-4 text-gray-700 text-md">
              <li>
                <strong>Prime Location:</strong> Breathtaking views and easy access to local attractions 
                for a perfect getaway.
              </li>
              <li>
                <strong>Elegant Accommodation:</strong> Modern, spacious rooms with sophisticated décor 
                and premium amenities.
              </li>
              <li>
                <strong>Gastronomic Delights:</strong> Gourmet meals crafted by our talented chefs, featuring 
                a blend of local and global cuisines.
              </li>
              <li>
                <strong>Personalized Service:</strong> Our professional team ensures your stay is seamless and enjoyable.
              </li>
              <li>
                <strong>Exclusive Experiences:</strong> From tranquil spa treatments to thrilling adventures, 
                we offer tailored experiences for all guests.
              </li>
            </ul>
          </div>
        </div>

        {/* Commitment Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section */}
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Our Commitment to Excellence
            </h3>
            <p className="text-gray-700 text-md leading-relaxed mb-4">
              We go beyond providing a place to stay—we create a sanctuary where luxury meets tranquility. 
              Our dedication to sustainability and community involvement reflects our values. Every detail is curated 
              to exceed your expectations, ensuring your stay is as comfortable and memorable as possible.
            </p>
            <Link
              to="/contactus"
              className="inline-block bg-blue-600 text-white font-medium py-3 px-5 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* Right Section */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src="/hero2.jpg" // Replace with your actual image path for a view of the villa or surroundings
              alt="SunShine Villa View"
              className="w-full h-auto object-cover max-h-64 rounded-lg shadow-xl"
            />
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-blue-900">What Makes Us Unique?</h3>
            <p className="text-md text-gray-700 max-w-3xl mx-auto leading-relaxed">
              At SunShine Villa, we believe in offering more than just a stay. We provide an immersive experience 
              that combines the luxury of a five-star resort with the authenticity and charm of a local getaway. 
              Our commitment to the environment and sustainable practices ensures that you can enjoy your stay 
              with peace of mind. Every guest is treated as a part of the SunShine family, and we guarantee that 
              your visit will leave you feeling refreshed, inspired, and truly connected with nature.
            </p>
          </div>

          <div className="text-center mt-8">
            <Link to="/services"
              className="inline-block bg-green-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
