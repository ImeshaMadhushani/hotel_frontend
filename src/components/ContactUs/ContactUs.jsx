
import { useNavigate } from "react-router-dom"
export default function ContactUs() {

      const navigate = useNavigate()

    return (
        <div className="py-12 max-w-3xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
                 <button 
                     onClick={() => navigate(-1)}
                    className="mb-8 ml-[-500px] inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
        
          Back
        </button>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0B192C] text-center mb-6">Contact Us</h2>
                <p className="text-lg mb-8 text-gray-600">We would love to hear from you!</p>
                
                <form className="mt-8 bg-white shadow-md rounded-lg p-8">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="border border-gray-300 p-2 mb-4 w-full max-w-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        required
                    /> <br></br>
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="border border-gray-300 p-2 mb-4 w-full max-w-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        required
                    /><br></br>
                    <textarea
                        placeholder="Your Message"
                        className="border border-gray-300 p-2 mb-4 w-full max-w-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        rows="4"
                        required
                    /><br></br>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
