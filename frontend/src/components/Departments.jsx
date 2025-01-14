import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Departments = () => {
  const navigate = useNavigate();
  const { collegeCode } = useParams(); // Get collegeCode from URL
  const [collegeDetails, setCollegeDetails] = useState({});
  const [departmentDetails, setDepartmentDetails] = useState({}); // Store department details
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state for departments

  useEffect(() => {
    // Fetching college details using the collegeCode from the URL
    const fetchCollegeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/timetable/college/${collegeCode}`, // Get college details
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in header
            },
          }
        );

        if (response.data) {
          setCollegeDetails(response.data.message); // Assuming message contains the college details
          const departmentIds = response.data.message.collegeDepartments; // Extract department IDs
          fetchDepartmentDetails(departmentIds); // Fetch department details using department IDs
        }
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    fetchCollegeDetails();
  }, [collegeCode]); // Re-fetch when collegeCode changes

  // Function to fetch department details
  const fetchDepartmentDetails = async (departmentIds) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/departments/departments/details", // Get departments details by IDs
        { departmentIds },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        const departmentMap = {};
        response.data.forEach((department) => {
          departmentMap[department._id] = department;
        });
        setDepartmentDetails(departmentMap); // Map department details to their IDs
        setIsLoading(false);
      }
    } catch (err) {
      setError("Failed to fetch department details");
      setIsLoading(false);
    }
  };

  const totalDepartments = collegeDetails.totalDepartments || 0;
  const departments = collegeDetails.collegeDepartments || [];

  // Create a filled list of departments
  const filledDepartments = [...departments];

  // If the number of departments is less than totalDepartments, add missing departments
  for (let i = departments.length; i < totalDepartments; i++) {
    filledDepartments.push(`Department ${i + 1}`); // Add default names like "Department 1", "Department 2", etc.
  }
  const handleAddInfoClick = (departmentId, index) => {
    const department = departmentDetails[departmentId] || { departmentName: `Department ${index + 1}` }; // Fallback to dynamic name
    // Navigating to the department details page with the correct URL
    navigate(`/departments/${collegeCode}/${departmentId}`, {
      state: { departmentName: department.departmentName }, // Pass the department name to the next page
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* College Info Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-10">
          <h2 className="text-3xl font-extrabold text-blue-600 text-center mb-6">
            {collegeDetails.collegeName} - {collegeDetails.collegeCode}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-gray-700">Address</h4>
              <p>{collegeDetails.collegeAddress}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-gray-700">Principal</h4>
              <p>{collegeDetails.collegePrincipal}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-gray-700">Total Classes</h4>
              <p>{collegeDetails.totalClasses}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-gray-700">Total Labs</h4>
              <p>{collegeDetails.totalLabs}</p>
            </div>
          </div>
        </div>

        {/* Departments Section */}
        <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-10">
          Departments
        </h2>
        {error && (
          <div className="text-red-600 text-center mb-4">{error}</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {isLoading ? (
            <div>Loading departments...</div>
          ) : (
            filledDepartments.map((departmentId, index) => {
              // Check if it's a default department name or an actual department object
              const department = departmentDetails[departmentId] || { departmentName: `Department ${index + 1}` }; // Fallback for undefined department

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
                >
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    {department ? department.departmentName : `Department ${index + 1}`}
                  </h3>
                  <button
                    onClick={() => handleAddInfoClick(departmentId, index)} // Pass index to handleAddInfoClick
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
                  >
                    Add Info <span className="ml-2">+</span>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );

};

export default Departments;
