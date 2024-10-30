import axios from 'axios';
import { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';

function UserTag(props) {
    const [name, setName] = useState("");
    const [userFound,setUserFound] = useState(false)
   // const navigate = useNavigate();

    const token = localStorage.getItem("token")
    
    useEffect(() => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        console.log("Backend URL:", backendUrl);

        if (token != null) {
            console.log(token);

             const userData = localStorage.getItem("user");
            if (userData) {
                const user = JSON.parse(userData);
                setName(user.firstName + " " + user.lastName);
                setUserFound(true);
            } else {

                // Token validation request
                axios.post(`${backendUrl}/api/user/login`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                })
                    .then((res) => {
                        console.log(res)
                        setName(res.data.user.firstName + "" + res.data.user.lastName);
                        setUserFound(true);
                    }).catch((error) => {
                        console.error("Error fetching user data:", error);
                        setUserFound(false);
                    });
            }
                
        } else {
            setName("")
        }
    }, [token, userFound]
    );

    function handleLogout() {
        localStorage.removeItem('token');
        setUserFound(false);
        window.location.href = '/login';
    }

    return (
        <div className="flex items-center space-x-3">
            <img
                className="rounded-full w-12 h-12 border-2 border-white shadow-lg"
                // eslint-disable-next-line react/prop-types
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
