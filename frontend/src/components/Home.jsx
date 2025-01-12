import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Home() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(localStorage.getItem('username')); // Retrieve username from localStorage

    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Function to check if the token is expired
    const isTokenExpired = (token) => {
        if (!token) return true; // If no token, consider it expired
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Current time in seconds
            return decoded.exp < currentTime; // Check if the token is expired
        } catch (error) {
            console.error('Error decoding token:', error);
            return true; // In case decoding fails, consider it expired
        }
    };

    // Redirect to signin page if no token or token is expired
    useEffect(() => {
        if (!token || isTokenExpired(token)) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            navigate('/signin'); // Redirect to sign-in page if token is expired or missing
        }
    }, [token, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token from local storage
        localStorage.removeItem('username'); // Clear username from local storage
        setUsername(null); // Reset username state
        window.dispatchEvent(new Event('storage')); // Dispatch event to notify other components (like Navbar)
        navigate('/signin'); // Navigate to signin page
    };


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-purple-700 mb-6">Home</h1>
                {username ? (
                    <p className="mb-4">Welcome, {username}!</p>
                ) : (
                    <p className="mb-4">You are logged in!</p>
                )}
            </div>
        </div>
    );
}

export default Home;
