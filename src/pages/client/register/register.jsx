import { Link } from 'react-router-dom';
import './register.css';
import { useState } from 'react';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
     const [whatsapp, setWhatsapp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
     const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
          e.preventDefault();
        
    }

    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center p-12 overlay1">
            <div className="w-[400px] bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-6">
                <h2 className="text-4xl font-bold text-center mb-6 text-[#0B192C]">Register</h2>
                <form>
                    <input 
                        type="text" 
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Enter your Name" 
                        required 
                    />
                    <input 
                        type="email" 
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Enter your Email" 
                        required 
                    />

                     <input 
                        type="email" 
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Enter your Whatsapp Number" 
                        required 
                    />

                    <input 
                        type="password" 
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Create a Password" 
                        required 
                    />
                    <input 
                        type="password" 
                        className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Confirm Password" 
                        required 
                    />
                    <button 
                        type="submit" 
                        className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-800 transition duration-300">
                        Register
                    </button>
                    <p className="text-center text-gray-500 mt-4">
                        Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
                    </p>
                   {/*  <p className="text-center text-gray-500 mt-4">
                        Or connect with <a href="#" className="text-blue-600">Facebook</a> or <a href="#" className="text-blue-600">Google</a>
                    </p> */}
                </form>
            </div>
        </div>
    );
}
