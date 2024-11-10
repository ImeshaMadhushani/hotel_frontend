import { useNavigate } from "react-router-dom";
import heroImage from "/hero1.jpg"; // Adjust the path based on your file structure

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Dark overlay for enhanced readability on background image */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <div className="relative z-10 container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Back
        </button>

        <div className="max-w-3xl mx-auto bg-blue-100 shadow-lg rounded-lg overflow-hidden backdrop-blur-sm">
          <div className="p-8 sm:p-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 text-center mb-6">
              About Us
            </h1>
            <p className="text-lg mb-6 text-gray-800 leading-relaxed">
              At SunShine Villa, we pride ourselves on providing an unforgettable
              experience that blends luxury with nature. Our picturesque location and
              world-class amenities create the perfect backdrop for your dream
              vacation.
            </p>
            <p className="text-md mb-6 text-gray-700">
              Our dedicated team is committed to ensuring that your stay is not just
              comfortable, but truly exceptional. From personalized service to
              meticulously maintained facilities, we go above and beyond to create
              wonderful memories that will last a lifetime.
            </p>
            <div className="mt-8 border-t border-gray-300 pt-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Promise</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Unparalleled luxury in a natural setting</li>
                <li>Exceptional, personalized service</li>
                <li>Sustainable practices to protect our environment</li>
                <li>Unforgettable experiences tailored to your preferences</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
