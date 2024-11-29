// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import { useState } from 'react';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(''); 
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
            phone,
            whatsapp,
            password,
            image: "../src/assets/avatar1.png",
            type: userType,
            disabled: false,
            emailVerified: false
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
                const errorData = await response.json();
                console.error("Error response:", errorData);
                throw new Error('Registration failed!');
            }

            const data = await response.json();
            setSuccess(data.message || 'Registration successful!');
            setError(null);
            navigate('/login');
        } catch (err) {
            setError(err.message);
            setSuccess(null);
        }
    };

    return (
        <div className="overlay1">
            <div className="form-container">
                <h2 className="form-header">Register</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Enter your First Name" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        required 
                    />
                    <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Enter your Last Name" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        required 
                    />
                    <input 
                        type="email" 
                        className="input-field" 
                        placeholder="Enter your Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Enter your Phone Number" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                    />
                    <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Enter your Whatsapp Number" 
                        value={whatsapp} 
                        onChange={(e) => setWhatsapp(e.target.value)} 
                        required 
                    />

                    <select 
                        className="select-field" 
                        value={userType} 
                        onChange={(e) => setUserType(e.target.value)} 
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>

                    <input 
                        type="password" 
                        className="input-field" 
                        placeholder="Create a Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required  
                    />
                    <input 
                        type="password" 
                        className="input-field" 
                        placeholder="Confirm Password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                    <button 
                        type="submit" 
                        className="submit-btn">
                        Register
                    </button>

                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}

                    <p className="text-message">
                        Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
