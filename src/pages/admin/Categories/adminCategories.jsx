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
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">Manage Categories</h1>

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
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Category Name"
           className="input w-full p-3 border rounded-md"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="input w-full p-3 border rounded-md"
            required
          />
          <input
            type="text"
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="Features (comma-separated)"
           className="input w-full p-3 border rounded-md"
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
           className="input w-full p-3 border rounded-md"
          /></label>
        </div>
        <button
          type="submit"
         className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          {editId ? "Update Category" : "Add Category"}
        </button>
      </form>

      {/* Category Table */}
      <table className="table-auto w-full text-left bg-white border rounded-lg shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-sm font-medium text-gray-600">Name</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-600">Price</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-600">Description</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-600">Features</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-600">Image</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="border-t">
              <td className="px-6 py-4 text-sm text-gray-700">{category.name}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{category.price}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{category.description}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{category.features.join(", ")}</td>
               <td className="px-6 py-4 text-sm text-gray-700">{category.image}</td>
              
              <td className="px-6 py-4 text-sm text-gray-700">
                <button
                  onClick={() => handleEdit(category)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.name)}
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
  );
};

export default AdminCategories;

