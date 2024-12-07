// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

const FeedbackForm = () => {
    const [rating, setRating] = useState("");
    const [message, setMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state
    const [submitting, setSubmitting] = useState(false); // Submitting state

    // Fetch approved feedbacks on component mount
    useEffect(() => {
        const fetchFeedbacks = async () => {
            setLoading(true);
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const apiUrl = `${backendUrl}/api/feedback?sort=createdAt:desc`;
                const response = await axios.get(apiUrl);
                // Filter approved feedbacks on frontend, if backend doesn't do it
                const approvedFeedbacks = response.data.feedbacks?.filter(fb => fb.approved === true) || [];
                setFeedbacks(approvedFeedbacks);
            } catch (error) {
                console.error("Error fetching feedbacks:", error);
                setErrorMessage("Failed to load feedbacks. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchFeedbacks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const apiUrl = `${backendUrl}/api/feedback`;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setErrorMessage("User not authenticated");
                setSubmitting(false);
                return;
            }

            const response = await axios.post(
                apiUrl,
                { rating, message },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setResponseMessage(response.data.message || "Feedback submitted successfully!");
            setErrorMessage("");
            setRating("");
            setMessage("");
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Error submitting feedback");
            setResponseMessage("");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                {/* Feedback Form */}
                <div style={styles.formWrapper}>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label htmlFor="rating">Rating (1-5):</label>
                            <input
                                type="number"
                                id="rating"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                required
                                min="1"
                                max="5"
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label htmlFor="message">Feedback:</label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                style={styles.textarea}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            style={{
                                ...styles.button,
                                opacity: submitting ? 0.7 : 1,
                                cursor: submitting ? "not-allowed" : "pointer",
                            }}
                            disabled={submitting}
                        >
                            {submitting ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                    {responseMessage && <p style={styles.success}>{responseMessage}</p>}
                    {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                </div>

                {/* Feedback List */}
                <div style={styles.feedbackListWrapper}>
                    <h3 style={styles.feedbackListTitle}>User Feedbacks</h3>
                    {loading ? (
                        <p>Loading feedbacks...</p>
                    ) : feedbacks.length > 0 ? (
                        <div style={styles.feedbackList}>
                            {feedbacks.map((feedback) => (
                                <div key={feedback._id} style={styles.feedbackItem}>
                                    <p>
                                        <strong>
                                            {feedback.user?.firstName || "Anonymous"} {feedback.user?.lastName || ""}
                                        </strong>
                                    </p>
                                    <p>Rating: {feedback.rating}</p>
                                    <p>{feedback.message}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No approved feedback available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
    },
    formContainer: {
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
    },
    formWrapper: {
        width: "45%",
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    feedbackListWrapper: {
        width: "45%",
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    inputGroup: {
        marginBottom: "15px",
    },
    input: {
        width: "100%",
        padding: "10px",
        marginTop: "5px",
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
    textarea: {
        width: "100%",
        padding: "10px",
        marginTop: "5px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        resize: "vertical",
    },
    button: {
        padding: "10px 15px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    success: {
        marginTop: "15px",
        color: "green",
    },
    error: {
        marginTop: "15px",
        color: "red",
    },
    feedbackListTitle: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "15px",
    },
    feedbackList: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    feedbackItem: {
        border: "1px solid #eee",
        padding: "10px",
        borderRadius: "4px",
    },
};

export default FeedbackForm;
