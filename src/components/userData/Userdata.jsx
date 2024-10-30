import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserTag(props) {
    const [name, setName] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {

         const backendUrl = import.meta.env.VITE_BACKEND_URL;
        console.log(backendUrl);


        if (token) {
            console.log("Token:", token); // Check the token value here

            axios.post(`${backendUrl}/api/user/login`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
                
            })
            .then((res) => {
                setName(`${res.data.user.firstName} ${res.data.user.lastName}`);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                navigate('/login');
            });
        }
    }, [token, navigate]);

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className="flex items-center space-x-3">
            <img
                className="rounded-full w-12 h-12 border-2 border-white shadow-lg"
                src={props.imageLink}
                alt="User Avatar"
            />
            <span className="text-white font-medium text-lg">{name}</span>
            <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition duration-300 text-sm font-semibold"
            >
                Log Out
            </button>
        </div>
    );
}

export default UserTag;
