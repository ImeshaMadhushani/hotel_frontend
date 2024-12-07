// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import NavBarLogged from "../../../components/navbarLogged/NavBarLogged";
import axios from 'axios';
import Footer from '../../../components/footer/footer';

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [filter, setFilter] = useState({ category: "", price: "", availability: "" });
    const [selectedRoom, setSelectedRoom] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const response = await axios.get(`${backendUrl}/api/rooms`);
                
                // Ensure availability is consistently processed
                const processedRooms = response.data.result.map(room => ({
                    ...room,
                    isAvailable: room.available === true || room.available === "true"
                }));

                setRooms(processedRooms);
                setFilteredRooms(processedRooms);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    useEffect(() => {
        let filtered = [...rooms];

        if (filter.category) {
            filtered = filtered.filter((room) =>
                room.category.toLowerCase().includes(filter.category.toLowerCase())
            );
        }

        if (filter.price) {
            filtered = filtered.filter((room) => room.price <= parseFloat(filter.price));
        }

        if (filter.availability !== "") {
            const isAvailable = filter.availability === "available";
            filtered = filtered.filter((room) => room.isAvailable === isAvailable);
        }

        setFilteredRooms(filtered);
    }, [filter, rooms]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: value,
        }));
    };

    const handleBookNowClick = (room) => {
        setSelectedRoom(room);
    };

    const closeModal = () => {
        setSelectedRoom(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBarLogged user={user} />

            <div className="container mx-auto py-12 px-4 md:px-8 lg:px-12">
                <h1 className="text-3xl font-bold mb-8 text-[#0B192C]">Find Your Room</h1>

                <div className="mb-6 flex space-x-4">
                    <input
                        type="text"
                        name="category"
                        value={filter.category}
                        onChange={handleFilterChange}
                        placeholder="Filter by Category"
                        className="p-3 rounded border border-gray-300 text-black focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2 md:w-1/3"
                    />
                    <input
                        type="number"
                        name="price"
                        value={filter.price}
                        onChange={handleFilterChange}
                        placeholder="Max Price"
                        className="p-3 rounded border border-gray-300 text-black focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2 md:w-1/3"
                    />
                    <select
                        name="availability"
                        value={filter.availability}
                        onChange={handleFilterChange}
                        className="p-3 rounded border border-gray-300 text-black focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2 md:w-1/3"
                    >
                        <option value="">Filter by Availability</option>
                        <option value="available">Available</option>
                        <option value="notAvailable">Not Available</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredRooms.map((room) => (
                        <div key={room.roomId} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                            <img
                                src={room.photos.length > 0 ? room.photos[0] : 'placeholder.jpg'}
                                alt={room.specialDescription}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-[#0B192C]">{room.category}</h3>
                                <p className="text-gray-700 mb-4">{room.specialDescription}</p>
                                <p className="text-gray-700 font-bold mb-4">Price: ${room.price.toFixed(2)}</p>
                                <p className="text-gray-700 mb-2">Room Number: {room.roomId}</p>
                                <p className={`text-sm font-semibold ${room.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                                    {room.isAvailable ? 'Available' : 'Not Available'}
                                </p>
                                <button
                                    className={`font-semibold py-3 px-6 rounded-lg transition duration-200 mt-4 w-full ${
                                        room.isAvailable 
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                    onClick={() => room.isAvailable && handleBookNowClick(room)}
                                    disabled={!room.isAvailable}
                                >
                                    {room.isAvailable ? 'Book Now' : 'Not Available'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedRoom && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-[#0B192C]">Book Room</h2>
                        <p className="text-gray-700 mb-4">
                            To book this room, please contact us at: <br />
                            <span className="font-semibold text-blue-500">(123) 456-7890</span>
                        </p>
                        <p className="text-gray-700 mb-2">Room: {selectedRoom.category}</p>
                        <p className="text-gray-700 mb-6">Price: ${selectedRoom.price.toFixed(2)}</p>
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 w-full"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}