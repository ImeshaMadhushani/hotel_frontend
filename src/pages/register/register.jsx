import './register.css';

export default function Register() {
    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center p-12 overlay1">
            <div className="w-[400px] bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-6">
                <h2 className="text-4xl font-bold text-center mb-6 text-[#0B192C]">Register</h2>
                <form>
                    <input 
                        type="text" 
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                        placeholder="Enter your Name" 
                        required 
                    />
                    <input 
                        type="email" 
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                        placeholder="Enter your Email" 
                        required 
                    />
                    <input 
                        type="password" 
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                        placeholder="Create a Password" 
                        required 
                    />
                    <input 
                        type="password" 
                        className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                        placeholder="Confirm Password" 
                        required 
                    />
                    <button 
                        type="submit" 
                        className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-800 transition duration-300">
                        Register
                    </button>
                    <p className="text-center text-gray-500 mt-4">
                        Already have an account? <a href="#" className="text-blue-600">Login</a>
                    </p>
                   {/*  <p className="text-center text-gray-500 mt-4">
                        Or connect with <a href="#" className="text-blue-600">Facebook</a> or <a href="#" className="text-blue-600">Google</a>
                    </p> */}
                </form>
            </div>
        </div>
    );
}
