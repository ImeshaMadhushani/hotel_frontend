// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({ email: "", roomId: "" });
  const [formData, setFormData] = useState({
    bookingId: "",
    roomId: "",
    email: "",
    start: "",
    end: "",
    status: "pending",
    notes: "",
    reason: "",
  });
  const [editMode, setEditMode] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const apiUrl = `${backendUrl}/api/booking`;

  // Fetch bookings
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => setBookings(res.data.bookings))
      .catch((err) => console.error(err));
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      axios
        .put(`${apiUrl}/${formData.bookingId}`, formData)
        .then((res) => {
          setBookings((prev) =>
            prev.map((booking) =>
              booking.bookingId === res.data.updatedBooking.bookingId
                ? res.data.updatedBooking
                : booking
            )
          );
          setEditMode(false);
          resetForm();
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post(apiUrl, formData)
        .then((res) => setBookings((prev) => [...prev, res.data.result]))
        .catch((err) => console.error(err));
    }
  };

  const resetForm = () => {
    setFormData({
      bookingId: "",
      roomId: "",
      email: "",
      start: "",
      end: "",
      status: "pending",
      notes: "",
      reason: "",
    });
  };

  // Handle delete booking
  const handleDelete = (bookingId) => {
    axios
      .delete(`${apiUrl}/${bookingId}`)
      .then(() =>
        setBookings((prev) => prev.filter((booking) => booking.bookingId !== bookingId))
      )
      .catch((err) => console.error(err));
  };

  // Handle edit button click
  const handleEdit = (booking) => {
    setEditMode(true);
    setFormData(booking);
  };

  // Filter bookings
  const filteredBookings = bookings.filter((booking) =>
    booking.email.toLowerCase().includes(filters.email.toLowerCase()) &&
    booking.roomId.toString().includes(filters.roomId.toString())
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">Admin Booking Management</h1>

      {/* Booking Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-lg"
      >
        <input
          type="text"
          name="roomId"
          placeholder="Room ID"
          value={formData.roomId}
          onChange={handleChange}
          required
        className="input w-full p-3 border rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="User Email"
          value={formData.email}
          onChange={handleChange}
          required
        className="input w-full p-3 border rounded-md"
        />
        <input
          type="datetime-local"
          name="start"
          value={formData.start}
          onChange={handleChange}
          required
          className="input w-full p-3 border rounded-md"
        />
        <input
          type="datetime-local"
          name="end"
          value={formData.end}
          onChange={handleChange}
          required
          className="input w-full p-3 border rounded-md"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
         className="input w-full p-3 border rounded-md"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          className="input w-full p-3 border rounded-md"
        />
        <button
          type="submit"
           className="w-full py-4 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          {editMode ? "Update Booking" : "Create Booking"}
        </button>
      </form>

      {/* Filter Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="email"
          placeholder="Filter by Email"
          value={filters.email}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="roomId"
          placeholder="Filter by Room ID"
          value={filters.roomId}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Booking Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto w-full text-left bg-white border rounded-lg shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Room ID</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Email</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Start</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">End</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Status</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking.bookingId} className="border-t">
                  <td className="px-6 py-4 text-sm text-gray-700">{booking.roomId}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{booking.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(booking.start).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(booking.end).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {booking.status}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(booking)}
                         className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(booking.bookingId)}
                      className="ml-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBooking;
