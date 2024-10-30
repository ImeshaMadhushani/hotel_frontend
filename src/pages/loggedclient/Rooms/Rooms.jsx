// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import NavBarLogged from "../../../components/navbarLogged/NavBarLogged";
import axios from 'axios';

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const response = await axios.get(`${backendUrl}/api/rooms`);
                console.log(response.data); // Check the response structure
                setRooms(response.data.result); // Adjust according to actual response
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBarLogged user={user} />

            <div className="container mx-auto py-12 px-4 md:px-8 lg:px-12">
                <h1 className="text-3xl font-bold mb-8 text-[#0B192C]">Find Your Room</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rooms.map((room) => (
                        <div key={room.roomId} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={room.photos.length > 0 ? room.photos[0] : 'placeholder.jpg'} alt={room.specialDescription} className="h-48 w-full object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{room.category}</h3>
                                <p className="text-gray-700 mb-4">{room.specialDescription}</p>
                                <p className="text-gray-700 font-bold mb-4">Price: ${room.price.toFixed(2)}</p>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
