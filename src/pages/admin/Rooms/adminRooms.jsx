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

  const handleFileChange = (e) => {
  setFormData({ ...formData, photos: e.target.files[0] });
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
     <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">Manage Rooms</h1>

      {/* Display Messages */}
      {message.text && (
        <p
          className={`p-3 rounded mb-4 text-center font-semibold ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </p>
      )}

      {/* Room Form */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="roomId"
            value={formData.roomId}
            onChange={handleChange}
            placeholder="Room ID"
            className="p-3 rounded border border-gray-300 text-black focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="p-3 rounded border border-gray-300 text-black focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="maxGuests"
            value={formData.maxGuests}
            onChange={handleChange}
            placeholder="Max Guests"
            className="p-3 rounded border border-gray-300 text-black focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="p-3 rounded border border-gray-300 text-black focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="file"
            name="photos"
            value={formData.photos}
            onChange={handleFileChange}
            placeholder="Photos (comma-separated URLs)"
            className="p-3 rounded border border-gray-300 text-black focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="specialDescription"
            value={formData.specialDescription}
            onChange={handleChange}
            placeholder="Special Description"
            className="p-3 rounded border border-gray-300 text-black focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            className="p-3 rounded border border-gray-300 text-black focus:ring-2 focus:ring-blue-500"
          />
          <label className="flex items-center">
            <span className="mr-2">Available</span>
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
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          {editId ? "Update Room" : "Add Room"}
        </button>
      </form>

      {/* Room Table */}
      <div className="overflow-x-auto mt-8 bg-white rounded-lg shadow-md">
        <table className="table-auto w-full text-left bg-white border rounded-lg shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Room ID</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Category</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Max Guests</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Price</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Available</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.roomId} className="border-t">
                <td className="px-6 py-4 text-sm text-gray-700">{room.roomId}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{room.category}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{room.maxGuests}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{room.price}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{room.available ? "Yes" : "No"}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <button
                    onClick={() => handleEdit(room)}
                     className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(room.roomId)}
                     className="ml-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRooms;
