import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BasicInformation = () => {
  const [formData, setFormData] = useState({
    departmentName: '',
    departmentHOD: '',
    totalFaculties: '',
    totalClasses: '',
    totalLabs: '',
    totalStudents: '',
  });
  const [collegeId, setCollegeId] = useState(null); // Store the college ID
  const [isSaved, setIsSaved] = useState(false); // Track if information is saved
  const [error, setError] = useState(""); // Track any errors

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchCollegeId = async () => {
      try {
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(
          'http://localhost:3000/api/v1/timetable/colleges', // Get college data associated with user
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.colleges && response.data.colleges.length > 0) {
          // Assuming you get the list of colleges and pick the first one
          setCollegeId(response.data.colleges[0]); // Set collegeId (change logic based on your structure)
        } else {
          throw new Error('No college found for the user');
        }
      } catch (error) {
        setError('Error fetching college data: ' + error.message);
      }
    };

    fetchCollegeId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!collegeId) {
      setError('College ID is missing');
      return;
    }

    const apiUrl = "http://localhost:3000/api/departments";

    // Log department details to the console
    console.log("Department details:", formData);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          collegeId: collegeId, // Include the fetched collegeId
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const result = await response.json();
      alert("Department information saved successfully");
      setIsSaved(true); // Mark as saved
      console.log("Response result: ", result); // Log the response from the API
    } catch (error) {
      setError("Error saving information: " + error.message);
    }
  };

  const handleEdit = () => {
    setIsSaved(false); // Toggle back to edit mode
  };

  // Display saved details
  if (isSaved) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center text-gradient">
          Department Information
        </h2>

        <div className="space-y-4">
          <p><strong>Department Name:</strong> {formData.departmentName}</p>
          <p><strong>Department HOD:</strong> {formData.departmentHOD}</p>
          <p><strong>Total Faculties:</strong> {formData.totalFaculties}</p>
          <p><strong>Total Classes:</strong> {formData.totalClasses}</p>
          <p><strong>Total Labs:</strong> {formData.totalLabs}</p>
          <p><strong>Total Students:</strong> {formData.totalStudents}</p>
        </div>

        <button
          onClick={handleEdit}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Edit Details
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center text-gradient">Basic Information</h2>

      {/* Department Name and HOD in the same row */}
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-1">
          <label htmlFor="departmentName" className="block text-lg font-medium text-gray-700 mb-2">
            Department Name
          </label>
          <input
            type="text"
            id="departmentName"
            name="departmentName"
            value={formData.departmentName}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 placeholder-gray-400 text-gray-800"
            placeholder="Enter department name"
            required
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="departmentHOD" className="block text-lg font-medium text-gray-700 mb-2">
            Department HOD
          </label>
          <input
            type="text"
            id="departmentHOD"
            name="departmentHOD"
            value={formData.departmentHOD}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 placeholder-gray-400 text-gray-800"
            placeholder="Enter HOD name"
            required
          />
        </div>
      </div>

      {/* Total Faculties, Classes, Labs in the same row */}
      <div className="grid grid-cols-3 gap-6">
        <div>
          <label htmlFor="totalFaculties" className="block text-lg font-medium text-gray-700 mb-2">
            Total Faculties
          </label>
          <input
            type="number"
            id="totalFaculties"
            name="totalFaculties"
            value={formData.totalFaculties}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 placeholder-gray-400 text-gray-800"
            placeholder="Enter total faculties"
            required
            min="0"
          />
        </div>
        <div>
          <label htmlFor="totalClasses" className="block text-lg font-medium text-gray-700 mb-2">
            Total Classes
          </label>
          <input
            type="number"
            id="totalClasses"
            name="totalClasses"
            value={formData.totalClasses}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 placeholder-gray-400 text-gray-800"
            placeholder="Enter total classes"
            required
            min="0"
          />
        </div>
        <div>
          <label htmlFor="totalLabs" className="block text-lg font-medium text-gray-700 mb-2">
            Total Labs
          </label>
          <input
            type="number"
            id="totalLabs"
            name="totalLabs"
            value={formData.totalLabs}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 placeholder-gray-400 text-gray-800"
            placeholder="Enter total labs"
            required
            min="0"
          />
        </div>
      </div>

      {/* Total Students */}
      <div>
        <label htmlFor="totalStudents" className="block text-lg font-medium text-gray-700 mb-2">
          Total Students
        </label>
        <input
          type="number"
          id="totalStudents"
          name="totalStudents"
          value={formData.totalStudents}
          onChange={handleChange}
          className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 placeholder-gray-400 text-gray-800"
          placeholder="Enter total students"
          required
          min="0"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Save Information
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </form>
  );
};

export default BasicInformation;



