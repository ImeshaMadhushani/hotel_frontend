// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({  
    roomId: "",
    category: "",
    maxGuests: "",
    available: true, // Default to true
    photos: [], 
    specialDescription: "",
    notes: "",
    price: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const apiUrl = `${backendUrl}/api/rooms`;

  // Fetch all rooms
  const fetchRooms = async () => {
    try {
      const response = await axios.get(apiUrl);
      console.log("Rooms response:", response.data); 
      
      // Ensure available is a boolean
      const processedRooms = response.data.result.map(room => ({
        ...room,
        available: room.available === true || room.available === "true"
      }));
      
      setRooms(processedRooms);
      setMessage({ type: "", text: "" });
    } catch (err) {
      console.error("Fetch rooms error:", err);
      setMessage({ type: "error", text: "Failed to fetch rooms." });
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle different input types
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  // Upload images to server
  const uploadImages = async () => {
    if (selectedFiles.length === 0) return [];

    const imageUploadPromises = selectedFiles.map(async (file) => {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post(`${backendUrl}/api/upload`, formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem("token")}` 
          }
        });

        return response.data.imageUrl;
      } catch (error) {
        console.error('Image upload error:', error);
        setMessage({ 
          type: "error", 
          text: `Failed to upload image: ${file.name}` 
        });
        return null;
      }
    });

    return await Promise.all(imageUploadPromises);
  };

  // Submit form for creating or updating room
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload images first
      const uploadedImageUrls = await uploadImages();

      // Prepare room data
      const roomData = {
        ...formData,
        available: !!formData.available, // Ensure boolean
        photos: uploadedImageUrls.filter(url => url !== null)
      };

      if (editId) {
        // Update room
        await axios.put(
          `${apiUrl}/${editId}`,
          roomData,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        setMessage({ type: "success", text: "Room updated successfully!" });
      } else {
        // Create new room
        await axios.post(apiUrl, roomData, {
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
        photos: [],
        specialDescription: "",
        notes: "",
        price: "",
      });
      setSelectedFiles([]);
      setEditId(null);
      fetchRooms();
    } catch (err) {
      console.error("Submit error:", err);
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
      available: room.available, // Ensure it's a boolean
      photos: room.photos,
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
            message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
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
            multiple
            name="photos"
            onChange={handleFileChange}
            accept="image/*"
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
              onChange={handleChange}
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
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-bold
                    ${room.available ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}
                  `}>
                    {room.available ? "Available" : "Not Available"}
                  </span>
                </td>
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