// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import NavBarLogged from "../../../components/navbarLogged/NavBarLogged";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../../../components/footer/footer';

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [filter, setFilter] = useState({ category: "", price: "", availability: "" }); // Added availability filter
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const response = await axios.get(`${backendUrl}/api/rooms`);
                console.log(response.data); // Check the response structure
                setRooms(response.data.result);
                setFilteredRooms(response.data.result); // Initially, all rooms are visible
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    // Handle filter change
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: value,
        }));
    };

    // Apply filter to the rooms
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

        if (filter.availability !== "") { // Check if availability is set
            const isAvailable = filter.availability === "available"; // If "available" selected, filter for true
            filtered = filtered.filter((room) => room.isAvailable === isAvailable); // Ensure room.isAvailable is a boolean
        }

        setFilteredRooms(filtered);
    }, [filter, rooms]);

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBarLogged user={user} />

            <div className="container mx-auto py-12 px-4 md:px-8 lg:px-12">
                <h1 className="text-3xl font-bold mb-8 text-[#0B192C]">Find Your Room</h1>

                {/* Filter Section */}
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
                    {/* Availability Filter */}
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

                {/* Display Rooms */}
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
                                <p className="text-gray-700 mb-2">Room Number: {room.roomId}</p> {/* Display Room Number */}
                                <p className={`text-sm font-semibold ${room.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                                    {room.isAvailable ? 'Available' : 'Not Available'} {/* Display Availability Status */}
                                </p>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 mt-4 w-full">
                                    <Link to={`/booking/${room.roomId}`}>Book Now</Link>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
}
