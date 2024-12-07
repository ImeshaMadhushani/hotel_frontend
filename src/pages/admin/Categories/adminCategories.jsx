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
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    category: null,
  });

  const ITEMS_PER_PAGE = 6;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const apiUrl = `${backendUrl}/api/category`;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiUrl);
      setCategories(response.data);
      setMessage({ type: "", text: "" });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to fetch categories." },err);
    }
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${apiUrl}/${editId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMessage({ type: "success", text: "Category updated successfully!" });
      } else {
        await axios.post(apiUrl, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMessage({ type: "success", text: "Category created successfully!" });
      }

      setFormData({
        name: "",
        price: "",
        features: "",
        description: "",
        image: "",
      });
      setEditId(null);
      fetchCategories();
      setCurrentPage(1);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to save category.",
      });
    }
  };

  const openDeleteConfirmation = (category) => {
    setDeleteConfirmation({
      isOpen: true,
      category: category,
    });
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation({
      isOpen: false,
      category: null,
    });
  };

  const handleDelete = async () => {
    const category = deleteConfirmation.category;
    if (!category) return;

    try {
      await axios.delete(`${apiUrl}/${category._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setMessage({ type: "success", text: "Category deleted successfully!" });
      closeDeleteConfirmation();
      fetchCategories();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to delete category.",
      });
    }
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      price: category.price,
      features: category.features.join(", "),
      description: category.description,
      image: category.image,
    });
    setEditId(category._id);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">Manage Categories</h1>

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
          <input
            type="file"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="input w-full p-3 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-4 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          {editId ? "Update Category" : "Add Category"}
        </button>
      </form>

      {/* Category Table */}
      <div className="overflow-x-auto mt-8">
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
            {currentCategories.map((category) => (
              <tr key={category._id} className="border-t">
                <td className="px-6 py-4 text-sm text-gray-700">{category.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{category.price}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{category.description}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{category.features.join(", ")}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{category.image}</td>
                <td className="px-6 py-4 text-sm text-gray-700 flex space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteConfirmation(category)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4 items-center">
        <div>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-md mr-2"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Next
          </button>
        </div>
        <div className="text-gray-700">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this category?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={closeDeleteConfirmation}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
