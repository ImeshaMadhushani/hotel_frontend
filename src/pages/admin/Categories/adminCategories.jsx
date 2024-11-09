// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you're using Axios for API requests
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function AdminCategory() {
    // State variables
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        name: "",
        price: "",
        description: "",
        image: null, // Change this to handle file instead of URL
        features: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("/api/categories");
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    setCategories([]);
                    setError("API response is not an array.");
                }
            } catch (err) {
                setError("Failed to fetch categories.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Handle category creation
    const handleCreateCategory = async (e) => {
        e.preventDefault();

        // Prepare form data to include the image file
        const formData = new FormData();
        formData.append("name", newCategory.name);
        formData.append("price", newCategory.price);
        formData.append("description", newCategory.description);
        formData.append("features", newCategory.features.join(","));
        if (newCategory.image) {
            formData.append("image", newCategory.image);
        }

        try {
            const response = await axios.post("/api/categories", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setCategories((prevCategories) => [...prevCategories, response.data.result]);
            setNewCategory({
                name: "",
                price: "",
                description: "",
                image: null, // Reset after submission
                features: [],
            });
        } catch (err) {
            setError("Failed to create category.");
            console.error(err);
        }
    };

    // Handle category deletion
    const handleDeleteCategory = async (categoryName) => {
        try {
            await axios.delete(`/api/categories/${categoryName}`);
            setCategories((prevCategories) =>
                prevCategories.filter((cat) => cat.name !== categoryName)
            );
        } catch (err) {
            setError("Failed to delete category.");
            console.error(err);
        }
    };

    // Handle category editing (for simplicity, just displaying the form to edit the name here)
    const handleEditCategory = (category) => {
        setNewCategory(category); // Pre-fill the form with the category's data
    };

    // Handle feature input change and addition
    const handleFeatureInputChange = (e) => {
        const value = e.target.value;
        const featuresArray = value.split(",").map(feature => feature.trim()).filter(feature => feature);
        setNewCategory({
            ...newCategory,
            features: featuresArray,
        });
    };

    // Handle image file change
    const handleImageChange = (e) => {
        setNewCategory({
            ...newCategory,
            image: e.target.files[0], // Set the selected file
        });
    };

    if (loading) return <div className="text-center text-gray-600">Loading...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Category Management</h1>

            {/* Category Creation Form */}
            <form onSubmit={handleCreateCategory} className="mb-6 space-y-4 max-w-lg mx-auto">
                <input
                    type="text"
                    placeholder="Category Name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newCategory.price}
                    onChange={(e) => setNewCategory({ ...newCategory, price: e.target.value })}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    placeholder="Description"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Features Input */}
                <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Features (comma separated)</h3>
                    <input
                        type="text"
                        placeholder="Enter features (comma separated)"
                        value={newCategory.features.join(", ")}
                        onChange={handleFeatureInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Image File Input */}
                <label className="block text-gray-600 text-sm font-medium mb-2">Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Create Category
                </button>
            </form>

            {/* Display any error messages */}
            {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

            {/* Category List */}
            <div className="category-list space-y-6">
                {categories.length === 0 ? (
                    <div className="text-center text-gray-500">No categories available</div>
                ) : (
                    categories.map((category) => (
                        <div key={category._id} className="category-item bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h2 className="text-2xl font-semibold text-gray-800">{category.name}</h2>
                            <p className="text-gray-600">{category.description}</p>
                            <p className="text-gray-800 font-bold">Price: ${category.price}</p>
                            <p className="text-gray-600">Features: {category.features.join(", ")}</p>
                            {category.image && <img src={category.image} alt={category.name} className="mt-4 w-32 h-32 object-cover rounded-lg" />}
                            <div className="mt-4 flex space-x-4">
                                <button
                                    onClick={() => handleEditCategory(category)}
                                    className="text-yellow-500 hover:text-yellow-600 focus:outline-none"
                                >
                                    <FaEdit className="inline mr-2" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteCategory(category.name)}
                                    className="text-red-500 hover:text-red-600 focus:outline-none"
                                >
                                    <FaTrashAlt className="inline mr-2" /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
