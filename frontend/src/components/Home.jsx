import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    // Retrieve the username and token from local storage
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    // Redirect to signin page if no token (not logged in)
    useEffect(() => {
        if (!token) {
            navigate('/signin'); // Redirect to sign-in page if not logged in
        }
    }, [token, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token from local storage
        localStorage.removeItem('username'); // Clear username from local storage
        navigate('/signin'); // Navigate to signin page
    };

    // If there's no username (meaning not logged in), show guest
    const displayName = username || 'Guest';

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-purple-700 mb-6">Home</h1>
                <p className="mb-4">Welcome, {displayName}!</p>
                <button
                    onClick={handleLogout}
                    className="bg-purple-600 text-white p-3 rounded-lg shadow hover:bg-purple-700 transition duration-300"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Home;
