// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

function AdminBooking() {
    const [formData, setFormData] = useState({
        roomId: '',
        email: '',
        start: '',
        end: '',
        reason: '',
        status: 'Available', // Default status
        bookingId: null, // Store the booking ID for editing
    });
    const [status, setStatus] = useState({ message: '', type: '' });
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendUrl}/api/booking`);
            const data = await response.json();
            if (response.ok) {
                setBookings(data.bookings || []);
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

        if (!formData.roomId || !formData.email || !formData.start || !formData.end || !formData.status) {
            setStatus({ message: 'Please fill all required fields', type: 'error' });
            return;
        }

        setLoading(true);
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
        const method = formData.bookingId ? 'PUT' : 'POST'; // Determine whether it's a new booking or editing an existing one
        const url = formData.bookingId
            ? `${backendUrl}/api/booking/${formData.bookingId}` // Edit existing booking
            : `${backendUrl}/api/booking`; // Create new booking

        try {
            const token = localStorage.getItem('token');
            if (!token) {
            throw new Error('Authentication token is missing. Please log in again.');
        }
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ message: data.message || (formData.bookingId ? 'Booking updated successfully' : 'Booking created successfully'), type: 'success' });
                fetchBookings();
                setFormData({ roomId: '', start: '', end: '', reason: '', status: 'Available', bookingId: null }); // Reset form
            } else {
                throw new Error(data.message || 'Booking creation/update failed');
            }
        } catch (error) {
            setStatus({ message: error.message || 'An error occurred while processing the booking', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (bookingId) => {
        setLoading(true);
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
              const token = localStorage.getItem('token');
            const response = await fetch(`${backendUrl}/api/booking/${bookingId}`, {
                method: 'DELETE',
                 headers: {
                'Authorization': `Bearer ${token}`, // Include token
                'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();
            if (response.ok) {
                setStatus({ message: data.message || 'Booking deleted successfully', type: 'success' });
                fetchBookings();
            } else {
                throw new Error(data.message || 'Booking deletion failed');
            }
        } catch (error) {
            setStatus({ message: error.message || 'An error occurred while deleting the booking', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (booking) => {
        setFormData({
            bookingId: booking._id, // Set booking ID for editing
            roomId: booking.roomId,
            email:booking.email,
            start: booking.start,
            end: booking.end,
            reason: booking.reason || '',
            status: booking.status || 'Available',
        });
    };

    return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
        Manage Bookings
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="roomId" className="block text-gray-700 font-medium">
              Room ID
            </label>
            <input
              type="number"
              name="roomId"
              id="roomId"
              value={formData.roomId}
              onChange={handleChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="start" className="block text-gray-700 font-medium">
              Start Date
            </label>
            <input
              type="datetime-local"
              name="start"
              id="start"
              value={formData.start}
              onChange={handleChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="end" className="block text-gray-700 font-medium">
              End Date
            </label>
            <input
              type="datetime-local"
              name="end"
              id="end"
              value={formData.end}
              onChange={handleChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="reason" className="block text-gray-700 font-medium">
            Reason (Optional)
          </label>
          <input
            type="text"
            name="reason"
            id="reason"
            value={formData.reason}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-gray-700 font-medium">
            Status
          </label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Available">Available</option>
            <option value="Pending">Pending</option>
            <option value="Booked">Booked</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full py-3 text-white rounded-lg ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : formData.bookingId ? "Update Booking" : "Submit Booking"}
        </button>
      </form>

      {/* Status Message */}
      {status.message && (
        <div
          className={`mt-6 p-4 text-center rounded-lg ${
            status.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {status.message}
        </div>
      )}

      {/* Bookings Table */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">All Bookings</h3>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Room ID</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Start</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">End</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Status</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">{booking.roomId}</td>
                  <td className="border border-gray-200 px-4 py-2">{new Date(booking.start).toLocaleString()}</td>
                  <td className="border border-gray-200 px-4 py-2">{new Date(booking.end).toLocaleString()}</td>
                  <td className="border border-gray-200 px-4 py-2">{booking.status}</td>
                  <td className="border border-gray-200 px-4 py-2 flex space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(booking)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(booking._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}


export default AdminBooking;
