// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

function AdminBooking() {
    const [formData, setFormData] = useState({
        roomId: '',
        start: '',
        end: '',
        reason: ''
    });
    const [status, setStatus] = useState({ message: '', type: '' });
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch the list of bookings when the component is mounted
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
            const response = await fetch(`${backendUrl}/api/booking`);
            const data = await response.json();
            if (response.ok) {
                setBookings(data.bookings || []); // Assuming response contains an array of bookings
            } else {
                setStatus({ message: data.message || 'Failed to fetch bookings', type: 'error' });
            }
        } catch (error) {
            setStatus({ message: error.message || 'An error occurred while fetching bookings', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validating if the roomId, start, and end are provided
        if (!formData.roomId || !formData.start || !formData.end) {
            setStatus({ message: 'Please fill all required fields', type: 'error' });
            return;
        }

        setLoading(true);
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
            const response = await fetch(`${backendUrl}/api/booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'  // for including cookies if session-based auth is used
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ message: data.message || 'Booking created successfully', type: 'success' });
                fetchBookings(); // Refresh the booking list after successfully creating a booking
                setFormData({ roomId: '', start: '', end: '', reason: '' }); // Clear form after successful submit
            } else {
                throw new Error(data.message || 'Booking creation failed');
            }
        } catch (error) {
            setStatus({ message: error.message || 'An error occurred while creating the booking', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
            <h2 className="text-2xl font-bold mb-6">Create Booking</h2>
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                    <label htmlFor="roomId" className="block text-sm font-medium text-gray-700">
                        Room ID
                    </label>
                    <input
                        type="number"
                        name="roomId"
                        id="roomId"
                        value={formData.roomId}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="start" className="block text-sm font-medium text-gray-700">
                        Start Date
                    </label>
                    <input
                        type="datetime-local"
                        name="start"
                        id="start"
                        value={formData.start}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="end" className="block text-sm font-medium text-gray-700">
                        End Date
                    </label>
                    <input
                        type="datetime-local"
                        name="end"
                        id="end"
                        value={formData.end}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                        Reason (Optional)
                    </label>
                    <input
                        type="text"
                        name="reason"
                        id="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white hover:bg-blue-600`}
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit Booking'}
                </button>
            </form>

            {status.message && (
                <p className={`mt-4 text-center ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {status.message}
                </p>
            )}

            {/* Booking Table */}
            <div className="mt-6">
                <h3 className="text-xl font-semibold">All Bookings</h3>
                {loading ? (
                    <p>Loading bookings...</p>
                ) : (
                    <table className="min-w-full mt-4 table-auto">
                        <thead>
                            <tr className="border-b">
                                <th className="px-4 py-2">Booking ID</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Start Date</th>
                                <th className="px-4 py-2">End Date</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length ? (
                                bookings.map((booking) => (
                                    <tr key={booking.bookingId} className="border-b">
                                        <td className="px-4 py-2">{booking.bookingId}</td>
                                        <td className="px-4 py-2">{booking.email}</td>
                                        <td className="px-4 py-2">{new Date(booking.start).toLocaleString()}</td>
                                        <td className="px-4 py-2">{new Date(booking.end).toLocaleString()}</td>
                                        <td className="px-4 py-2">{booking.status}</td>
                                        <td className="px-4 py-2">{booking.reason || 'N/A'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-2 text-center">No bookings available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AdminBooking;
