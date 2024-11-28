// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    features: "",
    description: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const apiUrl = `${backendUrl}/api/category`;

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiUrl);
      setCategories(response.data);
      setMessage({ type: "", text: "" });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to fetch categories." },err);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form for creating or updating category
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // Update category
        await axios.put(
          `${apiUrl}/${editId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        setMessage({ type: "success", text: "Category updated successfully!" });
      } else {
        // Create new category
        await axios.post(apiUrl, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMessage({ type: "success", text: "Category created successfully!" });
      }

      // Reset form and refresh categories
      setFormData({
        name: "",
        price: "",
        features: "",
        description: "",
        image: "",
      });
      setEditId(null);
      fetchCategories();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to save category.",
      });
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(`${apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMessage({ type: "success", text: "Category deleted successfully!" });
      fetchCategories();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to delete category.",
      });
    }
  };

  // Load category details for editing
  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      price: category.price,
      features: category.features.join(", "),
      description: category.description,
      image: category.image,
    });
    setEditId(category.name);
  };

  // Fetch categories on component load
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6 bg-blue-600 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>

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

      {/* Category Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Category Name"
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
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="Features (comma-separated)"
            className="p-2 rounded text-black"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="p-2 rounded text-black"
            required
                  />
                  <label>Image
          <input
            type="file"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="p-2 rounded text-black"
          /></label>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-white text-blue-600 font-bold rounded hover:bg-gray-200"
        >
          {editId ? "Update Category" : "Add Category"}
        </button>
      </form>

      {/* Category Table */}
      <table className="w-full bg-white text-black rounded overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Description</th>
            <th className="p-2">Features</th>
            <th className="p-2">Image</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="border-b hover:bg-gray-100">
              <td className="p-2">{category.name}</td>
              <td className="p-2">{category.price}</td>
              <td className="p-2">{category.description}</td>
              <td className="p-2">{category.features.join(", ")}</td>
               <td className="p-2">{category.image}</td>
              
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.name)}
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

export default AdminCategories;

