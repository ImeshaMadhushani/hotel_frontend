// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    bookingId: "", // Add bookingId to the form data
    roomId: "",
    start: "",
    end: "",
    reason: "",
    notes: "",
    email: "", // Add email to the form data
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const apiUrl = `${backendUrl}/api/booking`;

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBookings(response.data.bookings);
      setMessage({ type: "", text: "" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to fetch bookings.",
      });
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form for creating or updating booking
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // Update booking
        await axios.put(`${apiUrl}/${editId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            "Content-Type": "application/json",
        });
        setMessage({ type: "success", text: "Booking updated successfully!" });
      } else {
        // Create new booking
        console.log(formData); 
       await axios.post(apiUrl, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
       });
        console.log(localStorage.getItem("token"));  // Check if token is valid

        setMessage({ type: "success", text: "Booking created successfully!" });
      }

      // Reset form and refresh bookings
      setFormData({
        bookingId: "", // Reset bookingId
        roomId: "",
        start: "",
        end: "",
        reason: "",
        notes: "",
        email: "", // Clear email field
      });
      setEditId(null);
      fetchBookings();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to save booking.",
      });
    }
  };

  // Delete booking
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      await axios.delete(`${apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMessage({ type: "success", text: "Booking deleted successfully!" });
      fetchBookings();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to delete booking.",
      });
    }
  };

  // Load booking details for editing
  const handleEdit = (booking) => {
    setFormData({
      bookingId: booking.bookingId, // Populate bookingId field
      roomId: booking.roomId,
      start: booking.start,
      end: booking.end,
      reason: booking.reason,
      notes: booking.notes,
      email: booking.email, // Populate email field
    });
    setEditId(booking.bookingId);
  };

  // Fetch bookings on component load
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">Manage Bookings</h1>

      {/* Display Messages */}
      {message.text && (
        <p
          className={`p-2 rounded mb-4 ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {message.text}
        </p>
      )}

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="bookingId"
            value={formData.bookingId}
            onChange={handleChange}
            placeholder="Booking ID"
            className="input w-full p-3 border rounded-md"
          />
          <input
            type="number"
            name="roomId"
            value={formData.roomId}
            onChange={handleChange}
            placeholder="Room ID"
            className="input w-full p-3 border rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input w-full p-3 border rounded-md"
            required
          />
          <input
            type="datetime-local"
            name="start"
            value={formData.start}
            onChange={handleChange}
            className="input w-full p-3 border rounded-md"
            required
          />
          <input
            type="datetime-local"
            name="end"
            value={formData.end}
            onChange={handleChange}
            className="input w-full p-3 border rounded-md"
            required
          />
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Reason"
            className="input w-full p-3 border rounded-md"
          />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            className="p-2 rounded text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full py-4 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          {editId ? "Update Booking" : "Create Booking"}
        </button>
      </form>

      {/* Booking Table */}
      <table className="min-w-full mt-8">
        <thead>
          <tr>
            <th className="px-6 py-4 text-sm font-medium text-left text-gray-500">Booking ID</th>
            <th className="px-6 py-4 text-sm font-medium text-left text-gray-500">Room ID</th>
            <th className="px-6 py-4 text-sm font-medium text-left text-gray-500">Email</th>
            <th className="px-6 py-4 text-sm font-medium text-left text-gray-500">Start Time</th>
            <th className="px-6 py-4 text-sm font-medium text-left text-gray-500">End Time</th>
            <th className="px-6 py-4 text-sm font-medium text-left text-gray-500">Reason</th>
            <th className="px-6 py-4 text-sm font-medium text-left text-gray-500">Notes</th>
            <th className="px-6 py-4 text-sm font-medium text-left text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingId} className="border-t">
              <td className="px-6 py-4 text-sm text-gray-700">{booking.bookingId}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{booking.roomId}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{booking.email}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {new Date(booking.start).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {new Date(booking.end).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{booking.reason}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{booking.notes}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                <button
                  onClick={() => handleEdit(booking)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(booking.bookingId)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookings;
