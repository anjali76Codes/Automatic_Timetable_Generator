import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CollegeDetails = () => {
    const [colleges, setColleges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [departmentDetails, setDepartmentDetails] = useState({}); // To store fetched department details

    useEffect(() => {
        const token = localStorage.getItem('token');

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
                        `http://localhost:3000/api/v1/timetable/colleges/${collegeId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    return collegeResponse.data;
                });

                const collegeDetails = await Promise.all(collegeDetailsPromises);
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

    // Function to fetch department details for each department
    const fetchDepartmentDetails = async (departmentIds) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/departments/departments/details',
                { departmentIds },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            const departments = response.data;
            const departmentMap = {};
            departments.forEach((department) => {
                departmentMap[department._id] = department;
            });
            setDepartmentDetails(departmentMap); // Set the department details in the state
        } catch (error) {
            console.error('Error fetching department details:', error);
        }
    };

    useEffect(() => {
        // Extract all unique department IDs from all colleges
        const departmentIds = colleges.reduce((ids, college) => {
            return [...ids, ...college.collegeDepartments];
        }, []);

        // Remove duplicates by converting the array to a Set
        const uniqueDepartmentIds = [...new Set(departmentIds)];

        // Fetch department details if we have department IDs
        if (uniqueDepartmentIds.length > 0) {
            fetchDepartmentDetails(uniqueDepartmentIds);
        }
    }, [colleges]);

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
                            <h2>{college.collegeName}</h2>
                            <p>College Code: {college.collegeCode}</p>
                            <p>Principal: {college.collegePrincipal}</p>

                            <h3>Departments</h3>
                            {college.collegeDepartments.length > 0 ? (
                                <ul>
                                    {college.collegeDepartments.map((departmentId, idx) => {
                                        const department = departmentDetails[departmentId];
                                        return (
                                            <li key={idx}>
                                                <strong>Department ID: {departmentId}</strong>
                                                {department ? (
                                                    <div>
                                                        <p>Department Name: {department.departmentName}</p>
                                                        <p>HOD: {department.departmentHOD}</p>
                                                        <p>Total Faculties: {department.totalFaculties}</p>
                                                        <p>Total Students: {department.totalStudents}</p>
                                                    </div>
                                                ) : (
                                                    <p>Loading department details...</p>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <p>No departments available.</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CollegeDetails;
