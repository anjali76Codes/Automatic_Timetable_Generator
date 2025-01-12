import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            {/* Navbar Container */}
            <nav className="bg-blue-500 p-4">
                <div className="flex items-center justify-between">
                    <div className="text-white font-bold text-xl">
                        <Link to="/">Logo</Link> {/* Link for home route */}
                    </div>

                    {/* Desktop Navbar Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link to="/" className="text-white hover:bg-blue-600 py-2 px-4 rounded">Home</Link>
                        <Link to="/about" className="text-white hover:bg-blue-600 py-2 px-4 rounded">About</Link>
                        <Link to="/add-college" className="text-white hover:bg-blue-600 py-2 px-4 rounded">Add College</Link>
                        <Link to="/departments" className="text-white hover:bg-blue-600 py-2 px-4 rounded">Departments</Link>
                    </div>

                    {/* Hamburger Icon for Mobile */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-blue-500`}>
                <Link to="/" className="text-white block py-2 px-4">Home</Link>
                <Link to="/about" className="text-white block py-2 px-4">About</Link>
                <Link to="/add-college" className="text-white block py-2 px-4">Add College</Link>
                <Link to="/departments" className="text-white block py-2 px-4">Departments</Link>
            </div>
        </div>
    );
};

export default Navbar;
