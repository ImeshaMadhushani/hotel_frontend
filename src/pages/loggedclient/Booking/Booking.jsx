// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../../components/footer/footer';

export default function Booking() {
    const { roomId } = useParams(); // Get the roomId from URL params
    const [room, setRoom] = useState(null);
    const [email, setEmail] = useState('');        // User Email field
    const [startDate, setStartDate] = useState(''); // Booking Start Date field
    const [endDate, setEndDate] = useState('');     // Booking End Date field
    const [note, setNote] = useState('');           // Additional Notes field
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const response = await axios.get(`${backendUrl}/api/rooms/${roomId}`);
                setRoom(response.data.result);
            } catch (error) {
                console.error('Error fetching room details:', error);
            }
        };
        fetchRoomDetails();
    }, [roomId]);

    // Handle the booking form submission
    const handleBooking = async (e) => {
        e.preventDefault();

        // Form data to be sent to the server
        const bookingData = {
            email,
            startDate,
            endDate,
            note,
            roomId,
        };

        // You can add booking logic here, for example, marking the room as unavailable
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            await axios.put(`${backendUrl}/api/rooms/${roomId}`, { isAvailable: false }); // Set the room as unavailable

            // Send the booking data to the backend (optional)
            await axios.post(`${backendUrl}/api/bookings`, bookingData); // Create booking entry

            // Redirect to Rooms page after booking
            navigate('/rooms');
        } catch (error) {
            console.error('Error booking room:', error);
        }
    };

    if (!room) return <p>Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto py-12 px-4 md:px-8 lg:px-12">
                <h1 className="text-3xl font-bold mb-8 text-[#0B192C]">Room Booking</h1>

                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-[#0B192C]">{room.category}</h2>
                    <p className="text-gray-700 mb-4">{room.specialDescription}</p>
                    <p className="text-gray-700 font-bold mb-4">Price: ${room.price.toFixed(2)}</p>
                    <p className="text-gray-700 mb-4">Room Number: {room.roomId}</p>
                    <p className={`text-sm font-semibold ${room.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                        {room.isAvailable ? 'Available' : 'Not Available'}
                    </p>

                    {/* Booking Form */}
                    <form onSubmit={handleBooking} className="mt-6">
                     

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="startDate" className="block text-sm font-semibold text-gray-700">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="endDate" className="block text-sm font-semibold text-gray-700">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="note" className="block text-sm font-semibold text-gray-700">Additional Notes</label>
                            <textarea
                                id="note"
                                name="note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                rows="4"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 w-full"
                            disabled={!room.isAvailable} // Disable button if room is not available
                        >
                            {room.isAvailable ? 'Book Now' : 'Room Not Available'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
