import { useNavigate } from "react-router-dom";
import heroImage from "/hero1.jpg"; // Adjust the path based on your file structure

export default function ContactUs() {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed flex items-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Darker overlay for a cohesive look */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="relative z-10 container mx-auto px-4 py-20 sm:px-6 lg:px-8 max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Back
        </button>

        <div className="max-w-4xl mx-auto text-center bg-white bg-opacity-90 shadow-2xl rounded-lg overflow-hidden backdrop-blur-md p-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-6">
            Contact Us
          </h2>
          <p className="text-lg mb-8 text-gray-800">
            We would love to hear from you!
          </p>

          <form className="mt-8">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              required
            />
            <textarea
              placeholder="Your Message"
              className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              rows="4"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
