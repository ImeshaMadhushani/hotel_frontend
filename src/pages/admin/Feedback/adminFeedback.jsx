// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const apiUrl = `${backendUrl}/api/feedback`;

  // Fetch all feedbacks
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(apiUrl);
      setFeedbacks(response.data.feedbacks); // Assuming feedbacks are in 'feedbacks' key
      setMessage({ type: "", text: "" });
    } catch (err) {
      console.error("Error fetching feedbacks:", err); // Log the detailed error
      setMessage({ type: "error", text: "Failed to fetch feedbacks. Please try again later." });
    }
  };

  // Approve or disapprove feedback
  const handleApproval = async (id, approved) => {
    if (approved === undefined) return; // Prevent undefined state updates

    try {
      // Send the approval status to the backend
      // eslint-disable-next-line no-unused-vars
      const response = await axios.put(
        `${apiUrl}/${id}`,
        { approved },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      // Update the feedback status in the local state
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((feedback) =>
          feedback._id === id ? { ...feedback, approved } : feedback
        )
      );

      // Set success message
      setMessage({
        type: "success",
        text: `Feedback ${approved ? "approved" : "disapproved"} successfully!`,
      });
    } catch (err) {
      console.error("Error updating feedback approval:", err); // Log the error
      setMessage({
        type: "error",
        text: "Failed to update feedback. Please try again later.",
      });
    }
  };

  // Delete feedback
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // Set success message
      setMessage({ type: "success", text: "Feedback deleted successfully!" });

      // Remove deleted feedback from the local state
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.filter((feedback) => feedback._id !== id)
      );
    } catch (err) {
      console.error("Error deleting feedback:", err); // Log the error
      setMessage({
        type: "error",
        text: "Failed to delete feedback. Please try again later.",
      });
    }
  };

  // Fetch feedbacks on component load
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Sort feedbacks by 'createdAt' (or similar) in descending order
  const sortedFeedbacks = [...feedbacks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Manage Feedback</h1>

      {/* Display Messages */}
      {message.text && (
        <p
          className={`p-4 rounded-md text-center font-semibold mb-6 ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </p>
      )}

      {/* Feedback Table */}
      <div className="overflow-x-auto mt-6 bg-white rounded-lg shadow-md">
        <table className="table-auto w-full text-left border-separate border-spacing-0.5">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">First Name</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Last Name</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Email</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Rating</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Feedback</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Status</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedFeedbacks.map((feedback) => (
              <tr key={feedback._id} className="border-t">
                <td className="px-6 py-4 text-sm text-gray-700">{feedback.user.firstName}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{feedback.user.lastName}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{feedback.user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{feedback.rating}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{feedback.message}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {feedback.approved ? "Approved" : feedback.approved === false ? "Disapproved" : "Pending"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 flex space-x-2">
                  {/* Approve, Disapprove and Delete buttons */}
                  <button
                    onClick={() => handleApproval(feedback._id, true)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(feedback._id, false)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                  >
                    Disapprove
                  </button>
                  <button
                    onClick={() => handleDelete(feedback._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
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

export default AdminFeedback;
