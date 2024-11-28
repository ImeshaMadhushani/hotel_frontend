// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    roomId: "",
    category: "",
    maxGuests: "",
    available: true,
    photos: "",
    specialDescription: "",
    notes: "",
    price: "",
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const apiUrl = `${backendUrl}/api/rooms`;

  // Fetch all rooms
  const fetchRooms = async () => {
    try {
        const response = await axios.get(apiUrl);
         console.log("Rooms response:", response.data); 
      setRooms(response.data.result);
      setMessage({ type: "", text: "" });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to fetch rooms." },err);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form for creating or updating room
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // Update room
        await axios.put(
          `${apiUrl}/${editId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        setMessage({ type: "success", text: "Room updated successfully!" });
      } else {
        // Create new room
        await axios.post(apiUrl, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMessage({ type: "success", text: "Room created successfully!" });
      }

      // Reset form and refresh rooms
      setFormData({
        roomId: "",
        category: "",
        maxGuests: "",
        available: true,
        photos: "",
        specialDescription: "",
        notes: "",
        price: "",
      });
      setEditId(null);
      fetchRooms();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to save room.",
      });
    }
  };

  // Delete room
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;

    try {
      await axios.delete(`${apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMessage({ type: "success", text: "Room deleted successfully!" });
      fetchRooms();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to delete room.",
      });
    }
  };

  // Load room details for editing
  const handleEdit = (room) => {
    setFormData({
      roomId: room.roomId,
      category: room.category,
      maxGuests: room.maxGuests,
      available: room.available,
      photos: room.photos.join(", "), // Assuming photos are an array of URLs
      specialDescription: room.specialDescription,
      notes: room.notes,
      price: room.price,
    });
    setEditId(room.roomId);
  };

  // Fetch rooms on component load
  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="p-6 bg-blue-600 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Rooms</h1>

      {/* Display Messages */}
      {message.text && (
        <p
          className={`p-2 rounded mb-4 ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </p>
      )}

      {/* Room Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <input
            type="number"
            name="roomId"
            value={formData.roomId}
            onChange={handleChange}
            placeholder="Room ID"
            className="p-2 rounded text-black"
            required
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="p-2 rounded text-black"
            required
          />
          <input
            type="number"
            name="maxGuests"
            value={formData.maxGuests}
            onChange={handleChange}
            placeholder="Max Guests"
            className="p-2 rounded text-black"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="p-2 rounded text-black"
            required
          />
          <input
            type="text"
            name="photos"
            value={formData.photos}
            onChange={handleChange}
            placeholder="Photos (comma-separated URLs)"
            className="p-2 rounded text-black"
          />
          <input
            type="text"
            name="specialDescription"
            value={formData.specialDescription}
            onChange={handleChange}
            placeholder="Special Description"
            className="p-2 rounded text-black"
          />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            className="p-2 rounded text-black"
          />
          <label>
            Available
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={() => setFormData({ ...formData, available: !formData.available })}
              className="ml-2"
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-white text-blue-600 font-bold rounded hover:bg-gray-200"
        >
          {editId ? "Update Room" : "Add Room"}
        </button>
      </form>

      {/* Room Table */}
      <table className="w-full bg-white text-black rounded overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-2">Room ID</th>
            <th className="p-2">Category</th>
            <th className="p-2">Max Guests</th>
            <th className="p-2">Price</th>
            <th className="p-2">Available</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.roomId} className="border-b hover:bg-gray-100">
              <td className="p-2">{room.roomId}</td>
              <td className="p-2">{room.category}</td>
              <td className="p-2">{room.maxGuests}</td>
              <td className="p-2">{room.price}</td>
              <td className="p-2">{room.available ? "Yes" : "No"}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(room)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(room.roomId)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
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

export default AdminRooms;
