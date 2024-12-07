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
      await axios.delete(`${apiUrl}/delete/${id}`, {
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

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">Manage Feedback</h1>

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

      {/* Feedback Table */}
      <div className="overflow-x-auto mt-8 bg-white rounded-lg shadow-md">
        <table className="table-auto w-full text-left bg-white border rounded-lg shadow-lg">
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
            {feedbacks.map((feedback) => (
              <tr key={feedback._id} className="border-t">
                <td className="px-6 py-4 text-sm text-gray-700">{feedback.user.firstName}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{feedback.user.lastName}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{feedback.user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{feedback.rating}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{feedback.message}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {feedback.approved ? "Approved" : feedback.approved === false ? "Disapproved" : "Pending"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {/* Approve, Disapprove and Delete buttons */}
                  <button
                    onClick={() => handleApproval(feedback._id, true)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(feedback._id, false)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2"
                  >
                    Disapprove
                  </button>
                  <button
                    onClick={() => handleDelete(feedback._id)}
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
    </div>
  );
};

export default AdminFeedback;
