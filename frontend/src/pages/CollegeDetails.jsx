import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CollegeDetails = () => {
    const [colleges, setColleges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Log the token to verify it's being fetched correctly
        // console.log("Token from localStorage:", token);

        const fetchColleges = async () => {
            try {
                if (!token) {
                    throw new Error('No token found');
                }

                // Fetch the list of college IDs associated with the user
                const response = await axios.get(
                    'http://localhost:3000/api/v1/timetable/colleges',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const collegeIds = response.data.colleges;

                // Fetch the full details for each college by ID
                const collegeDetailsPromises = collegeIds.map(async (collegeId) => {
                    const collegeResponse = await axios.get(
                        `http://localhost:3000/api/v1/timetable/colleges/${collegeId}`, // Adjust the URL to get individual college details
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    return collegeResponse.data;
                });

                const collegeDetails = await Promise.all(collegeDetailsPromises);

                // console.log('Full college details:', collegeDetails);
                setColleges(collegeDetails);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching colleges:', error);
                setError(error.response ? error.response.data.message : 'Failed to fetch colleges.');
                setIsLoading(false);
            }
        };

        fetchColleges();
    }, []);

    if (isLoading) {
        return <div>Loading colleges...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Your Colleges</h1>
            {colleges.length === 0 ? (
                <p>You have no colleges associated with your account.</p>
            ) : (
                <div>
                    {colleges.map((college, index) => (
                        <div key={index} className="college-card">
                            <h2>{college.collegeCode}</h2> {/* Displaying the full college name */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CollegeDetails;
