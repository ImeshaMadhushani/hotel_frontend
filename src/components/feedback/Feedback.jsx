// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
    const [rating, setRating] = useState('');
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const apiUrl = `${backendUrl}/api/feedback`;

        try {
            const token = localStorage.getItem('token'); // Assuming the user's token is stored in localStorage
            if (!token) {
                setErrorMessage('User not authenticated');
                return;
            }

            const response = await axios.post(
                apiUrl,
                { rating, message },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
                    },
                }
            );

            setResponseMessage(response.data.message);
            setErrorMessage('');
            setRating('');
            setMessage('');
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Error submitting feedback');
            setResponseMessage('');
        }
    };

    return (
        <div className="feedback-form-container" style={styles.container}>
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
                <button type="submit" style={styles.button}>Submit</button>
            </form>
            {responseMessage && <p style={styles.success}>{responseMessage}</p>}
            {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        resize: 'vertical',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    success: {
        marginTop: '15px',
        color: 'green',
    },
    error: {
        marginTop: '15px',
        color: 'red',
    },
};

export default FeedbackForm;
