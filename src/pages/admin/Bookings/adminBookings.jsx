import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    roomId: '',
    start: '',
    end: '',
    reason: '',
    notes: '',
    email: '',
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  // New state for delete confirmation
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    booking: null
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const apiUrl = `${backendUrl}/api/booking`;

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Bookings response:", response.data);
      setBookings(response.data.bookings);
      setMessage({ type: "", text: "" });
    } catch (err) {
      console.error("Fetch bookings error:", err);
      setMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to fetch bookings." 
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

    // Validate date range
    const startDate = new Date(formData.start);
    const endDate = new Date(formData.end);
    if (endDate <= startDate) {
      setMessage({
        type: "error",
        text: "End time must be later than start time."
      });
      return;
    }

    try {
      let response;
      if (editId) {
        // Update existing booking
        response = await axios.put(`${apiUrl}/${editId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMessage({ type: "success", text: "Booking updated successfully!" });
      } else {
        
        // Create new booking
        response = await axios.post(apiUrl, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMessage({ type: "success", text: "Booking created successfully!" });
      }

      // Reset form and refresh bookings
      setFormData({
        roomId: "",
        start: "",
        end: "",
        reason: "",
        notes: "",
        email: "",
      });
      setEditId(null);
      fetchBookings();
    } catch (err) {
      console.error("Submit booking error:", err.response?.data || err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to save booking.",
      });
    }
  };

  // Open delete confirmation dialog
  const openDeleteConfirmation = (booking) => {
    setDeleteConfirmation({
      isOpen: true,
      booking: booking
    });
  };

  // Close delete confirmation dialog
  const closeDeleteConfirmation = () => {
    setDeleteConfirmation({
      isOpen: false,
      booking: null
    });
  };

  // Handle booking deletion
  const handleDelete = async () => {
    const booking = deleteConfirmation.booking;
    if (!booking) return;

    try {
      // Use the MongoDB _id for deletion, not bookingId
      await axios.delete(`${apiUrl}/${booking._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      
      setMessage({ 
        type: "success", 
        text: "Booking deleted successfully!" 
      });
      
      // Close confirmation dialog
      closeDeleteConfirmation();
      
      // Refresh bookings after deletion
      fetchBookings();
    } catch (err) {
      console.error("Delete booking error:", err.response?.data || err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to delete booking.",
      });
      // Close confirmation dialog
      closeDeleteConfirmation();
    }
  };

  // Load booking details for editing
  const handleEdit = (booking) => {
    // Convert dates to local datetime-local format
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 16);
    };

    setFormData({
      roomId: booking.roomId,
      start: formatDate(booking.start),
      end: formatDate(booking.end),
      reason: booking.reason || "",
      notes: booking.notes || "",
      email: booking.email,
    });
    // Use MongoDB _id for editing
    setEditId(booking._id);
  };

  // Fetch bookings on component load
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">Manage Bookings</h1>

      {/* Message display */}
      {message.text && (
        <p
          className={`p-2 rounded mb-4 ${message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
        >
          {message.text}
        </p>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this booking?</p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button 
                onClick={closeDeleteConfirmation}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form remains the same */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            className="p-2 rounded text-black w-full border"
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
      <div className="overflow-x-auto mt-6">
        <table className="table-auto w-full text-left bg-white border rounded-lg shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Booking ID</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Room ID</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Email</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Start Time</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">End Time</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Reason</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Notes</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-t">
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
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(booking)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteConfirmation(booking)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;