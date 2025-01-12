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
  const [collegeId, setCollegeId] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchCollegeId = async () => {
      try {
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('http://localhost:3000/api/v1/timetable/colleges', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.colleges && response.data.colleges.length > 0) {
          setCollegeId(response.data.colleges[0]);
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
    const departmentId = isSaved ? formData.departmentId : null;

    try {
      const response = await fetch(apiUrl, {
        method: departmentId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          collegeId: collegeId,
          departmentId: departmentId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const result = await response.json();
      alert("Department information saved successfully");
      setIsSaved(true);
      setFormData(result.department);
    } catch (error) {
      setError("Error saving information: " + error.message);
    }
  };

  const handleEdit = () => {
    setIsSaved(false); // Allow editing again (if you decide to revert this behavior)
  };

  // Display saved details and disable form fields when isSaved is true
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
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center text-gradient">Basic Information</h2>

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
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter department name"
            required
            disabled={isSaved} // Disable input after save
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
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter HOD name"
            required
            disabled={isSaved} // Disable input after save
          />
        </div>
      </div>

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
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter total faculties"
            required
            min="0"
            disabled={isSaved} // Disable input after save
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
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter total classes"
            required
            min="0"
            disabled={isSaved} // Disable input after save
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
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter total labs"
            required
            min="0"
            disabled={isSaved} // Disable input after save
          />
        </div>
      </div>

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
          className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter total students"
          required
          min="0"
          disabled={isSaved} // Disable input after save
        />
      </div>

      {!isSaved && (
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-lg"
        >
          Save Information
        </button>
      )}

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </form>
  );
};

export default BasicInformation;
