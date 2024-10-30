// eslint-disable-next-line no-unused-vars
import { Link ,useNavigate } from 'react-router-dom';
import './register.css';
import { useState } from 'react';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(''); // Add phone number state
    const [whatsapp, setWhatsapp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('customer'); 
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) { 
            setError('Passwords do not match');
            return;
        }

        const userData = {
            firstName,
            lastName,
            email,
            phone, // Include phone in userData
            whatsapp,
            password,
            image: "../src/assets/avatar1.png",
             type: "customer",  // Default type
        disabled: false,   // Default disabled status
        emailVerified: false  // Default email verification status
        };

        console.log("User Data:", userData);

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            console.log(backendUrl);
            const response = await fetch(`${backendUrl}/api/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Parse the JSON response
    console.error("Error response:", errorData);
                throw new Error('Registration failed!');
            }

            const data = await response.json();
            setSuccess(data.message || 'Registration successful!');
            setError(null); // Clear any previous error
             navigate('/login');
        } catch (err) {
            setError(err.message);
            setSuccess(null); // Clear any previous success message
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center p-12 overlay1">
            <div className="w-[400px] bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-6">
                <h2 className="text-4xl font-bold text-center mb-6 text-[#0B192C]">Register</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Enter your First Name" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        required 
                    />
                    <input 
                        type="text" 
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Enter your Last Name" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        required 
                    />
                    <input 
                        type="email" 
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Enter your Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="text" 
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Enter your Phone Number" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                    />
                    <input 
                        type="text" 
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Enter your Whatsapp Number" 
                        value={whatsapp} 
                        onChange={(e) => setWhatsapp(e.target.value)} 
                        required 
                    />

                    <select 
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        value={userType} 
                        onChange={(e) => setUserType(e.target.value)} 
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>

                    <input 
                        type="password" 
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Create a Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required  
                    />
                    <input 
                        type="password" 
                        className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Confirm Password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                    <button 
                        type="submit" 
                        className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-800 transition duration-300">
                        Register
                    </button>

                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                    {success && <p className="text-green-500 text-center mt-4">{success}</p>}

                    <p className="text-center text-gray-500 mt-4">
                        Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
