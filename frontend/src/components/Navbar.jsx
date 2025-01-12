import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [collegeCode, setCollegeCode] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Track login state based on localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is signed in when the component mounts
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }

        // Listen for changes in localStorage (sign in or sign out)
        const handleStorageChange = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const fetchCollegeDetails = async () => {
                try {
                    const response = await axios.get(
                        'http://localhost:3000/api/v1/timetable/colleges',
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    const collegeIds = response.data.colleges;

                    if (collegeIds && collegeIds.length > 0) {
                        const collegeResponse = await axios.get(
                            `http://localhost:3000/api/v1/timetable/colleges/${collegeIds[0]}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );
                        setCollegeCode(collegeResponse.data.collegeCode);
                    }

                    setIsLoading(false);
                } catch (err) {
                    console.error('Error fetching college details:', err);
                    setError('Failed to fetch college details');
                    setIsLoading(false);
                }
            };

            fetchCollegeDetails();
        } else {
            setIsLoading(false);
        }
    }, [isLoggedIn]); // Re-fetch data when login state changes

    return (
        <div>
            <nav className="bg-blue-500 p-4">
                <div className="flex items-center justify-between">
                    <div className="text-white font-bold text-xl">
                        <Link to="/">Logo</Link>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <Link to="/" className="text-white hover:bg-blue-600 py-2 px-4 rounded">Home</Link>
                        <Link to="/about" className="text-white hover:bg-blue-600 py-2 px-4 rounded">About</Link>
                        <Link to="/add-college" className="text-white hover:bg-blue-600 py-2 px-4 rounded">Add College</Link>
                        {collegeCode && !isLoading && (
                            <Link to={`/departments/${collegeCode}`} className="text-white hover:bg-blue-600 py-2 px-4 rounded">
                                Departments
                            </Link>
                        )}
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-blue-500`}>
                <Link to="/" className="text-white block py-2 px-4">Home</Link>
                <Link to="/about" className="text-white block py-2 px-4">About</Link>
                <Link to="/add-college" className="text-white block py-2 px-4">Add College</Link>
                {collegeCode && !isLoading && (
                    <Link to={`/departments/${collegeCode}`} className="text-white block py-2 px-4">Departments</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;